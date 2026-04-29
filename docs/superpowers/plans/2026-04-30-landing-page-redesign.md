# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform 8-section landing page into 6-section narrative compression with organic growth animation, merged Philosophy→Comparison, redesigned Features and Ecosystem, removed Architecture section.

**Architecture:** 6 major tasks: (1) Replace KnowledgeGraphGenesis with KnowledgeGrowth organic animation, (2) Update Hero content, (3) Rewrite Comparison merging Philosophy, (4) Redesign Features removing images, (5) Redesign Ecosystem with 1+1>2 amplifier cards, (6) Update App.tsx section order and remove Philosophy/Architecture imports.

**Tech Stack:** React 19 + TypeScript, Canvas 2D API, GSAP ScrollTrigger, Lucide icons, Tailwind CSS, i18n (EN + ZH)

---

## File Structure

**Files to modify:**
- `src/components/KnowledgeGraphGenesis.tsx` → rewrite to `KnowledgeGrowth.tsx` (organic growth animation)
- `src/components/Hero.tsx` → update import, content, background
- `src/components/Comparison.tsx` → merge Philosophy content, reduce to 3 rows, add editorial quote
- `src/components/Features.tsx` → remove images, add micro code snippets
- `src/components/Ecosystem.tsx` → rewrite as amplifier cards with before/after contrast
- `src/i18n/translations.ts` → update EN + ZH copy for all sections
- `src/App.tsx` → remove Philosophy and Architecture imports, reorder sections
- `src/components/Header.tsx` → update NAV_ITEMS (remove philosophy, keep howItWorks→features→ecosystem→providers)

**Files to create:**
- `src/components/KnowledgeGrowth.tsx` (new organic animation)

**Files to delete:**
- `src/components/Philosophy.tsx` (content merged into Comparison)
- `src/components/Architecture.tsx` (content transformed into Hero background animation)

---

## Task 1: Create KnowledgeGrowth Organic Animation Component

**Files:**
- Create: `src/components/KnowledgeGrowth.tsx`
- Delete: `src/components/KnowledgeGraphGenesis.tsx` (after creation)

- [ ] **Step 1: Write KnowledgeGrowth.tsx component skeleton**

Create file with basic structure:
```typescript
import { useRef, useEffect } from 'react';

interface DocumentNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  angle: number;
  connections: number[];
  label: string;
  cluster: number;
  opacity: number;
  scale: number;
}

interface Connection {
  from: number;
  to: number;
  progress: number;
  phase: 'growing' | 'stable' | 'sprouting';
}

export default function KnowledgeGrowth() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animation logic here
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
```

- [ ] **Step 2: Initialize canvas and animation state**

Add inside useEffect:
```typescript
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext('2d');
if (!ctx) return;

let width = 0;
let height = 0;
let nodes: DocumentNode[] = [];
let connections: Connection[] = [];
let phase = 0;
let frameCount = 0;

const resize = () => {
  const parent = canvas.parentElement;
  if (!parent) return;
  width = parent.offsetWidth;
  height = parent.offsetHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Initialize nodes
  nodes = [];
  for (let i = 0; i < 18; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      width: 8 + Math.random() * 12,
      height: 12 + Math.random() * 16,
      angle: Math.random() * 0.2 - 0.1,
      connections: [],
      label: Math.random() > 0.5 ? 'md' : '',
      cluster: i % 4,
      opacity: 0.4,
      scale: 0.6,
    });
  }
};
```

- [ ] **Step 3: Implement organic growth animation logic**

