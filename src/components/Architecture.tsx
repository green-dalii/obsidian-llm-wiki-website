import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';

export default function Architecture() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [flowPhase, setFlowPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setFlowPhase(p => (p + 1) % 3), 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.arch-pipeline', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const layers = [
    {
      id: 'sources',
      path: t.architecture.sourcesPath,
      title: t.architecture.sourcesTitle,
      desc: t.architecture.sourcesDesc,
      dot: 'bg-obsidian-amber',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      id: 'engine',
      path: t.architecture.enginePath,
      title: t.architecture.engineTitle,
      desc: t.architecture.engineDesc,
      dot: 'bg-obsidian-purple',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
    },
    {
      id: 'wiki',
      path: t.architecture.wikiPath,
      title: t.architecture.wikiTitle,
      desc: t.architecture.wikiDesc,
      dot: 'bg-obsidian-gold',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.architecture.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.architecture.title}</h2>
          <p className="text-obsidian-muted max-w-lg mx-auto text-sm">{t.architecture.subtitle}</p>
        </div>

        <div className="arch-pipeline">
          {/* Pipeline track */}
          <div className="hidden md:block mb-4 h-px relative">
            <div className="absolute inset-x-[15%] top-0 h-px bg-[#333]" />
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-obsidian-purple transition-all duration-[2800ms] ease-in-out"
              style={{ left: flowPhase === 0 ? '15%' : flowPhase === 1 ? '50%' : '85%', boxShadow: '0 0 10px rgba(139,92,246,0.5)' }} />
          </div>

          {/* Cards + arrows inline */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
            {layers.map((layer, i) => (
              <div key={layer.id} className="flex flex-col md:flex-row items-stretch flex-1">
                {/* Card — default desc visible (semi-transparent), highlighted when active phase */}
                <div className={`flex-1 p-5 rounded-xl border transition-all duration-700 min-h-[200px] flex flex-col ${
                  flowPhase === i ? 'border-obsidian-purple/30 bg-[#2a2a2a]' : 'border-[#333] bg-[#262626]/50'
                }`}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className={`w-2 h-2 rounded-full ${layer.dot} transition-all duration-500 ${flowPhase === i ? 'scale-125' : ''}`} />
                    <span className="font-mono text-xs text-obsidian-muted">{layer.path}</span>
                    <span className="ml-auto text-obsidian-dim">{layer.icon}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#e5e5e5] mb-2">{layer.title}</h3>
                  <p className={`text-xs text-obsidian-muted leading-relaxed flex-1 transition-all duration-700 ${
                    flowPhase === i ? 'opacity-100' : 'opacity-50'
                  }`}>{layer.desc}</p>
                  {/* Phase indicator dots */}
                  <div className="mt-auto pt-3 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${flowPhase === i ? layer.dot : 'bg-[#333]'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 delay-75 ${flowPhase === i ? layer.dot : 'bg-[#333]'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 delay-150 ${flowPhase === i ? layer.dot : 'bg-[#333]'}`} />
                  </div>
                </div>

                {/* Arrow */}
                {i < layers.length - 1 && (
                  <div className="flex items-center justify-center py-2 md:py-0 md:px-3">
                    <svg className="hidden md:block w-5 h-5 text-obsidian-purple/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <svg className="md:hidden w-5 h-5 text-[#333]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
