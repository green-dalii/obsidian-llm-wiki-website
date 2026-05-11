# LLM Wiki for Obsidian — Landing Page

Marketing website for the [Obsidian LLM Wiki plugin](https://github.com/green-dalii/obsidian-llm-wiki), an AI-powered self-organizing knowledge base.

## Tech Stack

- **Astro 6.2** — Static site generation with Islands architecture
- **React 19** — Interactive components (client-side hydration)
- **Tailwind CSS 4.3** — CSS-first utility styling with @theme directive
- **IntersectionObserver** — Scroll-triggered animations for static sections
- **Canvas 2D** — Organic "Knowledge Growth" animation for hero background
- **lucide-react** — Consistent icon system
- **i18n routing** — Static pages per language (EN: `/`, ZH: `/zh/`)

## Brand Consistency

**Official Obsidian Colors (as of 2026-04-30):**
- Background: **#0f0f0f** (deeper, matches Obsidian app)
- Surface/Card: **#1f1f1f** (gray background for panels)
- Primary Purple: **#7c3aed** (Obsidian's brand purple)
- Primary Light: **#8b5cf6** (hover/active states)
- Primary Dark: **#6d28d9** (buttons with white text)

All purple values in Canvas animations, SVGs, and CSS have been unified to official Obsidian palette.

## Architecture

### Islands Architecture

**Static Sections (Zero JS):**
- Comparison (Astro)
- Features (Astro)
- Install (Astro)
- Ecosystem (Astro)
- Providers (Astro)

**Interactive Islands (React):**
- HeaderIsland — Navigation, language toggle, GitHub stars
- HeroBackgroundIsland — KnowledgeGrowth Canvas animation (client:load)
- WikiDemoIsland — Interactive 5-step demo (client:visible)
- ProgressBar — Scroll progress indicator

### Key Benefits

- **HTML-first rendering:** 88KB static HTML vs empty React div
- **SEO perfect:** 100/100 Lighthouse score
- **Zero layout shift:** CLS = 0
- **Selective hydration:** Only interactive components load JS
- **Performance:** Reduced JS bundle from 130KB to ~40KB effective

## Development

```bash
npm install
npm run dev       # Start Astro dev server at localhost:3000
npm run build     # Production build → dist/
npm run preview   # Preview production build at localhost:3000
npm run lint      # ESLint
```

## Project Structure

```
src/
  pages/
    index.astro           English landing page (static HTML)
    zh/index.astro        Chinese landing page (static HTML)
  components/
    astro/                Static Astro components (zero JS, SSR)
      Comparison.astro    Before/after comparison grid
      Features.astro      Feature cards with code snippets
      Install.astro       Installation guide
      Ecosystem.astro     Obsidian ecosystem integration
      Providers.astro     LLM provider grid
      Hero.astro          Hero section with CSS animations
      Footer.astro        Contact email + links
      Icon.astro          SVG icon component
    HeaderIsland.tsx      Navigation with language toggle
    WikiDemoIsland.tsx    Interactive 5-step demo
    ProgressBar.tsx       Scroll progress
    HeroBackgroundIsland.tsx  KnowledgeGrowth Canvas animation
    KnowledgeGrowth.tsx   Canvas 2D organic growth animation
  i18n/
    astro.ts              Translation strings for both languages
  index.css               Global styles, Tailwind layers, reveal animations
  scripts/
    scroll-reveal.ts      IntersectionObserver scroll animations
dist/                     Built static site (HTML + assets)
```

## Deployment

### Cloudflare Pages (Recommended)

**Why Cloudflare Pages:**
- ✅ China access faster (Hong Kong CDN nodes)
- ✅ No base path configuration needed
- ✅ Preview URLs for each commit
- ✅ Unlimited bandwidth and builds
- ✅ Automatic HTTPS and CDN

**Deploy steps:**
1. Push to GitHub: `git@github.com:green-dalii/obsidian-llm-wiki-website.git`
2. Cloudflare Dashboard → Pages → Connect GitHub repo
3. Build command: `npm run build`, Output: `dist`
4. Auto-deploy on push to main branch
5. Get URL: `https://llm-wiki.pages.dev/`

**See detailed guide:** [docs/cloudflare-pages-deployment.md](docs/cloudflare-pages-deployment.md)

### GitHub Pages (Alternative)

Add base path in `astro.config.mjs`:
```js
base: '/obsidian-llm-wiki/'
```

Deploy via GitHub Actions. **Not recommended** for China users (slow access due to GFW).

## Performance Metrics

**Lighthouse Scores:**
- SEO: **100/100** ✅
- Best Practices: **96/100** ✅
- Accessibility: **85/100** (improved with ARIA labels, contrast fixes, touch targets)
- Performance: **79/100** (英文), **63/100** (中文首次加载)

**Core Web Vitals:**
- CLS: **0** ✅ (零布局偏移)
- FCP: 1.6s (英文), 5.1s (中文首次加载)

**Bundle Size:**
- HTML: 68KB (EN), 69KB (ZH) — full static content with SEO meta
- JavaScript: ~405KB total (React runtime + islands + Canvas graph physics)
- CSS: 38KB (Tailwind v4 CSS-first, JIT tree-shaken)
- Fonts: 94KB (Outfit + JetBrains Mono self-hosted woff2)

## Accessibility Improvements (2026-04-30)

**Completed:**
- ✅ Font weight optimization (removed 300, 700, 800 for Outfit; removed 600 for JetBrains Mono)
- ✅ Color contrast improvements (dim text #6b6b6b → #8a8a8a, purple buttons use #7c3aed with white text)
- ✅ Touch target fixes (WikiDemo step indicators: 6px → 24px clickable area)
- ✅ ARIA labels (Header menu buttons, WikiDemo play/pause, step indicators with aria-current)
- ✅ Favicon redesigned (BookOpen icon + Obsidian purple border, matches official branding)

## Optimization History

### v1.4.0 (2026-05-11) ✅
- **SEO overhaul** — Correct domain migration (llmwiki.greenerai.top), sitemap with both locales, hreflang x-default, robots.txt fix, JSON-LD for ZH page
- **Meta description rewrite** — Aligned with GitHub repo description and README philosophy
- **Contact email in footer** — JS-based anti-spam obfuscation (hi@greenerai.top)
- **Font self-hosting** — Outfit + JetBrains Mono as local woff2, no external font requests (LCP +150-250ms)
- **Hero SSR** — Static content (badge, title, CTA) rendered in HTML, instant LCP. GSAP replaced with CSS animations
- **WikiDemo lazy load** — Changed to `client:visible`, 122KB JS deferred
- **HeroBackgroundIsland** — Canvas animation uses `client:load` for immediate hydrate
- **og-image refresh** — Replaced generic screenshot with plugin banner (llm_wiki_banner.jpg → 47KB WebP)
- **Scroll-reveal shared module** — Extracted duplicated 70-line inline scripts to shared file
- **Tailwind 4.0 → 4.3** — Build performance improvements
- **Code cleanup** — Removed 7 unused React-to-Astro migration files, 7 unused devDependencies

### v1.3.1 (2026-05-08) ✅
- Apple-standard copywriting polish — Iterative EN/ZH translation refinement across 3 rounds
- Removed personification (pages don't "know" or "breathe", software doesn't "栖息")
- Fixed `organizeTag: ' effortless'` bug (English string with space in ZH locale)
- Natural Chinese nav labels — conversational, benefit-oriented, synced with section labels
- Unified tone: confident simplicity, active verbs, everyday language, emotional resonance

### v1.3.0 (2026-05-07) ✅
- Hero UI enhancement — Obsidian install guidance, Karpathy concept link, layout optimization
- Install section improvements — Step 1 dual-download buttons, Step 2 SVG icons using standard Lucide paths with vertical centering
- WikiDemo Step 3 visual refinement — Darker file tree panel (#161616), proper Obsidian color hierarchy
- KnowledgeGrowth animation — Particle count reduced 20% (47 → 38) for cleaner visual
- Footer expansion — Added Obsidian.md official link
- CTA animation sync — Added reveal class for consistent scroll-triggered fade-in
- WikiDemo scenario buttons — Increased height for better touch targets

### v1.2.0 (2026-05-07) ✅
- WikiDemo content redesign — 6 new scenarios with real-world examples (Daily Life, Deep Reading, Inspiration, Content Creation, Academic Research, Business Decision)
- Obsidian-style split layout for WikiDemo Step 2 (file tree + Markdown preview)
- Unified hover effects across all cards (CSS class hierarchy: .card → .card-hover → .card-purple)
- New CTA section after Providers with i18n support
- Graph physics optimization (reduced node clumping, satellite nodes)
- Border styling unification (WikiDemo components now use consistent border-obsidian-border)
- MacWindow component extraction (reusable macOS mock window)
- Scenario content research via subagents (James Clear, Paul Graham, Farnam Street, 晚点LatePost, 人物, 知识分子)

### Completed ✅
- Astro migration from React SPA
- Static HTML rendering for SEO
- IntersectionObserver scroll animations
- i18n routing with static pages
- KnowledgeGrowth organic animation
- Tailwind v4 migration (@tailwindcss/vite, CSS-first config)
- Obsidian official color palette unification
- Accessibility improvements (ARIA, contrast, touch targets)
- Font weight optimization
- Favicon redesign
- WikiDemo layout fixes (Step 3 padding, prevent indicator occlusion)
## i18n

- **English:** `/` (default, no prefix)
- **Chinese:** `/zh/` (prefix)

Static HTML per language, no client-side language switching.Hreflang tags configured for SEO.

## Documentation

- **Project instructions:** [CLAUDE.md](CLAUDE.md)
- **Deployment guide:** [docs/cloudflare-pages-deployment.md](docs/cloudflare-pages-deployment.md)
- **Migration plan:** [docs/astro-migration-plan.md](docs/astro-migration-plan.md)

## License

MIT
