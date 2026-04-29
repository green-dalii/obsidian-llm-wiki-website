import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';

const CARDS = [
  { image: '/eco-graph.jpg' },
  { image: '/eco-clipper.jpg' },
  { image: '/eco-marp.jpg' },
  { image: '/eco-dataview.jpg' },
  { image: '/eco-git.jpg' },
  { image: '/eco-canvas.jpg' },
];

export default function Ecosystem() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.eco-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ecosystem" className="relative w-full py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.ecosystem.label}</span>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.ecosystem.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-lg">{t.ecosystem.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.ecosystem.items.map((item, i) => (
            <div key={i} className="eco-card group rounded-xl border border-[#333] bg-[#262626]/40 overflow-hidden hover:border-obsidian-purple/25 hover:bg-obsidian-purple/[0.03] transition-all duration-200">
              {/* Illustration */}
              <div className="relative h-36 sm:h-40 overflow-hidden bg-[#1e1e1e]">
                <img src={CARDS[i].image} alt={item.name} className="w-full h-full object-cover opacity-40 group-hover:opacity-65 transition-all duration-500 group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/50 to-transparent" />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-[#e5e5e5] mb-2">{item.name}</h3>
                <p className="text-xs text-obsidian-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-obsidian-dim italic">{t.ecosystem.cta}</span>
        </div>
      </div>
    </section>
  );
}
