# LLM-Wiki Landing Page Redesign — Design Spec

Date: 2026-04-29

## 1. Context & Goals

**Current state**: 8-section landing page with good content but structural redundancy and weak narrative flow.

**Key decisions made in brainstorming**:
- Plugin is in Obsidian review; early traffic from social media + search (SEO critical)
- Core selling point: **knowledge compounding / self-maintenance**
- Tone: editorial narrative (Stripe Press / Apple) as primary, developer tool as secondary
- Audience: note-takers, delicate and perceptive
- CTA: point to Releases for manual install

**Problems identified**:
1. Philosophy and Comparison sections duplicate the same argument ("your notes are broken")
2. Architecture section too technical too early
3. Features and Ecosystem use identical card layouts
4. Hero background animation is abstract, doesn't tell the "Sources in. Wiki out." story
5. No social proof beyond GitHub stars badge

## 2. New Structure: 6 Sections

```
Hero
  Comparison (merges Philosophy)
    WikiDemo (unchanged)
      Features (redesigned)
        Ecosystem (redesigned)
          Providers + Footer
```

**Narrative arc**: Hook → Pain → Transformation → Proof → Capabilities → Amplification → Action

## 3. Section Designs

### 3.1 Hero

**Background animation**: Replace KnowledgeGraphGenesis with "Knowledge Growth" organic animation.

- Starting point: scattered amber-colored document shapes (representing source notes), floating gently
- Growth: purple connection lines grow organically between documents, like vines or neural synapses
- Clustering: dense connections naturally form clusters (wiki page groups), `.md` labels appear
- Compounding: new nodes "sprout" from existing connections (new wiki pages growing from existing knowledge)
- Feels like watching a **garden grow** or **neural network forming** — organic, slow, with breathing rhythm
- No clear start→end, it's a continuous life cycle

Key improvements over current:
1. Nodes: abstract circles → recognizable **mini document shapes**
2. Connections: random dashed lines → **growth-direction arcs** with sense of direction
3. Clusters: more visible structure **emerging from chaos**
4. New nodes: **sprout** from existing connections (visualizes "compounding")

**Content**:
- Title: pointed toward "knowledge compounding" theme
- Subtitle: one sentence hitting the core value proposition
- CTA: "Get the Plugin" → links to Releases (manual install)
- GitHub Stars badge: keep

### 3.2 Comparison (merges Philosophy)

**Merge strategy**: Philosophy's core insights ("your notes are sleeping", "AI conversations vanish", "knowledge should compound") are compressed into the Comparison's narrative framework.

**Header**:
- Label: `Why This Matters`
- Large title: editorial golden quote (CN: "你读过的每一篇，都不该白读")
- Subtitle: one-line positioning

**Content**: 3 comparison rows (reduced from 4):

| Dimension | Before | After |
|---|---|---|
| Knowledge Saving | Read and forget, save and can't find | Drop in sources/, auto-extract, file, update |
| Knowledge Connection | Manual links, silently rot | Auto cross-reference, sync on contradiction |
| Knowledge Compounding | 1 year of notes = pile of files | 1 year of notes = living wiki, compounds with use |

**Visual design**:
- Before column: lower opacity, gray tones, visually "dull"
- After column: purple border glow, visually "glowing"
- Gradient transition line between columns (gray → purple)
- Small icons per row: Bookmark (saving), Link2 (connection), TrendingUp (compounding)

**Philosophy integration**:
- Top of Comparison section: large editorial quote text for emotional hook
- No separate Philosophy section needed

### 3.3 WikiDemo (No Major Changes)

Keep as-is per user approval. Two micro-adjustments:
1. Section spacing adjusted for new 6-section rhythm
2. Subtitle tweaked to point toward "compounding" theme

### 3.4 Features (Redesigned)

**Change**: Remove product screenshots (low information density), replace with compact information cards.

**Layout**: 2x2 grid

**Each card**:
- Top: large Lucide icon in rounded rectangle background
- Tag label: keep (Zero-config / [[wiki-links]] / Chat / Always on)
- Title + description: keep
- Replace image area with **micro code snippet or command example** showing actual usage

Example for Auto-Organize card:
```
sources/my-article.md
  (automatic)
wiki/entities/...
wiki/concepts/...
```

**Hover effect**: cards slightly lift + purple bottom glow

### 3.5 Ecosystem (Redesigned — 1+1>2)

**Core concept**: Not a plugin list, but an "amplifier" showcase.

**Title**: "每个插件，都因知识结构化而更强" (CN)

**Card format**: Each card has two layers:

**Upper layer** (gray, muted, small text): tool name + icon + one-line standalone usage
**Lower layer** (purple, highlighted, larger text): `+ LLM Wiki` label + amplified effect

Visual: gray "standalone" sinks down, purple "amplified" jumps out. Color and size difference creates dramatic "leap" feeling.

Example cards:
- Graph View: standalone (visualize links) → + Wiki (hub pages, knowledge clusters, orphan detection)
- Dataview: standalone (query frontmatter) → + Wiki (AI auto-adds structured metadata)
- Git: standalone (version control) → + Wiki (watch knowledge evolve over time)
- Web Clipper: standalone (clip articles) → + Wiki (auto-extract, link, update index)
- Marp: standalone (make slides) → + Wiki (generate presentations from knowledge base)
- Canvas: standalone (infinite canvas) → + Wiki (AI generates concept maps from knowledge graph)

**Visual design**:
- Upper layer: `text-obsidian-dim`, small font
- Divider: thin purple dashed line
- Lower layer: `text-obsidian-heading`, normal font, left purple accent bar
- Compact cards, 2 or 3 column grid

### 3.6 Providers + Footer

- Providers: maintain current grid, adjust density and spacing, use semantic color tokens
- Footer: maintain current design, update to semantic tokens
- CTA in Providers area: "Star on GitHub" primary action

## 4. Sections Removed

| Removed | Reason | Content Destination |
|---|---|---|
| Philosophy | Duplicates Comparison argument | Merged into Comparison (editorial quote + 3-row comparison) |
| Architecture | Too technical too early | Transformed into Hero background animation ("Knowledge Growth") |

## 5. Design Principles

1. **Every screen advances the narrative** — no section exists for "completeness"
2. **Show, don't tell** — WikiDemo is the proof; Features show capabilities; Ecosystem shows amplification
3. **Rhythm over uniformity** — section spacing varies (breathing rhythm, not equal padding)
4. **Organic over mechanical** — animation, layout, and copy should feel grown, not manufactured
5. **Consistent terminology** — "the plugin" throughout (not "the AI" or "the LLM" in user-facing copy)

## 6. SEO Requirements

Since early traffic comes from search engines:
- Semantic HTML: proper heading hierarchy (h1 → h2 → h3)
- Meta tags: already configured in index.html
- Open Graph + Twitter cards: already configured
- Alt text on all visual elements
- Structured content (not all visual, has crawlable text)
- Fast load: lightweight animations, lazy-loaded images

## 7. Technical Notes

- Font: Outfit (already in place)
- Color system: semantic tokens (obsidian-bg, obsidian-surface, etc.)
- Animation: Canvas 2D API for Hero background
- i18n: EN + ZH, all copy in translations.ts
- Framework: React 19 + TypeScript + Vite 7 + Tailwind CSS 3.4
