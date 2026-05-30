---
title: "Modular Architecture and the Query Interface"
description: "How we reduced main.ts from 3000 lines to 300 and added a ChatGPT-style query interface with streaming responses."
date: 2026-04-27
tags: ["architecture", "query", "engineering"]
related: ["introducing-llm-wiki"]
---

## The Challenge

When we first released v1.0.0, the entire plugin lived in a single `main.ts` file of nearly 3,000 lines. It worked — multi-page generation, structured JSON prompts, bidirectional links, and the Lint system. But it was a monolith. Adding new features meant navigating thousands of lines of intertwined logic.

## The Refactor: 9 Focused Modules

In v1.2.0, we extracted the codebase into **9 focused modules**. The result: `main.ts` shrank to just 305 lines — a 90% reduction.

- **Ingestion Engine** — Extracts entities and concepts from source notes
- **Query Engine** — Streaming ChatGPT-style dialog with Markdown rendering
- **Lint System** — Detects duplicates, dead links, orphans, empty pages
- **Auto-Maintenance** — File watcher, periodic lint, startup health check
- **Settings UI** — Step-by-step configuration flow
- **Page Factory** — Generates entity, concept, and summary pages
- **LLM Clients** — Unified interface for Anthropic, OpenAI, Gemini, and more

**Why this matters:** Each module has a single responsibility, clear interfaces, and can be tested independently. The rapid iteration pace of v1.7.x was only possible because the foundation was solid.

## The Query Interface

The **Conversational Query Interface** lets you ask questions about your own knowledge:

- **Streaming responses** with Markdown rendering
- **Multi-turn conversations** with history
- **Wiki-links** embedded in answers as breadcrumbs
- **Save to Wiki** — valuable conversations become Wiki pages

This transformed the plugin from a knowledge *organizer* into a knowledge *partner*.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
