# Aesthetic audit & redesign — the connected document

**Status**: in progress (P0–P4)
**Scope**: the marketing site's visual language, motion, and theme system.
**Not in scope**: copy (owned by `AGENTS.md`), content, i18n strings, and blog
article bodies.

This document is the decision record and the phase plan. The live values live in
`src/index.css`; where this file and the code disagree, the code is right.

---

## 1. Method

Judged against the criteria the four target juries actually use —
**Awwwards: design 40 / usability 30 / creativity 20 / content 10**; FWA, CSSDA
and Webby converge on the same shape.

Evidence was gathered from two sources, not from impression:

1. **The design system source** — every token, type clamp, spacing value, easing
   curve, and the composition code of all 11 sections.
2. **Renders** — `scripts/visual-audit.mjs` captures a 1440×900 viewport at each
   landmark plus the hero, in both colour schemes.

Before-state renders: `/tmp/shots/before/` (regenerate with
`node scripts/visual-audit.mjs /tmp/shots/before dark`).

## 2. Findings — the before state

### 2.1 One measurable root cause

> The page is **one component repeated with different content.** Remove the copy
> and nothing identifies the product.

Countable evidence:

| Signal | Measured |
|---|---|
| Sections using `text-center` | **9 of 10** |
| Sections sharing one identical `H2` clamp | **8** (`clamp(1.6rem,4vw,2.8rem)`) |
| Distinct display sizes on the entire site | **3** |
| Vertical section paddings in use | **5** (`py-20/24/28/32/36`), semantically indistinguishable |
| Container widths | **4**, and the header (`6xl`) does not align with content (`5xl`) |
| Cards in the Features grid | **8**, identical size and weight |
| Purple accent instances in one viewport | **~24** (every card: icon tile, icon, tag) |

### 2.2 The palette is a framework default

Every brand token is an unmodified Tailwind value:

| Token | Value | Is actually |
|---|---|---|
| `--color-obsidian-purple` | `#7c3aed` | `violet-600` |
| `--color-obsidian-purple-light` | `#8b5cf6` | `violet-500` |
| `--color-obsidian-purple-dark` | `#6d28d9` | `violet-700` |
| `--color-obsidian-amber` | `#d97706` | `amber-600` |
| `--color-obsidian-text` | `#d4d4d4` | `neutral-300` |
| `--color-obsidian-muted` | `#a3a3a3` | `neutral-400` |
| `--color-obsidian-bg` | `#0f0f0f` | pure neutral, zero chroma |

Obsidian's real brand purple (`#7f6df2`) appears exactly once in the codebase —
inside a decorative `.gradient-border` nobody notices — while the accent that
carries the whole site is stock framework violet.

### 2.3 Typography

- **Outfit** is the single strongest "generated" signal: a geometric sans with no
  optical range, ubiquitous in AI-product landings, weak at display sizes.
- **Four of eleven locales have no typography at all.** `zh`, `zh-tw`, `ja`, `ko`
  have no CJK stack declared, so they fall through to platform defaults with a
  Latin-tuned `line-height: 1.6` — CJK needs ≈1.75–1.85.
- The type scale is ad-hoc `clamp()` values, not a modular scale with a ratio.

### 2.4 Robustness (usability is 30% of the score)

| Defect | Consequence |
|---|---|
| No `prefers-reduced-motion` anywhere | motion-sensitive visitors get the full entrance choreography |
| `.reveal` starts at `opacity: 0` with no no-JS fallback | if the script fails or is blocked, everything below the hero is **invisible** |
| `<html style="overflow-x: hidden">` inline | violates this repo's own double-scrollbar rule, and cannot be themed |
| No `color-scheme` declaration | native scrollbars/controls stay wrong in light mode |
| `transition-all` on the header | animates every property, including layout ones |

### 2.5 The hero's most expensive asset is invisible

`KnowledgeGrowth.tsx` is 202 lines of canvas machinery, but at 1440×900 the
particle field reads as a handful of barely-visible dots. Its trail effect
overpaints `rgba(15,15,15,0.55)` every frame — **the dark background is baked
into the canvas**, so it cannot theme.

### 2.6 Score, before

| Criterion | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 2.2 | no visual thesis; framework palette; template composition |
| Usability | 30 | 2.1 | a11y motion gap; no-JS blank page; 12px nav |
| Creativity | 20 | 0.8 | nothing survives removing the copy |
| Content | 10 | 0.9 | genuinely strong (copy standard is Apple-tier) |
| **Total** | | **6.0 / 10** | competent, correct, forgettable |

---

## 3. The thesis — *the connected document*

The product's differentiating idea is not "AI takes notes"; it is that **what it
produces is connected and every claim is traceable**. That is the only thing here
that can become a visual asset.

