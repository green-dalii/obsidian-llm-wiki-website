---
title: "入门必读（5）：选一个真正跑得动你 Wiki 的本地模型"
description: "Qwen3.5、Qwen3.6、Gemma 4、oMLX——哪个模型在你的硬件上跑得好，要付出什么代价。一份走向完全离线、又不牺牲可用性的实操指南。"
date: 2026-07-20
tags: ["入门必读"]
series: "getting-started"
related: ["choosing-models", "obsidian-basics", "first-100-pages", "introducing-llm-wiki"]
---

## 为什么跑本地

三种理由会让人选择完全离线的 Karpathy LLM Wiki 配置：

- **隐私姿态**：笔记永不离开本机。客户资料、研究草稿、个人日记。
- **网络现实**：出差、受限网络、企业防火墙封了 API 出站。
- **成本上限**：高频批量摄入走云 API 累计下来不便宜。一次性的硬件投入会摊薄。

插件从一开始就是为这种场景设计的——零遥测、无后端、无数据收集。自 v1.25.0 起，**完全本地的 PDF 路径**（oMLX + Markitdown + Baidu Unlimited-OCR，见 [实践指南（8）：PDF 摄取](/zh/blog/posts/pdf-ingest-guide/)）把过去把人推回云端的最后一个空缺补上了。

本文带你走过实际的问题：**哪个本地模型，在哪类硬件上，做什么好？** 答案变化很快——本文校准到 v1.25.0 的推荐与 2026 年中期的模型发布。

## 硬件档位（你在用什么跑）

### Apple Silicon（M 系列）

统一内存是杀手锏。LLM 权重和其他所有东西住在同一块内存池里，所以 64 GB 统一内存的 Mac 能跑得很舒服的 27B 量化模型；128 GB 机器能跑 70B 级模型，这种规模用 NVIDIA 卡要 2 张 3090。

| 芯片 | 统一 RAM | 实际可跑上限 |
|------|----------|--------------|
| M1 / M2 | 8–24 GB | 7B Q4_K_M，13B Q3_K_S |
| M3 | 8–36 GB | 13B Q4_K_M，27B Q3_K_M |
| M4 | 16–48 GB | 27B Q4_K_M，35B-A3B 跑得动 |
| M4 Max | 36–128 GB | 70B Q4，122B-A10B 可行 |
| M4 Ultra（若已发布） | 64–192 GB | 122B+ 更高精度 |

"A3B" / "A10B" 这套标记指的是 Mixture-of-Experts 模型的**激活参数**——35B（或 122B）总参数，但每个 token 只激活 3B（或 10B），所以实际算力和内存带宽成本接近 3B（或 10B）的稠密模型。Qwen3.5-A3B / Qwen3.5-A10B 系列就是这种架构。

### NVIDIA

瓶颈是显存，不是系统内存。可以溢出到 CPU 但吞吐量掉一个数量级。

| 显存 | 实际可跑上限 |
|------|--------------|
| 8 GB（RTX 3060/4060） | 7B Q4_K_M |
| 12 GB（RTX 3060/4070） | 13B Q4_K_M |
| 16 GB（RTX 4060 Ti/4070 Ti Super） | 13B Q5_K_M，27B Q3_K_S |
| 24 GB（RTX 3090/4090） | 27B Q4_K_M，35B-A3B |
| 48 GB（RTX A6000 / 2× 3090） | 70B Q4 |
| 80 GB（A100 / H100） | 70B Q5，122B-A10B |

### 仅 CPU（无 GPU）

小模型仍然可行——Qwen3.5-7B Q4 在现代桌面 CPU 上约 3 tokens/sec，处理 1k token 的查询慢但能用。不推荐用于批量摄入。

## 模型候选清单（2026 年中期）

这些是 v1.25.0 release notes 点名的模型，外加几个近期已稳定的型号。推荐是**按任务分**的，因为插件的 Per-Task Models 设置（v1.24.0）允许你为 Ingest / Lint / Query 选不同模型。

### 摄入（实体提取、概念页面、页面生成）

