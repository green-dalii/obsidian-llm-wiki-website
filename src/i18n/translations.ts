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
    emailUser: string;
    emailDomain: string;
    emailLabel: string;
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
    subtitle: 'Write in Obsidian. Every note connects to a network that keeps growing.',
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
    subtitle: 'One note. A world of connections.',
    step1Title: 'Drop it in',
    step1Desc: 'Articles, papers, ideas. Place them in sources/. The plugin reads every word.',
    step2Title: 'See what matters',
    step2Desc: 'People, places, themes. AI reads the full picture and surfaces what matters.',
    step3Title: 'Pages appear',
    step3Desc: 'Each concept gets its own space. Content, meaning, connections — all ready for you.',
    step4Title: 'Watch it connect',
    step4Desc: 'Pages link to each other. Open Graph View and see your knowledge take shape.',
    step5Title: 'Just ask',
    step5Desc: 'Ask naturally. Your wiki answers with sources you can verify — and save as new pages.',
    next: 'Next',
    prev: 'Previous',
    restart: 'Restart',
    sourceNote: 'Source',
    extracted: 'Found',
    generated: 'Created',
    linked: 'Connected',
    ask: 'Ask',
    answer: 'Answer',
  },
  comparison: {
    label: 'Why It Matters',
    title: 'Nothing you read should go to waste.',
    subtitle: 'Lose it, or grow it?',
    beforeLabel: 'Before',
    afterLabel: 'After',
    items: [
      {
        category: 'Saving',
        before: 'Save an article. Forget where. Search later. Nothing.',
        after: 'Drop it in sources/. Ideas found, pages built, summary ready. In seconds.',
      },
      {
        category: 'Connecting',
        before: 'Link two notes by hand. One changes. The other stays old. The link dies.',
        after: 'Links stay alive. When new information contradicts the old, every related page stays current.',
      },
      {
        category: 'Growing',
        before: 'A year of notes. Just files. Every project starts over. Same reading. Same conclusions.',
        after: 'A year builds a wiki. Every new question draws on everything you\'ve collected. Your knowledge grows.',
      },
    ],
  },
  features: {
    label: 'Features',
    title: 'What changes',
    subtitle: 'Not features. A new relationship with everything you read.',
    organizeTitle: 'It just happens',
    organizeDesc: 'Drop it in sources/. AI reads, extracts, builds. No folders. No tags. No work.',
    organizeTag: 'Zero effort',
    bidirectionalTitle: 'Living links',
    bidirectionalDesc: 'Every page joins your Obsidian graph. Open Graph View — and watch your knowledge grow.',
    bidirectionalTag: 'Connected',
    conversationalTitle: 'Just talk',
    conversationalDesc: 'Ask like you would a friend. Your wiki answers with sources you can see and trust.',
    conversationalTag: 'Natural',
    autoMaintenanceTitle: 'Stays current',
    autoMaintenanceDesc: 'New files? Auto-ingested. Contradictions? Found. Health? Checked. On your terms.',
    autoMaintenanceTag: 'On your terms',
  },
  install: {
    label: 'Get Started',
    title: 'Ready in minutes',
    subtitle: 'Obsidian is all you need.',
    step1Title: 'Download',
    step1Desc: 'Three files from GitHub: <em>main.js</em>, <em>manifest.json</em>, <em>styles.css</em>. That\'s it.',
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
    subtitle: 'Open source. Your data stays yours.',
    openSourceTitle: 'Open Source',
    openSourceDesc: 'MIT license. Full source on GitHub. Fork it, extend it, make it yours.',
    communityTitle: 'Community',
    communityDesc: 'GitHub Discussions for ideas and help. Contributions welcome.',
    vendorTitle: 'Privacy First',
    vendorDesc: 'No storage. No backend. No data collection. Your notes stay in your Obsidian—only sent to your LLM during ingest or query. Local models keep everything offline.',
    obsidianTitle: 'Pure Obsidian',
    obsidianDesc: 'No extra apps. Lives entirely in your Obsidian.',
    cardLabel: 'Your LLM, your choice',
    cardSubtitle: 'Works with any provider. No lock-in.',
    contextNote: 'Long-context models (256K+) recommended. Your whole wiki in one call, complete understanding.',
    bestValue: 'Best value',
  },
  ecosystem: {
    label: 'Ecosystem',
    title: 'Every plugin, amplified',
    subtitle: 'Not an island. Every tool you love, now better.',
    items: [
      {
        name: 'Graph View',
        standalone: 'See links',
        amplified: 'Wiki gives your graph meaning. Hub pages, clusters, orphans. Exploration, not decoration.',
      },
      {
        name: 'Web Clipper',
        standalone: 'Save articles',
        amplified: 'Drop in sources/. AI extracts, links, updates. One clip becomes 10+ wiki pages.',
      },
      {
        name: 'Dataview',
        standalone: 'Query data',
        amplified: 'AI adds structure. Tags, dates, categories. Empty tables become living dashboards.',
      },
      {
        name: 'Git',
        standalone: 'Track versions',
        amplified: 'Watch your knowledge evolve. Every commit tells the story of how you grew.',
      },
      {
        name: 'Marp',
        standalone: 'Make slides',
        amplified: 'Ask: "Summarize my research for a 10-minute talk." Wiki builds slides from your knowledge.',
      },
      {
        name: 'Canvas',
        standalone: 'Visual canvas',
        amplified: 'AI builds concept maps, timelines, decision trees from your knowledge. No more blank canvas.',
      },
    ],
    cta: 'Just the beginning. When your knowledge has structure, every plugin becomes more powerful.',
  },
  footer: {
    emailUser: 'hi',
    emailDomain: 'greenerai.top',
    emailLabel: 'Contact:',
    github: 'GitHub',
    discussions: 'Feedback',
    releases: 'Releases',
    obsidian: 'Obsidian',
  },
  cta: {
    title: 'Ready to build your wiki?',
    subtitle: 'Open source. Community driven. Just Obsidian.',
    button: 'Get it on GitHub',
  },
};

