# Scenario Content Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 6 WikiDemo scenarios with new EN/ZH content per the approved spec, reorder scenarios general→vertical, rename scenario IDs, and update all dependent code.

**Architecture:** Single-file content replacement in `scenarios.tsx`, plus ID/key renames in `graphLayouts.ts` and initial state in `WikiDemo.tsx`. Scenario 3 requires web search + fetch subagents to collect real article excerpts.

**Tech Stack:** TypeScript, React (JSX), lucide-react icons, MiniMax web_search + WebFetch MCP tools (for Scenario 3)

---

## File Map

| File | Role | Change |
|------|------|--------|
| `src/data/scenarios.tsx` | All scenario content, ScenarioId type | **Rewrite** |
| `src/data/graphLayouts.ts` | Graph node positions keyed by ScenarioId | **Modify keys** |
| `src/components/WikiDemo.tsx` | Initial scenario state | **Modify default** |

---

### Task 1: Fetch real web content for Scenario 3 (Inspiration)

**Files:**
- Research only — feeds into Task 2

- [ ] **Step 1: Fetch EN web clippings**

Use Agent subagents with `mcp__MiniMax__web_search` and `WebFetch` to collect 4–5 real article excerpts on thinking/decision-making from English sources (fs.blog, Paul Graham essays, James Clear blog, Twitter threads, Aeon). Each clipping must be 4–8 lines preserving original wording. Cite source.

Expected: 4–5 excerpts with source attribution

- [ ] **Step 2: Fetch ZH web clippings**

Use Agent subagents with `mcp__MiniMax__web_search` and `WebFetch` to collect 4–5 real article excerpts from Chinese sources (公众号文章、知乎高赞回答、36氪/虎嗅) on topics: 信息茧房、躺平、延迟满足、判断力、情绪劳动. Each clipping 4–8 lines. Cite source.

