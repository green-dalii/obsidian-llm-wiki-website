# Changelog

Every release of this website: what changed, which plugin release it documents,
and what was deliberately kept off the site. This file is the **single source of
truth for version history** — `README.md` links here and does not restate it.

Not in this file: **what the site is and how to build it** (that is `README.md`),
**the rules for working on it** (that is `AGENTS.md`), and **what is planned or in
progress** (that is `ROADMAP.md`).

## Versioning convention

The site tracks the plugin release it documents, suffixed `-web`:
plugin `v1.29.0` → website `v1.29.0-web`.

The numbering has two eras, which is why the entries below are not in numeric order:

| Era | Scheme | Range |
|---|---|---|
| Before 2026-07 | The site's own semver, unrelated to the plugin | `v1.0.0` → `v3.1.0` |
| From 2026-07 | The plugin version, suffixed `-web` | `v1.25.1-web` → current |

So `v3.1.0` is **older** than `v1.23.0-web`, not newer. Two entries —
`v1.23.0-web` and `v1.25.0-web` — are retroactive labels applied during the switch;
`package.json` never held those values, so there are no git tags for them.

The site does **not** auto-update on every plugin patch. A sync is a manual,
reviewed change: read the plugin `CHANGELOG` between the last synced plugin version
and the current one, then translate that delta into site changes. The procedure
lives in `AGENTS.md`; the working plan for a sync in flight lives in `ROADMAP.md`.

## Ordering and entry shape

Newest first. The top entry is current by position, so entries do not carry a
"— current" marker. Each entry states the plugin release it documents, then
separates **claims introduced**, **claims corrected** and **out of scope** — the
last of those is the most useful one, because it records what was excluded on
purpose so the next sync does not reopen the question.

Selected highlights only. The full commit-by-commit history is in `git log`.

## v1.29.0-web — 2026-10 · plugin v1.29.0

Jump sync covering `v1.27.0-web` → plugin `v1.29.0` (two MINORs and two PATCHes: 1.27.1, 1.27.2, 1.28.0, 1.29.0 — 212 commits, ~524 files). The site never tracked `v1.28.0`, so this version folds both MINORs into one announcement rather than backfilling a thin post for a release whose every capability is off by default. Planning, exclusions and per-workstream acceptance criteria are recorded in `ROADMAP.md`.

