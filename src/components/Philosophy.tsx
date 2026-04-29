import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useI18n } from '../i18n/use-i18n';

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

        <div className="space-y-14">
          {hooks.map((h, i) => (
            <div key={i} className="philosophy-line relative">
              <p className={`leading-snug ${
                h.type === 'pain'
                  ? 'text-[clamp(1.15rem,2.8vw,1.5rem)] text-obsidian-muted font-light'
                  : h.type === 'solution'
                  ? 'text-[clamp(1.25rem,3vw,1.65rem)] text-obsidian-heading font-normal'
                  : 'text-[clamp(1.25rem,3vw,1.65rem)] text-obsidian-heading font-normal'
              }`}>
                {h.text}
              </p>
              <div className={`mt-4 h-px w-12 ${
                h.type === 'pain' ? 'bg-obsidian-amber/20' : 'bg-obsidian-purple/25'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
