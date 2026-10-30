# ROADMAP — active plans

This file tracks **active and planned work** for the marketing site. It is a
planning document, not a changelog: shipped work is recorded in `CHANGELOG.md`
and in `git log`. An item is deleted from here once its phase is complete and its
outcome is written into the changelog entry.

Related documents:

- `AGENTS.md` — copywriting standard (Apple-tier), architecture rules, gate definition.
- `CHANGELOG.md` — the shipped per-version record (single source of truth for history).
- `docs/aesthetic-audit.md` — the audit behind this plan: findings, thesis, design system.
- `README.md` — what the site is, and how to build and deploy it.
- Plugin repo `/Users/greener/project/obsidian-llm-wiki` — upstream `CHANGELOG.md`
  is the authoritative source of what shipped.

---

## Active plan — aesthetic redesign (P0–P4)

**Status**: in progress
**Opened**: 2026-10-30
**Thesis**: *the connected document* — dark is a workspace, light is paper.
**Baseline renders**: `/tmp/shots/before/` (regenerate:
`node scripts/visual-audit.mjs /tmp/shots/before dark`)
**Full audit and design spec**: `docs/aesthetic-audit.md`

The before score is 6.0/10 — competent and correct, but with no visual thesis.
Target 8.8–9.2 (Site of the Day range). The phases below are ordered because
P0 must land first: without a themeable token layer, P1–P2 would hardcode colour
a second time.

### P0 — foundation (correctness, not aesthetics)

- [x] Semantic token layer in `src/index.css`: `:root` (dark) +
      `:root[data-theme="light"]`, `@theme inline` utilities, legacy
      `--color-obsidian-*` aliases so no component breaks mid-migration
- [x] Theme mechanism, strategy A: `prefers-color-scheme` → **dark fallback** when
      the OS reports no preference; manual `Auto / Light / Dark` persisted in
      `localStorage`; blocking inline `<head>` script so there is no flash
- [x] `color-scheme` declared; `<meta name="theme-color">` follows the theme
- [x] Fonts: Instrument Serif (display) + Instrument Sans (UI), self-hosted;
      retire Outfit; explicit CJK stacks for `zh`, `zh-tw`, `ja`, `ko`
- [x] Fluid modular type scale (3 display tiers) and a spacing/width scale
      (`--section-major/std/tight`, one 12-column grid, header aligned to content)