`AGENTS.md` §4 forbids two sections owning the same claim — the same discipline
applies to graphics: one motif, carried everywhere.

### The asset vocabulary

| Asset | Role | Replaces |
|---|---|---|
| **1px hairline** | dominant structural element: dividers, card edges, connectors | gradient borders, glows |
| **connector node** | small dot/notch where a line meets a card, echoing a graph edge | — |
| **margin numeral** | monospace `01 02 03` in the left gutter: wayfinding *and* footnote vocabulary; gives the left margin a job | centred section labels |
| **reference mark** | superscript numerals on citations | — |
| **two-colour semantics** | violet = derived/generated · amber = source/quoted | single-colour decoration |

### Why this licenses a light theme

Most light themes are mechanical inversions, and read cheap. This one has a
reason:

> **Dark = workspace. Light = paper.** The product's output is a document you
> read. Reading happens on paper, in daylight.

That is a narrative, not a toggle — and it is the kind of conceptual linkage
juries reward. It also forces the correct *physical* model:

| | Dark (workspace) | Light (paper) |
|---|---|---|
| Light model | additive — emission | subtractive — shadow |
| Elevation | surface lightens | surface stays white, separated by shadow + hairline |
| Accent | may glow | **glow is forbidden** — purple on white becomes muddy haze |
| Ink | `#d4d4d4`-ish | near-black, **never pure black**, slight cool cast |

---

## 4. Design system v2

### 4.1 Token architecture

Tailwind v4 emits theme tokens as CSS custom properties and resolves utilities
through `var()` — verified in the build output:

```css
.bg-obsidian-bg { background-color: var(--color-obsidian-bg) }
```

So ~80% of surfaces become themeable by overriding variables, with no component
edits. The plan therefore uses **`@theme inline` over a runtime-swappable
`:root` layer**, plus legacy aliases so existing utilities keep working:

```
:root                        → semantic values (dark, the default)
:root[data-theme="light"]    → semantic values (light)
@theme inline                → utilities resolve through the semantic vars
```

### 4.2 Theme switching — strategy A (settled)

