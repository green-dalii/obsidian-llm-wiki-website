---
title: "实践指南（4）：从论文到可查询的研究 Wiki"
description: "如何把学术 PDF 变成 Obsidian 里结构化的研究知识库。Karpathy LLM Wiki 让交叉引用的实体、概念、理论变得可搜索。"
date: 2026-05-28
tags: ["实践指南"]
series: "workflow-guides"
related: ["zotero-pdf-integration", "schema-layer-deep-dive", "contradiction-detection"]
---

## 问题：知识被困在单篇论文里

读一篇论文的时候，你会在脑子里把 PDF 的内容提炼出来。理解了它的贡献，在脑海里归档。然后读下一篇，再下一篇。读了 20 篇论文之后，每篇的贡献就混在一起了。你知道自己在哪里读过关于注意力机制的内容，但想不起是哪篇论文、跟其他论文有什么联系。

这是学术阅读的根本困境：**每篇论文都是一个自包含的知识单元，但研究的价值恰恰在于论文之间的联系。**

一篇关于 Flash Attention 的论文，单独看没什么用。它之所以有用，是因为你知道 Transformer 论文提出了注意力机制，知道缩放定律显示注意力成本是二次方增长的，知道稀疏注意力是更早的优化手段，而 Flash Attention 解决了那个链条上的特定瓶颈。

这些联系不存在于任何一篇 PDF 里。它们存在于论文之间的"空档"里。而这正是 LLM Wiki 的价值所在。

## 愿景：研究知识图谱

想象一个研究 Wiki，里面每个元素都有自己的独立页面：

- **作者** —— 每位研究者的专属页面，列出他们的论文、方法和数据集
- **方法** —— 每个技术或算法的页面，链接到使用和引用它们的论文
- **数据集** —— 每个基准测试或数据集的页面，链接到评估结果
- **理论** —— 每个理论贡献的页面，链接到支持和反驳的论文
- **概念** —— 每个关键概念的页面，反向链接展示哪些论文引用过它

每个页面用 `[[wiki-links]]` 连接到所有相关页面。Graph View 展示相关研究的聚类。Query 让你问"我的论文里关于注意力机制效率都说了什么？"然后从你处理过的所有论文中整合出一份答案。

这在今天的 LLM Wiki 上就能做到。方法如下。

## 第一步：准备论文笔记

知识图谱的质量取决于输入的质量。PDF 原文直接扔进去，没有结构的话，产出的图谱会很稀疏。而准备良好的笔记能产出稠密、互联的图谱。

对于每篇论文，在 `sources/` 中创建一条笔记。包含以下部分：

**基本信息：**
- 标题和作者
- 发表平台和年份
- DOI 或全文 URL
- 研究领域（NLP、计算机视觉、强化学习等）

**核心贡献（2-3 句话）：**
这篇论文解决了什么问题？关键洞见是什么？要具体。不要写"他们提出了一种新的注意力机制"这种空话。要写"他们证明了因果掩码注意力可以从 softmax 计算中分解出来，将内存从二次方降到线性"——这才是有用的。

**方法论（3-5 句话）：**
它是怎么工作的？高层描述。如果合适的话，包含关键公式或架构选择。这部分会产出最多的实体提取。

**关键结果：**
在特定基准测试上的量化结果。包含数据集、指标和对比基线。这些会生成数据集和指标的实体页面，并链接回论文。

**局限性（1-2 句话）：**
论文承认了哪些局限性？这对以后的平衡查询很重要。当你问"方法 X 有什么权衡？"时，LLM 会从局限性部分提取信息。

**个人观察（2-3 句话）：**
用"My Notes"这样的标题区分开来。这是你自己的分析——这篇论文和你读过的其他论文有什么联系、引出了哪些问题、或者你打算怎么应用它。LLM 在查询回复中会包含个人观察，让你的 Wiki 有个人色彩，而不只是摘要的堆砌。

**完整示例笔记：**

```markdown
---
source_type: research-paper
---

# Flash Attention: Fast and Memory-Efficient Exact Attention

**Authors:** Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré
**Venue:** NeurIPS 2022
**DOI:** 10.48550/arXiv.2205.14135
**Area:** Efficient Deep Learning

## Core Contribution
Shows that the standard attention computation (QK^T → softmax → PV) can be tiled over
the available SRAM on GPUs, reducing memory from quadratic O(N²) to linear O(N) without
approximation. Previous approaches used sparse attention or kernel fusion, but Flash
Attention is the first to achieve exact softmax computation with IO-aware tiling.

## Methodology
Uses three key ideas:
1. **Tiling** — Q, K, V matrices are split into blocks that fit in GPU SRAM
2. **Recomputation** — Attention matrix is recomputed during backward pass instead of stored
3. **Online softmax** — Softmax normalization is computed incrementally across blocks

## Key Results
- BERT training: 15% faster than PyTorch attention baseline
- GPT-2 training: 13% faster
- Memory: O(N) instead of O(N²), enabling 64K+ sequence lengths on a single GPU
- Tested on A100 GPUs with 40GB HBM and 192KB SRAM per 108 streaming multiprocessor

## Limitations
- Requires CUDA kernels; no pure PyTorch implementation
- Speedup depends on batch size and sequence length; less benefit for small sequences
- Current implementation is for training only; inference requires separate optimization

## My Notes
This connects directly to the Transformer paper and Sparse Attention survey I already
indexed. Flash Attention addresses the quadratic memory bottleneck of vanilla attention.
The tiling approach is similar to how matrix multiplication is optimized in cuBLAS.
```

## 第二步：选择粒度

针对不同类型的论文，推荐不同的粒度设置：

