import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, Check } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

export default function Comparison() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll('.compare-row');
      rows?.forEach((row, i) => {
        gsap.fromTo(row, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.comparison.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.comparison.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-md mx-auto">{t.comparison.subtitle}</p>
        </div>

        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-2 gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-obsidian-dim" />
            <span className="text-xs font-mono text-obsidian-dim uppercase tracking-wider">{t.comparison.beforeLabel}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-obsidian-purple" />
            <span className="text-xs font-mono text-obsidian-purple-light uppercase tracking-wider">{t.comparison.afterLabel}</span>
          </div>
        </div>

        <div className="space-y-4">
          {t.comparison.items.map((item, i) => (
            <div key={i} className="compare-row grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 group">
              {/* Before */}
              <div className="rounded-lg border border-obsidian-border bg-obsidian-bg/60 p-4 md:p-5 transition-colors duration-300 hover:border-obsidian-border-light opacity-70">
                <div className="flex items-center gap-2 mb-2.5 md:hidden">
                  <span className="text-[10px] font-mono text-obsidian-dim uppercase tracking-wider">{t.comparison.beforeLabel}</span>
                  <span className="text-[10px] font-mono text-obsidian-muted">— {item.category}</span>
                </div>
                <div className="hidden md:flex items-center gap-2 mb-2.5">
                  <X className="w-3.5 h-3.5 text-obsidian-dim flex-shrink-0" />
                  <span className="text-xs font-mono text-obsidian-dim">{item.category}</span>
                </div>
                <p className="text-sm text-obsidian-dim leading-relaxed">{item.before}</p>
              </div>

              {/* After */}
              <div className="rounded-lg border border-obsidian-purple/25 bg-obsidian-purple/[0.05] p-4 md:p-5 relative overflow-hidden transition-all duration-300 hover:border-obsidian-purple/40 shadow-[0_0_30px_rgba(139,92,246,0.06)]">
                <div className="flex items-center gap-2 mb-2.5 md:hidden">
                  <span className="text-[10px] font-mono text-obsidian-purple-light uppercase tracking-wider">{t.comparison.afterLabel}</span>
                  <span className="text-[10px] font-mono text-obsidian-muted">— {item.category}</span>
                </div>
                <div className="hidden md:flex items-center gap-2 mb-2.5">
                  <Check className="w-3.5 h-3.5 text-obsidian-purple-light flex-shrink-0" />
                  <span className="text-xs font-mono text-obsidian-purple-light">{item.category}</span>
                </div>
                <p className="text-sm text-obsidian-muted leading-relaxed">{item.after}</p>
                <div className="absolute top-0 right-0 w-20 h-20 bg-obsidian-purple/5 rounded-full blur-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