Add growth phases:
```typescript
const update = () => {
  frameCount++;

  // Phase transitions every 200 frames
  if (frameCount % 200 === 0) {
    phase = (phase + 1) % 4;
  }

  // Phase 0: Scatter
  if (phase === 0) {
    nodes.forEach(n => {
      n.vx += (Math.random() - 0.5) * 0.05;
      n.vy += (Math.random() - 0.5) * 0.05;
      n.scale = Math.max(0.6, n.scale - 0.001);
      n.opacity = Math.max(0.3, n.opacity - 0.002);
    });
  }

  // Phase 1: Growth (connections form)
  if (phase === 1 && connections.length < 25) {
    const a = Math.floor(Math.random() * nodes.length);
    const b = Math.floor(Math.random() * nodes.length);
    if (a !== b && nodes[a].cluster === nodes[b].cluster) {
      const dist = Math.sqrt((nodes[a].x - nodes[b].x) ** 2 + (nodes[a].y - nodes[b].y) ** 2);
      if (dist < 150 && !connections.some(c => (c.from === a && c.to === b) || (c.from === b && c.to === a))) {
        connections.push({ from: a, to: b, progress: 0, phase: 'growing' });
        nodes[a].connections.push(b);
        nodes[b].connections.push(a);
      }
    }
  }

  // Phase 2: Clustering
  if (phase === 2) {
    nodes.forEach(n => {
      const clusterNodes = nodes.filter(other => other.cluster === n.cluster && other !== n);
      if (clusterNodes.length > 0) {
        const avgX = clusterNodes.reduce((sum, other) => sum + other.x, 0) / clusterNodes.length;
        const avgY = clusterNodes.reduce((sum, other) => sum + other.y, 0) / clusterNodes.length;
        n.vx += (avgX - n.x) * 0.0001;
        n.vy += (avgY - n.y) * 0.0001;
      }
      n.scale = Math.min(1.2, n.scale + 0.002);
      n.opacity = Math.min(0.9, n.opacity + 0.003);
    });
  }

  // Phase 3: Sprouting (new wiki nodes)
  if (phase === 3 && nodes.length < 30) {
    if (frameCount % 50 === 0) {
      const parentIdx = Math.floor(Math.random() * nodes.length);
      const parent = nodes[parentIdx];
      if (parent.connections.length > 0) {
        const newNode: DocumentNode = {
          x: parent.x + (Math.random() - 0.5) * 60,
          y: parent.y + (Math.random() - 0.5) * 60,
          vx: 0,
          vy: 0,
          width: 6 + Math.random() * 8,
          height: 10 + Math.random() * 12,
          angle: 0,
          connections: [parentIdx],
          label: 'wiki',
          cluster: parent.cluster,
          opacity: 0,
          scale: 0.3,
        };
        nodes.push(newNode);
        connections.push({ from: parentIdx, to: nodes.length - 1, progress: 0, phase: 'sprouting' });
      }
    }
  }

  // Connection progress
  connections.forEach(c => {
    if (c.phase === 'growing' || c.phase === 'sprouting') {
      c.progress = Math.min(1, c.progress + 0.02);
    }
  });

  // Physics
  nodes.forEach(n => {
    n.vx *= 0.98;
    n.vy *= 0.98;
    n.x += n.vx;
    n.y += n.vy;
    n.x = Math.max(20, Math.min(width - 20, n.x));
    n.y = Math.max(20, Math.min(height - 20, n.y));
  });
};
```

- [ ] **Step 4: Implement draw function**

```typescript
const draw = () => {
  ctx.clearRect(0, 0, width, height);

  // Draw connections (purple arcs)
  connections.forEach(c => {
    const a = nodes[c.from];
    const b = nodes[c.to];
    if (!a || !b) return;

    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (c.progress > 0) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);

      // Curved arc for organic feel
      const midX = (a.x + b.x) / 2 + dy * 0.1;
      const midY = (a.y + b.y) / 2 - dx * 0.1;
      ctx.quadraticCurveTo(midX, midY, a.x + dx * c.progress, a.y + dy * c.progress);

      ctx.strokeStyle = `rgba(139,92,246,${0.15 + c.progress * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  });

  // Draw document nodes (amber rectangles)
  nodes.forEach(n => {
    ctx.save();
    ctx.translate(n.x, n.y);
    ctx.rotate(n.angle);
    ctx.scale(n.scale, n.scale);

    // Glow for connected nodes
    if (n.connections.length > 0 && n.opacity > 0.6) {
      ctx.shadowColor = 'rgba(139,92,246,0.3)';
      ctx.shadowBlur = 15;
    }

    // Document shape
    ctx.fillStyle = n.label === 'wiki'
      ? `rgba(139,92,246,${n.opacity})`
      : `rgba(217,119,6,${n.opacity})`;

    ctx.beginPath();
    ctx.roundRect(-n.width / 2, -n.height / 2, n.width, n.height, 2);
    ctx.fill();

    // Label
    if (n.label && n.scale > 0.8) {
      ctx.fillStyle = `rgba(255,255,255,${n.opacity * 0.6})`;
      ctx.font = '6px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(n.label === 'wiki' ? '.md' : '📄', 0, 0);
    }

    ctx.restore();
  });

  // Phase indicator
  const phaseNames = ['Scatter', 'Growth', 'Cluster', 'Sprout'];
  ctx.font = '10px JetBrains Mono';
  ctx.fillStyle = 'rgba(163,163,163,0.3)';
  ctx.fillText(`Phase: ${phaseNames[phase]}`, 20, height - 20);
};

