---
title: "Inside the System (6): Why We Sample Instead of Solve — Monte Carlo Personalized PageRank in v1.23"
description: "A deep dive into how Karpathy LLM Wiki's v1.23 graph engine uses Monte Carlo Personalized PageRank to walk your [[wiki-link]] graph in constant time per query — and why a 2,000-page vault costs the same as a 200-page one."
date: 2026-07-04
tags: ["internals"]
series: "inside-the-system"
related: ["v123-graph-engine-ai-sdk", "schema-layer-deep-dive", "modular-architecture", "faster-ingestion"]
---

This is the sixth article in our *Inside the System* series. Earlier pieces walked through the plugin’s modular refactor, model selection, ingestion latency, contradiction detection, and schema extraction; this one opens the lid of a single module — not to celebrate it, but to walk through the design decisions, the parts that look expensive and aren’t, and the parts that look cheap and aren’t. The module today is the v1.23.0 graph engine, specifically the Monte Carlo Personalized PageRank primitive that powers hub detection, link distinctiveness, and query-time retrieval.

If you only want the user-facing story, [Announcement: v1.23 — Link Graphs as a Search Index](/blog/v123-graph-engine-ai-sdk) is the right read. This article assumes you’re willing to live inside a 100-line TypeScript file for fifteen minutes.

## The One Algorithm Behind Three Features

The decision we made during the v1.23.0 design cycle was to collapse three retrieval-flavored problems into a single Monte Carlo primitive:

