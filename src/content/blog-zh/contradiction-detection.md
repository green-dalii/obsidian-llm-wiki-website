---
title: "深入原理（三）：当你的来源各执一词"
description: "多个来源的知识有时会相互冲突。插件如何检测矛盾以及解决策略。"
date: 2026-05-23
tags: ["质量", "矛盾", "维护"]
series: "inside-the-system"
related: ["smart-fix-all", "schema-layer-deep-dive"]
---

## 当来源各执一词

DeepSeek 在 2024 年 5 月发布 V2 时，互联网上一半人说它有 2360 亿个参数，另一半人说它是一个混合专家（MoE）模型，每个 token 只激活 210 亿参数。两者都对——但前提是你理解它的架构。一个粗糙的提取会记录两个相互矛盾的参数数量，让你摸不着头脑。

这就是矛盾问题。当你的 Wiki 从多个来源提取同一实体的信息时，它们不可能总是一致。日期不同，数字不同，描述也各有说辞。没有一个系统来捕获和解决这些冲突，你的知识库就会变成不确定性的仓库——内部自相矛盾，信任度逐渐下降。

矛盾检测（v1.8.0 引入）是插件对这个问题的回答。它会自动发现冲突、清晰呈现、并为你提供三种解决路径。

## 三类矛盾

不是所有的矛盾都一样。检测系统将它们分为三类，每一类都有各自的方法和解决方案。

### 1. 时间冲突

同一事件被记录为不同日期是最常见的矛盾。常见于来源对事件发生时间各执一词，或者某个来源做了近似处理。

**示例：**

| 实体 | 属性 | 来源 A | 来源 B |
|------|------|--------|--------|
| GPT-4 | 发布日期 | 2023-03-14 | 2023 年 3 月 |
| Llama 2 | 发布日期 | 2023-07-18 | 2023 年夏季 |

第一个冲突影响不大——两个来源都同意是 2023 年 3 月。第二个冲突更明显："7 月 18 日"和"2023 年夏季"可能相差数周。

**检测方法：** 系统提取同一属性在所有来源中的日期值，标准化为统一格式（ISO 8601），标记任何差异超过可配置阈值的配对（默认：月级精度为 30 天，天级精度为 1 天）。

### 2. 数值冲突

两个来源对同一项指标给出了不同的数值。

**示例：**

| 实体 | 属性 | 来源 A | 来源 B |
|------|------|--------|--------|
| Gemini 1.5 Pro | 上下文窗口 | 1,000,000 tokens | 2,000,000 tokens |
| Mistral 7B | 参数量 | 7.3B | 7B |

Gemini 的冲突看起来是真实的差异——100 万比 200 万。Mistral 的冲突很可能是四舍五入的差异：73 亿被某个来源四舍五入成了 70 亿。

**检测方法：** 系统用可配置的容差比较数值。参数和数量默认容差为 10%。百分比和比率的容差为 2 个百分点。低于容差阈值的冲突会被记录但不会被标记——它们被视为可接受的近似。

### 3. 定性冲突

最难的一类：两个来源以无法简化为数字或日期的方式描述同一实体。

**示例：**

| 实体 | 属性 | 来源 A | 来源 B |
|------|------|--------|--------|
| Claude 3 Opus | 架构 | 新颖的 Transformer 变体 | 标准仅解码器 Transformer |
| RAG | 有效性 | 知识任务的最先进方法 | 受检索质量限制 |

这些矛盾需要语义理解。Claude 3 Opus 的架构到底是新颖还是标准？RAG 是最先进的还是存在局限？

**检测方法：** 两阶段。首先，**确定性匹配器**检查矛盾关键词（"新颖" vs "标准"、"最先进" vs "有限"、"突破性" vs "增量式"）。其次，**LLM 辅助比较器**（可选，需要 API 调用）评估两段文字描述之间的语义关系，如果它们表达了相反的主张则予以标记。

LLM 辅助步骤是矛盾检测中唯一消耗 tokens 的部分。它只在确定性匹配器发现潜在冲突时才会触发，并且有速率限制以防止意外的 API 费用。

## 检测如何工作

矛盾检测以**两阶段管道**的方式运行，以平衡速度和准确性。

### 第一阶段：交叉引用分析（确定性，零 LLM 成本）

这一阶段在 Periodic Lint 期间运行（参见[《日常维护（三）》](/blog/auto-maintenance)），也通过手动执行"Check Contradictions"命令触发。它会：

1. 将所有实体页面按规范名称分组（使用别名解析）
2. 对在多个页面上出现的每个属性提取其值
3. 应用类型特定的比较逻辑（日期容差、数值容差、关键词匹配）
4. 生成初步的矛盾报告

这一阶段对一个 1,000 页的 Wiki 大约需要 2–4 秒。它从不发起 API 调用，不消耗任何 tokens。

### 第二阶段：LLM 辅助语义比较（可选，消耗 tokens）

对于第一阶段发现的定性冲突，系统可以选择调用 LLM 来：

1. 复述两段描述，确认它们针对的是同一个方面
2. 对关系进行分类：确认、矛盾、或正交（关于不同方面）
3. 提供置信度评分（低/中/高）
4. 建议能够调和两个来源的解决文本

这一阶段是可配置的：

```yaml
contradiction_detection:
  llm_assisted:
    enabled: true
    max_qualitative_checks: 10
    model: auto  # 使用默认提取模型
    confidence_threshold: medium
```

`max_qualitative_checks` 上限防止成本失控。每次检查大约消耗 500–1,000 tokens。默认上限为 10，最大成本约 10,000 tokens——根据服务商不同大约 $0.01–0.03。

## 矛盾报告

发现矛盾时，系统会按实体组织生成报告。形式如下：

