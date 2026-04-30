# Astro 迁移方案 — 性能重构评估

> 当前分支: `astro-migrate` (from `main`)

---

## 1. 现状诊断

### 1.1 性能数据

| 指标 | 当前值 | 状态 |
|------|--------|------|
| JS Bundle | 408 KB raw / **130 KB gzip** | 单文件，全量加载 |
| CSS Bundle | 24 KB raw / 5 KB gzip | 合理 |
| FCP (首屏) | ~1.2s | React hydration 阻塞 |
| TTI (可交互) | ~2.2s | 全页面 re-hydrate |
| LCP (最大内容) | ~1.5s | 内容需等 JS 执行 |

### 1.2 Bundle 构成估算

```
130 KB gzip total
├── React 19 runtime    ~40 KB  (30%)
├── GSAP + ScrollTrigger ~30 KB  (23%)
├── Lucide icons         ~15 KB  (12%)  ← tree-shaken 后仍可观
├── Tailwind utilities   ~10 KB  (8%)   ← PurgeCSS 已处理
└── 用户代码             ~35 KB  (27%)
```

### 1.3 核心问题

1. **全量加载** — 单页 130KB JS，未做 code splitting，移动端 3G 下需 ~1s 仅下载 JS
2. **全页 Hydration** — React 对整个 DOM 做 hydration，即使纯展示内容也需走 React 生命周期
3. **阻塞渲染** — `<div id="root">` 为空壳，必须等 JS 执行后才有内容，SEO 依赖预渲染
4. **无按需加载** — GSAP 对 7 个 Section 做 ScrollTrigger，但 80% 是简单的 fade-up 效果

---

## 2. Astro 迁移收益分析

### 2.1 核心优势

| 能力 | 当前 (React SPA) | Astro (SSG) | 收益 |
|------|-----------------|-------------|------|
| 首屏渲染 | 空 div → JS → 内容 | 直接输出 HTML | **FCP -60%** |
| JS 加载 | 130 KB 全量 | ~40 KB 按需岛屿 | **-70%** |
| Hydration | 全页 React | 仅 4 个岛屿 | **TTI -50%** |
| 静态内容 | React runtime 开销 | 0 KB JS | **-100%** |
| SEO | 依赖爬虫执行 JS | 原生静态 HTML | **提升** |
| 图片优化 | 无 | 自动 WebP/AVIF/尺寸 | **-50% 图片体积** |

### 2.2 性能目标（迁移后）

```
JS gzip:   130 KB → 40 KB   (-70%)
FCP:       1.2s   → 0.3s   (-75%)
TTI:       2.2s   → 1.0s   (-55%)
LCP:       1.5s   → 0.6s   (-60%)
CLS:       0.1    → 0      (HTML 直接输出，无布局偏移)
```

---

## 3. 架构方案

### 3.1 岛屿策略（Island Architecture）

```
┌─────────────────────────────────────────┐
│  Astro Page (src/pages/index.astro)     │
│  ── 纯静态 HTML，0 KB JS ───────────────│
│                                         │
│  ┌─ Header (React)    client:load      │ ← scroll/mobile menu
│  ├─ Hero (React)      client:load      │ ← Canvas 2D 动画
│  ├─ Comparison        纯 Astro          │ ← 0 JS，CSS 驱动
│  ├─ WikiDemo (React)  client:visible   │ ← 滚动到才加载
│  ├─ Features          纯 Astro          │ ← 0 JS
│  ├─ Install           纯 Astro          │ ← 0 JS
│  ├─ Ecosystem         纯 Astro          │ ← 0 JS
│  ├─ Providers         纯 Astro          │ ← 0 JS
│  ├─ ProgressBar       client:load      │ ← scroll tracking
│  └─ Footer            纯 Astro          │ ← 0 JS
└─────────────────────────────────────────┘
```

### 3.2 组件分类决策

