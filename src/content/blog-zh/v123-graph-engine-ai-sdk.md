---
title: "公告：v1.23 — 链接图作为搜索索引"
description: "Karpathy LLM Wiki 通过蒙特卡洛个性化 PageRank 遍历你的 Wiki [[link]] 图，找到你写过的主题。每个 LLM 提供商真正流式输出，新增多文件摄入与自动生成的 Welcome 笔记。"
date: 2026-07-02
tags: ["公告"]
related: ["monte-carlo-ppr", "modular-architecture", "introducing-llm-wiki", "auto-maintenance"]
series: "announcement"
---

v1.23 今天上线。它让 Query Wiki 把你的 `[[wiki-link]]` 图当图来读，让所有供应商实时流式输出答案，让你精确挑文件摄入，在新 vault 里写一份翻译好的欢迎页。插件本身用起来和之前完全一样；新的是 Query Wiki 能找到什么。

## 头条数字

**Query Wiki top-5 召回率：21.5% → 23.8%**，基于真实知识库的调优。v1.22 停在关键词匹配的天花板上。同一个 vault 上一个最先进的嵌入模型（[bge-m3](https://huggingface.co/BAAI/bge-m3)）得分领先三个百分点——完全在采样噪声内——换来零嵌入成本、任意供应商、完全离线。

跑出这些数字的图谱来自社区贡献：910 页、5,862 条有向边、**99.9% 的页面在一个连通分量里**。同一份 vault 上调优出来的参数：3,000 次随机游走/查询、游走长度 20、阻尼因子 0.05。总成本约 50 万次浮点运算/查询，跑在 web worker 里。

## 新增内容

**Query Wiki 走图。**问"我写过哪些心脏病相关的东西？"它从 Cardiology 出发（你肯定从十几处链接过它），把链接回它的、那三个讲具体心脏病的页面顶上来。如果你的 Wiki 不到 30 页左右或链接稀疏，级联优雅回退到关键词匹配。

**每个供应商的真流式输出。**v1.22 的渲染器有一个微妙的竞态：消费 AI-SDK 的完整事件流，全部累积，**然后**才消费文本流——所以文本在最后一次性出现。v1.23 只消费文本流，加 `requestAnimationFrame` 把块合并成"一帧一次重绘"。每个供应商（Anthropic、OpenAI、Google、Ollama、LM Studio）都逐块流出。

**多文件摄入。**`Cmd+P → "Ingest multiple files"` 打开一个双栏选择器——左边是文件夹树（带复选框），右边是实时队列。加 5 条，加 50 条。取消某一条而不影响其他。

**新 vault 的欢迎页。**在还没有 Welcome 笔记的 vault 里安装，插件会写一份 `Welcome.md` 到你的 vault——**自动生成**，不是可编辑的表单。内容由 LLM **在写入时**翻译成你的 Wiki 输出语言（没有硬编码 i18n），所以不同 vault 里的用户看到的是各自语言的同一份说明。三个层级的行为：Tier A（没有 LLM 配置）只收到一条提示；Tier B（新 vault 且有 LLM）会写入一份新的 Welcome 笔记；Tier C（已有 wiki）保持静默。有个 `createWelcomeNote` 设置（默认开启）可以完全关掉这个行为，外加一条"重新生成 Welcome 笔记"命令——你删了文件后想找回它就用得上。

## 架构是怎么定下来的

这是 Query Wiki 自 v1.0 以来最重大的一次变化，我们没有私下拍板。[Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) 在公开场合跑了四天，两位社区成员的贡献塑造了架构，塑造的方式我一个人想不到。

讨论的起点是一个锐利的框定：页面之间的每一个 `[[wiki-link]]`，**本身就是一次嵌入**。LLM 在摄入阶段断言"这两页相关"。一张图就是那些嵌入——只不过这次推理是由一个非常擅长这件事的上游模型预先完成的。所以问题从来不是"图 vs 嵌入"，而是"我们是按需重做这次推理，还是走我们已有的图？"。

走图在三件事上赢了。**供应商覆盖**：大多数用户实际在用的供应商（DeepSeek、GLM、MiniMax、Ollama、LM Studio、Anthropic）完全不暴露嵌入接口；围绕单一供应商的端点建核心会锁掉大多数用户。**状态**：一个 2,000 页的嵌入索引约 12 MB 每 vault 的存储，要版本化、模型变更时迁移、常驻内存。**信号本来就在 vault 里**：每个链接都是 LLM 在免费做嵌入质量的工作；图不需要被学习。

**第一次重大修正**来自 @GioiaZheng。我把 PPR 描述为与嵌入"数学等价"——这是错的，而纠正很关键：嵌入确实能提供链接结构捕捉不到的信号——刚加上还没从任何地方链过的新页面、跨语种查询、词汇漂移。PPR 是**默认**排序器。嵌入是 PPR 看不见的几种情况下的**可选**增强层。这个区分现在焊死在架构里。

**第二次重大修正**来自 @DocTpoint，它改变了整个计算的形态。PPR 经典做法是幂迭代：确定性算出游走的平稳分布，对整张图扫约 50 遍。@DocTpoint 指出，对 top-k 检索我们不需要平稳分布——我们只需要知道游走者最常访问哪些页面。**对游走做采样而不是求解**：从种子出发跑 K 段短游走，数访问次数，取 top-k。这是 [Fogaras et al. 2005, *Towards Scaling Fully Personalized PageRank*](https://www-cs.stanford.edu/tdang/papers/fogaras05ppr.pdf)。成本按 **O(K × L)** 算——与 |V| 无关。2,000 页的 vault 每次查询成本和 200 页的一样。并且这些游走是天然可并行的——这正好能塞进 Web Worker，Obsidian UI 永远不会卡。我们为 v1.23 选了蒙特卡洛 PPR。

**第三条线——冷启动**——结果发现是两个问题，不是一个。空 vault 没有结构可检测；缺失的输入是"存在哪些领域"，只有用户知道。稀疏 vault 有结构但不够让 PPR 有意义；这需要算法层面的守门。v1.23 在 `src/core/ppr-cascade.ts` 内部用 `min_pages` / `min_edges` 阈值（常量 `30` / `30`）处理第二种情况——低于阈值就回退到关键词匹配。这些是内部调参旋钮，**不是面向用户的设置**；如果用户的 wiki 太小，他们不会看到错误，只是回到旧的关键词行为。

五种功能塌缩为一个原语——hub 检测、链接区分度、查询检索、死链 hub 检查、以及原来的 "Tier C" 图遍历——全部归到一个蒙特卡洛 PPR 原语上。讨论串估算核心约 80 LOC，加上 ~50 LOC 的 hub 检测和 ~30 LOC 的 section 提取器（替换每次查询的 LLM 调用）。

如果你想读完整对话，[Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) 有每一条论证，包括我们否决的方案。

## 供应商版本回归问题终结

v1.23 之前，插件自带 1,625 行手工编写的 LLM 客户端。Issue **#137 / #141 / #143 / #147 / #207** 都是同一种病的症状：供应商发新模型名或改 API 字段，这里就崩。v1.23 删了全部客户端，换上 [Vercel AI-SDK v6](https://sdk.vercel.ai/)——`@ai-sdk/openai@3`、`@ai-sdk/anthropic@3`、`@ai-sdk/openai-compatible@2`。8 个旧测试文件（2,609 行）和客户端一起删了。

## 谁推动了这个版本

**@DocTpoint**——这个插件 hub-detection 和 link-distinctiveness 扫描器的作者。除了 #235，他还提出了**蒙特卡洛 PPR 方法**，让 top-k 检索在每次查询的常数成本下成为可能。他也推翻了我最初写的冷启动框架——*"空 vault 上缺失的输入是'存在哪些领域'，而这个信息只有用户有"*——这成了三层 Welcome 笔记行为的潜在动机（不过在最终实现里，笔记是**自动生成**的，**不是用户可编辑的**——DocTpoint 最初提出的"奠基笔记"设计在 2026-06-28 评审时被明确移除，因为代码路径里没有任何东西会去读用户输入的领域）。他的 hub 生命周期框架（诞生 / 中期 / 退役）仍然是团队组织相关工作的骨架。他的隐私立场也值得注意：当被邀请分享一个真实 vault 作为评估 fixture 时，他拒绝了——*"我的 vault 不合适；医学材料落到外行手里有真实风险。"* 团队使用合成 fixture 替代。

**@GioiaZheng**——纠正了嵌入等价的框架（*"PPR 捕捉的是基于链接的关系；嵌入对未链接的、新加的、跨语种的、词汇漂移的页面仍能提供信号"*）。把冷启动分类为空 / 稀疏 / 成熟三种独立问题也来自这个讨论串。

两位也都是 v1.24.0 的贡献者，在同一个 Discussion 帖里，公开进行。

## 接下来

- **v1.23.1 PATCH 已经交付**（你现在用的就是这个版本）。不带功能改动的补丁，处理 Obsidian 审核机器人环境的对齐问题。
- **v1.23.2 PATCH 正在进行。** 社区成员 jameses-cyber 指出的两个真实 UX 缺口：增加一个开关来静音后台定期 lint 的进度通知，以及一个开关来决定 Query 最终响应是把视图滚回顶部还是留在底部。两个都有复现记录，都已批准，一起发。
- **v1.24.0 MINOR 在设计阶段。** PDF 源码摄入和源码版本感知——都在 [Discussions](https://github.com/green-dalii/obsidian-llm-wiki/discussions) 有公开讨论帖在敲定 API。Hub 淘汰 lint 串联也计划在这里。

## 快速开始

从 Obsidian 社区插件市场上安装或更新（搜索"Karpathy LLM Wiki"）。现有设置、提示词和 vault 全部继承，不需要迁移。新的 PPR 行为不需要开关——Query Wiki 现在就自动走图，图谱太小走不动时优雅回退到关键词匹配。

---

## 附录

**为什么用图，而不是用嵌入模型。**信息科学里有两条关于"哪些文档相关"的传统路径：引文分析（Garfield 1955，PageRank 1998）和嵌入模型。Personalized PageRank 是引文分析那条传统，套在你已经拥有的图谱上。你 vault 里的每一个 `[[wiki-link]]` 都是一次引用——LLM 在摄入时在断言"这两页相关"。Personalized PageRank 问 Garfield 那个问题，得出的排序和嵌入模型给你的相同。Haveliwala 在他 2002 年斯坦福关于主题敏感 PageRank 的论文中证明了这个等价性。

我们选图的三个实际原因：大多数用户实际在用的供应商（DeepSeek、GLM、MiniMax、Ollama、LM Studio、Anthropic）完全不暴露嵌入接口；一个 2,000 页的嵌入索引大约 12 MB 每 vault 的存储要版本化、模型变更时迁移；信号本来就在 vault 里。嵌入留给那些图谱确实看不见的情况——刚加上还没从任何地方链过、跨语种查询、词汇漂移。更小、更可选，不是默认。

**方法论。** 调优数据：910 页、5,862 条有向边、99.9% 的页面在一个连通分量里，作为匿名化度分布贡献。参数：3,000 次随机游走/查询、游走长度 20、阻尼因子 0.05。总成本约 50 万次浮点运算/查询，跑在 web worker 里。参考嵌入模型：[bge-m3](https://huggingface.co/BAAI/bge-m3)。架构讨论：[Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235)。

---

**安装**：[Obsidian 社区插件](https://obsidian.md/plugins?id=karpathywiki) · [v1.23.1 发布说明](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.23.1) · [Apache 2.0 许可证变更](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)