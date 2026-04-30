import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Download, FolderOpen, Settings, Terminal } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

const STEPS = [
  { num: '01', icon: Download, titleKey: 'step1Title' as const, descKey: 'step1Desc' as const, hasButton: true },
  { num: '02', icon: FolderOpen, titleKey: 'step2Title' as const, descKey: 'step2Desc' as const, hasButton: false },
  { num: '03', icon: Settings, titleKey: 'step3Title' as const, descKey: 'step3Desc' as const, hasButton: false },
  { num: '04', icon: Terminal, titleKey: 'step4Title' as const, descKey: 'step4Desc' as const, hasButton: false },
];

export default function Install() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.install-step');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="install" className="relative w-full py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.install.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.install.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-lg mx-auto">{t.install.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="install-step relative p-5 rounded-xl border border-obsidian-border bg-obsidian-surface/30 hover:border-obsidian-purple/25 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-obsidian-purple/10 border border-obsidian-purple/20 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-obsidian-purple-light" />
                  </div>
                  <span className="text-[10px] font-mono text-obsidian-dim">{s.num}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#e5e5e5] mb-2">{t.install[s.titleKey]}</h3>
                <p className="text-xs text-obsidian-muted leading-relaxed flex-1">{t.install[s.descKey]}</p>
                {s.hasButton && (
                  <a
                    href="https://github.com/green-dalii/obsidian-llm-wiki/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1e1e1e] bg-obsidian-purple rounded-lg hover:bg-obsidian-purple-light transition-colors w-fit"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t.install.cta}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