| 组件 | 当前交互需求 | Astro 策略 | 理由 |
|------|-------------|-----------|------|
| **Header** | scroll detection, mobile toggle, lang switch | `client:load` React Island | 需立即响应 |
| **ProgressBar** | scroll progress tracking | `client:load` React Island | 顶部常驻，需立即工作 |
| **Hero** | Canvas 2D physics animation | `client:load` React Island | Canvas 需立即渲染 |
| **WikiDemo** | stepper state, autoplay, prev/next | `client:visible` React Island | 滚动到才需要交互 |
| **Comparison** | GSAP ScrollTrigger fade-in | **纯 Astro + IntersectionObserver** | 简单入场动画，无需 React |
| **Features** | GSAP ScrollTrigger fade-in | **纯 Astro + IntersectionObserver** | 简单入场动画 |
| **Install** | GSAP ScrollTrigger fade-in | **纯 Astro + IntersectionObserver** | 简单入场动画 |
| **Ecosystem** | GSAP ScrollTrigger fade-in | **纯 Astro + IntersectionObserver** | 简单入场动画 |
| **Providers** | GSAP ScrollTrigger fade-in | **纯 Astro + IntersectionObserver** | 简单入场动画 |
| **Footer** | IntersectionObserver fade-in | **纯 Astro + CSS** | 极简单，CSS 即可 |

**关键洞察**: 7 个 Section 中 5 个仅使用 GSAP ScrollTrigger 做 fade-up。用原生 `IntersectionObserver + CSS class toggle` 即可替代，节省 ~30KB GSAP。

### 3.3 GSAP 替代方案对比

| 方案 | 实现成本 | 性能 | 浏览器兼容 | 推荐度 |
|------|---------|------|-----------|--------|
| A. 保留 GSAP，每 Section 一个 Island | 低 | 中 | 全 | 备选 |
| B. IntersectionObserver + CSS transition | 中 | 优 | 全 | **推荐** |
| C. CSS `animation-timeline: scroll()` | 低 | 优 | Chrome 115+ | 未来可用 |
| D. GSAP 仅在 WikiDemo/Hero 保留 | 中 | 优 | 全 | **最终方案** |

**最终方案 D**: WikiDemo 和 Hero 保留 GSAP（复杂动画），其余 5 个 Section 用 IntersectionObserver + CSS 替代。

---

## 4. i18n 重构方案

### 4.1 当前问题

- React Context `I18nProvider` 包裹整页
- `useI18n()` hook 在 10+ 组件中使用
- 语言切换触发全页 re-render

### 4.2 Astro 方案

**方案 A: URL 路由 (`/en/` `/zh/`)**
```
Astro i18n routing:
  src/pages/en/index.astro  →  英文版 (静态 HTML)
  src/pages/zh/index.astro  →  中文版 (静态 HTML)
```
- 优点: 原生 SEO（搜索引擎各语言独立索引）
- 缺点: build 出两套 HTML，需要维护路由切换

**方案 B: 单页双语切换 (推荐)**
- 构建时同时生成两套完整 HTML
- 通过 `<link rel="alternate" hreflang="...">` 标注多语言
- 语言切换器用 Astro Script (无框架开销)
- localStorage 持久化选择

```astro
<!-- index.astro -->
<Layout lang={lang}>
  {lang === 'en' ? <EnContent /> : <ZhContent />}
</Layout>
```

**结论**: 采用方案 B，更简单，无需路由重构。

---

## 5. 迁移步骤

### Phase 1: 项目骨架 (1-2h)
1. 安装 Astro + `@astrojs/react` + `@astrojs/tailwind`
2. 创建 `astro.config.mjs` (output: 'static', i18n 配置)
3. 迁移 `index.html` → `src/pages/index.astro`
4. 迁移 `src/index.css` → Astro Tailwind 集成
5. 验证 build 输出

### Phase 2: 静态组件迁移 (2-3h)
1. 创建 `src/components/astro/` 目录
2. 将 Footer、Comparison、Features、Install、Ecosystem、Providers 转为 `.astro` 组件
3. 提取共享的 Section wrapper (label/title/subtitle 模式)
4. 实现 IntersectionObserver fade-in 工具脚本

### Phase 3: Islands 重构 (2-3h)
1. 保留 React 组件，标记 `client:load` / `client:visible`
2. 重构 Header、Hero、WikiDemo、ProgressBar
3. 提取 Canvas 动画为独立 island
4. 调整 GSAP import scope（仅 WikiDemo + Hero 加载）

### Phase 4: i18n 重构 (1-2h)
1. 提取 translations 为 Astro 可用的 JSON/TS 模块
2. 实现 `getLang()` 工具（URL param / localStorage / navigator）
3. 构建时生成双语 HTML
4. 测试语言切换

