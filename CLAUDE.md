# Project Instructions - Karpathy LLM Wiki Website

## Critical Quality Standards (MUST REMEMBER)

**You MUST ALWAYS maintain the highest quality standards.**

- **NO deadline pressure** - User explicitly stated there is no hard completion time requirement
- **NO rushing** - Never sacrifice quality for speed
- **Sufficient resources** - You have ample token budget and maximum thinking effort available
- **Maximum quality** - Every task must be completed at the highest possible standard
- **Never compromise** - If quality drops, STOP and reassess immediately

### Before considering any task "complete":

1. **Verify ALL components are present and working** — every locale renders, every section shows
2. **Verify ALL content is visible and correct** — no fallback English strings leaking into non-EN pages
3. **Verify ALL animations and interactions work** — WikiDemo steps, scenario switching, language switcher
4. **Verify ALL styling is applied correctly** — no Tailwind warnings about canonical classes
5. **Test thoroughly - no missing pieces** — see the "Verification" section below

## Project Overview

Astro-based landing page for the Karpathy LLM Wiki Obsidian plugin. Implements Andrej Karpathy's LLM Wiki concept: AI reads notes, extracts entities/concepts, generates interconnected wiki pages with bidirectional links, and supports conversational query against your own knowledge base.

**Project name**: "Karpathy LLM Wiki" (formerly "LLM Wiki for Obsidian"). Always refer to it as "Karpathy LLM Wiki" in user-facing copy.

**Version**: v1.25.9-web (current). Tracks the plugin release (v1.25.9) it documents; the website does not auto-update on every plugin patch — only when you manually trigger a sync. See `README.md` "Optimization history" for the per-version change log.

## Tech stack

| Layer | Tools |
|-------|-------|
| Framework | Astro 6.2 (static output, Islands) |
| UI | React 19 (interactive components only) |
| Styling | Tailwind CSS 4.3 (CSS-first), `@tailwindcss/typography` (blog) |
| Animation | CSS transitions + `IntersectionObserver` (in `scroll-reveal.ts`) |
| Canvas | Custom 2D (`KnowledgeGrowth.tsx`, `WikiGraphStage.tsx`) |
| Content | Astro Content Collections (`src/content.config.ts`, `glob` loader) |
| i18n | Per-locale modules in `src/i18n/locales/` |
| Icons | `lucide-react` (React) + inline SVG (Astro) |

## Project structure (current)

```
src/
├── pages/                       # 11 homepages + blog routes
│   ├── index.astro              # EN landing (auto-redirects by browser language)
│   ├── {zh,zh-tw,ja,ko,de,es,fr,pt,it,ru}/index.astro
│   ├── blog/index.astro         # EN blog index (tag filter)
│   ├── blog/posts/[...slug].astro
│   └── zh/blog/...              # ZH blog
├── components/
│   ├── astro/                   # Static Astro components (zero JS)
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProgressBar.astro
│   │   ├── Hero.astro
│   │   ├── Comparison.astro
│   │   ├── Features.astro
│   │   ├── Trust.astro
│   │   ├── Providers.astro
│   │   ├── Ecosystem.astro
│   │   ├── Install.astro
│   │   ├── FAQ.astro
│   │   ├── CTA.astro
│   │   └── Icon.astro
│   ├── WikiDemo.tsx             # Multi-step interactive demo (state machine)
│   ├── WikiDemoIsland.tsx       # React island wrapper
│   ├── HeroBackgroundIsland.tsx
│   ├── KnowledgeGrowth.tsx      # Canvas 2D organic animation
│   ├── WikiGraphStage.tsx       # Canvas graph for WikiDemo
│   ├── MacWindow.tsx
│   └── BoldLink.tsx
├── data/
│   └── graphLayouts.ts          # WikiDemo scenario graph layouts (positions, keyed by ScenarioId)
├── hooks/
│   └── useGraphPhysics.ts
├── layouts/
│   ├── BaseLayout.astro         # All pages — auto canonical/hreflang/JSON-LD
│   ├── BlogLayout.astro         # Blog index — wraps BaseLayout with isBlog
│   └── BlogPostLayout.astro     # Blog post — three-column (TOC | content | related)
├── content.config.ts            # Content Collections schema
├── content/
│   ├── blog/                    # 20 EN posts (plain Markdown)
│   └── blog-zh/                 # 20 ZH posts
├── i18n/
│   ├── astro.ts                 # translations + getT() helpers
│   └── locales/
│       ├── types.ts             # Translations interface (single source of truth)
│       ├── index.ts             # Barrel
│       ├── {en,zh,zh-hant,ja,ko,de,es,fr,pt,it,ru}.ts
│       └── scenarios/           # WikiDemo scenario data (mirrored across locales)
│           ├── types.ts         # Scenario, ScenarioId, ScenarioExtractedItem, ScenarioGeneratedPage
│           ├── index.ts         # Barrel
│           └── {en,zh,zh-tw,...}.ts
├── scripts/
│   └── scroll-reveal.ts         # Shared IntersectionObserver reveal animations
└── index.css                    # Tailwind v4 entry, global tokens
```

