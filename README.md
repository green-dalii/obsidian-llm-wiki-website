# LLM Wiki for Obsidian — Landing Page

Marketing website for the [Obsidian LLM Wiki plugin](https://github.com/green-dalii/obsidian-llm-wiki), an AI-powered self-organizing knowledge base.

## Tech Stack

- **Astro 6.1** — Static site generation with Islands architecture
- **React 19** — Interactive components (client-side hydration)
- **Tailwind CSS 3.4** — Utility-first styling with custom Obsidian theme
- **IntersectionObserver** — Scroll-triggered animations for static sections
- **Canvas 2D** — Organic "Knowledge Growth" animation for hero background
- **lucide-react** — Consistent icon system
- **i18n routing** — Static pages per language (EN: `/`, ZH: `/zh/`)

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
- HeroIsland — KnowledgeGrowth Canvas animation
- WikiDemoIsland — Interactive 5-step demo
- FooterIsland — Dynamic footer content
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
    astro/                Static Astro components (zero JS)
      Comparison.astro    Before/after comparison grid
      Features.astro      Feature cards with code snippets
      Install.astro       Installation guide
      Ecosystem.astro     Obsidian ecosystem integration
      Providers.astro     LLM provider grid
      Icon.astro          SVG icon component
    HeaderIsland.tsx      Navigation with language toggle
    HeroIsland.tsx        Hero with KnowledgeGrowth animation
    WikiDemoIsland.tsx    Interactive 5-step demo
    FooterIsland.tsx      Dynamic footer
    ProgressBar.tsx       Scroll progress
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
- Accessibility: **75/100** (待优化)
- Performance: **79/100** (英文), **63/100** (中文)

**Core Web Vitals:**
- CLS: **0** ✅ (零布局偏移)
- FCP: 1.6s (英文), 5.1s (中文首次加载)

**Bundle Size:**
- HTML: 13KB per page
- JavaScript: ~101KB total (React + components)
- CSS: 5.6KB
- Fonts: 64KB (Outfit + JetBrains Mono)

## Optimization Roadmap

### Completed ✅
- Astro migration from React SPA
- Static HTML rendering for SEO
- IntersectionObserver scroll animations
- i18n routing with static pages
- KnowledgeGrowth organic animation

### Pending (Optional)
- Font optimization (reduce weights, save 21KB)
- Accessibility fixes (ARIA labels, contrast ratios)
- Touch target size improvements

See `MEMORY.md` for detailed task list.

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
