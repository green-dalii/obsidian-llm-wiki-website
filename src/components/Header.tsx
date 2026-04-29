import { useEffect, useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

const NAV_ITEMS = [
  { key: 'philosophy', labelKey: 'philosophy' as const, target: '#philosophy' },
  { key: 'how-it-works', labelKey: 'howItWorks' as const, target: '#how-it-works' },
  { key: 'features', labelKey: 'features' as const, target: '#features' },
  { key: 'ecosystem', labelKey: 'ecosystem' as const, target: '#ecosystem' },
  { key: 'providers', labelKey: 'providers' as const, target: '#providers' },
];

export default function Header() {
  const { t, lang, toggleLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (target: string) => {
    setMobileOpen(false);
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-500 ${
      scrolled
        ? 'bg-obsidian-bg/85 backdrop-blur-xl border-obsidian-border/50 shadow-[0_1px_0_rgba(255,255,255,0.03)]'
        : 'bg-[#1e1e1e]/0 border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-obsidian-purple/20 border border-obsidian-purple/30 flex items-center justify-center group-hover:bg-obsidian-purple/30 transition-colors">
            <BookOpen className="w-3.5 h-3.5 text-obsidian-purple-light" />
          </div>
          <span className="text-sm font-semibold text-[#e5e5e5] tracking-tight">LLM Wiki</span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => handleNav(item.target)}
              className="px-2.5 py-1.5 text-xs text-obsidian-muted hover:text-[#e5e5e5] transition-colors duration-200 rounded-md hover:bg-white/[0.04]">
              {t.nav[item.labelKey]}
            </button>
          ))}
          <div className="w-px h-4 bg-obsidian-border mx-1.5" />
          <button onClick={toggleLang}
            className="px-2 py-0.5 text-[11px] font-mono text-obsidian-dim hover:text-obsidian-text border border-obsidian-border rounded-md hover:border-obsidian-purple/40 transition-all">
            {lang === 'en' ? 'EN' : '中'}
          </button>
          <a href="https://github.com/green-dalii/obsidian-llm-wiki/releases" target="_blank" rel="noopener noreferrer"
            className="ml-1.5 px-3 py-1.5 text-xs font-medium text-[#1e1e1e] bg-obsidian-purple rounded-md hover:bg-obsidian-purple-light transition-colors">
            {t.nav.install}
          </a>
        </nav>

        <button className="md:hidden p-2 text-obsidian-muted" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-obsidian-bg/95 backdrop-blur-md border-b border-obsidian-border px-4 sm:px-6 pb-4">
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => handleNav(item.target)}
              className="block w-full text-left py-2.5 text-sm text-obsidian-muted hover:text-[#e5e5e5] transition-colors">
              {t.nav[item.labelKey]}
            </button>
          ))}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-obsidian-border">
            <button onClick={toggleLang} className="px-2.5 py-1 text-[11px] font-mono text-obsidian-dim border border-obsidian-border rounded-md">
              {lang === 'en' ? 'EN' : '中'}
            </button>
            <a href="https://github.com/green-dalii/obsidian-llm-wiki/releases" target="_blank" rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-medium text-[#1e1e1e] bg-obsidian-purple rounded-md">{t.nav.install}</a>
          </div>
        </div>
      )}
    </header>
  );
}
