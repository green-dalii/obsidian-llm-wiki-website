---
title: "v1.23: Your Wiki's Links Are Now an Index"
description: "v1.23 makes your link graph a real search index. Query Wiki walks it instead of guessing by title match. Plus true streaming for every provider, multi-file ingest, and a welcome note for new vaults."
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

**Streaming for every provider.** v1.22's renderer had a subtle race: it accumulated the full event stream first, then consumed the text stream — so text appeared in one dump. v1.23 consumes only the text stream, with `requestAnimationFrame` coalescing into one paint per frame. Every provider (Anthropic, OpenAI, Google, Ollama, LM Studio) streams incrementally. Reasoning steps on DeepSeek and OpenAI o-series collapse into a foldable block.

**Multi-File Ingest.** `Cmd+P → "Ingest multiple files"` opens a two-pane picker — folder tree with checkboxes on the left, live queue on the right. Add five notes. Add fifty. Cancel one without cancelling the rest.

**Welcome note for new vaults.** When you install in a vault that doesn't have one, the plugin writes a `Welcome.md`, translated into your wiki output language by the LLM at write time. For an empty vault, the same note doubles as a founding note where you list the domains your wiki covers.

## Provider-version regressions are over

Before v1.23, the plugin shipped a 1,625-line hand-rolled LLM client. Issues **#137, #141, #143, #147, #207** were all symptoms of the same disease: a provider ships a new model name or changes an API field, and something breaks. v1.23 replaces the entire client with [Vercel's AI-SDK v6](https://sdk.vercel.ai/) — `@ai-sdk/openai@3`, `@ai-sdk/anthropic@3`, `@ai-sdk/openai-compatible@2`. Eight old test files (2,609 lines) went with it.

## Who pushed this through

The PPR direction came out of [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) — a four-day public thread.

**@DocTpoint**, who built the hub-detection and link-distinctiveness scanners, pushed back on the cold-start framing I'd started with. *"The missing input on an empty vault is which domains exist, and only the user has it"* — that turned the cold-start problem into "we ask the user a question," which became the founding-note behavior of `Welcome.md`.

**@GioiaZheng** corrected my framing of the embedding equivalence. I'd called PPR and embeddings "mathematically equivalent." That's wrong — embeddings genuinely add signal that link structure can't capture (newly added pages, cross-lingual queries, vocabulary drift). PPR is the *default* ranker; embeddings are an opt-in enrichment layer for the cases PPR can't see. Both distinctions are now baked into the architecture.

Both are contributors to v1.24.0, in the same Discussion thread, in public.

## What's next

- **v1.23.1 PATCH shipped** (you're on it). No-changes patch aligning the local TypeScript config with Obsidian's review-bot environment.
- **v1.23.2 PATCH is in flight.** Two UX gaps surfaced by community member jameses-cyber: a setting to silence the progress notice during periodic background lint, and a setting for whether the final query response scrolls you to the top or leaves you at the bottom. Both filed with reproductions, both approved, both batched.
- **v1.24.0 MINOR is in design.** PDF source ingest and source-revision awareness — both have open Discussion threads.

If you want to follow along, [Discussions](https://github.com/green-dalii/obsidian-llm-wiki/discussions) is where decisions get made before they're coded.

## Getting started

Install or update from the Obsidian Community Plugin marketplace (search "Karpathy LLM Wiki"). Existing settings, prompts, and vaults carry over unchanged. For the new PPR behavior, no settings to toggle — Query Wiki just walks the graph now, with keyword-match fallback when the graph is too small to walk meaningfully.

---

## Appendix

**Why a graph, and not an embedding model.** Two traditions in information science for "which documents are related to which." Citation analysis, dating to Eugene Garfield in the 1950s and formalized as PageRank by Google's founders in 1998: count who gets cited by people who get cited a lot. Embedding models, dominant today: feed the model a text, get a vector, find related ones by similarity.

Personalized PageRank is the citation-analysis tradition, applied to the graph you already have. Every `[[wiki-link]]` in your vault is a citation — the LLM at ingest time is asserting *"these pages are related."* Personalized PageRank asks Garfield's question, and gets the same ranking an embedding model would have given you. Taher Haveliwala proved this equivalence in his 2002 Stanford paper on topic-sensitive PageRank.

Three practical reasons we chose the graph: most providers most users actually run (DeepSeek, GLM, MiniMax, Ollama, LM Studio, Anthropic) don't expose an embeddings endpoint at all; a 2,000-page embedding index is roughly 12 MB of per-vault state that has to be versioned and migrated on model change; and the signal is already in the vault. Embeddings are reserved for the cases the graph can't see — newly added pages, cross-lingual queries, vocabulary drift. Smaller and more opt-in, not the default.

Full architecture discussion: [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235). Methodology and topology numbers are linked from there.

---

**Install**: [Obsidian Community Plugin](https://obsidian.md/plugins?id=karpathywiki) · [v1.23.1 release notes](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.23.1) · [Apache 2.0 license change](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)