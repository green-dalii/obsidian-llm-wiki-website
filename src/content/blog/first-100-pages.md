---
title: "Getting Your First 100 Pages: A Beginner's Walkthrough"
description: "From zero to a living wiki. A step-by-step walkthrough of setting up your first sources, running ingestion, and watching your knowledge take shape."
date: 2026-05-08
tags: ["tutorial", "beginner", "walkthrough"]
related: ["choosing-models", "introducing-llm-wiki"]
---

## Start Small

Don't dump your entire vault into `sources/` on day one. Start with 2–3 articles you know well. You'll learn more from watching 10 pages grow than from staring at 200.

## Step 1: Install and Configure

1. Install the plugin from Obsidian's Community Plugins market
2. Open Settings → Karpathy LLM Wiki
3. Pick a provider (DeepSeek V4-Flash is the best starting point)
4. Enter your API key, click **Fetch Models** → select a model
5. Click **Test Connection** → green "LLM Ready" indicator means you're good
6. Click **Save Settings**

## Step 2: Create Your First Source

Create a `sources/` folder at the root of your vault. Move a note into it — maybe a blog post, article summary, or research notes.

## Step 3: Run Ingestion

Press `Cmd+P` and type **"Ingest Sources"**. For a typical article, this takes 5–15 seconds.

When done, you'll get an **Ingestion Report** showing entities extracted, pages created, and links established.

## Step 4: Explore Your Wiki

Open the `wiki/` folder. You'll see `entities/`, `concepts/`, `sources/`, `index.md`, and `log.md`. Open a few pages and notice the `[[wiki-links]]`. Open the Graph View.

## Step 5: Ask Questions

`Cmd+P` → **"Query Wiki"**. Ask something about the content you just ingested. The answer comes from *your* notes, not the internet.

## Common Mistakes

**Don't use flagship models for ingestion.** Start cheap, scale up if needed.

**Don't skip aliases.** Run Complete Aliases when Lint shows missing ones.

**Don't ignore the log.** `wiki/log.md` records every operation.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
