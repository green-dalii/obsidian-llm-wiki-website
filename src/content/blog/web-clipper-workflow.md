---
title: "Workflow Guide (3): A Reading-to-Knowledge Pipeline with Web Clipper"
description: "Clip any web article into Obsidian, then watch Karpathy LLM Wiki turn it into a connected wiki page with bidirectional links to your existing notes."
date: 2026-05-27
tags: ["guides"]
series: "workflow-guides"
related: ["chat-history-knowledge-base", "daily-knowledge-loop", "research-papers-workflow"]
---

## The Accumulation Problem with Clipped Articles

Web clippers make collecting so easy that you stop thinking about what you're collecting.

You read an interesting article. Click the clipper. The full text lands in your notes app. You feel productive. You've "saved" the knowledge. But in practice, you've created a bookmark with extra steps.

The article sits in a folder. You never read it again. You can't find it later because searching through 200 clipped articles is slower than Googling the topic fresh. The knowledge inside those articles — the concepts, the connections, the cross-references — stays locked inside individual files.

Obsidian Web Clipper solves the capture part. LLM Wiki solves the rest.

## The Pipeline

Here's the complete pipeline from article to knowledge graph:

1. **Clip** — Save a web article to a folder of your choice (e.g., `Clippings/`) using Obsidian Web Clipper
2. **Ingest** — Run `Cmd+P` → "Ingest from folder" and point at the clippings folder
3. **Extract** — LLM extracts entities, concepts, and relationships from the article
4. **Create** — Wiki pages are generated in `wiki/sources/`, `wiki/entities/`, `wiki/concepts/` with `[[bidirectional links]]`
5. **Connect** — New pages link to existing pages and appear in the Graph View
6. **Query** — The article's knowledge is now searchable and discoverable

Six steps. One click for step 1, one command for step 2. The rest is automatic.

## Step 1: Install and Configure Web Clipper

Obsidian Web Clipper is an official Obsidian plugin. Install it from the Community Plugins market or as a browser extension.

**Browser extension setup:**
1. Install the Obsidian Web Clipper extension for your browser (Chrome, Firefox, or Safari)
2. Click the extension icon and connect it to your Obsidian Vault
3. Select a target folder — any folder you like; many users use `Clippings/` or `Inbox/`

**YAML template for LLM Wiki:**

Configure Web Clipper to use this template for each saved article. It generates frontmatter that LLM Wiki can process effectively:

```yaml
---
title: "{{title}}"
url: "{{url}}"
date: "{{date}}"
domain: "{{domain}}"
tags:
  - "web-clip"
  - "{{firstTag}}"
---
{{content}}
```

The `domain` field is optional but useful for tracking where your knowledge comes from. LLM Wiki ignores it during ingestion but you can use it to filter sources manually.

## Step 2: Configure the Clipping Template

Open Obsidian Web Clipper settings and create a template with:
- **Target folder:** any folder you choose (e.g., `Clippings/`)
- **Filename format:** `{{date}} {{title}}` — Date-prefixed filenames make sorting easier
- **Frontmatter:** The YAML template above
- **Content format:** Full article HTML converted to Markdown

The template matters because LLM Wiki reads the entire file content. If the clipper strips too much formatting or omits sections, the LLM has less material to extract from. Full article capture produces better entity extractions than excerpts.

## Step 3: Clip and Ingest — A Worked Example

Over the course of a week, you clip three articles:

**Article 1:** "Understanding Transformer Architectures" — A technical deep-dive into self-attention mechanisms, positional encodings, and multi-head attention.

**Article 2:** "What Are Foundation Models?" — An overview of large-scale pre-trained models, transfer learning, and emergent capabilities.

**Article 3:** "A Practical Guide to RAG" — A tutorial on retrieval-augmented generation, vector databases, and chunking strategies.

After clipping all three to your clippings folder, run `Cmd+P` → "Ingest from folder" and point at that folder.

The ingestion report shows:

