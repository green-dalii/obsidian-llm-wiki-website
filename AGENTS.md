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

**Static Pages (Astro):**
- `/` — English homepage
- `/zh/`, `/ja/`, `/ko/`, `/de/`, `/es/`, `/fr/`, `/pt/` — Localized homepages
- `/blog/` — English blog index
- `/blog/posts/*.mdx` — English blog posts (8 articles)
- `/zh/blog/` — Chinese blog index
- `/zh/blog/posts/*.mdx` — Chinese blog posts (8 articles, translated)

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
- `BaseLayout.astro` — Shared layout for all homepage variants (auto-generates canonical, hreflang, JSON-LD)
- `BlogLayout.astro` — Blog index layout with locale support
- `BlogPostLayout.astro` — Blog post layout with @tailwindcss/typography prose styling

### Key Principles

- Each Astro component accepts `locale` prop to render single-language content
- No client-side DOM language switching - use routing instead
- All static content rendered as HTML, zero JS bundle for those sections
- Header and ProgressBar are pure Astro + vanilla JS (no React dependency)
- `BaseLayout` auto-generates canonical URL, hreflang links, and JSON-LD from locale prop
- Non-ZH languages navigate to English blog; only ZH has a separate blog

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
