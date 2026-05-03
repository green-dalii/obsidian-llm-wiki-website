import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Github, ExternalLink } from 'lucide-react';
import KnowledgeGrowth from './KnowledgeGrowth';
import { translations } from '../i18n/astro';

interface Props {
  locale?: 'en' | 'zh';
}

export default function Hero({ locale = 'en' }: Props) {
  const t = locale === 'zh' ? translations.zh : translations.en;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const children = contentRef.current?.children;
      if (!children) return;
      gsap.fromTo(
        children,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.4 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <KnowledgeGrowth />
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-obsidian-border bg-obsidian-card/80 backdrop-blur-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-obsidian-purple opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-obsidian-purple" />
          </span>
          <span className="text-xs font-mono text-obsidian-muted tracking-wide">{t.hero.badge}</span>
        </div>

        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight text-obsidian-heading leading-[1.1] mb-6">
          {t.hero.title1}
          <br />
          <span className="text-obsidian-purple-light">{t.hero.title2}</span>
        </h1>

        <p className="text-lg text-obsidian-muted max-w-xl mx-auto mb-10 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://github.com/green-dalii/obsidian-llm-wiki/releases" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-obsidian-purple-dark hover:bg-obsidian-purple text-white font-medium text-sm transition-colors duration-200">
            <Github className="w-4 h-4" />
            {t.hero.ctaInstall}
          </a>
          <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-obsidian-border text-obsidian-muted text-sm font-medium hover:text-obsidian-heading hover:border-obsidian-border-light transition-colors duration-200">
            {t.hero.ctaRead}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <a href="https://github.com/green-dalii/obsidian-llm-wiki" target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-obsidian-dim hover:text-obsidian-muted transition-colors">
          <img src="https://img.shields.io/github/stars/green-dalii/obsidian-llm-wiki?style=social&label=Stars" alt="GitHub Stars" className="h-5" loading="lazy" width="76" height="20" />
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono text-obsidian-muted tracking-[0.2em] uppercase">{t.hero.scrollHint}</span>
        <div className="w-px h-6 bg-gradient-to-b from-obsidian-muted to-transparent" />
      </div>
    </section>
  );
}
