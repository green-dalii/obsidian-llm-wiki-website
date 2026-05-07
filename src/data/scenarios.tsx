import { Heart, BookOpen, Scissors, Mic, Cpu, TrendingUp } from "lucide-react";

export type ScenarioId = 'daily-life' | 'reading' | 'inspiration' | 'creation' | 'ai-frontier' | 'business';

export interface ScenarioData {
  id: ScenarioId;
  label: string;
  labelZh: string;
  Icon: React.ComponentType<{ className?: string }>;
  filename: string;
  sourceNote: string;
  sourceNoteZh: string;
  extractedItems: Array<{ name: string; type: 'concept' | 'entity'; lineIdx: number }>;
  extractedItemsZh: Array<{ name: string; type: 'concept' | 'entity'; lineIdx: number }>;
  generatedPages: Array<{ title: string; path: string; tags: string[]; summary: string }>;
  generatedPagesZh: Array<{ title: string; path: string; tags: string[]; summary: string }>;
  links: Array<{ from: number; to: number }>;
  chatQuestion: string;
  chatQuestionZh: string;
  chatAnswerLead: React.ReactNode;
  chatAnswerLeadZh: React.ReactNode;
  chatAnswerDetail: React.ReactNode;
  chatAnswerDetailZh: React.ReactNode;
  chatSource: string;
  chatSourceZh: string;
}

export function BoldLink({ children }: { children: string }) {
  return <span className="font-semibold text-obsidian-purple-light">{children}</span>;
}

