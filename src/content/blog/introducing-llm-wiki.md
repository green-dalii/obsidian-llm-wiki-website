---
title: "Getting Started (3): Introducing Karpathy LLM Wiki"
description: "The open-source Obsidian plugin that turns your notes into a self-organizing wiki. Karpathy LLM Wiki extracts entities, builds bidirectional links, and answers natural-language questions about your own knowledge."
date: 2026-04-27
tags: ["getting-started"]
related: ["obsidian-basics", "first-100-pages", "why-llm-wiki-for-obsidian-users", "modular-architecture"]
series: "getting-started"
---

## The Problem: Notes That Don't Talk to Each Other

Your Obsidian vault is a goldmine — people, concepts, ideas, connections. But right now they're just files in folders. Finding what relates to what means searching, tagging, and hoping you remember the thread.

## Karpathy's Insight

In 2024, Andrej Karpathy [wrote about a radical idea](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): treat your notes as raw material, and let an LLM do the architecture work. It reads what you write, pulls out entities and concepts, and weaves them into a structured Wiki — complete with `[[bidirectional links]]`, an auto-generated index, and a chat interface that answers questions from *your* knowledge.

**So you don't have to be the librarian.** No deciding what deserves a page. No maintaining cross-links. No wondering if something is out of date. Drop notes into `sources/` and the LLM reads, extracts, writes, links, and even flags contradictions — while you stay in flow.

## What This Plugin Does

**One command transforms your notes:**

1. **Ingest** — Drop a note into `sources/`. The AI extracts people, concepts, and theories, then auto-generates interlinked Wiki pages with bidirectional links.
2. **Query** — Ask "what did I write about X?" The answer comes from your own notes, not the internet.
3. **Maintain** — The Lint system detects duplicates, dead links, empty pages, and orphans. Smart Fix All resolves them with one click.

**Your knowledge grows organically.** Every new note finds its place in the existing network. Every contradiction is flagged. Every connection is made.

## Built in the Open

This plugin is MIT-licensed and open source. Your data never leaves your Obsidian vault — only sent to your chosen LLM provider during ingest or query. Local models via Ollama keep everything offline.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
