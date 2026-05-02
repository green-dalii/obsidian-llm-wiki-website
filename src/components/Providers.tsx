import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Lightbulb, Code2, Users, Plug, BookOpen } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

const PROVIDERS = [
  { name: 'DeepSeek', model: 'DeepSeek V4', context: '1M', status: 'Cloud', badge: 'bestValue' },
  { name: 'Google', model: 'Gemini Pro', context: '1M', status: 'Cloud' },
  { name: 'Anthropic', model: 'Claude', context: '1M', status: 'Cloud' },
  { name: 'OpenAI', model: 'GPT', context: '1M', status: 'Cloud' },
  { name: 'Moonshot', model: 'Kimi', context: '256K', status: 'Cloud' },
  { name: 'GLM', model: 'GLM-5', context: '200K', status: 'Cloud' },
  { name: 'OpenRouter', model: 'Universal API', context: 'Varies', status: 'Cloud' },
  { name: 'Ollama', model: 'Any local model', context: 'Varies', status: 'Local' },
];

const PILLARS = [
  { key: 'openSource' as const, icon: Code2, link: 'https://github.com/green-dalii/obsidian-llm-wiki' },
  { key: 'community' as const, icon: Users, link: 'https://github.com/green-dalii/obsidian-llm-wiki/discussions' },
  { key: 'obsidian' as const, icon: BookOpen, link: null },
  { key: 'vendor' as const, icon: Plug, link: null },
];

export default function Providers() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.provider-card, .pillar-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 25 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="providers" className="relative w-full py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.providers.label}</span>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold mt-3 mb-2 text-[#e5e5e5]">{t.providers.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-lg mx-auto">{t.providers.subtitle}</p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            const title = t.providers[`${p.key}Title` as keyof typeof t.providers] as string;
            const desc = t.providers[`${p.key}Desc` as keyof typeof t.providers] as string;
            const CardWrapper = p.link
              ? ({ children }: { children: React.ReactNode }) => (
                  <a href={p.link!} target="_blank" rel="noopener noreferrer" className="block">{children}</a>
                )
              : ({ children }: { children: React.ReactNode }) => <>{children}</>;

            return (
              <CardWrapper key={p.key}>
                <div className={`pillar-card group p-4 rounded-xl border transition-all duration-250 h-full ${
                  p.link
                    ? 'border-obsidian-border bg-obsidian-card/40 hover:bg-white/[0.05] cursor-pointer'
                    : 'border-obsidian-border bg-obsidian-card/40'
                }`}>
                  <div className="w-8 h-8 rounded-lg bg-obsidian-purple/10 border border-obsidian-purple/20 flex items-center justify-center mb-3 group-hover:bg-obsidian-purple/20 transition-colors">
                    <Icon className="w-4 h-4 text-obsidian-purple-light" />
                  </div>
                  <h3 className="text-base font-semibold text-[#e5e5e5] mb-1">{title}</h3>
                  <p className="text-xs text-obsidian-muted leading-relaxed">{desc}</p>
                  {p.link && (
                    <span className="inline-block mt-2 text-[10px] font-mono text-obsidian-purple-light opacity-0 group-hover:opacity-100 transition-opacity">→ GitHub</span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        <div className="mb-6 flex items-start gap-2.5 p-3 rounded-lg border border-obsidian-purple/20 bg-obsidian-purple/[0.04]">
          <Lightbulb className="w-4 h-4 text-obsidian-purple-light flex-shrink-0 mt-0.5" />
          <p className="text-xs text-obsidian-muted leading-relaxed">{t.providers.contextNote}</p>
        </div>

        {/* Provider cards subsection */}
        <div className="mb-4">
          <span className="text-[11px] font-mono text-obsidian-dim tracking-[0.1em] uppercase">{t.providers.cardLabel}</span>
          <p className="text-xs text-obsidian-muted mt-0.5">{t.providers.cardSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PROVIDERS.map((p) => (
            <div key={p.name} className={`provider-card group p-3.5 rounded-lg border transition-all duration-200 ${
              p.badge === 'bestValue'
                ? 'border-obsidian-purple/30 bg-obsidian-purple/[0.04]'
                : 'border-obsidian-border bg-obsidian-card/60 hover:bg-white/[0.05]'
            }`}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-medium text-[#e5e5e5]">{p.name}</span>
                {p.badge === 'bestValue' && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-obsidian-purple/15 text-obsidian-purple-light border border-obsidian-purple/25">{t.providers.bestValue}</span>
                )}
              </div>
              <div className="text-[10px] font-mono text-obsidian-dim leading-tight">{p.model}</div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                  p.badge === 'bestValue'
                    ? 'bg-obsidian-purple/15 text-obsidian-purple-light border-obsidian-purple/25'
                    : p.context === '1M'
                    ? 'bg-obsidian-purple/15 text-obsidian-purple-light border-obsidian-purple/25'
                    : 'bg-obsidian-bg text-obsidian-dim border-obsidian-border'
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