const loop = () => {
  update();
  draw();
  requestAnimationFrame(loop);
};

resize();
window.addEventListener('resize', resize);
loop();

return () => {
  window.removeEventListener('resize', resize);
};
```

- [ ] **Step 5: Delete old KnowledgeGraphGenesis.tsx**

```bash
rm src/components/KnowledgeGraphGenesis.tsx
```

- [ ] **Step 6: Commit KnowledgeGrowth creation**

```bash
git add src/components/KnowledgeGrowth.tsx
git commit -m "feat: create KnowledgeGrowth organic animation component"
```

---

## Task 2: Update Hero Component

**Files:**
- Modify: `src/components/Hero.tsx:4,37,45,48,62`
- Modify: `src/i18n/translations.ts:131-134` (EN), `291-293` (ZH)

- [ ] **Step 1: Update Hero import**

Replace line 4 in `src/components/Hero.tsx`:
```typescript
import KnowledgeGrowth from './KnowledgeGrowth';
```

- [ ] **Step 2: Update background animation reference**

Replace lines 32-34:
```typescript
<div className="absolute inset-0 z-0">
  <KnowledgeGrowth />
</div>
```

- [ ] **Step 3: Update badge styling**

Replace line 37:
```typescript
<div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-obsidian-border bg-obsidian-surface/60 backdrop-blur-sm mb-8">
```

- [ ] **Step 4: Update title colors**

Replace line 45:
```typescript
<h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-tight text-obsidian-heading leading-[1.1] mb-6">
```

Replace line 48:
```typescript
<span className="text-obsidian-purple-light">{t.hero.title2}</span>
```

- [ ] **Step 5: Update secondary button styling**

Replace line 62:
```typescript
className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-obsidian-border text-obsidian-muted text-sm font-medium hover:text-obsidian-heading hover:border-obsidian-border-light transition-colors duration-200"
```

- [ ] **Step 6: Update Hero translations (EN)**

Replace lines 131-134 in `src/i18n/translations.ts`:
```typescript
badge: 'Inspired by Andrej Karpathy\'s LLM Wiki concept',
title1: 'Your notes.',
title2: 'A living wiki.',
subtitle: 'Drop scattered notes into Obsidian. The plugin reads, extracts key concepts, weaves a self-maintaining cross-referenced wiki — richer with every source.',
```

- [ ] **Step 7: Update Hero translations (ZH)**

Replace lines 291-293:
```typescript
badge: '灵感来自 Andrej Karpathy 的 LLM Wiki 构想',
title1: '你的笔记。',
title2: '一部活的 Wiki。',
subtitle: '把零散笔记放进 Obsidian，插件自动阅读、提取关键概念，编织成交叉引用的自维护 Wiki —— 越用越丰厚。',
```

- [ ] **Step 8: Commit Hero updates**

```bash
git add src/components/Hero.tsx src/i18n/translations.ts
git commit -m "feat: update Hero component with KnowledgeGrowth and refined copy"
```

---

## Task 3: Rewrite Comparison Section (Merge Philosophy)

**Files:**
- Modify: `src/components/Comparison.tsx:23-76`
- Modify: `src/i18n/translations.ts:173-199` (EN), `333-358` (ZH)

- [ ] **Step 1: Add editorial quote at top of Comparison**

Insert after line 29 in `src/components/Comparison.tsx`:
```typescript
<div className="mb-8 text-center">
  <p className="text-[clamp(1.4rem,3.5vw,2rem)] text-obsidian-muted font-light leading-snug max-w-2xl mx-auto">
    {lang === 'en'
      ? 'Every article you read should never be forgotten.'
      : '你读过的每一篇，都不该白读。'}
  </p>
