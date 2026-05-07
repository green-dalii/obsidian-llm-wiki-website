# Scenario Content Redesign — WikiDemo Demo Scenarios

> **Goal:** Replace all 6 scenario contents in `src/data/scenarios.tsx` with
> broadly relatable, professionally grounded EN/ZH content that demonstrates
> LLM Wiki's full capability (entity/concept extraction, wiki page generation,
> bidirectional linking, natural language Q&A).

**Status:** Approved. All 6 scenario directions confirmed.

**Scenarios ordered: General → Vertical** (widest audience to specialized niches)

---

## Scenario 1: Daily Life (日常生活)

**Position:** 100% universal. Entry point for every visitor.

**EN — Sleep & Health Science**
- Source note: "Why We Sleep" key findings — sleep architecture, sleep debt,
  hygiene, open questions
- Entities: glymphatic system, melanopsin, Matthew Walker
- Concepts: NREM/REM cycles, sleep hygiene, circadian rhythm, caffeine half-life
- Tone: Evidence-based, actionable, personal health management

**ZH — 中医体质与养生**
- Source note: Nine body constitutions (九种体质) in TCM, modern health
  implications, lifestyle damage patterns, practical remedies
- Entities: 黄芪, 八段锦, 痰湿质, 阴虚质
- Concepts: 九种体质分类, 起居有常 > 食疗 > 药补, 办公室体质
- Tone: 接地气的养生知识, 循证数据+传统智慧

---

## Scenario 2: Deep Reading (深度阅读)

**Position:** Core PKM scenario. Most Obsidian users' primary workflow.

**EN & ZH — Thinking, Fast and Slow**
- Same book, two languages, same core concepts
- EN: Kahneman's System 1/2, heuristics (Availability, Anchoring, Loss Aversion),
  Prospect Theory, personal takeaways
- ZH: 卡尼曼的框架 + 中国读者视角（散户炒股、降薪心理、自动定投）
- Entities: Daniel Kahneman / 丹尼尔·卡尼曼, System 1/2, Prospect Theory
- Concepts: Availability heuristic, Anchoring, Loss aversion, 可得性启发, 锚定效应, 损失厌恶
- Both versions: "我的行动计划" section showing real reader engagement

---

## Scenario 3: Inspiration Collection (灵感搜集)

**Position:** Web Clipper integration — Obsidian's killer plugin use case.

**Content source:** Real web content, fetched via subagents during implementation.

**EN — Clipped Essays & Threads**
- Real Twitter threads on thinking/decision-making
- Blog posts from fs.blog, Paul Graham, James Clear
- Newsletter passages on mental models
- Format: `> Clipped from [source]` with preserved key passages

**ZH — 剪藏文集**
- 真实公众号文章片段（如 late.balk、42章经、梁宁-闲花小草）
- 知乎高赞回答
- 36氪/虎嗅深度报道片段
- Topics: 信息茧房, 躺平经济学, 延迟满足, 判断力, 情绪劳动
- Format: `> 剪自 [来源]` 保留关键段落

**Implementation note:** Use Agent subagents with `mcp__MiniMax__web_search`
and `WebFetch` to locate and extract real article excerpts. Each clipping
should cite its source. Aim for 4–6 clippings per language.

---

## Scenario 4: Content Creation (内容创作)

**Position:** Output/publishing scenario. Covers podcasters, bloggers, video creators.

**EN — Podcast: "The Knowledge Stack" Episode Planning**
- Source note: Episode planning doc — guest background, interview questions,
  key references, narrative arc
- Topic: Tool-for-Thought, PKM, AI-augmented thinking
- Entities: Guest name, tools mentioned, cited authors
- Concepts: Second brain, knowledge management, tool-for-thought

**ZH — 播客：「纸上谈兵」节目策划**
- Source note: 某一期深度对话节目的策划稿
- Topic: AI焦虑、远程办公、副业经济 三选一
- 内容结构：嘉宾背景 → 核心问题链（5-7个递进问题）→ 引用资料列表
- Entities: 嘉宾, 引用人物, 核心概念
- Concepts: 选题角度, 问题链设计, 叙事弧线

---

## Scenario 5: AI Frontier (AI 前沿)

**Position:** Replaces old "Research Notes." Targets the universal AI anxiety trend.

**EN & ZH — "Attention Is All You Need" Notes**
- Same paper, two languages
- EN: Self-Attention, Multi-Head Attention, Positional Encoding, why it
  changed everything
- ZH: 自注意力, 多头注意力, 位置编码, Transformer 为何改变了 AI
- Both: "还没弄懂" / "Open Questions" section — State Space Models, Mamba, S4
- Entities: Vaswani et al., BERT, GPT, Mamba, S4 / BERT, GPT, Mamba, S4, DeepSeek
- Concepts: Self-Attention, Multi-Head, Positional Encoding, Scaled Dot-Product

---

## Scenario 6: Business Analysis (商业分析)

**Position:** Vertical scenario for PMs, consultants, founders, strategists.

**EN — Stripe's Strategic Evolution**
- Source: Stripe's API-first distribution, compound product strategy,
  revenue model, competitive positioning
- Entities: Stripe, Adyen, Square, Braintree, Visa/Mastercard
- Concepts: API-first distribution, Compound product, Full-stack model

**ZH — Temu 出海策略分析**
- Source: Temu's global expansion — 全托管模式, unit economics,
  regulatory risk (de minimis), competitive landscape
- Entities: Temu, 拼多多, SHEIN, TikTok Shop
- Concepts: 全托管模式, 单位经济学, 品牌化缺失, de minimis规则

---

## Data Changes

**ScenarioId rename:**
```
'reading'    → 'reading'      (keep)
'product'    → 'business'     (rename)
'research'   → 'ai-frontier'  (rename)
'creative'   → 'creation'     (rename)
'growth'     → (removed, merged into inspiration)
'tech'       → (removed, replaced by daily-life)
Add:         → 'daily-life'   (new)
```

**Scenario order (SCENARIOS array):**
1. `daily-life`
2. `reading`
3. `inspiration`
4. `creation`
5. `ai-frontier`
6. `business`

**Labels:**
```
1. EN: Daily Life     ZH: 日常生活
2. EN: Deep Reading   ZH: 深度阅读
3. EN: Inspiration    ZH: 灵感搜集
4. EN: Content Creation ZH: 内容创作
5. EN: AI Frontier    ZH: AI 前沿
6. EN: Business       ZH: 商业分析
```

**Icons (Lucide):**
1. Heart / 心形图标  (health/lifestyle)
2. BookOpen (keep)
3. Lightbulb or Scissors (clipper)
4. Mic or PenTool (podcast / creation)
5. Cpu or Brain (AI)
6. TrendingUp (keep, business)

---

## Implementation Notes

- **Scenario 3 (Inspiration)** requires web search + fetch subagents to collect
  real article excerpts. All other scenarios use synthesized-but-realistic content.
- All source notes should be accessible (~15–25 lines), with clear section
  headers, a mix of facts and personal reflection, and at least one open question.
- Each scenario must produce exactly 4 `generatedPages` (2 concepts + 2 entities
  minimum), 4+ `extractedItems`, and a `chatQuestion` that demonstrates
  cross-page reasoning.
- EN and ZH may share the same book/paper (scenarios 2, 5) or use region-specific
  examples (scenarios 1, 3, 4, 6). Both strategies are valid — the goal is
  authenticity for each language audience, not literal translation.
- All paths must use only the 4 standard wiki directories:
  `concepts/`, `entities/`, `schema/`, `sources/`.
