---
title: "Taking Control With Schemas"
description: "The schema/ folder defines how LLM Wiki extracts knowledge — entity types, property schemas, alias rules, extraction templates."
date: 2026-05-24
tags: ["internals"]
series: "inside-the-system"
related: ["first-100-pages", "research-papers-workflow"]
---

## The Third Layer

Every Karpathy LLM Wiki has three directories at its root:

```
your-vault/
  sources/       ← Input: your notes, articles, research
  wiki/          ← Output: extracted entities, concepts, links
  schema/        ← Control: how extraction works
```

Most users spend their time in `sources/` and `wiki/`. They add content, run ingestion, and read the results. The `schema/` folder sits in the background, doing its job with sensible defaults.

But for power users, `schema/` is where the magic happens. It's the control panel for extraction — defining what kinds of entities exist, what properties they have, how names should be normalized, and what templates should generate the final pages.

Introduced in v1.3.0 and significantly expanded in v1.9.0, the schema layer transforms the plugin from a general-purpose knowledge extractor into a **domain-specific knowledge system** that understands your field's vocabulary, conventions, and relationships.

## Schema Folder Structure

The `schema/` folder contains five YAML files, each responsible for one aspect of extraction control:

```
schema/
  entities.yaml      ← Define entity types and their properties
  concepts.yaml      ← Define concept types and their properties
  aliases.yaml       ← Name normalization rules
  templates.yaml     ← Page generation templates (Handlebars)
  settings.yaml      ← Global extraction settings
```

Every file is optional. If a file is missing, the plugin uses built-in defaults. You can start with just `entities.yaml` and add the others as your needs grow.

## Entity Type Definitions

`entities.yaml` is the heart of the schema system. It defines what types of entities your Wiki recognizes and what properties each type should have.

Here's a minimal example:

```yaml
# schema/entities.yaml
entity_types:
  person:
    description: "A person with professional or research contributions"
    properties:
      name:
        type: string
        required: true
        description: "Full name"
      birth_year:
        type: integer
        required: false
      affiliation:
        type: string
        required: false
        description: "Current or primary institution"
      known_for:
        type: list<string>
        required: false
      h_index:
        type: integer
        required: false
        description: "Google Scholar h-index"
    entity_references:
      - affiliation  # Links to organization entities

  organization:
    description: "An institution, company, or research lab"
    properties:
      name:
        type: string
        required: true
      founded_year:
        type: integer
        required: false
      type:
        type: enum
        values: [university, research_lab, company, nonprofit]
        required: false
      headquarters:
        type: string
        required: false

  product:
    description: "A software product, model, or tool"
    properties:
      name:
        type: string
        required: true
      vendor:
        type: string
        required: true
        description: "Company or organization that created it"
      release_date:
        type: date
        required: false
      version:
        type: string
        required: false
      license:
        type: enum
        values: [MIT, Apache-2.0, GPL-3.0, Proprietary, BSD]
        required: false
    entity_references:
      - vendor  # Links to organization entities
```

Key concepts in entity type definitions:

