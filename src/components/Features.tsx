import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Layers, Link2, MessageSquare, RefreshCw } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

export default function Features() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.feature-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { title: t.features.organizeTitle, tag: t.features.organizeTag, desc: t.features.organizeDesc, icon: Layers },
    { title: t.features.bidirectionalTitle, tag: t.features.bidirectionalTag, desc: t.features.bidirectionalDesc, icon: Link2 },
    { title: t.features.conversationalTitle, tag: t.features.conversationalTag, desc: t.features.conversationalDesc, icon: MessageSquare },
    { title: t.features.autoMaintenanceTitle, tag: t.features.autoMaintenanceTag, desc: t.features.autoMaintenanceDesc, icon: RefreshCw },
  ];

  return (
    <section ref={sectionRef} id="features" className="relative w-full py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.features.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.features.title}</h2>
          <p className="text-obsidian-muted max-w-lg text-sm">{t.features.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f) => (
            <div key={f.title} className="feature-card group rounded-xl border border-obsidian-border bg-obsidian-surface/40 overflow-hidden hover:border-obsidian-purple/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] transition-all duration-300">
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-obsidian-purple/15 border border-obsidian-purple/25 flex items-center justify-center">
                    <f.icon className="w-4 h-4 text-obsidian-purple-light" />
                  </div>
                  <span className="text-[10px] font-mono text-obsidian-purple tracking-wider uppercase">{f.tag}</span>
                </div>
                <h3 className="text-base font-semibold text-obsidian-heading mb-2">{f.title}</h3>
                <p className="text-sm text-obsidian-muted leading-relaxed mb-3">{f.desc}</p>

                {/* Micro code snippet */}
                <div className="rounded-md bg-obsidian-bg border border-obsidian-border px-3 py-2 font-mono text-xs text-obsidian-dim">
                  {i === 0 && (
                    <div>
                      <span className="text-obsidian-amber">sources/</span>article.md<br/>
                      <span className="text-obsidian-muted">  ↓ (auto)</span><br/>
                      <span className="text-obsidian-purple">wiki/</span>entities/...<br/>
                      <span className="text-obsidian-purple">wiki/</span>concepts/...
                    </div>
                  )}
                  {i === 1 && (
                    <div>
                      <span className="text-obsidian-purple">[[Page A]]</span> ↔ <span className="text-obsidian-purple">[[Page B]]</span><br/>
                      <span className="text-obsidian-muted">  auto-linked</span><br/>
                      <span className="text-obsidian-muted">  graph grows</span>
                    </div>
                  )}
                  {i === 2 && (
                    <div>
                      <span className="text-obsidian-muted">Ask:</span> "How does X relate to Y?"<br/>
                      <span className="text-obsidian-purple">  → [[X]]</span> + [[Y]] cited<br/>
                      <span className="text-obsidian-muted">  → saved as wiki page</span>
                    </div>
                  )}
                  {i === 3 && (
                    <div>
                      <span className="text-obsidian-muted">file watcher</span>: ON<br/>
                      <span className="text-obsidian-muted">lint</span>: weekly<br/>
                      <span className="text-obsidian-muted">health check</span>: startup<br/>
                      <span className="text-obsidian-muted">  (default: OFF)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