</div>
```

- [ ] **Step 2: Reduce comparison items from 4 to 3**

Replace lines 173-199 in `src/i18n/translations.ts` (EN):
```typescript
comparison: {
  label: 'Why This Matters',
  title: 'The difference between forgetting and compounding',
  subtitle: 'What changes when LLM-Wiki enters your workflow.',
  beforeLabel: 'Without LLM-Wiki',
  afterLabel: 'With LLM-Wiki',
  items: [
    {
      category: 'Knowledge Saving',
      before: 'You clip an article, drop it in a folder, forget the filename. Three months later, search returns nothing useful.',
      after: 'Drop it in sources/. The plugin reads it, extracts key ideas, updates 10–15 related wiki pages, and files the summary. Done in seconds.',
    },
    {
      category: 'Knowledge Connection',
      before: 'You manually link two notes. Six months later, one is updated — the other still points to the old version. Links silently rot.',
      after: 'All cross-references are maintained automatically. When new data contradicts an old claim, every affected page updates.',
    },
    {
      category: 'Knowledge Compounding',
      before: 'A year of notes is a pile of files. Each new project starts from zero. You re-read the same sources, re-derive the same insights.',
      after: 'A year of sources builds a dense, cross-referenced wiki. New questions tap into everything you have ever read. Knowledge compounds.',
    },
  ],
},
```

- [ ] **Step 3: Update Chinese comparison copy**

Replace lines 333-358:
```typescript
comparison: {
  label: '为何重要',
  title: '遗忘，还是复利',
  subtitle: 'LLM-Wiki 加入工作流后的改变。',
  beforeLabel: '没有 LLM-Wiki',
  afterLabel: '使用 LLM-Wiki',
  items: [
    {
      category: '知识保存',
      before: '剪了一篇文章丢进文件夹，转头忘了文件名。三个月后想找回来，搜索全是无效结果。',
      after: '丢进 sources/，插件自动阅读、提取关键概念，更新 10-15 个相关页面，归档摘要。几秒搞定。',
    },
    {
      category: '知识连接',
      before: '手动链接了两条笔记。半年后更新了其中一条，另一条还指向旧版本。链接悄悄失效。',
      after: '所有交叉引用自动维护。新信息和旧内容矛盾时，每条相关页面都会同步更新。',
    },
    {
      category: '知识复利',
      before: '记了一年的笔记，最后还是一堆文件。每个新项目都从零开始，反复读同样的材料，得出同样的结论。',
      after: '一年积累下来，一部密集的交叉引用 Wiki 自然成型。新问题直接调用你读过的所有内容，知识越用越值钱。',
    },
  ],
},
```

- [ ] **Step 4: Add icons to comparison rows**

Import icons at top of `src/components/Comparison.tsx`:
```typescript
import { Bookmark, Link2, TrendingUp, X, Check } from 'lucide-react';
```

Update row rendering (replace lines 53-56 and 66-69):
```typescript
<div className="hidden md:flex items-center gap-2 mb-2.5">
  <X className="w-3.5 h-3.5 text-obsidian-dim flex-shrink-0" />
  <span className="text-xs font-mono text-obsidian-dim">{item.category}</span>
  {i === 0 && <Bookmark className="w-3 h-3 text-obsidian-dim ml-auto" />}
  {i === 1 && <Link2 className="w-3 h-3 text-obsidian-dim ml-auto" />}
  {i === 2 && <TrendingUp className="w-3 h-3 text-obsidian-dim ml-auto" />}
</div>
```

```typescript
<div className="hidden md:flex items-center gap-2 mb-2.5">
  <Check className="w-3.5 h-3.5 text-obsidian-purple-light flex-shrink-0" />
  <span className="text-xs font-mono text-obsidian-purple-light">{item.category}</span>
  {i === 0 && <Bookmark className="w-3 h-3 text-obsidian-purple-light ml-auto" />}
  {i === 1 && <Link2 className="w-3 h-3 text-obsidian-purple-light ml-auto" />}
  {i === 2 && <TrendingUp className="w-3 h-3 text-obsidian-purple-light ml-auto" />}
