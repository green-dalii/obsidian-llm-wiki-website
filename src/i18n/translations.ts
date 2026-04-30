export interface Translations {
  nav: {
    howItWorks: string;
    features: string;
    providers: string;
    ecosystem: string;
    install: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaInstall: string;
    ctaRead: string;
    legendSources: string;
    legendEntities: string;
    legendConcepts: string;
    scrollHint: string;
  };
  wikiDemo: {
    label: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    next: string;
    prev: string;
    restart: string;
    sourceNote: string;
    extracted: string;
    generated: string;
    linked: string;
    ask: string;
    answer: string;
  };
  comparison: {
    label: string;
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    items: Array<{
      category: string;
      before: string;
      after: string;
    }>;
  };
  features: {
    label: string;
    title: string;
    subtitle: string;
    organizeTitle: string;
    organizeDesc: string;
    organizeTag: string;
    bidirectionalTitle: string;
    bidirectionalDesc: string;
    bidirectionalTag: string;
    conversationalTitle: string;
    conversationalDesc: string;
    conversationalTag: string;
    autoMaintenanceTitle: string;
    autoMaintenanceDesc: string;
    autoMaintenanceTag: string;
  };
  providers: {
    label: string;
    title: string;
    subtitle: string;
    openSourceTitle: string;
    openSourceDesc: string;
    communityTitle: string;
    communityDesc: string;
    vendorTitle: string;
    vendorDesc: string;
    obsidianTitle: string;
    obsidianDesc: string;
    cardLabel: string;
    cardSubtitle: string;
    contextNote: string;
    bestValue: string;
  };
  ecosystem: {
    label: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      standalone: string;
      amplified: string;
    }>;
    cta: string;
  };
  footer: {
    license: string;
    github: string;
    discussions: string;
    releases: string;
  };
}

export const en: Translations = {
  nav: {
    howItWorks: 'How It Works',
    features: 'Features',
    providers: 'Open Source',
    ecosystem: 'Ecosystem',
    install: 'Install',
  },
  hero: {
    badge: 'Based on Andrej Karpathy\'s LLM Wiki concept',
    title1: 'Your notes.',
    title2: 'A living wiki.',
    subtitle: 'An Obsidian plugin that reads your raw notes and builds a self-maintaining wiki — cross-referenced, searchable, and growing richer with every source you add.',
    ctaInstall: 'Get the Plugin',
    ctaRead: 'Read the original concept',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: 'Scroll',
  },
  wikiDemo: {
    label: 'How It Works',
    title: 'From note to wiki, step by step',
    subtitle: 'See how a single source note becomes a fully connected knowledge wiki.',
    step1Title: '1. Drop a source note',
    step1Desc: 'Write or clip anything into sources/. Articles, papers, book notes — the plugin reads them all as read-only input.',
    step2Title: '2. The plugin extracts entities & concepts',
    step2Desc: 'It reads the full context (not chunks), identifies people, organizations, and key themes from your note.',
    step3Title: '3. Generate wiki pages',
    step3Desc: 'Each entity and concept gets a dedicated page with structured content, definitions, and metadata.',
    step4Title: '4. Weave [[bidirectional links]]',
    step4Desc: 'Every page cross-references related pages. Open Graph View to see your knowledge map grow.',
    step5Title: '5. Ask your knowledge',
    step5Desc: 'Ask in natural language. The plugin reads your wiki pages, synthesizes cited answers, and can save them back as new pages.',
    next: 'Next',
    prev: 'Previous',
    restart: 'Restart',
    sourceNote: 'Source Note',
    extracted: 'Extracted',
    generated: 'Generated',
    linked: 'Linked',
    ask: 'Ask',
    answer: 'Answer',
  },
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
  features: {
    label: 'Features',
    title: 'What changes when you use it',
    subtitle: 'Not a feature list. A set of behaviors that change how you interact with your own knowledge.',
    organizeTitle: 'Auto-Organize',
    organizeDesc: 'Drop articles, papers, or notes into sources/. The plugin reads them in full context, extracts entities and concepts, and builds structured wiki pages — no manual tagging, no folders to manage.',
    organizeTag: 'Zero-config',
    bidirectionalTitle: 'Bidirectional Links',
    bidirectionalDesc: 'Every generated page is woven with [[bidirectional links]] into your Obsidian graph. Open Graph View and watch your knowledge map grow organically with each new source.',
    bidirectionalTag: '[[wiki-links]]',
    conversationalTitle: 'Conversational Query',
    conversationalDesc: 'Ask questions about your knowledge in natural language. The plugin reads your wiki pages (not the internet), synthesizes cited answers with [[wiki-links]], and can save responses back as new wiki pages.',
    conversationalTag: 'Chat',
    autoMaintenanceTitle: 'Auto Maintenance',
    autoMaintenanceDesc: 'File watcher for automatic ingestion. Periodic lint detects contradictions, stale info, and orphaned pages. Startup health check keeps your wiki consistent — all default OFF to avoid surprise costs.',
    autoMaintenanceTag: 'Always on',
  },
  providers: {
    label: 'Open Source',
    title: 'Built in the open',
    subtitle: 'MIT licensed, community driven, vendor neutral. Use it, extend it, make it yours.',
    openSourceTitle: 'Open Source',
    openSourceDesc: 'MIT licensed. Full source on GitHub. Fork it, extend it, self-host it.',
    communityTitle: 'Community',
    communityDesc: 'GitHub Discussions for ideas and help. Contributions welcome.',
    vendorTitle: 'Vendor Neutral',
    vendorDesc: 'Your LLM, your choice. Cloud or local, switch anytime.',
    obsidianTitle: 'Obsidian Native',
    obsidianDesc: 'No extra apps to install. Runs entirely inside your Obsidian vault.',
    cardLabel: 'Your LLM, your choice',
    cardSubtitle: 'Works with any major provider — no lock-in.',
    contextNote: 'Long-context models (256K+ tokens) are recommended — the full wiki fits in a single inference call, giving the LLM complete understanding.',
    bestValue: 'Best value',
  },
  ecosystem: {
    label: 'Ecosystem',
    title: 'Every plugin, amplified',
    subtitle: 'LLM-Wiki is not an island. It makes every tool you already use more powerful.',
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
    cta: 'These are just the beginning. Every Obsidian plugin becomes more powerful when your knowledge is structured.',
  },
  footer: {
    license: 'MIT License',
    github: 'GitHub',
    discussions: 'Discussions',
    releases: 'Releases',
  },
};

