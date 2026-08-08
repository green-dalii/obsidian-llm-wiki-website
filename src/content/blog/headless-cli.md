---
title: "Workflow Guide (9): The Headless CLI — Ingest Your Vault Without Opening Obsidian"
description: "The same ingest pipeline that runs inside Obsidian, now callable from a terminal. Run it on a server, in a script, or on a machine that has never opened Obsidian."
date: 2026-08-08
tags: ["guides"]
series: "workflow-guides"
related: ["pdf-ingest-guide", "faster-ingestion", "auto-maintenance", "first-100-pages"]
---

## The plugin, without the app

The plugin has always run inside Obsidian. You open the vault, press Cmd+P, pick Ingest, and the engine goes to work. It reads your notes, extracts the people and concepts inside them, and writes wiki pages back — all in the editor you're already using.

That is the right shape for interactive work. It is not the right shape for everything.

Consider the cases where you do not want to open Obsidian at all:

- **A server with no display.** You want to ingest a vault on a headless machine — a NAS, a CI runner, a cron job. There is no Electron window to open.
- **A scripted pipeline.** You want to run ingest every night, or after every Zotero export, without a human pressing buttons.
- **A big batch you do not want to babysit.** You would rather launch a process, walk away, and read the summary when it finishes.
- **Deterministic runs.** You want the same command, the same vault, the same result — for testing, for reproducing an issue, or for comparing models.
- **An agent in the loop.** You delegate to an AI agent — a coding assistant, an automation — and it calls `llm-wiki` itself. The wiki updates without you touching a terminal.

v1.26.0 answers these with a **headless CLI**. The full ingest engine — `WikiEngine`, `SourceAnalyzer`, `PageFactory`, the LLM clients — runs under plain Node. No Obsidian, no Electron, no display. You point it at a vault directory and it does exactly what the plugin would do.

## What you get

The CLI is installed with the plugin repo and invoked as `llm-wiki` (or `pnpm llm-wiki` in the pnpm layout). The most basic run looks like this:

```bash
WIKI_API_KEY=... node tools/llm-wiki-cli/run-llm-wiki.mjs \
  --vault /path/to/your/vault \
  --source "sources/Attention Is All You Need.md"
```

Point it at the vault, name a source file, and it ingests that note — extracting entities and concepts, creating wiki pages, updating the index — through the exact same write path the plugin uses.

A few flags matter more than the rest:

| Flag | What it does |
|------|--------------|
| `--vault` | Vault root. Required. |
| `--source` | Source file, relative to the vault. Required. |
| `--dry-run` | Run everything, keep every write in memory. The safe way to preview. |
| `--force` | Re-ingest even if the duplicate-content gate would skip it. |
| `--extract-only` | Stop after extraction. Implies `--dry-run`. |
| `--granularity` | `fine` / `standard` / `coarse` / `minimal` / `custom`. |
| `--thinking-mode` | `data-json` / `plugin-off` / `server-default`. |
| `--model` | Override the configured model for this run. |

Two things to know before you trust it:

**It writes for real.** Without `--dry-run`, the CLI writes into the vault — pages, `index.md`, `log.md`, the schema file — exactly as the plugin does. Preview first with `--dry-run`; it keeps every write in memory and prints what *would* have happened.

**It reuses your settings.** The CLI reads `data.json` from the vault's plugin folder — your provider, model, base URL, extraction granularity — so you do not reconfigure anything. The API key comes from `WIKI_API_KEY` (or the same secret-storage flow the plugin uses).

## Where the CLI fits

The CLI is not a replacement for the plugin. It is the same engine with a different host — useful exactly where a GUI host is in the way.

- **Scheduled.** A cron job runs `llm-wiki` on a vault at midnight. New notes are ingested before you wake up.
- **Batched.** A Zotero export script pipes new PDFs into a folder, then calls the CLI to ingest them in one pass.
- **Headless.** A NAS or container ingests a shared vault on a schedule, and you read `log.md` for what changed.
- **Deterministic.** `--dry-run --extract-only` lets you compare extraction between two models on the same source, or reproduce a bug with a fixed command.
- **Agent-driven.** Any AI agent that can run a terminal command can call `llm-wiki` directly — ingest a note, batch a folder, or query the wiki it just built. Your agent operates the vault the same way you would.

## A tool your agent can drive

The headless form has a second audience: AI agents. Because the CLI is a plain command — flags in, summary out — it plugs straight into any agent that can run a terminal: a coding assistant, Cursor, an automation harness, your own script. The agent calls `llm-wiki`, reads the plain-text summary, and decides what to do next.

What an agent can do with it:

- **Ingest on demand.** The agent points at a source file and runs the CLI. The wiki updates through the same engine the plugin uses.
- **Preview before committing.** `--dry-run` and `--extract-only` let the agent check what a run would change without writing a thing.
- **Chain into a workflow.** Ingest a batch, read `log.md` for flagged duplicates, then query the wiki — all from the agent's own shell session.
- **Compare models deterministically.** `--dry-run --extract-only --model A` against `--model B` on the same source gives the agent two clean, comparable results.

Because the CLI is the plugin's own engine, what the agent triggers is exactly what you would get by hand — same extraction, same write path, same wiki. Your agent gets a real lever, not a toy wrapper.

## Getting started

The CLI lives in `tools/llm-wiki-cli/` in the plugin repo. Its README documents the full flag surface, environment requirements (Node 24, matching the plugin), and the shim caveats for pnpm users.

The fastest path:

```bash
WIKI_API_KEY=... node tools/llm-wiki-cli/run-llm-wiki.mjs \
  --vault /path/to/your/vault \
  --source "sources/Your Note.md" \
  --dry-run
```

Run it once with `--dry-run` to see what would happen. Add `--force` if the gate skips a source you genuinely want re-ingested. Drop `--dry-run` when you are ready to commit the writes.

The plugin was built on a simple idea: you read, the wiki organizes itself. The CLI extends that idea to places where there is no app to open — a terminal, a script, a server, an agent — and the same engine keeps the promise.