</div>
```

- [ ] **Step 5: Commit Comparison rewrite**

```bash
git add src/components/Comparison.tsx src/i18n/translations.ts
git commit -m "feat: merge Philosophy into Comparison, reduce to 3 rows with icons"
```

---

## Task 4: Redesign Features Section (Remove Images)

**Files:**
- Modify: `src/components/Features.tsx:39-58`
- Modify: `src/i18n/translations.ts:220-231` (EN), `379-390` (ZH)

- [ ] **Step 1: Remove image area from Features cards**

Replace lines 42-45 in `src/components/Features.tsx`:
```typescript
<div className="p-5 sm:p-6">
  <div className="flex items-center gap-2.5 mb-3">
    <div className="w-8 h-8 rounded-lg bg-obsidian-purple/15 border border-obsidian-purple/25 flex items-center justify-center">
      <f.icon className="w-4 h-4 text-obsidian-purple-light" />
    </div>
    <span className="text-[10px] font-mono text-obsidian-purple tracking-wider uppercase">{f.tag}</span>
  </div>
  <h3 className="text-base font-semibold text-obsidian-heading mb-2">{f.title}</h3>
  <p className="text-sm text-obsidian-muted leading-relaxed mb-3">{f.desc}</p>

  {/* Micro code snippet */}
  <div className="rounded-md bg-obsidian-bg border border-obsidian-border px-3 py-2 font-mono text-xs text-obsidian-dim">
    {i === 0 && (
      <div>
        <span className="text-obsidian-amber">sources/</span>article.md<br/>
        <span className="text-obsidian-muted">  ↓ (auto)</span><br/>
        <span className="text-obsidian-purple">wiki/</span>entities/...<br/>
        <span className="text-obsidian-purple">wiki/</span>concepts/...
      </div>
    )}
    {i === 1 && (
      <div>
        <span className="text-obsidian-purple">[[Page A]]</span> ↔ <span className="text-obsidian-purple">[[Page B]]</span><br/>
        <span className="text-obsidian-muted">  auto-linked</span><br/>
        <span className="text-obsidian-muted">  graph grows</span>
      </div>
    )}
    {i === 2 && (
      <div>
        <span className="text-obsidian-muted">Ask:</span> "How does X relate to Y?"<br/>
        <span className="text-obsidian-purple">  → [[X]]</span> + [[Y]] cited<br/>
        <span className="text-obsidian-muted">  → saved as wiki page</span>
      </div>
    )}
    {i === 3 && (
      <div>
        <span className="text-obsidian-muted">file watcher</span>: ON<br/>
        <span className="text-obsidian-muted">lint</span>: weekly<br/>
        <span className="text-obsidian-muted">health check</span>: startup<br/>
        <span className="text-obsidian-muted">  (default: OFF)</span>
      </div>
    )}
  </div>