Expected: 4–5 excerpts with source attribution

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "research: collect real web clippings for Scenario 3 (Inspiration)"
```

---

### Task 2: Rewrite scenarios.tsx with all new content

**Files:**
- Modify: `src/data/scenarios.tsx` (complete rewrite of SCENARIOS array)
- Modify: `src/data/scenarios.tsx:1-3` (update imports and ScenarioId type)

- [ ] **Step 1: Update imports and ScenarioId type**

Replace:
```typescript
import { BookOpen, TrendingUp, Microscope, Palette, Compass, Terminal } from "lucide-react";
export type ScenarioId = 'reading' | 'product' | 'research' | 'creative' | 'growth' | 'tech';
```

With:
```typescript
import { Heart, BookOpen, Scissors, Mic, Cpu, TrendingUp } from "lucide-react";
export type ScenarioId = 'daily-life' | 'reading' | 'inspiration' | 'creation' | 'ai-frontier' | 'business';
```

- [ ] **Step 2: Write Scenario 1 — Daily Life (daily-life)**

EN: Sleep & Health Science — source note about sleep architecture, sleep debt, hygiene, open questions.
Extracted items: 3 entities (Matthew Walker, glymphatic system, melanopsin), 3 concepts (Sleep Architecture, Sleep Debt, Sleep Hygiene).
Generated pages: Sleep Architecture (concepts), Sleep Debt (concepts), Glymphatic System (entities), Circadian Rhythm (concepts).
Chat question: "How does chronic sleep deprivation affect long-term brain health?"

ZH: 中医体质与养生 — source note about nine body constitutions, modern health damage, remedies.
Extracted items: 3 entities (黄芪, 八段锦, 北京中医药大学), 3 concepts (九种体质, 痰湿质, 阴虚质).
Generated pages: 九种体质学说 (concepts), 痰湿质 (concepts), 阴虚质 (concepts), 黄芪 (entities).
Chat question: "长期熬夜对身体有哪些具体的循证影响？"

- [ ] **Step 3: Write Scenario 2 — Deep Reading (reading)**

EN & ZH: "Thinking, Fast and Slow" — same book, same core concepts, different cultural examples.
EN extracted items include: Daniel Kahneman, System 1, System 2, Availability Heuristic, Anchoring, Loss Aversion.
ZH extracted items: 丹尼尔·卡尼曼, 系统1, 系统2, 可得性启发, 锚定效应, 损失厌恶.
EN generated pages: System 1 (concepts), System 2 (concepts), Anchoring Effect (concepts), Prospect Theory (concepts).
ZH generated pages: 系统1与系统2 (concepts), 可得性启发 (concepts), 锚定效应 (concepts), 前景理论 (concepts).
Chat questions: "How do System 1 and System 2 interact in decision-making?" / "系统1和系统2在决策中如何分工与配合？"

- [ ] **Step 4: Write Scenario 3 — Inspiration (inspiration)**

Use the real web excerpts collected in Task 1. Format each clipping as:
```
> Clipped from [source name]
[preserved key passage]
```
Source note title: "Mental Models & Thinking — Clippings" / "思考碎片 · 剪藏文集"
Extracted items from clippings' key entities/concepts.
Generated pages from the core themes in the clippings.

- [ ] **Step 5: Write Scenario 4 — Content Creation (creation)**

EN: Podcast "The Knowledge Stack" episode planning doc — guest bio, 5–7 interview questions, references.
ZH: 播客「纸上谈兵」节目策划 —— AI焦虑话题，嘉宾背景→问题链→引用资料。
Entities: guest names, mentioned authors, tools.
Concepts: interview structure, narrative arc, topic selection.
Generated pages: Guest profile (entities), Topic deep-dive (concepts), Reference list (sources).

- [ ] **Step 6: Write Scenario 5 — AI Frontier (ai-frontier)**

EN & ZH: "Attention Is All You Need" paper notes. Same paper, two languages.
Entities: Vaswani et al., BERT, GPT, Mamba, S4 / DeepSeek.
Concepts: Self-Attention, Multi-Head Attention, Positional Encoding, Scaled Dot-Product.
Generated pages all in concepts/.
Chat: "Is attention the final form?" / "Transformer的注意力机制会被状态空间模型取代吗？"

- [ ] **Step 7: Write Scenario 6 — Business (business)**

EN: Stripe's Strategy — API-first distribution, compound product, revenue model.
ZH: Temu出海策略 — 全托管模式, unit economics, de minimis risk.
Entities: Stripe, Adyen, Square, Visa / Temu, 拼多多, SHEIN, TikTok Shop.
Concepts: API-first distribution, Compound product / 全托管模式, 单位经济学.
Generated pages: mix of entities/ and concepts/.

- [ ] **Step 8: Verify all paths use only standard wiki directories**

Run:
```bash
grep -oP "path: 'wiki/\K[^/]+" src/data/scenarios.tsx | sort -u
```
Expected: only `concepts`, `entities`, `schema`, `sources`

- [ ] **Step 9: Commit**

```bash
git add src/data/scenarios.tsx
git commit -m "feat: rewrite all 6 WikiDemo scenarios with new EN/ZH content"
```

---

### Task 3: Update graphLayouts.ts with new scenario IDs

**Files:**
- Modify: `src/data/graphLayouts.ts:11-91`

- [ ] **Step 1: Rename graph layout keys**

The `Record<ScenarioId, GraphLayout>` must have keys matching the new ScenarioId type. Replace old keys:

```
'reading'    → keep as 'reading'
'product'    → rename to 'business'
'research'   → rename to 'ai-frontier'
'creative'   → rename to 'creation'
'growth'     → rename to 'inspiration'
'tech'       → rename to 'daily-life'
```

Key mapping: since scenario order changed but graph layouts are just visual node arrangements (not content-specific), we can remap old layout keys to new scenario IDs without changing the actual node coordinates. The layouts are interchangeable visual decorations.

- [ ] **Step 2: Verify type safety**

Run:
```bash
npx tsc --noEmit 2>&1 | head -20
```
Expected: no type errors related to scenarios.tsx or graphLayouts.ts

- [ ] **Step 3: Commit**

```bash
git add src/data/graphLayouts.ts
git commit -m "refactor: rename graph layout keys to match new ScenarioId values"
```

---

### Task 4: Update WikiDemo.tsx initial state default

**Files:**
- Modify: `src/components/WikiDemo.tsx:31` (default ScenarioId)

- [ ] **Step 1: Change default scenario**

Replace:
```typescript
const [activeScenario, setActiveScenario] = useState<ScenarioId>('reading');
```
With:
```typescript
const [activeScenario, setActiveScenario] = useState<ScenarioId>('daily-life');
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WikiDemo.tsx
git commit -m "fix: set default WikiDemo scenario to daily-life"
```

---

### Task 5: Build verification and final test

- [ ] **Step 1: Build the project**

Run: `npx astro build`
Expected: Successful build, no errors

- [ ] **Step 2: Start dev server and verify scenarios**

Run: `npx astro dev --port 3000`

Manual verification checklist:
- [ ] Visit http://localhost:3000 — WikiDemo loads with "Daily Life" as default
- [ ] Click through all 6 scenarios — each renders source note, extractions, wiki pages, links graph, chat
- [ ] Switch to /zh/ — all 6 scenarios show Chinese content
- [ ] Step 2 file tree shows correct wiki/ structure for each scenario
- [ ] Step 3 graph renders with connected nodes for each scenario
- [ ] No console errors

- [ ] **Step 3: Commit final verification**

```bash
git add -A
git commit -m "test: verify all 6 scenarios render correctly in EN and ZH"
```
