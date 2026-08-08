# Karpathy LLM Wiki — Landing Page

Marketing website for the [Karpathy LLM Wiki plugin](https://github.com/green-dalii/obsidian-llm-wiki) — an Obsidian plugin that implements Andrej Karpathy's LLM Wiki concept: AI reads your notes and weaves them into a structured, bidirectional-linked wiki.

**Live site**: https://llmwiki.greenerai.top/

## What's in this repo

A static site built with **Astro 6.2 + React 19 + Tailwind CSS 4.3**. The site has three surfaces:

1. **Marketing landing page** — Hero, WikiDemo, Features, Trust, Comparison, Providers, Ecosystem, Install, FAQ, CTA
2. **Blog** — Content Collections with EN/ZH posts, tag filtering, three-column post layout with sticky TOC and related-reading
3. **11-locale i18n** — `en` (default), `zh`, `zh-tw`, `ja`, `ko`, `de`, `es`, `fr`, `pt`, `it`, `ru`. Each locale has its own home page; ZH also has a full blog.

## Tech stack

| Layer | Tools |
|-------|-------|
| Framework | Astro 6.2 (static output, Islands architecture) |
| UI | React 19 (truly interactive components only) |
| Styling | Tailwind CSS 4.3 (CSS-first with `@theme`), `@tailwindcss/typography` (blog) |
| Animation | CSS transitions + `IntersectionObserver` (in `scroll-reveal.ts`) |
| Canvas | Custom 2D physics (`KnowledgeGrowth.tsx` for hero, `WikiGraphStage.tsx` for WikiDemo graph) |
| Content | Astro Content Collections (`src/content.config.ts`, `glob` loader) |
| i18n | Per-locale modules in `src/i18n/locales/`, scenarios mirrored in `src/i18n/locales/scenarios/` |
| Icons | `lucide-react` (React islands), inline SVG (Astro components) |

## Project structure

```
src/
├── pages/                       # 11 homepages + blog routes
│   ├── index.astro              # EN landing (auto-redirects by browser language)
│   ├── zh/                      # Chinese landing + blog
│   ├── blog/                    # EN blog index + posts
│   └── blog/posts/[...slug].astro  # EN blog post (Content Collections render)
├── components/
│   ├── astro/                   # Static Astro components (zero JS)
│   │   ├── Header.astro         # Nav, language switcher, GitHub stars
│   │   ├── Footer.astro
│   │   ├── ProgressBar.astro    # Top scroll progress bar (2px, fixed)
│   │   ├── Hero.astro
│   │   ├── Comparison.astro
│   │   ├── Features.astro       # 6 feature cards + 8 capability tags
│   │   ├── Trust.astro          # Traceability + finalization + contradiction surfacing
│   │   ├── Providers.astro      # 12-provider LLM grid + BYOAI pillars
│   │   ├── Ecosystem.astro      # Graph View, Web Clipper, Dataview, Git, Marp, Canvas
│   │   ├── Install.astro
│   │   ├── FAQ.astro
│   │   ├── CTA.astro
│   │   └── Icon.astro
│   ├── WikiDemoIsland.tsx        # React island wrapper
│   ├── WikiDemo.tsx             # Multi-step interactive demo (state machine)
│   ├── HeroBackgroundIsland.tsx # React island wrapper
│   ├── KnowledgeGrowth.tsx      # Canvas 2D organic growth animation
│   ├── WikiGraphStage.tsx       # Canvas graph for WikiDemo Step 4
│   ├── MacWindow.tsx            # Reusable macOS-style window chrome
│   └── BoldLink.tsx             # Bold inline link used in scenario chat
├── data/
│   └── graphLayouts.ts           # WikiDemo scenario graph layouts (positions)
├── hooks/
│   └── useGraphPhysics.ts        # Graph physics hook for WikiGraphStage
├── layouts/
│   ├── BaseLayout.astro          # All pages — auto canonical/hreflang/JSON-LD
│   ├── BlogLayout.astro          # Blog index — wraps BaseLayout with isBlog
│   └── BlogPostLayout.astro      # Blog post — three-column (TOC | content | related)
├── content.config.ts             # Content Collections: blog + blog-zh schemas
├── content/
│   ├── blog/                     # 20 EN posts
│   └── blog-zh/                  # 20 ZH posts
├── i18n/
│   ├── astro.ts                  # exports translations + getT() helpers
│   └── locales/
│       ├── types.ts              # Translations interface (single source of truth)
│       ├── index.ts              # Barrel
│       ├── {en,zh,zh-hant,ja,ko,de,es,fr,pt,it,ru}.ts
│       └── scenarios/            # WikiDemo scenario data, mirrored across locales
│           ├── types.ts          # Scenario interface (ScenarioId, chatAnswerLead as `[[token]]` text)
│           ├── index.ts          # Barrel
│           └── {en,zh,zh-tw,ja,ko,de,es,fr,pt,it,ru}.ts
├── scripts/
│   └── scroll-reveal.ts          # Shared IntersectionObserver-based reveal animations
└── index.css                     # Tailwind v4 entry, global tokens, animations
```

## Internationalization

11 locales with bidirectional parity enforced by both TypeScript (compile-time) and Vitest parity tests (run-time).

| Locale | URL | UI | Plugin parity | Notes |
|---|---|---|---|---|
| `en` | `/` | ✅ | ✅ | Default |
| `zh` | `/zh/` | ✅ | ✅ | Full ZH blog (20 posts) |
| `zh-tw` | `/zh-tw/` | ✅ | ✅ | Traditional Chinese (Karpathy / Taiwan variant) |
| `ja` | `/ja/` | ✅ | ✅ | |
| `ko` | `/ko/` | ✅ | ✅ | Coupang-adapted business scenario |
| `de` | `/de/` | ✅ | ✅ | |
| `es` | `/es/` | ✅ | ✅ | |
| `fr` | `/fr/` | ✅ | ✅ | |
| `pt` | `/pt/` | ✅ | ✅ | Brazilian Portuguese |
| `it` | `/it/` | ✅ | ✅ | |
| `ru` | `/ru/` | ✅ | ⚠️ preview | Russian is a website preview; plugin-side support planned |

### How locales work

- Each homepage is a fully static page: `src/pages/{locale}/index.astro`
- `BaseLayout` accepts `locale` and `ogLocale` props and auto-generates canonical URL, `hreflang` link tags (one per locale + `x-default`), and JSON-LD
- Translations live in `src/i18n/locales/{locale}.ts`; the `Translations` interface (`types.ts`) is the contract that all locales must satisfy
- Parity test: `tests/i18n-parity.test.ts` enforces (a) every locale covers every required top-level EN key, (b) no empty strings, (c) strict bidirectional parity vs EN with a known-gap registry for in-flight translations

### Scenarios (WikiDemo data)

The interactive 5-step WikiDemo uses scenario data that lives in its own i18n layer: `src/i18n/locales/scenarios/`. This decouples business content from React. Each scenario has:

- 6 locales × 6 scenarios = 66 fully-translated scenario files
- `chatAnswerLead.text` uses `[[token]]` markers that the component layer parses and renders as bold wiki-style links
- Scenarios are referenced by `ScenarioId` (`daily-life`, `reading`, `inspiration`, `creation`, `academic`, `business`); `graphLayouts.ts` provides canvas positions keyed by id

## Blog

20 EN + 20 ZH posts organized by 3 user-centric tags (no `i18n` tag — multilingual content is a product feature under `getting-started`).

| Tag (EN) | Tag (ZH) | User mindset |
|----------|----------|--------------|
| `getting-started` | `入门必读` | "I haven't installed it / just installed" |
| `guides` | `实践指南` | "I have it, how do I use it better?" |
| `internals` | `深入解析` | "Why is it designed this way?" |

Each blog post has three-column desktop layout: sticky TOC (left) → content (center) → related reading (right). Tag filtering on the blog index reads `?tag=` from the URL.

Content lives at `src/content/blog/` (EN) and `src/content/blog-zh/` (ZH) as plain Markdown. Schema is defined in `src/content.config.ts` using the `glob` loader from `astro/loaders`.

## Brand colors

| Token | Value | Use |
|-------|-------|-----|
| Background | `#0f0f0f` | Page background |
| Surface | `#1f1f1f` | Cards, panels |
| Purple (primary) | `#7c3aed` | Buttons, links, accents |
| Purple (light) | `#8b5cf6` | Hover/active |
| Purple (dark) | `#6d28d9` | Buttons with white text |

All purple values across Canvas animations, SVGs, and CSS use the official Obsidian palette.

## Development

```bash
npm install
npm run dev       # Start Astro dev server at http://localhost:3000
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint
npx vitest run    # i18n parity tests (currently 48/48 passing)
```

**Before considering work complete:**
1. `npx tsc --noEmit` — 0 errors
2. `npx vitest run` — all parity tests pass (48/48)
3. `npx astro build` — completes, no errors
4. Open the dev server in a browser, click through each locale's landing page and at least one blog post; check console for JS errors

## Deployment

### Cloudflare Pages (production)

- Auto-deploys on push to `main`
- Custom domain: `llmwiki.greenerai.top`
- Build: `npm run build` → `dist/`
- HK CDN edge nodes — fast access from mainland China

### Adding a new locale

1. Create `src/i18n/locales/{locale}.ts` conforming to `Translations`
2. Create `src/i18n/locales/scenarios/{locale}.ts` with all 6 scenarios + `Scenario[]`
3. Register both in their respective `index.ts` barrels
4. Add the locale code to `src/components/astro/Header.astro`'s `LANGUAGES` array
5. Add to `src/layouts/BaseLayout.astro`'s `ALL_LOCALES` const
6. Create `src/pages/{locale}/index.astro` (copy any existing locale homepage)
7. Update `astro.config.mjs` — both `i18n.locales` array and `sitemap.i18n.locales` object
8. Run `npx vitest run` — parity test enforces coverage

## Optimization history

Selected highlights; full version history lives in git log.

**Versioning convention**: the website tracks the plugin version it documents, suffixed with `-web` (e.g. plugin `v1.25.1` → website `v1.25.1-web`). The website does **not** auto-update on every plugin patch — when you trigger a sync, first read the plugin `CHANGELOG` between the last synced plugin version and the current one, then translate that delta into website changes. Each website version entry below records the corresponding plugin release it documents.

### v1.26.0-web (2026-08) — current. Plugin: v1.26.0

Catch-up sync from `v1.25.9-web` → current plugin `v1.26.0` (a MINOR release). Per scope decision, only the two user-visible headline changes make it to the landing page; the rest of the delta stays in the plugin CHANGELOG / docs.

- **Version**: plugin `v1.26.0` (released 2026-08-05; headless CLI, dedup speedup, Russian i18n, dedup thresholds, force-disable thinking), website tracks it as `v1.26.0-web`.
- **Claims introduced**:
  - *Native CLI* chip in the Features `moreCapabilities` pool — the headless ingest CLI (`llm-wiki` / `pnpm llm-wiki`) presented as a first-party interface. ZH `Agent 原生 CLI 接口`, EN `Native CLI`, etc.
  - *Smooth on huge vaults* chip — the dedup speedup (2141-page vault dedup wall-time 979s → 151s) framed as a user outcome, not a metric (per CLAUDE.md rule #3). ZH `海量笔记也流畅`, EN `Smooth on huge vaults`, etc.
  - *Workflow Guide (9): The Headless CLI* blog post (EN + ZH) covering what the CLI does, the key flags, and where it fits.
- **Verification**: `npm run gate` 4/4 green (tsc, eslint, vitest 48/48, astro build 78 pages).

### v1.25.1-web (2026-07). Plugin: v1.25.1
Sync covers the v1.24.0 → v1.25.0 → v1.25.1 delta. Implemented across 7 per-site-area commits for easy review and rollback:

1. **feat(i18n): add PDF ingest + per-task models keys (EN baseline)** — `types.ts` adds required `pdfIngestTitle/Desc/Tag` (v1.25.0 main 9-card) and optional `perTaskModelsTitle/Desc` (v1.24.0 chip-only). `en.ts` upgrades hero subtitle to "notes, PDFs, web clips", adds the 5 new keys, extends `providers.contextNote` with the "Ollama and LM Studio run fully on-device" clause, appends 3 FAQ items (PDFs, per-task models, offline PDF ingest).
2. **feat(i18n): sync PDF ingest + per-task models to 10 non-EN locales** — all 10 non-EN locales translated via 5 parallel Subagents (2 locales each) plus a final cross-locale QA reviewer. Fixed UTF-8 mojibake (`de.ts`), script-mixing bug (`ko.ts`), hallucinations, decimal-convention normalization (`fr.ts` 0,5B, `pt.ts` 0,5B). `perTaskModels*` registered in `KNOWN_GAPS` since they're optional chip-only entries with EN fallback.
3. **feat(features): add PDF Ingest card to main 9-card grid (v1.25.0)** — Features.astro inserts PDF Ingest at priority 8 (icon: `file-text`, now registered in Icon.astro ICON_MAP). `granularity` demoted from priority 9 to `alwaysChips` row to preserve the 4/6/9 responsive rhythm without a 10-card grid reshuffle. `perTaskModelsTitle` joins alwaysChips when locale supplies it.
4. **docs(blog): add PDF ingest guide (workflow-guides #8, EN+ZH)** — `pdf-ingest-guide.md`. Covers the correctness-ordered pipeline (provider gate precedes cache lookup), provider matrix (native: anthropic/openai/bedrock-*; force toggle: custom/anthropic-compatible; never: ollama/lmstudio/deepseek/glm), verbatim transcriber prompt with `[illegible]`/`[figure]`/`[equation]` anti-hallucination markers, three-defense cache housekeeping (10 MB single-entry / 100 MB LRU / prepareBatchIngest TTL), default cache-only behavior + opt-in vault sidecar rationale, fully-offline Apple Silicon path (oMLX + Markitdown + Baidu Unlimited-OCR 3B/0.5B), common failure modes.
5. **docs(blog): add local model selection guide (getting-started #5, EN+ZH)** — `choosing-local-models.md`. Three reasons to run local (privacy / network / cost), hardware tiers (Apple Silicon unified memory, NVIDIA VRAM, CPU-only), model shortlist per task (Ingest/Lint/Query) — Qwen3.5, Qwen3.6, Gemma 4, DeepSeek-V3, MoE variants (35B-A3B / 122B-A10B), four pre-built configurations, the context-length trap (empirical PPR-cascade token distribution shows 32K context is enough), MLX vs GGUF, Q-level selection, Per-Task Models setting walkthrough, when to go hybrid.
6. **docs(blog): add Query pipeline deep-dive (inside-the-system #7, EN+ZH)** — `query-engine-pipeline.md`. The 4-phase buildWikiContext pipeline (read-index → select-seeds → load-pages → assemble-context), the 5-stage seed selector inside Phase 2 (lex → LLM keywords → keyword scan → legacy LLM → PPR → FALLBACK), five design choices that diverge from vanilla RAG (lex-then-PPR beats vector-then-rerank at small-medium scale; five stages so LLM augmentation never blocks hot path; local substring scan > LLM 50-candidate; pureLLM is a first-class state; pageSummaryHint replaces full wiki index), plus the Bug C 3.0 `__WIKI_FOLDER__` placeholder fix. Cost/latency empirical table for each stage.
7. **chore(release): align website version with plugin v1.25.1 (v1.25.1-web)** — README, CLAUDE.md, package.json bumped to v1.25.1-web. Optimization history entries rewritten to use `v{X.Y.Z}-web` naming with explicit Plugin: mapping. 5 new memory files capturing version-sync convention, i18n required-key vs KNOWN_GAPS distinction, PDF Ingest feature shape, query pipeline architecture, blog post commit pipeline.

**Verification across all 7 commits**: `npm run gate` 4/4 green at each step (tsc, eslint, vitest 48/48, astro build). Page count progression: 70 → 70 → 70 → 72 → 74 → 76.

### v1.25.0-web (2026-07). Plugin: v1.25.0
[superseded by v1.25.1-web — initial PDF Ingest + Per-Task Models landing]

### v1.23.0-web (2026-07). Plugin: v1.23.0 → v1.25.0
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

### v3.1.0 (2026-06). Plugin: v1.23.x
- **Trust demoted into Features** — removed standalone Trust section; its three claims live as `features.finalized` (What you finalize, stays) and `features.history` (Every change, traceable) cards, with the third absorbed into the existing `citations` card
- **Privacy reframed** — `providers.privacyTitle` rewritten as "Privacy first" / "隐私第一" across 11 locales (was "What you write, stays yours" — vague, read as a tagline)
- **Providers re-titled** — "Your AI. Your rules." → "Your model. Your rules." (matches Nav chip "Models" / "AI 模型")
- **Features 9+1 layout** — 9 main cards (organize, conversational, bidirectional, autoMaintenance, smartFix, finalized, citations, tags, granularity) + 1 always-chip (history). Responsive: 4 cards on mobile, 6 on tablet, 9 on desktop. Demoted titles collapse into the existing "more capabilities" pill row (no separate chip section)
- **Features cleanup** — removed redundant ASCII micro-code snippets from every card
- **Nav slimmed** — 8 → 5 items; removed `nav.providers` and `nav.trust` from the i18n contract; FAQ section still exists with `#faq` anchor
- **Icon library** — added `history` icon (lucide clock + arrow)
- **Pre-delivery Gate** — `npm run gate` runs `tsc --noEmit` → `eslint --max-warnings 0` → `vitest run` → `astro build` in sequence. Any non-zero exit stops the chain. Documented in CLAUDE.md as the contract for "done"
- **WikiDemo cleanup** — removed unused `ScenarioIcon` declaration
- **All 11 locales** synced (en, zh, zh-hant, ja, ko, de, es, fr, pt, it, ru)

### v3.0.0 (2026-06)
- **3 new locales**: Italian (`it`), Russian (`ru`, preview), Traditional Chinese (`zh-tw`)
- **Scenarios migrated to i18n** — was a hardcoded EN+ZH `.tsx` file; now 11 per-locale files under `src/i18n/locales/scenarios/`
- **WikiDemo refactored** — removed all `locale === 'zh'` binary checks; reads from typed scenarios object directly. Replaced `React.ReactNode` with `[[token]]` string markers in chatAnswerLead
- **i18n parity tests expanded** — 9 new scenarios parity tests, 48/48 total passing
- **Blog content revisions** — Session-level clipping philosophy for chat history post; locale-specific product examples

### v2.2.0 (2026-04)
- Content Collections migration for blog (Astro 6 official pattern, `glob` loader)
- Trust section + reframed Providers with BYOAI pillars

### v2.0.0 (2026)
- React-to-Astro migration
- Chinese blog (20 posts)
- i18n routing with static pages per language

Earlier v1.x versions (v1.0 → v1.9): initial landing page, FAQ section, FR/PT/JA/KO/DE/ES i18n expansion, KnowledgeGrowth animation, Tailwind v4 migration. Full commit history in `git log`.

## Documentation

- **Project instructions**: [CLAUDE.md](CLAUDE.md)
- **Deployment guide**: [docs/cloudflare-pages-deployment.md](docs/cloudflare-pages-deployment.md)
- **Astro migration plan**: [docs/astro-migration-plan.md](docs/astro-migration-plan.md)

## License

MIT