</div>
```

- [ ] **Step 2: Remove image reference from features array**

Replace line 24:
```typescript
const features = [
  { title: t.features.organizeTitle, tag: t.features.organizeTag, desc: t.features.organizeDesc, icon: Layers },
  { title: t.features.bidirectionalTitle, tag: t.features.bidirectionalTag, desc: t.features.bidirectionalDesc, icon: Link2 },
  { title: t.features.conversationalTitle, tag: t.features.conversationalTag, desc: t.features.conversationalDesc, icon: MessageSquare },
  { title: t.features.autoMaintenanceTitle, tag: t.features.autoMaintenanceTag, desc: t.features.autoMaintenanceDesc, icon: RefreshCw },
];
```

- [ ] **Step 3: Commit Features redesign**

```bash
git add src/components/Features.tsx
git commit -m "feat: remove images from Features, add micro code snippets"
```

---

## Task 5: Redesign Ecosystem Section (1+1>2 Amplifier Cards)

**Files:**
- Modify: `src/components/Ecosystem.tsx:34-52`
- Modify: `src/i18n/translations.ts:240-270` (EN), `399-429` (ZH)

- [ ] **Step 1: Add standalone + amplified contrast to translations**

Replace ecosystem.items in EN (lines 244-269):
```typescript
items: [
  {
    name: 'Graph View',
    standalone: 'Visualize links between notes',
    amplified: 'Wiki gives your graph real meaning — hub pages, knowledge clusters, orphan detection. Graph becomes navigation, not decoration.',
  },
  {
    name: 'Dataview',
    standalone: 'Query frontmatter to generate tables',
    amplified: 'AI auto-adds structured metadata (tags, dates, categories). Dataview turns empty tables into living dashboards.',
  },
  {
    name: 'Git',
    standalone: 'Version control for files',
    amplified: 'Watch your knowledge evolve step by step. Every commit tells how your understanding grew.',
  },
  {
    name: 'Web Clipper',
    standalone: 'Clip articles as Markdown',
    amplified: 'Drop into sources/, AI auto-extracts, links, updates index. One clip → 10+ wiki pages.',
  },
  {
    name: 'Marp',
    standalone: 'Generate slide decks',
    amplified: 'A presentation is just a query: "Summarize my research for 10-min talk." Wiki generates slides from knowledge.',
  },
  {
    name: 'Canvas',
    standalone: 'Infinite visual canvas',
    amplified: 'AI generates concept maps, timelines, decision trees from your knowledge graph — not blank canvas.',
  },
],
```

Replace ecosystem.items in ZH (lines 404-428):
```typescript
items: [
  {
    name: '图谱视图',
    standalone: '可视化笔记之间的链接',
    amplified: 'Wiki 赋予图谱真正的意义——枢纽页面、知识集群、孤儿检测。图谱从装饰变成导航。',
  },
  {
    name: 'Dataview',
    standalone: '查询笔记 frontmatter 生成表格',
    amplified: 'AI 自动添加结构化元数据——标签、日期、分类。Dataview 从空表格变成活仪表盘。',
  },
  {
    name: 'Git',
    standalone: '文件的版本控制',
    amplified: '看你的知识一步步演变。每个 commit 都在讲述你的理解如何生长。',
  },
  {
    name: 'Web Clipper',
    standalone: '剪辑文章为 Markdown',
    amplified: '丢进 sources/，AI 自动提取、链接、更新索引。一次剪辑 → 10+ Wiki 页面。',
  },
  {
    name: 'Marp',
    standalone: '生成幻灯片',
    amplified: '演示只是一句查询："为 10 分钟演讲总结我的研究。" Wiki 从知识库直接生成幻灯片。',
  },
  {
    name: 'Canvas',
    standalone: '无限可视化画布',
    amplified: 'AI 从你的知识图谱生成概念地图、时间线、决策树——不再是空白画布。',
  },
],
```

- [ ] **Step 2: Update Translations interface**

Add to interface at line 107:
```typescript
items: Array<{
  name: string;
  standalone: string;
  amplified: string;
}>;
```

- [ ] **Step 3: Rewrite Ecosystem card layout**

Replace lines 34-52 in `src/components/Ecosystem.tsx`:
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
  {t.ecosystem.items.map((item, i) => {
    const Icon = ICONS[i];
    return (
      <div key={i} className="eco-card group rounded-lg border border-obsidian-border bg-obsidian-surface/30 p-5 hover:border-obsidian-purple/25 hover:bg-obsidian-purple/[0.03] transition-all duration-250">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-7 h-7 rounded-md bg-obsidian-purple/10 border border-obsidian-purple/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-3.5 h-3.5 text-obsidian-purple-light" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-obsidian-heading mb-1">{item.name}</h3>
            <p className="text-xs text-obsidian-dim leading-relaxed">{item.standalone}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px border-t border-dashed border-obsidian-purple/20 my-3" />

        {/* Amplified effect */}
        <div className="relative pl-3">
          <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-obsidian-purple/30" />
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-mono text-obsidian-purple-light">+ LLM Wiki</span>
          </div>
          <p className="text-xs text-obsidian-heading leading-relaxed">{item.amplified}</p>
        </div>
      </div>
    );
  })}
</div>
```

- [ ] **Step 4: Update Ecosystem title/subtitle in translations**

Replace EN title/subtitle (lines 242-243):
```typescript
title: 'Every plugin, amplified',
subtitle: 'LLM-Wiki is not an island. It makes every tool you already use more powerful.',
```

Replace ZH title/subtitle (lines 401-402):
```typescript
title: '每一个插件，都因知识结构化而更强',
subtitle: 'LLM-Wiki 不是孤岛。它让你已有的每一个工具都更强。',
```

- [ ] **Step 5: Commit Ecosystem redesign**

```bash
git add src/components/Ecosystem.tsx src/i18n/translations.ts
git commit -m "feat: redesign Ecosystem with 1+1>2 amplifier cards"
```

---

## Task 6: Update App.tsx Section Order and Imports