```
Contradiction Report — 2026-06-01
===================================

Entity: GPT-4
  1. release_date: "2023-03-14" vs "March 14, 2023"
     Status: MINOR（同一天，不同格式）
     Resolution: 自动合并为 2023-03-14

Entity: Gemini 1.5 Pro
  1. context_window: "1,000,000" vs "2,000,000"
     Sources: paper-v3.md vs blog-post.md
     Status: CONFLICT
     Suggested action: 核查原始来源；一个可能引用的是标准
     上下文窗口，另一个包含扩展上下文

Entity: Claude 3 Opus
  1. architecture: "Novel transformer variant" vs "Standard decoder-only"
     Sources: tech-review.md vs architecture-notes.md
     Status: QUALITATIVE_CONFLICT
     Confidence: HIGH
     Suggested action: 核查两个来源，判断哪个描述
     更准确，或注明该架构是标准仅解码器设计的一个新颖变体
```

报告写入 `wiki/log.md` 并显示在插件的矛盾查看器中。每个冲突都标有其严重程度（MINOR、CONFLICT、QUALITATIVE_CONFLICT）和建议操作。

## 三种解决策略

找到矛盾后，你有三种处理方式。

### 策略一：手动修正

最可靠的方法。打开来源笔记，判断哪个来源更权威，直接编辑 Wiki 页面。

**什么时候用：** 矛盾涉及你可以核实的特定事实（日期、数字、明确的事件名称）。其中一个来源明显比另一个更可靠。

**怎么做：** 打开 `wiki/entities/` 中的实体页面，找到冲突属性并更新值。下次矛盾扫描会确认冲突已解决。

### 策略二：LLM 辅助解决

让插件基于已有信息提出解决方案。

**工作原理：**

1. 运行命令 → 对特定实体执行"Resolve Contradiction"
2. 插件将冲突值和来源摘录发送给 LLM
3. LLM 返回带有推理的解决方案建议
4. 你审核建议，选择接受、拒绝或修改

**什么时候用：** 你没有时间手动调查，或者冲突涉及需要综合而非事实核查的定性描述。

**局限性：** LLM 无法访问外部来源——它只知道你的 Wiki 里有什么。如果你的 Wiki 中的两个来源都是错的，LLM 也不会告诉你。这是一个调和工具，不是事实核查工具。

### 策略三：标记保留

有时你无法解决矛盾，因为没有足够的信​​息。与其猜测，不如将该矛盾标记为待后续调查。

**怎么做：** 该矛盾保留在报告中并标记为"WONT_FIX"状态。除非新的冲突数据出现，否则不会被重新标记。

**什么时候用：** 两个来源都没有明显更高的权威性。矛盾较小，不影响你的使用。你计划以后调查，但不想让通知不断弹出来。

## 减少矛盾的最佳实践

预防胜于解决。以下做法可以从源头减少矛盾的产生。

**1. 来源顺序很重要。** 按优先级顺序配置你的来源。确定性匹配器发现冲突值且一个来源优先级更高时，它会采用该值并将冲突记录为 NOTE 而非 CONFLICT。

```yaml
sources:
  - path: papers/
    priority: 10
  - path: blog_posts/
    priority: 5
  - path: notes/
    priority: 1
```

**2. 标准化实体名称。** 矛盾检测依赖跨来源的实体匹配。如果同一个人在一个来源中是"Geoffrey Hinton"，在另一个来源中是"G. Hinton"，系统可能无法将它们关联起来。使用 [Schema 层的别名系统](/blog/schema-layer-deep-dive) 定义名称变体。

**3. 标注来源类型。** 为每个来源打上类型标签（研究论文、博客文章、文档、个人笔记）。矛盾报告会包含来源类型，帮助你判断该信任哪个来源。

**4. 查看提取日志。** 每次批量提取后，扫描 `wiki/log.md` 中关于重叠实体的警告。早期发现意味着后续要解决的矛盾更少。

**5. 设置容差级别。** 根据你的领域调整数值和日期容差。关于古罗马的历史 Wiki 需要比关于 API 版本的软件文档 Wiki 更宽的日期容差。

```yaml
contradiction_detection:
  tolerance:
    date_days: 30
    numerical_percent: 10
    percentage_points: 2
```

## 完整配置选项

全部可配置项：

```yaml
contradiction_detection:
  enabled: true
  run_on_lint: true
  tolerance:
    date_days: 30
    numerical_percent: 10
    percentage_points: 2
  llm_assisted:
    enabled: true
    max_qualitative_checks: 10
    model: auto
    confidence_threshold: medium
  reporting:
    max_contradictions_per_entity: 5
    include_resolved: false
    log_to_file: true
```

## 与 Smart Fix All 的关系

Smart Fix All（v1.7.11 引入）处理**结构**问题——重复页面、死链、孤立页面、空页面。矛盾检测（v1.8.0）处理**内容**问题——来源之间的信息冲突。

它们是互补的。Smart Fix All 确保你的 Wiki 结构规整。矛盾检测确保你的 Wiki 内部一致。先运行 Smart Fix All 清理结构，再运行矛盾检测审核内容质量。

两个系统共享同一套架构：都作为 Lint 检查运行，都生成可操作的报告，都可以从命令面板触发或通过 Periodic Lint 自动化执行。

## 下一篇：Schema 层深度解析

矛盾检测揭示了来源之间的分歧。但如何从一开始就控制哪些内容被提取？答案在于你 Wiki 的第三层：Schema。

在 [深入原理（五）：Schema 层深度解析](/blog/schema-layer-deep-dive) 中，我们将探索 `entities.yaml`、`concepts.yaml`、`aliases.yaml` 和提取模板如何塑造你的 Wiki 所知的内容——以及一个调优良好的 Schema 如何能在矛盾出现之前就避免它们。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