- Primary signal: `prefers-color-scheme`.
- Fallback when the OS reports no preference: **dark** (preserves today's default).
- Manual override: three-state `Auto / Light / Dark`, persisted in `localStorage`.
- Applied by a **blocking inline script in `<head>`** so there is no flash.
- `color-scheme` declared so native scrollbars and controls follow.
- `<meta name="theme-color">` updated by the same script.

### 4.3 Unthemeable debt — 71 sites, inventoried

| File | Sites | Treatment |
|---|---|---|
| `Install.astro` | 55 (SVG) | **keep dark** — it is product imagery; wrap it in deliberate device chrome so it reads as a screenshot in both themes |
| `KnowledgeGrowth.tsx` | 18 | read colours from CSS vars at runtime; trail fill follows the canvas background |
| `WikiDemo.tsx` | 18 | tokenise |
| `Header.astro` | 10 | tokenise (`hover:bg-white/12` → token) |
| `Footer.astro` | 9 | tokenise |
| `WikiGraphStage.tsx`, `MacWindow.tsx` | 11 | tokenise |
| `index.css` (`.card`, `::selection`, scrollbar, grain) | — | rewrite on tokens |

### 4.4 Typography

- **Display**: Instrument Serif — editorial, high contrast, carries the
  "document" thesis. Used on hero + section headlines only.
- **UI/body**: Instrument Sans — low-contrast neo-grotesque, removes the
  geometric "AI startup" register.
- **Mono**: JetBrains Mono (kept).
- **CJK**: explicit per-script stacks. Serif display falls to 宋体/Mincho family
  (which is correct for CJK document typography); body falls to PingFang /
  Hiragino / Noto / YaHei. CJK line-height raised to ≈1.78.
- Fluid modular scale replaces ad-hoc clamps; three display tiers only.

Both Latin fonts are self-hosted (`public/fonts/`, 30KB + 15KB — smaller than the
41KB Outfit file they replace).

### 4.5 Motion system — a first-class pillar

The current site has **one motion verb** applied to everything
(`translateY(32px) scale(0.98)`, 0.6s, one curve). Award-level interaction needs
a system.

**Rules**

1. Motion is **causal** — things move because something changed.
2. **Two velocities only**: `fast` 120–180ms (UI response) and `slow` 500–900ms
   (narrative entrance). No 300ms default soup.
3. **One easing family**: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` for
   entrances, `--ease-ui: cubic-bezier(0.4, 0, 0.2, 1)` for state changes.
4. **Signature motion**: the **connector draw** — hairlines draw themselves with
   `stroke-dashoffset` when they enter view. Appears exactly twice (comparison
   spine, hero diagram). Repeating it would make it decoration.
5. **Scroll-linked, not scroll-triggered**, for the Install sequence.
6. **Hover is state, not spectacle**: line brightens, surface lifts 1px, accent
   appears on one element — never a colour flash on the whole card.
7. **`prefers-reduced-motion: reduce` → everything resolves instantly and
   statically.** Non-negotiable; also fixes a real accessibility defect.

**Interaction inventory** (what will actually move)

| Where | Behaviour |
|---|---|
| Hero | word-by-word mask reveal; pointer parallax on the graph, ≤6px |
| Comparison | connector spine draws left→right as it enters; nodes pop at intersections |
| Cards | pointer-tracked spotlight (CSS vars on `pointermove`, rAF-throttled) |
| Features | sticky-first-tile bento; tiles reveal in reading order |
| Install | pinned sequence — mockup holds while the three steps scroll past |
| Providers | staggered line-draw between group rules |
| Nav | underline draws from left on hover; active state is a hairline, not a pill |
| Theme toggle | circular clip-path wipe from the toggle's position |
| Page transitions | Astro view transitions (fade + 8px rise), honoured only when reduced-motion is off |

**Performance budget — no animation library.** The site is static Astro with
islands; adding GSAP (~33KB) to animate a landing page is a net loss and juries
watch the performance score.

- CSS handles ~80%: entrances, hovers, the connector draw, the pinned sequence
  (`animation-timeline: view()` where supported, layout fallback where not).
- One hand-written `src/scripts/motion.ts` (~3KB) handles what CSS cannot:
  reduced-motion gate, pointer spotlight, hero word reveal.
- Transform/opacity only; no layout-animating properties; no scroll listeners
  driving style without rAF.

---

## 5. Composition — per section

| Section | Before | After |
|---|---|---|
| Hero | centred, 3.8rem cap, invisible canvas | asymmetric: copy anchored bottom-left on a 12-col grid; display serif at up to 5.4rem; graph promoted to a visible hairline diagram with typed labels; one reference-mark specimen |
| Comparison | two card columns | **connector spine** down the middle; before is an unstructured list, after is a linked structure — the motif earns its place here first |
| Features | 8 identical cards | **bento**: one large tile for the marquee claim + 6 supporting tiles; two tiers of type |
| Install | 3 stacked cards, wastefully tall | **pinned sequence**: mockup holds, steps scroll past; ~60% shorter |
| Providers | 12 identical tiles | grouped by **deployment shape** with hairline group rules; position carries the recommendation |
| CTA | ordinary card | full-bleed, largest type on the site, one line |
| All | 5 paddings, 4 widths | 3 semantic tiers (`major` / `std` / `tight`), one 12-col grid, header aligned to content |

---

## 6. Phases and acceptance criteria

Each phase ships independently and must pass `npm run gate` **4/4** plus
`shazam_verify` PASS before it is committed.

### P0 — foundation (correctness, not aesthetics)
Semantic token layer · theme mechanism + inline no-flash script · `color-scheme`
and `theme-color` · new fonts + CJK stacks · type scale · spacing/width scale ·
remove inline `overflow-x` hack · `prefers-reduced-motion` global guard · no-JS
`.reveal` fallback · tokenise 71 hardcoded colours.

**Accept**: both schemes render with no flash; zero hardcoded colour outside
`Install.astro`'s product imagery; CJK line-height correct; reduced-motion shows
everything statically; gate 4/4.

### P1 — visual language
Palette re-derivation for both schemes · hairline + node system · margin
numerals · two-colour semantics · radius unification.

**Accept**: accent appears ≤3× per viewport; hairlines are the dominant structure;
both schemes designed, neither an inversion of the other.

### P2 — composition
Hero · comparison spine · bento features · pinned install · providers grouping ·
full-bleed CTA · container/grid unification.

**Accept**: no two adjacent sections share a composition; 12-col alignment holds;
no section is taller than its content justifies.

### P3 — motion
Motion tokens · connector draw · hero word reveal · pointer spotlight · sticky
sequence · nav underline · theme wipe · view transitions.

**Accept**: `prefers-reduced-motion` resolves everything statically; no layout
thrash (CLS 0); no added animation library; 60fps on the hero.

### P4 — craft
Focus rings (visible, themed) · cursor states · selection/scrollbar theming ·
OG image and favicon refresh · 404 · print stylesheet.

**Accept**: keyboard-only traversal is fully visible; every interactive element
has a distinct hover and focus state.

### Final — comparison record
Regenerate `scripts/visual-audit.mjs` output in both schemes, produce a
side-by-side before/after sheet, re-score against §2.6, and hand over for the
user's visual review.

---

## 7. Out of scope

- Copy and content structure (`AGENTS.md` owns it; no claim changes here).
- i18n strings and the 11 locale files.
- Blog article bodies and layout beyond token adoption.
- Provider list composition (settled in the v1.29.0-web sync).