## i18n architecture

**11 locales** with bidirectional parity enforced by TypeScript (compile-time) and Vitest parity tests (run-time):

- `en` (default, `/`), `zh` (`/zh/`), `zh-tw` (`/zh-tw/`), `ja` (`/ja/`), `ko` (`/ko/`), `de` (`/de/`), `es` (`/es/`), `fr` (`/fr/`), `pt` (`/pt/`), `it` (`/it/`), `ru` (`/ru/`)

**Translation contract**: `src/i18n/locales/types.ts` exports `Translations` interface that every locale must conform to. Missing fields fail TypeScript build.

**Scenarios i18n** (WikiDemo data): 11 per-locale files under `src/i18n/locales/scenarios/`, each exporting 6 fully-translated `Scenario` objects. Decouples business content from React:
- `chatAnswerLead.text` uses `[[token]]` markers that the component parses into bold wiki-style links
- `icon` is a string (e.g., `'heart'`) that `WikiDemo.tsx` resolves via `SCENARIO_ICON_MAP`
- Tests: `tests/i18n-parity.test.ts` includes 9 scenarios parity tests covering count, IDs, shape, `[[token]]` preservation, and Traditional Chinese character coverage

**Parity test workflow**:
1. Edit `src/i18n/locales/{locale}.ts`
2. Run `npx vitest run tests/i18n-parity.test.ts`
3. If locale is incomplete, add an entry to `KNOWN_GAPS` registry with `path` + `reason`
4. **When `KNOWN_GAPS` is empty**, the test runs in hard-fail mode — any gap fails the build

**Adding a new locale**:
1. Create `src/i18n/locales/{locale}.ts` (conform to `Translations`)
2. Create `src/i18n/locales/scenarios/{locale}.ts` (full 6 scenarios)
3. Register in both `index.ts` barrels
4. Add to `Header.astro` `LANGUAGES`, `BaseLayout.astro` `ALL_LOCALES`, `astro.config.mjs` `i18n.locales` and `sitemap.i18n.locales`
5. Create `src/pages/{locale}/index.astro`
6. Update root `src/pages/index.astro` browser-redirect `map`
7. Run `npx vitest run` to confirm parity

## Blog architecture (Content Collections, Astro 6 official)

```
src/content.config.ts                — defineCollection + zod schema, glob loader (NOT type: 'content')
src/content/blog/*.md                — 20 EN posts, plain Markdown
src/content/blog-zh/*.md             — 20 ZH posts, plain Markdown
src/pages/blog/posts/[...slug].astro — EN dynamic route: getCollection + render
src/pages/zh/blog/posts/[...slug].astro — ZH dynamic route
```

**Key Content Collections rules:**
- Config at `src/content.config.ts` (NOT `src/content/config.ts`), uses `glob` loader from `astro/loaders`
- Content files are `.md` (not `.mdx` — no JSX needed for our blog content)
- Imports: `defineCollection, z` from `astro:content`; `glob` from `astro/loaders`
- Dynamic routes use `getCollection()` + `getStaticPaths()` + `render()` + `<Content />`
- All frontmatter must have closing `---` delimiter and `related` field
- Run `npx astro sync` after content changes to regenerate `.astro/content.d.ts`
- tsconfig.app.json must include `".astro"` in `include` array

