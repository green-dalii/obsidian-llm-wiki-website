import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Sparkles } from 'lucide-react';
import { translations } from '../i18n/astro';
import type { Translations } from '../i18n/translations';

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

  const sourceNote = `# Machine Learning

Machine learning uses algorithms to learn from data.

## Types
- Supervised learning
- Unsupervised learning
- Reinforcement learning

## Applications
- Computer vision
- Natural language processing
- Recommendation systems`;

  const extractedItems = [
    { name: 'Machine Learning', type: 'concept' as const, lineIdx: 0 },
    { name: 'Supervised learning', type: 'concept' as const, lineIdx: 4 },
    { name: 'Unsupervised learning', type: 'concept' as const, lineIdx: 5 },
    { name: 'Reinforcement learning', type: 'concept' as const, lineIdx: 6 },
    { name: 'Computer vision', type: 'entity' as const, lineIdx: 9 },
    { name: 'Natural language processing', type: 'entity' as const, lineIdx: 10 },
  ];

  const generatedPages = [
    { title: 'Machine Learning', path: 'wiki/concepts/machine-learning.md', tags: ['AI', 'Algorithm'] },
    { title: 'Supervised Learning', path: 'wiki/concepts/supervised-learning.md', tags: ['ML'] },
    { title: 'Computer Vision', path: 'wiki/entities/computer-vision.md', tags: ['AI', 'Vision'] },
    { title: 'NLP', path: 'wiki/entities/nlp.md', tags: ['AI', 'Language'] },
  ];

  const links = [
    { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 2 },
  ];

  const lines = sourceNote.split('\n');

  const renderMarkdownLine = (line: string) => {
    if (line.startsWith('# ')) return <span className="text-[#e5e5e5] font-semibold">{line}</span>;
    if (line.startsWith('## ')) return <span className="text-obsidian-muted">{line}</span>;
    if (line.startsWith('- ')) return <span className="text-obsidian-dim">{line}</span>;
    return <span>{line}</span>;
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full py-28 sm:py-36">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-[11px] font-mono text-obsidian-purple tracking-[0.15em] uppercase">{t.wikiDemo.label}</span>
          <h2 className="text-[clamp(1.6rem,4vw,2.8rem)] font-semibold mt-3 mb-2 text-[#e5e5e5]">{t.wikiDemo.title}</h2>
          <p className="text-obsidian-muted text-sm max-w-lg">{t.wikiDemo.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setStep(i); setAutoPlay(false); }}
                className={`w-full text-left p-3.5 sm:p-4 rounded-lg border transition-all duration-300 ${
                  i === step ? 'border-obsidian-purple/40 bg-obsidian-purple/5' : 'border-[#333] bg-[#1a1a1a]/30 hover:border-[#3a3a3a]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <span className={`text-xs font-mono w-5 h-5 rounded-full flex items-center justify-center ${i === step ? 'bg-obsidian-purple text-[#1e1e1e]' : 'bg-[#333] text-obsidian-dim'}`}>{s.id}</span>
                  <span className={`text-sm font-medium ${i === step ? 'text-[#e5e5e5]' : 'text-obsidian-muted'}`}>{t.wikiDemo[s.titleKey]}</span>
                </div>
                <p className={`text-xs leading-relaxed pl-7 ${i === step ? 'text-obsidian-muted' : 'text-obsidian-dim'}`}>{t.wikiDemo[s.descKey]}</p>
              </button>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="px-3 py-1.5 text-xs font-mono text-obsidian-muted border border-[#333] rounded-md hover:border-[#444] disabled:opacity-30 transition-all">{t.wikiDemo.prev}</button>
              <button onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4} className="px-3 py-1.5 text-xs font-mono text-white bg-obsidian-purple-dark rounded-md hover:bg-obsidian-purple disabled:opacity-30 transition-all">{t.wikiDemo.next}</button>
              <button onClick={() => { setStep(0); setAutoPlay(!autoPlay); }} aria-label={autoPlay ? (locale === 'zh' ? '暂停' : 'Pause') : (locale === 'zh' ? '播放' : 'Play')} className={`px-3 py-1.5 text-xs font-mono border rounded-md transition-all ${autoPlay ? 'border-obsidian-purple/40 text-obsidian-purple' : 'border-[#333] text-obsidian-muted hover:border-[#444]'}`}>{autoPlay ? '⏸' : '▶'}</button>
              <button onClick={() => { setStep(0); setAutoPlay(false); }} className="px-3 py-1.5 text-xs font-mono text-obsidian-dim border border-[#333] rounded-md hover:border-[#444] transition-all">{t.wikiDemo.restart}</button>
            </div>
          </div>

          {/* Stage - 外部固定高度容器防止布局跳动 */}
          <div className="lg:col-span-3 h-[550px]">
            {/* 内部编辑器容器 - 自适应高度 */}
            <div className="relative rounded-xl border border-[#333] bg-[#1a1a1a]/60 overflow-hidden min-h-[380px]">
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-obsidian-purple animate-pulse" />
                <span className="text-[10px] font-mono text-obsidian-dim tracking-wider uppercase">
                  {step === 0 && t.wikiDemo.sourceNote}
                  {step === 1 && t.wikiDemo.extracted}
                  {step === 2 && t.wikiDemo.generated}
                  {step === 3 && t.wikiDemo.linked}
                  {step === 4 && `${t.wikiDemo.ask} / ${t.wikiDemo.answer}`}
                </span>
              </div>

              {/* Step 0: Source */}
              {step === 0 && (
                <div className="p-5 pt-12">
                  <div className="rounded-lg border border-[#333] bg-[#1f1f1f] p-4 font-mono text-xs leading-relaxed">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#333]">
                      <span className="text-obsidian-dim">sources/</span>
                      <span className="text-obsidian-muted">machine-learning.md</span>
                    </div>
                    {lines.map((line, i) => (
                      <div key={i} className="flex items-center h-7">
                        <span className="w-5 text-right pr-2 text-obsidian-dim select-none flex-shrink-0">{i + 1}</span>
                        <span className="flex-1 inline-flex items-center pl-2">
                          {renderMarkdownLine(line)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-obsidian-dim">
                    <span className="w-1.5 h-1.5 rounded-full bg-obsidian-amber" />206 words · 4 sections · 12 lines
                  </div>
                </div>
              )}

              {/* Step 1: Extraction with dashed boxes + entity/concept tags */}
              {step === 1 && (
                <div className="p-5 pt-12">
                  <div className="rounded-lg border border-[#333] bg-[#1f1f1f] p-4 font-mono text-xs leading-relaxed min-h-[280px]">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#333]">
                      <span className="text-obsidian-dim">sources/</span>
                      <span className="text-obsidian-muted">machine-learning.md</span>
                    </div>
                    {lines.map((line, i) => {
                      const item = extractedItems.find(e => line.toLowerCase().includes(e.name.toLowerCase().replace(/\s+/g, ' ')));
                      const isHeading = line.startsWith('#');
                      return (
                        <div key={i} className="flex items-center h-7">
                          <span className="w-5 text-right pr-2 text-obsidian-dim select-none flex-shrink-0">{i + 1}</span>
                          <span className="flex-1 inline-flex items-center pl-2">
                            {item && !isHeading ? (
                              <span className="inline-flex items-center gap-2 border border-dashed rounded px-2 py-0.5"
                                style={{
                                  borderColor: item.type === 'entity' ? 'rgba(217,119,6,0.45)' : 'rgba(124,58,237,0.45)',
                                  backgroundColor: item.type === 'entity' ? 'rgba(217,119,6,0.06)' : 'rgba(124,58,237,0.06)',
                                }}>
                                <span className="text-obsidian-muted">{line}</span>
                                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
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
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {extractedItems.slice(0, 4).map(e => (
                      <span key={e.name} className={`text-[10px] font-mono px-2 py-1 rounded border ${e.type === 'entity' ? 'bg-obsidian-amber/10 text-obsidian-amber border-obsidian-amber/25' : 'bg-obsidian-purple/10 text-obsidian-purple-light border-obsidian-purple/25'}`}>{e.name}</span>
                    ))}
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#333] text-obsidian-dim">+{extractedItems.length - 4} more</span>
                  </div>
                </div>
              )}

              {/* Step 2: Generated */}
              {step === 2 && (
                <div className="p-5 pt-12">
                  <div className="grid grid-cols-2 gap-3">
                    {generatedPages.map((page, i) => (
                      <div key={page.title} className="rounded-lg border border-[#333] bg-[#1f1f1f] p-3.5">
                        <div className="text-[9px] font-mono text-obsidian-dim mb-1.5 truncate">{page.path}</div>
                        <div className="text-sm font-medium text-[#e5e5e5] mb-1.5">{page.title}</div>
                        <div className="flex flex-wrap gap-1">{page.tags.map(tag => <span key={tag} className="text-[9px] font-mono px-1 py-0.5 rounded bg-[#333] text-obsidian-dim">#{tag}</span>)}</div>
                        <div className="mt-2.5 pt-2.5 border-t border-[#333] text-[9px] font-mono text-obsidian-dim leading-relaxed">
                          {i === 0 && 'Core concepts for learning from data. Requires labeled datasets...'}
                          {i === 1 && 'Learning from labeled data. Common: linear regression, neural nets...'}
                          {i === 2 && 'Teaching machines to see. Used in self-driving, medical imaging...'}
                          {i === 3 && 'Bridging language and machines. Powers chatbots, translation...'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Links */}
              {step === 3 && (
                <div className="p-5 pt-12 pb-16">
                  <div className="relative h-[280px]">
                    {generatedPages.map((page, i) => (
                      <div key={page.title} className="absolute rounded-lg border border-obsidian-purple/30 bg-[#1f1f1f] px-2.5 py-1.5 text-xs font-mono text-obsidian-muted"
                        style={{ left: `${[8, 55, 8, 55][i]}%`, top: `${[8, 8, 50, 50][i]}%` }}>
                        <span className="text-obsidian-purple-light">[[</span>{page.title}<span className="text-obsidian-purple-light">]]</span>
                      </div>
                    ))}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {links.map((l, i) => (
                        <line key={i} x1={`${[20, 67, 20, 67][l.from]}%`} y1={`${[12, 12, 54, 54][l.from]}%`}
                          x2={`${[20, 67, 20, 67][l.to]}%`} y2={`${[12, 12, 54, 54][l.to]}%`}
                          stroke="rgba(124,58,237,0.35)" strokeWidth="1" strokeDasharray="3 2" className="animate-pulse" />
                      ))}
                    </svg>
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono text-obsidian-dim">4 pages · 6 bidirectional links · 1 graph</div>
                  </div>
                </div>
              )}

              {/* Step 4: Chat */}
              {step === 4 && (
                <div className="p-5 pt-12">
                  <div className="space-y-3 max-w-md mx-auto">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#333] flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-[8px]">You</span></div>
                      <div className="rounded-lg border border-[#333] bg-[#1f1f1f] px-3 py-2 text-xs text-obsidian-text">How does supervised learning relate to computer vision?</div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-obsidian-purple/20 border border-obsidian-purple/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3 h-3 text-obsidian-purple-light" />
                      </div>
                      <div className="rounded-lg border border-obsidian-purple/20 bg-obsidian-purple/5 px-3 py-2.5 text-xs text-obsidian-text leading-relaxed space-y-1.5">
                        <p>[[Supervised Learning]] provides the foundational training paradigm for most [[Computer Vision]] systems today.</p>
                        <p className="text-obsidian-muted">Both require labeled datasets to train predictive models. Modern vision models are trained using supervised objectives.</p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="text-[9px] font-mono text-obsidian-dim">Sources:</span>
                          <span className="text-[9px] font-mono text-obsidian-purple-light">machine-learning.md</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