- **Version**: plugin `v1.29.0` (released 2026-10-28; body-aware BM25F retrieval, two-stage Rocchio query expansion, related-page shaping, `legacyScorer` escape hatch, reasoning-aware extraction ceiling, thinking level + model context window, 16K answer budget, academic-form citations, embedded Markdown image analysis, one tag vocabulary, custom request headers, Obsidian's excluded-files list honoured on every ingest path), website tracks it as `v1.29.0-web`.
- **Claims introduced**:
  - *Conversational feature card* rewritten from a chat-surface claim ("Talk to your wiki like a friend") to the retrieval outcome — every page's full text is scored, not just its title, so a question worded differently still lands. All 11 locales state the result rather than instruct the reader how to speak; the card titles are short idioms in each language (`怎么问都找得到`, `どう聞いても、見つかる`, `Ask however you like`), matching the register the rest of the grid already uses.
  - *ChatGPT Plan (Codex OAuth)* added to the Providers grid — "Sign in, no API key". It shipped in plugin `v1.25.2` and had never appeared on the site, while its enterprise counterpart (Bedrock SSO) has been here since `v1.27.0-web`. *Anthropic-Compatible* retired to stay inside the twelve-card cap; the composition history is now a dated comment in `Providers.astro`.
  - New section in the PDF Ingest guide: **Where your document goes** — a per-path destination table naming every third party in the document-ingest pipeline.
  - *Inside the System (7)* gained a `Widening the question` subsection covering query expansion, and a note that the term index is built once per session rather than per question.
- **Claims corrected**:
  - *Providers subtitle* stopped asserting a count ("Twelve ways in") — the plugin ships 17 presets, and a number in marketing copy goes stale silently (`AGENTS.md` rule #3).
  - *Privacy FAQ* — the answer promised data leaves only for the provider you configured. True of the LLM, not of document ingest, which has a second third party: the built-in MinerU backend uploads to `mineru.net`, which publishes no privacy policy, retention statement or data-processing agreement. One plain sentence now names the exception, with a "keep documents local if that matters" pointer. Placed in the FAQ rather than Trust, because a Trust item has to be a verifiable guarantee ≤ 12 words and a retention caveat is not one.
  - *PDF Ingest guide* — "Five ways in" became six: v1.28.0 added analysis of images already embedded in Markdown notes (`![[…]]`, `![…](…)`), with the two settings named as the plugin spells them.
  - *Query Pipeline post* — three hard drifts against plugin source. The lexical stage was described as "a plain substring match against page titles and aliases" / "so unsophisticated"; it is BM25F over title, aliases, summary and body. The UI labels were given as `Lex+PPR` / `LLM+PPR` / `LLM+KB`; those are internal arm identifiers, and the line above an answer reads `🔍 N pages · ⚡ BM25F+PPR · 📚 N sources` with `LLM` named only when a model actually fired. Two-stage Rocchio expansion was missing entirely. The section's argument against embeddings leaned on lexical matching being crude — it is much less crude now, which strengthens that case, so the ceiling paragraph reads the old 2,142-page measurement as a floor rather than a limit.
- **Out of scope** (kept in plugin CHANGELOG / docs, not on landing page per AGENTS.md rule #3):
  - Retrieval measurement numbers (r@10 deltas ± intervals, PPR @5 27.1%) — these live in the *Inside the System* posts, never in landing copy.
  - Bundle size work (Obsidian Sync 5 MB cap, 5.19 MB → 4.86 MB), test counts (4,144 → 5,040), all 212 commit / PR references.
  - Dependency hygiene: `ai` v6→v7, zod 4, `source-map-js` pin, fast-uri, vite, esbuild external `node:` imports, TypeScript 6 held back, `pnpm audit`.
  - Internal correctness with no user-visible surface: merge idempotency, frontmatter retarget policy, `listModels()` removal, JSON one-token repair, determinism fixes.
- **Verification**: `npm run gate` 4/4 green (tsc, eslint 0/0, vitest, astro build **82 pages** — 80 + the two new post routes). `shazam_verify` PASS.

## v1.27.0-web — 2026-08 · plugin v1.27.0
Catch-up sync covering `v1.26.0-web` → plugin `v1.27.0` (a MINOR release, 36 merge commits, 181 files). P0 corrections: three stale claims were real drift — the in-tree CLI was removed in v1.27.0 (the *Native CLI* chip still stands but the *Workflow Guide (9): The Headless CLI* blog post was rewritten end-to-end to point at the published `karpathywiki-cli` npm package, including the warning that `npx llm-wiki` resolves to an unrelated registry package), the "10-language output" chip became 11 (Russian was already in scope but the chip never moved), and the FAQ's hardcoded `Obsidian v1.11.0` was lifted in favor of "current stable desktop" to drop the maintenance tax (per AGENTS.md rule #3). P1 additions: the *Document Ingest* feature card was widened from PDF-only to PDF + images + Office documents (the new built-in MinerU backend), AWS Bedrock was added to the Providers grid (with the *OpenAI-Compatible* generic slot retired to keep the count at 12), and a new *Announcement: v1.27.0* blog post was added in EN+ZH as the v1.27.0 release overview, drawing from upstream Discussion #555.

- **Version**: plugin `v1.27.0` (released 2026-08-27; MinerU backend, AWS Bedrock SSO/IAM, source-page verbatim quotes, Fix Dead Links leave-it, ingest candidate gate, per-step task policies, headless CLI repo split), website tracks it as `v1.27.0-web`.
- **Claims introduced**:
  - *Document Ingest* card widened to "Any document becomes a source" — PDF + images + Office through the new built-in MinerU backend, with five on-ramps (MinerU, native cloud providers, Apple Silicon local OCR, MinerU online UI, Force PDF Support). ZH `文档就是源`, EN `Any document becomes a source`, etc.
  - *AWS Bedrock* added to Providers grid (with *OpenAI-Compatible* generic slot retired to keep the count at 12) — three auth modes (API key / SSO / IAM), VPC / compliance path. Card subtitle: `Claude / GPT in your VPC`.
  - *Announcement: v1.27.0 — MinerU Joins Document Ingest, Bedrock SSO Lands, Stubs Stop Spamming* blog post (EN + ZH) — release overview anchored on upstream Discussion #555.
  - *Native CLI* chip kept in Features (CLI is now external at `npx karpathywiki-cli`; chip label still captures the capability).
- **Claims corrected**:
  - Headless-cli blog post (EN + ZH) rewritten to use `npx karpathywiki-cli`; old `pnpm llm-wiki` / `tools/llm-wiki-cli/run-llm-wiki.mjs` paths are stale since v1.27.0.
  - pdf-ingest-guide blog post (EN + ZH) — GPT-4o-class reference retired in favor of "current multimodal model"; MinerU section reframed as built-in backend; five on-ramps documented; new section on source-page verbatim quotes (`Mentions in Source` now wired into `sources/<slug>.md`).
  - FAQ entry "What does it cost and what do I need?" — `Obsidian v1.11.0` → "Obsidian desktop (latest stable)" across all 11 locales.
- **Out of scope** (kept in plugin CHANGELOG / docs, not on landing page per AGENTS.md rule #3):
  - Per-step task policies (#525), ingest candidate gate (#514) — settings-level, not user-facing surface.
  - `npm audit` HIGH→0, composite-key probe caches, complementary-append leak fix, duplicate policy entry error — engineering hygiene, not user outcomes.
- **Verification**: `npm run gate` 4/4 green (tsc, eslint, vitest, astro build).

## v1.26.0-web — 2026-08 · plugin v1.26.0
Catch-up sync from `v1.25.9-web` → current plugin `v1.26.0` (a MINOR release). Per scope decision, only the two user-visible headline changes make it to the landing page; the rest of the delta stays in the plugin CHANGELOG / docs.

- **Version**: plugin `v1.26.0` (released 2026-08-05; headless CLI, dedup speedup, Russian i18n, dedup thresholds, force-disable thinking), website tracks it as `v1.26.0-web`.
- **Claims introduced**:
  - *Native CLI* chip in the Features `moreCapabilities` pool — the headless ingest CLI (`llm-wiki` / `pnpm llm-wiki`) presented as a first-party interface. ZH `Agent 原生 CLI 接口`, EN `Native CLI`, etc.
  - *Smooth on huge vaults* chip — the dedup speedup (2141-page vault dedup wall-time 979s → 151s) framed as a user outcome, not a metric (per AGENTS.md rule #3). ZH `海量笔记也流畅`, EN `Smooth on huge vaults`, etc.
  - *Workflow Guide (9): The Headless CLI* blog post (EN + ZH) covering what the CLI does, the key flags, and where it fits.
- **Verification**: `npm run gate` 4/4 green (tsc, eslint, vitest 48/48, astro build 78 pages).

## v1.25.1-web — 2026-07 · plugin v1.25.1
Sync covers the v1.24.0 → v1.25.0 → v1.25.1 delta. Implemented across 7 per-site-area commits for easy review and rollback:

1. **feat(i18n): add PDF ingest + per-task models keys (EN baseline)** — `types.ts` adds required `pdfIngestTitle/Desc/Tag` (v1.25.0 main 9-card) and optional `perTaskModelsTitle/Desc` (v1.24.0 chip-only). `en.ts` upgrades hero subtitle to "notes, PDFs, web clips", adds the 5 new keys, extends `providers.contextNote` with the "Ollama and LM Studio run fully on-device" clause, appends 3 FAQ items (PDFs, per-task models, offline PDF ingest).
2. **feat(i18n): sync PDF ingest + per-task models to 10 non-EN locales** — all 10 non-EN locales translated via 5 parallel Subagents (2 locales each) plus a final cross-locale QA reviewer. Fixed UTF-8 mojibake (`de.ts`), script-mixing bug (`ko.ts`), hallucinations, decimal-convention normalization (`fr.ts` 0,5B, `pt.ts` 0,5B). `perTaskModels*` registered in `KNOWN_GAPS` since they're optional chip-only entries with EN fallback.
3. **feat(features): add PDF Ingest card to main 9-card grid (v1.25.0)** — Features.astro inserts PDF Ingest at priority 8 (icon: `file-text`, now registered in Icon.astro ICON_MAP). `granularity` demoted from priority 9 to `alwaysChips` row to preserve the 4/6/9 responsive rhythm without a 10-card grid reshuffle. `perTaskModelsTitle` joins alwaysChips when locale supplies it.
4. **docs(blog): add PDF ingest guide (workflow-guides #8, EN+ZH)** — `pdf-ingest-guide.md`. Covers the correctness-ordered pipeline (provider gate precedes cache lookup), provider matrix (native: anthropic/openai/bedrock-*; force toggle: custom/anthropic-compatible; never: ollama/lmstudio/deepseek/glm), verbatim transcriber prompt with `[illegible]`/`[figure]`/`[equation]` anti-hallucination markers, three-defense cache housekeeping (10 MB single-entry / 100 MB LRU / prepareBatchIngest TTL), default cache-only behavior + opt-in vault sidecar rationale, fully-offline Apple Silicon path (oMLX + Markitdown + Baidu Unlimited-OCR 3B/0.5B), common failure modes.
5. **docs(blog): add local model selection guide (getting-started #5, EN+ZH)** — `choosing-local-models.md`. Three reasons to run local (privacy / network / cost), hardware tiers (Apple Silicon unified memory, NVIDIA VRAM, CPU-only), model shortlist per task (Ingest/Lint/Query) — Qwen3.5, Qwen3.6, Gemma 4, DeepSeek-V3, MoE variants (35B-A3B / 122B-A10B), four pre-built configurations, the context-length trap (empirical PPR-cascade token distribution shows 32K context is enough), MLX vs GGUF, Q-level selection, Per-Task Models setting walkthrough, when to go hybrid.
6. **docs(blog): add Query pipeline deep-dive (inside-the-system #7, EN+ZH)** — `query-engine-pipeline.md`. The 4-phase buildWikiContext pipeline (read-index → select-seeds → load-pages → assemble-context), the 5-stage seed selector inside Phase 2 (lex → LLM keywords → keyword scan → legacy LLM → PPR → FALLBACK), five design choices that diverge from vanilla RAG (lex-then-PPR beats vector-then-rerank at small-medium scale; five stages so LLM augmentation never blocks hot path; local substring scan > LLM 50-candidate; pureLLM is a first-class state; pageSummaryHint replaces full wiki index), plus the Bug C 3.0 `__WIKI_FOLDER__` placeholder fix. Cost/latency empirical table for each stage.
7. **chore(release): align website version with plugin v1.25.1 (v1.25.1-web)** — README, AGENTS.md, package.json bumped to v1.25.1-web. History entries rewritten to use `v{X.Y.Z}-web` naming with explicit plugin mapping (the section was then called "Optimization history" inside `README.md`; it became this file later). 5 new memory files capturing version-sync convention, i18n required-key vs KNOWN_GAPS distinction, PDF Ingest feature shape, query pipeline architecture, blog post commit pipeline.

**Verification across all 7 commits**: `npm run gate` 4/4 green at each step (tsc, eslint, vitest 48/48, astro build). Page count progression: 70 → 70 → 70 → 72 → 74 → 76.

## v1.25.0-web — 2026-07 · plugin v1.25.0
[superseded by v1.25.1-web — initial PDF Ingest + Per-Task Models landing]

## v1.23.0-web — 2026-07 · plugin v1.23.0 → v1.25.0
- **About pages in 9 missing locales** — zh-tw, ja, ko, de, es, fr, pt, it, ru about pages created, translated from EN baseline with full contributor list and corrected sources/ mechanism
- **Nav/Footer About links fixed** — non-EN locale Nav/Footer aboutPath uses LANGUAGES table instead of binary `locale === 'zh'` check
- **MC PPR internals blog post** — depth-dive on Monte Carlo Personalized PageRank algorithm, code annotation, tuning table, cascade architecture (EN + ZH)
- **Series order suffixes** — all 5 series titles annotated with `(n)` suffix; announcement series excluded as event-driven
- **Related links rewrite** — all related links fields across 46 posts rewritten for higher functional relevance
- **Mermaid rendering** — astro-mermaid@2.1.0 integration for Mermaid diagram rendering
- **Mermaid mobile overflow fixed** — `overflow-x: hidden` on `<html>`, `overflow: clip` on `<body>`, prose pre SVG force-fit
- **BlogPost mobile responsive** — flex → grid for article footer links (2x2 on mobile), text-xs, prose font-size adjustment
- **Footer mobile layout** — flex-wrap gap layout for footer links on mobile
- **Double scrollbar fixed** — removed duplicate `<main>` wrapper in BlogPostLayout, fixed html/body overflow strategy
- **TOC scripts fixed** — extra `()` caused `addEventListener is not a function` error; querySelector CJK bug fixed via getElementById
- **Pre-delivery Gate** — `npm run gate` passes cleanly (tsc, eslint, vitest, astro build)
- **All 11 locales** synced with about pages

## v3.1.0 — 2026-06 · plugin v1.23.x
- **Trust demoted into Features** — removed standalone Trust section; its three claims live as `features.finalized` (What you finalize, stays) and `features.history` (Every change, traceable) cards, with the third absorbed into the existing `citations` card
- **Privacy reframed** — `providers.privacyTitle` rewritten as "Privacy first" / "隐私第一" across 11 locales (was "What you write, stays yours" — vague, read as a tagline)
- **Providers re-titled** — "Your AI. Your rules." → "Your model. Your rules." (matches Nav chip "Models" / "AI 模型")
- **Features 9+1 layout** — 9 main cards (organize, conversational, bidirectional, autoMaintenance, smartFix, finalized, citations, tags, granularity) + 1 always-chip (history). Responsive: 4 cards on mobile, 6 on tablet, 9 on desktop. Demoted titles collapse into the existing "more capabilities" pill row (no separate chip section)
- **Features cleanup** — removed redundant ASCII micro-code snippets from every card
- **Nav slimmed** — 8 → 5 items; removed `nav.providers` and `nav.trust` from the i18n contract; FAQ section still exists with `#faq` anchor
- **Icon library** — added `history` icon (lucide clock + arrow)
- **Pre-delivery Gate** — `npm run gate` runs `tsc --noEmit` → `eslint --max-warnings 0` → `vitest run` → `astro build` in sequence. Any non-zero exit stops the chain. Documented in AGENTS.md as the contract for "done"
- **WikiDemo cleanup** — removed unused `ScenarioIcon` declaration
- **All 11 locales** synced (en, zh, zh-hant, ja, ko, de, es, fr, pt, it, ru)

## v3.0.0 — 2026-06
- **3 new locales**: Italian (`it`), Russian (`ru`, preview), Traditional Chinese (`zh-tw`)
- **Scenarios migrated to i18n** — was a hardcoded EN+ZH `.tsx` file; now 11 per-locale files under `src/i18n/locales/scenarios/`
- **WikiDemo refactored** — removed all `locale === 'zh'` binary checks; reads from typed scenarios object directly. Replaced `React.ReactNode` with `[[token]]` string markers in chatAnswerLead
- **i18n parity tests expanded** — 9 new scenarios parity tests, 48/48 total passing
- **Blog content revisions** — Session-level clipping philosophy for chat history post; locale-specific product examples

## v2.2.0 — 2026-04
- Content Collections migration for blog (Astro 6 official pattern, `glob` loader)
- Trust section + reframed Providers with BYOAI pillars

## v2.0.0 — 2026
- React-to-Astro migration
- Chinese blog (20 posts)
- i18n routing with static pages per language

Earlier v1.x versions (v1.0 → v1.9): initial landing page, FAQ section, FR/PT/JA/KO/DE/ES i18n expansion, KnowledgeGrowth animation, Tailwind v4 migration. Full commit history in `git log`.
