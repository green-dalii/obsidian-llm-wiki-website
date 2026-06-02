---
title: "The Daily Knowledge Loop"
description: "A complete daily workflow for continuous knowledge growth. From morning reading to evening review, using Karpathy LLM Wiki with Obsidian's native features."
date: 2026-05-26
tags: ["guides"]
series: "workflow-guides"
related: ["canvas-llm-wiki", "auto-maintenance"]
---

## The Gap Between Reading and Understanding

You read a lot every day. Articles, documentation, newsletters, social media threads, research paper abstracts. Some of it sticks. Most of it doesn't.

The problem isn't memory. It's structure. A single article enters your brain, stays for a few hours or days, then fades because it has nothing to anchor to. No existing framework to attach to. No cross-reference with what you already know.

The four-phase daily loop — Morning, Midday, Afternoon, Evening — turns passive reading into permanent knowledge. Each phase takes 5-15 minutes. The total daily time is under an hour. The compound effect over weeks and months is a Wiki that grows without effort.

## Phase 1: Morning Capture (5-10 minutes)

**Goal:** Collect raw material into `sources/` without processing anything.

Your morning read-through produces a stream of interesting content. Capture it fast. Don't organize. Don't summarize. Don't decide what's important. Just collect.

Three capture methods:

**Obsidian Web Clipper.** The official Obsidian Web Clipper browser extension saves any web page directly into your Vault. Configure it to save into `sources/`. One click clips the full article. Takes 5 seconds.

**Quick notes.** You read something worth saving but don't have time to clip the full article. Create a new note in `sources/` with a title, the URL, and 2-3 sentences summarizing why it's interesting. The LLM can work with that. A partial note is better than no note.

**Read-it-later integration.** If you use Raindrop, Instapaper, or similar tools, batch-export highlights to Obsidian weekly. Some users combine Obsidian's Readwise plugin with LLM Wiki — highlights land in `sources/` automatically.

**How many to collect:** 2-5 sources per morning. The goal is consistency, not volume. Collecting 20 articles means you'll skip ingestion. Collecting 3 means you'll actually process them.

## Phase 2: Midday Ingest (10-15 minutes)

**Goal:** Run Ingest Sources to transform morning captures into Wiki pages.

Around lunch or mid-afternoon, open Obsidian and run the **Ingest Sources** command (`Cmd+P` → "Ingest Sources"). The plugin reads every new file in `sources/`, sends them to your configured LLM, and creates entity pages, concept pages, and bidirectional links.

**Choose your granularity.** Before running ingest, check your Settings → Granularity:
- **Fine** — Creates many small entity pages (people, methods, technologies). Use for research-heavy content.
- **Standard** — Balances page count with depth. Good for most articles. A single article produces 5-10 pages.
- **Coarse** — Creates fewer, broader pages. Use when processing overview articles or content you're less familiar with.

**Review the report.** After ingest completes, a report shows:
- Entities extracted
- Pages created
- Links established
- Any errors or warnings

Read the report. It takes 30 seconds and tells you what your Wiki just learned. If a key concept was missed, you can adjust the source note with more detail and re-ingest.

**Batch processing.** If you missed a few days (it happens), you can batch-ingest all accumulated sources. The plugin processes them in sequence, deduplicating against existing Wiki content. Standard granularity with DeepSeek V4-Flash ($0.14/M tokens) costs about $0.01-0.02 per article. Batch-ingesting 10 articles costs pocket change.

## Phase 3: Afternoon Explore (10-15 minutes)

**Goal:** Navigate your growing Wiki to reinforce connections and discover gaps.

Afternoon exploration is the most underrated phase. Ingest creates structure. Exploration internalizes it. Without this phase, the Wiki builds pages you never visit.

Four exploration methods:

**Graph View.** Open the global Graph View (`Cmd+G`) and look for new nodes. The freshly created pages appear as bright dots. Click one. Read it. Notice the `[[wiki-links]]` it connects to. Follow one. You'll naturally traverse the graph in 5-10 minutes, visiting pages you didn't know existed.

**Backlinks panel.** Open any recently ingested source page. Scroll to the backlinks section. You'll see every Wiki page that references it. This is the fastest way to see how the LLM connected your new content to existing knowledge. If the backlinks look sparse, the source may not have connected deeply enough — consider a Fine granularity re-ingest.

**Follow the links.** Entity and concept pages contain `[[wiki-links]]` to related concepts. Clicking through 3-4 links reveals clusters you hadn't noticed. A page about "Transfer Learning" might link to "Fine-tuning," "Pre-trained Models," and "Domain Adaptation" — all from a single source article you clipped this morning.

