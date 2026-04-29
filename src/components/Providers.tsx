import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Lightbulb } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

const PROVIDERS = [
  { name: 'DeepSeek', model: 'v4 Pro / Flash', context: '1M', status: 'Cloud', badge: 'bestValue' },
  { name: 'Google', model: 'Gemini 3.1 Pro', context: '1M', status: 'Cloud' },
  { name: 'Moonshot', model: 'Kimi K2.6', context: '256K', status: 'Cloud' },
  { name: 'Xiaomi', model: 'Mimo-V2.5 Pro', context: '1M', status: 'Cloud' },
  { name: 'Anthropic', model: 'Claude Opus 4.7', context: '1M', status: 'Cloud' },
  { name: 'OpenAI', model: 'GPT-5.5', context: '1M', status: 'Cloud' },
  { name: 'OpenRouter', model: 'Universal API', context: 'Varies', status: 'Cloud' },
  { name: 'Ollama', model: 'Any local model', context: 'Varies', status: 'Local' },
];

export default function Providers() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.provider-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 25 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="providers" className="relative w-full py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.providers.label}</span>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold mt-3 mb-2 text-[#e5e5e5]">{t.providers.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-md mx-auto">{t.providers.subtitle}</p>
        </div>

        <div className="mb-6 flex items-start gap-2.5 p-3 rounded-lg border border-obsidian-purple/20 bg-obsidian-purple/[0.04]">
          <Lightbulb className="w-4 h-4 text-obsidian-purple-light flex-shrink-0 mt-0.5" />
          <p className="text-xs text-obsidian-muted leading-relaxed">{t.providers.contextNote}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PROVIDERS.map((p) => (
            <div key={p.name} className={`provider-card group p-3.5 rounded-lg border transition-all duration-200 ${
              p.badge === 'bestValue' ? 'border-obsidian-amber/30 bg-obsidian-amber/[0.04] hover:border-obsidian-amber/50' : 'border-[#333] bg-[#262626]/40 hover:border-obsidian-purple/30 hover:bg-obsidian-purple/5'
            }`}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-medium text-[#e5e5e5]">{p.name}</span>
                {p.badge === 'bestValue' && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-obsidian-amber/15 text-obsidian-amber border border-obsidian-amber/25">{t.providers.bestValue}</span>
                )}
              </div>
              <div className="text-[10px] font-mono text-obsidian-dim leading-tight">{p.model}</div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                  p.context === '1M'
                    ? 'bg-obsidian-purple/15 text-obsidian-purple-light border-obsidian-purple/25'
                    : p.context === '256K'
                    ? 'bg-obsidian-amber/10 text-obsidian-amber border-obsidian-amber/25'
                    : 'bg-[#1e1e1e] text-obsidian-dim border-[#2a2a2a]'
                }`}>{p.context}</span>
                <span className="text-[9px] font-mono text-obsidian-dim">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
