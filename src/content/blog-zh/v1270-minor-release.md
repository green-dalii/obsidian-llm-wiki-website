---
title: "新版速览：v1.27.0 —— 任意文档都可丢进 vault，用工作账号登录"
description: "PDF、图片、Office 文档现在和 Markdown 笔记一起接入 Wiki。AWS Bedrock 支持 SSO。默认不再自动生成空 stub 页。你现有的 Wiki 不会变 —— 点一下 Update 就完事。"
date: 2026-08-28
tags: ["公告"]
related: ["introducing-llm-wiki", "v123-graph-engine-ai-sdk", "pdf-ingest-guide", "headless-cli", "faster-ingestion"]
---

## 升级，然后忘掉

v1.27.0 发布了。如果插件已经装着，你会在 **Obsidian → Settings → Community plugins** 看到一个 **Update** 按钮。点一下。你的 Wiki、设置、历史——全部带过去，默认什么都不会变。

但你如果愿意四处看看，下面这些是以前做不了、现在可以了的事。

## 任意文档都可丢进 vault

在今天之前，只有 PDF 能作为源材料接入你的 Wiki。现在 PDF 多了一群同伴：**图片（PNG/JPG/JPEG/JP2/WebP/GIF/BMP）** 和 **Office 文档（DOC/DOCX/PPT/PPTX/XLS/XLSX）**。一份扫描合同、上月复盘的 PPT 演示稿、装满数字的电子表格——和笔记一样丢进 vault，就会接入同一张 Wiki 图。

转换是一颗开关，在 Settings → Wiki Configuration → Markdown Conversion Backend → **MinerU**。Token 只放在 Obsidian SecretStorage 里——你的 `data.json` 里不会有，任何日志里也不会有。如果你哪天想换回老办法，把开关拨到 **Native**，PDF 的体验就和 v1.27.0 之前完全一样。全部五条入口都写在 [PDF 摄入指南](/zh/blog/posts/pdf-ingest-guide/) 里，挑适合你 vault 的那条用。

## 用工作账号登录

如果你的公司在用 AWS Bedrock，你不再需要把 API key 放在插件设置里了。v1.27.0 加了两种新的鉴权方式：

- **SSO**。标准"用工作账号登录"流程。在 Settings → Provider → Bedrock 点 **Sign in with AWS SSO**，把浏览器里显示的验证码粘过去，就完事了。剩下的插件在后台处理。
- **IAM**。静态访问密钥，给没有 SSO 的环境用——CI runner、定时批处理。和所有其他凭据一样存在 Obsidian SecretStorage 里。

原来的 **API key** 模式行为没变。如果你是这样在用 Bedrock 的，继续用就好。选哪种模式，Settings 里那一行就只问这一种真正需要的字段。完整走法见 [插件 README 的 Bedrock 章节](https://github.com/green-dalii/obsidian-llm-wiki#aws-bedrock--three-auth-modes-v1270-425)。

SSO 流程目前仅桌面端可用。移动端在路上；如果你的工作流依赖它，请开个 Issue 把场景说清楚。

## 不再乱建空 stub 页

这条改动很小，但你日常用会立刻注意到。在今天之前，如果你的源笔记里提到了 Wiki 解析不到的名字，插件会悄悄建一张空的 stub 页。有时这种 stub 有用；多数时候它只是给你的图谱添一行占位，同时把"这是个死链"的信号一起吞掉。

v1.27.0 把这个默认关掉了。如果源笔记提到了一个解析不到的名字，死链会继续显示在 lint 报告里，直到有一个真正的源把它定义出来——这本来就是 lint 系统该干的活。摄入照样会通过常规通路建页；这一改只影响"确实解析不到的"那一类。

如果你怀念老行为，开关在 **Settings → Advanced** → **Create Stubs for Unresolvable Links**。点一下就回来。默认是什么，由你选。

## 来源页也带上原文引用

你 Wiki 里的每张实体页和概念页早就带一段 **Mentions in Source**——抽取阶段捕获的原文引用。但代表原始文档本身的那张页（`sources/<slug>.md`）没有。以前你想验证某条说法，从 Wiki 页跳到来源页，证据链就在来源页断了。

现在不断了。Wiki 里每一页都带着同样一条通往原文的证据链。Lint 还会把每条引用回到底层 PDF（或 Markdown）做校对，让错放的引用在进入 Wiki 之前就被拦下。对研究工作流而言，这意味着从 Wiki 任何一页都能直接走到原始文档，反过来也对得上。

## 一些小东西

- **每步 task policies**——LLM Advanced 里新增一个字段，可以告诉插件"对 `extract` 用 text 模式，对 `merge-triage` 用 JSON"，不用动代码。你没列出来的步骤，内置默认保持原样。如果某一步在成本或质量上拖累你，这颗开关就是杠杆。
- **摄入候选门控**——Settings → Advanced 下面一颗可选开关。对源语言已经有实测 profile 的 vault，那些"被提到但没被原文处理"的候选（出现在括号、列举、短列表里的），会在付出"建一张页 + 跑去重 + 跑生成"的代价之前被剔除。默认关；少建页是行为变化，由你选。

## 怎么拿到

- **已经装着？** **Obsidian → Settings → Community plugins → Update**。点一下。
- **新用户？** **Obsidian → Settings → Community plugins → Browse → 搜 "Karpathy LLM Wiki" → Enable**，或者用首页的 [Add to Obsidian](/) 按钮。

完整发布说明（含工程细节）见 [v1.27.0 release 页面](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.27.0)，维护者自己的总结在 [Discussion #555](https://github.com/green-dalii/obsidian-llm-wiki/discussions/555)。