**Tags and search.** Use Obsidian's built-in search (`Cmd+Shift+F`) with terms from your morning reading. You'll find existing notes that reference the same concepts, giving you a chance to link them manually. LLM Wiki creates automated links, but manual linking adds your personal context.

## Phase 4: Evening Query and Review (10-15 minutes)

**Goal:** Solidify the day's knowledge through active recall and selective saving.

Evening is for querying, not ingesting. By this point, your Wiki has processed the day's sources. Now ask questions that test your understanding and create lasting syntheses.

**Good evening queries:**
- "What did I learn today about [topic]?" — Summarizes the day's ingestion into a coherent overview.
- "How does today's reading on [topic] connect to what I already know?" — Forces cross-referencing against your entire Wiki.
- "What questions does my current knowledge leave unanswered?" — Identifies gaps for tomorrow's reading.

**Save valuable conversations.** When a query produces a synthesis worth keeping, click **Save to Wiki**. The saved page becomes part of your permanent knowledge and will be referenced in future queries. This is the feedback loop in action.

**Quick lint.** The Lint system detects quality issues automatically. Run **Lint Wiki** to check for duplicates, dead links, orphans, and empty pages. For small daily volumes, you'll rarely find issues. For cleanup, run **Smart Fix All** which resolves all issues in causality order.

## Weekly Maintenance (30 minutes, once per week)

The daily loop handles the flow. Weekly maintenance keeps the system healthy.

**Run Smart Fix All.** Even with daily lint checks, issues accumulate. Run Smart Fix All once per week. It processes duplicates, dead links, orphans, empty pages, and missing aliases in causality order. For a Wiki with 100-300 pages, this takes under 30 seconds.

**Review empty pages.** Lint flags pages with no content. These are usually created when the LLM extracted an entity name but had insufficient source material to write a full page. Review each one. Either add content or delete the page. Empty pages don't harm the system, but they're clutter in search results and Graph View.

**Check graph growth.** Open the Graph View and look for isolated clusters. A healthy Wiki shows a connected graph, not separate islands. If you see unconnected clusters, you may need to create bridging sources — articles that connect two areas of interest.

**Enable auto-maintenance at 50+ pages.** Once your Wiki passes 50 pages, enable Auto-Maintenance in Settings. This runs file watching and periodic lint automatically. The plugin watches `sources/` for new files, triggers lint after configurable intervals, and checks Wiki health on startup. At this scale, manual maintenance becomes unreliable.

## The Compounding Effect

The daily loop's power isn't in any single day. It's in the compound effect over months.

**Week 1:** Your Wiki has 15-30 pages from the first week's reading. Graph View shows a small cluster around your main interest area.

**Month 1:** 100-200 pages. Multiple clusters appear as different topics get ingested. Cross-topic connections start forming as the LLM links related concepts from different sources.

**Month 3:** 400-600 pages. The clusters merge into a connected graph. Querying produces rich syntheses because the LLM has substantial material to work with. The query feedback loop accelerates — saved query answers become source material for future queries.

**Month 6:** 800+ pages. Your Wiki is a comprehensive knowledge base on your topics of interest. Query answers rival what you'd get from a domain expert. The daily maintenance effort is still under an hour. You've spent about 90 hours total. The result is a personalized knowledge graph that grows forever.

## Practical Tips

**Use Canvas for visual mapping.** Once per week, create an Obsidian Canvas that maps the week's new Wiki pages. Drag entity pages onto the canvas. Draw connections manually. This spatial visualization complements the Graph View and helps you identify relationships the LLM might have missed.

**Track in daily notes.** Create a daily note template that includes a section for "Today's Wiki additions." List new pages created. Write 1-2 sentences about what you learned. This creates a human-readable journal alongside the machine-structured Wiki.

**Separate providers for ingest vs. query.** Use DeepSeek V4-Flash for ingestion (low cost, large context) and Claude Sonnet 4.6 for query (higher quality synthesis). Configure different providers in Settings → Provider Selection. Total daily cost: roughly $0.10-0.20.

## Next Steps

You now have a complete daily workflow: capture in the morning, ingest at midday, explore in the afternoon, query and review in the evening. Consistency matters more than volume. Stick with the loop for two weeks and your Wiki will have more pages than most people's entire note collection.

Next up: [**Workflow Guide (Three): Web Clipper + LLM Wiki**](/blog/posts/web-clipper-workflow) — transform clipped articles into a connected knowledge graph.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
