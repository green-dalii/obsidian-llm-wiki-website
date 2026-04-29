import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Github } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

export default function Footer() {
  const { t } = useI18n();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current, { opacity: 0 }, {
        opacity: 1, duration: 0.8, scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full py-14 border-t border-obsidian-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-base font-semibold text-[#e5e5e5]">LLM Wiki for Obsidian</div>
            <p className="text-xs text-obsidian-dim mt-1">
              By <a href="https://github.com/green-dalii" target="_blank" rel="noopener noreferrer" className="text-obsidian-muted hover:text-obsidian-purple transition-colors">Greener-Dalii</a> · {t.footer.license}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/green-dalii/obsidian-llm-wiki" target="_blank" rel="noopener noreferrer" className="text-xs text-obsidian-dim hover:text-[#e5e5e5] transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              {t.footer.github}
            </a>
            <a href="https://github.com/green-dalii/obsidian-llm-wiki/discussions" target="_blank" rel="noopener noreferrer" className="text-xs text-obsidian-dim hover:text-[#e5e5e5] transition-colors">{t.footer.discussions}</a>
            <a href="https://github.com/green-dalii/obsidian-llm-wiki/releases" target="_blank" rel="noopener noreferrer" className="text-xs text-obsidian-dim hover:text-[#e5e5e5] transition-colors">{t.footer.releases}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
