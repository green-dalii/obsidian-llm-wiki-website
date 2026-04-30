import { useRef, useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { Download, FolderOpen, Settings, Terminal, Folder, RefreshCw } from 'lucide-react';
import { useI18n } from '../i18n/use-i18n';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'folder': Folder,
  'refresh-cw': RefreshCw,
};

/** Parse <em>...</em> (emphasized tag) and <i>icon-name</i> (inline icon) in translation strings */
function renderTagged(text: string): ReactNode[] {
  const parts = text.split(/(<em>.*?<\/em>|<i>.*?<\/i>)/g);
  return parts.map((part, i) => {
    const emMatch = part.match(/<em>(.*?)<\/em>/);
    if (emMatch) {
      return (
        <span
          key={i}
          className="text-[9px] font-mono px-1 py-px rounded bg-obsidian-purple/15 text-obsidian-purple-light border border-obsidian-purple/25 whitespace-nowrap inline-flex items-center gap-1"
        >
          {renderTagged(emMatch[1])}
        </span>
      );
    }
    const iconMatch = part.match(/<i>(.*?)<\/i>/);
    if (iconMatch) {
      const IconComponent = ICON_MAP[iconMatch[1]];
      return IconComponent
        ? <IconComponent key={i} className="w-3 h-3 inline-block" />
        : <span key={i}>{iconMatch[1]}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

function IllustrationDownload() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden="true">
      {/* Browser window */}
      <rect x="4" y="4" width="272" height="152" rx="8" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      {/* Title bar */}
      <rect x="4" y="4" width="272" height="28" rx="8" fill="#262626"/>
      <rect x="4" y="14" width="272" height="18" rx="0" fill="#262626"/>
      {/* Traffic lights */}
      <circle cx="22" cy="18" r="3" fill="#ef4444" opacity="0.6"/>
      <circle cx="34" cy="18" r="3" fill="#f59e0b" opacity="0.6"/>
      <circle cx="46" cy="18" r="3" fill="#22c55e" opacity="0.6"/>
      {/* URL bar */}
      <rect x="62" y="12" width="200" height="12" rx="4" fill="#1e1e1e" stroke="#333" strokeWidth="0.5"/>
      <text x="66" y="21" fill="#737373" fontSize="5.5" fontFamily="JetBrains Mono, monospace">github.com/green-dalii/obsidian-llm-wiki/releases</text>

      {/* File cards */}
      {/* main.js */}
      <rect x="24" y="48" width="232" height="28" rx="5" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      <rect x="32" y="55" width="14" height="14" rx="3" fill="#d97706" opacity="0.15"/>
      <text x="52" y="65" fill="#e5e5e5" fontSize="8" fontFamily="JetBrains Mono, monospace">main.js</text>
      <rect x="220" y="55" width="28" height="14" rx="3" fill="#8b5cf6" opacity="0.2"/>
      <text x="232" y="65" fill="#a78bfa" fontSize="6" fontFamily="JetBrains Mono, monospace">↓</text>

      {/* manifest.json */}
      <rect x="24" y="84" width="232" height="28" rx="5" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      <rect x="32" y="91" width="14" height="14" rx="3" fill="#8b5cf6" opacity="0.15"/>
      <text x="52" y="101" fill="#e5e5e5" fontSize="8" fontFamily="JetBrains Mono, monospace">manifest.json</text>
      <rect x="220" y="91" width="28" height="14" rx="3" fill="#8b5cf6" opacity="0.2"/>
      <text x="232" y="101" fill="#a78bfa" fontSize="6" fontFamily="JetBrains Mono, monospace">↓</text>

      {/* styles.css */}
      <rect x="24" y="120" width="232" height="28" rx="5" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
      <rect x="32" y="127" width="14" height="14" rx="3" fill="#22c55e" opacity="0.15"/>
      <text x="52" y="137" fill="#e5e5e5" fontSize="8" fontFamily="JetBrains Mono, monospace">styles.css</text>
      <rect x="220" y="127" width="28" height="14" rx="3" fill="#8b5cf6" opacity="0.2"/>
      <text x="232" y="137" fill="#a78bfa" fontSize="6" fontFamily="JetBrains Mono, monospace">↓</text>
    </svg>
  );
}

function IllustrationInstall() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden="true">
      <defs>
        <clipPath id="sidebarClipInstall">
          <path d="M12,4 H88 V156 H12 A8,8,0,0,1,4,148 V12 A8,8,0,0,1,12,4 Z"/>
        </clipPath>
      </defs>
      {/* Obsidian settings panel */}
      <rect x="4" y="4" width="272" height="152" rx="8" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>

      {/* Left sidebar — left corners match outer panel radius */}
      <rect x="4" y="4" width="84" height="152" fill="#262626" clipPath="url(#sidebarClipInstall)"/>

      {/* Menu items */}
      <text x="16" y="28" fill="#737373" fontSize="6" fontFamily="system-ui">General</text>
      <text x="16" y="44" fill="#737373" fontSize="6" fontFamily="system-ui">Editor</text>
      <text x="16" y="60" fill="#737373" fontSize="6" fontFamily="system-ui">Files</text>
      <rect x="12" y="68" width="68" height="18" rx="3" fill="#8b5cf6" opacity="0.12"/>
      <text x="16" y="80" fill="#a78bfa" fontSize="6" fontFamily="system-ui" fontWeight="600">Community plugins</text>

      {/* Right content area */}
      <text x="100" y="24" fill="#e5e5e5" fontSize="8" fontFamily="system-ui" fontWeight="600">Installed plugins</text>

      {/* Refresh icon button — now first (left) */}
      <rect x="100" y="38" width="72" height="18" rx="4" fill="#262626" stroke="#333" strokeWidth="0.5"/>
      <text x="112" y="50" fill="#a3a3a3" fontSize="6" fontFamily="system-ui">↻ Refresh</text>

      {/* Folder icon button — now second (right) */}
      <rect x="180" y="38" width="72" height="18" rx="4" fill="#262626" stroke="#333" strokeWidth="0.5"/>
      <rect x="188" y="44" width="10" height="6" rx="1" fill="none" stroke="#a3a3a3" strokeWidth="1"/>
      <text x="204" y="50" fill="#a3a3a3" fontSize="6" fontFamily="system-ui">Open folder</text>

      {/* Plugin list area */}
      <rect x="100" y="66" width="160" height="78" rx="5" fill="#1a1a1a" stroke="#2e2e2e" strokeWidth="0.5"/>

      {/* Plugin item */}
      <rect x="108" y="76" width="144" height="26" rx="4" fill="#262626" stroke="#333" strokeWidth="0.5"/>
      <rect x="114" y="83" width="12" height="12" rx="3" fill="#8b5cf6" opacity="0.2"/>
      <text x="132" y="92" fill="#e5e5e5" fontSize="7" fontFamily="system-ui" fontWeight="500">Karpathy LLM Wiki</text>
      {/* Toggle switch ON */}
      <rect x="224" y="82" width="22" height="12" rx="6" fill="#8b5cf6"/>
      <circle cx="240" cy="88" r="4" fill="#fff"/>
    </svg>
  );
}

