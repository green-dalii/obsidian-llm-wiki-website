---
title: "实践指南（9）：无头 CLI——不打开 Obsidian 也能摄入笔记"
description: "和 Obsidian 里跑的完全同一套摄入引擎，现在可以在终端里调用。在服务器、脚本里，或一台从没打开过 Obsidian 的机器上运行。"
date: 2026-08-08
tags: ["实践指南"]
series: "workflow-guides"
related: ["pdf-ingest-guide", "faster-ingestion", "auto-maintenance", "first-100-pages", "v1270-minor-release"]
---

## 插件，但不打开应用

这个插件一直在 Obsidian 里运行。你打开 vault，按 Cmd+P，选 Ingest，引擎就开始工作——读取你的笔记，提取里面的人物和概念，把 Wiki 页面写回——整个过程就在你正在用的编辑器里完成。

对于交互式使用，这是最合适的形态。但不是所有场景都合适。

想想那些你根本不想打开 Obsidian 的情况：

- **一台没有屏幕的服务器。** 你想在无头机器上摄入 vault——NAS、CI 运行器、定时任务。那里没有 Electron 窗口可以打开。
- **脚本化流程。** 你想每天晚上跑一次摄入，或者每次 Zotero 导出后自动跑，不需要人手动按按钮。
- **不想守着的大批量。** 你更愿意启动一个进程，离开，等它跑完再看结果。
- **确定性的运行。** 同样的命令、同样的 vault、同样的结果——用于测试、复现问题，或对比模型。
- **Agent 在流程里。** 你把任务交给 AI Agent——编码助手、自动化流程——它自己调用 CLI。Wiki 更新了，你连终端都不用碰。

无头 CLI 回应了这些需求。完整的摄入引擎——`WikiEngine`、`SourceAnalyzer`、`PageFactory`、LLM 客户端——在纯 Node 下运行。没有 Obsidian，没有 Electron，没有界面。你把它指向一个 vault 目录，它就做插件会做的完全相同的事情。