### Blog layout architecture

**All layouts MUST reuse `BaseLayout`** — no HTML shell duplication:

- `BaseLayout.astro` is the single source of truth for `<!DOCTYPE>`, `<head>`, JSON-LD, `hreflang`, Header, Footer, ProgressBar
- `BlogLayout.astro` wraps `<BaseLayout isBlog>` for blog index pages
- `BlogPostLayout.astro` wraps `<BaseLayout isBlog>` for blog post pages — three-column (sticky TOC left, content center, related reading right, hidden mobile)
- `isBlog` prop on BaseLayout controls Header nav behavior:
  - `isBlog=true` → Header renders anchor items as real `<a href="/#features">` so clicks navigate to home + anchor
  - `isBlog=false` → Header renders them as `<button data-scroll-to="#features">` for in-page scroll
- **When you change BaseLayout props or Header, check both BlogLayout and BlogPostLayout propagate correctly**

### Blog Tag Taxonomy (3 categories, user-centric)

Tags are consolidated into 3 user-centric categories (not technical/functional ones):

| EN Tag | ZH Tag | User mindset | Typical content |
|--------|--------|--------------|-----------------|
| `getting-started` | `入门必读` | *"I haven't installed it yet / just installed"* | Basics, intro, first steps, multilingual support |
| `guides` | `实践指南` | *"I have it, how do I use it better?"* | Workflows, productivity, maintenance, specific feature guides |
| `announcement` | `公告` | *"What's new? Should I update?"* | Release announcements, major feature drops, version highlights |
| `internals` | `深入解析` | *"Why is it designed this way?"* | Architecture, design philosophy, technical deep-dives |

**Rules:**
- Multilingual/i18n content does **not** get its own category — it belongs in `getting-started`/`入门必读` because language support is a core product feature new users need to discover
- Maintenance articles (auto-maintenance, smart-fix) go in `guides`/`实践指南` because they are usage skills, not onboarding content
- No more than 3 tags per post; tags must be chosen from the table above

### Blog Features
- **Three-column desktop layout**: sticky TOC (left, hidden mobile) + content (center) + related reading (right, hidden mobile, shown at bottom)
- **TOC scroll tracking**: Active heading highlighted via `IntersectionObserver`-like JS in inline script
- **Tag filtering**: Client-side JS reads URL `?tag=` param, filters post cards, updates browser history
- **Related reading**: `related` frontmatter field → dynamic route resolves slugs to titles via `postsMap`
- **Article footer links**: Every blog post ends with a Links section — Obsidian plugin marketplace (primary CTA), GitHub repo, Discussions, Issues. Locale-aware labels.
- **ZH blog content must use `/zh/blog/posts/` paths**, never `/blog/posts/` (otherwise links to EN versions)

## WikiDemo architecture (post v3.0.0 refactor)

- `WikiDemo.tsx` reads scenarios from `scenariosTranslations[locale]` directly — NO `locale === 'zh'` binary checks
- Scenario data lives in `src/i18n/locales/scenarios/{locale}.ts`, NOT in any React data file
- `chatAnswerLead.text` uses `[[token]]` string markers — `WikiDemo.tsx` parses them via `renderChatAnswerLead()` and renders as `<span class="font-semibold text-obsidian-purple-light">`
- Scenario `icon` is a string (not React component) — `WikiDemo.tsx` resolves via `SCENARIO_ICON_MAP`
- `graphLayouts.ts` (in `src/data/`) imports `ScenarioId` from `src/i18n/locales/scenarios/types`

**If you see `locale === 'zh'` in WikiDemo.tsx, that's a regression** — it was removed in v3.0.0. The fix is always to read from the typed scenarios object directly.

## React Islands vs Astro components

| Component | Type | Why |
|-----------|------|-----|
| `Header.astro` | Astro + vanilla JS | State is minimal (mobile menu, language dropdown); vanilla JS handles it |
| `ProgressBar.astro` | Astro + vanilla JS | Just scroll listener |
| `Hero.astro`, `Comparison.astro`, etc. | Astro | Static content, zero JS |
| `WikiDemo.tsx` | React (island) | Multi-step state machine, scenarios, autoplay timer |
| `HeroBackgroundIsland.tsx` | React (island) | Canvas physics animation |
| `WikiGraphStage.tsx` | React | Canvas graph rendering |