- [x] Remove the inline `overflow-x: hidden` / `overflow: clip` hack (it violates
      this repo's own double-scrollbar rule and cannot be themed)
- [x] `prefers-reduced-motion` global guard; `.reveal` no-JS fallback
- [x] Tokenise the 71 hardcoded colour sites (keep `Install.astro`'s SVG dark —
      it is product imagery, and must be framed as such)

**Accept**: both schemes render with no flash at load; zero hardcoded colour
outside product imagery; CJK line-height correct; reduced-motion shows all content
statically; gate 4/4.

### P1 — visual language

- [ ] Palette re-derivation for both schemes (dark = workspace, light = paper);
      no glow in light mode
- [ ] Hairline + connector-node system replaces gradient borders and glows
- [ ] Margin numerals in the left gutter (`01 02 03`) replacing centred labels
- [ ] Two-colour semantics: violet = derived, amber = source
- [ ] Radius unification, surface/elevation model per scheme

**Accept**: accent appears ≤3× per viewport; hairlines are the dominant structure;
neither scheme is an inversion of the other.

### P2 — composition

- [ ] Hero: asymmetric, copy anchored bottom-left, display serif at up to 5.4rem,
      the graph promoted from invisible particles to a visible hairline diagram
- [ ] Comparison: connector spine that draws, before-list vs after-structure
- [ ] Features: bento — one large marquee tile + supporting tiles
- [ ] Install: pinned sequence, mockup holds while steps scroll past
- [ ] Providers: grouped by deployment shape with hairline group rules
- [ ] CTA: full-bleed, largest type on the site

**Accept**: no two adjacent sections share a composition; 12-column alignment
holds; no section taller than its content justifies.

### P3 — motion (first-class, not a finishing pass)

- [ ] Motion tokens: two velocities (`fast` 120–180ms, `slow` 500–900ms), one
      easing family
- [ ] Signature: the connector draw (`stroke-dashoffset`), used exactly twice
- [ ] Hero word-by-word mask reveal; ≤6px pointer parallax on the diagram
- [ ] Pointer-tracked spotlight on cards (CSS vars, rAF-throttled)
- [ ] Scroll-linked install sequence (`animation-timeline: view()` with fallback)
- [ ] Nav underline draw; theme-toggle circular clip-path wipe
- [ ] Astro view transitions (fade + 8px rise)

**Accept**: reduced-motion statically resolves everything; CLS 0; **no animation
library added** (CSS + one ~3KB `motion.ts`); 60fps on the hero.

### P4 — craft

- [ ] Visible, themed focus rings; distinct hover state on every interactive element
- [ ] Selection, scrollbar and grain theming per scheme
- [ ] OG image and favicon refresh to the new mark
- [ ] 404 page; print stylesheet

**Accept**: keyboard-only traversal fully visible; every interactive element has
both a hover and a focus state.

### Final — comparison record

- [ ] Regenerate `scripts/visual-audit.mjs` in both schemes
- [ ] Side-by-side before/after sheet, re-scored against §2.6 of the audit
- [ ] Hand over for the user's visual review

---

## Shipped

| Version | Outcome |
|---|---|
| `v1.29.0-web` | Jump sync from `v1.27.0-web`: retrieval story, PDF-ingest destinations, ChatGPT Plan, privacy-FAQ MinerU disclosure, combined v1.28+v1.29 post. Decisions recorded in `CHANGELOG.md`. |

---

## Decision log

| Date | Decision | Reason |
|---|---|---|
| 2026-10-30 | Theme strategy A: `prefers-color-scheme` with dark fallback | The OS already tracks day/night on modern platforms, so it *is* the day/night signal; a time-of-day rule would fight a user who wants light at night |
| 2026-10-30 | Light theme is designed as **paper**, not as an inversion | Inversion is what makes light themes look cheap; paper gives the theme a reason and fixes the physical model (shadow, not glow) |
| 2026-10-30 | Keep `Install.astro`'s SVG mockups dark in both schemes | They are product screenshots; a light-mode restyle would misrepresent the product. Framed as device chrome so they read as imagery |
| 2026-10-30 | No animation library | Static Astro + islands; GSAP would add ~33KB to animate one landing page, and performance is a scored criterion |
| 2026-10-30 | Retire Outfit for Instrument Serif + Instrument Sans | Outfit is the strongest "generated" signal at display sizes and has no optical range; the pair supports the document thesis at 45KB combined vs 41KB for Outfit alone |
| 2026-10-30 | Design system source is the evidence, not impression | Tokens, clamps, easings and composition were read and measured, then confirmed against 1440×900 renders |
| 2026-10-29 | Jump to `1.29.0-web`, one combined post | v1.28.0 never tracked; all four of its capabilities are opt-in, so a standalone post would be thin |
| 2026-10-29 | Retrieval goes on the existing conversational card, not a new card | A 9th card breaks the 4/8 breakpoint split and duplicates the conversational claim (`AGENTS.md` §4) |
| 2026-10-29 | +ChatGPT Plan, −Anthropic-Compatible in Providers | Codex OAuth is a distinct sign-in never documented on the site; the custom-Anthropic card is a config path already covered by the subtitle |
| 2026-10-29 | OpenCode stays off the providers grid | Aggregator overlap with OpenRouter; its real value is a reliability fix, which belongs in the post |
| 2026-10-29 | MinerU caveat goes in the privacy FAQ, not Trust | Trust items must be ≤ 12-word verifiable guarantees; a retention caveat is neither |
| 2026-10-29 | No retrieval measurement numbers on the landing page | r@10 deltas and intervals belong in internals posts (`AGENTS.md` rule #3) |
