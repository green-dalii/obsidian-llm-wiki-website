---
title: "v1.23: Your Wiki's Links Are Now an Index"
description: "v1.23 makes your link graph a real search index. Query Wiki walks it via Monte Carlo Personalized PageRank instead of guessing by title match. Plus true streaming for every provider, multi-file ingest, and a welcome note for new vaults."
date: 2026-07-02
tags: ["announcement"]
related: ["introducing-llm-wiki"]
series: "announcement"
---

v1.23 ships today. It makes Query Wiki read your `[[wiki-link]]` graph as a graph, streams answers incrementally for every provider, lets you pick specific notes to ingest, and writes a translated welcome note when you install it in a fresh vault. The plugin itself behaves exactly as before; what's new is what Query Wiki can find.

## Headline numbers

**Query Wiki top-5 recall: 21.5% → 23.8%** on real-vault tuning, where v1.22 stopped at the keyword-match ceiling. Three percentage points behind a state-of-the-art embedding model ([bge-m3](https://huggingface.co/BAAI/bge-m3)) on the same vault — within sampling noise — for zero embedding cost, every provider, fully offline.

The graph that produced those numbers was contributed by a community member: 910 pages, 5,862 directed edges, **99.9% of pages in a single connected component**. Tuning parameters: 3,000 random walks per query, walk length 20, damping 0.05. Total cost: roughly half a million floating-point operations per query, in a web worker.

## What's new

**Query Wiki walks the graph.** Ask "what did I write about cardiac conditions?" It starts from the Cardiology page — which you've linked from a dozen places — and surfaces the three specific-condition pages that link back. On a wiki with fewer than about 30 pages or thin cross-linking, the cascade gracefully falls back to keyword match.

**Streaming for every provider.** v1.22's renderer had a subtle race: it accumulated the full event stream first, then consumed the text stream — so text appeared in one dump. v1.23 consumes only the text stream, with `requestAnimationFrame` coalescing into one paint per frame. Anthropic, OpenAI, Google, Ollama, LM Studio, all of them.

**Multi-File Ingest.** `Cmd+P → "Ingest multiple files"` opens a two-pane picker — folder tree with checkboxes on the left, live queue on the right. Add five notes. Add fifty. Cancel one without cancelling the rest.

**Welcome note for new vaults.** When you install v1.23 in a vault that doesn't have one, the plugin writes a `Welcome.md` to your vault — automatically generated, not editable as a form. The body is translated into your wiki output language by the LLM **at write time** (no hardcoded i18n), so users in different vaults see the same instructions in their own language. Three-tier behavior: Tier A (no LLM configured) gets only a Notice, Tier B (new vault with LLM) gets a fresh Welcome note, Tier C (existing wiki) is silent. There's a `createWelcomeNote` setting (default on) to disable the behavior entirely, and a "Recreate Welcome Note" command if you delete the file and want it back.

## How the architecture got decided

This was the most consequential single change to Query Wiki since v1.0, and we didn't decide it in private. [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) ran for four days in public, with two community members whose contributions shaped the architecture in ways I wouldn't have arrived at alone.

The thread started from a sharp framing: every `[[wiki-link]]` between pages is *itself* an embedding. The LLM, at ingest time, asserts "these pages are related." A graph is just the embeddings, with the inference precomputed by an upstream model that happens to be very good at this task. So the question was never "graph vs embeddings" — it was "do we re-run that inference on demand, or do we walk the graph we already have?"

Walking the graph won on three counts. **Provider coverage**: most providers most users run (DeepSeek, GLM, MiniMax, Ollama, LM Studio, Anthropic) don't expose embeddings at all; building the core around a single-provider endpoint would lock out most of the user base. **State**: a 2,000-page embedding index is ~12 MB of per-vault storage that has to be versioned, migrated on model change, and held in memory. **The signal is already in the vault**: every link is the LLM doing embedding-quality work for free; the graph didn't need to be learned.

The **first major correction** came from @GioiaZheng. I'd framed PPR as mathematically equivalent to embeddings. That's wrong, and the correction matters: embeddings genuinely add signal that link structure can't capture — newly added pages that haven't been linked yet, cross-lingual queries, vocabulary drift. PPR is the *default* ranker. Embeddings are an opt-in enrichment layer for the cases PPR can't see. That distinction is now baked into the architecture.

The **second major correction** came from @DocTpoint, and it changed the whole computational shape. PPR is classically computed by power iteration: solve the walk's stationary distribution deterministically, ~50 sweeps over the whole graph. @DocTpoint pointed out that for top-k retrieval we don't need the stationary distribution — we just need to know which pages the walker visits most. *Sample* the walk rather than solve it: run K short random walks from the seed, count visits, take top-k. This is [Fogaras et al. 2005, *Towards Scaling Fully Personalized PageRank*](https://www-cs.stanford.edu/tdang/papers/fogaras05ppr.pdf). Cost scales as **O(K × L)** — independent of |V|. A 2,000-page vault costs the same per query as a 200-page one. And the walks are embarrassingly parallel, which fits a Web Worker so the Obsidian UI never blocks. We adopted Monte Carlo PPR for v1.23.

The third thread — **cold start** — turned out to be two problems, not one. An empty vault has no structure to detect; the missing input is *which domains exist*, and only the user has that. A sparse vault has structure but not enough to make PPR meaningful; that needs an algorithmic guard. v1.23 uses a `min_pages` / `min_edges` threshold inside `src/core/ppr-cascade.ts` (internal constants `30` / `30`) — below that, the cascade falls back to keyword match. These are internal tuning knobs, not user-facing settings; if the user's wiki is too small, they don't see an error, they just get the old keyword behavior.

The five-way collapse — hub detection, link distinctiveness, query retrieval, dead-link hub check, and the old "Tier C" traversal — all reduce to a single Monte Carlo PPR primitive. The discussion thread estimated roughly 80 LOC for the core, plus ~50 LOC for hub detection and ~30 LOC for the section extractor that replaced an LLM call per query.

If you want to read the full conversation, [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) has every argument, including the ones we rejected.

## Provider-version regressions are over

Before v1.23, the plugin shipped a 1,625-line hand-rolled LLM client. Issues **#137, #141, #143, #147, #207** were all symptoms of the same disease: a provider ships a new model name or changes an API field, and something breaks. v1.23 replaces the entire client with [Vercel's AI-SDK v6](https://sdk.vercel.ai/) — `@ai-sdk/openai@3`, `@ai-sdk/anthropic@3`, `@ai-sdk/openai-compatible@2`. Eight old test files (2,609 lines) went with it.

## Who pushed this through

**@DocTpoint** — author of the hub-detection and link-distinctiveness scanners for this plugin. Beyond #235, he proposed the **Monte Carlo PPR approach** that unlocked top-k retrieval at constant cost per query. He also pushed back on the cold-start framing I'd started with — *"the missing input on an empty vault is which domains exist, and only the user has it"* — which became the underlying motivation for the three-tier Welcome-note behavior (though in the final implementation the note is auto-generated, not user-editable — the founding-note affordance DocTpoint originally proposed was deliberately removed during the 2026-06-28 review because nothing in the code path actually read the user input back). His hub-lifecycle framing (birth / middle / death) is still the structure the team organizes related work around. His privacy stance on test data is also worth noting: when offered to share a real-world vault as an eval fixture, he declined — *"my vault is not a candidate for that; medical material in lay hands carries real-world risk."* The team uses synthetic fixtures instead.

**@GioiaZheng** — corrected the embedding-equivalence framing (*"PPR captures relation-by-link behavior; embeddings can still add signal for unlinked, newly added, cross-lingual, or vocabulary-shift pages"*). The classification of cold start into empty / sparse / mature as three distinct problems also came from this thread.

Both are contributors to v1.24.0, in the same Discussion thread, in public.

## What's next

- **v1.23.1 PATCH shipped** (you're on it). No-changes patch aligning the local TypeScript config with Obsidian's review-bot environment.
- **v1.23.2 PATCH is in flight.** Two UX gaps surfaced by community member jameses-cyber: a setting to silence the progress notice during periodic background lint, and a setting for whether the final query response scrolls you to the top or leaves you at the bottom. Both filed with reproductions, both approved, both batched.
- **v1.24.0 MINOR is in design.** PDF source ingest and source-revision awareness — both have open Discussion threads shaping the shape of the API. Hub-retirement lint wiring is also planned here.

If you want to follow along, [Discussions](https://github.com/green-dalii/obsidian-llm-wiki/discussions) is where decisions get made before they're coded.

## Getting started

Install or update from the Obsidian Community Plugin marketplace (search "Karpathy LLM Wiki"). Existing settings, prompts, and vaults carry over unchanged. For the new PPR behavior, no settings to toggle — Query Wiki just walks the graph now, with keyword-match fallback when the graph is too small to walk meaningfully.

---

## Appendix

**Why a graph, and not an embedding model.** Two traditions in information science for "which documents are related to which." Citation analysis, dating to Eugene Garfield in the 1950s and formalized as PageRank by Google's founders in 1998: count who gets cited by people who get cited a lot. Embedding models, dominant today: feed the model a text, get a vector, find related ones by similarity.

Personalized PageRank is the citation-analysis tradition, applied to the graph you already have. Every `[[wiki-link]]` in your vault is a citation — the LLM at ingest time is asserting *"these pages are related."* Personalized PageRank asks Garfield's question, and gets the same ranking an embedding model would have given you. Taher Haveliwala proved this equivalence in his 2002 Stanford paper on topic-sensitive PageRank.

Three practical reasons we chose the graph: most providers most users actually run (DeepSeek, GLM, MiniMax, Ollama, LM Studio, Anthropic) don't expose an embeddings endpoint at all; a 2,000-page embedding index is roughly 12 MB of per-vault state that has to be versioned and migrated on model change; and the signal is already in the vault. Embeddings are reserved for the cases the graph can't see — newly added pages, cross-lingual queries, vocabulary drift. Smaller and more opt-in, not the default.

**Methodology.** Tuning data: 910 pages, 5,862 directed edges, 99.9% of pages in a single connected component, contributed as anonymized degree distributions. Parameters: 3,000 random walks per query, walk length 20, damping 0.05. Cost: ~500K floating-point operations per query, run in a web worker. Reference embedding model: [bge-m3](https://huggingface.co/BAAI/bge-m3). Architecture discussion: [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235). Methodology and topology numbers are linked from there.

---

**Install**: [Obsidian Community Plugin](https://obsidian.md/plugins?id=karpathywiki) · [v1.23.1 release notes](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.23.1) · [Apache 2.0 license change](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)