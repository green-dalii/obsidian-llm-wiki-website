---
title: "From Papers to Knowledge"
description: "How to transform academic papers into a structured research wiki with cross-referenced entities, concepts, and theories."
date: 2026-05-28
tags: ["guides"]
series: "workflow-guides"
related: ["zotero-pdf-integration", "schema-layer-deep-dive"]
---

## The Problem: Knowledge Trapped Inside Individual Papers

When you read a research paper, you extract it from the PDF in your mind. You understand its contribution. You file it away mentally. Then you read the next paper, and the next. After 20 papers, the individual contributions blur together. You know you read something about attention mechanisms somewhere, but you can't remember which paper or how it connects to the others.

This is the fundamental failure mode of academic reading: **each paper is a self-contained unit of knowledge, but the value of research comes from the connections between papers.**

A paper about Flash Attention isn't useful in isolation. It's useful because you know the Transformer paper introduced attention, that scaling laws showed attention costs grow quadratically, that sparse attention was an earlier optimization, and that Flash Attention solves a specific bottleneck in that chain.

Those connections don't exist in any single PDF. They exist in the space between papers. And that's where LLM Wiki adds value.

## The Vision: A Research Knowledge Graph

Imagine a research Wiki where every element has its own page:

- **Authors** — Pages for each researcher, listing their papers, methods, and datasets
- **Methods** — Pages for each technique or algorithm, linked to papers that use and cite them
- **Datasets** — Pages for each benchmark or dataset, linked to evaluation results
- **Theories** — Pages for theoretical contributions, linked to supporting and contradicting papers
- **Concepts** — Pages for key ideas, with backlinks showing which papers reference them

Every page uses `[[wiki-links]]` to connect to every related page. Graph View shows clusters of related research. Query lets you ask "What do my papers say about attention mechanism efficiency?" and get an answer synthesized from every paper you've ever processed.

This is possible today with LLM Wiki. Here's how.

## Step 1: Prepare Your Paper Notes

The quality of the knowledge graph depends on the quality of your input. A PDF dump with no structure produces a sparse graph. A well-prepared note produces a dense, connected graph.

Create a note in `sources/` for each paper. Include these sections:

**Basic information:**
- Title and authors
- Publication venue and year
- DOI or URL for the full paper
- Research area (NLP, computer vision, reinforcement learning, etc.)

**Core contribution (2-3 sentences):**
What problem does this paper solve? What's the key insight? Be specific. "They propose a new attention mechanism" is too vague. "They show that causal masking in attention can be factored out of the softmax computation, reducing memory from quadratic to linear" is useful.

**Methodology (3-5 sentences):**
How does it work? High-level description. Include key equations or architectural choices if relevant. This section generates the most entity extractions.

**Key results:**
Quantitative results on specific benchmarks. Include datasets, metrics, and comparison baselines. These generate dataset and metric entities with links back to the paper.

**Limitations (1-2 sentences):**
What does the paper acknowledge as limitations? This is important for balanced queries later. When you ask "What are the trade-offs of method X?" the LLM draws from limitations sections.

**Personal observations (2-3 sentences):**
Set this apart with a heading like "My Notes." This is your original analysis — how this paper connects to others you've read, what questions it raises, or how you might apply it. The LLM includes personal observations in query responses, making your Wiki personal rather than just a collection of abstracts.

**Full example note:**

```markdown
---
source_type: research-paper
---

# Flash Attention: Fast and Memory-Efficient Exact Attention

**Authors:** Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré
**Venue:** NeurIPS 2022
**DOI:** 10.48550/arXiv.2205.14135
**Area:** Efficient Deep Learning

## Core Contribution
Shows that the standard attention computation (QK^T → softmax → PV) can be tiled over
the available SRAM on GPUs, reducing memory from quadratic O(N²) to linear O(N) without
approximation. Previous approaches used sparse attention or kernel fusion, but Flash
Attention is the first to achieve exact softmax computation with IO-aware tiling.

## Methodology
Uses three key ideas:
1. **Tiling** — Q, K, V matrices are split into blocks that fit in GPU SRAM
2. **Recomputation** — Attention matrix is recomputed during backward pass instead of stored
3. **Online softmax** — Softmax normalization is computed incrementally across blocks

## Key Results
- BERT training: 15% faster than PyTorch attention baseline
- GPT-2 training: 13% faster
- Memory: O(N) instead of O(N²), enabling 64K+ sequence lengths on a single GPU
- Tested on A100 GPUs with 40GB HBM and 192KB SRAM per 108 streaming multiprocessor

## Limitations
- Requires CUDA kernels; no pure PyTorch implementation
- Speedup depends on batch size and sequence length; less benefit for small sequences
- Current implementation is for training only; inference requires separate optimization

## My Notes
This connects directly to the Transformer paper and Sparse Attention survey I already
indexed. Flash Attention addresses the quadratic memory bottleneck of vanilla attention.
The tiling approach is similar to how matrix multiplication is optimized in cuBLAS.
```

## Step 2: Choose Granularity

