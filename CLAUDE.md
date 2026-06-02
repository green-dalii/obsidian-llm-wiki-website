# Project Instructions - Karpathy LLM Wiki Website

## Critical Quality Standards (MUST REMEMBER)

**You MUST ALWAYS maintain the highest quality standards.**

- **NO deadline pressure** - User explicitly stated there is no hard completion time requirement
- **NO rushing** - Never sacrifice quality for speed
- **Sufficient resources** - You have ample token budget and maximum thinking effort available
- **Maximum quality** - Every task must be completed at the highest possible standard
- **Never compromise** - If quality drops, STOP and reassess immediately

### Before considering any task "complete":

1. **Verify ALL components are present and working**
2. **Verify ALL content is visible and correct**
3. **Verify ALL animations and interactions work**
4. **Verify ALL styling is applied correctly**
5. **Test thoroughly - no missing pieces**

## Project Overview

Astro-based landing page for Karpathy LLM Wiki plugin, migrated from React to Astro with proper i18n routing. Project name: "Karpathy LLM Wiki" (formerly "LLM Wiki for Obsidian").

### Current Architecture

**Blog: Content Collections (Astro 6 official pattern)**

```
src/content.config.ts                — Collection config: glob loader + zod schema (NOT type: 'content')
src/content/blog/*.md                — EN blog posts (8, pure Markdown, no layout wrapper)
src/content/blog-zh/*.md             — ZH blog posts (8, pure Markdown, no layout wrapper)
src/pages/blog/posts/[...slug].astro — EN dynamic route (getCollection + render)
src/pages/zh/blog/posts/[...slug].astro — ZH dynamic route
src/pages/blog/index.astro           — EN blog index (getCollection + client JS tag filter)
src/pages/zh/blog/index.astro        — ZH blog index (getCollection + client JS tag filter)
```

**Key rules for Content Collections:**
- Config at `src/content.config.ts` (not `src/content/config.ts`), uses `glob` loader from `astro/loaders`
- Content at `src/content/` (standard location), `.md` files (not `.mdx` — no JSX needed)
- Imports: `defineCollection, z` from `astro:content`; `glob` from `astro/loaders`
- Dynamic routes use `getCollection()` + `getStaticPaths()` + `render()` + `<Content />`
- No hardcoded post arrays — everything via `getCollection()`
- All frontmatter must have closing `---` delimiter and `related` field
- Run `npx astro sync` after content changes to regenerate `.astro/content.d.ts` types
- tsconfig.app.json must include `".astro"` in its `include` array for IDE type resolution

**Static Pages (Astro):**
- `/` — English homepage
- `/zh/`, `/ja/`, `/ko/`, `/de/`, `/es/`, `/fr/`, `/pt/` — Localized homepages
- `/blog/` — English blog index
- `/blog/posts/[slug]/` — English blog posts (dynamic)
- `/zh/blog/` — Chinese blog index
- `/zh/blog/posts/[slug]/` — Chinese blog posts (dynamic)

**Astro Components (zero JS):**
- `components/astro/Header.astro` — Full navigation with vanilla JS interactivity
- `components/astro/ProgressBar.astro` — Scroll progress bar with vanilla JS
- `components/astro/Footer.astro`
- `components/astro/Comparison.astro`
- `components/astro/Features.astro`
- `components/astro/Install.astro`
- `components/astro/Ecosystem.astro`
- `components/astro/Providers.astro`
- `components/astro/CTA.astro`
- `components/astro/FAQ.astro`
- `components/astro/Hero.astro`
- `components/astro/Icon.astro`

**React Islands (truly interactive, cannot be Astro):**
- `HeroBackgroundIsland.tsx` → `KnowledgeGrowth.tsx` — Canvas physics animation
- `WikiDemoIsland.tsx` → `WikiDemo.tsx` — Multi-step interactive demo
- `WikiGraphStage.tsx` — Canvas graph visualization
- `MacWindow.tsx` — Presentational (consumed by WikiDemo)
- `BoldLink.tsx` — Presentational (consumed by scenarios.tsx data)

**Layouts:**
- `BaseLayout.astro` — Shared layout for ALL pages (auto-generates canonical, hreflang, JSON-LD). Accepts optional `isBlog` prop for Header nav behavior.
- `BlogLayout.astro` — Blog index, reuses BaseLayout with `isBlog` prop
- `BlogPostLayout.astro` — Blog post, reuses BaseLayout. Three-column layout: sticky TOC (left, hidden mobile) + content (center) + related reading (right, hidden mobile, shown at bottom). Tags are clickable links. TOC scroll highlight via client JS.

### Key Principles

- Each Astro component accepts `locale` prop to render single-language content
- No client-side DOM language switching - use routing instead
- All static content rendered as HTML, zero JS bundle for those sections
- Header and ProgressBar are pure Astro + vanilla JS (no React dependency)
- `BaseLayout` auto-generates canonical URL, hreflang links, and JSON-LD from locale prop
- Non-ZH languages navigate to English blog; only ZH has a separate blog
- **All layouts MUST reuse BaseLayout** — no HTML shell duplication
- Header Logo link and anchor nav links are locale-aware

### Blog Features
- **Three-column layout** (desktop): TOC | Content | Related Reading
- **Sticky sidebars**: TOC and related reading don't scroll with content
- **TOC scroll tracking**: Active heading highlighted via IntersectionObserver-like JS
- **Tag filtering**: Client-side JS reads URL `?tag=` param, filters post cards, updates browser history
- **Related reading**: `related` frontmatter field → dynamic route resolves slugs to titles via `postsMap`
- **Article footer links**: Every blog post ends with a Links section — Obsidian plugin marketplace (primary CTA), GitHub repo, Discussions, Issues. Locale-aware labels.

### Blog Tag Taxonomy (3 categories, user-centric)

Tags are consolidated into 3 user-centric categories (not technical/functional ones):

| EN Tag | ZH Tag | User mindset | Typical content |
|--------|--------|--------------|-----------------|
| `getting-started` | `入门必读` | *"I haven't installed it yet / just installed"* | Basics, intro, first steps, multilingual support (product feature discovery) |
| `guides` | `实践指南` | *"I have it, how do I use it better?"* | Workflows, productivity tips, maintenance, specific feature guides |
| `internals` | `深入解析` | *"Why is it designed this way?"* | Architecture, design philosophy, technical deep-dives |

**Rules:**
- Multilingual/i18n content does **not** get its own category — it belongs in `getting-started`/`入门必读` because language support is a core product feature new users need to discover.
- Maintenance articles (auto-maintenance, smart-fix) go in `guides`/`实践指南` because they are usage skills, not onboarding content.
- No more than 3 tags per post; tags must be chosen from the table above.

### i18n

- 8 languages: EN, ZH, JA, KO, DE, ES, FR, PT
- Translations in `src/i18n/translations.ts` (~994 lines, all 8 languages)
- `src/i18n/astro.ts` exports `translations` object and `getT()` helper
- Blog: EN and ZH have full blog content; other languages link to EN blog

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
