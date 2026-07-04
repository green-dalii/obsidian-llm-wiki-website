---
title: "实践指南：Zotero → Obsidian → Wiki，学术文献流水线"
description: "从文献管理器到可查询的研究知识库。Karpathy LLM Wiki 坐在 Zotero 到 Obsidian 自动化链路的末端。"
date: 2026-05-30
tags: ["实践指南"]
series: "workflow-guides"
related: ["research-papers-workflow", "schema-layer-deep-dive"]
---

## 学术知识的断层

如果你在学术界混，肯定对这个流程太熟了：找论文、读论文、在 Zotero 里标注 PDF、归档、忘掉——直到需要引用它的时候才想起来。

标注被锁死了。它们躺在 Zotero 数据库里的 PDF 里。你可以打开 PDF 看高亮内容，但你没办法在 Obsidian 里把它们和你其他的笔记放在一起搜索。你没办法跨论文做概念交叉引用。你没办法从 Obsidian 里跨整个 Zotero 库进行查询。

LLM Wiki 填平了这个断层。完整的链路是：

1. 在 Zotero 里标注 PDF（你的常规工作流，不用改变）
2. 用 Zotero Integration 插件把标注导出到 Obsidian
3. LLM Wiki 从 `sources/` 摄入导出的笔记
4. 自动创建实体页面、概念页面和双向链接
5. 你标注的论文现在成了研究 Wiki 中的一个连接节点

关键是：你看论文的方式不用变。只是多了一个导出步骤（2-3 秒），剩下的 LLM Wiki 全自动处理。

## 两种导出方式

**方式一：Zotero Integration 插件（推荐）。**

[Obsidian Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration) 社区插件能把 Zotero 条目导出为 Obsidian 笔记。它支持：
- 自定义笔记格式模板
- 自动字段映射（标题、作者、日期、DOI、摘要）
- 选择性导出标注（高亮、笔记、标签）
- 从 Obsidian 内一键导出

这是推荐的方式，因为它直接集成到 Obsidian 的命令面板中，并且支持模板定制。

**方式二：Better BibTeX + 手动导出。**

如果你更倾向于用 Zotero 原生的方式，可以用 Better BibTeX 插件生成格式化引用，然后手动复制标注。这样你对导出格式有完全的控制权，但需要手动操作。只在 Zotero Integration 和其他插件冲突时才用这个方式。

## 推荐的 Zotero Integration 模板

模板决定了 LLM Wiki 收到什么内容。结构良好的模板产出丰富的实体提取。单薄的模板产出单薄的 Wiki。

在 Zotero Integration 设置中创建新笔记模板，使用以下格式：

```markdown
---
source_type: zotero-export
---

# {{title}}

**Authors:** {{authors}}
**Date:** {{date}}
**Venue:** {{publicationTitle}}
**DOI:** {{DOI}}
**URL:** {{url}}
**Cite key:** {{citekey}}

## Abstract

{{abstractNote}}

## Notes

{{hypothesisAnnotations}}

## Annotations

{% for annotation in annotations -%}
{%- if annotation.annotatedText -%}
> {{annotation.annotatedText}}
{%- if annotation.annotationComment -%}
> — *{{annotation.annotationComment}}*
{% endif %}

{%- endif -%}
{%- endfor %}
```

这个模板做了四件事：

1. **前置元数据中的结构化字段**——标题、作者、日期、发表平台、DOI、URL 和引用键都被捕获为结构化字段。LLM Wiki 读取笔记全文，但结构化的前置元数据有助于 LLM 识别作者名称和发表平台等实体。

2. **完整摘要**——`{{abstractNote}}` 字段注入论文摘要。这是实体提取中最有价值的文本。摘要在浓缩形式中包含了论文的关键贡献、方法和结果。

3. **Hypothesis 标注**——如果你使用 Hypothesis 做网页标注，这些高亮会出现在 Notes 部分。对于 Zotero 原生的标注，去掉这行或替换为偏好的标注来源。

4. **带上下文的标注块**——每条标注渲染为带高亮文本的块引用，后面跟你的笔记。注释内容（annotation comment）以斜体形式放在引用下方。这保留了原文和你的思考之间的区别。

## 针对 LLM 提取的笔记格式优化

