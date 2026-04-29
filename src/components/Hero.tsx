import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import KnowledgeGraphGenesis from './KnowledgeGraphGenesis';
import { useI18n } from '../i18n';

export default function Hero() {
  const { t } = useI18n();
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
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, #1e1e1e 75%)' }}
      />
      <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-t from-[#1e1e1e] via-transparent to-[#1e1e1e]/30" />

      <div className="absolute inset-0 z-0">
        <KnowledgeGraphGenesis />
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#333] bg-[#262626]/60 backdrop-blur-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-obsidian-purple opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-obsidian-purple" />
          </span>
          <span className="text-xs font-mono text-obsidian-muted tracking-wide">{t.hero.badge}</span>
        </div>

        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight text-[#e5e5e5] leading-[1.1] mb-6">
          {t.hero.title1}
          <br />
          <span className="text-obsidian-purple-light">{t.hero.title2}</span>
        </h1>

        <p className="text-lg text-obsidian-muted max-w-xl mx-auto mb-10 leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="https://github.com/green-dalii/obsidian-llm-wiki/releases" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-obsidian-purple hover:bg-obsidian-purple-light text-[#1e1e1e] font-medium text-sm transition-colors duration-200">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {t.hero.ctaInstall}
          </a>
          <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#333] text-obsidian-muted text-sm font-medium hover:text-[#e5e5e5] hover:border-[#444] transition-colors duration-200">
            {t.hero.ctaRead}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-xs font-mono text-obsidian-dim">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-amber" />{t.hero.legendSources}</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-gold" />{t.hero.legendEntities}</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-purple" />{t.hero.legendConcepts}</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] font-mono text-obsidian-muted tracking-[0.2em] uppercase">{t.hero.scrollHint}</span>
        <div className="w-px h-6 bg-gradient-to-b from-obsidian-muted to-transparent" />
      </div>
    </section>
  );
}