| Article | Entities Extracted | Pages Created | Links Established |
|---------|-------------------|---------------|-------------------|
| Transformer Architecture | 12 | 8 | 24 |
| Foundation Models | 8 | 6 | 18 |
| Practical RAG Guide | 15 | 10 | 35 |

**Total:** 24 pages created, 77 links established from 3 articles. Time spent: 2–3 minutes clipping over the week, 20 seconds running ingest.

## Step 4: Watch Knowledge Connect

Open the Graph View after ingestion. You'll see three clusters corresponding to the three articles. Because transformers, foundation models, and RAG are related topics — transformers enable foundation models, which enable RAG — the LLM creates cross-article links.

- The "Transformer Architecture" entity page links to "Self-Attention" and "Multi-Head Attention"
- The "Foundation Models" entity page links to "Pre-training" and "Transfer Learning" — and also to "Transformer Architecture" because foundation models use transformers
- The "RAG" concept page links to "Vector Database," "Chunking," "Embeddings" — and also to "Foundation Models" because RAG relies on them

Three separate articles become one interconnected knowledge graph. The links reflect real conceptual relationships, not just keyword matches. The LLM recognizes that a foundation model is built on transformer architecture, and that RAG requires foundation models as a prerequisite.

**What you see that a keyword search would miss:** The Graph View shows "Chunking" connected to "Tokenization" even though only one of the three articles used the word "tokenization." The LLM recognized the relationship from conceptual understanding, not string matching.

## Weekly Batch Workflow

Daily clipping with weekly ingestion is the most efficient rhythm.

**During the week:** Clip articles as you find them. Don't stop to ingest. Don't worry about duplicates. The clipper adds frontmatter. The files land in your clippings folder. You keep reading.

**On the weekend:** Run `Cmd+P` → "Ingest from folder" once. All accumulated clips are processed together. The deduplication system prevents page bloat. Review the ingestion report for any extraction issues.

This batch approach has two benefits:
- **Lower cognitive overhead.** You process knowledge once per week, not multiple times per day.
- **Better cross-references.** When multiple clips share concepts, the LLM links them together in a single pass. Weekly batching produces denser connection graphs than daily ingestion.

## Practical Tips

**Prioritize long-form content.** Web Clipper can save tweets and short posts, but the LLM extracts more entities from articles with 800+ words. A 200-word summary produces 2–3 pages. A 2,000-word deep-dive produces 10–15. Prioritize depth over quantity.

**Standard granularity for most clips.** The Standard granularity setting handles typical web articles well — it creates a page for each distinct entity and concept without being too aggressive. Switch to Fine only for highly technical articles with dense terminology.

**Clean clipped content when needed.** Some web pages include boilerplate (navigation bars, cookie notices, comments sections). Inline editing removes this noise before ingestion. The LLM works better with clean input. A 30-second edit before ingest improves extraction quality noticeably.

**Check source summaries after ingest.** Each ingested source gets a summary page in `wiki/sources/`. This summary tells you what the LLM extracted. If the summary misses key points from the article, the source may need rephrasing or additional detail for better extraction.

## The Full Pipeline Summary

| Step | Action | Tool | Time |
|------|--------|------|------|
| 1 | Clip article to your clippings folder | Obsidian Web Clipper | 5 seconds |
| 2 | Ingest the folder | LLM Wiki command | 15–30 seconds |
| 3 | Review ingestion report | LLM Wiki report | 30 seconds |
| 4 | Explore new pages | Obsidian Graph View | 5 minutes |
| 5 | Query across clipped knowledge | LLM Wiki Query | As needed |

From clip to knowledge in about 6 minutes. The article goes from "a file in a folder" to "a connected node in your personal knowledge graph" in under a minute of active work.

## Next Steps

You now have a complete Web Clipper pipeline: clip to any folder you choose, ingest weekly, explore connections. The three clipped articles in our example became 24 pages with 77 links — a working knowledge graph, not a pile of bookmarks.

Next up: [**Workflow Guide (Four): From Papers to Knowledge Graph**](/blog/posts/research-papers-workflow) — transform academic papers into a structured research Wiki.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)