> **v1.27.0-web 备注。** CLI 现在搬到了独立仓库，以 [`karpathywiki-cli`](https://www.npmjs.com/package/karpathywiki-cli) 名义发布到 npm。仓库内置的副本已转为仅供开发者使用的测量工具（`tools/dev-instrument/`），目的是不再拖累 Obsidian 市场上的 Bot 审查。**请用 npm 包——`npx llm-wiki` 会从 registry 装到一个不相关的包，不是这个。**

## 你会得到什么

这个包会装好 `llm-wiki` 这个二进制。最基本的运行长这样：

```bash
npx karpathywiki-cli ingest \
  --sources ./notes \
  --wiki ./wiki \
  --provider deepseek \
  --key sk-... \
  --model deepseek-chat
```

指向 sources 文件夹，指定 wiki 输出目录，它就会摄入找到的每一个 Markdown——提取实体和概念、创建 Wiki 页面、写好索引——走的是插件完全相同的写入路径。

几个最常用的参数：

| 参数 | 作用 |
|------|------|
| `--sources <path>` | 源文件夹、单个 `.md` 文件，或重复传入的混合列表。 |
| `--wiki <path>` | wiki 输出目录。必填。页面直接写在它下面。 |
| `--provider <id>` | 本次运行覆盖 LLM 提供商（如 `deepseek`、`anthropic`、`ollama`）。 |
| `--key <key>` | 本次运行覆盖 API 密钥。 |
| `--baseurl <url>` | 本次运行覆盖 base URL（自定义端点）。 |
| `--model <model>` | 本次运行覆盖模型。 |
| `--config <path>` | 指向一份 `settings.json`，与插件的 `LLMWikiSettings` 同构。 |
| `--dry-run` | 仅列出文件——不会调用 LLM。 |

在信任它之前，有三件事要知道：

**它真的会写入。** 没有 `--dry-run` 时，CLI 会写进 wiki 目录——`entities/`、`concepts/`、索引——和插件一模一样。先用 `--dry-run` 列出文件并退出，不调用模型。

**它复用你的设置。** CLI 读取和插件一样的 `LLMWikiSettings` JSON 结构。传一份 `--config settings.json` 就能复用 Obsidian 里的设置，或用覆盖参数逐次指定。四个覆盖参数与设置字段一一对应；在任何 LLM 流量之前，CLI 会做一次预检，当配置不完整时打印一份可直接复制的指引（具体参数形式 + `settings.json` 示例 + 已支持的提供商列表）。

**十二种已知提供商，无需手填 `baseUrl`。** `anthropic`、`openai`、`gemini`、`openrouter`、`deepseek`、`minimax`、`kimi`、`glm`、`ollama`、`lmstudio`，外加两种需要 `baseUrl` 的自定义端点接口：`openai-compat`（别名 `openai-custom`）和 `anthropic-compat`（别名 `anthropic-custom`）。

## CLI 适合哪里

CLI 不是插件的替代品。它是同一个引擎换了一个宿主——正好在 GUI 宿主碍事的地方派上用场。

- **定时任务。** 一个 cron 在午夜对 vault 跑 CLI。你醒来之前，新笔记已经摄入完毕。
- **批处理。** Zotero 导出脚本把新 PDF 放进文件夹，然后调用 CLI 一次性摄入。
- **无头。** NAS 或容器按计划摄入共享 vault，你读运行摘要看什么变了。
- **确定性。** `--dry-run` 让你预览同一源文件上的批量处理结果，或用固定命令复现问题。
- **Agent 驱动。** 任何能运行终端命令的 AI Agent，都能直接调用 CLI——摄入一条笔记、批量处理一个文件夹，或查询刚建好的 Wiki。你的 Agent 用和你一样的方式操作 vault。

## 你的 Agent 也能驱动的工具

无头形态还有第二个受众：AI Agent。因为 CLI 就是一个普通命令——参数进、摘要出——它可以直插任何能运行终端的 Agent：编码助手、Cursor、自动化框架、你自己的脚本。Agent 调用 CLI，读取纯文本摘要，然后决定下一步做什么。

Agent 可以用它做这些事：

- **按需摄入。** Agent 指向一个源文件夹并运行 CLI。Wiki 通过插件使用的同一个引擎更新。
- **提交前预览。** `--dry-run` 让 Agent 在不调用 LLM 的情况下检查一次运行会改动哪些文件。
- **串成工作流。** 摄入一批笔记，读运行摘要看标记出的重复，再查询 Wiki——全在 Agent 自己的终端会话里完成。
- **确定性对比模型。** 同样的 `--sources` 上分别用两个 `--model` 各跑一遍，给 Agent 两个干净、可比较的结果。

因为 CLI 就是插件自己的引擎，Agent 触发的东西和你亲手做的完全一样——同样的提取、同样的写入路径、同样的 Wiki。你的 Agent 拿到的是真正的杠杆，不是玩具封装。

## 开始使用

装一次，然后调用二进制：

```bash
# 两种形式都可以——最终都解析到 `llm-wiki` 这个二进制：
npx karpathywiki-cli ingest --sources ./notes --wiki ./wiki \
  --provider openai --key sk-...

# 或者全局安装：
npm install -g karpathywiki-cli
llm-wiki ingest --sources ./notes --wiki ./wiki
```

先用 `--dry-run` 跑一次，看看它会碰哪些文件。准备好提交写入时，去掉 `--dry-run`。

完整的参数面、环境变量（脚本友好的密钥走 `LLM_WIKI_API_KEY`）和退出码约定，都记录在 [`karpathywiki-cli` 仓库](https://github.com/green-dalii/obsidian-llm-wiki-cli)。这个插件建立在一个简单的理念上：你只管读，Wiki 自己组织。CLI 把这个理念延伸到了没有应用可打开的地方——终端、脚本、服务器、Agent——而同一个引擎守住这个承诺。
