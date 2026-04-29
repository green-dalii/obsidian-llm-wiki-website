import { useRef, useEffect } from 'react';
import gsap from 'gsap';
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
    { title: t.features.organizeTitle, tag: t.features.organizeTag, desc: t.features.organizeDesc, image: '/feat-organize.jpg' },
    { title: t.features.bidirectionalTitle, tag: t.features.bidirectionalTag, desc: t.features.bidirectionalDesc, image: '/feat-links.jpg' },
    { title: t.features.conversationalTitle, tag: t.features.conversationalTag, desc: t.features.conversationalDesc, image: '/feat-chat.jpg' },
    { title: t.features.autoMaintenanceTitle, tag: t.features.autoMaintenanceTag, desc: t.features.autoMaintenanceDesc, image: '/feat-maintain.jpg' },
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
            <div key={f.title} className="feature-card group rounded-xl border border-[#333] bg-[#262626]/40 overflow-hidden hover:border-[#3a3a3a] transition-colors duration-300">
              <div className="relative h-40 sm:h-44 overflow-hidden bg-[#1e1e1e]">
                <img src={f.image} alt={f.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-500 group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626] via-[#262626]/50 to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-obsidian-purple" />
                  <span className="text-[10px] font-mono text-obsidian-purple tracking-wider uppercase">{f.tag}</span>
                </div>
                <h3 className="text-base font-semibold text-[#e5e5e5] mb-2">{f.title}</h3>
                <p className="text-sm text-obsidian-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
