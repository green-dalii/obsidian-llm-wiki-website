# Project Instructions - Obsidian LLM Wiki Website

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

Astro-based landing page for Obsidian LLM Wiki plugin, migrated from React to Astro with proper i18n routing.

### Current Architecture

**Static Pages (Astro):**
- `/` - English version
- `/zh/` - Chinese version

**Astro Components:**
- Comparison.astro
- Features.astro
- Install.astro
- Ecosystem.astro
- Providers.astro
- Footer.astro

**React Islands (Interactive):**
- HeaderIsland → Header.tsx
- HeroIsland → Hero.tsx
- WikiDemoIsland → WikiDemo.tsx
- ProgressBar.tsx

### Key Principles

- Each Astro component accepts `locale` prop to render single-language content
- No client-side DOM language switching - use routing instead
- All static content rendered as HTML, zero JS bundle for those sections
- React components use `client:only="react"` to skip SSR entirely

## Critical Technical Notes

### Double Scrollbar Prevention
- **NEVER use `overflow-x-hidden` alone** without also setting `overflow-y`. Per CSS Overflow Module Level 3, setting one axis to non-`visible` forces the other axis to `auto`. This creates an extra scroll container → double scrollbars.
- For the outer wrapper div, use just `relative bg-obsidian-bg text-obsidian-text` without overflow constraints.

### Animation Delay Architecture
- Reveal animations use JS `IntersectionObserver` (in page scripts) to add `.is-visible` class with `setTimeout(delay * 80ms)`
- CSS provides the transition (`opacity`, `transform`) but must NOT set `transition-delay` — that causes double-delay when JS already handles timing
- `data-delay` attribute controls stagger order; CSS only sets shorter `transition-duration: 0.5s` for delayed elements

### Fixed Positioning & Viewport
- Use explicit `top: 0; left: 0; width: 100vw; height: 100vh;` for fixed overlay elements instead of `inset: 0`