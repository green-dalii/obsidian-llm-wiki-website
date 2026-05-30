---
title: "Map Your Wiki on Canvas"
description: "Map your Wiki pages onto Obsidian Canvas to create spatial knowledge layouts. How Canvas reveals structure the Graph View can't show."
date: 2026-05-29
tags: ["Canvas", "visualization", "workflow"]
series: "workflow-guides"
related: ["daily-knowledge-loop", "query-to-wiki-feedback"]
---

## Graph View's Limitations

The Obsidian Graph View is essential. It shows every note as a node and every link as an edge. You can spot clusters, find orphans, and watch your knowledge graph grow. It's the best tool for getting a quick sense of your Wiki's shape.

But Graph View has hard limits:

- **No spatial positioning.** Nodes are positioned by a force-directed layout. You can't drag "Attention Mechanism" to the top of the screen and "GPU Optimization" to the bottom to reflect a conceptual hierarchy. Every time you open the graph, nodes rearrange.

- **No causal flows.** Graph View shows that A connects to B. It doesn't show whether A causes B, references B, contradicts B, or builds on B. All edges are identical.

- **No groupings by type.** Entity pages, concept pages, and source pages all look the same. You can't visually distinguish "this is a person" from "this is a methodology" at a glance.

- **No layout intent.** The graph layout is algorithmic, not intentional. You can't say "these five papers form the foundation of this topic, and these three are applications built on top."

Canvas solves all of these. And when combined with LLM Wiki, it becomes a spatial knowledge map that Graph View can't replicate.

## Why Wiki + Canvas Is Powerful

LLM Wiki generates structure. Canvas makes that structure visible and manipulable.

When you ingest a source, the plugin creates entity pages, concept pages, and bidirectional links. The structure exists in the file system and in the Graph View. But it's implicit — you have to explore to find it.

Canvas takes that implicit structure and makes it explicit. You drag wiki pages onto a Canvas, position them where you want, draw lines to show relationships, add annotations, and create groups. The Canvas becomes a curated view of your Wiki's knowledge.

The key insight: **the LLM generates the content. You design the layout.** The division of labor respects what each side does best. The LLM handles extraction and connection. You handle organization and narrative.

## Three-Step Mapping Workflow

**Step 1: Export the page list.** Identify the core pages in your Wiki related to a topic. Use Obsidian's search with a tag or keyword to find all relevant entity and concept pages. You can also use the Query interface: "List all the concept pages in my Wiki related to transformer architectures." Copy the result into a temporary note.

**Step 2: Create a Canvas file.** In Obsidian, create a new Canvas using `Cmd+P` → "Create new Canvas." Name it after the topic: "Transformer Architecture Knowledge Map," "Attention Mechanism Research Landscape," or whatever matches your domain. The Canvas file is a JSON file stored alongside your notes. It survives restarts, syncs via Obsidian Sync or Git, and can be shared.

**Step 3: Position and connect.** Drag wiki pages from the file explorer onto the Canvas. One by one, place them where they make conceptual sense:

- **Foundational concepts** go at the bottom or left
- **Applied methods** go at the top or right
- **Derived techniques** go in between
- **Related sub-topics** cluster together in regions

Draw arrows between cards to show directional relationships — "builds on," "influences," "contradicts," "extends." These arrows carry meaning that Graph View edges don't.

## Concrete Example: DeepSeek Research Project

You've been researching DeepSeek models. Your Wiki has these pages from several ingested articles and papers:

- DeepSeek (company entity)
- Mixture of Experts (concept)
- Multi-head Latent Attention (concept)
- DeepSeekMoE Architecture (concept)
- DeepSeek V2 (model entity)
- DeepSeek V3 (model entity)
- DeepSeek R1 (model entity)
- Reinforcement Learning from Human Feedback (concept)
- Inference Optimization (concept)
- Caching Strategies (concept)
- Model Distillation (concept)

Graph View shows 11 nodes with edges between them. It's accurate. It's also crowded.

On Canvas, you arrange them like this:

