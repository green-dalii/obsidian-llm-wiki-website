---
title: "Connect Zotero to Your Wiki"
description: "From Zotero to Obsidian to LLM Wiki — a complete automation chain for academic literature. Export formats, note optimization, and research Wiki value."
date: 2026-05-30
tags: ["Zotero", "academic", "workflow"]
series: "workflow-guides"
related: ["research-papers-workflow", "schema-layer-deep-dive"]
---

## The Academic Knowledge Gap

If you're in academia, you already know this workflow: find paper, read paper, annotate PDF in Zotero, file it away, forget about it until you need to cite it.

The annotations are trapped. They sit inside the PDF inside Zotero's database. You can open the PDF and read your highlights, but you can't search them alongside your other notes. You can't cross-reference them with concepts from other papers. You can't query across your entire Zotero library from within Obsidian.

LLM Wiki bridges this gap. The pipeline is:

1. Annotate PDF in Zotero (your normal workflow, unchanged)
2. Export annotations to Obsidian using Zotero Integration plugin
3. LLM Wiki ingests the exported note from `sources/`
4. Entity pages, concept pages, and bidirectional links are created
5. Your annotated paper is now a connected part of your research Wiki

The key: you don't change how you read papers. You add one export step (2-3 seconds), and LLM Wiki handles the rest.

## Two Export Methods

**Method 1: Zotero Integration plugin (recommended).**