export const SCENARIOS: ScenarioData[] = [
  {
    id: 'daily-life',
    label: 'Daily Life',
    labelZh: '日常生活',
    Icon: Heart,
    filename: 'sleep-hygiene.md',
    sourceNote: `# Why We Sleep: Key Findings

Sleep is the single most effective thing we can do to reset our brain and body.

## Sleep Architecture
- NREM Stage 3 (deep sleep): physical restoration, immune function
- REM: emotional processing, creativity, memory consolidation
- Each cycle ~90 min, 4-5 cycles per night ideal

## The Cost of Sleep Debt
- After 1 week of 6h/night: cognitive performance equals 0.05% BAC
- Chronic sleep debt linked to Alzheimer's — glymphatic clearance drops 60%
- 5h sleep → testosterone drops 10–15% in healthy young men

## Practical Sleep Hygiene
- Optimal bedroom temperature: 18–19°C
- No blue light 90 min before bed — melanopsin sensitivity peaks at 480nm
- Caffeine half-life 6h: last intake before 2pm
- Wake-time consistency matters more than bedtime consistency

## Open Questions
- Do naps compensate for night debt? Evidence mixed
- Melatonin: 0.3mg as effective as 3mg. Most supplements are overdosed.`,
    sourceNoteZh: `# 中医体质学说与现代健康管理

体质是你身体的"操作系统"——理解自己的体质类型，是健康管理的第一步。

## 九种体质分类
- 平和质：阴阳平衡，精力充沛。约占人群 32%，是调理的目标状态
- 气虚质：容易疲劳，说话有气无力。约占 13%，白领高发
- 阳虚质：怕冷畏寒，手脚冰凉。多见于女性与老年人
- 阴虚质：口干舌燥，手心发热。熬夜人群的典型体质
- 痰湿质：体型偏胖，容易困倦。与代谢综合征高度重叠

## 体质与疾病风险（循证数据）
- 痰湿质 → 2 型糖尿病风险升高 3 倍（北京中医药大学队列研究，n=12,000+）
- 气郁质 → 抑郁症易感性增加，与 5-HT 转运体基因多态性相关
- 血瘀质 → 心脑血管事件风险显著升高

## 现代生活如何破坏体质
- 长期熬夜（23:00 后入睡）→ 持续 6 个月即可从平和质转为阴虚质
- 久坐 8h+/天 → 气滞血瘀叠加痰湿，典型"办公室体质"
- 高糖高油外卖 → 3 个月即可出现痰湿指标异常
- 过度思虑/焦虑 → 气郁，且气郁又加重失眠，形成恶性循环

## 调养核心思路
- 气虚：黄芪党参炖汤 + 八段锦，4–6 周可见精力改善
- 痰湿：控碳水 + 每天快走 40 分钟，8 周腰围平均减少 5cm
- 关键原则：起居有常 > 食疗 > 药补。睡好比吃什么补品都重要`,
    extractedItems: [
      { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
      { name: 'Glymphatic System', type: 'entity', lineIdx: 0 },
      { name: 'Melanopsin', type: 'entity', lineIdx: 0 },
      { name: 'Sleep Architecture', type: 'concept', lineIdx: 0 },
      { name: 'Sleep Debt', type: 'concept', lineIdx: 0 },
      { name: 'Sleep Hygiene', type: 'concept', lineIdx: 0 },
    ],
    generatedPages: [
      { title: 'Sleep Architecture', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: 'The structure of sleep cycles including NREM Stage 3 (deep sleep for physical restoration) and REM (emotional processing and memory consolidation), with each cycle lasting approximately 90 minutes.' },
      { title: 'Glymphatic System', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: 'The brain\'s waste clearance system that operates primarily during deep sleep. Chronic sleep deprivation reduces glymphatic clearance by up to 60%, potentially linking poor sleep to Alzheimer\'s disease.' },
      { title: 'Sleep Debt', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: 'The cumulative effect of insufficient sleep. After one week of 6 hours per night, cognitive performance equals that at 0.05% blood alcohol content. Chronic sleep debt is linked to hormonal disruption and cognitive decline.' },
      { title: 'Caffeine Half-Life', path: 'wiki/concepts/caffeine-half-life.md', tags: ['Health', 'Sleep'], summary: 'Caffeine has a half-life of approximately 6 hours. Consuming caffeine after 2 PM can significantly disrupt sleep quality by blocking adenosine receptors, preventing the natural buildup of sleep pressure.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 2, to: 3 },
    ],
    chatQuestion: 'How does chronic sleep deprivation affect long-term brain health?',
    chatAnswerLead: <><BoldLink>Chronic sleep deprivation</BoldLink> impairs the <BoldLink>glymphatic system</BoldLink> — the brain\'s waste clearance mechanism that operates during deep sleep. Research shows clearance drops by up to 60% with sustained poor sleep, creating a direct link to neurodegenerative disease risk.</>,
    chatAnswerDetail: 'Beyond glymphatic dysfunction, sleep debt also disrupts testosterone production (10–15% drop with 5h sleep), impairs insulin sensitivity, and degrades prefrontal cortex function — the area responsible for decision-making and impulse control.',
    chatSource: 'sleep-hygiene.md',
    extractedItemsZh: [
      { name: '黄芪', type: 'entity', lineIdx: 0 },
      { name: '八段锦', type: 'entity', lineIdx: 0 },
      { name: '北京中医药大学', type: 'entity', lineIdx: 0 },
      { name: '九种体质', type: 'concept', lineIdx: 0 },
      { name: '痰湿质', type: 'concept', lineIdx: 0 },
      { name: '阴虚质', type: 'concept', lineIdx: 0 },
    ],
    generatedPagesZh: [
      { title: '九种体质学说', path: 'wiki/concepts/nine-constitutions.md', tags: ['中医', '养生'], summary: '中医将人体体质分为九种类型：平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、血瘀质、气郁质、特禀质。理解自身体质是个性化健康管理的基础。' },
      { title: '痰湿质', path: 'wiki/concepts/phlegm-dampness.md', tags: ['中医', '代谢'], summary: '痰湿质表现为体型偏胖、容易困倦、面部油腻。与代谢综合征高度重叠，2型糖尿病风险升高3倍。调理以控制饮食、增加运动为核心。' },
      { title: '阴虚质', path: 'wiki/concepts/yin-deficiency.md', tags: ['中医', '睡眠'], summary: '阴虚质表现为口干舌燥、手心发热、易失眠。长期熬夜（23:00后入睡）持续6个月即可从平和质转为阴虚质。调理以滋阴降火、规律作息为主。' },
      { title: '黄芪', path: 'wiki/entities/astragalus.md', tags: ['中药', '补气'], summary: '黄芪为补气要药，常用于气虚质的调理。与党参配伍炖汤，配合八段锦练习，4-6周可改善精力状态。现代研究证实其具有免疫调节和抗疲劳作用。' },
    ],
    chatQuestionZh: '长期熬夜对身体有哪些具体的循证影响？',
    chatAnswerLeadZh: <><BoldLink>长期熬夜</BoldLink>最直接的影响是破坏<BoldLink>昼夜节律</BoldLink>——持续6个月23:00后入睡，即可将<BoldLink>平和质</BoldLink>转为<BoldLink>阴虚质</BoldLink>。研究显示，熬夜人群的皮质醇节律紊乱、胰岛素敏感性下降、炎症标志物升高。</>,
    chatAnswerDetailZh: '从中医角度，熬夜耗伤阴液，导致阴虚火旺；从现代医学角度，睡眠不足会降低瘦素、升高胃饥饿素，增加高糖高脂食物的摄入欲望，形成"熬夜→吃垃圾食品→痰湿加重"的恶性循环。',
    chatSourceZh: '养生笔记.md',
  },
  {
    id: 'reading',
    label: 'Deep Reading',
    labelZh: '深度阅读',
    Icon: BookOpen,
    filename: 'thinking-fast-and-slow.md',
    sourceNote: `# Thinking, Fast and Slow — Reading Notes

Kahneman\'s dual-process model of cognition. The thesis: we think we\'re rational,
but we\'re governed by an intuitive System 1 that makes systematic errors.

## System 1 vs System 2
- System 1: fast, automatic, effortless. Recognizes faces, detects hostility in a
  voice, answers 2+2. Always on.
- System 2: slow, deliberate, effortful. Multiplies 17×24, fills out a tax form,
  checks the validity of a logical argument. Lazily defaults to System 1.

The core problem: System 2 is lazy. It endorses System 1\'s snap judgments without
checking them. This is the source of most cognitive biases.

## Key Heuristics and Biases

**Availability Heuristic**
We judge frequency by how easily examples come to mind. Shark attacks feel more
common than diabetes complications because media coverage makes them vivid — yet
diabetes kills 200,000× more people annually.

**Anchoring**
Exposure to a number anchors subsequent judgments. Real estate agents shown a high
list price estimate 15% higher than those shown a low one — even when they insist
the anchor had no effect. The effect is unconscious.

**Loss Aversion**
Losses hurt roughly twice as much as equivalent gains feel good. This explains why:
- People hold losing stocks, sell winners (disposition effect)
- "Free shipping" works better than "$5 off"
- Salary cuts are met with outrage, even when inflation-adjusted pay rises

## Prospect Theory (the Nobel-winning insight)
Utility is reference-dependent. We evaluate outcomes relative to a reference point,
not in absolute terms. A $1,000 bonus feels great; a $1,000 bonus when your
colleague got $2,000 feels like a loss.

## My Takeaways
- Before any major decision, force System 2 activation: write down the problem,
  list what biases might apply, sleep on it.
- Meetings: never present a number first unless you want to anchor the discussion.
- Personal finance: automate decisions (System 1) to protect savings from impulsive
  spending. Set it and forget it.

## Questions I\'m Still Thinking About
- Can System 1 be trained? Chess grandmasters\' pattern recognition suggests yes.
- Are there domains where System 1 outperforms System 2? (Blink vs. deliberation?)
- How does this interact with LLM reasoning? Are LLMs pure System 2, or can they
  simulate System 1 intuition?`,
    sourceNoteZh: `# 《思考，快与慢》阅读笔记

卡尼曼用"系统1/系统2"的框架，解释了我们为什么明明不傻，却总是做出错误的判断。

## 系统 1 与系统 2
- 系统 1：快速、自动、不费力。识别面孔、察觉对方语气里的敌意、算 2+2。全天候运行
- 系统 2：缓慢、需要努力、按步骤推理。算 17×24、填写税表、检查逻辑三段论。它很懒惰，经常直接采纳系统 1 的直觉判断

核心洞见：大多数错误不是"不知道"，而是系统 2 懒得审查。你以为自己在思考，其实你的系统 1 已经替你做完了决定。

## 几个让我停下来的启发式偏差

**可得性启发**
我们根据"想起来有多容易"来判断概率。空难比糖尿病并发症更让人恐惧，因为新闻每天都在报道——但实际上糖尿病每年多杀死 20 万倍的患者。你的担心和实际风险，毫无关系。

**锚定效应**
你看到的第一个数字会"锚住"你后续的判断。房地产中介看到高价挂牌价时，估价平均高 15%，并且坚持声称"锚点没有影响我"。这个效应完全不在意识层面。

**损失厌恶**
亏损的痛苦大约是同等收益带来的快乐的 2 倍。这解释了：
- 散户永远在止损前三思而不行，却迫不及待落袋为安
- "免运费"比"立减 5 元"更好卖
- 降薪会激起巨大愤怒，哪怕实际购买力相比去年是上涨的

## 前景理论（卡尼曼靠这个得了诺奖）
效用的评判基准是"参照点"，而非绝对值。涨薪 1000 元很高兴；涨薪 1000 元但同事涨了 2000 元——痛不欲生。

## 我打算怎么用
- 重要决策前（跳槽、大额消费、合作分账），先写下来，列出可能影响的偏差，睡三晚再回来看
- 开会永远不要先报数字（除非你打算锚定别人），不要被对方第一个数字带跑
- 个人储蓄和投资，自动化管理：把系统 2 的计划写成规则，让系统 1 无脑执行。每月自动定投，不看不查

## 还在思考的问题
- 系统 1 能被训练成"直觉=准"吗？象棋大师的pattern recognition似乎证明了可以
- 有没有「系统 1 比系统 2 更好的」领域？Malcolm Gladwell 的 Blink 就是讲这个
- LLM 的推理是纯系统 2 吗？还是大模型某种程度上已经形成了系统 1 式的"直觉"？`,
    extractedItems: [
      { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
      { name: 'System 1', type: 'concept', lineIdx: 0 },
      { name: 'System 2', type: 'concept', lineIdx: 0 },
      { name: 'Availability Heuristic', type: 'concept', lineIdx: 0 },
      { name: 'Anchoring', type: 'concept', lineIdx: 0 },
      { name: 'Loss Aversion', type: 'concept', lineIdx: 0 },
    ],
    generatedPages: [
      { title: 'System 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: 'The fast, automatic, and effortless thinking system that operates continuously. It recognizes patterns, makes snap judgments, and relies on intuition. It is the source of most cognitive biases because it operates below conscious awareness.' },
      { title: 'System 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: 'The slow, deliberate, and effortful thinking system responsible for complex reasoning, logical analysis, and conscious decision-making. It is lazy by design and often defaults to endorsing System 1\'s judgments without verification.' },
      { title: 'Anchoring Effect', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: 'A cognitive bias where exposure to an initial number disproportionately influences subsequent judgments. The effect operates unconsciously — even experts who deny being influenced show the full anchoring effect in controlled experiments.' },
      { title: 'Prospect Theory', path: 'wiki/concepts/prospect-they.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'Developed by Kahneman and Tversky, prospect theory shows that people evaluate outcomes relative to a reference point rather than in absolute terms. Losses hurt approximately twice as much as equivalent gains feel good (loss aversion).' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 2, to: 3 },
    ],
    chatQuestion: 'How does System 1 interact with System 2 in decision-making?',
    chatAnswerLead: <><BoldLink>System 1</BoldLink> generates intuitions and snap judgments continuously, while <BoldLink>System 2</BoldLink> lazily endorses them without verification most of the time. Effective decision-making requires deliberately forcing <BoldLink>System 2</BoldLink> activation — writing down the problem, listing potential biases, and sleeping on it before acting.</>,
    chatAnswerDetail: 'The key insight from Kahneman is that System 2 is not a reliable check on System 1. It requires conscious effort to activate, and most of the time it simply rationalizes whatever System 1 already decided.',
    chatSource: 'thinking-fast-and-slow.md',
    extractedItemsZh: [
      { name: '丹尼尔·卡尼曼', type: 'entity', lineIdx: 0 },
      { name: '系统1', type: 'concept', lineIdx: 0 },
      { name: '系统2', type: 'concept', lineIdx: 0 },
      { name: '可得性启发', type: 'concept', lineIdx: 0 },
      { name: '锚定效应', type: 'concept', lineIdx: 0 },
      { name: '损失厌恶', type: 'concept', lineIdx: 0 },
    ],
    generatedPagesZh: [
      { title: '系统1与系统2', path: 'wiki/concepts/system-1-system-2.md', tags: ['认知科学', '心理学'], summary: '卡尼曼提出的双系统理论：系统1是快速、自动、直觉的思维；系统2是缓慢、费力、理性的思维。大多数决策错误源于系统2懒得审查系统1的直觉判断。' },
      { title: '可得性启发', path: 'wiki/concepts/availability-heuristic.md', tags: ['认知偏差', '决策'], summary: '人们根据"想起来有多容易"来判断事件频率。媒体曝光度高的风险（如空难）被高估，而实际更危险的风险（如糖尿病）被低估。可得性启发是投资、健康决策中最常见的偏差之一。' },
      { title: '锚定效应', path: 'wiki/concepts/anchoring-effect.md', tags: ['认知偏差', '谈判'], summary: '先接触到的数字会锚定后续判断。房地产中介面对高价挂牌价时，估价平均高15%，且声称"未受影响"。锚定效应完全在潜意识层面运作，连专家也无法免疫。' },
      { title: '前景理论', path: 'wiki/concepts/prospect-theory.md', tags: ['行为经济学', '心理学'], summary: '卡尼曼与特沃斯基提出的理论：人们对收益和损失的效用评估基于参照点而非绝对值。损失带来的痛苦约为同等收益带来快乐的2倍。解释了为何降薪比不涨薪更令人愤怒。' },
    ],
    chatQuestionZh: '系统1和系统2在决策中如何分工与配合？',
    chatAnswerLeadZh: <><BoldLink>系统1</BoldLink>全天候运行，负责生成直觉和快速判断；<BoldLink>系统2</BoldLink>本应负责审查这些判断，但它非常懒惰，大多数时候直接采纳系统1的结论。有效的决策需要刻意激活系统2——写下问题、列出可能的偏差、睡一觉再决定。</>,
    chatAnswerDetailZh: '卡尼曼的核心洞察是：系统2不是系统1的可靠检查员。它需要刻意努力才能激活，而大多数时候它只是为系统1已经做出的决定寻找合理化解释。这也是为什么"道理我都懂，但就是做不到"——知识在系统2，行动在系统1。',
    chatSourceZh: '思考快与慢.md',
  },
  {
    id: 'inspiration',
    label: 'Inspiration',
    labelZh: '灵感搜集',
    Icon: Scissors,
    filename: 'thinking-clippings.md',
    sourceNote: `# Mental Models & Thinking — Clippings Collection

Random collection. I add to this whenever a mental model shows up across multiple
books or conversations.

## On Facts and Beliefs
> Clipped from James Clear
"Humans need a reasonably accurate view of the world in order to navigate it. But
\'accurate\' is not the only thing our minds prioritize. If a brain anticipates a
reward for adopting a particular belief, it\'s perfectly happy to do so. The result
is that false beliefs can be held not because they are true, but because they serve
a social purpose — they help us bond with our tribe."

## How to Think for Yourself
> Clipped from Paul Graham
"There are some kinds of work that you can\'t do well unless you think differently
from your peers. The difficulty is that people are often mistaken about where they
fall on the spectrum. The most conventional-minded people are confident that they\'re
independent-minded, while the genuinely independent-minded worry they might not be
independent-minded enough."

## Second-Order Thinking
> Clipped from Farnam Street
"First-order thinking is simplistic and superficial, and just about everyone can do
it. Second-order thinking is the practice of tracing the chain of consequences that
follow from a decision. The simplest way to practice it is to repeatedly ask \'And
then what?\' after each projected outcome. Many extraordinary results come from
decisions that are first-order negative but second-order positive."

## Inversion
> Clipped from Farnam Street
"The core premise of inversion is that you should not approach difficult problems
from only one direction. Instead, examine them both forward and backward. Instead
of asking how to achieve a desired outcome, ask how you could guarantee the
opposite — then systematically avoid those things. Charlie Munger: \'All I want to
know is where I\'m going to die, so I\'ll never go there.\'"

## On Forecasting
> Clipped from Morgan Housel
"Most problems are more complicated than they look, but most solutions should be
simpler than they are. A lot of what people call conviction is really a willful
disregard for new information that might make you change your mind. Read fewer
forecasts and more history. Study more failures and fewer successes."

## What I Want To Connect
- Facts vs beliefs → social bonding mechanism?
- Second-order thinking + inversion → both reward depth over breadth
- Graham\'s spectrum → how do I know where I actually fall?`,
    sourceNoteZh: `# 思考碎片 · 剪藏文集

写在一个杂乱笔记里的各种想法和观察。遇到第三个"跟这个有关"的瞬间就会更新进来。

## 信息环境与独立思考
> 剪自 晚点LatePost 对刘海龙的访谈
"如果你把所有问题归结为媒介，认为不使用媒介，就没有这些问题。我觉得这过于简化了。
人类社会就是跟着媒介发展，人的进化也是跟着媒介变化、技术变化不断在变化。整个信息
环境如同气候，人类得学会适应新的媒介形态、信息分发方式，和它一同进化。不是叙事，
而是怎样操控你的情绪。我们会失去时间感、历史感。人们搞不清楚很多东西的因果关系。
这种非理性的思维方式就是反因果、反历史的。"

## 不要用上一代的方法论
> 剪自 晚点LatePost 对 MiniMax 创始人闫俊杰的访谈
"更好的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型。中国
大部分公司，不管创业公司还是大厂，都还在用做推荐系统的方法来做大模型产品。推荐的
逻辑是：用户越多，反馈越多，推荐引擎越聪明。而 AI 大模型和产品的真实关系是：更好
的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型。"

## 站在大多数人对面的勇气
> 剪自 北京青年周刊 对王小伟的访谈
"马克·吐温讲过，当你发现自己站在大多数人的一边时，你应该停下来反思。这句话除了
在排队上车时不好用，其他情况都好用。每个人的第一任务，不是读海德格尔，是真诚面对
自己的日常。我们的注意力需要有开放性，能够接受不愉快，并将其视为一种必要的异质性
和否定性。哲学就是如鲠在喉，要持续制造不适感。"

## 专注与复利
> 剪自 晚点LatePost 对宇树科技创始人王兴兴的访谈
"很多时候就是灵感涌现。你24小时一直在思考这个问题，我不信问题解决不了。我觉得主要
是你足够专注。我们主要的对手还是自己，就是我们每天、每月、每年比自己过去做得更好，
同行基本就追不上。当你做的事情符合时代的主旋律，一些好的资源都会向你倾斜。"

## 创新是一种信念
> 剪自 晚点LatePost 对 DeepSeek 创始人梁文锋的访谈
"我们真正缺乏的不是资金，而是信心，以及组织高水平人才进行有效创新的能力。有经验
的人可能会被固有的思维束缚，而没有经验的人更愿意反复摸索，找到符合当前实际情况的
解决方案。尽可能少干预，让每个人有自由发挥的空间和试错机会。创新首先是一种信念。
为什么硅谷的创新能力强？首先是敢。所有策略都是上一代的产物，未来未必仍然适用。"

## 我想理清的关系
- 刘海龙的信息环境 + 王小伟的反思 → 如何不被媒介操控情绪？
- 闫俊杰的方法论 + 梁文锋的信念 → 创新需要放弃哪些"经验"？
- 王兴兴的专注 + 梁文锋的敢 → 长期主义的两个侧面`,
    extractedItems: [
      { name: 'James Clear', type: 'entity', lineIdx: 0 },
      { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
      { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
      { name: 'Second-Order Thinking', type: 'concept', lineIdx: 0 },
      { name: 'Inversion', type: 'concept', lineIdx: 0 },
      { name: 'Independent-Mindedness', type: 'concept', lineIdx: 0 },
    ],
    generatedPages: [
      { title: 'Second-Order Thinking', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: 'The practice of tracing chains of consequences beyond immediate outcomes. The key technique: repeatedly ask "And then what?" after each projected outcome. Many extraordinary results come from decisions that are first-order negative but second-order positive.' },
      { title: 'Inversion', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: 'A problem-solving approach that examines problems from both forward and backward directions. Instead of asking how to achieve an outcome, ask how to guarantee the opposite — then avoid those things. "Avoiding stupidity is easier than seeking brilliance."' },
      { title: 'Independent-Mindedness', path: 'wiki/concepts/independent-mindedness.md', tags: ['Thinking', 'Psychology'], summary: 'The ability to think differently from one\'s peers. Consists of three components: fastidiousness about truth, resistance to being told what to think, and curiosity. The most conventional-minded often believe they are independent-minded.' },
      { title: 'Social Belief Formation', path: 'wiki/concepts/social-belief-formation.md', tags: ['Psychology', 'Cognition'], summary: 'False beliefs can be held not because they are true, but because they serve a social purpose — helping us bond with our tribe. The hardest minds to change are those who are not just wrong but lonely.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 2, to: 3 },
    ],
    chatQuestion: 'What is the common thread between Second-Order Thinking and Inversion?',
    chatAnswerLead: <><BoldLink>Second-Order Thinking</BoldLink> and <BoldLink>Inversion</BoldLink> both reward depth over breadth and require resisting System 1\'s immediate intuition. Second-order thinking traces consequences forward; inversion traces failures backward. Both force you to look beyond what is obvious.</>,
    chatAnswerDetail: 'Where they differ: Second-order thinking is additive (what else happens?), while inversion is subtractive (what should I avoid?). Used together, they form a powerful decision framework: use inversion to eliminate bad options, then use second-order thinking to evaluate the remaining ones.',
    chatSource: 'thinking-clippings.md',
    extractedItemsZh: [
      { name: '刘海龙', type: 'entity', lineIdx: 0 },
      { name: '闫俊杰', type: 'entity', lineIdx: 0 },
      { name: '梁文锋', type: 'entity', lineIdx: 0 },
      { name: '信息茧房', type: 'concept', lineIdx: 0 },
      { name: '方法论', type: 'concept', lineIdx: 0 },
      { name: '创新信念', type: 'concept', lineIdx: 0 },
    ],
    generatedPagesZh: [
      { title: '信息环境与独立思考', path: 'wiki/concepts/information-environment.md', tags: ['媒介', '认知'], summary: '信息环境如同气候，人类需要学会适应新的媒介形态。真正的风险不是信息偏食，而是失去时间感、历史感和因果判断能力。独立思考的关键是保持注意力的开放性。' },
      { title: '方法论迭代', path: 'wiki/concepts/methodology-evolution.md', tags: ['创新', '产品'], summary: '每一代技术都有上一代的方法论陷阱。推荐系统的逻辑（用户越多→反馈越多→引擎越聪明）不适用于大模型产品。创新需要识别上一代策略的边界，并建立符合新技术本质的新方法论。' },
      { title: '批判性思维', path: 'wiki/concepts/critical-thinking.md', tags: ['哲学', '认知'], summary: '当你发现自己站在大多数人一边时，应该停下来反思。注意力需要有开放性，能够接受不愉快，并将其视为必要的异质性。哲学的作用是持续制造不适感，拒绝平滑的生活方式。' },
      { title: '专注与复利', path: 'wiki/concepts/focus-compound.md', tags: ['成长', '效率'], summary: '24小时持续思考一个问题，问题终究会解决。真正的对手不是同行，而是过去的自己。当你做的事情符合时代的主旋律，资源会自然倾斜。专注是产生复利效应的前提。' },
    ],
    chatQuestionZh: '信息茧房和独立思考之间是什么关系？',
    chatAnswerLeadZh: <><BoldLink>信息茧房</BoldLink>的本质不是技术问题，而是<BoldLink>注意力</BoldLink>的封闭性。算法推荐只是放大了人类本来就有的"选择性接触"倾向——我们天然倾向于消费让自己舒适的信息。真正的独立思考需要刻意保持<BoldLink>注意力的开放性</BoldLink>，主动接受不愉快的异质性信息。</>,
    chatAnswerDetailZh: '刘海龙指出：信息环境如同气候，人类得学会和它一同进化。王小伟则补充：哲学的作用是持续制造不适感。两者共同指向一个结论——独立思考不是"找到正确答案"，而是"维持一个能容纳否定性的认知状态"。',
    chatSourceZh: '思考碎片剪藏.md',
  },
  {
    id: 'creation',
    label: 'Content Creation',
    labelZh: '内容创作',
    Icon: Mic,
    filename: 'podcast-episode-plan.md',
    sourceNote: `# The Knowledge Stack — Episode 12 Plan

Guest: Dr. Andy Matuschak (independent researcher, ex-Apple, ex-Khan Academy)
Topic: "Tools for Thought and the Future of Reading"

## Guest Background
- Led R&D at Khan Academy on mastery learning algorithms
- Worked at Apple on early iPad education initiatives
- Now runs independent research lab studying tools for thought
- Known for: "Evergreen notes" methodology, "Working in public" research practice
- His essay "Why books don\'t work" sparked major debate in PKM community

## Core Questions
1. You wrote that "books don\'t work" — most people forget 90% of what they read.
   What would a "working" medium for knowledge transfer look like?
2. Your "evergreen notes" system emphasizes atomicity and progressive summarization.
   How does this differ from traditional note-taking?
3. You\'ve been vocal about the gap between tools-for-thought research and mainstream
   adoption. What\'s the biggest blocker?
4. With LLMs now able to answer questions about any book instantly, what\'s the role
   of human reading in 2026?
5. Your research practice is radically open — you publish half-finished thoughts daily.
   Doesn\'t this create noise? How do you balance depth with speed?

## Key References to Mention
- Matuschak, A. (2019). "Why books don\'t work"
- Nielsen, M. (2018). "Reinventing explanation" and "Augmenting human intellect"
- Bush, V. (1945). "As We May Think" — the original memex concept
- Engelbart, D. (1962). "Augmenting Human Intellect" — the mother of all demos

## Narrative Arc
- Open with the "books don\'t work" provocation (2 min)
- Andy explains the research on retention and what\'s broken (8 min)
- Evergreen notes as a proposed solution — atomic, linked, progressive (10 min)
- The LLM disruption — does AI solve the retention problem or make it worse? (12 min)
- Closing: What one habit would Andy recommend to every knowledge worker? (3 min)

## Open Questions for Post-Interview
- Should I read Andy\'s full "Evergreen notes" essay before recording?
- Do I need a second guest for counterpoint (someone who defends books)?
- Recording logistics: async voice memo or live video?`,
    sourceNoteZh: `# 「纸上谈兵」第 24 期节目策划

嘉宾：梁文锋（DeepSeek 创始人）
话题："硬核创新：为什么中国也能做出世界级的大模型"

## 嘉宾背景
- DeepSeek 创始人，2023 年底发布 DeepSeek-V2 引发全球关注
- 幻方量化创始人，国内最早将 AI 应用于量化投资的团队之一
- 核心理念："我们真正缺乏的不是资金，而是信心，以及组织高水平人才进行有效创新的能力"

## 核心问题链
1. DeepSeek-V2 的架构创新（MLA 多头潜在注意力）是如何想到的？为什么其他大厂没有先做出来？
2. 你说"更好的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型"——这直接挑战了推荐系统的底层逻辑。能详细解释吗？
3. 你主张"尽可能少干预，让每个人有自由发挥的空间和试错机会"——在幻方和 DeepSeek，这种文化是如何具体落地的？
4. 面对 OpenAI、Google、Anthropic 这些巨头，DeepSeek 的差异化竞争策略是什么？
5. "所有策略都是上一代的产物，未来未必仍然适用"——你对 AI 未来 3-5 年的判断是什么？哪些"上一代策略"正在失效？

## 引用资料
- DeepSeek-V2 技术报告（MLA 架构详解）
- 梁文锋 2024 年多次访谈合集（晚点LatePost、36氪等）
- 幻方量化发展历程

## 叙事弧线
- 开场：DeepSeek-V2 发布时的全球反响（2 分钟）
- 第一部分：架构创新的来源——为什么不是大厂先做？（8 分钟）
- 第二部分：组织文化——"少干预"如何落地（10 分钟）
- 第三部分：竞争格局——巨头的盲区（10 分钟）
- 结尾：给年轻研究者的建议（5 分钟）

## 待确认事项
- 录制时间：梁文锋近期行程很紧，需协调
- 是否增加英文同传？面向海外听众
- 需要准备哪些技术细节以防深度追问？`,
    extractedItems: [
      { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
      { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
      { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
      { name: 'Tools for Thought', type: 'concept', lineIdx: 0 },
      { name: 'Progressive Summarization', type: 'concept', lineIdx: 0 },
      { name: 'Memex', type: 'concept', lineIdx: 0 },
    ],
    generatedPages: [
      { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: 'Independent researcher studying tools for thought. Formerly at Khan Academy and Apple. Known for "Why books don\'t work" essay and the "evergreen notes" methodology for atomic, linked knowledge management.' },
      { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'A note-taking methodology emphasizing atomicity, concept-orientation, and progressive summarization. Notes are written to be permanently useful and continuously refined, rather than capturing transient thoughts.' },
      { title: 'Tools for Thought', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: 'Software and systems designed to augment human thinking, memory, and creativity. The field draws from cognitive science, HCI, and AI. Key challenge: closing the gap between research prototypes and mainstream adoption.' },
      { title: 'Progressive Summarization', path: 'wiki/concepts/progressive-summarization.md', tags: ['PKM', 'Methodology'], summary: 'A technique for distilling notes through multiple layers of summarization. Each pass adds more compression while preserving retrievability. Allows finding specific details within a dense summary without re-reading the full source.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 },
    ],
    chatQuestion: 'What is the core difference between evergreen notes and traditional note-taking?',
    chatAnswerLead: <><BoldLink>Evergreen notes</BoldLink> are written to be permanently useful and continuously refined, while traditional note-taking captures transient thoughts for short-term recall. Evergreen notes emphasize <BoldLink>atomicity</BoldLink> (one idea per note), <BoldLink>concept-orientation</BoldLink> (named by concept, not source), and <BoldLink>progressive summarization</BoldLink> (multi-layer distillation).</>,
    chatAnswerDetail: 'The key shift is from "what did I read?" to "what do I believe?" Traditional notes are bibliographic; evergreen notes are epistemic. This makes them composable — you can build new ideas by linking atomic notes without re-reading original sources.',
    chatSource: 'podcast-episode-plan.md',
    extractedItemsZh: [
      { name: '梁文锋', type: 'entity', lineIdx: 0 },
      { name: 'DeepSeek', type: 'entity', lineIdx: 0 },
      { name: '幻方量化', type: 'entity', lineIdx: 0 },
      { name: 'MLA架构', type: 'concept', lineIdx: 0 },
      { name: '硬核创新', type: 'concept', lineIdx: 0 },
      { name: '组织文化', type: 'concept', lineIdx: 0 },
    ],
    generatedPagesZh: [
      { title: '梁文锋', path: 'wiki/entities/liang-wenfeng.md', tags: ['创业者', 'AI'], summary: 'DeepSeek创始人，幻方量化创始人。核心理念：中国真正缺乏的不是资金，而是信心和组织高水平人才进行有效创新的能力。主张"尽可能少干预，让每个人有自由发挥的空间和试错机会"。' },
      { title: 'DeepSeek', path: 'wiki/entities/deepseek.md', tags: ['AI', '大模型'], summary: '中国AI公司，2023年底发布DeepSeek-V2引发全球关注。核心创新为MLA（多头潜在注意力）架构，显著降低了推理成本。代表了中国在大模型基础架构层面的原创性突破。' },
      { title: 'MLA架构', path: 'wiki/concepts/mla-architecture.md', tags: ['AI', '架构'], summary: 'Multi-head Latent Attention，DeepSeek-V2的核心创新。通过低秩压缩键值缓存，将推理时的KV缓存减少数倍，同时保持模型性能。这一架构创新使得大模型的推理成本显著降低。' },
      { title: '硬核创新', path: 'wiki/concepts/hardcore-innovation.md', tags: ['创新', '文化'], summary: '梁文锋提出的创新理念：真正的创新来自对技术本质的深度理解，而非应用层的快速迭代。关键要素：敢于挑战主流共识、给予人才充分的试错空间、将组织目标与技术突破深度绑定。' },
    ],
    chatQuestionZh: '梁文锋说的"更好的应用不会导向更好的模型"是什么意思？',
    chatAnswerLeadZh: <>梁文锋指出，<BoldLink>大模型</BoldLink>和<BoldLink>推荐系统</BoldLink>遵循完全不同的增长逻辑。推荐系统的逻辑是"用户越多→反馈越多→引擎越聪明"，但大模型的真实关系是"更好的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型"。模型能力的提升来自算法、数据和算力的突破，而非用户反馈的循环。</>,
    chatAnswerDetailZh: '这一判断直接挑战了中国互联网"流量至上"的默认假设。它意味着做大模型不能像做App那样追求DAU增长，而需要长期、高额、低反馈的基础研发投入。DeepSeek选择了一条与多数大厂不同的路：优先投入基础研究，而非优先追求产品化。',
    chatSourceZh: '播客节目策划.md',
  },
  {
    id: 'ai-frontier',
    label: 'AI Frontier',
    labelZh: 'AI 前沿',
    Icon: Cpu,
    filename: 'attention-is-all-you-need.md',
    sourceNote: `# Attention Is All You Need — Notes

The paper that killed RNNs and birthed the Transformer. Vaswani et al., 2017.

## The Core Idea
Instead of processing tokens sequentially (RNN style), process everything in
parallel using "attention" — let each token look at every other token and decide
which ones matter. The key insight: sequential processing was the bottleneck,
not a feature.

## Three Attention Mechanisms
- Self-Attention: every word in a sentence attends to every other word. This
captures long-range dependencies that RNNs lose after ~50 tokens.
- Multi-Head Attention: run 8 parallel attention operations, each learning
different relationship types (syntax, semantics, coreference). Concatenate
the results. Each head specializes in something different.
- Scaled Dot-Product: the Q·K^T operation divided by sqrt(d_k). Without the
scaling factor, gradients explode at high dimensions. The math is simple;
the engineering insight is the scaling.

## Positional Encoding
Since there's no recurrence, the model has no idea about word order. The fix:
add sine/cosine waves of different frequencies to input embeddings. This gives
the model position information without adding parameters. Delete this section
and the model becomes a bag-of-words.

## Why This Changed Everything
- Training was parallelizable (RNNs trained token-by-token, Transformers train
the whole sequence at once) → scale to larger datasets
- Long-range dependencies: RNNs had ~50-token memory; Transformers have no
fixed limit (bounded by context window, which grew from 512 to 1M+ tokens)
- This paper led directly to: BERT (2018), GPT (2018+), every modern LLM

## Open Questions
- Is attention truly the final form? State Space Models (Mamba, S4) challenge
the quadratic complexity of attention
- Do multiple heads actually learn distinct patterns, or are they redundant?`,
    sourceNoteZh: `# Transformer 论文核心要点

"Attention Is All You Need" — 这篇论文终结了 RNN 时代。
Vaswani 等，2017，Google Brain。

## 核心思想
RNN 逐词处理序列（像念书一样一个字一个字读），Transformer 一次看完整句话，
用"注意力机制"让每个词自己决定要关注句子里的哪些其他词。关键洞察：
顺序处理不是优点，是瓶颈。

## 三个注意力机制
- 自注意力（Self-Attention）：句子中每个词同时关注所有词，捕捉长距离依赖。
RNN 在超过 50 个 token 后"记忆"衰减，Transformer 没有这个限制
- 多头注意力（Multi-Head）：8 组并行的注意力运算，每组学习不同类型的关系
——句法、语义、指代。然后拼接起来。不同头会各自专精某种模式
- 缩放点积：Q·K^T 除以 sqrt(d_k)。不用这个缩放因子，高维空间内积值过大，
梯度会爆炸。数学很直白，但工程上这个因子是整个计算的定海神针

## 位置编码
Transformer 没有循环结构，天然不知道词的顺序。方案：在输入嵌入上叠加不同
频率的正弦/余弦波。这样模型获得了位置信息，且不增加任何可训练参数。
删掉这一段，模型就退化成一个词袋模型——"今天吃午饭"和"午饭吃今天"没有区别。

## 为什么这篇论文改变了整个 AI
- 训练可并行化：RNN 必须逐 token 跑，Transformer 一次处理全序列 → 数据量级
直接飞跃。GPT 系列、BERT、Claude、Gemini 全都站在这个地基上
- 长距离依赖：RNN 记忆约 50 个 token 后衰减，Transformer 只受上下文窗口限制。
从 2017 年的 512 token 到今天的 1M+ token——全部建立在"不再需要 RNN"这个基础
决策之上
- 这条线的直接产物：BERT (2018) → GPT 系列 → 你今天能用的每一个 LLM

## 还没弄懂
- 注意力是"终极形态"吗？State Space Models（Mamba, S4）正在挑战注意力的二次
复杂度。线性注意力不需要 O(n²)
- 多头注意力的各个"头"真的学到了不同的东西吗？还是大部分头其实是冗余的？
论文说要验证，但我没找到权威的实验证据`,
    extractedItems: [
      { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
      { name: 'BERT', type: 'entity', lineIdx: 0 },
      { name: 'GPT', type: 'entity', lineIdx: 0 },
      { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
      { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
      { name: 'Positional Encoding', type: 'concept', lineIdx: 0 },
    ],
    generatedPages: [
      { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'The core mechanism of the Transformer: every token in a sequence attends to every other token simultaneously, computing weighted relationships. This enables parallel processing and captures long-range dependencies that RNNs cannot maintain beyond ~50 tokens.' },
      { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: 'Runs multiple parallel attention operations (typically 8-16 heads), each learning different types of relationships (syntax, semantics, coreference). The outputs are concatenated and linearly projected, allowing the model to jointly attend to information from different representation subspaces.' },
      { title: 'Positional Encoding', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Since Transformers process all tokens in parallel (not sequentially), they have no inherent notion of word order. Positional encoding adds sine/cosine waves of varying frequencies to input embeddings, encoding position information without adding trainable parameters.' },
      { title: 'State Space Models', path: 'wiki/concepts/state-space-models.md', tags: ['AI', 'Architecture'], summary: 'A new class of sequence models (Mamba, S4) that challenge Transformer\'s O(n²) attention complexity. They achieve linear scaling with sequence length while maintaining competitive performance, potentially replacing attention as the dominant architecture.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 0, to: 3 },
    ],
    chatQuestion: 'Is attention the final form, or will State Space Models replace it?',
    chatAnswerLead: <><BoldLink>Attention</BoldLink> is not the final form — <BoldLink>State Space Models</BoldLink> (Mamba, S4) are already challenging its O(n²) complexity. SSMs achieve <BoldLink>linear scaling</BoldLink> with sequence length while maintaining competitive performance on long-context tasks.</>,
    chatAnswerDetail: 'However, attention has a massive ecosystem advantage: every major LLM (GPT, Claude, Gemini) is built on it, and the hardware (GPUs) is optimized for matrix multiplication. SSMs need to prove not just theoretical efficiency but practical superiority at scale before replacing attention entirely.',
    chatSource: 'attention-is-all-you-need.md',
    extractedItemsZh: [
      { name: 'Vaswani', type: 'entity', lineIdx: 0 },
      { name: 'Google Brain', type: 'entity', lineIdx: 0 },
      { name: 'DeepSeek', type: 'entity', lineIdx: 0 },
      { name: '自注意力', type: 'concept', lineIdx: 0 },
      { name: '多头注意力', type: 'concept', lineIdx: 0 },
      { name: '位置编码', type: 'concept', lineIdx: 0 },
    ],
    generatedPagesZh: [
      { title: '自注意力机制', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'Transformer的核心机制：序列中每个词同时关注所有其他词，计算加权关系。这使得并行处理成为可能，并能捕捉RNN无法维持的长距离依赖（超过50个token后RNN记忆衰减）。' },
      { title: '多头注意力', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: '并行运行多组注意力运算（通常8-16个头），每组学习不同类型的关系（句法、语义、指代）。输出拼接后线性投影，使模型能够联合关注不同表示子空间的信息。' },
      { title: '位置编码', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: '由于Transformer并行处理所有词，没有词序概念。位置编码通过叠加不同频率的正弦/余弦波到输入嵌入上，在不增加可训练参数的情况下编码位置信息。' },
      { title: '状态空间模型', path: 'wiki/concepts/state-space-models.md', tags: ['AI', '架构'], summary: '一类新型序列模型（Mamba, S4），挑战Transformer的O(n²)注意力复杂度。它们实现与序列长度成线性比例的扩展，同时保持竞争性能，有可能取代注意力成为主导架构。' },
    ],
    chatQuestionZh: 'Transformer的注意力机制会被状态空间模型取代吗？',
    chatAnswerLeadZh: <><BoldLink>注意力</BoldLink>不是终极形态——<BoldLink>状态空间模型</BoldLink>（Mamba, S4）正在挑战其O(n²)的二次复杂度。SSM实现了与序列长度成<BoldLink>线性比例</BoldLink>的扩展，在长上下文任务上保持竞争性能。</>,
    chatAnswerDetailZh: '但注意力拥有巨大的生态优势：GPT、Claude、Gemini等所有主流LLM都建立在它之上，GPU硬件也针对矩阵乘法优化。SSM需要证明的不仅是理论效率，还有大规模实践中的优越性，才能真正取代注意力。',
    chatSourceZh: 'Transformer论文笔记.md',
  },
  {
    id: 'business',
    label: 'Business',
    labelZh: '商业分析',
    Icon: TrendingUp,
    filename: 'stripe-strategy.md',
    sourceNote: `# Stripe's Strategic Evolution

## From Developer Tool to Economic Infrastructure

Stripe started as "7 lines of code to accept payments." But that framing
obscures the real strategy: they didn't win by making payments easier —
they won by making the developer the buyer.

## Key Strategic Moves
- **API-first distribution**: every developer who integrates Stripe becomes
  an internal champion. No sales team needed for SMB segment
- **Compound product**: Payments → Billing → Tax → Treasury → Issuing. Each
  product leverages data from the previous one. Switching costs increase
  exponentially — you can replace a payment processor, you can't replace
  your entire financial stack
- **Card network bypass**: Stripe's direct integrations with Visa/Mastercard
  remove acquirer middlemen. Estimated 15–25 bps margin advantage over
  competitors who route through legacy acquirers

## Revenue Model
- 2.9% + $0.30 per transaction (core payments)
- Billing/Tax/Radar: additional 0.4–0.8% per transaction
- Growing revenue share from non-payment products (Link, Capital, Atlas)
- Estimated $1T+ total payment volume (2023), implying ~$14B+ net revenue

## Competitive Position
- vs Adyen: Stripe wins on developer experience; Adyen wins on enterprise
- vs Square: Stripe online-first; Square POS-first. Converging
- vs Braintree: Stripe has pulled ahead significantly since 2020
- Threat: in-house builds by large merchants (Shopify, DoorDash)

## Open Questions
- Can Stripe maintain growth without expanding into lending/lending-adjacent?
- China/SEA expansion still minimal — regulatory barrier or strategic choice?`,
    sourceNoteZh: `# Temu 出海策略分析

Temu 上线不到两年，下载量超过 2 亿。靠的不是低价——中国跨境电商从来不缺低价。
它的真正策略被大多数人误读了。

## 核心策略不是"便宜"

**全托管模式才是真正的护城河**
传统跨境电商：商家负责选品、定价、物流、售后，平台只是流量入口。
Temu 全托管：商家只负责供货和报一个出厂价。定什么价、上什么渠道、
怎么发货、怎么退款——全部由 Temu 决定。

这意味着什么？Temu 不是"卖便宜货的电商"，而是"具有零售定价权
的全球供应链调度系统"。它掌握了从工厂到消费者之间的每一个环节的
全部数据。这个数据闭环，SHEIN 用 10 年做到，Temu 用 18 个月。

## 单位经济学的关键
- 航空小包直邮，单件履约成本约 $3–5，比亚马逊 FBA 便宜 60%
- 免运费门槛从 $10 提到 $29，证明履约成本正在被规模摊薄
- 但：退货率约 30%（服装品类），远超亚马逊的 15%。退货是 Temu
  最大的成本黑洞

## 争议与风险
- 美国国会正在推进 de minimis 规则修改（800 美元以下免税政策），
  若取消将直接冲击 Temu 的单位经济模型
- 品牌化缺失：用户记住的是"Temu 便宜"，记不住任何品牌
- SHEIN 和 TikTok Shop 正在加速追赶。拼多多在国内靠"五环外"起家
  ——但美国没有"五环外"这个需求结构

## 还没想清楚的问题
- Temu 的终局是"全球版的拼多多"还是"下一个 Wish"？
- 全托管模式的盈利路径：PDD Holdings 财报从未单独披露 Temu 亏损，
  但市场估算 Temu 每年烧掉 50–80 亿人民币。什么时候能回正？
- 如果 de minimis 取消，Temu 的应对方案是什么？海外仓？本土化？`,
    extractedItems: [
      { name: 'Stripe', type: 'entity', lineIdx: 0 },
      { name: 'Visa', type: 'entity', lineIdx: 0 },
      { name: 'Mastercard', type: 'entity', lineIdx: 0 },
      { name: 'API-First Distribution', type: 'concept', lineIdx: 0 },
      { name: 'Compound Product', type: 'concept', lineIdx: 0 },
      { name: 'Payment Volume', type: 'concept', lineIdx: 0 },
    ],
    generatedPages: [
      { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: 'Payment infrastructure company founded in 2010. Core strategy: API-first distribution targeting developers as buyers, then expanding into compound products (Billing, Tax, Treasury, Issuing). Estimated $1T+ payment volume and $14B+ net revenue.' },
      { title: 'API-First Distribution', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'A go-to-market strategy where the product is primarily accessed and distributed through APIs. Every developer who integrates becomes an internal champion, creating bottom-up adoption without traditional sales teams. Stripe is the canonical example.' },
      { title: 'Compound Product Strategy', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: 'Building interconnected products where each new layer leverages data and relationships from previous layers. Switching costs increase exponentially — replacing one product is easy, replacing the entire stack is nearly impossible. Stripe\'s Payments → Billing → Tax → Treasury → Issuing is the archetype.' },
      { title: 'Card Network Economics', path: 'wiki/concepts/card-network-economics.md', tags: ['Fintech', 'Payments'], summary: 'The fee structure of card payment networks (Visa, Mastercard) and how payment processors interact with them. Direct integration (bypassing acquirers) can yield 15–25 basis points of margin advantage. Understanding interchange fees, scheme fees, and acquirer margins.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 2, to: 3 },
    ],
    chatQuestion: 'Can Stripe maintain growth without expanding into lending?',
    chatAnswerLead: <><BoldLink>Stripe</BoldLink> faces a classic growth ceiling: payment processing margins are compressing (2.9% + $0.30 is already under pressure from in-house builds by Shopify, DoorDash, etc.). The company must either expand into higher-margin adjacent services (lending, treasury, capital) or accept lower growth rates.</>,
    chatAnswerDetail: 'The compound product strategy (Payments → Billing → Tax → Treasury → Issuing) is Stripe\'s answer: each layer builds on the previous one, making the entire stack progressively harder to replace. But lending is the highest-margin financial service — and the one Stripe has been most cautious about entering.',
    chatSource: 'stripe-strategy.md',
    extractedItemsZh: [
      { name: 'Temu', type: 'entity', lineIdx: 0 },
      { name: '拼多多', type: 'entity', lineIdx: 0 },
      { name: 'SHEIN', type: 'entity', lineIdx: 0 },
      { name: '全托管模式', type: 'concept', lineIdx: 0 },
      { name: '单位经济学', type: 'concept', lineIdx: 0 },
      { name: 'de minimis', type: 'concept', lineIdx: 0 },
    ],
    generatedPagesZh: [
      { title: 'Temu', path: 'wiki/entities/temu.md', tags: ['跨境电商', '出海'], summary: '拼多多旗下跨境电商平台，2022年上线。核心创新为"全托管模式"——商家只供货，定价、物流、售后全部由平台决定。18个月内构建了覆盖全球的供应链调度系统，下载量超2亿。' },
      { title: '全托管模式', path: 'wiki/concepts/full-service-model.md', tags: ['跨境电商', '商业模式'], summary: 'Temu的核心商业模式：商家只负责供货和报出厂价，平台掌握定价权、渠道选择、物流和售后。这使得Temu成为"具有零售定价权的全球供应链调度系统"，而非传统的流量中介平台。' },
      { title: '单位经济学', path: 'wiki/concepts/unit-economics.md', tags: ['商业', '财务'], summary: 'Temu的单位经济学关键数据：航空小包直邮单件履约成本$3-5（比亚马逊FBA便宜60%），免运费门槛从$10提至$29证明规模效应。但退货率约30%（服装品类）是最大成本黑洞。' },
      { title: 'de minimis规则', path: 'wiki/concepts/de-minimis.md', tags: ['政策', '贸易'], summary: '美国海关规定：价值800美元以下的进口商品免征关税。Temu和SHEIN严重依赖此政策降低履约成本。美国国会正推进修改此规则，若取消将直接冲击Temu的单位经济模型。' },
    ],
    chatQuestionZh: 'Temu 的终局是全球版的拼多多还是下一个 Wish？',
    chatAnswerLeadZh: <>Temu面临两个根本性挑战：<BoldLink>品牌化缺失</BoldLink>（用户记住的是"便宜"而非任何品牌）和<BoldLink>政策风险</BoldLink>（de minimis规则若取消，单位经济模型直接崩塌）。如果无法解决这两个问题，Temu可能成为下一个Wish——低价平台的典型失败案例：高速增长后迅速萎缩。</>,
    chatAnswerDetailZh: '但Temu也有拼多多不具备的优势：全托管模式积累的数据闭环、母公司PDD Holdings的资金支持、以及供应链深度整合的能力。如果能利用这些优势建立品牌认知（而非平台认知），并提前布局海外仓应对de minimis风险，Temu有机会成为真正的全球零售基础设施。',
    chatSourceZh: 'Temu出海策略.md',
  },
];
