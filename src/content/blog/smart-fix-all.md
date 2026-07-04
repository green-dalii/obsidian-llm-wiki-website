---
title: "Maintenance: Five-Phase Wiki Repair in One Click"
description: "Aliases, duplicates, dead links, orphans, empty pages — Karpathy LLM Wiki's Smart Fix All runs them in causal order so each repair doesn't undo the previous one."
date: 2026-05-12
tags: ["guides"]
related: ["auto-maintenance", "contradiction-detection"]
series: "maintenance"
---

## The Knowledge Quality Problem

As your Wiki grows, things break. Pages get duplicated. Links point to pages that don't exist. Orphaned pages have no incoming links. Empty pages have no content. Missing aliases prevent cross-language deduplication.

Before v1.7.11, fixing these meant running Lint and clicking each fix individually. For large Wikis, this was tedious.

## Enter Smart Fix All

Smart Fix All runs fixes in **causality order** to minimize creating new problems:

1. **Phase -1: Fix Polluted Pages** — Clean up folder-prefix pollution
2. **Phase 0: Complete Aliases** — Fill missing aliases so duplicate detection works
3. **Phase 1: Merge Duplicates** — Fuse duplicates (root cause of many dead links)
4. **Phase 2: Fix Dead Links** — Repair broken `[[wiki-links]]`
5. **Phase 3: Link Orphans** — Add incoming links to pages that have none
6. **Phase 4: Expand Empty Pages** — Fill stub pages with LLM-generated content

**Why order matters:** If you fix dead links before merging duplicates, you'll repair links to pages that will soon be deleted. Smart Fix All avoids this.

## Technical Details

- **Parallel batch processing** — Duplicates verified in batches of 100
- **Error isolation** — One batch failure doesn't block others
- **Rate limit detection** — HTTP 429 errors trigger actionable suggestions

The result: a Wiki with 1,000+ pages cleaned up in a single click, with a detailed report.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