```
Top row:              DeepSeek V2    DeepSeek V3    DeepSeek R1
                      (models)       (models)       (models)

Middle row:           MoE ──────→ Multi-head Latent Attention ──────→ Inference Optimization
                      (architecture)     (innovation)                 (application)

Bottom row:           RLHF ───→ Distillation ───→ Caching
                      (training)     (compression)   (deployment)
```

The spatial layout reveals the structure instantly:

- **Type grouping** — Models are in one row. Architecture concepts are in another. Training methods are in a third. The type of each page is clear from its position, not from reading its content.

- **Causality flow** — Arrows show directional relationships. "Multi-head Latent Attention" points to "Inference Optimization" because the innovation enables the optimization. "RLHF" points to "Distillation" because RLHF produces the model that gets distilled. The flow moves from left to right, top to bottom.

- **Centrality** — "Multi-head Latent Attention" sits in the center of the Canvas with the most connections. One glance tells you this is the key innovation in the DeepSeek line of work. Graph View would show it as a node with many edges, but Canvas makes the centrality visually obvious through positioning.

## Advanced Canvas Tips

**Use groups for subtopics.** Select related cards and press `Cmd+G` to create a group. Groups have colored borders and labels. Use one color per research theme: blue for architectures, green for training methods, orange for deployment. Color coding makes scanning faster.

**Add annotations.** Canvas supports text-only cards. Add notes that the LLM wouldn't write — your own opinions, questions, and future research directions. "I think this method would work well for long-context retrieval tasks. Need to test." These annotations are personal context that makes the Canvas uniquely yours.

**Embed images.** Drag screenshots, architecture diagrams from papers, or charts into the Canvas. Visual artifacts supplement the text pages. A diagram of the DeepSeekMoE architecture sits next to the text description, making both more useful.

**Layer multiple maps.** Create separate Canvases for different research areas. A "Transformer Optimization" Canvas maps attention methods. A "Deployment" Canvas maps inference infrastructure. They reference overlapping pages but show different relationships. Each Canvas tells a different story about the same underlying knowledge.

**Link Canvas to Wiki.** Inside a Canvas card, you can include `[[wiki-links]]` in the card's text content. Clicking a link opens that wiki page. This bridges the spatial layout and the file-based knowledge graph. You can also add links from wiki pages back to the Canvas file.

## When to Use Canvas vs. Graph View

| Aspect | Graph View | Canvas |
|--------|-----------|--------|
| Best for | Quick overview, finding orphans, spotting clusters | Deep understanding, presenting structure, planning |
| Layout | Algorithmic, changes on reopen | Manual, persistent, intentional |
| Relationships | Undirected edges | Directed arrows with labels |
| Grouping | By color (local graph) only | By spatial position and group nodes |
| Annotations | None | Text cards, images, links |
| Maintenance | Automatic (updates with Wiki) | Manual (requires curation) |
| Scale | Works at any size | Best for 10-50 nodes |
| Time investment | Zero (it just renders) | 15-30 minutes per Canvas |

**Use Graph View** when you want a quick check: What new pages were added? Are there orphans? How dense is the connection graph?

**Use Canvas** when you want to understand a topic: How do these concepts relate causally? What's the hierarchy? What's central vs. peripheral?

Both are necessary. Graph View is the radar. Canvas is the map.

## Relation to Query-to-Wiki

Canvas and the Query-to-Wiki feedback loop work together.

1. You query your Wiki about a topic. The LLM returns a synthesis.
2. You save the synthesis as a new Wiki page (Save to Wiki).
3. You add that new page to an existing Canvas, positioning it where it fits in the conceptual hierarchy.
4. The Canvas now reflects the new knowledge organization, and the underlying Wiki has the new page indexed for future queries.

The Canvas captures the spatial organization that the LLM can't express. The LLM captures the connections that the Canvas would miss. Together, they're more powerful than either alone.

## Next Steps

You now understand how Canvas reveals structure that Graph View can't show, how to map Wiki pages onto Canvas with type grouping and causality flow, and when to use each visualization tool.

Next up: [**Workflow Guide (Six): Zotero/PDF Integration**](/blog/posts/zotero-pdf-integration) — from Zotero to Obsidian to LLM Wiki, a complete automation chain for academic literature.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