export const zh: Translations = {
  nav: {
    howItWorks: '怎么运作',
    comparison: '为何重要',
    features: '亮点',
    providers: '开源',
    ecosystem: '生态',
    install: '快速开始',
    download: '下载',
  },
  hero: {
    badge: 'Andrej Karpathy 的 LLM Wiki 理念',
    title1: '你的笔记。',
    title2: '一部活的 Wiki。',
    subtitle: '在 Obsidian 随手记录。笔记彼此相连，知识网络自然生长。',
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
    label: '怎么运作',
    title: '笔记变 Wiki',
    subtitle: '一条笔记，万千连接。',
    step1Title: '随手放入',
    step1Desc: '文章、论文、灵感。放进 sources/，插件会通读全文。',
    step2Title: '看见重点',
    step2Desc: '人物、地点、主题。AI 理解上下文，挑出关键信息。',
    step3Title: '页面自成',
    step3Desc: '每个概念都有自己的空间。内容、含义、连接——全都为你准备好。',
    step4Title: '看见生长',
    step4Desc: '页面彼此相连。打开图谱视图，看知识网络慢慢成形。',
    step5Title: '开口即问',
    step5Desc: '像问朋友一样提问。Wiki 给出有据可查的答案，还能存为新页面。',
    next: '下一步',
    prev: '上一步',
    restart: '重播',
    sourceNote: '来源',
    extracted: '已发现',
    generated: '已创建',
    linked: '已连接',
    ask: '提问',
    answer: '回答',
  },
  comparison: {
    label: '为何重要',
    title: '你读过的每一篇，都不该白读。',
    subtitle: '任其散落，还是日渐丰盈？',
    beforeLabel: '之前',
    afterLabel: '之后',
    items: [
      {
        category: '保存',
        before: '收藏一篇文章。忘了在哪。回头搜索。一无所获。',
        after: '放进 sources/。要点提炼了，页面生成了，摘要备好了。转眼就好。',
      },
      {
        category: '连接',
        before: '手动链接笔记。改了其中一条，另一条还停在旧信息。链接断了。',
        after: '链接始终鲜活。新信息与旧笔记矛盾时，相关页面自动更新。',
      },
      {
        category: '生长',
        before: '记了一年，还是一堆文件。每个项目从零开始。反复阅读，原地打转。',
        after: '一年积累成一部 Wiki。每个新问题，都能调用你积累的全部知识找到答案。知识在生长。',
      },
    ],
  },
  features: {
    label: '亮点',
    title: '真正的改变',
    subtitle: '不是功能清单。是你与知识相处方式的改变。',
    organizeTitle: '水到渠成',
    organizeDesc: '放进 sources/，AI 阅读、提炼、构建。无需文件夹，无需标签，无需动手。',
    organizeTag: '毫不费力',
    bidirectionalTitle: '活的链接',
    bidirectionalDesc: '每一页都融入 Obsidian 图谱。打开视图——看知识网络自然延展。',
    bidirectionalTag: '已连接',
    conversationalTitle: '开口即聊',
    conversationalDesc: '像和朋友聊天一样提问。Wiki 会给出有据可查的答案。',
    conversationalTag: '自然',
    autoMaintenanceTitle: '保持更新',
    autoMaintenanceDesc: '新文件？自动收录。有矛盾？自动发现。要检查？按需开启。',
    autoMaintenanceTag: '随你',
  },
  install: {
    label: '快速开始',
    title: '几分钟就好',
    subtitle: '只需 Obsidian，别无他求。',
    step1Title: '下载',
    step1Desc: 'GitHub 三个文件：<em>main.js</em>、<em>manifest.json</em>、<em>styles.css</em>。仅此而已。',
    obsidianRequired: '需要先有 Obsidian',
    downloadPlugin: '下载插件',
    downloadObsidian: '下载 Obsidian',
    pluginHint: '必须先安装 Obsidian',
    step2Title: '安装',
    step2Desc: 'Obsidian → 设置 → 第三方插件。点<em><i>folder</i> 图标</em>，建 <em>llm-wiki</em> 文件夹，放文件。点<em><i>refresh-cw</i> 图标</em>，启用。',
    step3Title: '配置',
    step3Desc: '设置 → <em>Karpathy LLM Wiki</em>。选你的 LLM，填密钥，测试，保存。',
    step4Title: '使用',
    step4Desc: '<em>Cmd+P</em>（Windows <em>Ctrl+P</em>）。输 <em>Ingest</em> 添加来源。输 <em>Query</em> 提问。',
    cta: '下载最新版',
  },
  providers: {
    label: '开源',
    title: '开放构建',
    subtitle: '代码开源。你的数据，始终归你。',
    openSourceTitle: '开源',
    openSourceDesc: 'MIT 许可证。完整源码在 GitHub。Fork、扩展、自由定制。',
    communityTitle: '社区',
    communityDesc: 'GitHub Discussions 交流想法。欢迎贡献代码。',
    vendorTitle: '隐私优先',
    vendorDesc: '零存储、无后端、不收集。笔记留在 Obsidian，仅处理时发送至你的 LLM。使用本地模型可完全离线。',
    obsidianTitle: '纯粹 Obsidian',
    obsidianDesc: '无需额外应用。一切只在你的 Obsidian 里。',
    cardLabel: '你的 LLM，你的选择',
    cardSubtitle: '适配所有提供商。无锁定。',
    contextNote: '推荐 256K+ 上下文。完整 Wiki 一次装入，LLM 一览全貌。',
    bestValue: '性价比首选',
  },
  ecosystem: {
    label: '生态',
    title: '每个插件，都更强',
    subtitle: '不是孤岛。让你喜爱的每个工具，更加出色。',
    items: [
      {
        name: '图谱视图',
        standalone: '看见链接',
        amplified: 'Wiki 赋予图谱意义。核心页面、知识聚类、孤立笔记。从装饰变成探索。',
      },
      {
        name: 'Web Clipper',
        standalone: '收藏文章',
        amplified: '放进 sources/，AI 提炼、链接、更新。一次收藏，生成 10+ Wiki 页面。',
      },
      {
        name: 'Dataview',
        standalone: '查询数据',
        amplified: 'AI 添加结构——标签、日期、分类。空表格化作动态仪表盘。',
      },
      {
        name: 'Git',
        standalone: '版本记录',
        amplified: '见证知识如何演变。每次提交都在讲述你成长的轨迹。',
      },
      {
        name: 'Marp',
        standalone: '制作幻灯片',
        amplified: '一句请求："为 10 分钟演讲总结我的研究。" Wiki 根据你的知识直接生成幻灯片。',
      },
      {
        name: 'Canvas',
        standalone: '可视化画布',
        amplified: 'AI 从知识图谱构建概念图、时间线、决策树。不再面对空白画布。',
      },
    ],
    cta: '这只是开始。当知识有了结构，Obsidian 的每个插件都会更加强大。',
  },
  footer: {
    emailUser: 'hi',
    emailDomain: 'greenerai.top',
    emailLabel: '联系作者：',
    github: 'GitHub',
    discussions: '反馈意见',
    releases: '版本',
    obsidian: 'Obsidian',
  },
  cta: {
    title: '开始构建你的 Wiki',
    subtitle: '开源。社区驱动。只需 Obsidian。',
    button: 'GitHub 获取',
  },
};