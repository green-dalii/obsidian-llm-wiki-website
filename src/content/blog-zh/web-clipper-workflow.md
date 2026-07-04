---
title: "实践指南：Web Clipper 阅读到知识流水线"
description: "把任何网页剪藏到 Obsidian，看 Karpathy LLM Wiki 把它变成带双向链接的 Wiki 页面，连回你已有的笔记。"
date: 2026-05-27
tags: ["实践指南"]
series: "workflow-guides"
related: ["daily-knowledge-loop", "zotero-pdf-integration"]
---

## 剪藏党的困境

Web Clipper 这东西很危险。它让收集变得太容易了，容易到你都不再思考自己在收什么了。

你读了一篇有意思的文章。点一下剪藏插件。全文就躺进了你的笔记应用。你觉得自己很高效——"保存"了知识。但说实话，你只是创建了一个加了点料的书签。

文章躺在一个文件夹里。你再也没读过它。后来要找也找不到——在 200 篇剪藏文章里翻索引，还不如直接在 Google 上搜来得快。那些文章里的知识——概念、联系、交叉引用——全都锁在单个文件里出不来。

Obsidian Web Clipper 解决了"捕获"这部分。LLM Wiki 解决了剩下的一切。

## 完整管道

从文章到知识图谱的完整流程：

1. **剪藏**——用 Obsidian Web Clipper 把网页保存到 `sources/`
2. **摄入**——运行 Ingest Sources 处理剪藏内容
3. **提取**——LLM 从文章中提取实体、概念和关系
4. **创建**——生成 Wiki 页面，自带 `[[双向链接]]`
5. **连接**——新页面链接到已有页面，出现在 Graph View 中
6. **查询**——文章里的知识从此可搜索、可发现

六个步骤。其中第一步点一下，第二步敲一条命令。剩下的全自动。

## 第一步：安装和配置 Web Clipper

Obsidian Web Clipper 是官方 Obsidian 插件。你可以在社区插件市场安装，也可以用浏览器扩展。

**浏览器扩展设置：**
1. 安装 Obsidian Web Clipper 浏览器扩展（支持 Chrome、Firefox 和 Safari）
2. 点击扩展图标，连接到你的 Obsidian Vault
3. 选择目标文件夹：设为 `sources/`

**LLM Wiki 的 YAML 模板：**

配置 Web Clipper 为每篇保存的文章使用以下模板。它能生成 LLM Wiki 可以高效处理的前置元数据：

```yaml
---
title: "{{title}}"
url: "{{url}}"
date: "{{date}}"
domain: "{{domain}}"
tags:
  - "web-clip"
  - "{{firstTag}}"
---
{{content}}
```

`domain` 字段是可选的，但用来追踪知识的来源很有用。LLM Wiki 在摄入时不会处理它，不过你可以在需要时用它手动筛选来源。

## 第二步：配置剪藏模板

打开 Obsidian Web Clipper 设置，创建一个模板：

- **目标文件夹：** `sources/`
- **文件名格式：** `{{date}} {{title}}`——以日期为前缀，排序更方便
- **前置元数据：** 上面的 YAML 模板
- **内容格式：** 全文 HTML 转 Markdown

模板很重要，因为 LLM Wiki 需要读取完整的文章内容。如果剪藏工具去掉了太多格式或者漏掉了段落，LLM 就没那么多材料可以提取。全文剪藏产生的实体提取质量远高于摘要式的片段。

## 第三步：剪藏 + 摄入——实战演示

来看一个真实场景。假设一周之内，你剪藏了三篇文章：

**文章 1：《理解 Transformer 架构》**——关于自注意力机制、位置编码和多头注意力的技术深挖。

**文章 2：《什么是 Foundation Model？》**——大规模预训练模型、迁移学习和涌现能力的概述。

**文章 3：《RAG 实战指南》**——关于检索增强生成、向量数据库和分块策略的教程。

把三篇文章都剪藏到 `sources/` 之后，运行 **Ingest Sources**（`Cmd+P` → "Ingest Sources"）。

摄入报告显示：

| 文章 | 提取实体数 | 创建页面数 | 建立链接数 |
|------|-----------|-----------|-----------|
| Transformer Architecture | 12 | 8 | 24 |
| Foundation Models | 8 | 6 | 18 |
| Practical RAG Guide | 15 | 10 | 35 |

