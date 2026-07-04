---
title: "Workflow Guide (1): Saving Your Best Queries as New Wiki Pages"
description: "Conversational queries create new knowledge. Karpathy LLM Wiki lets you save query results as wiki pages — the second path for your knowledge base to grow beyond source ingestion."
date: 2026-05-25
tags: ["guides"]
series: "workflow-guides"
related: ["daily-knowledge-loop", "chat-history-knowledge-base", "introducing-llm-wiki"]
---

## Two Outputs from One Query

Every time you open the Query interface and ask a question, you get two things.

The first is obvious: an answer. The LLM reads your Wiki, finds relevant pages, and returns a response. You get the information you needed, you close the panel, and you move on.

The second is easy to overlook: the answer itself is a synthesis worth keeping.

When the LLM answers "What do my notes say about retrieval-augmented generation across my different source articles?" it doesn't just copy-paste. It cross-references entities from multiple sources, identifies connections between concepts you wrote about at different times, and produces a structured response that may not exist as a single page anywhere in your Wiki.

That synthesis is new knowledge. And with one click, you can save it as a permanent Wiki page.

## When to Save Query Results

Not every query answer deserves its own page. Here's when to save.

**Cross-domain synthesis.** You asked "How do transformer architectures relate to the attention mechanisms I've written about?" The answer draws from three different source articles, connects concepts you hadn't explicitly linked, and produces a unified explanation. This synthesis doesn't exist anywhere else in your Wiki. Save it.

**Comparisons.** "Compare DeepSeek V4-Flash with Claude Sonnet 4.6 for my use case." The LLM weighs pros and cons based on your own notes. The result is a comparison document that future queries can reference. Save it.

**Decisions.** "Based on what I've written, should I use RAG or fine-tuning for my project?" The answer traces your reasoning across multiple sources and produces a conclusion. Six months from now, you'll want to revisit that reasoning. Save it.

**Insights.** Sometimes the value isn't practical — it's conceptual. A query produces an unexpected connection you hadn't considered. The LLM says "Your notes on X and Y suggest a pattern where Z emerges under specific conditions." That insight came from the combination of your sources, not from any single one. Save it.

## When NOT to Save

Most queries don't need saving.

**Simple fact lookups.** "When was the Attention Is All You Need paper published?" One fact. One source. Instant answer. A full page would add noise.

**Already-captured info.** You ask "What is a transformer architecture?" and the answer matches an existing Wiki page. The LLM is just rephrasing what you already have. No new knowledge was created.

**Transient answers.** "What did I write last week about project deadlines?" The answer is time-bound. Next week it'll be irrelevant. A permanent page would become stale immediately.

**Speculation.** "What do you think the next breakthrough in AI will be?" The LLM doesn't know. It will generate a plausible-sounding answer based on general knowledge, not your sources. Saving speculation pollutes your Wiki with low-quality content.

Use a simple rule: **save when the answer contains a synthesis that future-you would want to read.** If the answer is useful today and useless tomorrow, don't save.

## How to Save: Five-Step Process

Step-by-step from query to Wiki page.

**Step 1: Ask your question.** Open the Query interface. Ask something worth exploring. Good queries reference multiple sources or concepts: "How do the papers I've saved about attention mechanisms connect to each other?" Bad queries are single-fact lookups: "What year was the Transformer paper published?"

**Step 2: Read the answer.** Let the LLM stream the full response. Don't interrupt. Read the synthesis carefully. Does it contain new connections? Would a standalone page be useful?

**Step 3: Click "Save to Wiki."** The Save to Wiki button appears in the Query interface toolbar. One click saves the conversation as a new page in your Wiki. The plugin extracts the key entities and concepts from the answer and adds them to your Wiki's index automatically.

**Step 4: Review the saved page.** Open the newly created page in your `wiki/` folder. The LLM generated a page with `[[wiki-links]]` to all the source entities and concepts it referenced. Check the links. Add your own notes if needed. You can edit it like any other Markdown file — it's not locked.

**Step 5: Verify connections.** Open the Graph View. The new page appears as a node connected to everything it references. If the page synthesized three sources, you'll see three edges connecting it to those existing pages.

## Semantic Deduplication

What happens if you save a query answer that covers the same ground as an existing Wiki page?

