# ROADMAP — Website sync plans

This file tracks **active and planned sync work** for the marketing site. It is a
planning document, not a changelog: shipped work is recorded in `README.md` →
"Optimization history" and in `git log`. An item is deleted from here once its
phase is complete and its outcome is written into the Optimization history entry.

Related documents:

- `AGENTS.md` — copywriting standard (Apple-tier), architecture rules, gate definition.
- `README.md` → "Optimization history" — the shipped per-version record.
- Plugin repo `/Users/greener/project/obsidian-llm-wiki` — upstream `CHANGELOG.md`
  is the authoritative source of what shipped.

---

## Active plan — `v1.27.0-web` → `v1.29.0-web`

**Status**: in progress
**Opened**: 2026-10-29
**Upstream target**: plugin `v1.29.0` (released 2026-10-28)
**Version decision**: jump `1.27.0-web` → `1.29.0-web`, one combined announcement
covering **v1.28.0 + v1.29.0** (option A, chosen 2026-10-29).

### Why jump two MINORs instead of backfilling v1.28.0

- The site never tracked `v1.28.0` and had no `v1.28.0-web` entry, so there is no
  half-finished state to preserve.
- Every one of v1.28.0's four capabilities is **off by default**. A standalone
  post for it would be thin: "four new switches you have to turn on". Folded
  into the v1.29.0 post it reads correctly as "nothing changes until you want it
  to", reusing the narrative frame that worked for the v1.27.0 post.
