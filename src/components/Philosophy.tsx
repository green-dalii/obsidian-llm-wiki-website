import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.philosophy-line');
      items?.forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 35 }, {
          opacity: 1, y: 0, duration: 0.9, delay: i * 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const hooks = [
    { text: t.philosophy.hook1, type: 'pain' as const },
    { text: t.philosophy.hook2, type: 'pain' as const },
    { text: t.philosophy.hook3, type: 'solution' as const },
    { text: t.philosophy.hook4, type: 'benefit' as const },
  ];

  return (
    <section ref={sectionRef} id="philosophy" className="relative w-full py-28 sm:py-36">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.philosophy.label}</span>
          <div className="w-8 h-px bg-obsidian-purple/30 mt-3" />
        </div>

        <div className="space-y-10">
          {hooks.map((h, i) => (
            <div key={i} className="philosophy-line flex gap-4">
              <div className="flex-shrink-0 mt-0.5">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[11px] font-mono font-bold border ${
                  h.type === 'pain'
                    ? 'bg-obsidian-amber/10 text-obsidian-amber border-obsidian-amber/25'
                    : h.type === 'solution'
                    ? 'bg-obsidian-purple/10 text-obsidian-purple-light border-obsidian-purple/25'
                    : 'bg-emerald-500/8 text-emerald-400 border-emerald-500/20'
                }`}>
                  {i + 1}
                </span>
              </div>
              <p className={`text-base sm:text-lg leading-relaxed ${
                h.type === 'pain' ? 'text-obsidian-muted' : 'text-[#e5e5e5]'
              }`}>
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
