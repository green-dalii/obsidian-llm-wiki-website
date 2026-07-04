---
title: "实践指南（5）：把 Wiki 页面画到 Obsidian Canvas 上"
description: "Canvas 能展示图谱视图看不到的结构——簇、枢纽、孤立页。Karpathy LLM Wiki 与 Canvas 联动，让你的 Wiki 从节点云变成空间地图。"
date: 2026-05-29
tags: ["实践指南"]
series: "workflow-guides"
related: ["daily-knowledge-loop", "introducing-llm-wiki", "schema-layer-deep-dive"]
---

## Graph View 的局限

Obsidian 的 Graph View 不可或缺。它把每条笔记显示为节点、每个链接显示为边。你能看到聚类、找到孤立页面、观察知识图谱的成长。它是快速了解 Wiki 整体形状的最佳工具。

但 Graph View 有硬伤：

- **不能自由摆放。** 节点由力导向布局算法决定位置。你不能把"Attention Mechanism"拖到屏幕上方、把"GPU Optimization"拖到下方来反映概念层级。每次打开图谱，节点都会重新排布。

- **没有因果流向。** Graph View 显示 A 连接到了 B。但不显示 A 是导致了 B、引用了 B、反驳了 B、还是建立在 B 之上的。所有边都是一模一样的。

- **不能按类型分组。** 实体页面、概念页面和源页面看起来一模一样。你无法一眼看出"这个是人物"还是"这个是方法论"。

- **没有布局意图。** 图谱布局是算法算出来的，不是有人故意安排的。你不能说"这五篇论文是这个主题的基础，那三篇是建在其上的应用"。

Canvas 解决了以上所有问题。当它和 LLM Wiki 结合时，就变成了 Graph View 无法复制的空间知识地图。

## 为什么 Wiki + Canvas 很强大

LLM Wiki 负责生成结构。Canvas 让这些结构可见且可操作。

当你摄入一条源材料时，插件会创建实体页面、概念页面和双向链接。这些结构存在于文件系统和 Graph View 里。但它是隐性的——你得自己去探索才能发现。

Canvas 把这些隐性结构变成了显性的。你把 Wiki 页面拖到 Canvas 上，放在你想放的位置，画线表示关系，加注释，创建分组。Canvas 变成了你 Wiki 知识的一个策展视图。

核心洞见：**LLM 生成内容，你设计布局。** 这样的分工让各自做最擅长的事。LLM 负责提取和连接。你负责组织和叙事。

## 三步映射工作流

**第一步：导出页面列表。** 找出你的 Wiki 中与某个主题相关的核心页面。用 Obsidian 的搜索功能，通过标签或关键词找到所有相关的实体和概念页面。你也可以用 Query 界面："列出我 Wiki 中所有与 Transformer 架构相关的概念页面。"把结果复制到一条临时笔记里。

**第二步：创建 Canvas 文件。** 在 Obsidian 中，用 `Cmd+P` → "Create new Canvas" 创建一个新的 Canvas。按主题命名："Transformer 架构知识地图"、"注意力机制研究全景"——根据你的领域来定。Canvas 文件是一个 JSON 文件，和你的笔记放在一起。重启不会丢失，可以通过 Obsidian Sync 或 Git 同步，也可以分享。

**第三步：摆放和连接。** 从文件浏览器把 Wiki 页面拖到 Canvas 上。逐一放在它们在概念上合理的位置：

- **基础概念**放在底部或左侧
- **应用方法**放在顶部或右侧
- **衍生技术**放在中间
- **相关的子话题**聚集在各自的区域

在卡片之间画箭头，展示方向性关系——"基于"、"影响"、"反驳"、"扩展"。这些箭头承载了 Graph View 的边无法表达的含义。

## 具体示例：DeepSeek 研究项目

你一直在研究 DeepSeek 模型。你的 Wiki 从几篇文章和论文中获得了这些页面：

- DeepSeek（公司实体）
- Mixture of Experts（概念）
- Multi-head Latent Attention（概念）
- DeepSeekMoE Architecture（概念）
- DeepSeek V2（模型实体）
- DeepSeek V3（模型实体）
- DeepSeek R1（模型实体）
- Reinforcement Learning from Human Feedback（概念）
- Inference Optimization（概念）
- Caching Strategies（概念）
- Model Distillation（概念）

Graph View 显示 11 个节点和它们之间的边。很准确。但也很拥挤。

在 Canvas 上，你可以把它们这样排列：

