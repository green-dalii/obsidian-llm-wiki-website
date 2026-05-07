import { BookOpen, TrendingUp, Microscope, Palette, Compass, Terminal } from "lucide-react";

export type ScenarioId = 'reading' | 'product' | 'research' | 'creative' | 'growth' | 'tech';

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
    id: 'reading',
    label: 'Deep Reading',
    labelZh: '深度阅读',
    Icon: BookOpen,
    filename: 'zettelkasten-notes.md',
    sourceNote: `# Zettelkasten Method

The Zettelkasten is a note-taking system that turns isolated notes into a thinking network.

## Core Principles
- Atomicity: each note captures exactly ONE idea
- Connection: always link new notes to existing ones
- Elaboration: rewrite in your own words, not copy-paste

## Workflow
- Fleeting notes capture sparks in the moment
- Literature notes distill what you read
- Permanent notes synthesize into original thought

## Why It Works
Surprise emerges from the network — ideas collide that you never planned to connect.`,
    sourceNoteZh: `# 卡片盒笔记法（Zettelkasten）

卢曼用这套方法积累了 90000 张卡片，出版了 70 本书。

## 核心理念
- 原子化：每张卡片只记录一个想法
- 关联：新卡片必须与已有卡片建立链接
- 重述：用自己的话写，不要复制粘贴

## 三种笔记类型
- 闪念笔记：捕捉瞬间的灵感火花
- 文献笔记：提炼阅读材料的核心观点
- 永久笔记：将前两者融合为原创思考

## 为什么有效
卡片之间的链接网络会产生"意外发现"——你从未想过要连接的思路，在索引中自然相遇。`,
    extractedItems: [
      { name: 'Niklas Luhmann', type: 'entity', lineIdx: 0 },
      { name: 'Sönke Ahrens', type: 'entity', lineIdx: 0 },
      { name: 'Zettelkasten', type: 'concept', lineIdx: 0 },
      { name: 'Atomicity', type: 'concept', lineIdx: 4 },
      { name: 'Fleeting notes', type: 'concept', lineIdx: 9 },
      { name: 'Permanent notes', type: 'concept', lineIdx: 11 },
    ],
    generatedPages: [
      { title: 'Zettelkasten', path: 'wiki/concepts/zettelkasten.md', tags: ['PKM', 'Method'], summary: 'A non-linear note-taking system invented by Niklas Luhmann that treats ideas as nodes in a growing network.' },
      { title: 'Atomic Notes', path: 'wiki/concepts/atomic-notes.md', tags: ['Writing'], summary: 'Each note captures one single idea in your own words, maximizing reusability and unexpected connections.' },
      { title: 'Fleeting Notes', path: 'wiki/concepts/fleeting-notes.md', tags: ['Capture'], summary: 'Quick, temporary reminders that capture a thought or spark before it vanishes.' },
      { title: 'Permanent Notes', path: 'wiki/concepts/permanent-notes.md', tags: ['Synthesis'], summary: 'Evergreen, self-contained pieces of original thinking that form the backbone of your knowledge base.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 3 },
    ],
    chatQuestion: 'How does atomicity enable surprising connections between notes?',
    chatAnswerLead: <><BoldLink>Atomic Notes</BoldLink>, each expressing a single complete idea, can recombine freely across domains — a neuroscience concept might link to a design pattern, sparking insight neither field could produce alone.</>,
    chatAnswerDetail: 'Luhmann called this "communicating with the Zettelkasten" — the network itself becomes a conversation partner that surfaces ideas you never planned to connect.',
    chatSource: 'zettelkasten-notes.md',
    extractedItemsZh: [
      { name: '卢曼', type: 'entity', lineIdx: 0 },
      { name: '阿伦斯', type: 'entity', lineIdx: 0 },
      { name: '卡片盒笔记法', type: 'concept', lineIdx: 0 },
      { name: '原子化', type: 'concept', lineIdx: 6 },
      { name: '闪念笔记', type: 'concept', lineIdx: 10 },
      { name: '永久笔记', type: 'concept', lineIdx: 12 },
    ],
    generatedPagesZh: [
      { title: '卡片盒笔记法', path: 'wiki/concepts/zettelkasten.md', tags: ['知识管理', '方法论'], summary: '卢曼发明的非线性笔记系统，将每条想法视为知识网络中不断生长的一个节点。' },
      { title: '原子化笔记', path: 'wiki/concepts/atomic-notes.md', tags: ['写作'], summary: '每张卡片只记录一个完整想法，用自己的话重述，最大化可复用性和意外连接的概率。' },
      { title: '闪念笔记', path: 'wiki/concepts/fleeting-notes.md', tags: ['捕捉'], summary: '短暂的思维提醒，在灵感消失之前快速记录下来的临时载体。' },
      { title: '永久笔记', path: 'wiki/concepts/permanent-notes.md', tags: ['综合'], summary: '常青的、自成一体的原创思考片段，构成知识库的骨干。' },
    ],
    chatQuestionZh: '原子化原则如何让笔记之间产生意外连接？',
    chatAnswerLeadZh: <><BoldLink>原子化笔记</BoldLink>每条只表达一个完整想法，可以跨领域自由重组——一个神经科学概念可能链接到产品设计模式，在两个领域各自都想不到会产生这样的洞见。</>,
    chatAnswerDetailZh: '卢曼称之为"与卡片盒对话"——这个链接网络本身就成了一个对话伙伴，不断浮现你从未计划要连接的思路。',
    chatSourceZh: 'zettelkasten-notes.md',
  },
  {
    id: 'product',
    label: 'Product Research',
    labelZh: '产品调研',
    Icon: TrendingUp,
    filename: 'notion-analysis.md',
    sourceNote: `# Notion Competitive Analysis

Notion dominates the all-in-one workspace space — here is how they did it.

## Product Strategy
- Start with a blank canvas, not rigid templates
- Blocks as the atomic unit: text, tables, databases, embeds
- Template marketplace drives viral distribution

## Growth Levers
- Freemium with generous free tier converts teams bottom-up
- Community ambassadors create content, templates, tutorials
- SEO strategy targets long-tail use case keywords

## Key Metrics
- 100M+ users, majority organic acquisition
- PLG motion: individual → team → organization

## Weaknesses
- Offline support is unreliable
- Performance degrades with large workspaces`,
    sourceNoteZh: `# 小红书产品分析

小红书从香港购物指南转型为生活方式社区，日活突破 1 亿。

## 产品策略
- 「种草」心智：用户来小红书是为了发现和决策
- 双列瀑布流降低选择成本，提升内容消费效率
- UGC 内容生态：普通人分享真实体验，信任度远超 KOL

## 增长引擎
- 搜索心智持续强化——「遇事不决小红书」
- 直播电商补齐交易闭环，笔记种草→直播转化
- 海外华人市场自然增长，无需额外获客

## 核心指标
- 月活 3 亿+，搜索渗透率超过 70%
- 图文+视频双引擎驱动内容供给

## 潜在风险
- 内容审核尺度争议影响创作者积极性
- 电商基础设施（物流、售后）仍在追赶`,
    extractedItems: [
      { name: 'Notion', type: 'entity', lineIdx: 0 },
      { name: 'Blocks', type: 'concept', lineIdx: 5 },
      { name: 'Freemium', type: 'concept', lineIdx: 9 },
      { name: 'PLG', type: 'concept', lineIdx: 14 },
      { name: 'Template marketplace', type: 'entity', lineIdx: 6 },
      { name: 'Community', type: 'concept', lineIdx: 10 },
    ],
    generatedPages: [
      { title: 'Notion', path: 'wiki/entities/notion.md', tags: ['SaaS', 'Productivity'], summary: 'All-in-one workspace founded in 2013, valued at $10B, with 100M+ users and a category-defining product-led growth model.' },
      { title: 'Block Architecture', path: 'wiki/concepts/block-architecture.md', tags: ['Architecture'], summary: 'Atomic content units (text, database, embed) that compose into any page structure, enabling extreme flexibility.' },
      { title: 'Product-Led Growth', path: 'wiki/concepts/plg.md', tags: ['Growth', 'Strategy'], summary: 'Bottom-up adoption where individual users become internal champions, driving organizational conversion.' },
      { title: 'Template Marketplace', path: 'wiki/concepts/template-marketplace.md', tags: ['Distribution'], summary: 'User-generated templates act as acquisition loops — each shared template attracts new users via SEO and social.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 0, to: 3 },
    ],
    chatQuestion: 'What makes Notion\'s product-led growth strategy so effective?',
    chatAnswerLead: <>Notion's <BoldLink>Product-Led Growth</BoldLink> succeeds because the <BoldLink>Freemium</BoldLink> tier is genuinely useful — individuals adopt first, then invite teammates, creating an organic organizational pull.</>,
    chatAnswerDetail: 'Combined with a vibrant community ecosystem and SEO-optimized template marketplace, each user action becomes a distribution event.',
    chatSource: 'notion-analysis.md',
    extractedItemsZh: [
      { name: '小红书', type: 'entity', lineIdx: 0 },
      { name: '种草', type: 'concept', lineIdx: 5 },
      { name: 'UGC', type: 'concept', lineIdx: 7 },
      { name: '搜索心智', type: 'concept', lineIdx: 10 },
      { name: '直播电商', type: 'concept', lineIdx: 11 },
      { name: '双列瀑布流', type: 'concept', lineIdx: 6 },
    ],
    generatedPagesZh: [
      { title: '小红书', path: 'wiki/entities/xiaohongshu.md', tags: ['产品', '社区'], summary: '从香港购物指南转型为月活3亿+的生活方式社区，以"种草"心智驱动用户增长和消费决策。' },
      { title: '种草经济', path: 'wiki/concepts/seeding-economy.md', tags: ['营销', '用户行为'], summary: '用户来小红书的核心动机是发现和决策——普通人的真实体验比KOL推荐更具信任度。' },
      { title: '搜索心智', path: 'wiki/concepts/search-mindshare.md', tags: ['增长', '策略'], summary: '"遇事不决小红书"——当用户将搜索习惯迁移至社区内部，平台获得不可替代的分发权力。' },
      { title: '双列瀑布流', path: 'wiki/concepts/waterfall-feed.md', tags: ['交互设计'], summary: '双列布局降低单条内容的选择成本，提升内容消费效率，是小红书的核心信息架构。' },
    ],
    chatQuestionZh: '小红书的"搜索心智"策略为什么能成为核心增长引擎？',
    chatAnswerLeadZh: <>小红书的<BoldLink>搜索心智</BoldLink>策略成功在于将用户的决策链路完整迁移至平台内部——"遇事不决小红书"不是一句口号，而是年轻用户真实的搜索行为习惯。</>,
    chatAnswerDetailZh: '当用户在进行消费决策时首先打开小红书而非搜索引擎，平台就获得了不可替代的流量分发权。结合<BoldLink>种草经济</BoldLink>的内容信任度，搜索+种草形成飞轮效应。',
    chatSourceZh: 'xiaohongshu-analysis.md',
  },
  {
    id: 'research',
    label: 'Research Notes',
    labelZh: '科研笔记',
    Icon: Microscope,
    filename: 'memory-sleep-study.md',
    sourceNote: `# Memory Consolidation During Sleep

Sleep transforms fragile short-term memories into stable long-term representations.

## Key Mechanisms
- Hippocampal replay: neurons fire in wake-like patterns during sleep
- SWS drives systems consolidation across the neocortex
- REM sleep strengthens emotional and procedural memories

## Experimental Evidence
- Matt Wilson (MIT) showed place cell reactivation during SWS
- Human fMRI confirms hippocampal-cortical dialogue during NREM
- Sleep deprivation impairs retention by ~40%

## Open Questions
- How does synaptic downscaling select which memories survive?
- Can targeted memory reactivation (TMR) enhance specific memories?`,
    sourceNoteZh: `# 碳中和技术路径研究

中国承诺 2030 年碳达峰、2060 年碳中和，这是一场系统性的能源革命。

## 核心路径
- 能源供给侧：光伏、风电替代煤电，新型电力系统重构电网
- 能源消费侧：工业电气化、建筑节能改造、交通电动化
- 碳移除：CCUS 技术捕获工业尾气，林业碳汇作为补充

## 技术瓶颈
- 储能成本仍需下降 50% 才能支撑大规模风光并网
- 氢能储运效率低，绿氢成本是灰氢的 3 倍
- 碳捕集能耗过高，每吨 CO₂ 需 2.5 GJ 能量

## 政策驱动
- 全国碳市场覆盖电力行业，钢铁、水泥即将纳入
- 绿色金融定向支持低碳技术研发`,
    extractedItems: [
      { name: 'Hippocampus', type: 'entity', lineIdx: 4 },
      { name: 'Amygdala', type: 'entity', lineIdx: 6 },
      { name: 'Matt Wilson', type: 'entity', lineIdx: 10 },
      { name: 'Memory Consolidation', type: 'concept', lineIdx: 0 },
      { name: 'Hippocampal replay', type: 'concept', lineIdx: 4 },
      { name: 'Synaptic downscaling', type: 'concept', lineIdx: 14 },
    ],
    generatedPages: [
      { title: 'Memory Consolidation', path: 'wiki/concepts/memory-consolidation.md', tags: ['Neuroscience'], summary: 'The process by which labile short-term memories are transformed into stable long-term traces, critically dependent on sleep.' },
      { title: 'Hippocampal Replay', path: 'wiki/concepts/hippocampal-replay.md', tags: ['Hippocampus'], summary: 'During SWS, place cells reactivate in sequences that recapitulate waking experience, strengthening cortical memory traces.' },
      { title: 'Slow-Wave Sleep', path: 'wiki/concepts/slow-wave-sleep.md', tags: ['Sleep'], summary: 'Deep NREM sleep characterized by delta oscillations (0.5–4 Hz), essential for declarative memory consolidation.' },
      { title: 'Synaptic Homeostasis', path: 'wiki/concepts/synaptic-homeostasis.md', tags: ['Theory'], summary: 'SHY hypothesis proposes that sleep globally downscales synaptic strength, preserving only the most reinforced connections.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 3 },
    ],
    chatQuestion: 'How does hippocampal replay during sleep support memory consolidation?',
    chatAnswerLead: <><BoldLink>Hippocampal Replay</BoldLink> during <BoldLink>Slow-Wave Sleep</BoldLink> reactivates neuronal firing patterns from waking experience, driving long-term potentiation in cortical circuits.</>,
    chatAnswerDetail: 'This hippocampal-cortical dialogue selectively strengthens salient memories while synaptic downscaling prunes weak connections, improving retention by ~40% compared to sleep-deprived controls.',
    chatSource: 'memory-sleep-study.md',
    extractedItemsZh: [
      { name: '碳达峰', type: 'concept', lineIdx: 2 },
      { name: '碳中和', type: 'concept', lineIdx: 2 },
      { name: '光伏', type: 'entity', lineIdx: 5 },
      { name: 'CCUS', type: 'concept', lineIdx: 7 },
      { name: '氢能', type: 'concept', lineIdx: 10 },
      { name: '碳市场', type: 'concept', lineIdx: 14 },
    ],
    generatedPagesZh: [
      { title: '碳中和路径', path: 'wiki/concepts/carbon-neutrality.md', tags: ['能源', '政策'], summary: '中国2030碳达峰、2060碳中和目标下的系统性能源革命，涵盖供给侧、消费侧和碳移除三大方向。' },
      { title: '光伏发电', path: 'wiki/concepts/photovoltaic.md', tags: ['可再生能源', '技术'], summary: '替代煤电的主力清洁能源，中国光伏装机量全球第一，但储能配套成本仍是主要瓶颈。' },
      { title: 'CCUS技术', path: 'wiki/concepts/ccus.md', tags: ['碳移除', '工业'], summary: '碳捕集、利用与封存技术，每吨CO₂捕获需2.5GJ能量，能耗过高是商业化最大障碍。' },
      { title: '全国碳市场', path: 'wiki/concepts/carbon-market.md', tags: ['政策工具'], summary: '以市场机制驱动减排，目前覆盖电力行业，钢铁、水泥即将纳入，碳价信号引导绿色投资。' },
    ],
    chatQuestionZh: '中国实现碳中和面临的最大技术瓶颈是什么？',
    chatAnswerLeadZh: <>当前最大的瓶颈是<BoldLink>储能技术</BoldLink>——成本仍需下降50%才能支撑大规模风光并网，而<BoldLink>氢能</BoldLink>的储运效率低，绿氢成本是灰氢的3倍。</>,
    chatAnswerDetailZh: '此外，<BoldLink>CCUS技术</BoldLink>的能耗过高（每吨CO₂需2.5GJ），短期内难以规模化。三项技术瓶颈交织，决定了碳中和路径的节奏与成本。',
    chatSourceZh: 'carbon-neutrality-study.md',
  },
  {
    id: 'creative',
    label: 'Creative Writing',
    labelZh: '灵感创作',
    Icon: Palette,
    filename: 'stellar-frontier.md',
    sourceNote: `# Stellar Frontier Universe Bible

A hard sci-fi setting where humanity has splintered across three interstellar civilizations.

## Major Civilizations
- The Commonwealth: democratic federation of 47 colony worlds, exporter of grain and data
- The Dynasties: gene-modified aristocratic houses ruling helium-3 fuel monopolies
- The Void Collective: anarchist flotilla of generation ships, trading in salvage and secrets

## Technology Constraints
- No FTL travel — interstellar transit takes decades on cryo-ships
- Quantum entanglement comms work but bandwidth is brutally limited
- AI is everywhere but banned from holding executive authority

## Central Conflicts
- The Dynasties control fuel supply; the Commonwealth needs it for expansion
- A secret Collective AI may have broken the executive-authority ban`,
    sourceNoteZh: `# 《山海经》重构世界观设定

以《山海经》为蓝本，重构一个上古神兽与人类共存的世界。

## 核心势力
- 昆仑墟：诸神后裔的议会城邦，掌控天文历法与星象推演
- 九黎部：蚩尤血脉传承的游牧联盟，驯养异兽为战骑
- 蓬莱阁：东海隐士组成的秘密结社，掌握失传的上古符文

## 世界法则
- 灵力来源于地脉流动，每片大陆有一条主脉
- 神兽可与人类缔结血契，共享生命但一荣俱荣一损俱损
- 符文刻写在骨甲之上，每枚符文对应一种自然之力

## 核心矛盾
- 昆仑墟垄断灵脉开采权，九黎部以武力争夺资源
- 蓬莱阁暗中收集上古神器，意图重写世界法则`,
    extractedItems: [
      { name: 'Commonwealth', type: 'entity', lineIdx: 4 },
      { name: 'Dynasties', type: 'entity', lineIdx: 5 },
      { name: 'Void Collective', type: 'entity', lineIdx: 6 },
      { name: 'Helium-3', type: 'entity', lineIdx: 5 },
      { name: 'Cryo-ships', type: 'concept', lineIdx: 10 },
      { name: 'Quantum entanglement', type: 'concept', lineIdx: 11 },
    ],
    generatedPages: [
      { title: 'The Commonwealth', path: 'wiki/entities/commonwealth.md', tags: ['Faction', 'Politics'], summary: 'A democratic federation spanning 47 colony worlds, built on data trade and agricultural exports, governed by a rotating council.' },
      { title: 'The Dynasties', path: 'wiki/entities/dynasties.md', tags: ['Faction', 'Economy'], summary: 'Genetically-enhanced aristocratic houses that monopolize helium-3 extraction, controlling the fuel supply for all interstellar travel.' },
      { title: 'Void Collective', path: 'wiki/entities/void-collective.md', tags: ['Faction', 'Society'], summary: 'A nomadic civilization of generation ships living outside planetary gravity wells, trading in salvage, information, and forbidden tech.' },
      { title: 'Helium-3 Economy', path: 'wiki/concepts/helium3-economy.md', tags: ['Technology', 'Economy'], summary: 'The primary fuel source for fusion reactors throughout human space — whoever controls He-3 controls civilization.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 3 }, { from: 1, to: 3 }, { from: 0, to: 2 },
    ],
    chatQuestion: 'What is the central conflict between the Commonwealth and the Dynasties?',
    chatAnswerLead: <>The <BoldLink>Commonwealth</BoldLink> needs <BoldLink>Helium-3</BoldLink> to fuel its expansion, but the <BoldLink>Dynasties</BoldLink> control every major extraction site, creating a chokehold on interstellar civilization.</>,
    chatAnswerDetail: 'This fuel dependency forces the Commonwealth into unfavorable trade agreements, while the Void Collective exploits the tension, selling salvaged He-3 to both sides.',
    chatSource: 'stellar-frontier.md',
    extractedItemsZh: [
      { name: '昆仑墟', type: 'entity', lineIdx: 5 },
      { name: '九黎部', type: 'entity', lineIdx: 6 },
      { name: '蓬莱阁', type: 'entity', lineIdx: 7 },
      { name: '灵力', type: 'concept', lineIdx: 10 },
      { name: '血契', type: 'concept', lineIdx: 11 },
      { name: '符文', type: 'concept', lineIdx: 12 },
    ],
    generatedPagesZh: [
      { title: '昆仑墟', path: 'wiki/entities/kunlun.md', tags: ['势力', '政治'], summary: '诸神后裔组成的议会城邦，掌控天文历法与星象推演，垄断灵脉开采权。' },
      { title: '九黎部', path: 'wiki/entities/jiuli.md', tags: ['势力', '军事'], summary: '蚩尤血脉传承的游牧联盟，以驯养异兽为战骑，武力争夺灵脉资源。' },
      { title: '蓬莱阁', path: 'wiki/entities/penglai.md', tags: ['势力', '神秘'], summary: '东海隐士组成的秘密结社，掌握失传的上古符文，暗中收集神器意图重写世界法则。' },
      { title: '灵力体系', path: 'wiki/concepts/spirit-energy.md', tags: ['世界法则', '能量'], summary: '灵力来源于地脉流动，每片大陆有一条主脉。神兽可与人类缔结血契，共享生命但一荣俱荣一损俱损。' },
    ],
    chatQuestionZh: '昆仑墟、九黎部和蓬莱阁之间的矛盾核心是什么？',
    chatAnswerLeadZh: <>三大势力的矛盾围绕<BoldLink>灵力</BoldLink>资源展开——<BoldLink>昆仑墟</BoldLink>垄断灵脉开采权，<BoldLink>九黎部</BoldLink>以武力争夺，而<BoldLink>蓬莱阁</BoldLink>在暗中收集上古神器，意图从根本上改写世界法则。</>,
    chatAnswerDetailZh: '这是一场资源争夺与意识形态的三方博弈。昆仑墟守旧、九黎部求变、蓬莱阁图破——三者构成了世界运转的核心张力。',
    chatSourceZh: 'shanhaijing-worldbuilding.md',
  },
  {
    id: 'growth',
    label: 'Personal Growth',
    labelZh: '个人成长',
    Icon: Compass,
    filename: 'habit-building.md',
    sourceNote: `# The Science of Habit Formation

Lasting behavior change comes from systems, not willpower.

## The Habit Loop
- Cue: a trigger that initiates the behavior
- Craving: the motivational force behind every habit
- Response: the actual behavior you perform
- Reward: the end goal that satisfies the craving

## The Four Laws of Behavior Change
- Make it Obvious: design your environment for visibility
- Make it Attractive: bundle habits with things you enjoy
- Make it Easy: reduce friction, start with 2-minute versions
- Make it Satisfying: immediate rewards reinforce the loop

## Identity-Based Habits
Focus on who you wish to become. James Clear: every action is a vote for the person you are becoming.`,
    sourceNoteZh: `# 曾国藩修身十二法

曾国藩从一介书生到位极人臣，其修身方法至今仍有借鉴意义。

## 日课十二条
- 主敬：整齐严肃，无事时心在腔子里，应事时专一不杂
- 静坐：每日不拘何时，静坐一小时，体验静极生阳
- 早起：黎明即起，醒后勿沾恋
- 读书不二：一书未点完，断不看他书
- 读史：每日读《二十三史》十页，虽有事不间断

## 修身理念
- 天下古今之庸人，皆以一惰字致败
- 用功不求太猛，但求有恒
- 日日不断之功，胜于一曝十寒

## 现代应用
将日课十二条改造为现代习惯追踪系统，每条对应当代一个关键习惯。`,
    extractedItems: [
      { name: 'James Clear', type: 'entity', lineIdx: 19 },
      { name: 'Atomic Habits', type: 'entity', lineIdx: 19 },
      { name: 'Habit Loop', type: 'concept', lineIdx: 4 },
      { name: 'Four Laws', type: 'concept', lineIdx: 10 },
      { name: 'Identity-Based Habits', type: 'concept', lineIdx: 18 },
      { name: 'Friction', type: 'concept', lineIdx: 13 },
    ],
    generatedPages: [
      { title: 'Habit Loop', path: 'wiki/concepts/habit-loop.md', tags: ['Psychology'], summary: 'A neurological feedback loop consisting of cue, craving, response, and reward that governs all habit formation and maintenance.' },
      { title: 'Four Laws of Change', path: 'wiki/concepts/four-laws.md', tags: ['Framework'], summary: 'Make it Obvious, Attractive, Easy, and Satisfying — four levers for engineering any behavior, from James Clear\'s Atomic Habits.' },
      { title: 'Identity Habits', path: 'wiki/concepts/identity-habits.md', tags: ['Identity'], summary: 'Behavior change that starts with self-image — "I am a runner" rather than "I want to run", making each action a vote for identity.' },
      { title: 'Environment Design', path: 'wiki/concepts/environment-design.md', tags: ['Design'], summary: 'Shaping physical and digital spaces to make good habits the path of least resistance and bad habits invisible.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 },
    ],
    chatQuestion: 'How do identity-based habits differ from goal-based approaches?',
    chatAnswerLead: <>Unlike goal-based habits that chase outcomes, <BoldLink>Identity-Based Habits</BoldLink> focus on becoming the person who naturally achieves those outcomes — each small action reinforces self-image.</>,
    chatAnswerDetail: <>"Every action you take is a vote for the type of person you wish to become" — the <BoldLink>Habit Loop</BoldLink> drives behavior, but identity provides the motivation that outlasts any single goal.</>,
    chatSource: 'habit-building.md',
    extractedItemsZh: [
      { name: '曾国藩', type: 'entity', lineIdx: 0 },
      { name: '日课十二条', type: 'concept', lineIdx: 5 },
      { name: '主敬', type: 'concept', lineIdx: 6 },
      { name: '静坐', type: 'concept', lineIdx: 7 },
      { name: '早起', type: 'concept', lineIdx: 8 },
      { name: '读书不二', type: 'concept', lineIdx: 9 },
    ],
    generatedPagesZh: [
      { title: '曾国藩', path: 'wiki/entities/zeng-guofan.md', tags: ['人物', '历史'], summary: '晚清中兴名臣，以一介书生位极人臣。其修身方法论历经150余年仍有现实借鉴意义。' },
      { title: '日课十二条', path: 'wiki/concepts/twelve-daily-rules.md', tags: ['框架', '习惯'], summary: '曾国藩为自己定下的十二条每日必修课，涵盖静坐、早起、读书、谨言等修身维度。' },
      { title: '恒心之道', path: 'wiki/concepts/persistence.md', tags: ['修身'], summary: '"用功不求太猛，但求有恒"——日日不断之功，胜于一曝十寒。现代社会习惯追踪的科学印证。' },
      { title: '修身哲学', path: 'wiki/concepts/self-cultivation.md', tags: ['哲学', '个人成长'], summary: '"天下古今之庸人，皆以一惰字致败"——从曾国藩到原子习惯，跨时代的自我管理智慧。' },
    ],
    chatQuestionZh: '曾国藩的"日课十二条"和现代习惯追踪有什么相通之处？',
    chatAnswerLeadZh: <><BoldLink>日课十二条</BoldLink>的本质和James Clear的<BoldLink>原子习惯</BoldLink>惊人一致——曾国藩强调"日日不断之功"，Clear说"每个行动都是为你想成为的人投票"。</>,
    chatAnswerDetailZh: '十二条日课每一条都是一个小闭环：主敬=环境设计，静坐=冥想，读书不二=专注单任务。150年前的修身方法与现代行为科学殊途同归。',
    chatSourceZh: 'zeng-guofan-self-cultivation.md',
  },
  {
    id: 'tech',
    label: 'Tech Mastery',
    labelZh: '技术精进',
    Icon: Terminal,
    filename: 'distributed-systems.md',
    sourceNote: `# Distributed Systems Design

Building reliable systems from unreliable components.

## Foundational Theorems
- CAP Theorem: pick two of Consistency, Availability, Partition Tolerance
- FLP Impossibility: no deterministic consensus in async systems with one faulty node
- PACELC: when Partition, trade Availability for Consistency; Else, trade Latency for Consistency

## Consensus Protocols
- Paxos: Lamport's classic protocol, notoriously hard to implement
- Raft: designed for understandability, leader-based consensus
- Gossip protocols: eventual consistency through epidemic message spreading

## Real-World Patterns
- Netflix uses Chaos Engineering to test resilience assumptions
- Amazon DynamoDB opts for AP under partition with eventual consistency
- CoreOS etcd uses Raft for strongly consistent leader election`,
    sourceNoteZh: `# Rust 语言在国内技术圈的采用分析

Rust 连续多年蝉联 Stack Overflow 最受喜爱语言，国内大厂正加速采用。

## 采用驱动力
- 内存安全无 GC，适合系统编程和高性能场景
- C++ 替代趋势：字节跳动用 Rust 重写部分存储引擎
- 云原生基础设施：TiKV、RisingWave 等国产开源项目引领

## 落地场景
- 数据库与存储：TiDB 的底层存储 TiKV 由 Rust 编写
- WebAssembly：字节内部大量使用 Rust → Wasm 编译
- 区块链：Solana、Sui 等公链核心均使用 Rust
- 嵌入式与 IoT：华为在鸿蒙中投入 Rust 组件研发

## 主要障碍
- 学习曲线陡峭：所有权、生命周期概念需要时间消化
- 编译速度慢：大型项目增量编译体验有待优化
- 生态仍在成长：部分领域的库不如 Go/Java 成熟`,
    extractedItems: [
      { name: 'Leslie Lamport', type: 'entity', lineIdx: 9 },
      { name: 'Netflix', type: 'entity', lineIdx: 14 },
      { name: 'Amazon DynamoDB', type: 'entity', lineIdx: 15 },
      { name: 'CAP Theorem', type: 'concept', lineIdx: 5 },
      { name: 'Raft', type: 'concept', lineIdx: 10 },
      { name: 'Chaos Engineering', type: 'concept', lineIdx: 14 },
    ],
    generatedPages: [
      { title: 'CAP Theorem', path: 'wiki/concepts/cap-theorem.md', tags: ['Theory', 'Tradeoffs'], summary: 'A distributed system can guarantee at most two of: Consistency (same data everywhere), Availability (every request succeeds), Partition Tolerance.' },
      { title: 'Raft Consensus', path: 'wiki/concepts/raft.md', tags: ['Protocol', 'Consensus'], summary: 'A leader-based consensus algorithm designed for understandability, splitting consensus into leader election, log replication, and safety.' },
      { title: 'Gossip Protocols', path: 'wiki/concepts/gossip.md', tags: ['Protocol', 'Scalability'], summary: 'Nodes periodically exchange state with random peers, achieving eventual consistency through epidemic-style information propagation.' },
      { title: 'Chaos Engineering', path: 'wiki/concepts/chaos-engineering.md', tags: ['Resilience', 'Testing'], summary: 'Deliberately injecting failures into production systems to verify that redundancy mechanisms actually work under real conditions.' },
    ],
    links: [
      { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 0, to: 3 },
    ],
    chatQuestion: 'When should I choose Raft over a gossip protocol for my system?',
    chatAnswerLead: <>Choose <BoldLink>Raft</BoldLink> when you need strong consistency and a single source of truth — think leader election, configuration stores, distributed locking.</>,
    chatAnswerDetail: <><BoldLink>Gossip Protocols</BoldLink> excel when availability and partition tolerance matter more than immediate consistency — service discovery, membership lists, eventually-consistent state.</>,
    chatSource: 'distributed-systems.md',
    extractedItemsZh: [
      { name: 'Rust', type: 'entity', lineIdx: 0 },
      { name: '字节跳动', type: 'entity', lineIdx: 5 },
      { name: 'TiKV', type: 'entity', lineIdx: 6 },
      { name: '内存安全', type: 'concept', lineIdx: 4 },
      { name: 'WebAssembly', type: 'concept', lineIdx: 10 },
      { name: '所有权', type: 'concept', lineIdx: 15 },
    ],
    generatedPagesZh: [
      { title: 'Rust语言', path: 'wiki/entities/rust.md', tags: ['编程语言', '系统编程'], summary: '连续多年最受喜爱语言，以内存安全无GC的独特定位在系统编程和高性能场景中快速崛起。' },
      { title: 'TiKV', path: 'wiki/entities/tikv.md', tags: ['数据库', '开源'], summary: 'CNCF毕业项目，TiDB的底层分布式存储引擎，由Rust编写，是国内Rust生态的标杆项目。' },
      { title: '所有权系统', path: 'wiki/concepts/ownership.md', tags: ['语言特性'], summary: 'Rust的核心创新——通过所有权、借用和生命周期在编译期保证内存安全，无需垃圾回收。' },
      { title: 'WebAssembly生态', path: 'wiki/concepts/wasm.md', tags: ['Wasm', '前端'], summary: 'Rust→Wasm编译链在国内大厂广泛使用，字节跳动大量内部工具采用此方案实现浏览器端高性能计算。' },
    ],
    chatQuestionZh: 'Rust在国内技术圈的采用主要受什么驱动？',
    chatAnswerLeadZh: <>国内大厂采用Rust的核心驱动力是<BoldLink>内存安全</BoldLink>无GC——字节跳动用Rust重写存储引擎，<BoldLink>TiKV</BoldLink>等项目证明了Rust在数据库和云原生基础设施中的可靠性。</>,
    chatAnswerDetailZh: '除此之外，<BoldLink>WebAssembly</BoldLink>编译链让Rust进入前端高性能计算场景，区块链（Solana、Sui）的底层也大量使用Rust。但学习曲线陡峭和编译速度仍是主要障碍。',
    chatSourceZh: 'rust-adoption-analysis.md',
  },
];
