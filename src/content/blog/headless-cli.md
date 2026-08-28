---
title: "Workflow Guide (9): The Headless CLI — Ingest Your Vault Without Opening Obsidian"
description: "The same ingest pipeline that runs inside Obsidian, now callable from a terminal. Run it on a server, in a script, or on a machine that has never opened Obsidian."
date: 2026-08-08
tags: ["guides"]
series: "workflow-guides"
related: ["pdf-ingest-guide", "faster-ingestion", "auto-maintenance", "first-100-pages", "v1270-minor-release"]
---

## The plugin, without the app

The plugin has always run inside Obsidian. You open the vault, press Cmd+P, pick Ingest, and the engine goes to work. It reads your notes, extracts the people and concepts inside them, and writes wiki pages back — all in the editor you're already using.

That is the right shape for interactive work. It is not the right shape for everything.

Consider the cases where you do not want to open Obsidian at all:

- **A server with no display.** You want to ingest a vault on a headless machine — a NAS, a CI runner, a cron job. There is no Electron window to open.
- **A scripted pipeline.** You want to run ingest every night, or after every Zotero export, without a human pressing buttons.
- **A big batch you do not want to babysit.** You would rather launch a process, walk away, and read the summary when it finishes.
- **Deterministic runs.** You want the same command, the same vault, the same result — for testing, for reproducing an issue, or for comparing models.
- **An agent in the loop.** You delegate to an AI agent — a coding assistant, an automation — and it calls the CLI itself. The wiki updates without you touching a terminal.

The headless CLI answers these. The full ingest engine — `WikiEngine`, `SourceAnalyzer`, `PageFactory`, the LLM clients — runs under plain Node. No Obsidian, no Electron, no display. You point it at a vault directory and it does exactly what the plugin would do.

> **Note (v1.27.0-web).** The CLI now lives in its own repo, published to npm as [`karpathywiki-cli`](https://www.npmjs.com/package/karpathywiki-cli). The in-tree copy was retired to a dev-only measurement instrument (`tools/dev-instrument/`) so it stops dragging the Obsidian marketplace Bot's review. **Use the npm package — `npx llm-wiki` will install an unrelated package from the registry, not this one.**

## What you get

The package installs the `llm-wiki` binary. The most basic run looks like this:

```bash
npx karpathywiki-cli ingest \
  --sources ./notes \
  --wiki ./wiki \
  --provider deepseek \
  --key sk-... \
  --model deepseek-chat
```

Point it at a sources folder, name a wiki output directory, and it ingests every Markdown it finds — extracting entities and concepts, creating wiki pages, writing the index — through the exact same write path the plugin uses.

A few flags matter more than the rest:

| Flag | What it does |
|------|--------------|
| `--sources <path>` | Source folder, single `.md` file, or repeated mixed list. |
| `--wiki <path>` | Wiki output folder. Required. Pages land directly under it. |
| `--provider <id>` | One-off LLM provider override (e.g. `deepseek`, `anthropic`, `ollama`). |
| `--key <key>` | One-off API key override. |
| `--baseurl <url>` | One-off base URL override (custom endpoints). |
| `--model <model>` | One-off model override. |
| `--config <path>` | Path to a `settings.json` that mirrors the plugin's `LLMWikiSettings`. |
| `--dry-run` | List files only — never calls the LLM. |

Three things to know before you trust it:

**It writes for real.** Without `--dry-run`, the CLI writes into the wiki folder — `entities/`, `concepts/`, the index — exactly as the plugin does. Use `--dry-run` first; it lists files and exits without calling the model.

**It reuses your settings.** The CLI reads the same `LLMWikiSettings` JSON shape the plugin uses. Drop a `--config settings.json` to mirror your in-Obsidian setup, or pass the override flags per run. The four override flags mirror the settings fields one-to-one; before any LLM traffic the CLI runs a preflight and prints a copy-pasteable guidance block (exact flag forms + a `settings.json` example + the supported-provider list) when the config is incomplete.

**Twelve known providers, no manual `baseUrl` needed.** `anthropic`, `openai`, `gemini`, `openrouter`, `deepseek`, `minimax`, `kimi`, `glm`, `ollama`, `lmstudio`, plus two custom-endpoint interfaces that require a `baseUrl`: `openai-compat` (alias: `openai-custom`) and `anthropic-compat` (alias: `anthropic-custom`).

## Where the CLI fits

The CLI is not a replacement for the plugin. It is the same engine with a different host — useful exactly where a GUI host is in the way.

- **Scheduled.** A cron job runs the CLI on a vault at midnight. New notes are ingested before you wake up.
- **Batched.** A Zotero export script pipes new PDFs into a folder, then calls the CLI to ingest them in one pass.
- **Headless.** A NAS or container ingests a shared vault on a schedule, and you read the run summary for what changed.
- **Deterministic.** `--dry-run` lets you preview a batch on the same source for comparison, or reproduce an issue with a fixed command.
- **Agent-driven.** Any AI agent that can run a terminal command can call the CLI directly — ingest a note, batch a folder, or query the wiki it just built. Your agent operates the vault the same way you would.

## A tool your agent can drive

The headless form has a second audience: AI agents. Because the CLI is a plain command — flags in, summary out — it plugs straight into any agent that can run a terminal: a coding assistant, Cursor, an automation harness, your own script. The agent calls the CLI, reads the plain-text summary, and decides what to do next.

What an agent can do with it:

- **Ingest on demand.** The agent points at a source folder and runs the CLI. The wiki updates through the same engine the plugin uses.
- **Preview before committing.** `--dry-run` lets the agent check what a run would touch without calling the LLM.
- **Chain into a workflow.** Ingest a batch, read the run summary for flagged duplicates, then query the wiki — all from the agent's own shell session.
- **Compare models deterministically.** Running the same `--sources` against two `--model` values gives the agent two clean, comparable results.

Because the CLI is the plugin's own engine, what the agent triggers is exactly what you would get by hand — same extraction, same write path, same wiki. Your agent gets a real lever, not a toy wrapper.

## Getting started

Install once, then call the binary:

```bash
# Either form works — both resolve to the `llm-wiki` binary:
npx karpathywiki-cli ingest --sources ./notes --wiki ./wiki \
  --provider openai --key sk-...

# or install globally:
npm install -g karpathywiki-cli
llm-wiki ingest --sources ./notes --wiki ./wiki
```

Run it once with `--dry-run` to see which files it would touch. Drop `--dry-run` when you are ready to commit the writes.

The full flag surface, environment variables (`LLM_WIKI_API_KEY` for script-friendly secrets), and exit-code contract live in the [`karpathywiki-cli` repo](https://github.com/green-dalii/obsidian-llm-wiki-cli). The plugin was built on a simple idea: you read, the wiki organizes itself. The CLI extends that idea to places where there is no app to open — a terminal, a script, a server, an agent — and the same engine keeps the promise.
