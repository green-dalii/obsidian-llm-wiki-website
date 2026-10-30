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

## Version history

Every release of this site — what changed, which plugin release it documents, and
what was deliberately kept off it — is recorded in **[CHANGELOG.md](CHANGELOG.md)**.
That file also states the `-web` versioning convention, and the numbering switch
that makes the entries non-monotonic.

## Documentation

- **Project instructions**: [AGENTS.md](AGENTS.md)
- **Version history**: [CHANGELOG.md](CHANGELOG.md)
- **Active sync plan**: [ROADMAP.md](ROADMAP.md)
- **Deployment guide**: [docs/cloudflare-pages-deployment.md](docs/cloudflare-pages-deployment.md)
- **Astro migration plan**: [docs/astro-migration-plan.md](docs/astro-migration-plan.md)

## License

MIT