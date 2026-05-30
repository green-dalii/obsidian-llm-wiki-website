---
title: "When Your Sources Disagree"
description: "Knowledge from multiple sources sometimes conflicts. How the plugin detects contradictions and strategies for resolution."
date: 2026-05-23
tags: ["quality", "contradiction", "maintenance"]
series: "inside-the-system"
related: ["smart-fix-all", "schema-layer-deep-dive"]
---

## When Sources Disagree

When DeepSeek released V2 in May 2024, half the internet said it had 236 billion parameters. The other half said it was a Mixture-of-Experts model where each token only activated 21 billion. Both were correct — but only if you understood the architecture. A naive extraction would record two conflicting parameter counts and leave you wondering which one was right.

This is the contradiction problem. When your Wiki ingests multiple sources about the same entity, they won't always agree. Dates shift. Numbers differ. Characterizations conflict. Without a system to catch and resolve these conflicts, your knowledge base becomes a repository of uncertainty — internally inconsistent and gradually less trustworthy.

Contradiction Detection (introduced in v1.8.0) is the plugin's answer to this problem. It finds conflicts automatically, reports them clearly, and gives you three paths to resolution.

## Three Types of Contradictions

Not all contradictions are the same. The detection system classifies them into three categories, each with its own detection method and resolution approach.

### 1. Time Conflicts

The same event recorded with different dates is the most common contradiction. It often arises when sources disagree about when something happened, or when a source rounds a date differently.

**Example:**

| Entity | Property | Source A | Source B |
|--------|----------|----------|----------|
| GPT-4 | release_date | 2023-03-14 | March 2023 |
| Llama 2 | release_date | 2023-07-18 | Summer 2023 |

The first conflict is minor — both sources agree it was March 2023. The second is more significant: "July 18" and "Summer 2023" could differ by weeks.

**Detection method:** The system extracts all date values for a given property across sources, normalizes them to a standard format (ISO 8601), and flags any pair with a difference exceeding a configurable threshold (default: 30 days for month-level precision, 1 day for day-level precision).

### 2. Value Conflicts

Two sources provide different numerical values for the same measurement.

**Example:**

| Entity | Property | Source A | Source B |
|--------|----------|----------|----------|
| Gemini 1.5 Pro | context_window | 1,000,000 tokens | 2,000,000 tokens |
| Mistral 7B | parameters | 7.3B | 7B |

The Gemini conflict looks like a genuine discrepancy — one million versus two million. The Mistral conflict is likely a rounding difference: 7.3B rounded to 7B by one source.

**Detection method:** The system compares numerical values with configurable tolerance. For parameters and counts, the default tolerance is 10%. For percentages and rates, it's 2 percentage points. Conflicts below the tolerance threshold are logged but not flagged — they're treated as acceptable rounding.

### 3. Qualitative Conflicts

The hardest category: two sources describe the same entity differently in ways that can't be reduced to numbers or dates.

**Example:**

| Entity | Property | Source A | Source B |
|--------|----------|----------|----------|
| Claude 3 Opus | architecture | Novel transformer variant | Standard decoder-only transformer |
| RAG | effectiveness | State-of-the-art for knowledge tasks | Limited by retrieval quality |

These contradictions require semantic understanding. Was Claude 3 Opus architecturally novel or standard? Is RAG state-of-the-art or limited?

**Detection method:** Two-stage. First, the **deterministic matcher** checks for contradictory keywords ("novel" vs "standard", "state-of-the-art" vs "limited", "breakthrough" vs "incremental"). Second, the **LLM-assisted comparator** (optional, requires API call) evaluates the semantic relationship between two textual descriptions and flags them if they express opposing claims.

The LLM-assisted step is the only part of contradiction detection that uses tokens. It's triggered only when the deterministic matcher finds a potential conflict, and it's rate-limited to prevent surprise API costs.

## How Detection Works

Contradiction Detection operates as a **two-pass pipeline** to balance speed and accuracy.

### Pass 1: Cross-Reference Analysis (Deterministic, Zero LLM Cost)

This pass runs during Periodic Lint (see [Auto-Maintenance Systems](/blog/auto-maintenance)) and during manual "Check Contradictions" command execution. It:

1. Groups all entity pages by their canonical name (using alias resolution)
2. For each property present on multiple pages, extracts the values
3. Applies type-specific comparison logic (date tolerance, numerical tolerance, keyword matching)
4. Produces a preliminary contradiction report

This pass takes roughly 2-4 seconds for a 1,000-page Wiki. It never makes an API call and never costs tokens.

### Pass 2: LLM-Assisted Semantic Comparison (Optional, Token Cost)

For qualitative conflicts identified in Pass 1, the system can optionally call the LLM to:

1. Paraphrase both descriptions to confirm they're about the same aspect
2. Classify the relationship: confirming, contradicting, or orthogonal (about different aspects)
3. Provide a confidence score (low/medium/high)
4. Suggest resolution text that reconciles both sources

This pass is configurable:

```yaml
contradiction_detection:
  llm_assisted:
    enabled: true
    max_qualitative_checks: 10
    model: auto  # Uses your default extraction model
    confidence_threshold: medium
```

The `max_qualitative_checks` cap prevents runaway costs. Each check uses approximately 500-1,000 tokens. With the default cap of 10, the maximum cost is roughly 10,000 tokens — about $0.01-0.03 depending on your provider.

## The Contradiction Report

When contradictions are found, the system generates a report organized by entity. Here's what it looks like:

