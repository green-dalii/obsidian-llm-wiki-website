import { useEffect, useState } from 'react';
import { Download, Menu, Star, X } from 'lucide-react';
import { translations } from '../i18n/astro';

const NAV_ITEMS = [
  { key: 'comparison', labelKey: 'comparison' as const, target: '#comparison' },
  { key: 'how-it-works', labelKey: 'howItWorks' as const, target: '#how-it-works' },
  { key: 'features', labelKey: 'features' as const, target: '#features' },
  { key: 'install', labelKey: 'install' as const, target: '#install' },
  { key: 'ecosystem', labelKey: 'ecosystem' as const, target: '#ecosystem' },
  { key: 'providers', labelKey: 'providers' as const, target: '#providers' },
];

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

interface Props {
  currentLocale?: 'en' | 'zh';
}

export default function Header({ currentLocale = 'en' }: Props) {
  const t = currentLocale === 'zh' ? translations.zh : translations.en;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stars, setStars] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/green-dalii/obsidian-llm-wiki')
      .then(r => r.json())
      .then(d => { if (d.stargazers_count) setStars(formatStars(d.stargazers_count as number)); })
      .catch(() => {});
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
        : 'bg-[#1f1f1f]/0 border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group" aria-label={currentLocale === 'zh' ? '回到顶部' : 'Scroll to top'}>
          <img src="/favicon.svg" alt="" className="w-7 h-7 rounded-lg" aria-hidden="true" />
          <span className="text-sm font-semibold text-[#e5e5e5] tracking-tight">LLM Wiki for Obsidian</span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => handleNav(item.target)}
              className="px-2.5 py-1.5 text-xs text-obsidian-muted hover:text-[#e5e5e5] transition-colors duration-200 rounded-md hover:bg-white/[0.12]">
              {t.nav[item.labelKey]}
            </button>
          ))}
          <div className="w-px h-4 bg-obsidian-border mx-1.5" />
          <a href={currentLocale === 'en' ? '/zh/' : '/'}
            className="px-2.5 py-1.5 text-xs font-mono text-obsidian-dim hover:text-obsidian-text border border-obsidian-border rounded-md hover:border-obsidian-purple/40 transition-all">
            {currentLocale === 'en' ? '中' : 'EN'}
          </a>
          <a href="https://github.com/green-dalii/obsidian-llm-wiki" target="_blank" rel="noopener noreferrer"
            className="ml-1.5 px-2.5 py-1.5 text-xs font-medium text-obsidian-muted hover:text-[#e5e5e5] border border-obsidian-border rounded-md hover:border-obsidian-purple/30 transition-all inline-flex items-center gap-1.5">
            <Star className="w-3 h-3" />
            GitHub
            <span className="text-obsidian-dim">{stars ?? '...'}</span>
          </a>
          <a href="https://community.obsidian.md/plugins/karpathywiki" target="_blank" rel="noopener noreferrer"
            className="ml-1 px-3 py-1.5 text-xs font-medium text-white bg-obsidian-purple-dark rounded-md hover:bg-obsidian-purple transition-colors inline-flex items-center gap-1.5">
            <Download className="w-3 h-3" />
            {t.nav.download}
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-obsidian-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? (currentLocale === 'zh' ? '关闭菜单' : 'Close menu') : (currentLocale === 'zh' ? '打开菜单' : 'Open menu')}
          aria-expanded={mobileOpen}
        >
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
            <a href={currentLocale === 'en' ? '/zh/' : '/'} className="px-2.5 py-1.5 text-xs font-mono text-obsidian-dim border border-obsidian-border rounded-md">
              {currentLocale === 'en' ? '中' : 'EN'}
            </a>
            <a href="https://github.com/green-dalii/obsidian-llm-wiki" target="_blank" rel="noopener noreferrer"
              className="px-2.5 py-1.5 text-xs font-medium text-obsidian-muted border border-obsidian-border rounded-md inline-flex items-center gap-1.5">
              <Star className="w-3 h-3" />
              GitHub
              <span className="text-obsidian-dim">{stars ?? '...'}</span>
            </a>
            <a href="https://community.obsidian.md/plugins/karpathywiki" target="_blank" rel="noopener noreferrer"
              className="px-3.5 py-1.5 text-xs font-medium text-[#1e1e1e] bg-obsidian-purple rounded-md inline-flex items-center gap-1.5">
              <Download className="w-3 h-3" />
              {t.nav.download}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