摄入想要一个**精确遵循指令**、能处理结构化输出、不会拒绝良性请求的模型。**吞吐量比绝对质量更重要**——每条新来源笔记都在付这笔钱。

| 模型 | 规模 | 优势 | 劣势 |
|------|------|------|------|
| **Qwen3.5-27B-Instruct（Q4_K_M）** | Apple Silicon 上 ~17 GB | 该规模下实体提取最佳开源指令遵循 | 需 ≥32 GB 统一 RAM |
| **Qwen3.5-35B-A3B（Q4）** | ~20 GB | MoE——激活 3B 成本，近 27B 质量 | 首 token 延迟比稠密高 |
| **Qwen3.6-27B-Instruct** | ~17 GB | 256K+ 上下文，长 Wiki 抽取优于 Qwen3.5 | 较新，实地测试少 |
| **Gemma 4-26B-A4B** | ~16 GB | 谷歌开源权重，结构化输出强 | 多语覆盖略弱 |
| **DeepSeek-V3（Q4）** | ~40 GB | 顶级开源推理，原生 128K 上下文 | 重——最少 64 GB 统一 RAM |

v1.25.0 release notes 把 Qwen3.5 放在这张表首位，因为 `src/wiki/prompts/*.ts` 的 prompt 模板对它的输出形态测试最充分。

### Lint（别名合并、死链修复、矛盾检测）

Lint 周期性跑你的整个 Wiki。需要的模型**既能察觉细微矛盾**，又**足够便宜能周期跑**。擅长创意写作的模型在这里是杀鸡用牛刀——你要的是确定性。

| 模型 | 规模 | 为什么合适 |
|------|------|------------|
| **Qwen3.5-13B-Instruct（Q5_K_M）** | ~10 GB | 中端指令遵循，16 GB 装得下 |
| **Gemma 4-E4B（Q4）** | ~4 GB | 小、快、分类任务出奇地好 |
| **DeepSeek-V3（Q4）** | （同上） | 如果你摄入已经用了 |

用户报告的甜区是 13B 级模型做 lint。低于 7B 矛盾细节就开始丢；高于 27B 是不需要的能力买单。

### Query（聊天、检索增强生成）

Query 是用户直接感知的面。延迟和推理质量都很重要。插件的首次查询 PPR warmup（v1.24.0）让设置变更后的首次查询也快，但你仍想要一个在**几千 token 上下文下也能答得好的模型**。

| 模型 | 规模 | 为什么合适 |
|------|------|------------|
| **Qwen3.6-27B（256K 上下文）** | ~17 GB | 长 Wiki 答案不被截断 |
| **Qwen3.5-35B-A3B（Q4）** | ~20 GB | MoE 成本，答案质量优秀 |
| **Gemma 4-31B** | ~20 GB | 谷歌聊天最强开源模型 |
| **DeepSeek-V3** | （重） | 顶级推理，吞吐更慢 |

如果你的硬件只够一个模型，**让它当 Query 模型**——用户感知质量就靠它。其他两个任务可以回落到更便宜的模型。

## 一份实操配置表

三套预构建配置，匹配上文点名的硬件档位。按任务模型分配在 **Settings → Wiki → Model Scope → Per-Task**。

### MacBook Pro M4 Pro（48 GB 统一）

```
Ingest:  Qwen3.5-27B-Instruct（Q4_K_M, MLX）
Lint:    Qwen3.5-13B-Instruct（Q5_K_M, MLX）
Query:   Qwen3.5-35B-A3B（Q4, MLX）
Provider: LM Studio（端口 1234）
```

三个都跑得舒服。Ingest 和 Lint 用同一系列模型以保 prompt 模板兼容；Query 用稍大的 MoE 拿答案质量。

### Mac Studio M4 Max（128 GB 统一）

```
Ingest:  Qwen3.6-27B（Q4_K_M, MLX），256K 上下文
Lint:    Qwen3.5-13B（Q5_K_M, MLX）
Query:   Qwen3.5-122B-A10B（Q4, MLX）——顶级
Provider: oMLX（Apple Silicon 原生 OpenAI 兼容服务器）
```