## Critical Technical Notes

### Double Scrollbar Prevention
- **NEVER use `overflow-x-hidden` alone** without also setting `overflow-y`. Per CSS Overflow Module Level 3, setting one axis to non-`visible` forces the other axis to `auto`. This creates an extra scroll container → double scrollbars.
- For the outer wrapper div, use just `relative bg-obsidian-bg text-obsidian-text` without overflow constraints.

### Animation Delay Architecture
- Reveal animations use JS `IntersectionObserver` (in `scroll-reveal.ts`) to add `.is-visible` class with `setTimeout(delay * 80ms)`
- CSS provides the transition (`opacity`, `transform`) but must NOT set `transition-delay` — that causes double-delay when JS already handles timing
- `data-delay` attribute controls stagger order; CSS only sets shorter `transition-duration: 0.5s` for delayed elements

### Fixed Positioning & Viewport
- Use explicit `top: 0; left: 0; width: 100vw; height: 100vh;` for fixed overlay elements instead of `inset: 0`

### Blog Typography
- Uses `@tailwindcss/typography` plugin with `prose prose-invert` classes
- Dark theme CSS custom properties overridden in `BlogPostLayout.astro`
- BlogPostLayout accepts `locale` prop for i18n-aware UI (back link, date format, footer)

### BlogPostLayout isBlog Prop (v3.0.0 lesson learned)
- `BlogPostLayout.astro` MUST pass `isBlog` to `BaseLayout` — without it, Header renders anchor items as `<button data-scroll-to="#xxx">` which silently fails on blog post pages (no `#features`, `#faq`, etc. exist there)
- `BlogLayout.astro` does this correctly (line 7); `BlogPostLayout.astro` had the same pattern but missed the prop before v3.0.0

## Copywriting standard — Apple.com tier (MANDATORY for every section)

The website's user-facing copy is held to the same standard as apple.com product pages. This is the project's single, non-negotiable copywriting rule. Every new section, every card title, every description, every FAQ, every Trust entry must pass these filters before being merged.

### 1. Headline-first, plain-spoken, second-person

- Section labels are short, declarative phrases ("Privacy.", "Designed to Last.", "Why iPhone.")
- Feature titles read like a single confident line ("Last phone standing.", "Snap on a MagSafe Charger.")
- Descriptions lead with what the user gets, never with what the code does
- Use "you/your" liberally; avoid passive voice; avoid "the plugin provides…", "the system enables…"

### 2. Hard limits on length

- Card title: ≤ 8 words
- Card description: ≤ 28 words (single sentence preferred)
- Section title: ≤ 6 words
- Section subtitle: ≤ 18 words
- FAQ answer body: ≤ 80 words unless the question is structurally technical

If a sentence doesn't fit, **cut it**. Compression is a feature, not a bug.

### 3. Never expose implementation, version numbers, or engineering metrics

| Banned | Why | Use instead |
|---|---|---|
| `v1.25.3 起，所有 API 密钥都放在 Obsidian SecretStorage(macOS Keychain / Windows Credential Manager / Linux Secret Service)……` | Version number + triple-platform enumeration + mechanism name in one breath | "Your API keys stay in your system keychain. Always." |
| `GPT-4o`, `Claude 3.5 Sonnet`, `Gemini 1.5 Pro`, `Grok 4.1 Fast` | Version numbers go stale within months | Brand/series only: `Claude`, `GPT`, `Gemini`, `Grok` |
| `2,572 tests, 193 files`, `PPR @5 = 27.1%` | Engineering metrics ≠ user-facing guarantees | Move to blog / changelog / repo badge — never landing-page copy |
| `迁移自动完成；钥匙圈锁死时一条指令即可恢复` | Recovery procedure is for docs, not marketing | Omit |

Rule of thumb: if a reader 6 months from now would have to verify the number is still true, it doesn't belong on the landing page.