1. **Query-time page ranking.** “Which ten pages are most relevant to this query?” (Replaces v1.22’s keyword-match ceiling.)
2. **Hub identification.** “Which pages do many other pages link to? Those are the central nodes.” (Closes Issue #117.)
3. **Link distinctiveness scoring.** “Are these `[[link]]`s in the `## Related` section actually saying different things, or are they pointing at the same neighborhood through different paths?” (Closes Issue #157 / #175.)

The discussion thread that decided this is [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) — four days of public reasoning between three engineers, with @DocTpoint introducing Monte Carlo PPR as the proposal that unlocked top-k retrieval at constant cost per query.

The collapse turned out to be clean. One `personalizedPageRank(graph, seed, options)` function. ~80 lines of core code. ~50 lines for hub detection. ~30 lines for the section extractor that replaced an LLM call per query. Every consumer above reads off the same primitive.

This article is the longer-form version of those three commits.

## What Personalized PageRank Actually Is

Classic PageRank (Brin & Page, 1998) assigns a single scalar to every node in a directed graph — its stationary probability under a random walk that, at every step, either follows a random outgoing edge or *teleports* to a uniformly random node with probability `damping`. Every link in the graph contributes, and the resulting vector is the web’s first eigenvector-based ranking.

Personalized PageRank (Haveliwala, 2002 — *Topic-Sensitive PageRank*) replaces the uniform teleport distribution with a *seed*-specific one: with probability `damping`, teleport back to a chosen seed node; otherwise follow an outgoing edge at random. The result is a probability distribution over nodes where the seed is “closer” than other nodes, weighted by graph connectivity. Haveliwala proved that this is mathematically equivalent to topic-sensitive citation analysis — “what is this field about?” in Garfield’s terms.

For us, the practical question is never “what is the whole graph like?” (classic PageRank) but “what is relevant to *this user’s query*?” — and the query seed is exactly what PPR personalizes against.

## The Traditional Way To Compute It

If you’ve seen PageRank tutorials, you’ve seen the formula:

$$\mathbf{r}^{(t+1)} = (1 - d) M \mathbf{r}^{(t)} + d \mathbf{p}$$

where `M` is the row-normalized adjacency matrix, `d` is the damping factor, and `p` is the teleport distribution (the seed vector for PPR). You iterate `r` until convergence (typically by L1 norm falling under `1e-6`), then read off the stationary distribution.

This is **power iteration**. It works. It’s deterministic. It is also expensive in the way you don’t care about for graph search:

| Cost | Power iteration | What it means for us |
|---|---|---|
| Per-query complexity | O(50 × (V + E)) | 50 sweeps over every node and every edge until convergence |
| Memory residency | O(V + E) | The whole adjacency matrix has to fit somewhere |
| Determinism | Exact | Returns the *true* stationary distribution |

For a 2,000-page vault with ~12,000 edges, that’s 100,000 edge operations per query, every query, with the whole adjacency matrix resident. For a 10,000-page vault with ~60,000 edges, it’s 500,000. The cost grows with vault size, which means a user’s perceived Query Wiki latency is a function of *how much they’ve learned*, not how much they’re trying to find. That’s backwards.

## Why We Sample Instead Of Solve

[Fogaras et al., 2005 — *Towards Scaling Fully Personalized PageRank*](https://www-cs.stanford.edu/tdang/papers/fogaras05ppr.pdf) is the paper that introduced the idea we adopted. The key insight, as @DocTpoint summarized in [#235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235):

> For top-k retrieval we don’t need the stationary distribution. We need to know which pages the walker visits most. *Sample* the walk rather than solve it.

The algorithm:

```
For K walks, each of length L:
  Start at seed.
  For each step:
    With probability damping: teleport back to seed.
    With probability (1 - damping): pick a uniform random outgoing edge.
    Record the node you land on.
Aggregate visit counts. Normalize to probabilities. Sort.
```

This is **Monte Carlo Personalized PageRank**, and it has the property that made the v1.23 decision easy:

**Cost is O(K × L), independent of |V|.**

A 200-page vault costs the same per query as a 2,000-page vault, because we never iterate over the graph; we walk into it. Per-query floating-point operations are dominated by `K × L` RNG samples and array lookups on the seed’s outgoing edges, regardless of how many nodes exist that we never touch.

For our final tuned parameters — `K = 3,000` walks, `L = 20` steps, `damping = 0.05` — the per-query cost is ~500,000 floating-point operations in our [REAL_VAULT_EVAL.md](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/__tests__/fixtures/wikis/sample-50page/REAL_VAULT_EVAL.md). That number does not change as the vault grows, until it grows to the point where the walker can’t reach the seed’s neighborhood in 20 steps.

There are three properties that come with the algorithm that are not true of power iteration. These matter:

1. **It’s a ranker, not a judge.** The output is a relative ordering of pages by visit frequency. If two pages have scores `0.21` and `0.18`, you should not interpret those as probabilities of being correct — you should interpret them as “page A is more visited than page B by the walker.”
2. **It’s stochastic.** Two runs of the same query on the same graph will produce slightly different rankings. Top-k is robust to this. Tiny differences in the long tail aren’t.
3. **It assumes ergodicity within walk length.** If a seed’s neighborhood takes 50 random-walk steps to traverse, but `L = 20`, the walker dies before visiting the deep part. Walk length is a hyperparameter, and it’s the one most likely to bite us when users build very dense vaults.

The v1.23.0 tuning cycle converged on `L = 20` as the sweet spot for vaults in the 100–2,000 page range. `L = 40` actually regressed — see the tuning table below for the data.

## The 100 Lines That Do It

Here is the entire v1.23 core PPR function, extracted from [`src/core/monte-carlo-ppr.ts`](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/monte-carlo-ppr.ts) (the file has comments; this strip-down is what the function does):

```typescript
export function personalizedPageRank(
  graph: Graph,
  seed: string,
  options: PPROptions = {},
): Map<string, number> {
  if (!graph.nodes.includes(seed)) return new Map();

  const numWalks = options.numWalks ?? 3000;
  const maxSteps = options.maxSteps ?? 50;
  const damping  = options.damping ?? 0.05;
  const rng      = options.rng ?? Math.random;

  const visitCounts = new Map<string, number>();
  visitCounts.set(seed, numWalks); // every walk starts at seed

  for (let walk = 0; walk < numWalks; walk++) {
    let current = seed;
    for (let step = 0; step < maxSteps; step++) {
      // With probability `damping`, teleport back to seed.
      if (rng() < damping) {
        current = seed;
        visitCounts.set(current, (visitCounts.get(current) ?? 0) + 1);
        continue;
      }
      // Otherwise follow a random outgoing edge.
      const outgoing = graph.edges.get(current);
      if (!outgoing || outgoing.length === 0) {
        // Dead end: teleport back to seed (Haveliwala 2002 dead-end rule)
        current = seed;
        visitCounts.set(current, (visitCounts.get(current) ?? 0) + 1);
        continue;
      }
      const next = outgoing[Math.floor(rng() * outgoing.length)];
      current = next;
      visitCounts.set(current, (visitCounts.get(current) ?? 0) + 1);
    }
  }

  // Normalize to probabilities (visit count / total recorded visits).
  let total = 0;
  for (const count of visitCounts.values()) total += count;

  const result = new Map<string, number>();
  if (total === 0) return result;
  for (const [node, count] of visitCounts) {
    result.set(node, count / total);
  }
  return result;
}
```

Three things to call out:

**Dead-end handling.** If a node has no outgoing edges, the walker teleports back to the seed (Haveliwala’s 2002 “dead-end” rule). Without this, a vault with a `Sources.md` page that summarizes and links out but has zero incoming context would trap the walker forever. We re-teleport and continue rather than terminate the walk — which means a dead-end seed never starves the rest of the graph.

**Pre-seeded visit counts.** `visitCounts.set(seed, numWalks)` records that every walk starts at the seed. This is what makes the seed itself rank first in the output rather than being averaged in with the rest of the visits. Without it, the seed would have only `K × damping` teleport-landing visits, which biases against high-damping regimes.

**No seedable RNG in the public API.** Tests inject a [mulberry32](https://stackoverflow.com/a/47593316) PRNG through `options.rng` for determinism. Production calls omit it; `Math.random` is fine. The reasoning was explicit in the commit that landed this: top-k is robust to sampling noise, and the determinism tax on production callers isn’t worth the stability tax on rank quality.

## The Tuning That Got Us R@5 = 23.8%

Tuning ran on a 2,142-page real vault, leave-one-out evaluation, 3,473 vertices and 12,158 edges. (The vault itself isn’t committed — privacy stance on community contributions ruled out public real-vault data; we use it for tuning, then discard the source. The methodology file and the synthetic CC0 50-page fixture are in the test fixtures directory.)

Six iterations were run. The relevant tail of the table is:

| Iter  | damping | numWalks | walkLength | R@5    | R@10   |
|-------|---------|----------|------------|--------|--------|
| BASE  | 0.15    | 1000     | 20         | 21.5%  | 37.2%  |
| T1    | 0.05    | 1000     | 20         | 23.1%  | 38.3%  |
| T2    | 0.05    | 3000     | 20         | 23.6%  | 39.0%  |
| **T3** | **0.05** | **3000** | **20**     | **23.8%** | **39.6%** |
| T4    | 0.05    | 3000     | 40         | 22.4%  | 38.1%  |
| T5    | 0.02    | 3000     | 20         | 22.9%  | 38.4%  |
| T6    | 0.05    | 5000     | 20         | 23.7%  | 39.5%  |

The data tells three stories worth surfacing:

**Damping is the strongest single lever.** Going from `0.15 → 0.05` (T1) reclaimed +1.6pp R@5 and +1.1pp R@10 in a single change. The intuition: lower damping means the walker spends more of its budget following graph structure rather than being yanked back to the seed. The seed gets *fewer* direct credits but the *neighborhood* becomes more visible — and for top-k retrieval, the neighborhood is where the relevant pages live. We had initially been conservative with damping (high values feel more like “personalization”) and learned empirically that for our default seed-set behavior, low damping worked strictly better.

**More walks hit diminishing returns fast.** T2 (`walks: 3000`) vs T6 (`walks: 5000`) is +0.1pp R@5 for 67% more RNG samples. Worth nothing. T3 is the saturation point — and our chosen default.

**Walk length is a Vault Resize Surprise.** Doubling `L` from 20 to 40 *regressed* R@5 by 1.4pp. This was the most counter-intuitive result. The mechanism: with longer walks, the random walker wanders further afield, visiting marginal pages that compete with the seed’s true neighborhood for visit count. The seed still has high visit count (pre-seeded), but the *second tier* of relevant pages falls away into noise. Twenty steps is enough to traverse 3–4 hops in the random direction, which is roughly what a relevant neighborhood has in our observed vaults.

The takeaway for tuning the next version: don’t just throw compute at the algorithm. Lengthening walks isn’t “more thorough” — it’s noisier.

## The Three Consumers

### 1. Hub Detection (Issue #117)

[`src/core/hub-detection.ts`](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/hub-detection.ts) wraps PPR. The signature is `detectHubs(graph, options?): Hub[]`.

The algorithm is the “why not just use in-degree” case from the design discussion. Pure in-degree answers “what’s been linked a lot in the past?” — static. PPR from a query seed answers “what’s most relevant to this query right now?” — dynamic. The two are different signals, and the hub that matters for *this* query is the one with both.

```typescript
const composite = pprScores
  ? (normIn + normPpr) / 2      // equal weight, both signals present
  : normIn;                     // 100% inDegree if no PPR run
```

Equal weight (50) when PPR is computed (i.e. when a query seed is provided); pure in-degree otherwise. The `isHub` classification uses a 70%-percentile threshold on the composite score — conservative enough to mark central pages without over-flagging moderately-linked nodes.

What was deliberately *not* shipped: clustering-coefficient-based hub *retirement* (Haveliwala clustering × out-degree threshold) was in the original design and was deferred to v1.24.0. The argument that did it was that retirement is only useful for tag inference, and tag inference is the v1.24.0+ work; shipping retirement without a consumer would have been code that wasn’t load-bearing.

### 2. Link Distinctiveness (Issues #157 / #175)

This is the consumer that surprises people. “Distinctiveness” asks: *are these `[[link]]`s in a hub page’s `## Related` section actually saying different things?*

[`src/core/hub-link-distinctiveness.ts`](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/hub-link-distinctiveness.ts) does this by checking, *for each pair* of related targets, how reachable each one is from the other through the graph. Two targets that mutually reach each other through short walks are redundant — they’re providing overlapping information about the hub. Two targets that don’t are providing distinct aspects.

```typescript
for (const t of relatedTargets) {
  let total = 0;
  for (const u of relatedTargets) {
    if (t === u) continue;
    const ppr = personalizedPageRank(graph, u, options);  // u as seed
    total += ppr.get(t) ?? 0;                              // t's visibility from u
  }
  const meanRedundancy = total / (relatedTargets.length - 1);
  redundancyByTarget.set(t, meanRedundancy);
}
const distinctiveness = 1 - redundancy / max(redundancy);
```

The cost is O(hubs × targets²) PPR runs at default 500 walks each. For a typical 5–10 hubs × 5–10 targets ≈ 250 PPR runs ≈ ~50ms in practice. That budget is fine because this runs during periodic background Lint, not at query time.

The output is a per-target `distinctivenessScore` in [0, 1] and a hub-level recommendation: `strip` (low mean distinctiveness → redundant), `review` (borderline), or `keep`. Lint surfaces this as a menu item so users can decide whether to actually strip redundant links. We don’t strip automatically — this is judgment about a user’s notes, and the user has the judgment.

### 3. Query-Time Retrieval (Discussion #235 Q3)

This is the consumer the user feels. The `ppr-cascade` module ([`src/core/ppr-cascade.ts`](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/ppr-cascade.ts)) is a three-arm cascade:

```
┌────────────────────────────────────────────────────────────────────┐
│                        pprCascade(query)                           │
└────────────────────────────────────────────────────────────────────┘
                                 │
       ┌─────────────────────────┼─────────────────────────────────┐
       │                         │                                 │
   Arm 1: lex              Arm 2: lex-seeded-ppr            Arm 3: graph-first-ppr
   (sparse vault,           (medium density,                 (mature graph:
   seed isolated,           or seed from LLM                  |V| ≥ 30, |E| ≥ 30,
   ||V| < 30                semantic selection)               |E|/|V| ≥ 1.0,
   ||E| < 30)                                                  largest component
                                                              > 50% of |V|)
                                                              │
                                                              ↓
                                                    PPR from explicit seed list
                                                    (LLM-selected when available,
                                                     else top lex result)
                                                    Merge: max(lexScore, pprScore)
                                                    Sort, topN=10.
```

The thresholds are *internal constants* (`30 / 30 / 1.0 / 50%`), not user-facing settings. The reasoning: tuning these is an engineering decision based on the cost curve, not a user preference. If your vault is too small, you don’t want a “switch to keyword mode” toggle — you want it to behave like the older, well-tested keyword mode without you having to notice.

The cascade returns a `PageMatch[]` with `arm: 'lex' | 'lex-seeded-ppr' | 'graph-first-ppr'` so the UI can be transparent. When the cascade picks Arm 3, the response includes a small “Powered by graph-first PPR” chip — making the cascade observable, not magic.

## What Monte Carlo PPR Cannot Do

Two things that aren’t fixed by the algorithm, and that you should know if you’re using a large vault.

**Newly added pages don’t get found.** A page you just created has zero incoming edges. The walker never starts on it (because no one else links to it). PPR can’t see what hasn’t been linked. The query-time escape hatch is: when a query has zero PPR results, fall back to lex (Arm 1) — which does see the page by summary text. But this means new content lives in the `lex` tail until something else links to it. The v1.24 design discussion has thread on *source-revision awareness* partly to address this.

**Cross-lingual queries have asymmetric coverage.** PPR walks the graph; the graph is whatever links you have. If you have three English pages about the same concept as two Chinese pages, and no cross-language links between them, the walker for an English query will visit only the English cluster. Embedding models would unify the two clusters via vector similarity — but we explicitly declined to ship embeddings by default. The lex arm mitigates this somewhat (CJK tokens match CJK page summaries regardless of graph), and multilingual alias rules in `schema/aliases.yaml` provide an offline normalization step. If you’re working across languages at the wiki level, set up cross-language aliases in the schema, and check the long tail of lex-only results, not the PPR top-10.

## Why Not Just Embeddings

This is the question @GioiaZheng pushed back on in Discussion #235, and it changed the framing of v1.23. PPR is not *equivalent* to embeddings; it’s a different signal with different coverage.

Embeddings see: text similarity across the full semantic space, independent of any structural relationship. They are good for cross-lingual, vocabulary-drift, and newly-added pages. They cost: a separate per-vault embedding index (~12 MB for 2,000 pages), versioning and migration on model change, an endpoint call at query time on every query, and a provider-specific endpoint that not every supported provider exposes.

PPR sees: what your `[[wiki-link]]` graph actually records. It is good for the linked, the related-as-asserted-by-the-LLM-at-ingest-time, and the connected. It costs: zero per-vault state beyond the existing wiki files, zero provider dependencies beyond the LLM calls you’re already making for ingestion, and ~500K floating-point ops at query time.

The architectural decision in v1.23 is: PPR is the *default* ranker for the cases the graph can see, and embeddings are an opt-in enrichment for the cases it can’t. That separation matters. Pretending the two are the same thing — as the original v1.23 design proposal did — is what @GioiaZheng caught and corrected in the thread.

Concretely: where we sit today, embeddings are wired into the cascade as a fall-through for cold-start queries where neither Arm 2 nor Arm 3 returns enough results. They’re not on the hot path. That can change in v1.24 or v1.25 — Discussion #246 has a thread on opt-in embedding enrichment — but the algorithm choice made here doesn’t depend on it.

## How It Actually Performs On Real Vaults

The numbers in the announcement post ([v1.23 — Link Graphs as a Search Index](/blog/v123-graph-engine-ai-sdk)) translate directly from the tuning run:

- **Top-5 recall (R@5): 21.5% → 23.8%** on the 2,142-page real-vault leave-one-out eval.
- **Top-10 recall (R@10): 37.2% → 39.6%**.
- **Comparison reference:** [bge-m3](https://huggingface.co/BAAI/bge-m3), a state-of-the-art embedding model, on the same vault. PPR is within sampling noise of bge-m3.
- **Cost:** ~500K floating-point operations per query.
- **Latency placement:** runs in a Web Worker, so the Obsidian UI never blocks.

The 99.9% single-connected-component property of the tuning vault matters more than the page count. PPR works when the graph is actually a graph — when most pages reach most other pages in a small number of hops. If your vault has a long tail of disconnected pages (multiple isolated notes, parallel projects that never cross-reference), the cascade gently drops those pages back into Arm 1 lex mode.

## What This Means For Users Building Bigger Vaults

Three practical things, drawn from the tuning and the cascade design:

1. **If your vault is under ~30 pages or has fewer than ~30 cross-page links, you’re in lex mode.** That’s fine. You’ll get keyword-match behavior. As you grow the vault and start cross-linking notes (which ingestion does for you automatically), the cascade will start lifting into graph-first mode. You don’t need to configure anything.
2. **If you build a 2,000+ page vault, the cost per query stays constant.** This is the property the algorithm was chosen for. Power-iteration PageRank would cost more every time you added pages; PPR doesn’t. There’s no per-vault-size “tuning tax” for users.
3. **If you build a vault with deeply-clustered domains that don’t cross-link to each other, you’ll get PPR-rankable clusters lexically unbridged to each other.** This is one of the cases where PPR *can’t* help — and it’s the v1.24 design space for source-revision awareness and embedding enrichment.

## What Lives Next To This Code

If you want to read the full internals of how this module fits with the rest of v1.23 — the AI-SDK v6 migration, the streaming rendering that makes Anthropic/OpenAI/Google/Ollama/LM Studio all paint incrementally, the multi-file ingest picker — read the [Modular Architecture](/blog/modular-architecture) and [Announcement: v1.23 — Link Graphs as a Search Index](/blog/v123-graph-engine-ai-sdk) posts.

If you want to follow the design discussion where the algorithm was chosen in public, [Discussion #235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235) is the thread. @DocTpoint and @GioiaZheng’s messages are the ones that shaped the architecture.

If you want to tune your own knobs — only recommended for power users contributing to the project — the methodology file is at [`src/__tests__/fixtures/wikis/sample-50page/REAL_VAULT_EVAL.md`](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/__tests__/fixtures/wikis/sample-50page/REAL_VAULT_EVAL.md), and eval scripts live at `/tmp/ppr-eval/` (not committed). The synthetic CC0 50-page fixture is committed in the same directory and is safe to use for replica evaluations.

---

**References**

- Brin, S. & Page, L. (1998). *The Anatomy of a Large-Scale Hypertextual Web Search Engine.*
- Haveliwala, T. (2002). *Topic-Sensitive PageRank: A Context-Sensitive Ranking Algorithm for Web Search.* [stanford.edu/~taherh/papers/topic-sensitive-pagerank.pdf](https://cs.stanford.edu/~taherh/papers/topic-sensitive-pagerank.pdf)
- Fogaras, D., Rácz, H., Csalogány, K. & Sarlós, T. (2005). *Towards Scaling Fully Personalized PageRank: Methods, Algorithms, and Lower Bounds.* [stanford.edu/tdang/papers/fogaras05ppr.pdf](https://www-cs.stanford.edu/tdang/papers/fogaras05ppr.pdf)
- Karpathy, A. (2026). *LLM Wiki.* [gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
- Discussion #235: *v1.23.0 Graph Engine* — [github.com/green-dalii/obsidian-llm-wiki/discussions/235](https://github.com/green-dalii/obsidian-llm-wiki/discussions/235)
- Module sources: [monte-carlo-ppr.ts](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/monte-carlo-ppr.ts), [hub-detection.ts](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/hub-detection.ts), [hub-link-distinctiveness.ts](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/hub-link-distinctiveness.ts), [ppr-cascade.ts](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/src/core/ppr-cascade.ts)