function IllustrationConfig() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden="true">
      <defs>
        <clipPath id="sidebarClipConfig">
          <path d="M12,4 H88 V156 H12 A8,8,0,0,1,4,148 V12 A8,8,0,0,1,12,4 Z"/>
        </clipPath>
      </defs>
      {/* Settings panel */}
      <rect x="4" y="4" width="272" height="152" rx="8" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>

      {/* Left sidebar — left corners match outer panel radius */}
      <rect x="4" y="4" width="84" height="152" fill="#262626" clipPath="url(#sidebarClipConfig)"/>
      <text x="16" y="28" fill="#737373" fontSize="6" fontFamily="system-ui">Community plugins</text>
      <rect x="12" y="36" width="68" height="18" rx="3" fill="#8b5cf6" opacity="0.12"/>
      <text x="16" y="48" fill="#a78bfa" fontSize="6" fontFamily="system-ui" fontWeight="600">Karpathy LLM Wiki</text>

      {/* Right settings area */}
      <text x="100" y="24" fill="#e5e5e5" fontSize="8" fontFamily="system-ui" fontWeight="600">LLM Provider Configuration</text>

      {/* Provider dropdown */}
      <text x="100" y="46" fill="#a3a3a3" fontSize="6" fontFamily="system-ui">Provider</text>
      <rect x="100" y="52" width="152" height="20" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
      <text x="108" y="65" fill="#e5e5e5" fontSize="7" fontFamily="JetBrains Mono, monospace">DeepSeek ▾</text>

      {/* API Key */}
      <text x="100" y="86" fill="#a3a3a3" fontSize="6" fontFamily="system-ui">API Key</text>
      <rect x="100" y="92" width="152" height="20" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
      <text x="108" y="105" fill="#737373" fontSize="7" fontFamily="JetBrains Mono, monospace">sk-••••••••••••••••••</text>

      {/* Buttons */}
      <rect x="100" y="124" width="72" height="18" rx="4" fill="#262626" stroke="#333" strokeWidth="0.5"/>
      <text x="136" y="136" textAnchor="middle" fill="#a3a3a3" fontSize="6" fontFamily="system-ui">Fetch Models</text>

      <rect x="180" y="124" width="72" height="18" rx="4" fill="#8b5cf6" opacity="0.2" stroke="#8b5cf6" strokeWidth="0.5"/>
      <text x="216" y="136" textAnchor="middle" fill="#a78bfa" fontSize="6" fontFamily="system-ui" fontWeight="500">Test Connection</text>
    </svg>
  );
}