Research papers benefit from different granularity levels depending on the paper type:

- **Fine** — Use for research papers. Every method, dataset, author, metric, and concept gets its own page. A single paper with Fine granularity can produce 15-25 pages.
- **Standard** — Use for survey papers or tutorial-style content. Broad overviews need fewer entity pages because the concepts are less specific. A survey may produce 8-12 pages.
- **Coarse** — Use for background reading or papers outside your main research area. You get 3-5 broader pages that capture the paper's main contribution without deep technical extraction.

**Recommended approach:** Fine for papers you'll cite or build on. Standard for papers you want to be aware of. Coarse for papers you read for general context.

## Step 3: Ingest and Review

Ingest the paper note by running **Ingest Sources**. The process takes 15-30 seconds per paper depending on length and granularity.

**Check the extraction report.** After ingest, review the report:
- Did it extract the correct authors? Author pages are created as entity pages.
- Did it capture the main method as a concept? The core method (e.g., "Flash Attention") should be a concept page.
- Did it identify datasets and benchmarks? These should be separate entity pages.
- Did it create links to related Wiki pages from previous papers?

**Browse the entity pages.** Open `wiki/entities/` and look for author pages. Tri Dao's page should list Flash Attention and any other paper you've indexed by him. This is the beginning of your author network.

**Browse the concept pages.** Open `wiki/concepts/` and check "Attention Mechanism." It should have backlinks from every paper you've indexed that discusses attention. The concept page grows richer with each paper.

**Run Lint.** Immediately after ingest, run **Lint Wiki** to check for any extraction issues. Common research-paper issues include:
- Duplicate author pages (same name with and without middle initial)
- Empty entity pages (rare but possible for obscure terms)
- Broken links (if a referenced paper hasn't been indexed yet, links to it appear dead until you index it)

## Step 4: Weave the Network

The real value emerges when you've indexed multiple papers on related topics. Each new paper strengthens the network.

**Example: Adding a second paper.**

You index "Attention Is All You Need" (the original Transformer paper). The LLM creates pages for:
- Transformer architecture
- Scaled dot-product attention
- Multi-head attention
- Encoder-decoder architecture
- Vaswani et al. (author entity)

You then index Flash Attention. The LLM creates new pages for the Flash-specific methods and concepts. But it also:

1. Links "Flash Attention" to "Attention Mechanism" (existing concept)
2. Links "Tri Dao" to "Transformer" (because Flash Attention builds on the Transformer's attention)
3. Adds "O(N²) memory bottleneck" as a new concept, linked to both papers
4. Updates the "Scaled dot-product attention" page with a mention of Flash Attention's optimization

The network grows denser without manual intervention. Each new paper creates more cross-links than the previous one, because there's more existing content to connect to.

## Step 5: Query Your Research

Once you have 5+ papers indexed, the Query interface becomes a research tool.

**Examples of research-specific queries:**
- "What methods have been proposed to optimize attention mechanism efficiency?"
- "Which papers in my Wiki benchmark on the GLUE dataset?"
- "What are the limitations of current attention optimization approaches, according to my indexed papers?"
- "Compare the memory requirements of standard attention vs. Flash Attention based on my notes."
- "Which authors appear in multiple papers I've indexed?"

These queries work because the LLM has a unified body of knowledge — all your indexed papers as interconnected pages — rather than separate PDF files in a folder.

## Practical Example: 3 Papers About Attention Mechanisms

You index three papers about attention mechanisms with the following notes:

**Paper 1: "Attention Is All You Need"** — Introduces the Transformer architecture. Fine granularity.

**Paper 2: "Flash Attention"** — Memory-efficient exact attention. Fine granularity.

**Paper 3: "Efficient Transformers: A Survey"** — Overview of efficient attention methods. Standard granularity.

After all three are ingested, your Wiki contains approximately 50 pages: 15-20 from each paper. The entity pages include:
- 6 author pages (Vaswani, Tri Dao, etc.)
- 10 method pages (Scaled dot-product attention, Multi-head attention, Tiling, Recomputation, etc.)
- 5 dataset pages (WMT 2014, GLUE, etc.)
- 15 concept pages (Attention Mechanism, Sequence-to-Sequence, IO-aware, etc.)

The Graph View shows one connected cluster, not three separate ones. The Flash Attention page links to the Transformer page. The Survey page links to both. The "Efficient Attention" concept page has backlinks from all three papers.

Querying "What are the different approaches to efficient attention mentioned in my papers?" returns a synthesis covering sparse attention (from the survey), Flash Attention's tiling (from the Flash paper), and the original Transformer attention as the baseline (from the Transformer paper). The answer draws from all three sources because they're all linked in your Wiki.

## Next Steps

You now have a research paper workflow: prepare structured notes, choose appropriate granularity, ingest and review, build the network across papers, and query across your entire research collection.

Next up: [**Workflow Guide (Five): Canvas + LLM Wiki**](/blog/posts/canvas-llm-wiki) — map your Wiki pages onto Obsidian Canvas for spatial knowledge layouts.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