oMLX 在 Apple Silicon 上比 LM Studio 更快，因为它绕过一些跨平台抽象层。122B-A10B 激活 10B 的 MoE 在 128 GB 机器上给出接近前沿的答案质量。

### Linux + RTX 4090（24 GB 显存）

```
Ingest:  Qwen3.5-13B（Q5_K_M, GGUF）
Lint:    Qwen3.5-13B（Q5_K_M, GGUF）——同一个
Query:   Qwen3.5-27B（Q4_K_M, GGUF），部分 CPU 卸载
Provider: Ollama（最简配置）
```

单张 4090 你不能同时塞 27B 和 13B，但可以根据正在跑的任务切换。也可以砍掉一个，全程 Qwen3.5-13B（摄入会比 27B 慢但仍可用）。

### 最小配置：M2 MacBook Air（16 GB 统一）

```
Ingest:  Qwen3.5-7B-Instruct（Q4_K_M）
Lint:    Qwen3.5-7B-Instruct（Q4_K_M）——同一个
Query:   Qwen3.5-7B-Instruct（Q4_K_M）——同一个
Provider: Ollama
```

一个模型走天下。摄入质量明显低于 27B——你会看到更多"实体抽取错了"的情况需要手动审。但能用，在轻薄本上也能跑。

## 上下文长度的陷阱

一个常见错误：因为模型宣传 128K 或 256K 上下文就选它。**你实际用的远小于这个数**，因为 Wiki 页面已经经过 PPR cascade 预排好序了（怎么工作的见 [深入解析（6）：蒙特卡洛个性化 PageRank](/zh/blog/posts/monte-carlo-ppr/)）。

v1.23.0 调优周期在 2,142 页真实库上的经验分布：

| Top-k | 平均 prompt tokens | p95 prompt tokens |
|-------|-------------------:|------------------:|
| k=5 | 3,800 | 12,100 |
| k=10 | 6,400 | 19,800 |
| k=20 | 11,200 | 31,500 |

所以除非你做宽查询（"总结所有跟 X 有关的东西"），32K 上下文就够用。宣传 128K 但 32K 后就丢连贯性的模型可以用。宣传 256K 但 200K 仍连贯的模型是过度配置但无害。

**真正**重要的是 cascade 的 PPR 在长 prompt 上的行为。在 50K token 处仍能优雅降级（仍遵循指令）的模型对宽查询更友好。Gemma 4-31B 这里很强；部分 Qwen 变体在 64K 后丢结构。

## 量化：MLX vs GGUF

分别是 Apple Silicon 和 NVIDIA 各自生态的格式。v1.25.0 的本地推荐清单首次把 MLX 设为 Apple Silicon 默认——GGUF 仍能用但慢一档。

| 格式 | 最适合 | 取舍 |
|------|--------|------|
| **MLX** | Apple Silicon（M 系列） | Apple 原生，用 AMX/NEON；M3/M4 上比 GGUF 快 20–40% |
| **GGUF** | NVIDIA、CPU、跨平台 | 通用；底层 llama.cpp；社区现在较小 |
| **GPTQ / AWQ** | 较老 NVIDIA 卡（早于 Ampere） | 4-bit 权重量化；RTX 30 系列上比 GGUF 快但同尺寸质量差 |

v1.25.0 release notes 的经验法则：**Apple Silicon 上 MLX，其他地方 GGUF**，除非你在 RTX 30 系列（GPTQ 可能比 GGUF 快 15%）。

## MLX vs GGUF 量化级别

每种格式内部，量化级别（Q4、Q5、Q6、Q8）在质量与体积/吞吐之间做交换。命名约定：GGUF 是 `Q{级别}_K_{变体}`，MLX 是 `4bit`/`8bit`。