上述模板提供了一个很好的基础。下面这些优化可以进一步提高提取质量。

**包含完整摘要。** 永远不要截断摘要。即使有 300 字，也放全文。关键的技术术语通常只出现在摘要中。如果你截断了，LLM 可能会漏掉区分这篇论文和其他论文的重要实体。如果论文没有摘要，自己加 2-3 句话的总结。

**保留带上下文的标注。** 单个单词的高亮（"Transformer"）产生的实体提取很差。带上下文的短语（"Transformer architecture achieves state-of-the-art results on machine translation"）就好得多。在 Zotero 里做标注时，高亮 5-15 个词的片段，而不是 1-2 个词。LLM 需要上下文来理解每条标注指的是什么。

**添加结构化元数据。** 模板已经包含了基本元数据。要获得更好的提取效果，可以在 Zotero 条目中添加以下可选字段：
- **标签（Tags）**——在 Zotero 中添加概念性标签（例如 "attention-mechanism"、"efficiency"、"transformer"）。这些会变成导出笔记的标签，LLM Wiki 会处理它们。
- **额外字段（Extra field）**——Zotero 的"Extra"字段支持自定义键值对。添加 `research-area: NLP` 或 `method-type: attention-optimization` 可以为 LLM 提供额外的分类信号。

**区分高亮和笔记。** 模板区分了标注（高亮文本）和标注评论（你的笔记）。这种区分很重要，因为 LLM 应该把高亮文本视为论文本身的内容，而把评论视为你的分析。如果混在一起，LLM 可能把你的观点误认为是论文作者的观点。

**控制笔记长度。** 过长的标注（一篇论文 50+ 条高亮）可能超出上下文窗口或导致提取过于分散。聚焦最重要的标注。质量胜于数量。每篇论文 15-20 条精心挑选的标注比 50 条散乱的高亮效果更好。

## 提取结果

当你导出论文标注并运行 Ingest Sources，通常会创建以下页面：

**实体页面：**
- 每位作者得到一个实体页面，链接到该作者的所有已导出论文
- 摘要或标注中提到的数据集得到数据集实体页面
- 提到的工具、库和框架得到工具实体页面

**概念页面：**
- 论文的核心方法或架构成为概念页面
- 相关的理论概念得到概念页面
- 评估指标得到概念页面

**源页面：**
- 论文笔记本身成为 `wiki/sources/` 中的源页面
- 该页面包含完整的笔记文本，链接到所有提取的实体和概念

**示例：《Attention Is All You Need》。**

你导出 Transformer 论文的标注 PDF。笔记中包含摘要、12 条带评论的标注和结构化元数据。

摄入后，你的 Wiki 增加了大约 20 个页面：
- Vaswani、Shazeer、Parmar、Uszkoreit、Jones、Gomez、Kaiser、Polosukhin 的实体页面（8 个作者实体）
- Scaled Dot-Product Attention、Multi-Head Attention、Positional Encoding、Transformer Architecture 的概念页面（4 个概念实体）
- WMT 2014 英德翻译和 WMT 2014 英法翻译的数据集页面（2 个数据集实体）
- BLEU 分数的指标页面（1 个指标实体）
- 论文笔记的源页面

这 20 个页面相互链接，而且最重要的是，它们与已有的 Wiki 内容也建立了链接。如果你已经有"Neural Machine Translation"概念页面，Transformer 论文的源页面会自动链接到它。双向链接把你的新论文跟已经索引的一切内容连接起来。

## 学术 Wiki 的独特价值

由 LLM Wiki 驱动的研究知识图谱提供了 Zotero 本身无法做到的能力。

**作者网络。** 打开一个作者实体页面。看到你索引过的该作者的所有论文。顺着 `[[wiki-links]]` 查看合著者、他们开发的方法和用过的数据集。久而久之，这会创建一个揭示合作模式的个人研究网络。

**概念谱系。** 查询"注意力这个概念在我索引的论文中是如何演变的？"LLM 追踪从 Bahdanau attention 到 Luong attention，到 Transformer self-attention，再到 Flash Attention 的内存优化。答案是一条不存在于任何单篇论文中的谱系——它从论文之间的联系中涌现出来。