**Files:**
- Modify: `src/App.tsx:8-11,30-40`
- Delete: `src/components/Philosophy.tsx`, `src/components/Architecture.tsx`
- Modify: `src/components/Header.tsx:5-10` (NAV_ITEMS)

- [ ] **Step 1: Remove Philosophy and Architecture imports**

Delete lines 8-11 in `src/App.tsx`:
```typescript
import Philosophy from './components/Philosophy';
import Architecture from './components/Architecture';
```

- [ ] **Step 2: Update section rendering order**

Replace lines 30-40:
```typescript
<main className="pt-14">
  <Hero />
  <Comparison />
  <WikiDemo />
  <div className="h-px max-w-5xl mx-auto bg-gradient-to-r from-transparent via-obsidian-purple/20 to-transparent" />
  <Features />
  <Ecosystem />
  <Providers />
</main>
```

- [ ] **Step 3: Delete Philosophy.tsx and Architecture.tsx files**

```bash
rm src/components/Philosophy.tsx src/components/Architecture.tsx
```

- [ ] **Step 4: Update Header NAV_ITEMS**

Replace lines 5-10 in `src/components/Header.tsx`:
```typescript
const NAV_ITEMS = [
  { key: 'how-it-works', labelKey: 'howItWorks' as const, target: '#how-it-works' },
  { key: 'features', labelKey: 'features' as const, target: '#features' },
  { key: 'ecosystem', labelKey: 'ecosystem' as const, target: '#ecosystem' },
  { key: 'providers', labelKey: 'providers' as const, target: '#providers' },
];
```

- [ ] **Step 5: Remove philosophy from translations interface and nav**

Delete from Translations interface (line 3):
```typescript
philosophy: string; // Remove this
```

Delete from nav translations EN (line 123) and ZH (line 282):
```typescript
philosophy: 'Philosophy', // Remove this
philosophy: '理念', // Remove this
```

- [ ] **Step 6: Commit section reordering**

```bash
git add src/App.tsx src/components/Header.tsx src/i18n/translations.ts
git commit -m "feat: remove Philosophy and Architecture sections, reorder to 6 sections"
```

---

## Task 7: Build Verification and Final Commit

**Files:**
- All modified files

- [ ] **Step 1: Run build to verify no errors**

```bash
npm run build
```

Expected: build succeeds with no TypeScript or compilation errors

- [ ] **Step 2: Run ESLint**

```bash
npx eslint src/
```

Expected: no lint errors

- [ ] **Step 3: Create comprehensive final commit**

```bash
git add -A
git commit -m "feat: complete landing page redesign — 6-section narrative compression

- Replace KnowledgeGraphGenesis with KnowledgeGrowth organic animation
  (document shapes, growth arcs, clustering, sprouting wiki nodes)
- Merge Philosophy into Comparison: editorial quote + 3 rows with icons
- Redesign Features: remove images, add micro code snippets showing usage
- Redesign Ecosystem: 1+1>2 amplifier cards (standalone vs amplified contrast)
- Update Hero copy pointing to knowledge compounding theme
- Remove Philosophy and Architecture sections, reorder to 6 sections

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

- [ ] **Step 4: Verify all changes committed**

```bash
git log --oneline -5
```

Expected: see final commit and all intermediate commits

---

## Spec Coverage Check

| Spec Section | Task Coverage |
|---|---|
| 3.1 Hero background animation | Task 1 + Task 2 |
| 3.1 Hero content | Task 2 |
| 3.2 Comparison (merge Philosophy) | Task 3 |
| 3.3 WikiDemo (unchanged) | No changes needed |
| 3.4 Features redesign | Task 4 |
| 3.5 Ecosystem redesign | Task 5 |
| 3.6 Providers + Footer | No major changes |
| 4 Sections removed | Task 6 |

All spec requirements covered.

---

## Type Consistency Check

- `DocumentNode` interface defined in Task 1, used throughout animation logic ✓
- `Connection` interface defined in Task 1, used in update/draw ✓
- `Translations.ecosystem.items` updated to include `standalone` and `amplified` fields ✓
- All components use semantic color tokens (`obsidian-*`) ✓
- All imports updated (KnowledgeGrowth, removed Philosophy/Architecture) ✓

---

## Placeholder Scan

No TBD, TODO, or placeholder content in any step. All code blocks contain complete implementations.

---

Plan complete.