---
title: "入门必读（3）：介绍 Karpathy LLM Wiki"
description: "这款开源 Obsidian 插件把你的笔记变成自组织 Wiki。Karpathy LLM Wiki 提取实体、构建双向链接、用自然语言回答关于你自己知识的问题。"
date: 2026-04-27
tags: ["入门必读"]
related: ["obsidian-basics", "first-100-pages", "why-llm-wiki-for-obsidian-users", "modular-architecture"]
series: "getting-started"
---

## 困境：笔记之间互不相通

你的 Obsidian 知识库里有笔记，有人物、概念、想法、关联。但它们现在只是文件夹里的文件。要找到彼此之间的联系，你得靠搜索、打标签，再祈祷自己还记得那条线索。

## Karpathy 的洞见

2024 年，Andrej Karpathy [提出了一个大胆的想法](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)：把笔记当作原材料，让 LLM 来做架构设计。它读取你写下的内容，提取出实体和概念，将它们编织成一个结构化的 Wiki——带有 `[[双向链接]]`、自动生成的索引，以及一个能从*你的*知识中回答问题的对话界面。

**你不需要亲自做图书管理员。** 不必决定哪些内容值得建页面，不必维护交叉引用，不必担心信息过时。笔记放在 Vault 里任意位置都行，LLM 读取、提取、撰写、链接，并标记矛盾之处——你只管保持心流。

## 三层架构

插件的运行模式固定为三层，所有命令都遵循同一个方向：

1. **Vault（只读）** —— 你的原始笔记放在 Vault 任意位置。
2. **`wiki/`** —— LLM 生成的页面，按 `wiki/sources/`、`wiki/entities/`、`wiki/concepts/` 三个子目录分类存放。
3. **`schema/`** —— 与 Wiki 共同演化的配置文件。

换句话说：`sources/`、`entities/`、`concepts/` 全部是**输出目录**，不是输入目录。你不需要把任何东西预先放进 `sources/`，只需要用 `Cmd+P` 挑一条笔记、一个文件夹或多份文件，插件就会按这个三层结构写入 `wiki/`。

## 这个插件做什么

**一条命令，笔记变身知识库：**

1. **提取** —— `Cmd+P` → Ingest single source / Ingest from folder / Ingest multiple files / Ingest current file，挑出 Vault 里任意位置的笔记。AI 提取人物、概念和理论，自动生成带双向链接的 Wiki 页面，写入 `wiki/`。
2. **查询** —— 问"我写过关于 X 的什么？"答案来自你自己的笔记，而非互联网。
3. **维护** —— Lint 系统检测重复页面、死链、空页面和孤立页面。Smart Fix All 一键修复。

**知识自然生长。** 每一篇新笔记都能找到在现有网络中的位置。每一个矛盾都会被标记。每一条关联都会被建立。

## 开源共建

本插件采用 MIT 许可证，完全开源。你的数据永远不会离开 Obsidian 知识库——只在提取或查询时发送给你选择的 LLM 服务商。通过 Ollama 使用本地模型可以完全离线运行。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)