- The plugin's own release note for v1.28.0 opens with exactly that framing
  ("a straight upgrade — your vault is not rewritten, and nothing changes until
  you turn something on"), so the merge is faithful to the source.

### Delta summary (upstream `v1.27.0..v1.29.0`)

212 commits, ~524 files, +33k/−4.8k LOC, across two MINORs and two PATCHes
(`1.27.1` 2026-09-06, `1.27.2` 2026-09-15, `1.28.0` 2026-10-04, `1.29.0` 2026-10-28).

Two headline changes:

1. **Retrieval rewrite (v1.29.0)** — the lexical stage now scores page **bodies**
   through BM25F (previously `lexMatch` was called with `text: ''`, so the longest
   text on a page never reached the scorer). Two-stage Rocchio query expansion on
   top. Term index built once per session instead of once per question. Upstream
   calls this "the single largest recall change in the project's history", and it
   is **on by default**, with a `Legacy query scorer` escape hatch in Advanced
   settings.
2. **Ingest survives reasoning models (v1.29.0)** — extraction declares the
   model's own output ceiling (128K starting assumption) instead of a fixed
   16,000, so a thinking model no longer starves the answer batch.

Secondary user-facing items in scope: embedded Markdown image analysis (v1.28.0),
one tag vocabulary (v1.28.0), custom request headers per provider (v1.28.0),
academic-form citations (v1.29.0), answer budget 8,000 → 16,000 (v1.29.0),
thinking level + model context window settings (v1.29.0), Obsidian's excluded-files
list honoured on every ingest path (v1.29.0).

### Non-goals (explicitly excluded from the site)

Per `AGENTS.md` rule #3 and §4. These stay in the plugin CHANGELOG / docs:

- Test counts (4144 → 4372 → 5040), commit counts, LOC deltas, PR numbers in body copy.
- Bundle size work (5,188,043 → 4,864,406 bytes, Obsidian Sync 5 MB cap).
- Dependency hygiene: `pnpm audit`, `source-map-js` 1.2.2 pin, fast-uri, vite, AI SDK
  v6→v7, zod 4, esbuild external `node:` imports, TypeScript 6 held back.
- Retrieval measurement numbers (r@10 deltas, confidence intervals, PPR @5 27.1%).
  These belong in the *Inside the System* internals posts, never on the landing page.
- Internal correctness fixes with no user-visible surface (merge idempotency,
  frontmatter retarget policy, `listModels()` removal, JSON repair, statics).

---

## Workstreams

Each workstream is independently reviewable and lands as its own commit. Order is
deliberate: factual corrections first (zero product judgement), then landing-page
claims, then the new post, then the version bump.

### W1 — Blog corrections: query pipeline (no product judgement, pure drift)

**Problem.** `src/content/blog/query-engine-pipeline.md` and its ZH mirror are
wrong in three places, all verifiable against plugin source:

| Stale claim | Upstream reality |
|---|---|
| "the seed selector's first move is the cheapest one imaginable: tokenize your question and do a plain substring match against page titles and aliases" / "Why start with something so unsophisticated?" | BM25F over title, alias, summary **and body**, per-field tf saturation, IDF over a real document-frequency table (`src/wiki/query-engine/`) |
| UI labels presented as `Lex+PPR` / `LLM+PPR` / `LLM+KB` | Display is now `🔍 N pages · ⚡ BM25F+PPR · 📚 N sources` (`src/wiki/query-engine/renderers/retrieval-label.ts`); the old identifiers are internal emit values only. Hover detail adds `expansion: Rocchio +N words`, `history: N rounds (weight 0.3)`, `fusion: maxFuse` |
| No mention of query expansion | Two-stage Rocchio expansion (corpus terms, then model-selected terms) before seed selection |

**Files.** `src/content/blog/query-engine-pipeline.md`,
`src/content/blog-zh/query-engine-pipeline.md`.

**Acceptance.** Zero occurrences of `Lex+PPR`, `LLM+PPR`, `LLM+KB` in either file
except where explicitly framed as historical/internal. The lexical stage is
described as BM25F over four fields. Expansion is explained in one paragraph
without quoting a confidence interval. Article keeps its "Inside the System (7)"
voice — design rationale, no line numbers, no PR numbers.

---

### W2 — Blog corrections: document ingest guide

**Problem.** `pdf-ingest-guide.md` (EN + ZH) stops at five on-ramps and omits a
privacy fact the upstream docs state plainly.

- v1.28.0 added a sixth on-ramp: **embedded Markdown images** (`![[…]]`,
  `![…](…)`) analysed during Markdown ingestion, opt-in, 10 MiB per image,
  20 MiB packages, GIFs send a static first frame, remote URLs never downloaded.
  The guide's section heading "Five ways in, switchable per ingest" is now wrong.
- The guide gives local OCR the line "The PDF never leaves your machine" but never
  states that the **built-in MinerU backend uploads the document to `mineru.net`**
  (operated by OpenDataLab on Aliyun), which publishes no privacy policy, retention
  statement, or DPA. Upstream `docs/PDF-OCR-GUIDE.md` §"Where your document is
  processed" is explicit about this. Saying nothing implies "document ingest = local",
  which is false by default.

**Files.** `src/content/blog/pdf-ingest-guide.md`,
`src/content/blog-zh/pdf-ingest-guide.md`.

**Acceptance.** Six on-ramps, numbered, with the embedded-image entry matching the
upstream setting names (`Analyze embedded images during Markdown ingestion`,
`Save embedded image visual evidence to source page`). A "Where your document goes"
table naming every path and its destination, including the MinerU retention caveat
in one plain sentence. Frontmatter `description` and `related` still valid.

---

### W3 — Landing page: retrieval story on the conversational card

**Problem.** The single largest recall change in the project has no landing-page
presence. `features.conversationalDesc` says only "Talk to your wiki like a friend.
It reasons, then answers — naturally." — which describes the chat surface, not the
fact that a differently-worded question now lands on the right page.

**Decision.** Rewrite the existing card rather than add a 9th. A separate
"finds the right page" card would duplicate the conversational card's claim, which
`AGENTS.md` §4 forbids, and would break the 8-card breakpoint split in
`Features.astro` (4 mobile / 8 sm+).

**Files.** `src/i18n/locales/{en,zh,zh-hant,ja,ko,ru,de,es,fr,pt,it}.ts`
(`features.conversationalTitle` / `conversationalDesc`).

**Acceptance.** Title ≤ 8 words, description ≤ 28 words, second person, no
measurement numbers, no version numbers, no setting names. Each locale's
description states the same two facts: your own words are enough; the whole page
is searched, not just its title.

---

### W4 — Landing page: providers grid

**Problem.** Two gaps.

1. **ChatGPT Plan (Codex OAuth) has never been on the site.** It shipped in
   plugin `v1.25.2` (2026-07-21) and is a genuinely different *sign-in*: your
   ChatGPT subscription instead of a separately-billed API key. The site added
   AWS Bedrock SSO in `v1.27.0-web` under the headline "sign in with your work
   account" and left the consumer equivalent undocumented.
2. `providers.subtitle` hardcodes "**Twelve** ways in". The plugin ships 17
   presets. A count in marketing copy is a maintenance tax that goes stale
   silently (`AGENTS.md` rule #3).

**Decision on the 12-card cap** (`AGENTS.md` rule #6, ≤ 12):

- **Add** `ChatGPT Plan` — tagline "Sign in, no API key".
- **Retire** `Anthropic-Compatible` ("Custom Anthropic endpoint"). Of the twelve
  current cards it is the only one that is a *configuration path* rather than a
  provider a reader would pick; the subtitle already promises "or your own
  endpoint", and both custom endpoint variants are documented in the plugin repo.
- **Do not add** `OpenCode (Zen / Go)` (new preset in v1.28.0). It is another
  aggregator endpoint, functionally overlapping `OpenRouter` on a landing page,
  and its real user value — the blocked-origin streaming fix — is told in the
  announcement post instead. Landing-page real estate is not the place for it.
- **Keep** `OpenRouter` — highest recognition among aggregators.

**Files.** `src/components/astro/Providers.astro` (array + comment block),
`src/i18n/locales/*.ts` (`providers.subtitle` in 11 locales).

**Acceptance.** 12 cards, DeepSeek still first (recommendation by position, no
badge). Subtitle no longer states a count. Comment block records why each swap
happened, dated, so the next sync does not re-litigate it.

---

### W5 — Landing page: the MinerU honesty gap

**Problem.** `faq.items` → "Can I keep my data fully private?" answers "With cloud
providers, data only leaves during the specific ingest or query you trigger". That
is true of the *LLM provider*, but document ingest has a second third party in the
path: MinerU. A reader taking that answer at face value would conclude document
conversion is local, which is false by default.

**Decision.** Fix it inside the privacy FAQ answer, not in the Trust section.
`AGENTS.md` §7 requires each Trust item to be a verifiable guarantee ≤ 12 words; a
retention caveat is not a guarantee and does not fit that shape. The FAQ owns
"privacy questions", so the FAQ owns this.

**Files.** `src/i18n/locales/*.ts` (`faq.items[3].a` in 11 locales).

**Acceptance.** The answer still ≤ 80 words, still leads with the local answer, and
adds one plain clause naming the converter's upload and its missing retention terms
with a "keep documents local if that matters" pointer. No fear-mongering, no
footnote, no hedging adverb pile-up.

---

### W6 — New announcement post: v1.28 + v1.29 (EN + ZH)

**Files.** `src/content/blog/v1290-minor-release.md`,
`src/content/blog-zh/v1290-minor-release.md`.

**Shape** (mirrors the v1.27.0 post's rhythm — upgrade first, then what you can do):

1. **Upgrade, and nothing changes** — every v1.28.0 capability is off by default;
   the one default-on change (ranking) has a switch back.
2. **Ask in your own words** — retrieval: full-text scoring, expansion, and the
   `Legacy query scorer` way back. Headline section.
3. **Ingest stops dying when the model thinks** — reasoning ceiling, thinking
   level, model context window.
4. **Images inside your notes count as evidence** — embedded image analysis.
5. **Answers cite like a paper** — `[N]` numbering, clickable bibliography, and the
   pipeline label that now names what actually ran.
6. **Endpoints that need a header** — custom request headers, OpenCode preset,
   Responses variant, streamed answers over a blocked origin.
7. **Smaller things** — Obsidian's excluded-files list honoured on every path,
   one tag vocabulary, machine-identifier filenames no longer become entity pages.
8. **How to get it** — update path, Install path, links to release + changelog.

**Acceptance.** Per `AGENTS.md`: no PR numbers, no test counts, no r@10 numbers, no
byte sizes, no dependency names in body copy. Every claim maps to a user action the
reader can perform. `related` cross-links the v1.27.0 post, `pdf-ingest-guide`,
`query-engine-pipeline`. ZH is a mirror, not a translation artifact — idiomatic,
same section order, same claims.

---

### W7 — Version bump + Optimization history

**Files.** `package.json` (`1.27.0-web` → `1.29.0-web`), `README.md`
(Optimization history: new `### v1.29.0-web (2026-10) — current. Plugin: v1.29.0`
entry; demote `v1.27.0-web` by dropping `— current`).

**Acceptance.** Entry records version + release dates, claims introduced, claims
corrected, explicit out-of-scope list, and the gate result — matching the shape of
the existing `v1.27.0-web` entry so the history stays skimmable.

---

### W8 — Verification

- `npm run gate` — 4/4 green: `tsc --noEmit` → `eslint . --max-warnings 0` →
  `vitest run` (48/48) → `astro build`. Expected page count: 80 + 2 (new post EN+ZH)
  = **82**.
- `shazam_verify` — verdict PASS.
- Dev-server spot check: `/`, `/zh/`, `/blog/posts/v1290-minor-release/`,
  `/zh/blog/posts/v1290-minor-release/`, `/blog/posts/query-engine-pipeline/`,
  `/blog/posts/pdf-ingest-guide/`, plus a single-line-style locale (`/de/`) to
  confirm the FAQ and provider subtitle edits landed in both locale file shapes.

---

## Progress

- [x] Research upstream `v1.27.0..v1.29.0` (212 commits, CHANGELOG, release notes,
      docs/PDF-OCR-GUIDE, `src/texts/en.ts` setting names, `src/constants.ts`)
- [x] Verify every stale claim against plugin source before writing it down
- [x] **W0** — this document
- [x] **W1** — query-pipeline blog corrections (EN + ZH)
- [ ] **W2** — pdf-ingest-guide: six on-ramps + destination table (EN + ZH)
- [ ] **W3** — conversational feature card: retrieval story (11 locales)
- [ ] **W4** — providers grid: +ChatGPT Plan, −Anthropic-Compatible, un-count subtitle (11 locales)
- [ ] **W5** — privacy FAQ: MinerU retention clause (11 locales)
- [ ] **W6** — v1.28+v1.29 announcement post (EN + ZH)
- [ ] **W7** — version bump + Optimization history
- [ ] **W8** — gate + verify + push

---

## Decision log

| Date | Decision | Reason |
|---|---|---|
| 2026-10-29 | Jump to `1.29.0-web`, one combined post | v1.28.0 never tracked; all four of its capabilities are opt-in, so a standalone post would be thin |
| 2026-10-29 | Retrieval goes on the existing conversational card, not a new card | A 9th card breaks the 4/8 breakpoint split and duplicates the conversational claim (`AGENTS.md` §4) |
| 2026-10-29 | +ChatGPT Plan, −Anthropic-Compatible in Providers | Codex OAuth is a distinct sign-in never documented on the site; the custom-Anthropic card is a config path already covered by the subtitle |
| 2026-10-29 | OpenCode stays off the providers grid | Aggregator overlap with OpenRouter; its real value is a reliability fix, which belongs in the post |
| 2026-10-29 | MinerU caveat goes in the privacy FAQ, not Trust | Trust items must be ≤ 12-word verifiable guarantees; a retention caveat is neither |
| 2026-10-29 | No retrieval measurement numbers on the landing page | r@10 deltas and intervals belong in internals posts (`AGENTS.md` rule #3) |
