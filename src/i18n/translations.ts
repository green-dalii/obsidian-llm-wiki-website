export interface Translations {
  nav: {
    howItWorks: string;
    comparison: string;
    features: string;
    ecosystem: string;
    providers: string;
    install: string;
    download: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaInstall: string;
    ctaObsidian: string;
    obsidianHint: string;
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
  install: {
    label: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    obsidianRequired: string;
    downloadPlugin: string;
    downloadObsidian: string;
    pluginHint: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    cta: string;
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
    obsidian: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
}

export const en: Translations = {
  nav: {
    howItWorks: 'How It Works',
    comparison: 'Why It Matters',
    features: 'Features',
    providers: 'Open Source',
    ecosystem: 'Ecosystem',
    install: 'Install',
    download: 'Download',
  },
  hero: {
    badge: 'Andrej Karpathy\'s LLM Wiki concept',
    title1: 'Your notes.',
    title2: 'A living wiki.',
    subtitle: 'Write in Obsidian. Watch every note weave itself into a knowledge network that grows.',
    ctaInstall: 'Get the Plugin',
    ctaObsidian: 'Get Obsidian',
    obsidianHint: 'Obsidian required.',
    ctaRead: 'Read the original concept',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: 'Scroll',
  },
  wikiDemo: {
    label: 'How It Works',
    title: 'From note to wiki',
    subtitle: 'See how a single note becomes something much bigger.',
    step1Title: 'Drop a source',
    step1Desc: 'Articles, papers, ideas. Drop them in sources/ — the plugin reads every word.',
    step2Title: 'Extract key info',
    step2Desc: 'People, organizations, themes. AI understands the full context and finds what matters.',
    step3Title: 'Build wiki pages',
    step3Desc: 'Every concept gets its own page. Content, definitions, connections — all automatic.',
    step4Title: 'Link everything',
    step4Desc: 'Pages connect to each other. Open Graph View and watch your knowledge take shape.',
    step5Title: 'Ask your wiki',
    step5Desc: 'Ask in natural language. Your wiki answers with citations, ready to save as new pages.',
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
    label: 'Why It Matters',
    title: 'Forget or compound?',
    subtitle: 'What happens when LLM Wiki joins your workflow.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    items: [
      {
        category: 'Saving',
        before: 'Clip an article, forget where it is. Search fails months later.',
        after: 'Drop it in sources/. Ideas extracted, pages updated, summary filed. Done in seconds.',
      },
      {
        category: 'Connecting',
        before: 'Manually link notes. One updates, the other still points to old info. Links break.',
        after: 'Links stay alive. When new info contradicts old claims, every page knows.',
      },
      {
        category: 'Compounding',
        before: 'A year of notes is just files. Every project starts from scratch. Same sources, same insights.',
        after: 'A year builds a connected wiki. New questions draw from everything you\'ve read. Knowledge grows.',
      },
    ],
  },
  features: {
    label: 'Features',
    title: 'What changes',
    subtitle: 'Not a feature list. A new way to work with what you know.',
    organizeTitle: 'Auto-Organize',
    organizeDesc: 'Drop into sources/. AI reads full context, extracts entities, builds pages. No folders, no tags.',
    organizeTag: 'Zero setup',
    bidirectionalTitle: 'Living Links',
    bidirectionalDesc: 'Every page weaves into your Obsidian graph. Open Graph View — watch it grow with each source.',
    bidirectionalTag: 'Connected',
    conversationalTitle: 'Natural Conversation',
    conversationalDesc: 'Ask questions naturally. Your wiki answers with citations, not web searches.',
    conversationalTag: 'Chat',
    autoMaintenanceTitle: 'Self-Care',
    autoMaintenanceDesc: 'File watcher for new content. Periodic checks for contradictions. Startup health check. All opt-in.',
    autoMaintenanceTag: 'On demand',
  },
  install: {
    label: 'Get Started',
    title: 'Ready in minutes',
    subtitle: 'Just Obsidian. Nothing else needed.',
    step1Title: 'Download',
    step1Desc: 'Three files from GitHub: <em>main.js</em>, <em>manifest.json</em>, <em>styles.css</em>. That\'s all.',
    obsidianRequired: 'Need Obsidian first.',
    downloadPlugin: 'Download Plugin',
    downloadObsidian: 'Download Obsidian',
    pluginHint: 'Obsidian must be installed.',
    step2Title: 'Install',
    step2Desc: 'Obsidian → Settings → Community plugins. Click <em><i>folder</i> icon</em>. Create <em>llm-wiki</em> folder, drop files in. Click <em><i>refresh-cw</i> icon</em>. Enable.',
    step3Title: 'Configure',
    step3Desc: 'Settings → <em>Karpathy LLM Wiki</em>. Pick your LLM, enter key, test, save.',
    step4Title: 'Use',
    step4Desc: '<em>Cmd+P</em> (or <em>Ctrl+P</em>). Type <em>Ingest</em> to add sources. Type <em>Query</em> to ask.',
    cta: 'Download Latest',
  },
  providers: {
    label: 'Open Source',
    title: 'Built in the open',
    subtitle: 'MIT licensed. Community driven. No vendor lock-in. Completely yours.',
    openSourceTitle: 'Open Source',
    openSourceDesc: 'MIT license. Full source on GitHub. Fork it, extend it, make it yours.',
    communityTitle: 'Community',
    communityDesc: 'GitHub Discussions for ideas and help. Contributions welcome.',
    vendorTitle: 'Freedom of Choice',
    vendorDesc: 'Your LLM, your decision. Cloud or local, switch anytime.',
    obsidianTitle: 'Pure Obsidian',
    obsidianDesc: 'No extra apps. Lives entirely in your vault.',
    cardLabel: 'Your LLM, your choice',
    cardSubtitle: 'Works with any provider. No lock-in.',
    contextNote: 'Long-context models (256K+) recommended. Your whole wiki in one call, complete understanding.',
    bestValue: 'Best value',
  },
  ecosystem: {
    label: 'Ecosystem',
    title: 'Every plugin, amplified',
    subtitle: 'Not an island. Makes every tool you already love even better.',
    items: [
      {
        name: 'Graph View',
        standalone: 'Visualize links',
        amplified: 'Wiki gives your graph meaning — hub pages, clusters, orphans. Graph becomes exploration, not decoration.',
      },
      {
        name: 'Web Clipper',
        standalone: 'Clip articles',
        amplified: 'Drop in sources/, AI extracts, links, updates index. One clip → 10+ wiki pages.',
      },
      {
        name: 'Dataview',
        standalone: 'Query metadata',
        amplified: 'AI adds structure — tags, dates, categories. Empty tables become living dashboards.',
      },
      {
        name: 'Git',
        standalone: 'Version control',
        amplified: 'Watch your knowledge evolve. Every commit tells how your understanding grew.',
      },
      {
        name: 'Marp',
        standalone: 'Make slides',
        amplified: 'A presentation is a query: "Summarize research for 10-min talk." Wiki generates slides from what you know.',
      },
      {
        name: 'Canvas',
        standalone: 'Visual canvas',
        amplified: 'AI creates concept maps, timelines, decision trees from your knowledge — not empty space.',
      },
    ],
    cta: 'Just the beginning. Every Obsidian plugin grows stronger when your knowledge has structure.',
  },
  footer: {
    license: 'MIT License',
    github: 'GitHub',
    discussions: 'Feedback',
    releases: 'Releases',
    obsidian: 'Obsidian',
  },
  cta: {
    title: 'Ready to build your wiki?',
    subtitle: 'MIT licensed, community driven. Just Obsidian.',
    button: 'Get it on GitHub',
  },
};

export const zh: Translations = {
  nav: {
    howItWorks: '原理',
    comparison: '价值',
    features: '功能',
    providers: '开源',
    ecosystem: '生态',
    install: '安装',
    download: '下载',
  },
  hero: {
    badge: 'Andrej Karpathy 的 LLM Wiki 理念',
    title1: '你的笔记',
    title2: '一部活的 Wiki',
    subtitle: '在 Obsidian 写笔记。每条笔记都会编织进知识网络，自然生长。',
    ctaInstall: '获取插件',
    ctaObsidian: '下载 Obsidian',
    obsidianHint: '需要先安装 Obsidian',
    ctaRead: '查看原始理念',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: '继续',
  },
  wikiDemo: {
    label: '原理',
    title: '笔记变 Wiki',
    subtitle: '看一条笔记如何变成更大的世界。',
    step1Title: '放入来源',
    step1Desc: '文章、论文、想法。放进 sources/，插件读进每一行。',
    step2Title: '提取关键',
    step2Desc: '人物、组织、主题。AI 理解完整上下文，发现真正重要的信息。',
    step3Title: '构建页面',
    step3Desc: '每个概念都有专属页面。内容、定义、连接——全部自动完成。',
    step4Title: '编织连接',
    step4Desc: '页面彼此连接。打开图谱视图，看知识网络慢慢成形。',
    step5Title: '询问 Wiki',
    step5Desc: '自然语言提问。你的 Wiki 会带引用回答，还能存成新页面。',
    next: '下一步',
    prev: '上一步',
    restart: '重播',
    sourceNote: '源笔记',
    extracted: '已提取',
    generated: '已生成',
    linked: '已连接',
    ask: '提问',
    answer: '回答',
  },
  comparison: {
    label: '价值',
    title: '尘封遗忘，还是形成复利？',
    subtitle: 'LLM Wiki 加入工作流后，一切都不一样了。',
    beforeLabel: '之前',
    afterLabel: '之后',
    items: [
      {
        category: '保存',
        before: '剪藏文章，忘了在哪。几个月后想找，搜索全是无效结果。',
        after: '放进 sources/。要点提取了，页面更新了，摘要归档了。几秒搞定。',
      },
      {
        category: '连接',
        before: '手动链接笔记。更新了其中一条，另一条还指向旧信息。链接悄悄断了。',
        after: '链接一直活着。新信息与旧内容矛盾时，每个页面都知道。',
      },
      {
        category: '复利',
        before: '记了一年还是一堆文件。每个项目从零开始。同样的材料，同样的结论。',
        after: '一年积累成一部连接的 Wiki。新问题能调用你读过的所有内容。知识在增值。',
      },
    ],
  },
  features: {
    label: '功能',
    title: '真正的变化',
    subtitle: '不是功能清单。是与知识相处的新方式。',
    organizeTitle: '自动整理',
    organizeDesc: '放进 sources/，AI 读全文、提取实体、构建页面。无需文件夹，无需标签。',
    organizeTag: '零设置',
    bidirectionalTitle: '活的链接',
    bidirectionalDesc: '每个页面编织进 Obsidian 图谱。打开图谱视图——看它随每次摄入生长。',
    bidirectionalTag: '已连接',
    conversationalTitle: '自然对话',
    conversationalDesc: '自然语言提问。你的 Wiki 会带引用回答，不搜网络。',
    conversationalTag: '对话',
    autoMaintenanceTitle: '自我照料',
    autoMaintenanceDesc: '文件监控摄入新内容。定期检查矛盾。启动时健康检查。全部可选。',
    autoMaintenanceTag: '按需',
  },
  install: {
    label: '快速开始',
    title: '几分钟搞定',
    subtitle: '只需 Obsidian。无其他依赖。',
    step1Title: '下载',
    step1Desc: 'GitHub 三个文件：<em>main.js</em>、<em>manifest.json</em>、<em>styles.css</em>。这就够了。',
    obsidianRequired: '需要先有 Obsidian',
    downloadPlugin: '下载插件',
    downloadObsidian: '下载 Obsidian',
    pluginHint: '必须先安装 Obsidian',
    step2Title: '安装',
    step2Desc: 'Obsidian → 设置 → 第三方插件。点<em><i>folder</i> 图标</em>，建 <em>llm-wiki</em> 文件夹，放文件。点<em><i>refresh-cw</i> 图标</em>，启用。',
    step3Title: '配置',
    step3Desc: '设置 → <em>Karpathy LLM Wiki</em>。选你的 LLM，填密钥，测试，保存。',
    step4Title: '使用',
    step4Desc: '<em>Cmd+P</em>（Windows <em>Ctrl+P</em>）。输 <em>Ingest</em> 加来源。输 <em>Query</em> 提问。',
    cta: '下载最新版',
  },
  providers: {
    label: '开源',
    title: '开放构建',
    subtitle: 'MIT 协议。社区驱动。无厂商锁定。完全属于你。',
    openSourceTitle: '开源',
    openSourceDesc: 'MIT 许可证。完整源码在 GitHub。Fork、扩展、自由定制。',
    communityTitle: '社区',
    communityDesc: 'GitHub Discussions 交流想法。欢迎贡献代码。',
    vendorTitle: '自由选择',
    vendorDesc: '你的 LLM，你决定。云端或本地，随时切换。',
    obsidianTitle: '纯粹 Obsidian',
    obsidianDesc: '无需额外应用。完全活在你的 vault 里。',
    cardLabel: '你的 LLM，你选择',
    cardSubtitle: '适配所有提供商。无锁定。',
    contextNote: '推荐 256K+ 上下文。完整 Wiki 一次装入，LLM 看到全貌。',
    bestValue: '性价比首选',
  },
  ecosystem: {
    label: '生态',
    title: '每个插件更强',
    subtitle: '不是孤岛。让你喜爱的每个工具发挥更大价值。',
    items: [
      {
        name: '图谱视图',
        standalone: '可视化链接',
        amplified: 'Wiki 让图谱有意义——核心页面、聚类、孤立笔记。图谱从装饰变成探索。',
      },
      {
        name: 'Web Clipper',
        standalone: '剪藏文章',
        amplified: '放进 sources/，AI 提取、链接、更新索引。一次剪藏 → 10+ Wiki 页面。',
      },
      {
        name: 'Dataview',
        standalone: '查询元数据',
        amplified: 'AI 添加结构——标签、日期、分类。空表格变动态仪表盘。',
      },
      {
        name: 'Git',
        standalone: '版本控制',
        amplified: '见证知识如何演变。每次提交都在讲理解如何生长。',
      },
      {
        name: 'Marp',
        standalone: '制作幻灯片',
        amplified: '演示只需一句："为 10 分钟演讲总结研究。" Wiki 从你懂的内容生成幻灯片。',
      },
      {
        name: 'Canvas',
        standalone: '可视化画布',
        amplified: 'AI 从知识图谱生成概念图、时间线、决策树——不再是空白。',
      },
    ],
    cta: '这只是开始。知识有了结构后，Obsidian 每个插件都更强。',
  },
  footer: {
    license: 'MIT 许可证',
    github: 'GitHub',
    discussions: '反馈意见',
    releases: '版本',
    obsidian: 'Obsidian',
  },
  cta: {
    title: '开始构建你的 Wiki',
    subtitle: 'MIT 开源，社区驱动。只需 Obsidian。',
    button: 'GitHub 获取',
  },
};