- **Fine（精细）** —— 用于研究论文。每个方法、数据集、作者、指标和概念都有自己的页面。一篇论文搭配 Fine 粒度可以产出 15-25 个页面。
- **Standard（标准）** —— 用于综述性文章或教程类内容。覆盖面较广的内容需要的实体页面较少，因为概念不够具体。一篇综述可能产出 8-12 个页面。
- **Coarse（粗略）** —— 用于背景阅读或非主要研究方向的论文。你会得到 3-5 个较宽泛的页面，捕获论文的主要贡献，不做深入的技术提取。

**推荐做法：** 对于你会引用或在之上做研究的论文，用 Fine。对于你只需要了解的论文，用 Standard。对于你只是读来了解大背景的论文，用 Coarse。

## 第三步：摄入与检查

运行 **Ingest Sources** 摄入论文笔记。每篇论文根据长度和粒度不同，耗时 15-30 秒。

**检查提取报告。** 摄入后查看报告：
- 是否正确提取了作者？作者页面会作为实体页面创建。
- 是否把主要方法作为概念捕获了？核心方法（比如"Flash Attention"）应该是一个概念页面。
- 是否识别了数据集和基准测试？它们应该是单独的实体页面。
- 是否创建了指向先前论文相关 Wiki 页面的链接？

**浏览实体页面。** 打开 `wiki/entities/`，查看作者页面。Tri Dao 的页面应该列出 Flash Attention 以及你索引过的他的其他论文。这就是你的作者网络的开端。

**浏览概念页面。** 打开 `wiki/concepts/`，查看"Attention Mechanism"。它应该有来自你索引过的每篇讨论注意力机制论文的反向链接。每多一篇论文，概念页面就变得更丰富。

**运行 Lint。** 摄入后立即运行 **Lint Wiki**，检查提取问题。常见的研究论文问题包括：
- 重复的作者页面（同名但中间名缩写不一致）
- 空实体页面（罕见但可能，尤其对于生僻术语）
- 断链（如果引用的论文尚未被索引，指向它的链接会显示为死链，直到你索引了那篇论文为止）

## 第四步：编织网络

真正的价值在于当你索引了多篇相关领域的论文之后才会显现。每篇新论文都会强化这个网络。

**示例：添加第二篇论文。**

你索引了《Attention Is All You Need》（原始的 Transformer 论文）。LLM 创建的页面包括：
- Transformer 架构
- Scaled dot-product attention
- Multi-head attention
- Encoder-decoder 架构
- Vaswani 等人（作者实体）

然后你索引了 Flash Attention。LLM 会为 Flash 特有的方法和概念创建新页面。但它还会：

1. 把"Flash Attention"链接到"Attention Mechanism"（已有概念）
2. 把"Tri Dao"链接到"Transformer"（因为 Flash Attention 建立在 Transformer 的注意力之上）
3. 把"O(N²) memory bottleneck"作为新概念加入，同时链接两篇论文
4. 在"Scaled dot-product attention"页面中补充 Flash Attention 的优化描述

网络在无人干预的情况下不断变稠密。每篇新论文创建的交叉链接都比前一篇更多，因为已经有更多现有内容可以连接了。

## 第五步：查询你的研究

一旦你索引了 5 篇以上的论文，Query 界面就变成了一个研究工具。

**研究型查询示例：**
- "有哪些方法被提出来优化注意力机制的效率？"
- "我 Wiki 里的哪些论文在 GLUE 数据集上做了基准测试？"
- "根据我索引的论文，当前注意力优化方法有哪些局限性？"
- "根据我的笔记，比较标准注意力和 Flash Attention 的内存需求。"
- "哪些作者出现在我索引的多篇论文中？"

这些查询之所以有效，是因为 LLM 拥有一个统一的知识体——你所有索引过的论文以互联页面的形式存在——而不是文件夹里一堆孤立的 PDF 文件。

## 实战示例：三篇注意力机制相关论文

你索引了三篇关于注意力机制的论文，笔记如下：

**论文 1：《Attention Is All You Need》**——介绍了 Transformer 架构。Fine 粒度。

**论文 2：《Flash Attention》**——内存高效的精确保注意力。Fine 粒度。

**论文 3：《Efficient Transformers: A Survey》**——高效注意力方法综述。Standard 粒度。

三篇全部摄入后，你的 Wiki 大约有 50 个页面：每篇论文 15-20 个。实体页面包括：
- 6 个作者页面（Vaswani、Tri Dao 等）
- 10 个方法页面（Scaled dot-product attention、Multi-head attention、Tiling、Recomputation 等）
- 5 个数据集页面（WMT 2014、GLUE 等）
- 15 个概念页面（Attention Mechanism、Sequence-to-Sequence、IO-aware 等）

Graph View 显示的是一个连通的聚类，而不是三个孤立的。Flash Attention 页面链接到 Transformer 页面。综述页面同时链接前两者。"Efficient Attention"概念页面有来自三篇论文的反向链接。

查询"我的论文里提到了哪些高效注意力的不同方法？"会返回一份整合回答，涵盖稀疏注意力（来自综述）、Flash Attention 的分块优化（来自 Flash 论文），以及作为基线的原始 Transformer 注意力（来自 Transformer 论文）。这个回答引用了所有三个来源，因为它们在你的 Wiki 中都是互联的。

## 下一步

现在你掌握了研究论文的工作流程：准备结构化笔记、选择合适的粒度、摄入和检查、跨论文构建网络、以及在整个研究库中查询。

下一篇：[**动手实践（五）：在 Canvas 上绘制知识地图**](/zh/blog/posts/canvas-llm-wiki) —— 把 Wiki 页面映射到 Obsidian Canvas 上，创建空间化的知识布局。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
