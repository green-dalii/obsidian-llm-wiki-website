import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const commands = [
  'Ingest Sources',
  'Ingest from Folder',
  'Query Wiki',
  'Lint Wiki',
  'Regenerate Index',
  'Suggest Schema Updates',
  'Test Connection',
  'Configure Provider',
];

export default function CommandPalette() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Background strip */}
      <div className="absolute inset-y-0 left-0 right-0 bg-obsidian-surface/40 border-y border-white/[0.04]" />

      <div className="relative">
        {/* Label */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-obsidian-muted tracking-widest uppercase">
            Command Palette
          </span>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Scan light effect */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-obsidian-bg to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-obsidian-bg to-transparent z-10" />

          <div className="flex animate-marquee">
            {[...commands, ...commands].map((cmd, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-8 py-3"
              >
                <span className="font-mono text-lg text-obsidian-muted/60 whitespace-nowrap hover:text-obsidian-text transition-colors duration-300 cursor-default">
                  {cmd}
                </span>
              </div>
            ))}
          </div>

          {/* Scan beam */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-48">
            <div className="h-full w-full animate-scan"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(200, 164, 92, 0.06), transparent)',
              }}
            />
          </div>
        </div>

        {/* Model recommendations */}
        <div className="max-w-4xl mx-auto mt-16 px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-mono text-obsidian-amber tracking-widest uppercase">
              Recommended Models
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: 'DeepSeek V4', badge: 'Best Value' },
              { name: 'Gemini 3.1', badge: 'Largest Context' },
              { name: 'Claude Opus', badge: 'Best Reasoning' },
              { name: 'GPT-5.5', badge: 'Flagship' },
              { name: 'Ollama', badge: 'Local' },
            ].map((model) => (
              <div
                key={model.name}
                className="group px-4 py-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-center transition-all duration-300 hover:border-obsidian-amber/20 hover:bg-obsidian-amber/5"
              >
                <div className="text-sm font-mono text-obsidian-text mb-1">
                  {model.name}
                </div>
                <div className="text-[10px] font-mono text-obsidian-muted/60 uppercase tracking-wider">
                  {model.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