**方法对比。** "根据我索引的论文，比较 Flash Attention 和 Efficient Attention 的效率声明。"LLM 读取相关的概念页面和源页面，返回结构化的对比。没有 LLM Wiki，你得同时打开两篇 PDF 手动对照。

**跨领域发现。** 你的 Zotero 库里有 NLP、计算机视觉和强化学习的论文。大多数文献管理工具会按文件夹把它们隔离开来。LLM Wiki 按实体提取，不管文件夹分类，跨领域建立链接。一篇视觉论文里的方法（"non-local neural networks"）可能被链接到 NLP 概念（"self-attention"），因为 LLM 识别出了相似性——即使你自己从没意识到这个联系。

## 与研究论文工作流的集成

Zotero 工作流可以直接集成到[研究论文工作流](/zh/blog/posts/research-papers-workflow)中。完整序列如下：

1. **在 Zotero 中阅读和标注**——你平常的阅读流程，什么都不用改。
2. **导出到 Obsidian**——点击"Zotero Integration"→"Create Literature Note"。笔记落到 `sources/`。
3. **补充个人笔记**——在笔记底部加上你自己的观察（2-4 句话）。这个个人上下文让你的 Wiki 区别于普通的论文索引。
4. **Ingest Sources**——运行摄入命令。插件处理所有导出的笔记。
5. **检查提取结果**——查看摄入报告。主要贡献是否被捕获为概念页面？所有作者都提取为实体了吗？
6. **探索连接**——打开 Graph View。查看新论文如何连接到已有的论文和概念。
7. **跨库查询**——提出覆盖多篇论文的问题。

## 学术用途的配置建议

这些设置能优化 LLM Wiki 的研究论文处理效果：

- **Granularity: Fine（精细）**——学术文本中实体密集。Fine 粒度确保每个作者、方法、数据集和指标都有自己的页面。增加页面数在学术工作中是值得的。
- **源文件夹：`sources/`**——把 Zotero 导出和其他来源放在同一个文件夹，统一摄入。
- **schema/ 中的类型列表（如果使用 Schema Layer）：**添加"research-paper"、"author"、"dataset"、"method"作为已识别的类型。这有助于 LLM 更准确地分类提取的实体。
- **定期 Lint：每周一次**——每周跑一次 Lint，捕获重复的作者页面（同名但中间名缩写不一致）以及可能已删除论文的死链。设置为定期任务。

## 注意事项

使用 Zotero 配合 LLM Wiki 时需要注意的五件事。

**标注必须导出。** 插件不直接读取 Zotero 的数据库。它读取 Zotero Integration 导出的笔记。如果不导出，标注就留在 Zotero 里。把导出融入你的阅读习惯。

**PDF 不会被直接读取。** 插件处理的是导出的笔记文本，而不是 PDF 本身。如果你的标注很少，提取就会很稀疏。Wiki 的质量取决于标注的质量和摘要的完整性。

**引文更新需要重新导出。** 如果你在首次导出后在 Zotero 中给论文加了新标注，新的标注不会出现在你的 Wiki 中，直到你重新导出并重新摄入。摄入是幂等的——重新摄入会更新已有页面而不是创建重复——但这需要手动操作。

**作者姓名消歧义。** LLM 会尽力处理，但作者姓名的变体（比如"Tri Dao"vs."Tri T. Dao"vs."T. Dao"）有时会为同一个人创建多个实体页面。定期运行 Lint，用 Smart Fix All 合并重复。

**大型库需要时间。** 导出和摄入 100 篇论文不是一天能完成的事。每天处理 3-5 篇，让 Wiki 自然增长。当你逐一检查每篇论文的提取结果时，连接会更有意义地呈现出来。

## 下一步

现在你拥有了一套完整的 Zotero 到 Wiki 管线：在 Zotero 中标注、通过 Zotero Integration 导出、摄入到 LLM Wiki、以及探索结果知识图谱。你的研究论文不再是孤立的 PDF——它们是不断增长的学术知识库中互相连接的节点。

到此，**动手实践系列**就全部结束了。你现在掌握了六套完整的工作流：查询到 Wiki 反馈回路、日常知识循环、Web Clipper 集成、研究论文处理、Canvas 可视化以及 Zotero/PDF 导出。根据你的需要自由组合使用。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