- **`type`** — The property data type. Supported: `string`, `integer`, `float`, `date`, `boolean`, `enum`, `list<string>`, `list<integer>`, `url`.
- **`required`** — If true, the LLM is instructed to extract this property and the page won't be created without it. Use sparingly — requiring too many properties increases extraction failures.
- **`enum`** — Restricts values to a predefined set. The LLM maps extracted text to the closest enum value. This is critical for consistency — if every product has a `license` field with values from `[MIT, Apache-2.0, GPL-3.0, Proprietary, BSD]`, you can filter, sort, and cross-reference by license without worrying about variant spellings.
- **`entity_references`** — Marks a property as linking to another entity type. When extraction finds a value for `vendor`, it creates a `[[wiki-link]]` to the corresponding organization page (or creates one if it doesn't exist). This is how the graph grows automatically.

## Concept Type Definitions

Concepts are the abstract counterpart to entities. While entities represent specific things (a person, a company, a product), concepts represent ideas, methods, theories, and metrics.

`concepts.yaml` follows the same structure as `entities.yaml`:

```yaml
# schema/concepts.yaml
concept_types:
  method:
    description: "A research method, technique, or approach"
    properties:
      name:
        type: string
        required: true
      field:
        type: string
        required: false
      year_introduced:
        type: integer
        required: false
      known_applications:
        type: list<string>
        required: false

  theory:
    description: "A scientific theory or framework"
    properties:
      name:
        type: string
        required: true
      proponents:
        type: list<string>
        required: false
      year_proposed:
        type: integer
        required: false
      status:
        type: enum
        values: [widely_accepted, contested, historical, speculative]
        required: false

  metric:
    description: "A quantitative measurement or evaluation standard"
    properties:
      name:
        type: string
        required: true
      acronym:
        type: string
        required: false
      range:
        type: string
        required: false
        description: "e.g., 0-100, 0.0-1.0"
      typical_use:
        type: string
        required: false
```

The distinction between entities and concepts matters for how the plugin organizes your Wiki. Entities go into `wiki/entities/` and concepts into `wiki/concepts/`. This makes large Wikis navigable — you can browse all people without wading through all methods.

## Alias Normalization Rules

One of the most powerful features in v1.9.0 is the alias system. `aliases.yaml` defines how names should be normalized, expanded, and matched across sources.

```yaml
# schema/aliases.yaml
aliases:
  expansions:
    - pattern: "AI"
      expansions:
        - "Artificial Intelligence"
        - "artificial intelligence"
    - pattern: "ML"
      expansions:
        - "Machine Learning"
        - "machine learning"
    - pattern: "LLM"
      expansions:
        - "Large Language Model"
        - "large language model"
    - pattern: "NLP"
      expansions:
        - "Natural Language Processing"
        - "natural language processing"

  stripping:
    - pattern: "^(Dr\\.|Professor)\\s+"
    - pattern: "\\s+(PhD|MD|Esq\\.)$"
    - pattern: "[™©®]"

  cross_language:
    - canonical: "Transformer"
      variants:
        - "Transformer"
        - "Transformer模型"
        - "Transformer 模型"
        - "Transformateur"
    - canonical: "Deep Learning"
      variants:
        - "Deep Learning"
        - "深度学习"
        - "深層学習"
        - "Apprentissage profond"
```

**Expansions** ensure that "LLM" and "Large Language Model" are treated as the same entity. When the system encounters an acronym, it checks the expansions list and normalizes to the canonical form.

**Stripping** removes honorifics, suffixes, and special characters before matching. "Dr. Geoffrey Hinton" and "Geoffrey Hinton" become the same entity. "TensorFlow™" and "TensorFlow" match.

**Cross-language** matching maps translated names to a canonical form. This is essential for multi-language Wikis (see our [Eight Languages](/blog/eight-languages) post). Without it, a source in Chinese mentioning "Transformer模型" and a source in English mentioning "Transformer" would produce separate entity pages.

## Extraction Templates

`templates.yaml` uses Handlebars syntax to control how entity and concept pages are generated.

```yaml
# schema/templates.yaml
templates:
  entity_default: |
    # {{name}}

    > **Type:** {{entity_type}}

    {{#if description}}
    {{description}}
    {{/if}}

    ## Properties

    {{#each properties}}
    - **{{@key}}:** {{this}}
    {{/each}}

    ## Sources

    {{#each sources}}
    - [[{{this}}]]
    {{/each}}

    ---
    *Extracted on {{date}}*

  person: |
    # {{name}}

    {{#if properties.affiliation}}
    **Affiliation:** {{properties.affiliation}}
    {{/if}}
    {{#if properties.h_index}}
    **h-index:** {{properties.h_index}}
    {{/if}}

    {{#if description}}
    {{description}}
    {{/if}}

    ## Profile

    {{#each properties}}
    {{#unless @last}}
    - **{{@key}}:** {{this}}
    {{/unless}}
    {{/each}}

    ## Known For

    {{#if properties.known_for}}
    {{#each properties.known_for}}
    - {{this}}
    {{/each}}
    {{else}}
    *No specific contributions recorded yet.*
    {{/if}}

    ## Related Pages

    {{#each related_entities}}
    - [[{{this}}]]
    {{/each}}

    ## Sources

    {{#each sources}}
    - [[{{this}}]]
    {{/each}}
```

The template system types are:

- `entity_default` — Used for entity types without a specific template
- `concept_default` — Used for concept types without a specific template
- Named templates (e.g., `person`, `organization`) — Override the default for specific types

Within templates, you can use `{{#if}}`, `{{#each}}`, `{{#unless}}`, and conditional operators. The full Handlebars syntax is supported, including partials and helpers.

## Global Extraction Settings

`settings.yaml` controls how the extraction engine behaves:

```yaml
# schema/settings.yaml
settings:
  extraction:
    granularity: medium  # low, medium, high
    property_confidence: 0.7  # 0.0-1.0
    relation_types:
      - affiliation
      - collaboration
      - citation
      - derived_from
    max_entities_per_source: 50
    max_concepts_per_source: 30
    prefer_recent_sources: true

  quality:
    min_description_length: 50
    require_source_citation: true
    deduplicate_on_extraction: true
    cross_reference_on_extraction: false

  output:
    page_format: markdown
    include_frontmatter: true
    frontmatter_fields:
      - title
      - type
      - source
      - extracted
      - aliases
```

Key settings:

- **`granularity`** — `low` extracts only entity names and types. `medium` adds properties. `high` extracts sub-entities and nested relationships. Higher granularity means more tokens per source.
- **`property_confidence`** — The minimum confidence score (0.0-1.0) for a property to be included. At 0.7, the LLM must be reasonably certain. Lower values extract more properties but include more noise.
- **`relation_types`** — The relationships the system should track between entities. Each type generates bidirectional wiki-links.
- **`prefer_recent_sources`** — When true, newer source material takes priority over older material for the same entity (relevant to [Contradiction Detection](/blog/contradiction-detection)).
- **`deduplicate_on_extraction`** — Check for existing entities before creating new pages. When true, new extractions are merged into existing pages.
- **`cross_reference_on_extraction`** — When true, link newly extracted entities to existing entities immediately. This slows ingestion but produces richer initial graph structures.

## Domain-Specific Example: Academic Research Schema

Here's how a researcher might configure their schema for AI/ML literature:

**entities.yaml** excerpt:

```yaml
entity_types:
  author:
    properties:
      name: { type: string, required: true }
      h_index: { type: integer }
      institution: { type: string, entity_references: [institution] }
      google_scholar_id: { type: string }
      primary_field: { type: string }
      notable_papers: { type: list<string> }

  institution:
    properties:
      name: { type: string, required: true }
      ranking: { type: integer }
      country: { type: string }
      type: { type: enum, values: [university, corporate_lab, government, nonprofit] }

  paper:
    properties:
      title: { type: string, required: true }
      year: { type: integer, required: true }
      venue: { type: string }
      authors: { type: list<string>, entity_references: [author] }
      citation_count: { type: integer }
      arxiv_id: { type: string }
      status: { type: enum, values: [published, preprint, workshop, under_review] }
```

With this schema, a single source about a new paper extracts:
- The **paper** entity with year, venue, and citation count
- Each **author** (or links to existing author pages)
- Each author's **institution** (or links to existing institution pages)
- Bidirectional links between all three types

The result: after ingesting 50 papers, you have an automatically populated research directory with author profiles, institution pages, and a paper index — all linked without manual entry.

## Debugging and Validation

The Schema Validator (accessible via `Cmd+P` → "Validate Schema") checks for:

- Invalid YAML syntax (catches 90% of errors)
- Missing referenced types (e.g., `entity_references: [institution]` when `institution` isn't defined)
- Circular references between entity types
- Template syntax errors (invalid Handlebars)
- Deprecated property types

**Debug mode** (`Cmd+P` → "Toggle Schema Debug Mode") shows:

- Which schema rules matched each extraction
- Why certain properties were skipped (confidence below threshold, missing required field)
- Template rendering output before page creation
- Alias resolution decisions for each entity name

For troubleshooting, start with Validate Schema. If it passes, enable debug mode and run a single source ingestion to watch the extraction decision tree in real time.

## When to Use Schema (and When Not To)

**Use schema when:**
- Your domain has specific entity types not covered by defaults (e.g., "patent", "clinical_trial", "species")
- You need consistent property extraction (e.g., every paper must have a year and venue)
- You work with multiple languages and need name normalization
- You want custom page layouts per entity type
- You're building a large Wiki (1,000+ pages) where sorting and filtering by entity type is essential

**Skip schema when:**
- Your Wiki is under 100 pages — defaults work fine
- Your sources are all about one topic with similar structure
- You're still experimenting and don't know what properties you need yet
- You prefer to organize pages manually after extraction

The beauty of the schema system: you can start without it, add an `entities.yaml` when you outgrow the defaults, and incrementally add `aliases.yaml` and `templates.yaml` as your needs evolve. Each file is optional, and each builds on the defaults.

## Next: First 100 Pages

With a tuned schema, your extraction is precise and your entities are well-typed. Now it's time to put it all together.

[Getting Started (Four): Your First 100 Wiki Pages](/blog/first-100-pages) walks through the complete workflow — from an empty vault to a living, growing knowledge base with proper schema, aliases, and extraction templates.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