The [Obsidian Zotero Integration](https://github.com/mgmeyers/obsidian-zotero-integration) community plugin exports Zotero items to Obsidian notes. It supports:
- Custom templates for note format
- Automatic field mapping (title, authors, date, DOI, abstract)
- Selective export of annotations (highlights, notes, tags)
- One-click export from within Obsidian

This is the recommended method because it integrates directly with Obsidian's command palette and supports template customization.

**Method 2: Better BibTeX + manual export.**

If you prefer a Zotero-native workflow, use the Better BibTeX plugin to generate formatted citations, then manually copy annotations. This gives you full control over the export format but requires manual steps. Only use this if Zotero Integration conflicts with other plugins.

## Recommended Zotero Integration Template

The template determines what LLM Wiki receives. A well-structured template produces rich entity extraction. A sparse template produces a sparse Wiki.

Create a new note template in Zotero Integration settings with this format:

```markdown
---
source_type: zotero-export
---

# {{title}}

**Authors:** {{authors}}
**Date:** {{date}}
**Venue:** {{publicationTitle}}
**DOI:** {{DOI}}
**URL:** {{url}}
**Cite key:** {{citekey}}

## Abstract

{{abstractNote}}

## Notes

{{hypothesisAnnotations}}

## Annotations

{% for annotation in annotations -%}
{%- if annotation.annotatedText -%}
> {{annotation.annotatedText}}
{%- if annotation.annotationComment -%}
> — *{{annotation.annotationComment}}*
{% endif %}

{%- endif -%}
{%- endfor %}
```

This template does four things:

1. **Structured metadata in frontmatter** — Title, authors, date, venue, DOI, URL, and cite key are all captured as structured fields. LLM Wiki reads the entire note as content, but structured frontmatter helps the LLM identify entities like author names and publication venues.

2. **Full abstract** — The `{{abstractNote}}` field injects the paper abstract. This is the single most valuable text for entity extraction. Abstracts contain the paper's key contributions, methods, and results in condensed form.

3. **Hypothesis annotations** — If you use Hypothesis for web annotation, those highlights appear in the Notes section. For Zotero-native annotations, remove this line or replace it with your preferred annotation source.

4. **Annotation blocks with context** — Each annotation is rendered as a blockquote with the highlighted text, followed by any notes you added. The context field (annotation comment) is rendered as an italic note beneath the quote. This preserves the distinction between what the author wrote and what you thought about it.

## Note Format Optimization for LLM Extraction

The template provides a good baseline. These optimizations improve extraction quality further.

**Include full abstracts.** Never truncate the abstract. Even if it's 300 words, include the full text. Key technical terms often appear only in the abstract. If you truncate, the LLM may miss entities that distinguish this paper from others. If a paper has no abstract, add a 2-3 sentence summary yourself.

**Preserve annotations with context.** Single-word highlights ("Transformer") produce poor entity extraction. Highlighted phrases with surrounding context ("Transformer architecture achieves state-of-the-art results on machine translation") are much better. When annotating in Zotero, highlight 5-15 word spans rather than 1-2 word snippets. The LLM needs context to understand what each annotation refers to.

**Add structured metadata.** The template already includes basic metadata. For better extraction, add these optional fields to your Zotero items:
- **Tags** — Add conceptual tags in Zotero (e.g., "attention-mechanism," "efficiency," "transformer"). These become tags on the exported note, which LLM Wiki processes.
- **Extra field** — Zotero's "Extra" field supports custom key-value pairs. Adding `research-area: NLP` or `method-type: attention-optimization` gives the LLM additional category signals.

**Separate highlights from notes.** The template distinguishes annotations (highlighted text) from annotation comments (your notes). This separation matters because the LLM should treat highlighted text as the paper's content and comments as your analysis. If they're mixed, the LLM may attribute your opinions to the paper's authors.

**Limit note length.** Extremely long annotations (50+ highlights on a single paper) can exceed context windows or produce diffuse extraction. Focus on the most important highlights. Quality over quantity applies here. 15-20 well-chosen annotations per paper produce better results than 50 scattered highlights.

## Extraction Results

When you export a paper annotation and run Ingest Sources, these pages are typically created:

**Entity pages:**
- Each author gets an entity page with links to all exported papers by that author
- Datasets mentioned in the abstract or annotations get dataset entity pages
- Tools, libraries, and frameworks mentioned get tool entity pages

**Concept pages:**
- The paper's core method or architecture becomes a concept page
- Related theoretical concepts get concept pages
- Evaluation metrics get concept pages

**Source page:**
- The paper note itself becomes a source page in `wiki/sources/`
- This page contains the full note text and links to all extracted entities and concepts

**Example: "Attention Is All You Need."**

You export your annotated PDF of the Transformer paper. The note contains the abstract, 12 annotations with comments, and structured metadata.

After ingestion, your Wiki gains approximately 20 pages:
- Entity pages for Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, and Polosukhin (8 author entities)
- Concept pages for Scaled Dot-Product Attention, Multi-Head Attention, Positional Encoding, Transformer Architecture (4 concept entities)
- Dataset pages for WMT 2014 English-to-German and WMT 2014 English-to-French (2 dataset entities)
- Metric pages for BLEU score (1 metric entity)
- The source page for the paper note

These 20 pages are linked to each other and, critically, to any existing Wiki content. If you already have a "Neural Machine Translation" concept page, the Transformer paper's source page links to it automatically. The bidirectional links connect your new paper to everything you've already indexed.

## Unique Value of an Academic Wiki

A research knowledge graph powered by LLM Wiki provides capabilities that Zotero alone cannot.

**Author networks.** Open an author entity page. See every paper by that author that you've indexed. Follow the `[[wiki-links]]` to see co-authors, methods they've developed, and datasets they've used. Over time, this creates a personal research network that reveals collaboration patterns.

**Concept genealogy.** Query "How has the concept of attention evolved in my indexed papers?" The LLM traces attention from Bahdanau attention through Luong attention, to Transformer self-attention, to Flash Attention's memory optimization. The answer is a genealogy that doesn't exist in any single paper — it emerges from the connections between them.

**Method comparison.** "Compare the efficiency claims of Flash Attention and Efficient Attention based on my indexed papers." The LLM reads the relevant concept and source pages and returns a structured comparison. Without LLM Wiki, you'd need to open both PDFs and manually cross-reference.

**Cross-domain discovery.** Your Zotero library has papers on NLP, computer vision, and reinforcement learning. Most citation managers keep these siloed by folder. LLM Wiki links across domains because it extracts entities regardless of folder. A method from a vision paper ("non-local neural networks") might get linked to an NLP concept ("self-attention") because the LLM recognizes the similarity — even if you never made the connection.

## Integration with Research Papers Workflow

The Zotero workflow integrates directly with the [Research Papers Workflow](/blog/posts/research-papers-workflow). Here's the combined sequence:

1. **Read and annotate in Zotero** — Your normal reading workflow. No changes needed.
2. **Export to Obsidian** — Click "Zotero Integration" → "Create Literature Note." The note lands in `sources/`.
3. **Enhance with personal notes** — Add your own observations (2-4 sentences) at the bottom of the exported note. This personal context distinguishes your Wiki from a generic paper index.
4. **Ingest Sources** — Run the ingest command. The plugin processes all exported notes.
5. **Review the extraction** — Check the ingestion report. Did it capture the main contribution as a concept page? Are all authors extracted as entities?
6. **Explore connections** — Open the Graph View. See how the new paper connects to existing papers and concepts.
7. **Query across your library** — Ask questions that span multiple papers.

## Configuration for Academic Use

These settings optimize LLM Wiki for research paper processing:

- **Granularity: Fine** — Academic text is dense with entities. Fine granularity ensures every author, method, dataset, and metric gets its own page. The additional page count is worth it for research work.
- **Source folder: `sources/`** — Keep Zotero exports in the same folder as other sources for unified ingestion.
- **Types list in schema/ (if using Schema Layer):** Add "research-paper," "author," "dataset," "method" as recognized types. This helps the LLM categorize extracted entities more accurately.
- **Periodic Lint: Weekly** — Run Lint once per week to catch duplicate author pages (same name with and without middle initials) and dead links to papers you may have removed. Set this up as a recurring task.

## Limitations

Five things to be aware of when using Zotero with LLM Wiki.

**Annotations must be exported.** The plugin does not read Zotero's database directly. It reads the notes that Zotero Integration exports. If you don't export, the annotations stay in Zotero. Build the export into your reading routine.

**PDF is not directly read.** The plugin processes the exported note text, not the PDF itself. If your annotations are minimal, the extraction will be sparse. The quality of the Wiki depends on the quality of your annotations and the completeness of the abstract.

**Citation updates require re-export.** If you add annotations to a paper in Zotero after the initial export, the new annotations won't appear in your Wiki until you re-export and re-ingest. The ingestion is idempotent — re-ingesting updates existing pages rather than creating duplicates — but it requires manual action.

**Author name disambiguation.** The LLM does its best, but variations in author names (e.g., "Tri Dao" vs. "Tri T. Dao" vs. "T. Dao") can sometimes create multiple entity pages for the same person. Run Lint periodically and merge duplicates using Smart Fix All.

**Large libraries take time.** Exporting and ingesting 100 papers is not a one-day task. Process 3-5 papers per day and let the Wiki grow naturally. The connections emerge more meaningfully when you review each paper's extraction as you go.

## Next Steps

You now have a complete Zotero-to-Wiki pipeline: annotate in Zotero, export via Zotero Integration, ingest into LLM Wiki, and explore the resulting knowledge graph. Your research papers are no longer isolated PDFs — they're connected nodes in a growing academic knowledge base.

This concludes the **Workflow Guide** series. You now have six complete workflows: Query-to-Wiki feedback, the Daily Knowledge Loop, Web Clipper integration, Research Papers processing, Canvas visualization, and Zotero/PDF export. Combine them in whatever order fits your needs.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