| 级别 | 相对 FP16 体积 | 相对 FP16 质量 | 何时用 |
|------|---------------|---------------|--------|
| Q8_0 | 50% | ~99% | 存储便宜，要质量 |
| Q6_K | 40% | ~98% | Q5 之后收益递减 |
| **Q5_K_M** | 35% | ~97% | **多数场景推荐** |
| Q4_K_M | 28% | ~94% | 需要在同一 RAM 装更大的模型 |
| Q3_K_S | 22% | ~88% | 最后一搏 |

MLX 对应 8bit（约 Q6）和 4bit（约 Q4_K_M）。MLX 目前还没有 5-bit 或 7-bit。

v1.24 调优周期的用户报告甜区：**Ingest/Lint 用 Q5_K_M，Query 用 Q4_K_M**（这样你能在同一内存装更大的查询模型）。除非你有大量富余，那就无脑 Q6_K。

## Per-Task Models 设置

自 v1.24.0 起，插件支持**按任务分配模型**。路径：

**Settings → Wiki → Model Scope → Per-Task**（vs Unified）

从 `Unified` 切到 `Per-Task`，然后分别选：

- **Ingest 模型**——source-analyzer、page-factory × 7、conversation-ingest × 4、wiki-engine、schema-manager、auto-maintain × 2 使用
- **Lint 模型**——analysis-phase、dedup-phase、fill-empty-page、fix-dead-link × 2、fix-runners × 2、link-orphan、merge-duplicates、contradictions 使用
- **Query 模型**——QueryView × 3 send + save-eval + seed-selector 使用

每个任务的模型解析都过 `core/model-resolver.ts` 的 `resolveModelForTask(settings, task)`。空的 per-task 字段回落到 `settings.model`。Test Connection 顺序探测每个模型，fail-fast——任一 per-task 模型探测失败，连接就不健康直到你修好。

v1.24.0 切到 per-task 模型解析的 28 个 LLM 调用点（PR #264）是 per-task 设置真正划算的最大原因——你能用一个快而便宜的模型做摄入、一个聪明昂贵的模型做查询，而不用写代码。

## 本地不够用时

几个信号说明你已超出本地配置能力、应该考虑混合（本地 + 云端做特定任务）：

- **单条笔记摄入 >10 分钟**：模型太小或量化太狠。要么换更大的本地模型，要么摄入切到云端而保留查询本地。
- **查询在细节事实上答错**：模型在 PPR cascade 能挽救的范围内仍然幻觉。换更大的模型，或者把最终 LLM 调用卸载到云端而保留检索本地。
- **多语覆盖不均**：如果你的 Wiki 混 CJK + 欧语，而本地模型偏英语中心，答案质量会肉眼可见地差。DeepSeek-V3 是 2026 年中期最强的多语开源模型。

一个常见模式：**摄入本地（隐私关键），查询云端（质量关键）**。Per-Task Models 让这变成一处配置改动。

## 起步

如果你从没跑过本地模型：

1. **安装 Ollama**（最简配置，跨平台）或 **LM Studio**（更友好的 GUI，也跨平台）。在 Apple Silicon 上想要最大吞吐，装 **oMLX** 替代。
2. **拉一个入门模型**：`ollama pull qwen3.5:13b`（约 8 GB 下载）。
3. **在插件里**：Settings → Wiki Configuration → Provider → Ollama。插件自动发现本地服务器。
4. **跑一次 Test Connection**：几秒内应通过。
5. **摄入一条笔记**。如果实体提取看起来合理，你就设好了。如果不行，换个更大的模型。

7B Q4 在现代笔记本上是"真的能用"的下限。再低你会更多跟模型打架而不是跟 Wiki。13B Q5 是多数配置的甜区。27B Q4 在长上下文查询上质量肉眼可见地提升。

Apple Silicon 上 PDF 摄取的具体配置，看 [实践指南（8）：PDF 摄取](/zh/blog/posts/pdf-ingest-guide/) 的 oMLX + Markitdown + Baidu Unlimited-OCR 技术栈。

想理解为什么 per-task 模型设置真的有用，看 [深入解析（3）：为每个任务选对模型](/zh/blog/posts/choosing-models/) 的深度剖析。