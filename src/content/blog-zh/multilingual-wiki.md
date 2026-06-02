---
title: "日常维护（一）：多语言 Wiki 怎么做"
description: "v1.6.5 引入了 Wiki 输出语言——8 种语言可选，完全独立于界面语言。"
date: 2026-05-09
tags: ["入门必读"]
related: ["eight-languages", "research-papers-workflow"]
series: "maintenance"
---

## 问题：你的语言，你做主

你是一位日本开发者，Obsidian 用的是英文界面。你把日文笔记放进 `sources/`。Wiki 应该用英文还是日文？

在 v1.6.5 之前，答案是：必须和界面语言一致。

## 解决方案：Wiki 输出语言独立设置

v1.6.5 引入了 **Wiki 输出语言**设置——你可以选择 LLM 用哪种语言撰写 Wiki 页面，完全独立于插件的界面语言。

**现在你可以拥有：**
- 英文界面 + 日文 Wiki
- 中文界面 + 英文 Wiki
- 8 种支持语言的任意组合

**支持的语言：** EN、ZH、JA、KO、DE、FR、ES、PT——还支持自定义输入。

## 实现原理

所有面向 LLM 的提示词都以英文编写。Wiki 输出语言作为配置参数注入。这意味着：

1. **提示词质量一致** — 英文提示词最可靠
2. **无需翻译提示词** — 不用维护每个提示词的 8 个版本
3. **输出灵活** — LLM 在生成时负责翻译

## 下一步

多语言 Wiki 只是第一步。接下来是让插件自身的界面也支持同样的 8 种语言——这在 v1.8.0 中实现了。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
