---
title: "Inside the System: Cutting Ingestion Latency by Removing 200K Characters"
description: "v1.12.0 rearchitected the extraction prompt so Obsidian ingestion speed no longer scales with wiki size. The reasoning behind the change and how the speedup was measured."
date: 2026-05-22
tags: ["internals"]
related: ["query-to-wiki-feedback", "auto-maintenance"]
series: "inside-the-system"
---

## The Bottleneck That Grows With Your Wiki

For months, ingestion speed degraded as your Wiki grew. A 500-page wiki processed files quickly. A 10,000-page wiki was painfully slow. The reason: the extraction prompt included the **full existing wiki page list** — up to 200K characters.

This was a fundamental architectural problem. Every ingestion call carried the weight of the entire Wiki.

## The Solution: Deterministic Matching

In v1.12.0, we removed the page list from the extraction prompt. After extraction, a **programmatic matcher** (zero LLM cost) matches extracted names against existing wiki pages using slug + alias matching.

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Prompt size | ~200K chars | ~10K chars | **95% reduction** |
| Ingestion speed | 30-90s | 5-15s | **~80% faster** |
| 10K-page wiki | 5-10 min | 5-15s | **Independent of wiki size** |

## Additional Optimizations

- **Dynamic batch limits** — Short sources get 2-5 batches, long sources get 8-15
- **Short-content auto-downgrade** — Sources under 20K characters capped to prevent unnecessary digging
- **Convergence detection** — Extraction terminates early when batches underperform
- **Silent slug operations** — Eliminated ~30,000 lines of debug output

## The Bigger Picture

This change means the plugin is now ready for **production-scale wikis**. A 10,000-page wiki processes each file at the same speed as a 500-page wiki.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