**总计：** 3 篇文章产出了 24 个页面，建立了 77 个链接。时间花费：一周里花了 2-3 分钟剪藏，运行摄入花了 20 秒。

## 第四步：看着知识自动连接

摄入后打开 Graph View。你会看到三个聚类，分别对应三篇文章。但因为 Transformer、Foundation Model 和 RAG 是相互关联的话题——Transformer 支撑了 Foundation Model，Foundation Model 支撑了 RAG——LLM 已经创建了跨文章的链接。

- "Transformer Architecture" 实体页面链接到 "Self-Attention" 和 "Multi-Head Attention"
- "Foundation Models" 实体页面链接到 "Pre-training" 和 "Transfer Learning"——同时也链接到 "Transformer Architecture"，因为 Foundation Model 用的是 Transformer
- "RAG" 概念页面链接到 "Vector Database"、"Chunking"、"Embeddings"——同时也链接到 "Foundation Models"，因为 RAG 依赖它们

三篇独立的文章变成了一个互联的知识图谱。这些连接不只是关键词匹配。LLM 理解 Foundation Model 是建立在 Transformer 架构之上的，而 RAG 又需要 Foundation Model 作为前置条件。这些链接反映的是真实的概念关系。

**关键词搜索做不到的事：** Graph View 显示 "Chunking" 连接到了 "Tokenization"——尽管三篇文章里只有一篇用了"tokenization"这个词。LLM 通过概念理解识别出了这个关系，而不是字符串匹配。

## 每周批处理工作流

日常剪藏 + 每周摄入是最有效率的节奏。

**工作日：** 看到有意思的文章就剪藏。不用停下来跑摄入。不用担心重复。剪藏工具会自动加上前置元数据。文件落到 `sources/`。你继续阅读。

**周末：** 跑一次 Ingest Sources。所有累积的剪藏一次性处理完。去重系统防止页面膨胀。看一下摄入报告，确认有没有提取问题。

这种批处理方式有两个好处：
- **认知开销更低。** 每周处理一次知识，而不是每天多次。
- **交叉引用更密集。** 当多篇文章共享概念时，LLM 一次处理完所有内容，能把它们联系起来。周批处理产生的连接图比逐天摄入更稠密。

## 实用技巧

**优先处理长文。** Web Clipper 可以保存推文和短帖子，但 LLM 从 800 字以上的文章里提取的实体更多。一篇 200 字的摘要只能产出 2-3 个页面。一篇 2000 字的深度文章能产出 10-15 个。质量优先于数量。

**大多数剪藏用 Standard 粒度。** Standard 粒度设置对普通网页文章处理得很好——为每个不同的实体和概念创建页面，不会太激进。只有在处理术语密集的技术文章时才切换到 Fine。

**必要时清理剪藏内容。** 有些网页包含大量样板内容（导航栏、Cookie 通知、评论区）。在摄入前做简单的行内编辑可以去除这些噪音。LLM 对干净的输入处理得更好。摄入前花 30 秒编辑一下，提取质量会有明显提升。

**摄入后检查源摘要。** 每条摄入的源材料都会在 `wiki/sources/` 里得到一份摘要页面。这份摘要告诉你 LLM 提取了什么。如果摘要漏掉了文章中的关键点，你可能需要调整原文的措辞或补充更多细节，以便下次提取得更好。

## 完整管道速览

| 步骤 | 操作 | 工具 | 时间 |
|------|------|------|------|
| 1 | 剪藏文章到 `sources/` | Obsidian Web Clipper | 5 秒 |
| 2 | 运行 Ingest Sources | LLM Wiki 命令 | 15-30 秒 |
| 3 | 查看摄入报告 | LLM Wiki 报告 | 30 秒 |
| 4 | 探索新页面 | Obsidian Graph View | 5 分钟 |
| 5 | 跨剪藏内容查询 | LLM Wiki Query | 按需 |

从剪藏到知识，大约 6 分钟。一篇文章从"文件夹里的一个文件"变成"个人知识图谱中的一个连接节点"，主动操作不到一分钟。

## 下一步

现在你掌握了整套 Web Clipper 管线：剪藏到 `sources/`、每周摄入、探索连接。我们举例中的三篇文章变成了 24 个页面和 77 个链接——这是一个能用的知识图谱，不是一堆书签。

下一篇：[**动手实践（四）：从论文到知识图谱**](/zh/blog/posts/research-papers-workflow) —— 把学术论文变成结构化的研究 Wiki。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
