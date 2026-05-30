---
title: "Choosing the Right Model: A Practical Guide"
description: "Long-context models recommended? Yes — but which one, when, and why. A hands-on guide to balancing cost, speed, and quality."
date: 2026-05-15
tags: ["guide", "models", "cost", "tips"]
related: ["faster-ingestion", "first-100-pages"]
---

## The Question Everyone Asks

"Which model should I use?"

It's the most common question after "How do I install this?" The answer is: **it depends on what you're doing.**

## For Ingestion: Speed and Context

Ingestion is the most token-intensive operation. Two things matter:

1. **Context window** — Your entire Wiki needs to fit
2. **Cost per token** — You'll run this frequently

**Recommended:**
- **DeepSeek V4-Flash** — Lowest cost at $0.14/M tokens. Ideal for batch ingestion.
- **Gemini-3.5-Flash** — 4× faster output than GPT-5.5.

## For Query: Quality Over Speed

Query operations are less token-intensive. Answer quality matters more than speed.

**Recommended:**
- **Claude Sonnet 4.6** — Great quality/cost balance.
- **Claude Opus 4.7** — Ultimate quality, use selectively.

## Practical Tips

**Start with DeepSeek for ingestion, switch to Claude for query.** Best of both worlds.

**Use Ollama for query, not ingestion.** Local models have smaller context windows (8K–128K) — fine for querying, not for processing large sources.

**Watch for rate limits.** HTTP 429 errors → lower concurrency to 1–2, increase batch delay to 500–800ms.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