### 4. No duplicate statements across sections

- A fact stated in **Features** does not reappear in **Trust/Privacy**
- A fact stated in **Trust** does not reappear in **FAQ**
- A fact stated in **Hero subtitle** does not reappear in **Features** copy

Each section owns its own claim. If you can't tell which section "owns" a fact, **the fact doesn't belong on the page**.

### 5. No "showcasing" of honesty, simplicity, or baselines

- Don't add a banner that says "we're honest" — be honest in the copy itself
- Don't add a section that says "we're simple" — make the copy simple
- Don't add a card that says "we respect privacy" — the privacy-respecting fact in the next card already says it

Baselines are demonstrated, not announced.

### 6. Provider/model list ordering

- First entry is **the recommendation** (DeepSeek by default — best value, low cost, fits the wiki use case)
- Subsequent entries grouped by **deployment shape** (cloud flagship → cloud budget → fully local → aggregator)
- Never display version numbers, internal model codes, or per-model pricing
- No "best" / "recommended" badges — the position itself is the recommendation
- Default to ≤ 12 entries on the landing page; full provider list belongs in docs

### 7. Trust section rules (if a Trust section is warranted)

- Each item is a **behavior the user can verify by reading the source**
- Each item is ≤ 12 words in the body
- No version numbers, no test counts, no language count
- No implementation details (which keychain API, which OS, which migration tool) — those belong in docs
- Skip the section entirely if the count drops below 4 items — 3 honest guarantees > 6 padded ones

### 8. The "is this Apple-quality?" self-check

Before merging any new copy, read the section aloud and ask:

1. Would Apple write this on a product page?
2. If a reader 6 months later reads this, is every word still true?
3. Is there a single word I can cut without losing meaning?
4. Does this section own this fact, or am I duplicating another section?
5. Could a user who has never heard of LLM Wiki understand what they get?

If any answer is "no", **stop and rewrite** — do not ship.

---

## Pre-delivery Gate (run before claiming done)

A single command runs the full gate. Every check MUST exit 0 — 0 error, 0 warning, no exceptions.

```bash
npm run gate                     # runs scripts/gate.sh
```

The gate executes four checks in order and stops on first failure:

| # | Check | Command | What it catches |
|---|---|---|---|
| 1 | TypeScript | `tsc --noEmit` | type drift, missing fields, missing imports |
| 2 | ESLint | `eslint . --max-warnings 0` | unused vars, react-hooks rules, dead code |
| 3 | Vitest | `vitest run` | i18n parity (48/48), structural regressions |
| 4 | Astro Build | `astro build` | static-site generation, all 53 pages, broken imports |

**Never claim a task complete unless the gate passes cleanly.** IDE diagnostics may show
stale errors during partial edits — the gate is the single source of truth. The script
lives at `scripts/gate.sh` and is wired into `package.json` as `npm run gate`. Extend
the script (don't bypass it) when adding new check types.

If a check fails, fix the underlying issue — do not add `--no-verify` / `--max-warnings
999` / `.skip` to make the gate pass. Tolerated temporary gaps go in the
`KNOWN_GAPS` registry in `tests/i18n-parity.test.ts` with a `reason`.

Then in browser:
- `/` (English landing) — all sections render, WikiDemo steps + scenarios work
- `/blog/posts/<slug>/` — click Header's `Features`, `FAQ`, etc. — should navigate to `/#features`, `/#faq`
- `/ru/` — Russian homepage should show Russian copy, not English fallback
- `/zh-tw/` — Traditional Chinese (繁體中文), not Simplified

## Project conventions

- **Versioning**: this repo doesn't use `npm version`; versions are tracked in `README.md` "Optimization history" section as a manual changelog. Update it whenever you ship a meaningful change.
- **Commit messages**: Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`). Co-authored-by trailer.
- **Never commit without explicit user approval** — see [[Commit Approval]] in memory.
- **Don't preserve Tailwind v4 warnings** about canonical classes (`flex-shrink-0` → `shrink-0`, `break-words` → `wrap-break-word`, `h-[700px]` → `h-175`) — they're cosmetic, not errors, but also don't fix them mid-refactor as drive-by changes.