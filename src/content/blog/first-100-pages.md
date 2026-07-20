---
title: "Getting Started (4): Your First 100 Wiki Pages, Step by Step"
description: "From an empty Obsidian vault to a living 100-page knowledge graph. Setup, your first sources, your first ingest — a beginner's walkthrough of Karpathy LLM Wiki."
date: 2026-04-28
tags: ["getting-started"]
related: ["introducing-llm-wiki", "obsidian-basics", "schema-layer-deep-dive", "daily-knowledge-loop"]
series: "getting-started"
---

## Start Small

Don't ingest your entire vault on day one. Start with 2–3 articles you know well. You'll learn more from watching 10 pages grow than from staring at 200.

## Step 1: Install and Configure

1. Install the plugin from Obsidian's Community Plugins market
2. Open Settings → Karpathy LLM Wiki
3. Pick a provider (DeepSeek V4-Flash is the best starting point)
4. Enter your API key, click **Fetch Models** → select a model
5. Click **Test Connection** → green "LLM Ready" indicator means you're good
6. Click **Save Settings**

## Step 2: Pick Your First Source

Pick an existing note from anywhere in your vault — a blog post, article summary, or research notes. The note stays where it is. The plugin will read it from its current location.

## Step 3: Run Ingestion

Open the note, then press `Cmd+P` and run **"Ingest current file"** (or click the sticker icon in the left ribbon). For a typical article, this takes 5–15 seconds.

When done, you'll get an **Ingestion Report** showing entities extracted, pages created, and links established.

## Step 4: Explore Your Wiki

Open the `wiki/` folder. You'll see `entities/`, `concepts/`, `sources/`, `index.md`, and `log.md`. These are the LLM-generated output pages. Open a few and notice the `[[wiki-links]]`. Open the Graph View.

## Step 5: Ask Questions

`Cmd+P` → **"Query wiki"**. Ask something about the content you just ingested. The answer comes from *your* notes, not the internet.

## Common Mistakes

**Don't use flagship models for ingestion.** Start cheap, scale up if needed.

**Don't skip aliases.** Run Complete Aliases when Lint shows missing ones.

**Don't ignore the log.** `wiki/log.md` records every operation.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)