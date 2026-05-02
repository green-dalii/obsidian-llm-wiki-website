import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Network, Camera, Monitor, Table2, GitBranch, PenTool } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

const ICONS = [Network, Camera, Monitor, Table2, GitBranch, PenTool];

export default function Ecosystem() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.eco-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ecosystem" className="relative w-full py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.ecosystem.label}</span>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold mt-3 mb-3 text-obsidian-heading">{t.ecosystem.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-lg">{t.ecosystem.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {t.ecosystem.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="eco-card group rounded-lg border border-obsidian-border bg-obsidian-card/40 p-5 hover:border-obsidian-purple/25 hover:bg-white/[0.05] transition-all duration-250">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-7 h-7 rounded-md bg-obsidian-purple/10 border border-obsidian-purple/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-obsidian-purple-light" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-obsidian-heading mb-1">{item.name}</h3>
                    <p className="text-xs text-obsidian-dim leading-relaxed">{item.standalone}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px border-t border-dashed border-obsidian-purple/20 my-3" />

                {/* Amplified effect */}
                <div className="relative pl-3">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-obsidian-purple/30" />
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono text-obsidian-purple-light">+ LLM Wiki for Obsidian</span>
                  </div>
                  <p className="text-xs text-obsidian-heading leading-relaxed">{item.amplified}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-obsidian-dim">{t.ecosystem.cta}</span>
        </div>
      </div>
    </section>
  );
}
