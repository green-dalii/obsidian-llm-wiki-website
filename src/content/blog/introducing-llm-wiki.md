---
title: "Getting Started (3): Introducing Karpathy LLM Wiki"
description: "The open-source Obsidian plugin that turns your notes into a self-organizing wiki. Karpathy LLM Wiki extracts entities, builds bidirectional links, and answers natural-language questions about your own knowledge."
date: 2026-04-27
tags: ["getting-started"]
related: ["obsidian-basics", "first-100-pages", "why-llm-wiki-for-obsidian-users", "modular-architecture"]
series: "getting-started"
---

## The Problem: Notes That Don't Talk to Each Other

Your Obsidian vault holds people, concepts, ideas, and connections. Today they sit as files in folders. Finding what relates to what means searching, tagging, and hoping you remember the thread.

## Karpathy's Insight

In 2024, Andrej Karpathy [wrote about an idea](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f): treat your notes as raw material, and let an LLM do the architecture work. It reads what you write, pulls out entities and concepts, and weaves them into a structured Wiki — complete with `[[bidirectional links]]`, an auto-generated index, and a chat interface that answers questions from *your* knowledge.

The plugin takes over the librarian role. No deciding what deserves a page. No maintaining cross-links. No wondering if something is out of date. Pick a note from anywhere in your vault, run `Cmd+P` → "Ingest single source", and the LLM reads, extracts, writes, links, and flags contradictions.

## The Three-Layer Architecture

Karpathy LLM Wiki is built on three layers:

1. **Your vault notes (read-only input).** Markdown notes and PDFs already living in your vault. The plugin never modifies them by default.
2. **`wiki/` (LLM-generated output).** After ingestion, the plugin writes `wiki/sources/<slug>.md` (per-source summaries), `wiki/entities/<name>.md` (people, projects, tools), and `wiki/concepts/<topic>.md` (abstract ideas), plus `wiki/index.md` and `wiki/log.md`. These are the new pages you read and link to.
3. **`schema/` (co-evolved configuration).** Field definitions and rules the LLM uses to keep pages consistent across re-ingest. You rarely touch this layer directly.

Input lives where it always lived. Output lands in `wiki/`. Schema evolves behind the scenes.

## What This Plugin Does

**One command transforms a single note:**

1. **Ingest** — Pick a note from anywhere in your vault. `Cmd+P` → "Ingest single source". The LLM extracts people, concepts, and theories, then writes `wiki/sources/`, `wiki/entities/`, and `wiki/concepts/` pages with bidirectional links.
2. **Query** — `Cmd+P` → "Query wiki". Ask "what did I write about X?" The answer comes from your own notes, not the internet.
3. **Maintain** — `Cmd+P` → "Lint wiki" detects duplicates, dead links, empty pages, and orphans. Smart Fix All resolves them with one click.

Every new note finds its place in the existing network. Every contradiction is flagged. Every connection is made.

## Built in the Open

This plugin is MIT-licensed and open source. Your data never leaves your Obsidian vault — only sent to your chosen LLM provider during ingest or query. Local models via Ollama or LM Studio keep everything offline.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)