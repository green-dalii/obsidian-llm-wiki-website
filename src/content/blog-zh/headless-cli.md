---
title: "实践指南（9）：无头 CLI——不打开 Obsidian 也能摄入笔记"
description: "和 Obsidian 里跑的完全同一套摄入引擎，现在可以在终端里调用。在服务器、脚本里，或一台从没打开过 Obsidian 的机器上运行。"
date: 2026-08-08
tags: ["实践指南"]
series: "workflow-guides"
related: ["pdf-ingest-guide", "faster-ingestion", "auto-maintenance", "first-100-pages"]
---

## 插件，但不打开应用

这个插件一直在 Obsidian 里运行。你打开 vault，按 Cmd+P，选 Ingest，引擎就开始工作——读取你的笔记，提取里面的人物和概念，把 Wiki 页面写回——整个过程就在你正在用的编辑器里完成。

对于交互式使用，这是最合适的形态。但不是所有场景都合适。

想想那些你根本不想打开 Obsidian 的情况：

- **一台没有屏幕的服务器。** 你想在无头机器上摄入 vault——NAS、CI 运行器、定时任务。那里没有 Electron 窗口可以打开。
- **脚本化流程。** 你想每天晚上跑一次摄入，或者每次 Zotero 导出后自动跑，不需要人手动按按钮。
- **不想守着的大批量。** 你更愿意启动一个进程，离开，等它跑完再看结果。
- **确定性的运行。** 同样的命令、同样的 vault、同样的结果——用于测试、复现问题，或对比模型。
- **Agent 在流程里。** 你把任务交给 AI Agent——编码助手、自动化流程——它自己调用 `llm-wiki`。Wiki 更新了，你连终端都不用碰。

v1.26.0 用**无头 CLI** 回应了这些需求。完整的摄入引擎——`WikiEngine`、`SourceAnalyzer`、`PageFactory`、LLM 客户端——在纯 Node 下运行。没有 Obsidian，没有 Electron，没有界面。你把它指向一个 vault 目录，它就做插件会做的完全相同的事情。

## 你会得到什么

CLI 随插件仓库安装，以 `llm-wiki` 调用（pnpm 布局下是 `pnpm llm-wiki`）。最基本的运行长这样：

```bash
WIKI_API_KEY=... node tools/llm-wiki-cli/run-llm-wiki.mjs \
  --vault /path/to/your/vault \
  --source "sources/Attention Is All You Need.md"
```

指向 vault，指定一个源文件，它就摄入那条笔记——提取实体和概念、创建 Wiki 页面、更新索引——走的是插件完全相同的写入路径。

几个最常用的参数：

| 参数 | 作用 |
|------|------|
| `--vault` | vault 根目录。必填。 |
| `--source` | 源文件，相对 vault 的路径。必填。 |
| `--dry-run` | 完整运行，但所有写入都留在内存里。预览的安全方式。 |
| `--force` | 即使去重门会跳过，也强制重新摄入。 |
| `--extract-only` | 提取后停止。隐含 `--dry-run`。 |
| `--granularity` | `fine` / `standard` / `coarse` / `minimal` / `custom`。 |
| `--thinking-mode` | `data-json` / `plugin-off` / `server-default`。 |
| `--model` | 本次运行覆盖已配置的模型。 |

在信任它之前，有两件事要知道：

**它真的会写入。** 没有 `--dry-run` 时，CLI 会写进 vault——页面、`index.md`、`log.md`、schema 文件——和插件一模一样。先用 `--dry-run` 预览；它把所有写入留在内存里，并打印*本来会*发生什么。

**它复用你的设置。** CLI 读取 vault 插件文件夹里的 `data.json`——你的提供商、模型、base URL、提取粒度——所以你什么都不用重新配置。API 密钥来自 `WIKI_API_KEY`（或插件用的同一套密钥存储流程）。

## CLI 适合哪里

CLI 不是插件的替代品。它是同一个引擎换了一个宿主——正好在 GUI 宿主碍事的地方派上用场。

- **定时任务。** 一个 cron 在午夜对 vault 跑 `llm-wiki`。你醒来之前，新笔记已经摄入完毕。
- **批处理。** Zotero 导出脚本把新 PDF 放进文件夹，然后调用 CLI 一次性摄入。
- **无头。** NAS 或容器按计划摄入共享 vault，你读 `log.md` 看什么变了。
- **确定性。** `--dry-run --extract-only` 让你在同一源文件上对比两个模型的提取结果，或用固定命令复现 bug。
- **Agent 驱动。** 任何能运行终端命令的 AI Agent，都能直接调用 `llm-wiki`——摄入一条笔记、批量处理一个文件夹，或查询刚建好的 Wiki。你的 Agent 用和你一样的方式操作 vault。

## 你的 Agent 也能驱动的工具

无头形态还有第二个受众：AI Agent。因为 CLI 就是一个普通命令——参数进、摘要出——它可以直插任何能运行终端的 Agent：编码助手、Cursor、自动化框架、你自己的脚本。Agent 调用 `llm-wiki`，读取纯文本摘要，然后决定下一步做什么。

Agent 可以用它做这些事：

- **按需摄入。** Agent 指向一个源文件并运行 CLI。Wiki 通过插件使用的同一个引擎更新。
- **提交前预览。** `--dry-run` 和 `--extract-only` 让 Agent 在什么都不写入的情况下，检查一次运行会改动什么。
- **串成工作流。** 摄入一批笔记，读 `log.md` 看标记出的重复，再查询 Wiki——全在 Agent 自己的终端会话里完成。
- **确定性对比模型。** 同一源文件上 `--dry-run --extract-only --model A` 对 `--model B`，给 Agent 两个干净、可比较的结果。

因为 CLI 就是插件自己的引擎，Agent 触发的东西和你亲手做的完全一样——同样的提取、同样的写入路径、同样的 Wiki。你的 Agent 拿到的是真正的杠杆，不是玩具封装。

## 开始使用

CLI 位于插件仓库的 `tools/llm-wiki-cli/`。它的 README 记录了完整的参数面、环境要求（Node 24，与插件一致），以及 pnpm 用户的 shim 注意事项。

最快的路径：

```bash
WIKI_API_KEY=... node tools/llm-wiki-cli/run-llm-wiki.mjs \
  --vault /path/to/your/vault \
  --source "sources/Your Note.md" \
  --dry-run
```

先用 `--dry-run` 跑一次，看看会发生什么。如果去重门跳过了你确实想重新摄入的源，加 `--force`。准备好提交写入时，去掉 `--dry-run`。

这个插件建立在一个简单的理念上：你只管读，Wiki 自己组织。CLI 把这个理念延伸到了没有应用可打开的地方——终端、脚本、服务器、Agent——而同一个引擎守住这个承诺。