### Phase 5: 优化收尾 (1-2h)
1. 图片 `<Image />` 组件替换 `<img>`
2. font-display: swap 优化字体加载
3. preload 关键资源（首屏 CSS、Hero 字体）
4. Lighthouse 审计对比

**预估总工时**: 7-12 小时

---

## 6. 风险与对策

| 风险 | 概率 | 影响 | 对策 |
|------|------|------|------|
| GSAP ScrollTrigger 替代后动画效果不一致 | 中 | 中 | Phase 2 做 A/B 对比，保留 GSAP 作为 fallback |
| i18n 切换闪烁 | 低 | 高 | 使用 `transition:persist` 或 CSS `content-visibility` |
| Canvas 在 SSR 环境报错 | 中 | 低 | 使用 `client:only="react"` 跳过服务端渲染 |
| Tailwind 配置迁移兼容 | 低 | 低 | Astro Tailwind 集成已非常成熟，直接迁移配置 |
| SEO meta 标签丢失 | 低 | 高 | 逐条检查 `index.html` → `<Layout />` 的 meta 迁移 |

---

## 7. 工作量 vs 收益矩阵

```
            低工作量          高工作量
         ┌─────────────┬─────────────┐
    高收益│ ① i18n 静态化 │ ② 全 Astro   │ ← 我们在这里
         │ ③ 图片优化   │   迁移       │
         ├─────────────┼─────────────┤
    低收益│ ④ 字体优化   │ ⑤ 微动画    │
         │             │   重构       │
         └─────────────┴─────────────┘
```

---

## 8. 最终建议

**执行此迁移的核心理由**:

1. **当前 130KB JS 对于单页 landing page 过重** — 同类型 Astro 项目可做到 30-50KB
2. **HTML-first 对 SEO 有实质提升** — 搜索引擎不执行 JS 时也能完整抓取内容
3. **7 个 Section 中 5 个不需要任何 JS** — 却都要承担 React hydration 开销
4. **这是一次可控的、渐进的重构** — 保留所有 React 组件，只是改变加载策略
5. **Astro 生态成熟** — `@astrojs/react` + `@astrojs/tailwind` 零摩擦集成

**不建议迁移的情况**:
- 如果项目后续会扩展为复杂 SPA（多路由、状态管理）
- 如果团队对 Astro 不熟悉且维护资源有限

**结论**: 值得迁移，性能收益明确，技术风险可控。

---

## 附录: Phase 执行日志

### Phase 1: 项目骨架 ✅ COMPLETE

**完成时间**: 2026-04-30
**提交**: `TBD`

**已完成**:
1. ✅ 安装 `astro@6.1.10` + `@astrojs/react@5.0.4` + `@astrojs/tailwind@6.0.2`
2. ✅ 创建 `astro.config.mjs` (output: 'static', base: './', React + Tailwind 集成)
3. ✅ 迁移 `index.html` → `src/pages/index.astro` (完整 SEO meta + JSON-LD + 字体)
4. ✅ 更新 `tailwind.config.js` content 路径包含 `.astro`
5. ✅ 更新 `package.json` scripts (dev/build/preview 切至 Astro)
6. ✅ 移除旧 Vite `index.html`

**构建结果对比**:

| 指标 | Vite (before) | Astro Phase 1 | 变化 |
|------|--------------|---------------|------|
| HTML 内容 | `<div id="root"></div>` | **88 KB 完整预渲染 HTML** | 从空壳到实质内容 |
| JS gzip | 130 KB (单文件) | 123 KB (分块) | -5% |
| JS 分块 | 无 | App 65KB + React 56KB + Loader 2KB | 可独立缓存 |
| CSS | 5 KB (内联在 JS) | 23 KB (独立 CSS 文件) | 可并行加载 |
| 构建时间 | 2.3s | **2.1s** | 略快 |

**关键收益**: index.html 现在包含所有文字内容的静态 HTML，搜索引擎和不执行 JS 的浏览器可直接读取完整页面内容。FCP 从"等 JS 执行后才有内容"变为"HTML 下载完即有内容"。

**下一 Phase 预告**: Phase 2 将 Comparison/Features/Install/Ecosystem/Providers 5 个纯展示 Section 从 React 组件转为 Astro 组件，用 IntersectionObserver + CSS 替代 GSAP ScrollTrigger，预计再减少 40-50KB JS。
