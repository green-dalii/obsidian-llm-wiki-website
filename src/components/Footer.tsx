import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n';

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
    <footer ref={footerRef} className="relative w-full py-14 border-t border-[#333]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="text-base font-semibold text-[#e5e5e5]">Karpathy LLM Wiki</div>
            <p className="text-xs text-obsidian-dim mt-1">
              By <a href="https://github.com/green-dalii" target="_blank" rel="noopener noreferrer" className="text-obsidian-muted hover:text-obsidian-purple transition-colors">Greener-Dalii</a> · {t.footer.license}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://github.com/green-dalii/obsidian-llm-wiki" target="_blank" rel="noopener noreferrer" className="text-xs text-obsidian-dim hover:text-[#e5e5e5] transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
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