function IllustrationUse() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto" aria-hidden="true">
      {/* Command palette overlay */}
      <rect x="0" y="0" width="280" height="160" rx="8" fill="#0a0a0a" opacity="0.3"/>
      <rect x="20" y="28" width="240" height="110" rx="8" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>

      {/* Search input */}
      <rect x="24" y="32" width="232" height="26" rx="5" fill="#262626" stroke="#333" strokeWidth="0.5"/>
      <text x="36" y="49" fill="#e5e5e5" fontSize="9" fontFamily="JetBrains Mono, monospace">&gt; Ingest</text>
      <rect x="86" y="38" width="1" height="14" rx="0.5" fill="#8b5cf6">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      </rect>

      {/* Command list */}
      <rect x="24" y="64" width="232" height="22" rx="4" fill="#8b5cf6" opacity="0.1" stroke="#8b5cf6" strokeWidth="0.5"/>
      <text x="36" y="79" fill="#e5e5e5" fontSize="7" fontFamily="system-ui" fontWeight="500">Ingest single source</text>
      <text x="164" y="79" fill="#737373" fontSize="6" fontFamily="system-ui">Select a note</text>

      <rect x="24" y="90" width="232" height="20" rx="4" fill="#1e1e1e"/>
      <text x="36" y="103" fill="#a3a3a3" fontSize="7" fontFamily="system-ui">Ingest from folder</text>
      <text x="164" y="103" fill="#525252" fontSize="6" fontFamily="system-ui">Pick any folder</text>

      <rect x="24" y="114" width="232" height="20" rx="4" fill="#1e1e1e"/>
      <text x="36" y="127" fill="#a3a3a3" fontSize="7" fontFamily="system-ui">Query wiki</text>
      <text x="164" y="127" fill="#525252" fontSize="6" fontFamily="system-ui">Ask questions</text>

      {/* Keyboard hint — emphasized */}
      <rect x="196" y="138" width="56" height="14" rx="3" fill="#8b5cf6" opacity="0.12" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.8"/>
      <text x="201" y="148" fill="#a78bfa" fontSize="6" fontFamily="JetBrains Mono, monospace">⌘+P / Ctrl+P</text>
    </svg>
  );
}

const STEP_META = [
  { num: '01', icon: Download, Illustration: IllustrationDownload, hasButton: true },
  { num: '02', icon: FolderOpen, Illustration: IllustrationInstall, hasButton: false },
  { num: '03', icon: Settings, Illustration: IllustrationConfig, hasButton: false },
  { num: '04', icon: Terminal, Illustration: IllustrationUse, hasButton: false },
];

export default function Install() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.install-step');
      cards?.forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="install" className="relative w-full py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.install.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-[#e5e5e5]">{t.install.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-lg mx-auto">{t.install.subtitle}</p>
        </div>

        <div className="flex flex-col gap-4">
          {STEP_META.map((s, idx) => {
            const Icon = s.icon;
            const Illustration = s.Illustration;
            const titleKey = (`step${idx + 1}Title` as 'step1Title' | 'step2Title' | 'step3Title' | 'step4Title');
            const descKey = (`step${idx + 1}Desc` as 'step1Desc' | 'step2Desc' | 'step3Desc' | 'step4Desc');
            return (
              <div key={s.num} className="install-step relative rounded-xl border border-obsidian-border bg-obsidian-surface/30 hover:border-obsidian-purple/25 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row">
                {/* Illustration — 3/4 on desktop, full on mobile */}
                <div className="w-full lg:w-3/4 p-4 lg:p-5 border-b lg:border-b-0 lg:border-r border-obsidian-border/50 bg-obsidian-bg/50">
                  <Illustration />
                </div>
                {/* Content — 1/4 on desktop, full on mobile */}
                <div className="w-full lg:w-1/4 p-4 lg:p-5 flex flex-col justify-center">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-md bg-obsidian-purple/10 border border-obsidian-purple/20 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-obsidian-purple-light" />
                    </div>
                    <span className="text-[10px] font-mono text-obsidian-dim">{s.num}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#e5e5e5] mb-1.5">{t.install[titleKey]}</h3>
                  <p className="text-xs text-obsidian-muted leading-relaxed">{renderTagged(t.install[descKey])}</p>
                  {s.hasButton && (
                    <a
                      href="https://github.com/green-dalii/obsidian-llm-wiki/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1e1e1e] bg-obsidian-purple rounded-lg hover:bg-obsidian-purple-light transition-colors w-fit"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {t.install.cta}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