```
Contradiction Report — 2026-06-01
===================================

Entity: GPT-4
  1. release_date: "2023-03-14" vs "March 14, 2023"
     Status: MINOR (same day, different format)
     Resolution: Auto-merged to 2023-03-14

Entity: Gemini 1.5 Pro
  1. context_window: "1,000,000" vs "2,000,000"
     Sources: paper-v3.md vs blog-post.md
     Status: CONFLICT
     Suggested action: Investigate original sources; one may reference
     standard context window while another includes extended context

Entity: Claude 3 Opus
  1. architecture: "Novel transformer variant" vs "Standard decoder-only"
     Sources: tech-review.md vs architecture-notes.md
     Status: QUALITATIVE_CONFLICT
     Confidence: HIGH
     Suggested action: Review both sources and determine which
     characterization is more accurate, or note that the architecture
     is a novel variant of the standard decoder-only design
```

The report is written to `wiki/log.md` and displayed in the plugin's contradiction viewer. Each conflict is tagged with its severity (MINOR, CONFLICT, QUALITATIVE_CONFLICT) and a suggested action.

## Three Resolution Strategies

When you find a contradiction, you have three paths forward.

### Strategy 1: Manual Correction

The most reliable approach. Open the source notes, investigate which source is more authoritative, and edit the wiki page directly.

**When to use:** When the contradiction involves specific facts you can verify (dates, numbers, named events). When one source is clearly more reliable than the other.

**How:** Open the entity page in `wiki/entities/`, find the conflicting property, and update the value. The next contradiction scan will confirm the conflict is resolved.

### Strategy 2: LLM-Assisted Resolution

Let the plugin propose a resolution based on the available information.

**How it works:**

1. Run Command → "Resolve Contradiction" on a specific entity
2. The plugin sends the conflicting values and source excerpts to the LLM
3. The LLM returns a proposed resolution with reasoning
4. You review the proposal and accept, reject, or modify it

**When to use:** When you don't have time to investigate manually or when the conflict involves qualitative descriptions that require synthesis rather than fact-checking.

**Limitations:** The LLM can't access external sources — it only knows what's in your Wiki. If both sources in your Wiki are wrong, the LLM won't tell you. This is a tool for reconciliation, not fact-checking.

### Strategy 3: Flagged Preservation

Sometimes you can't resolve a contradiction because you don't have enough information. Instead of guessing, you can flag the contradiction for future investigation.

**How:** The contradiction remains in the report with a "WONT_FIX" status. It won't be re-flagged on subsequent scans unless new conflicting data appears.

**When to use:** When neither source is clearly authoritative. When the contradiction is minor and doesn't affect your usage. When you plan to investigate later and don't want the notification to keep popping up.

## Best Practices to Reduce Contradictions

Prevention is better than resolution. These practices reduce the chance of contradictions forming in the first place.

**1. Source order matters.** Configure your sources in priority order. When the deterministic matcher finds conflicting values and one source is higher priority, it uses that value and logs the conflict as NOTE rather than CONFLICT.

```yaml
sources:
  - path: papers/
    priority: 10
  - path: blog_posts/
    priority: 5
  - path: notes/
    priority: 1
```

**2. Standardize entity names.** Contradiction detection relies on matching entities across sources. If the same person is "Geoffrey Hinton" in one source and "G. Hinton" in another, the system might not connect them. Use the [Schema Layer's alias system](/blog/schema-layer-deep-dive) to define name variants.

**3. Annotate source type.** Tag each source with its type (research paper, blog post, documentation, personal note). Contradiction reports include source types, making it easier to judge which source to trust.

**4. Review ingestion logs.** After each ingestion batch, scan `wiki/log.md` for warnings about overlapping entities. Early detection means fewer contradictions to resolve later.

**5. Set tolerance levels.** Adjust numerical and date tolerances to match your domain. A historical wiki about ancient Rome needs wider date tolerances than a software documentation wiki about API versions.

```yaml
contradiction_detection:
  tolerance:
    date_days: 30
    numerical_percent: 10
    percentage_points: 2
```

## Configuration Options

The full configuration surface:

```yaml
contradiction_detection:
  enabled: true
  run_on_lint: true
  tolerance:
    date_days: 30
    numerical_percent: 10
    percentage_points: 2
  llm_assisted:
    enabled: true
    max_qualitative_checks: 10
    model: auto
    confidence_threshold: medium
  reporting:
    max_contradictions_per_entity: 5
    include_resolved: false
    log_to_file: true
```

## Relation to Smart Fix All

Smart Fix All (introduced in v1.7.11) handles **structural** issues — duplicates, dead links, orphans, empty pages. Contradiction Detection (v1.8.0) handles **content** issues — conflicting information between sources.

They're complementary. Smart Fix All makes sure your Wiki is well-formed. Contradiction Detection makes sure your Wiki is internally consistent. Run Smart Fix All first to clean up structure, then run Contradiction Detection to audit content quality.

The two systems share a common architecture: both run as lint checks, both produce actionable reports, and both can be triggered from the command palette or automated through Periodic Lint.

## Next: Schema Layer Deep Dive

Contradiction detection reveals when your sources disagree. But how do you control what gets extracted in the first place? The answer is in your Wiki's third layer: the schema.

In [Inside the System (Five): Schema Layer Deep Dive](/blog/schema-layer-deep-dive), we'll explore how `entities.yaml`, `concepts.yaml`, `aliases.yaml`, and extraction templates shape what your Wiki knows — and how a well-tuned schema prevents many contradictions before they ever appear.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
