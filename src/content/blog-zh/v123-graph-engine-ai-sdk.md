---
title: "v1.23 发布：你 Wiki 里的链接，就是索引"
description: "v1.23 把你的链接图变成真正的搜索索引。Query Wiki 走图而不是靠标题猜。另外：每个供应商的真流式输出、多文件摄入、新 vault 欢迎页。"
date: 2026-07-02
tags: ["公告"]
related: ["introducing-llm-wiki"]
series: "announcement"
---

v1.23 今天上线。它让 Query Wiki 把你的 `[[wiki-link]]` 图当图来读，让所有供应商实时流式输出答案，让你精确挑文件摄入，在新 vault 里写一份翻译好的欢迎页。插件本身用起来和之前完全一样；新的是 Query Wiki 能找到什么。

## 头条数字

**Query Wiki top-5 召回率：21.5% → 23.8%**，基于真实知识库的调优。v1.22 停在关键词匹配的天花板上。同一个 vault 上一个最先进的嵌入模型（[bge-m3](https://huggingface.co/BAAI/bge-m3)）得分领先三个百分点——完全在采样噪声内——换来零嵌入成本、任意供应商、完全离线。

跑出这些数字的图谱来自社区贡献：910 页、5,862 条有向边、**99.9% 的页面在一个连通分量里**。同一份 vault 上调优出来的参数：3,000 次随机游走/查询、游走长度 20、阻尼因子 0.05。总成本约 50 万次浮点运算/查询，跑在 web worker 里。

## 新增内容

**Query Wiki 走图。**问"我写过哪些心脏病相关的东西？"它从 Cardiology 出发（你肯定从十几处链接过它），把链接回它的、那三个讲具体心脏病的页面顶上来。如果你的 Wiki 不到 30 页左右或链接稀疏，级联优雅回退到关键词匹配。

**每个供应商的真流式输出。**v1.22 的渲染器有一个微妙的竞态：消费 AI-SDK 的完整事件流，全部累积，**然后**才消费文本流——所以文本最后一次性出现。v1.23 只消费文本流，加 `requestAnimationFrame` 把块合并成"一帧一次重绘"。每个供应商（Anthropic、OpenAI、Google、Ollama、LM Studio）都逐块流出。DeepSeek 和 OpenAI o 系列的推理步骤折叠成答案上方一个可收起的块。

**多文件摄入。**`Cmd+P → "Ingest multiple files"` 打开一个双栏选择器——左边是文件夹树（带复选框），右边是实时队列。加 5 条，加 50 条。取消某一条而不影响其他。一次全部取消。

**新 vault 的欢迎页。**在还没有 Welcome 笔记的 vault 里安装，插件会写一份 `Welcome.md`——由 LLM **在写入时**翻译成你的 Wiki 语言。对空 vault，同一份笔记兼任奠基笔记——你可以在这写"这个 Wiki 覆盖哪些领域，一行一个"。

## 供应商版本回归问题终结

v1.23 之前，插件自带 1,625 行手工编写的 LLM 客户端。Issue **#137 / #141 / #143 / #147 / #207** 都是同一种病的症状：供应商发新模型名或改 API 字段，这里就崩。v1.23 删了全部客户端，换上 [Vercel AI-SDK v6](https://sdk.vercel.ai/)——`@ai-sdk/openai@3`、`@ai-sdk/anthropic@3`、`@ai-sdk/openai-compatible@2`。8 个旧测试文件（2,609 行）和客户端一起删了。

## 谁推动了这个版本

PPR 这个方向来自 [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235)——四天的公开讨论。

**@DocTpoint**是这个插件 hub-detection 和 link-distinctiveness 扫描器的作者，他推翻了我最初写的冷启动框架。*"空 vault 上缺失的输入是'存在哪些领域'，而这个信息只有用户有"*——这句话把冷启动问题变成了"问用户一个问题"，这成了 `Welcome.md` 的奠基笔记行为。

**@GioiaZheng**纠正了我对"嵌入等价性"的描述。我把 PPR 和嵌入说成"数学等价"——这是错的，嵌入确实能提供链接结构捕捉不到的信号（刚加上还没从任何地方链过的新页面、跨语种查询、词汇漂移）。PPR 是**默认**排序器；嵌入是 PPR 看不见的几种情况下的**可选**增强层。

两位也都是 v1.24.0 的贡献者，在同一个 Discussion 帖里，公开进行。

## 接下来

- **v1.23.1 PATCH 已经交付**（你现在用的就是这个版本）。不带功能改动的补丁，处理 Obsidian 审核机器人环境的对齐问题。
- **v1.23.2 PATCH 正在进行。** 社区成员 jameses-cyber 指出的两个真实 UX 缺口：增加一个开关来静音后台定期 lint 的进度通知，以及一个开关来决定 Query 最终响应是把视图滚回顶部还是留在底部。两个都有复现记录，都已批准，一起发。
- **v1.24.0 MINOR 在设计阶段。** 两个已追踪的特性——PDF 源码摄入和源码版本感知——都在 [Discussions](https://github.com/green-dalii/obsidian-llm-wiki/discussions) 有公开讨论帖在敲定 API 的形态。

## 快速开始

从 Obsidian 社区插件市场上安装或更新（搜索"Karpathy LLM Wiki"）。现有设置、提示词和 vault 全部继承，不需要迁移。新的 PPR 行为不需要开关——Query Wiki 现在就自动走图，图谱太小走不动时优雅回退到关键词匹配。

---

## 附录

**为什么用图，而不是用嵌入模型。**信息科学里有两条关于"哪些文档相关"的传统路径：引文分析（Garfield 1955，PageRank 1998）和嵌入模型。Personalized PageRank 是引文分析那条传统，套在你已经拥有的图谱上。你 vault 里的每一个 `[[wiki-link]]` 都是一次引用——LLM 在摄入时在断言"这两页相关"。Personalized PageRank 拿着这个断言，问 Garfield 那个问题——不是"这页链接到谁"，而是"被那些经常被链接的页所链接的，是谁"——得出的排序和嵌入模型给你的相同。Taher Haveliwala 在他 2002 年斯坦福关于主题敏感 PageRank 的论文中证明了这个等价性。

我们选图的三个实际原因：大多数用户实际在用的供应商（DeepSeek、GLM、MiniMax、Ollama、LM Studio、Anthropic）完全不暴露嵌入接口；一个 2,000 页的嵌入索引大约 12 MB 每 vault 的存储要版本化、模型变更时迁移；信号本来就在 vault 里。嵌入留给那些图谱确实看不见的情况——刚加上还没从任何地方链过、跨语种查询、词汇漂移。更小、更可选，不是默认。

完整的架构讨论：[Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235)。方法论和拓扑数字从那里链出。

---

**安装**：[Obsidian 社区插件](https://obsidian.md/plugins?id=karpathywiki) · [v1.23.1 发布说明](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.23.1) · [Apache 2.0 许可证变更](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)