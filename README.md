# LLM Wiki for Obsidian — Landing Page

Marketing website for the [Obsidian LLM Wiki plugin](https://github.com/green-dalii/obsidian-llm-wiki), an AI-powered self-organizing knowledge base.

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** — fast dev server and build
- **Tailwind CSS 3.4** — utility-first styling with custom Obsidian theme
- **GSAP** — scroll-triggered animations via ScrollTrigger
- **lucide-react** — consistent icon system
- **i18n** — built-in English/Chinese translation

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build (tsc + vite)
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Project Structure

```
src/
  App.tsx              Root component, GSAP plugin registration
  main.tsx             Entry point
  index.css            Global styles, Tailwind layers, CSS variables
  components/
    Header.tsx          Fixed header with nav, language toggle
    Hero.tsx            Landing section with animated background
    ProgressBar.tsx     Scroll progress indicator
    Philosophy.tsx      Problem/solution narrative
    WikiDemo.tsx        Interactive 5-step demo
    Comparison.tsx      Before/after comparison grid
    Architecture.tsx    Three-layer architecture visualization
    Features.tsx        Feature cards with images
    Ecosystem.tsx       Obsidian ecosystem integration cards
    Providers.tsx       LLM provider grid
    Footer.tsx          Site footer
    KnowledgeGraphGenesis.tsx  Canvas-based animated background
  i18n/
    index.tsx           i18n context and hook
    translations.ts     English and Chinese translation strings
  public/              Static images (features, ecosystem, OG image)
```

## Architecture

- **Single-page scroll layout** — no routing, all sections rendered inline
- **Component-per-section** — each section is a self-contained component
- **Centralized GSAP registration** — ScrollTrigger registered once in App.tsx
- **Type-safe i18n** — translations use typed interface, no `any` casts
- **Canvas animations** — KnowledgeGraphGenesis uses raw Canvas 2D API for the hero background

## License

MIT
