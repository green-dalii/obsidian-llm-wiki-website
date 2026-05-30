---
title: "从这里开始（四）：从零到百页 Wiki"
description: "从零开始构建一个活的知识库。手把手教你设置第一批来源、运行提取，看着知识成形。"
date: 2026-04-28
tags: ["教程", "入门", "指南"]
related: ["daily-knowledge-loop", "web-clipper-workflow", "choosing-models"]
series: "getting-started"
---

## 循序渐进

第一天不要把整个知识库都倒进 `sources/`。从 2–3 篇你熟悉的文档开始。观察 10 个页面的生长过程，比盯着 200 个页面发呆收获更多。

## 第一步：安装和配置

1. 从 Obsidian 社区插件市场安装本插件
2. 打开设置 → Karpathy LLM Wiki
3. 选择服务商（DeepSeek V4-Flash 是最佳起步选择）
4. 填入 API 密钥，点击 **获取模型** → 选择一个模型
5. 点击 **测试连接** → 绿色"LLM 就绪"指示灯亮起即表示准备就绪
6. 点击 **保存设置**

## 第二步：创建第一个来源

在知识库根目录创建 `sources/` 文件夹。把一篇笔记放进去——可以是博客文章、论文摘要或研究笔记。

## 第三步：运行提取

按 `Cmd+P`，输入 **"Ingest Sources"**。一篇普通文章大约需要 5–15 秒。

完成后，你会看到一份**提取报告**，展示提取了哪些实体、创建了哪些页面、建立了哪些链接。

## 第四步：探索你的 Wiki

打开 `wiki/` 文件夹。你会看到 `entities/`、`concepts/`、`sources/`、`index.md` 和 `log.md`。打开几个页面，注意那些 `[[双向链接]]`。打开图谱视图。

## 第五步：提问

`Cmd+P` → **"Query Wiki"**。问一个关于你刚刚提取的内容的问题。答案来自*你的*笔记，而非互联网。

## 常见误区

**不要用旗舰模型做提取。** 先用便宜的模型起步，需要时再升级。

**不要跳过别名。** 当 Lint 提示缺少别名时，运行 Complete Aliases。

**不要忽略日志。** `wiki/log.md` 记录了每一次操作。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
