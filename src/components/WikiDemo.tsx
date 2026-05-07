import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import { translations } from '../i18n/astro';
import type { Translations } from '../i18n/translations';
import WikiGraphStage from './WikiGraphStage';
import MacWindow from './MacWindow';
import type { ScenarioId } from '../data/scenarios';
import { SCENARIOS } from '../data/scenarios';
import { getGraphLayout } from '../data/graphLayouts';

gsap.registerPlugin(ScrollTrigger);

type WikiDemoKey = keyof Translations['wikiDemo'];

const STEPS: Array<{ id: number; titleKey: WikiDemoKey; descKey: WikiDemoKey }> = [
  { id: 1, titleKey: 'step1Title', descKey: 'step1Desc' },
  { id: 2, titleKey: 'step2Title', descKey: 'step2Desc' },
  { id: 3, titleKey: 'step3Title', descKey: 'step3Desc' },
  { id: 4, titleKey: 'step4Title', descKey: 'step4Desc' },
  { id: 5, titleKey: 'step5Title', descKey: 'step5Desc' },
];

interface Props {
  locale?: 'en' | 'zh';
}

export default function WikiDemo({ locale = 'en' }: Props) {
  const t = locale === 'zh' ? translations.zh : translations.en;
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('daily-life');
  const [selectedPageIdx, setSelectedPageIdx] = useState(0);

  const scenario = SCENARIOS.find(s => s.id === activeScenario)!;
  const sourceText = locale === 'zh' ? scenario.sourceNoteZh : scenario.sourceNote;
  const extractedItems = locale === 'zh' ? scenario.extractedItemsZh : scenario.extractedItems;
  const generatedPages = locale === 'zh' ? scenario.generatedPagesZh : scenario.generatedPages;
  const chatQuestion = locale === 'zh' ? scenario.chatQuestionZh : scenario.chatQuestion;
  const chatAnswerLead = locale === 'zh' ? scenario.chatAnswerLeadZh : scenario.chatAnswerLead;
  const chatAnswerDetail = locale === 'zh' ? scenario.chatAnswerDetailZh : scenario.chatAnswerDetail;
  const chatSource = locale === 'zh' ? scenario.chatSourceZh : scenario.chatSource;
  const lines = sourceText.split('\n');

  const switchScenario = useCallback((id: ScenarioId) => {
    setActiveScenario(id);
    setStep(0);
    setAutoPlay(true);
    setSelectedPageIdx(0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setTimeout(() => setStep(s => s < 4 ? s + 1 : 0), 4000);
    return () => clearTimeout(timer);
  }, [step, autoPlay]);

  const renderMarkdownLine = (line: string) => {
    if (line.startsWith('# ')) return <span className="text-[#e5e5e5] font-semibold">{line}</span>;
    if (line.startsWith('## ')) return <span className="text-obsidian-muted">{line}</span>;
    if (line.startsWith('- ')) return <span className="text-obsidian-dim">{line}</span>;
    return <span>{line}</span>;
  };

  const wordCount = sourceText.split(/\s+/).filter(Boolean).length;
  const sectionCount = (sourceText.match(/^## /gm) || []).length + 1;
  const lineCount = lines.length;

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.wikiDemo.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-3 text-obsidian-heading">{t.wikiDemo.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-md mx-auto">{t.wikiDemo.subtitle}</p>
        </div>

        {/* Scenario Selector */}
        <div className="grid grid-cols-2 sm:flex sm:flex-nowrap gap-2 mb-6">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => switchScenario(s.id)}
              className={`flex sm:flex-1 items-center justify-center gap-1.5 sm:gap-2 px-2.5 py-3 sm:px-4 sm:py-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeScenario === s.id
                  ? 'border-obsidian-purple/40 bg-obsidian-purple/5 text-obsidian-heading'
                  : 'border-obsidian-border text-obsidian-muted hover:border-obsidian-border-light hover:text-obsidian-text'
              }`}
            >
              <s.Icon className="w-3.5 h-3.5 flex-shrink-0" />
              {locale === 'zh' ? s.labelZh : s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setStep(i); setAutoPlay(false); }}
                className={`w-full text-left p-3.5 sm:p-4 rounded-lg border transition-all duration-300 ${
                  i === step ? 'border-obsidian-purple/40 bg-obsidian-purple/5' : 'border-obsidian-border bg-[#1a1a1a]/30 hover:border-obsidian-border-light'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <span className={`text-xs font-mono w-5 h-5 rounded-full flex items-center justify-center ${i === step ? 'bg-obsidian-purple text-[#1e1e1e]' : 'bg-[#333] text-obsidian-dim'}`}>{s.id}</span>
                  <span className={`text-sm font-medium ${i === step ? 'text-[#e5e5e5]' : 'text-obsidian-muted'}`}>{t.wikiDemo[s.titleKey]}</span>
                </div>
                <p className={`text-xs leading-relaxed pl-7 ${i === step ? 'text-obsidian-muted' : 'text-obsidian-dim'}`}>
                  {i === 0
                    ? (locale === 'zh' ? scenario.sourceNoteContextZh : scenario.sourceNoteContext)
                    : t.wikiDemo[s.descKey]
                  }
                </p>
              </button>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <button onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4} className="px-3 py-1.5 text-xs font-mono text-white bg-obsidian-purple-dark rounded-md hover:bg-obsidian-purple disabled:opacity-30 transition-all">{t.wikiDemo.next}</button>
              <button onClick={() => { setStep(0); setAutoPlay(!autoPlay); }} aria-label={autoPlay ? (locale === 'zh' ? '暂停' : 'Pause') : (locale === 'zh' ? '播放' : 'Play')} className={`px-3 py-1.5 text-xs font-mono border rounded-md transition-all ${autoPlay ? 'border-obsidian-purple/40 text-obsidian-purple' : 'border-obsidian-border text-obsidian-muted hover:border-obsidian-border-light'}`}>{autoPlay ? '⏸' : '▶'}</button>
              <button onClick={() => { setStep(0); setAutoPlay(false); }} className="px-3 py-1.5 text-xs font-mono text-obsidian-dim border border-obsidian-border rounded-md hover:border-obsidian-border-light transition-all">{t.wikiDemo.restart}</button>
            </div>
          </div>

          {/* Stage - 自适应高度容器 */}
          <div className="lg:col-span-3">
            <div className="relative rounded-xl border border-obsidian-border bg-[#1a1a1a]/60 overflow-hidden h-[700px]">
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-purple animate-pulse" />
                <span className="text-xs font-mono text-obsidian-dim tracking-wider uppercase">
                  {step === 0 && t.wikiDemo.sourceNote}
                  {step === 1 && t.wikiDemo.extracted}
                  {step === 2 && t.wikiDemo.generated}
                  {step === 3 && t.wikiDemo.linked}
                  {step === 4 && `${t.wikiDemo.ask} / ${t.wikiDemo.answer}`}
                </span>
              </div>

              {/* Step 0: Source */}
              {step === 0 && (
                <div className="p-5 pt-12 pb-16">
                  <MacWindow title={<><span className="text-xs text-obsidian-dim">sources/</span><span className="text-xs text-obsidian-muted">{scenario.filename}</span></>}>
                    {lines.map((line, i) => (
                      <div key={i} className="flex items-start min-h-7">
                        <span className="w-5 text-right pr-2 text-obsidian-dim select-none flex-shrink-0 pt-0.5">{i + 1}</span>
                        <span className="flex-1 block pl-2 py-0.5 break-words">
                          {renderMarkdownLine(line)}
                        </span>
                      </div>
                    ))}
                  </MacWindow>
                  <div className="mt-3 flex items-center gap-2 text-xs font-mono text-obsidian-dim">
                    <span className="w-1.5 h-1.5 rounded-full bg-obsidian-amber" />{wordCount} words · {sectionCount} sections · {lineCount} lines
                  </div>
                </div>
              )}

              {/* Step 1: Extraction */}
              {step === 1 && (
                <div className="p-5 pt-12 pb-16">
                  <MacWindow title={<><span className="text-xs text-obsidian-dim">sources/</span><span className="text-xs text-obsidian-muted">{scenario.filename}</span></>}>
                    {lines.map((line, i) => {
                      const item = extractedItems.find(e => line.toLowerCase().includes(e.name.toLowerCase().replace(/\s+/g, ' ')));
                      const isHeading = line.startsWith('#');
                      return (
                        <div key={i} className="flex items-start min-h-7">
                          <span className="w-5 text-right pr-2 text-obsidian-dim select-none flex-shrink-0 pt-0.5">{i + 1}</span>
                          <span className="flex-1 block pl-2 py-0.5 break-words">
                            {item && !isHeading ? (
                              <span className="inline-flex items-center gap-2 border border-dashed rounded px-2 py-0.5"
                                style={{
                                  borderColor: item.type === 'entity' ? 'rgba(217,119,6,0.45)' : 'rgba(124,58,237,0.45)',
                                  backgroundColor: item.type === 'entity' ? 'rgba(217,119,6,0.06)' : 'rgba(124,58,237,0.06)',
                                }}>
                                <span className="text-obsidian-muted">{line}</span>
                                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${
                                  item.type === 'entity'
                                    ? 'bg-obsidian-amber/15 text-obsidian-amber border border-obsidian-amber/25'
                                    : 'bg-obsidian-purple/15 text-obsidian-purple-light border border-obsidian-purple/25'
                                }`}>{item.type}</span>
                              </span>
                            ) : (
                              <>{renderMarkdownLine(line)}</>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </MacWindow>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {extractedItems.slice(0, 4).map(e => (
                      <span key={e.name} className={`text-xs font-mono px-2 py-1 rounded border ${e.type === 'entity' ? 'bg-obsidian-amber/10 text-obsidian-amber border-obsidian-amber/25' : 'bg-obsidian-purple/10 text-obsidian-purple-light border-obsidian-purple/25'}`}>{e.name}</span>
                    ))}
                    <span className="text-xs font-mono px-2 py-1 rounded bg-[#333] text-obsidian-dim">+{extractedItems.length - 4} more</span>
                  </div>
                </div>
              )}

              {/* Step 2: Generated — Obsidian split layout */}
              {step === 2 && (() => {
                interface WikiNode { name: string; children: WikiNode[]; pageIdx: number; isDir: boolean; kind?: 'index' | 'log'; }
                const STD_DIRS = ['concepts', 'entities', 'schema', 'sources'];

                const wikiRoot: WikiNode[] = [];
                STD_DIRS.forEach(d => wikiRoot.push({ name: d, children: [], pageIdx: -1, isDir: true }));

                // Place generated pages into matching directories
                generatedPages.forEach((page, idx) => {
                  const relPath = page.path.replace('wiki/', '');
                  const slashIdx = relPath.indexOf('/');
                  const dirName = slashIdx > 0 ? relPath.substring(0, slashIdx) : '';
                  const fileName = slashIdx > 0 ? relPath.substring(slashIdx + 1).replace(/\.md$/, '') : relPath.replace(/\.md$/, '');
                  let dir = wikiRoot.find(n => n.name === dirName);
                  if (!dir && dirName) {
                    dir = { name: dirName, children: [], pageIdx: -1, isDir: true };
                    wikiRoot.push(dir);
                  }
                  if (dir) {
                    dir.children.push({ name: fileName, children: [], pageIdx: idx, isDir: false });
                  }
                });

                // Add index.md and log.md at root level
                wikiRoot.push({ name: 'index', children: [], pageIdx: -1, isDir: false, kind: 'index' });
                wikiRoot.push({ name: 'log', children: [], pageIdx: -1, isDir: false, kind: 'log' });

                // Sort: standard dirs in order, then extra dirs, then index, then log
                wikiRoot.sort((a, b) => {
                  if (a.kind === 'index') return 1;
                  if (b.kind === 'index') return -1;
                  if (a.kind === 'log') return 1;
                  if (b.kind === 'log') return -1;
                  const aIdx = STD_DIRS.indexOf(a.name);
                  const bIdx = STD_DIRS.indexOf(b.name);
                  if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
                  if (aIdx >= 0) return -1;
                  if (bIdx >= 0) return 1;
                  if (a.isDir !== b.isDir) return a.isDir ? -1 : 1;
                  return a.name.localeCompare(b.name);
                });
                wikiRoot.forEach(d => d.children.sort((a, b) => a.name.localeCompare(b.name)));

                const selPage = generatedPages[selectedPageIdx] ?? generatedPages[0];

                const renderWikiTree = (nodes: WikiNode[], depth: number): React.ReactNode =>
                  nodes.map(n => {
                    const indent = depth * 14 + 4;
                    if (n.isDir) {
                      return (
                        <div key={n.name}>
                          <div className="flex items-center gap-1 py-0.5 px-1 text-[10px] text-obsidian-muted" style={{ paddingLeft: `${indent}px` }}>
                            <span className="flex-shrink-0 w-3 text-center text-[10px] leading-none">{n.children.length > 0 ? '▼' : ''}</span>
                            <span className="truncate">{n.name}/</span>
                          </div>
                          {renderWikiTree(n.children, depth + 1)}
                        </div>
                      );
                    }
                    return (
                      <div key={n.name}>
                        <button
                          onClick={() => { if (n.pageIdx >= 0) setSelectedPageIdx(n.pageIdx); }}
                          className={`w-full text-left flex items-center gap-1 py-0.5 px-1 rounded text-[10px] font-mono transition-colors ${
                            n.pageIdx >= 0 && n.pageIdx === selectedPageIdx ? 'bg-obsidian-purple/15 text-obsidian-purple-light' :
                            n.pageIdx >= 0 ? 'text-obsidian-dim hover:text-obsidian-muted cursor-pointer' :
                            'text-obsidian-dim/50 cursor-default'
                          }`}
                          style={{ paddingLeft: `${indent}px` }}
                        >
                          <span className="flex-shrink-0 w-3" />
                          <span className="truncate">{n.name}</span>
                        </button>
                      </div>
                    );
                  });

                return (
                <div className="p-5 pt-12 pb-16">
                  <MacWindow
                    title={<><span className="text-xs text-obsidian-dim">wiki/</span><span className="text-xs text-obsidian-muted">{selPage.path.replace('wiki/', '').replace(/\.md$/, '')}</span></>}
                    contentClassName="flex h-[520px]"
                  >
                    <div className="w-[42%] border-r border-obsidian-border bg-[#161616] p-3 overflow-y-auto">
                      <div className="text-[9px] text-obsidian-dim/60 mb-2 uppercase tracking-widest">Explorer</div>
                      {renderWikiTree(wikiRoot, 0)}
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto bg-[#1e1e1e]">
                      <div className="text-[9px] text-obsidian-dim/60 mb-3 uppercase tracking-widest">Preview</div>
                      <div className="space-y-3">
                        <h1 className="text-sm font-semibold text-[#e5e5e5]">{selPage.title}</h1>
                        <div className="flex flex-wrap gap-1">
                          {selPage.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian-purple/10 text-obsidian-purple-light border border-obsidian-purple/20">#{tag}</span>
                          ))}
                        </div>
                        <div className="h-px bg-[#333]" />
                        <p className="text-xs text-obsidian-muted leading-relaxed">{selPage.summary}</p>
                        <div className="h-px bg-[#333]" />
                        <div>
                          <h2 className="text-xs font-semibold text-[#e5e5e5] mb-1.5">Related Topics</h2>
                          <ul className="space-y-0.5">
                            {generatedPages.filter(p => p.title !== selPage.title).slice(0, 2).map(p => (
                              <li key={p.title} className="text-xs text-obsidian-purple-light">[[{p.title}]]</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h2 className="text-xs font-semibold text-[#e5e5e5] mb-1.5">Backlinks</h2>
                          <p className="text-[10px] text-obsidian-dim">2 pages reference this page</p>
                        </div>
                      </div>
                    </div>
                  </MacWindow>
                </div>
                );
              })()}

              {/* Step 3: Links — Obsidian-style Graph */}
              {step === 3 && (
                <div className="p-5 pt-12 pb-16 h-full flex flex-col">
                  <MacWindow
                    title={<span className="text-xs text-obsidian-dim">Graph View</span>}
                    contentClassName="flex-1 min-h-0 flex flex-col"
                    className="flex-1 flex flex-col"
                  >
                    <WikiGraphStage
                      layout={getGraphLayout(scenario.id)}
                      links={scenario.links}
                      pageLabels={(() => {
                        const pageNames = generatedPages.map(p => p.title);
                        const extras = extractedItems
                          .filter(e => !pageNames.some(n => n.toLowerCase().includes(e.name.toLowerCase().slice(0, 8)) || e.name.toLowerCase().includes(n.toLowerCase().slice(0, 8))))
                          .slice(0, Math.max(0, 6 - pageNames.length))
                          .map(e => e.name);
                        return [...pageNames, ...extras];
                      })()}
                    />
                  </MacWindow>
                  <div className="text-xs font-mono text-obsidian-dim mt-3">
                    {generatedPages.length} pages · {scenario.links.length} bidirectional links · 1 graph
                  </div>
                </div>
              )}

              {/* Step 4: Chat */}
              {step === 4 && (
                <div className="p-5 pt-12 pb-16">
                  <MacWindow title={<span className="text-xs text-obsidian-dim">Query wiki</span>}>
                    <div className="space-y-4 max-w-xl mx-auto">
                      {/* User message — right aligned */}
                      <div className="flex items-start gap-3 justify-end">
                        <div className="rounded-lg border border-obsidian-border bg-[#1f1f1f] px-4 py-3 text-sm text-obsidian-text max-w-[85%]">
                          {chatQuestion}
                        </div>
                        <div className="w-7 h-7 rounded-full bg-[#333] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-medium">You</span>
                        </div>
                      </div>

                      {/* AI message — left aligned */}
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-obsidian-purple/20 border border-obsidian-purple/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-obsidian-purple-light" />
                        </div>
                        <div className="rounded-lg border border-obsidian-purple/20 bg-obsidian-purple/5 px-4 py-3 text-sm text-obsidian-text leading-relaxed space-y-1.5 max-w-[85%]">
                          <p>{chatAnswerLead}</p>
                          <p className="text-obsidian-muted">{chatAnswerDetail}</p>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="text-xs font-mono text-obsidian-dim">Sources:</span>
                            <span className="text-xs font-mono text-obsidian-purple-light">{chatSource}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MacWindow>
                </div>
              )}

              {/* Dots */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setStep(i); setAutoPlay(false); }}
                    aria-label={`${locale === 'zh' ? '步骤' : 'Step'} ${i + 1}`}
                    aria-current={i === step ? 'step' : undefined}
                    className="min-w-6 min-h-6 flex items-center justify-center rounded-full"
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === step ? 'bg-obsidian-purple w-4' : 'bg-[#333] hover:bg-[#444] w-1.5'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
