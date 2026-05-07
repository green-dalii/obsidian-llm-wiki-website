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
    badge: 'Based on Andrej Karpathy\'s LLM Wiki concept',
    title1: 'Your notes.',
    title2: 'A living wiki.',
    subtitle: 'Take notes in Obsidian. The plugin reads, extracts, and weaves them into a self-maintaining knowledge network. Every note you write makes the wiki grow richer.',
    ctaInstall: 'Get the Plugin',
    ctaObsidian: 'Install Obsidian',
    obsidianHint: 'Required: Obsidian must be installed first to use this plugin.',
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
    step1Title: 'Drop a source note',
    step1Desc: 'Write or clip anything into sources/. Articles, papers, book notes — the plugin reads them all as read-only input.',
    step2Title: 'Extract entities & concepts',
    step2Desc: 'It reads the full context (not chunks), identifies people, organizations, and key themes from your note.',
    step3Title: 'Generate wiki pages',
    step3Desc: 'Each entity and concept gets a dedicated page with structured content, definitions, and metadata.',
    step4Title: 'Weave bidirectional links',
    step4Desc: 'Every page cross-references related pages. Open Graph View to see your knowledge map grow.',
    step5Title: 'Ask your knowledge',
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
    title: 'Fade away, or compound?',
    subtitle: 'What changes when LLM-Wiki enters your workflow.',
    beforeLabel: 'Without LLM Wiki for Obsidian',
    afterLabel: 'With LLM Wiki for Obsidian',
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
    bidirectionalDesc: 'Every generated page is woven with bidirectional links into your Obsidian graph. Open Graph View and watch your knowledge map grow organically with each new source.',
    bidirectionalTag: 'wiki-links',
    conversationalTitle: 'Conversational Query',
    conversationalDesc: 'Ask questions about your knowledge in natural language. The plugin reads your wiki pages (not the internet), synthesizes cited answers with wiki-links, and can save responses back as new wiki pages.',
    conversationalTag: 'Chat',
    autoMaintenanceTitle: 'Auto Maintenance',
    autoMaintenanceDesc: 'File watcher for automatic ingestion. Periodic lint detects contradictions, stale info, and orphaned pages. Startup health check keeps your wiki consistent — all default OFF to avoid surprise costs.',
    autoMaintenanceTag: 'Always on',
  },
  install: {
    label: 'Get Started',
    title: 'Up and running in minutes',
    subtitle: 'No extra apps. Runs inside your existing Obsidian vault.',
    step1Title: 'Download',
    step1Desc: 'Grab <em>main.js</em>, <em>manifest.json</em>, and <em>styles.css</em> from GitHub Releases. These three files are all you need.',
    obsidianRequired: 'If you haven\'t installed Obsidian yet, download it first.',
    downloadPlugin: 'Download Plugin',
    downloadObsidian: 'Download Obsidian',
    pluginHint: 'Obsidian must be installed first to use this plugin.',
    step2Title: 'Install',
    step2Desc: 'Open <em>Obsidian</em> → <em>Settings</em> → <em>Community plugins</em>. Click the <em><i>folder</i> icon</em> to open your plugins directory. Create a new folder called <em>llm-wiki</em>, drop the three files in, then click the <em><i>refresh-cw</i> icon</em> in Obsidian. Enable the plugin when it appears.',
    step3Title: 'Configure',
    step3Desc: 'Go to Settings → <em>Karpathy LLM Wiki</em>. Pick a provider (DeepSeek, Claude, Gemini, GPT, Ollama, etc.), enter your API key, click <em>Fetch Models</em>, then <em>Test Connection</em> and Save.',
    step4Title: 'Use',
    step4Desc: 'Press <em>Cmd+P</em> (or <em>Ctrl+P</em> on Windows) to open the command palette. Type <em>Ingest</em> to find Ingest Sources or Ingest from Folder. Type <em>Query</em> to ask questions about your knowledge. The plugin handles the rest.',
    cta: 'Download Latest',
  },
  providers: {
    label: 'Open Source',
    title: 'Built in the open',
    subtitle: 'MIT licensed, community driven, vendor neutral. Use it, extend it, make it yours.',
    openSourceTitle: 'Open Source',
    openSourceDesc: 'MIT licensed. Full source on GitHub. Fork it, extend it, make it yours.',
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
    subtitle: 'LLM Wiki for Obsidian is not an island. It makes every tool you already use more powerful.',
    items: [
      {
        name: 'Graph View',
        standalone: 'Visualize links between notes',
        amplified: 'Wiki gives your graph real meaning — hub pages, knowledge clusters, orphan detection. Graph becomes navigation, not decoration.',
      },
      {
        name: 'Web Clipper',
        standalone: 'Clip articles as Markdown',
        amplified: 'Drop into sources/, AI auto-extracts, links, updates index. One clip → 10+ wiki pages.',
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
    obsidian: 'Obsidian',
  },
  cta: {
    title: 'Ready to build your knowledge wiki?',
    subtitle: 'MIT licensed, community driven. Runs entirely inside your Obsidian vault.',
    button: 'Get the Plugin on GitHub',
  },
};

export const zh: Translations = {
  nav: {
    howItWorks: '工作原理',
    comparison: '为何重要',
    features: '功能',
    providers: '开源',
    ecosystem: '生态',
    install: '安装',
    download: '下载',
  },
  hero: {
    badge: '基于 Andrej Karpathy 的 LLM Wiki 理念',
    title1: '你的笔记',
    title2: '一座活的 Wiki',
    subtitle: '在 Obsidian 中记录想法，插件自动阅读、提取关键概念，编织成一张交叉引用的自维护知识网络。每一次记录，都在让这座 Wiki 生长。',
    ctaInstall: '获取插件',
    ctaObsidian: '安装 Obsidian',
    obsidianHint: '使用本插件需先安装 Obsidian',
    ctaRead: '阅读原始理念',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: '向下滚动',
  },
  wikiDemo: {
    label: '工作原理',
    title: '来看看，你的笔记如何编织成 Wiki',
    subtitle: '一条原始笔记，如何变成全连接的知识网络。',
    step1Title: '放入源笔记',
    step1Desc: '文章、论文、读书笔记——放进 sources/ 即可。插件以只读方式读取全文内容。',
    step2Title: '提取实体与概念',
    step2Desc: '读取完整上下文（而非片段），自动识别人物、组织和关键主题。',
    step3Title: '生成 Wiki 页面',
    step3Desc: '每个实体和概念都会拥有专属页面，内置结构化内容、定义与元数据。',
    step4Title: '建立双向链接',
    step4Desc: '页面之间自动交叉引用。打开图谱视图，看知识地图随每次摄入而延伸。',
    step5Title: '向知识提问',
    step5Desc: '用自然语言提问。插件读取 Wiki 页面，综合出带引用的答案，还能保存为新页面。',
    next: '下一步',
    prev: '上一步',
    restart: '重新开始',
    sourceNote: '源笔记',
    extracted: '已提取',
    generated: '已生成',
    linked: '已关联',
    ask: '提问',
    answer: '回答',
  },
  comparison: {
    label: '为何重要',
    title: '尘封遗忘，还是形成复利？',
    subtitle: 'LLM Wiki for Obsidian 加入工作流后的改变。',
    beforeLabel: '没有 LLM Wiki for Obsidian',
    afterLabel: '使用 LLM Wiki for Obsidian',
    items: [
      {
        category: '知识保存',
        before: '剪藏一篇文章丢进文件夹，转头忘了文件名。三个月后想找回来，搜索全是无效结果。',
        after: '放进 sources/，插件自动阅读、提取关键概念，更新 10-15 个相关页面并归档摘要。几秒完成。',
      },
      {
        category: '知识连接',
        before: '手动链接了两条笔记。半年后更新了其中一条，另一条还指向旧版本。链接悄然失效。',
        after: '所有交叉引用自动维护。当新信息与旧内容矛盾时，每条相关页面都会同步更新。',
      },
      {
        category: '知识复利',
        before: '记了一年的笔记，最后还是一堆文件。每个新项目都从零开始，反复读同样的材料，得出同样的结论。',
        after: '一年积累下来，一部密集的交叉引用 Wiki 自然成型。每个新问题都能调用你读过的全部内容，知识持续增值。',
      },
    ],
  },
  features: {
    label: '功能',
    title: '用后会怎样',
    subtitle: '这不是功能清单。而是一组改变你与知识相处方式的行为。',
    organizeTitle: '自动整理',
    organizeDesc: '文章、论文、笔记——放进 sources/ 即可。插件读取全文，提取实体与概念，自动生成结构化的 Wiki 页面。无需手动分类，无需管理文件夹。',
    organizeTag: '零配置',
    bidirectionalTitle: '双向链接',
    bidirectionalDesc: '每个页面通过双向链接融入 Obsidian 图谱。打开图谱视图，知识地图随每次新摄入而自然延伸。',
    bidirectionalTag: 'wiki-links',
    conversationalTitle: '对话问答',
    conversationalDesc: '用自然语言向知识库提问。插件读取 Wiki 页面（而非搜索互联网），综合出带 wiki-links 引用的答案，还能保存为新页面。',
    conversationalTag: '对话',
    autoMaintenanceTitle: '自动维护',
    autoMaintenanceDesc: '文件监控自动摄入新内容。定期检测矛盾、过时信息与孤立页面。启动时自动健康检查——全部默认关闭，无需担心意外费用。',
    autoMaintenanceTag: '持续运行',
  },
  install: {
    label: '快速开始',
    title: '几分钟就能上手',
    subtitle: '无需额外软件，直接在你的 Obsidian Vault 中运行。',
    step1Title: '下载',
    step1Desc: '从 GitHub Releases 下载 <em>main.js</em>、<em>manifest.json</em> 和 <em>styles.css</em>。三个文件，仅此而已。',
    obsidianRequired: '如果尚未安装 Obsidian，请先下载安装。',
    downloadPlugin: '下载插件',
    downloadObsidian: '下载 Obsidian',
    pluginHint: '使用本插件需先安装 Obsidian',
    step2Title: '安装',
    step2Desc: '打开 <em>Obsidian</em> → <em>设置</em> → <em>第三方插件</em>。点击<em><i>folder</i> 图标</em>打开插件目录，新建一个 <em>llm-wiki</em> 文件夹，放入三个文件。回到 Obsidian 点击<em><i>refresh-cw</i> 图标</em>，看到插件后启用即可。',
    step3Title: '配置',
    step3Desc: '进入设置 → <em>Karpathy LLM Wiki</em>。选择提供商（DeepSeek、Claude、Gemini、GPT、Ollama 等），填入 API Key，点击<em>获取模型</em>，然后<em>测试连接</em>并保存。',
    step4Title: '使用',
    step4Desc: '按 <em>Cmd+P</em>（Windows 按 <em>Ctrl+P</em>）打开命令面板。输入 <em>Ingest</em> 可找到"摄入源笔记"或"从文件夹摄入"，输入 <em>Query</em> 可向知识库提问。其余交给插件。',
    cta: '下载最新版',
  },
  providers: {
    label: '开源共建',
    title: '开源、开放、共建',
    subtitle: 'MIT 协议，社区驱动，不绑定任何厂商。自由使用、自由扩展、自由定制。',
    openSourceTitle: '开源',
    openSourceDesc: 'MIT 许可证，完整代码在 GitHub。可 Fork、可扩展、可二次开发。',
    communityTitle: '社区',
    communityDesc: 'GitHub Discussions 交流想法与问题。欢迎提交 PR 共建。',
    vendorTitle: '自由接入',
    vendorDesc: '你的 LLM，你做主。云端或本地，随时切换。',
    obsidianTitle: '原生 Obsidian',
    obsidianDesc: '无需安装额外软件，直接在 Vault 内运行。',
    cardLabel: '你的 LLM，你做主',
    cardSubtitle: '主流提供商全支持——无厂商锁定。',
    contextNote: '推荐 256K+ 上下文窗口——完整 Wiki 可一次装入，LLM 一览全貌。',
    bestValue: '最佳性价比',
  },
  ecosystem: {
    label: '生态',
    title: '每个插件，都因结构化知识而更强',
    subtitle: 'LLM Wiki for Obsidian 不是孤岛。它让你已有的每一个工具，都发挥出更大价值。',
    items: [
      {
        name: '图谱视图',
        standalone: '可视化笔记之间的链接',
        amplified: 'Wiki 让图谱有了真正的意义——核心页面、知识聚类、孤立笔记发现。图谱从装饰变成导航。',
      },
      {
        name: 'Web Clipper',
        standalone: '剪藏文章为 Markdown',
        amplified: '放进 sources/，AI 自动提取、链接、更新索引。一次剪藏 → 10+ Wiki 页面。',
      },
      {
        name: 'Dataview',
        standalone: '查询笔记 frontmatter 生成表格',
        amplified: 'AI 自动添加结构化元数据——标签、日期、分类。Dataview 从空表格变成动态仪表盘。',
      },
      {
        name: 'Git',
        standalone: '文件的版本控制',
        amplified: '见证你的知识如何演变。每一次提交，都在记录理解的生长轨迹。',
      },
      {
        name: 'Marp',
        standalone: '生成幻灯片',
        amplified: '一场演示只需一句查询："为 10 分钟演讲总结我的研究。" Wiki 直接从知识库生成幻灯片。',
      },
      {
        name: 'Canvas',
        standalone: '无限画布',
        amplified: 'AI 从你的知识图谱生成概念地图、时间线、决策树——不再面对空白画布。',
      },
    ],
    cta: '这只是开始。知识一旦结构化，Obsidian 的每个插件都会变得更强。',
  },
  footer: {
    license: 'MIT 许可证',
    github: 'GitHub',
    discussions: '讨论区',
    releases: '版本发布',
    obsidian: 'Obsidian',
  },
  cta: {
    title: '准备好构建你的知识 Wiki 了吗？',
    subtitle: 'MIT 开源，社区驱动。在你的 Obsidian 中直接运行。',
    button: '前往 GitHub 获取插件',
  },
};