export const zh: Translations = {
  nav: {
    howItWorks: '工作原理',
    features: '功能',
    providers: '开源',
    ecosystem: '生态',
    install: '安装',
  },
  hero: {
    badge: '灵感来自 Andrej Karpathy 的 LLM Wiki 构想',
    title1: '你的笔记。',
    title2: '一部活的 Wiki。',
    subtitle: '把零散笔记放进 Obsidian，插件自动阅读、提取关键概念，编织成交叉引用的自维护 Wiki —— 越用越丰厚。',
    ctaInstall: '获取插件',
    ctaRead: '阅读原始概念',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: '向下滚动',
  },
  wikiDemo: {
    label: '工作原理',
    title: '从笔记到 Wiki，一步一幅画',
    subtitle: '一条原始笔记，如何变成全连接的知识 Wiki。',
    step1Title: '1. 放入源笔记',
    step1Desc: '文章、论文、读书笔记——丢进 sources/ 即可。插件以只读方式读取全部内容。',
    step2Title: '2. 插件提取实体与概念',
    step2Desc: '读取全文上下文（非片段），识别人物、组织和关键主题。',
    step3Title: '3. 生成 Wiki 页面',
    step3Desc: '每个实体和概念都会生成专属页面，自带结构化内容、定义和元数据。',
    step4Title: '4. 编织 [[双向链接]]',
    step4Desc: '每一页都与其他页面互相引用。打开图谱视图，看知识地图自然生长。',
    step5Title: '5. 向你的知识提问',
    step5Desc: '自然语言提问即可。插件读取 Wiki 页面，综合出带引用的答案，还能存为新页面。',
    next: '下一步',
    prev: '上一步',
    restart: '重新开始',
    sourceNote: '源笔记',
    extracted: '已提取',
    generated: '已生成',
    linked: '已连接',
    ask: '提问',
    answer: '回答',
  },
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
  features: {
    label: '功能',
    title: '使用后会有什么改变',
    subtitle: '不是功能列表。而是一组改变你与自身知识互动方式的行为。',
    organizeTitle: '自动整理',
    organizeDesc: '文章、论文、笔记——丢进 sources/ 就行。插件读取全文，提取实体和概念，自动生成结构化 Wiki 页面。不用手动分类，不用管文件夹。',
    organizeTag: '零配置',
    bidirectionalTitle: '双向链接',
    bidirectionalDesc: '每个页面通过 [[双向链接]] 编入 Obsidian 图谱。打开图谱视图，知识地图随着新来源自然生长。',
    bidirectionalTag: '[[wiki-links]]',
    conversationalTitle: '对话问答',
    conversationalDesc: '用自然语言向知识库提问。插件读取 Wiki 页面（不是搜互联网），综合出带 [[wiki-links]] 引用的答案，还能存为新的 Wiki 页面。',
    conversationalTag: '对话',
    autoMaintenanceTitle: '自动维护',
    autoMaintenanceDesc: '文件监控自动摄入新内容。定期检测矛盾、过时信息和孤立页面。启动时自动健康检查——默认全部关闭，不用担心意外费用。',
    autoMaintenanceTag: '持续运行',
  },
  providers: {
    label: '开源共建',
    title: '开源、开放、共建',
    subtitle: 'MIT 协议，社区驱动，不绑定任何厂商。自由使用、自由扩展、自由部署。',
    openSourceTitle: '开源',
    openSourceDesc: 'MIT 许可证，完整代码在 GitHub。可 Fork、可扩展、可自托管。',
    communityTitle: '社区',
    communityDesc: 'GitHub Discussions 交流想法与问题。欢迎提交 PR 共建。',
    vendorTitle: '自由接入',
    vendorDesc: '你的 LLM，你做主。云端或本地，随时切换。',
    obsidianTitle: '原生 Obsidian',
    obsidianDesc: '无需安装额外软件，直接在 Vault 内运行。',
    cardLabel: '你的 LLM，你做主',
    cardSubtitle: '主流提供商全支持——无厂商锁定。',
    contextNote: '推荐 256K+ 上下文窗口——完整 Wiki 一次装入推理，LLM 看到全局。',
    bestValue: '最佳性价比',
  },
  ecosystem: {
    label: '生态',
    title: '每一个插件，都因知识结构化而更强',
    subtitle: 'LLM-Wiki 不是孤岛。它让你已有的每一个工具都更强。',
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
    cta: '这只是开始。知识一旦结构化，Obsidian 的每一个插件都会变得更强大。',
  },
  footer: {
    license: 'MIT 许可证',
    github: 'GitHub',
    discussions: '讨论区',
    releases: '发布版本',
  },
};