```
第一行：          DeepSeek V2    DeepSeek V3    DeepSeek R1
                 （模型）        （模型）        （模型）

第二行：          MoE ──────→ Multi-head Latent Attention ──────→ Inference Optimization
                 （架构）          （创新）                         （应用）

第三行：          RLHF ───→ Distillation ───→ Caching
                 （训练）      （压缩）          （部署）
```

空间布局瞬间揭示了结构：

- **按类型分组**——模型一行，架构概念一行，训练方法一行。每个页面的类型从位置就能看出来，不需要读内容。

- **因果流向**——箭头展示了方向性关系。"Multi-head Latent Attention"指向"Inference Optimization"，因为这项创新支撑了优化。"RLHF"指向"Distillation"，因为 RLHF 产出的模型会被蒸馏。流向从左到右、从上到下。

- **核心位置**——"Multi-head Latent Attention"位于 Canvas 中央，连接最多。扫一眼就知道这是 DeepSeek 系列工作的关键创新。Graph View 会显示它是一个有很多边的节点，但 Canvas 通过摆放位置让核心地位一目了然。

## 高级 Canvas 技巧

**用分组处理子话题。** 选中相关卡片，按 `Cmd+G` 创建分组。分组有彩色边框和标签。一个研究主题用一种颜色：蓝色表示架构，绿色表示训练方法，橙色表示部署。颜色编码让浏览更快。

**添加注释。** Canvas 支持纯文本卡片。加入 LLM 不会写的内容——你自己的观点、疑问和未来的研究方向。"我觉得这个方法在长上下文检索任务上应该很有效，需要试试。"这些注释是个人的上下文，让 Canvas 真正属于你。

**嵌入图片。** 把截图、论文中的架构图或图表拖进 Canvas。视觉材料和文本页面互补。一张 DeepSeekMoE 架构图放在文字描述旁边，两者都变得更有用。

**分层创建多张地图。** 为不同的研究领域创建独立的 Canvas。一张"Transformer 优化"Canvas 映射注意力方法。一张"部署"Canvas 映射推理基础设施。它们引用重叠的页面，但展示不同的关系。每张 Canvas 对相同的底层知识讲述不同的故事。

**在 Canvas 和 Wiki 之间建立链接。** 在 Canvas 卡片的文本内容里，你可以包含 `[[wiki-links]]`。点击链接会打开对应的 Wiki 页面。这就把空间布局和基于文件的知识图谱连接起来了。你也可以从 Wiki 页面添加指向 Canvas 文件的链接。

## 什么时候用 Canvas，什么时候用 Graph View

| 方面 | Graph View | Canvas |
|------|-----------|--------|
| 最适合 | 快速概览、找孤立页面、发现聚类 | 深入理解、呈现结构、规划 |
| 布局 | 算法生成，每次打开都变 | 手动摆放，可持久，有意图 |
| 关系 | 无向边 | 带标签的有向箭头 |
| 分组 | 仅限颜色（局部图谱） | 空间位置和分组节点 |
| 注释 | 无 | 文本卡片、图片、链接 |
| 维护 | 自动（跟随 Wiki 更新） | 手动（需要策展） |
| 规模 | 任意大小 | 最适合 10-50 个节点 |
| 时间投入 | 零（自动渲染） | 每张 Canvas 15-30 分钟 |

**用 Graph View** 的时候：想快速检查——增加了哪些新页面？有孤立页面吗？连接图的密度如何？

**用 Canvas** 的时候：想深入理解某个主题——这些概念之间有什么因果联系？层级结构是怎样的？哪些是核心，哪些是外围？

两者都不可或缺。Graph View 是雷达。Canvas 是地图。

## 和查询到 Wiki 回路的联动

Canvas 和查询到 Wiki 的反馈回路可以协同工作。

1. 你就某个主题查询 Wiki。LLM 返回整合内容。
2. 你把整合结果保存为新的 Wiki 页面（Save to Wiki）。
3. 你把新页面添加到已有的 Canvas 上，放在它在概念层级中合适的位置。
4. Canvas 现在反映了新的知识组织方式，而底层的 Wiki 也已将新页面编入索引，供将来查询使用。

Canvas 捕获了 LLM 无法表达的空间组织方式。LLM 捕获了 Canvas 可能会遗漏的连接。两者结合，比单独使用更强大。

## 下一步

现在你理解了 Canvas 如何揭示 Graph View 看不到的结构，如何通过类型分组和因果流向把 Wiki 页面映射到 Canvas 上，以及每种可视化工具各自适合的场景。

下一篇：[**动手实践（六）：打通 Zotero 到 Wiki**](/zh/blog/posts/zotero-pdf-integration) —— 从 Zotero 到 Obsidian 再到 LLM Wiki，学术文献的完整自动化链路。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