The plugin checks. Before creating a new page, it compares the content against existing pages using semantic similarity. If the new answer overlaps significantly with an existing page — above a configurable threshold — the plugin offers to append the answer as a note on the existing page rather than creating a duplicate.

This prevents the most common Wiki-quality problem: pages that say the same thing in slightly different words. The Lint system's duplicate detection also catches any that slip through, but semantic deduplication at save time is the first line of defense.

## The Query Feedback Loop

Here's how the feedback loop works over time:

1. **Ingest** — You write a source note and run Ingest Sources. The Wiki gets entity pages, concept pages, and cross-links.
2. **Query** — You ask a question that cross-references multiple entities. The LLM synthesizes new knowledge.
3. **Save** — You save the synthesis as a new Wiki page. It enters the existing network with proper links.
4. **Future queries reference it** — When someone (including you) asks a question later that touches the same topic, the saved synthesis appears as a source page in the query context.

The loop compounds. Every saved query makes future queries richer because the LLM has more material to work with. Over months, the pages that started as query answers become some of the most-linked pages in your Wiki — because they were born as syntheses, not raw notes.

## Practical Example

You have three sources in your Wiki: one about Mixture of Experts (MoE) architectures, one about model quantization techniques, and one about inference optimization strategies. They're separate pages with separate links.

You open Query and ask: **"Based on my notes, what are the practical trade-offs between MoE and quantization for reducing model inference costs?"**

The LLM reads all three sources and returns:

> Your notes on MoE suggest routing overhead increases latency by 10-20% compared to a single dense model of equivalent total parameters. Your quantization notes show INT8 reduces memory by 75% with minimal accuracy loss. For latency-sensitive applications, quantization may be more practical than MoE. For memory-constrained deployments where some latency is acceptable, MoE offers more flexibility since you can adjust the number of active experts at runtime.

This synthesis doesn't exist in any single source. It's new knowledge created from the combination. You click **Save to Wiki**. The plugin creates a new page titled "MoE vs Quantization — Practical Trade-offs" with `[[wiki-links]]` to your existing MoE, quantization, and inference optimization pages.

Three months later, you're working on a deployment project. You open Query and ask "What trade-offs should I consider for reducing inference costs?" The LLM's context now includes the saved synthesis page. Its answer will be richer because you took 15 seconds to save the original conversation.

## Configuration Options

The Save to Wiki feature has configurable behavior in Settings:

- **Auto-save on close** — When enabled, closing the Query panel automatically saves the conversation as a Wiki page. Use with caution: you'll get pages for every query, including transient ones. Recommended only if you review and clean regularly.
- **Deduplication threshold** — How semantically similar a new answer must be to an existing page before the plugin triggers deduplication. Default is 0.85 (85% similarity). Lower values catch more duplicates but may produce false positives.
- **Save format** — Choose between full conversation (questions and answers) or answer only. Answer-only reduces noise.
- **Naming convention** — Customize how saved pages are named. Default uses a truncated version of your question. Options include date-prefixed, topic-prefixed, or manual naming.

## Limitations

Three things to keep in mind.

**LLM-generated content can contain errors.** The LLM is synthesizing from your sources, not copying verbatim. It can misinterpret, over-summarize, or introduce subtle inaccuracies. Review saved pages before relying on them for important work. The plugin marks auto-generated pages with a metadata flag, so you can always identify which pages came from queries vs. ingestion.

**Saved query pages can go stale.** If you later delete or significantly change the source pages that informed a saved query, the saved page may reference information that no longer exists or contradicts your current understanding. Periodic re-ingestion or manual review helps. The Lint system flags dead links automatically.

**Saved pages add to the Lint burden.** Every page in your Wiki is subject to Lint checks — duplicate detection, orphan detection, dead link detection, alias completeness. Saved query pages increase the total page count, which increases the maintenance surface. For small Wikis (under 200 pages), this is negligible. For large Wikis, be selective about what you save.

## Next Steps

You now understand the query-to-wiki feedback loop: how every good query can generate permanent knowledge, when to save (and when not to), and how the plugin prevents duplicates through semantic deduplication.

Next up: [**Workflow Guide (Two): The Daily Knowledge Loop**](/blog/posts/daily-knowledge-loop) — a complete daily workflow from morning reading to evening review.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
