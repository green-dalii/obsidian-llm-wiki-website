import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { FileText, Sparkles, BookOpen, ArrowRight, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

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
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'engine',
      path: t.architecture.enginePath,
      title: t.architecture.engineTitle,
      desc: t.architecture.engineDesc,
      dot: 'bg-obsidian-purple',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      id: 'wiki',
      path: t.architecture.wikiPath,
      title: t.architecture.wikiTitle,
      desc: t.architecture.wikiDesc,
      dot: 'bg-obsidian-gold',
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.architecture.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.architecture.title}</h2>
          <p className="text-obsidian-muted max-w-lg mx-auto text-sm">{t.architecture.subtitle}</p>
          <div className="mt-5 flex items-center justify-center gap-6 text-xs font-mono text-obsidian-dim">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-amber" />{t.hero.legendSources}</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-gold" />{t.hero.legendEntities}</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-obsidian-purple" />{t.hero.legendConcepts}</span>
          </div>
        </div>

        <div className="arch-pipeline relative">
          {/* Ambient glow behind pipeline */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-obsidian-purple/[0.04] rounded-full blur-3xl pointer-events-none" />
          {/* Pipeline track */}
          <div className="hidden md:block mb-4 h-px relative">
            <div className="absolute inset-x-[15%] top-0 h-px bg-obsidian-border" />
            <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-obsidian-purple transition-all ease-in-out"
              style={{ left: flowPhase === 0 ? '15%' : flowPhase === 1 ? '50%' : '85%', boxShadow: '0 0 10px rgba(139,92,246,0.5)', transitionDuration: '2800ms' }} />
          </div>

          {/* Cards + arrows inline */}
          <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
            {layers.map((layer, i) => (
              <div key={layer.id} className="flex flex-col md:flex-row items-stretch flex-1">
                {/* Card — default desc visible (semi-transparent), highlighted when active phase */}
                <div className={`flex-1 p-5 rounded-xl border transition-all duration-700 min-h-[200px] flex flex-col ${
                  flowPhase === i ? 'border-obsidian-purple/30 bg-obsidian-panel' : 'border-obsidian-border bg-obsidian-surface/50'
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
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${flowPhase === i ? layer.dot : 'bg-obsidian-border'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 delay-75 ${flowPhase === i ? layer.dot : 'bg-obsidian-border'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 delay-150 ${flowPhase === i ? layer.dot : 'bg-obsidian-border'}`} />
                  </div>
                </div>

                {/* Arrow */}
                {i < layers.length - 1 && (
                  <div className="flex items-center justify-center py-2 md:py-0 md:px-3">
                    <ArrowRight className="hidden md:block w-5 h-5 text-obsidian-purple/40" />
                    <ChevronDown className="md:hidden w-5 h-5 text-[#333]" />
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
