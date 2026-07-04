---
title: "维护（2）：插件的本地化流水线"
description: "v1.8.0 把 UI 从 2 种语言扩展到 8 种，每种语言精翻 269+ 字段。i18n 流程如何保证每次发布的一致性——以及 Karpathy LLM Wiki 在服务非英语用户中学到的。"
date: 2026-05-10
tags: ["入门必读"]
related: ["multilingual-wiki", "introducing-llm-wiki"]
series: "maintenance"
---

## 从 2 到 8 种语言

插件首次发布时只支持英文和中文。到 v1.8.0，已扩展到 **8 种语言**：EN、ZH、JA、KO、DE、FR、ES、PT。

每一个按钮、每一个标签、每一则通知——全部翻译到位。不是机器翻译，而是精心打磨每种语言的使用体验。

## 翻译的挑战

8 种语言、269 个 UI 字段，意味着要维护超过 2000 条翻译。

**地道的表达，而非逐字翻译。** "Add to Obsidian"在不同语言中不是简单的直译——而是适应该语言用户实际描述这个动作的方式。

**技术术语保留英文。** "Ingest"、"Query"、"Lint"、"Smart Fix All"等命令保持英文，因为它们出现在 Obsidian 的命令面板中。

## v1.8.0 的变化

- **6 个新语言文件** — 每个包含 269 个字段
- **动态下载徽章** — 实时显示 Obsidian 下载量
- **语言切换器** — 8 个选项，所有语言界面通用

## 下一步

完整的 UI 国际化是最后一个重大里程碑。之后的重点转向性能和可靠性——最终在 v1.12.0 中完成了提取提示词的架构重构。

[在 GitHub 上查看](https://github.com/green-dalii/obsidian-llm-wiki)
