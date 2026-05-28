import { useEffect, useState } from 'react';
import { Download, Menu, Star, X } from 'lucide-react';
import { translations } from '../i18n/astro';

const LANGUAGES = [
  { code: 'en', label: 'English', path: '/' },
  { code: 'zh', label: '中文', path: '/zh/' },
  { code: 'ja', label: '日本語', path: '/ja/' },
  { code: 'ko', label: '한국어', path: '/ko/' },
  { code: 'de', label: 'Deutsch', path: '/de/' },
  { code: 'es', label: 'Español', path: '/es/' },
  { code: 'fr', label: 'Français', path: '/fr/' },
  { code: 'pt', label: 'Português', path: '/pt/' },
];

function formatStars(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
}

interface Props {
  currentLocale?: string;
  isBlog?: boolean;
}

export default function Header({ currentLocale = 'en', isBlog = false }: Props) {
  const t = (translations as Record<string, any>)[currentLocale] || translations.en;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stars, setStars] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = LANGUAGES.find(l => l.code === currentLocale) || LANGUAGES[0];

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

  type AnchorItem = { key: string; label: string; href: string };
  type NavEntry = { key: string; label: string; target: string };

  const anchorItems: NavEntry[] = [
    { key: 'comparison', label: t.nav.comparison, target: '#comparison' },
    { key: 'how-it-works', label: t.nav.howItWorks, target: '#how-it-works' },
    { key: 'features', label: t.nav.features, target: '#features' },
    { key: 'install', label: t.nav.install, target: '#install' },
    { key: 'faq', label: t.nav.faq, target: '#faq' },
    { key: 'ecosystem', label: t.nav.ecosystem, target: '#ecosystem' },
    { key: 'providers', label: t.nav.providers, target: '#providers' },
  ];

  // On blog pages, anchor items become absolute links to home page
  const blogAnchorItems: NavEntry[] = anchorItems.map(item => ({
    ...item,
    href: '/' + item.target,
  }));

  const linkItems: NavEntry[] = [
    { key: 'blog', label: t.nav.blog, href: '/blog/' },
  ];

  const allItems: (AnchorItem | NavEntry)[] = isBlog
    ? [{ key: 'home', label: t.nav.home, href: '/' }, ...blogAnchorItems, ...linkItems]
    : [...anchorItems, ...linkItems];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-500 ${
      scrolled
        ? 'bg-obsidian-bg/85 backdrop-blur-xl border-obsidian-border/50 shadow-[0_1px_0_rgba(255,255,255,0.03)]'
        : 'bg-[#1f1f1f]/0 border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <a href="/" className="flex items-center gap-2 group" aria-label="Home">
          <img src="/favicon.svg" alt="" className="w-7 h-7 rounded-lg" aria-hidden="true" />
          <span className="text-sm font-semibold text-[#e5e5e5] tracking-tight group-hover:text-white transition-colors">LLM Wiki for Obsidian</span>
        </a>

        <nav className="hidden md:flex items-center gap-0.5">
          {allItems.map((item) => (
            'href' in item ? (
              <a key={item.key} href={item.href}
                className="px-2.5 py-1.5 text-xs text-obsidian-muted hover:text-[#e5e5e5] transition-colors duration-200 rounded-md hover:bg-white/12">
                {item.label}
              </a>
            ) : (
              <button key={item.key} onClick={() => handleNav(item.target)}
                className="px-2.5 py-1.5 text-xs text-obsidian-muted hover:text-[#e5e5e5] transition-colors duration-200 rounded-md hover:bg-white/12">
                {item.label}
              </button>
            )
          ))}
          <div className="w-px h-4 bg-obsidian-border mx-1.5" />
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="px-2 py-1.5 text-xs font-mono text-obsidian-dim hover:text-obsidian-heading border border-obsidian-border rounded-md hover:border-obsidian-purple/40 transition-all inline-flex items-center gap-1"
            >
              {currentLang.label}
              <svg className="w-3 h-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-obsidian-surface border border-obsidian-border rounded-md shadow-lg z-50 min-w-30 py-1">
                {LANGUAGES.map(lang => (
                  <a key={lang.code} href={lang.path}
                    className={`block px-3 py-1.5 text-xs hover:bg-white/8 transition-colors ${lang.code === currentLocale ? 'text-obsidian-purple-light bg-obsidian-purple/10' : 'text-obsidian-muted'}`}
                  >
                    {lang.label}
                  </a>
                ))}
              </div>
            )}
          </div>
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
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-obsidian-bg/95 backdrop-blur-md border-b border-obsidian-border px-4 sm:px-6 pb-4">
          {allItems.map((item) => (
            'href' in item ? (
              <a key={item.key} href={item.href}
                className="block w-full text-left py-2.5 text-sm text-obsidian-muted hover:text-[#e5e5e5] transition-colors">
                {item.label}
              </a>
            ) : (
              <button key={item.key} onClick={() => handleNav(item.target)}
                className="block w-full text-left py-2.5 text-sm text-obsidian-muted hover:text-[#e5e5e5] transition-colors">
                {item.label}
              </button>
            )
          ))}
          <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-obsidian-border">
            <div className="flex flex-row gap-1.5 flex-wrap">
              {LANGUAGES.map(lang => (
                <a key={lang.code} href={lang.path}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${lang.code === currentLocale ? 'text-obsidian-purple-light bg-obsidian-purple/10' : 'text-obsidian-muted hover:bg-white/6'}`}
                >
                  {lang.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
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
      </div>
      )}
    </header>
  );
}
