export interface Translations {
  nav: {
    howItWorks: string;
    comparison: string;
    features: string;
    ecosystem: string;
    providers: string;
    install: string;
    download: string;
    faq: string;
    blog: string;
    home: string;
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
    smartFixTitle: string;
    smartFixDesc: string;
    smartFixTag: string;
    granularityTitle: string;
    granularityDesc: string;
    granularityTag: string;
    moreCapabilities: string[];
    moreLabel: string;
  };
  install: {
    label: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    pluginPageButton: string;
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
  faq: {
    label: string;
    title: string;
    subtitle: string;
    items: Array<{ q: string; a: string }>;
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
    download: 'Add to Obsidian',
    faq: 'FAQ',
    blog: 'Blog',
    home: 'Home',
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
    smartFixTitle: 'One click fixes everything',
    smartFixDesc: 'Causality-ordered batch fix: aliases → duplicates → dead links → orphans → empty pages. Five phases run in sequence with parallel processing.',
    smartFixTag: 'Smart Fix All',
    granularityTitle: 'Fine to coarse. You decide.',
    granularityDesc: 'Control extraction depth per source. Standard for daily use, Fine for research, Coarse for quick overviews.',
    granularityTag: 'Granularity',
        moreLabel: 'And more:',
    moreCapabilities: ['8-Language Wiki Output', 'Duplicate Detection & Merge', 'Page Aliases', 'Parallel Generation', 'Contradiction Detection', '5xx Auto-Retry', 'Smart Batch Skip'],
  },
  install: {
    label: 'Get Started',
    title: 'Ready in minutes',
    subtitle: 'Obsidian is all you need.',
    step1Title: 'Install',
    step1Desc: 'In Obsidian: Settings → Community plugins → Browse, search <em>Karpathy LLM Wiki</em>, click <em>Install</em> then <em>Enable</em>.',
    step2Title: 'Configure',
    step2Desc: 'Settings → <em>Karpathy LLM Wiki</em>. Pick your LLM, enter key, test, save.',
    step3Title: 'Use',
    step3Desc: '<em>Cmd+P</em> (or <em>Ctrl+P</em>). Type <em>Ingest</em> to add sources. Type <em>Query</em> to ask.',
    pluginPageButton: 'Open Plugin Page',
    cta: 'Get it on Obsidian',
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
    button: 'Add to Obsidian',
  },
  faq: {
    label: 'FAQ',
    title: 'Common questions',
    subtitle: 'Everything you need to know to get started.',
    items: [
      { q: 'What does this plugin actually do?', a: 'Drop any note into your Obsidian vault. The AI extracts people, concepts, and theories, then auto-generates interlinked wiki pages with bidirectional links. Ask <em>"what did I write about X?"</em> — the answer comes from your own notes, not the internet.' },
      { q: 'What are the minimum requirements?', a: 'Obsidian v1.6.6+ (desktop: Windows, macOS, Linux) and an LLM provider API key. Supported: DeepSeek, Gemini, Claude, GPT, Kimi, GLM, OpenRouter, or custom. No API key needed for Ollama (local models).' },
      { q: 'Which model should I choose? How much will it cost?', a: 'Long-context models (1M tokens) recommended — they process your entire wiki in one pass. A single ingest costs <em>$0.05–$0.50</em>. All costs go to the LLM provider; the plugin itself is <em>free and open source</em>.' },
      { q: 'Can I use local models via Ollama?', a: 'Yes. Install <em>Ollama</em>, pull a model (e.g. <em>qwen3.5</em>), select <em>Ollama (Local)</em>. No API key needed. Cloud providers recommended for ingestion (larger context); local models work well for query.' },
      { q: 'How do I get help or report bugs?', a: 'Use <em>GitHub Issues</em> for bug reports, <em>GitHub Discussions</em> for questions. Also find the plugin on the <em>Obsidian Community Plugin</em> page and leave a review.' },
    ],
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
    download: '添加到 Obsidian',
    faq: 'FAQ',
    blog: '博客',
    home: '首页',
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
    smartFixTitle: '一键修复一切',
    smartFixDesc: '因果链式批量修复：别名→重复→死链→孤立→空页。五个阶段按序运行，并行处理。',
    smartFixTag: '智能修复',
    granularityTitle: '粗细由你决定',
    granularityDesc: '控制每个来源的提取深度。日常用标准，研究用精细，概览用粗略。',
    granularityTag: '粒度控制',
        moreLabel: '更多能力：',
    moreCapabilities: ['8 语言 Wiki 输出', '重复检测与合并', '页面别名', '并行生成', '矛盾检测', '5xx 自动重试', '智能批量跳过'],
  },
  install: {
    label: '快速开始',
    title: '几分钟就好',
    subtitle: '只需 Obsidian，别无他求。',
    step1Title: '安装',
    step1Desc: '在 Obsidian 中：设置 → 第三方插件 → 浏览，搜索 <em>Karpathy LLM Wiki</em>，点击 <em>安装</em> 再 <em>启用</em>。',
    step2Title: '配置',
    step2Desc: '设置 → <em>Karpathy LLM Wiki</em>。选你的 LLM，填密钥，测试，保存。',
    step3Title: '使用',
    step3Desc: '<em>Cmd+P</em>（Windows <em>Ctrl+P</em>）。输 <em>Ingest</em> 添加来源。输 <em>Query</em> 提问。',
    pluginPageButton: '打开插件页面',
    cta: 'Obsidian 获取',
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
    button: '添加到 Obsidian',
  },
  faq: {
    label: '常见问题',
    title: '你可能想了解的',
    subtitle: '上手前你需要知道的一切。',
        items: [
      { q: '这个插件到底是做什么的？', a: '把任何笔记丢进 Obsidian 知识库。AI 自动提取人物、概念和理论，生成互联的 Wiki 页面和双向链接。问 <em>"我写过关于 X 的什么？"</em>——答案来自你自己的笔记，而非互联网。' },
      { q: '最低要求是什么？', a: 'Obsidian v1.6.6+（桌面：Windows、macOS、Linux）以及 LLM 提供商 API 密钥。支持：DeepSeek、Gemini、Claude、GPT、Kimi、GLM、OpenRouter、自定义。Ollama 本地模型无需 API 密钥。' },
      { q: '应该选哪个模型？要花多少钱？', a: '强烈推荐长上下文模型（1M tokens）——它们能一次处理整个 Wiki。单次摄入通常花费 <em>$0.05–$0.50</em>。所有费用直接付给 LLM 提供商；插件本身 <em>免费且开源</em>。' },
      { q: '能否通过 Ollama 使用本地模型？', a: '可以。安装 <em>Ollama</em>，拉取模型（如 <em>qwen3.5</em>），选择 <em>Ollama（本地）</em>作为提供商，无需 API 密钥。建议云提供商用于摄入（更大的上下文），本地模型适合查询。' },
      { q: '如何获取帮助或报告 Bug？', a: 'Bug 报告使用 <em>GitHub Issues</em>，问题咨询使用 <em>GitHub Discussions</em>。也可以在 <em>Obsidian 社区插件</em>页面找到该插件并留下评价。' },
    ],
  },
};

export const ja: Translations = {
  nav: {
    howItWorks: '仕組み',
    comparison: 'なぜ重要か',
    features: '機能',
    ecosystem: 'エコシステム',
    providers: 'オープンソース',
    install: 'インストール',
    download: 'Obsidianに追加',
    faq: 'FAQ',
    blog: 'ブログ',
    home: 'ホーム',
  },
  hero: {
    badge: 'Andrej KarpathyのLLM Wikiコンセプト',
    title1: 'あなたのノートが、',
    title2: '生きたWikiになる。',
    subtitle: 'Obsidianで書く。すべてのノートが、成長し続けるネットワークへ。',
    ctaInstall: 'プラグインを入手',
    ctaObsidian: 'Obsidianを入手',
    obsidianHint: 'Obsidianが必要です',
    ctaRead: '元のコンセプトを読む',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: 'スクロール',
  },
  wikiDemo: {
    label: '仕組み',
    title: 'ノートからWikiへ',
    subtitle: 'ひとつのノートから、無限のつながりへ。',
    step1Title: 'ファイルを置く',
    step1Desc: '記事、論文、アイデア。sources/に置くだけで、プラグインがすべてを読み取ります。',
    step2Title: '重要なものを見つける',
    step2Desc: '人物、場所、テーマ。AIが全体を把握し、重要な情報を浮かび上がらせます。',
    step3Title: 'ページが生まれる',
    step3Desc: '各概念が独自のページに。内容、意味、つながり — すべて準備完了。',
    step4Title: 'つながりを見守る',
    step4Desc: 'ページ同士がリンク。Graph Viewを開けば、知識の形が見えてきます。',
    step5Title: '質問するだけ',
    step5Desc: '自然に質問。Wikiがソース付きで答え — 新しいページとして保存も。',
    next: '次へ',
    prev: '前へ',
    restart: '最初から',
    sourceNote: 'ソース',
    extracted: '抽出済み',
    generated: '作成済み',
    linked: 'リンク済み',
    ask: '質問',
    answer: '回答',
  },
  comparison: {
    label: 'なぜ重要か',
    title: '読んだものは、すべて活きる。',
    subtitle: '忘れるか、育てるか。',
    beforeLabel: 'Before',
    afterLabel: 'After',
    items: [
      { category: '保存', before: '記事を保存。場所を忘れる。あとで検索。何も出ない。', after: 'sources/にドロップ。アイデアが見つかり、ページが作られ、要約も準備完了。数秒で。' },
      { category: 'つながり', before: '手動でリンク。片方を変更。もう片方は古いまま。リンクは死ぬ。', after: 'リンクは生き続ける。新しい情報が古い情報と矛盾しても、すべての関連ページが最新に保たれる。' },
      { category: '成長', before: '一年分のノート。ただのファイル。プロジェクトは毎回ゼロから。同じ読書。同じ結論。', after: '一年分がWikiに。新しい質問は、すべての蓄積から。知識が育っていく。' },
    ],
  },
  features: {
    label: '機能',
    title: '何が変わるか',
    subtitle: '機能ではない。読んだものすべてとの、新しい関係。',
    organizeTitle: '自動で進む',
    organizeDesc: 'sources/に置くだけ。AIが読み、抽出し、構築。フォルダもタグも不要。作業も不要。',
    organizeTag: '手間なし',
    bidirectionalTitle: '生きたリンク',
    bidirectionalDesc: 'すべてのページがObsidianグラフに参加。Graph Viewを開けば — 知識の成長が見える。',
    bidirectionalTag: 'つながる',
    conversationalTitle: '話しかけるだけ',
    conversationalDesc: '友達に聞くように。Wikiがソース付きで答え、信頼できる情報を届ける。',
    conversationalTag: '自然に',
    autoMaintenanceTitle: '常に最新',
    autoMaintenanceDesc: '新しいファイル？自動取込。矛盾？発見。整合性？確認。すべてあなたの設定で。',
    autoMaintenanceTag: 'あなたのペースで',
    smartFixTitle: 'ワンクリックですべて修復',
    smartFixDesc: '因果順のバッチ修復：エイリアス→重複→リンク切れ→孤立→空ページ。5フェーズを並列処理で実行。',
    smartFixTag: 'スマート修復',
    granularityTitle: '細かさはあなた次第',
    granularityDesc: 'ソースごとの抽出深度を制御。日常は標準、研究は詳細、概要は粗く。',
    granularityTag: '粒度',
        moreLabel: 'さらに：',
    moreCapabilities: ['8言語Wiki出力', '重複検出と統合', 'ページエイリアス', '並列生成', '矛盾検出', '5xx自動リトライ', 'スマートバッチスキップ'],
  },
  install: {
    label: 'はじめに',
    title: '数分で準備完了',
    subtitle: 'ObsidianだけあればOK。',
    step1Title: 'インストール',
    step1Desc: 'Obsidianで：設定 → コミュニティプラグイン → 参照、<em>Karpathy LLM Wiki</em>を検索、<em>インストール</em>→<em>有効化</em>をクリック。',
    step2Title: '設定',
    step2Desc: '設定 → <em>Karpathy LLM Wiki</em>。LLMを選び、キーを入力、テスト、保存。',
    step3Title: '使う',
    step3Desc: '<em>Cmd+P</em>（または<em>Ctrl+P</em>）。<em>Ingest</em>と入力してソースを追加。<em>Query</em>と入力して質問。',
    pluginPageButton: 'プラグインページを開く',
    cta: 'Obsidianで入手',
  },
  providers: {
    label: 'オープンソース',
    title: 'オープンに構築',
    subtitle: 'オープンソース。データはあなたのもの。',
    openSourceTitle: 'オープンソース',
    openSourceDesc: 'MITライセンス。GitHubで完全なソース公開。フォーク、拡張、自分好みに。',
    communityTitle: 'コミュニティ',
    communityDesc: 'GitHub Discussionsでアイデアやヘルプ。貢献を歓迎。',
    vendorTitle: 'プライバシー第一',
    vendorDesc: 'ストレージなし。バックエンドなし。データ収集なし。ノートはあなたのObsidianに — インジェストやクエリ時のみLLMに送信。ローカルモデルなら完全にオフライン。',
    obsidianTitle: 'ピュアObsidian',
    obsidianDesc: '余計なアプリ不要。Obsidianの中だけで完結。',
    cardLabel: 'あなたのLLM、あなたの選択',
    cardSubtitle: 'どのプロバイダーでも動作。ロックインなし。',
    contextNote: 'ロングコンテキストモデル（256K+）推奨。Wiki全体を一度の呼び出しで、完全な理解。',
    bestValue: 'おすすめ',
  },
  ecosystem: {
    label: 'エコシステム',
    title: 'すべてのプラグインが、より強く',
    subtitle: '孤立しない。好きなツールが、もっと便利に。',
    items: [
      { name: 'Graph View', standalone: 'リンクを表示', amplified: 'Wikiがグラフに意味を。ハブページ、クラスター、孤立ページ。装飾ではなく、探索。' },
      { name: 'Web Clipper', standalone: '記事を保存', amplified: 'sources/にドロップ。AIが抽出、リンク、更新。ひとつのクリップが10以上のWikiページに。' },
      { name: 'Dataview', standalone: 'データをクエリ', amplified: 'AIが構造を追加。タグ、日付、カテゴリ。空のテーブルが生きたダッシュボードに。' },
      { name: 'Git', standalone: 'バージョン管理', amplified: '知識の進化を見守る。各コミットが成長の物語を語る。' },
      { name: 'Marp', standalone: 'スライド作成', amplified: '「私の研究を10分のトークに要約して」と質問。Wikiが知識からスライドを構築。' },
      { name: 'Canvas', standalone: 'ビジュアルキャンバス', amplified: 'AIが概念図、タイムライン、決定木を構築。空白のキャンバスはもうない。' },
    ],
    cta: 'まだ始まったばかり。知識に構造ができれば、すべてのプラグインがより強力に。',
  },
  footer: {
    emailUser: 'hi',
    emailDomain: 'greenerai.top',
    emailLabel: 'お問い合わせ：',
    github: 'GitHub',
    discussions: 'フィードバック',
    releases: 'リリース',
    obsidian: 'Obsidian',
  },
  cta: {
    title: 'Wikiを構築する準備はできましたか？',
    subtitle: 'オープンソース。コミュニティ主導。Obsidianだけで。',
    button: 'Obsidianに追加',
  },
  faq: {
    label: 'FAQ',
    title: 'よくある質問',
    subtitle: 'はじめる前に知っておくべきこと。',
        items: [
      { q: 'このプラグインの目的は？', a: 'ノートを Obsidian に置くだけで、AI が人物・概念・理論を抽出し、相互リンクされた Wiki ページを自動生成します。<em>「X について何か書いた？」</em>と質問すれば、インターネットではなく自分のノートから回答を得られます。' },
      { q: '最低要件は？', a: 'Obsidian v1.6.6+（デスクトップ：Windows、macOS、Linux）と LLM プロバイダーの API キーが必要です。対応：DeepSeek、Gemini、Claude、GPT、Kimi、GLM、OpenRouter、カスタム。Ollama（ローカルモデル）は API キー不要。' },
      { q: 'どのモデルを選ぶべき？費用は？', a: '長コンテキストモデル（1M tokens）推奨 — Wiki 全体を1回で処理できます。1回の取り込みは約 <em>$0.05–$0.50</em>。費用はすべて LLM プロバイダーに。プラグイン自体は <em>無料のオープンソース</em>。' },
      { q: 'Ollama でローカルモデルは使える？', a: 'はい。<em>Ollama</em> をインストールし、モデルをプル（例：<em>qwen3.5</em>）、<em>Ollama（ローカル）</em> を選択。API キー不要。クラウドは取り込みに、ローカルはクエリにおすすめ。' },
      { q: 'ヘルプやバグ報告は？', a: 'バグ報告は <em>GitHub Issues</em>、質問は <em>GitHub Discussions</em> へ。<em>Obsidian Community Plugin</em> ページでも見つけられます。' },
    ],
  },
};

export const ko: Translations = {
  nav: {
    howItWorks: '작동 방식',
    comparison: '왜 필요할까',
    features: '기능',
    ecosystem: '생태계',
    providers: '오픈 소스',
    install: '설치',
    download: 'Obsidian에 추가',
    faq: 'FAQ',
    blog: '블로그',
    home: '홈',
  },
  hero: {
    badge: '안드레이 카파시의 LLM Wiki 컨셉',
    title1: '당신의 노트가',
    title2: '살아있는 위키가 됩니다.',
    subtitle: 'Obsidian에서 작성하세요. 모든 노트가 계속 성장하는 네트워크에 연결됩니다.',
    ctaInstall: '플러그인 받기',
    ctaObsidian: 'Obsidian 받기',
    obsidianHint: 'Obsidian 필요',
    ctaRead: '원본 컨셉 읽기',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: '스크롤',
  },
  wikiDemo: {
    label: '작동 방식',
    title: '노트가 위키로',
    subtitle: '하나의 노트, 무한한 연결.',
    step1Title: '넣기만 하세요',
    step1Desc: '글, 논문, 아이디어. sources/에 넣으면 플러그인이 모든 글을 읽습니다.',
    step2Title: '중요한 것을 발견',
    step2Desc: '사람, 장소, 테마. AI가 전체 맥락을 파악하고 중요한 것을 찾아냅니다.',
    step3Title: '페이지가 생성',
    step3Desc: '각 개념이 자신만의 공간을 갖습니다. 내용, 의미, 연결 — 모두 준비되어 있습니다.',
    step4Title: '연결을 지켜보세요',
    step4Desc: '페이지들이 서로 연결됩니다. 그래프 뷰를 열면 지식이 형성되는 것을 볼 수 있습니다.',
    step5Title: '그냥 물어보세요',
    step5Desc: '자연스럽게 질문하세요. 위키가 출처와 함께 답변하고 — 새 페이지로 저장할 수 있습니다.',
    next: '다음',
    prev: '이전',
    restart: '다시 시작',
    sourceNote: '출처',
    extracted: '발견됨',
    generated: '생성됨',
    linked: '연결됨',
    ask: '질문',
    answer: '답변',
  },
  comparison: {
    label: '왜 필요할까',
    title: '읽은 것은 사라지지 않아야 합니다.',
    subtitle: '잃을까요, 키울까요?',
    beforeLabel: '이전',
    afterLabel: '이후',
    items: [
      { category: '저장', before: '글을 저장하고 위치를 잊음. 나중에 검색해도 아무것도.', after: 'sources/에 넣으면 끝. 아이디어를 찾고, 페이지를 만들고, 요약 준비 완료. 몇 초 만에.' },
      { category: '연결', before: '두 노트를 수동으로 연결. 하나가 바뀌면 다른 하나는 옛날 정보로 남음. 연결이 죽음.', after: '연결이 살아있습니다. 새 정보가 이전 정보와 모순되면, 모든 관련 페이지가 최신 상태로 유지됩니다.' },
      { category: '성장', before: '1년치 노트. 그냥 파일들. 모든 프로젝트가 처음부터 시작. 같은 독서, 같은 결론.', after: '1년이 위키를 만듭니다. 모든 새로운 질문이 당신이 모은 모든 것을 활용합니다. 지식이 성장합니다.' },
    ],
  },
  features: {
    label: '기능',
    title: '무엇이 바뀌는가',
    subtitle: '기능이 아닙니다. 당신이 읽는 모든 것과의 새로운 관계입니다.',
    organizeTitle: '그냥 일어납니다',
    organizeDesc: 'sources/에 넣기만 하세요. AI가 읽고, 추출하고, 만듭니다. 폴더도, 태그도, 작업도 없이.',
    organizeTag: '노력 제로',
    bidirectionalTitle: '살아있는 연결',
    bidirectionalDesc: '모든 페이지가 Obsidian 그래프에 합류합니다. 그래프 뷰를 열면 — 지식이 성장하는 것을 지켜보세요.',
    bidirectionalTag: '연결됨',
    conversationalTitle: '그냥 대화하세요',
    conversationalDesc: '친구에게 하듯 물어보세요. 위키가 보고 믿을 수 있는 출처로 답변합니다.',
    conversationalTag: '자연스러움',
    autoMaintenanceTitle: '최신 상태 유지',
    autoMaintenanceDesc: '새 파일? 자동 수집. 모순? 발견됨. 상태? 확인됨. 당신의 방식대로.',
    autoMaintenanceTag: '당신의 방식대로',
    smartFixTitle: '한 번의 클릭으로 모든 것 수정',
    smartFixDesc: '인과 관계 순서 배치 수정: 별칭→중복→끊긴 링크→고립→빈 페이지. 5단계를 병렬 처리로 실행.',
    smartFixTag: '스마트 수정',
    granularityTitle: '세밀함은 당신이 결정',
    granularityDesc: '소스별 추출 깊이 제어. 일상은 표준, 연구는 세밀하게, 개요는 거칠게.',
    granularityTag: '세분화',
        moreLabel: '그리고 더:',
    moreCapabilities: ['8개 언어 Wiki 출력', '중복 감지 및 병합', '페이지 별칭', '병렬 생성', '모순 감지', '5xx 자동 재시도', '스마트 배치 건너뛰기'],
  },
  install: {
    label: '시작하기',
    title: '몇 분이면 준비 완료',
    subtitle: 'Obsidian만 있으면 됩니다.',
    step1Title: '설치',
    step1Desc: 'Obsidian에서: 설정 → 커뮤니티 플러그인 → 찾아보기, <em>Karpathy LLM Wiki</em> 검색, <em>설치</em> 후 <em>활성화</em> 클릭.',
    step2Title: '설정',
    step2Desc: '설정 → <em>Karpathy LLM Wiki</em>. LLM 선택, 키 입력, 테스트, 저장.',
    step3Title: '사용',
    step3Desc: '<em>Cmd+P</em> (또는 <em>Ctrl+P</em>). <em>Ingest</em> 입력으로 소스 추가. <em>Query</em> 입력으로 질문.',
    pluginPageButton: '플러그인 페이지 열기',
    cta: 'Obsidian에서 받기',
  },
  providers: {
    label: '오픈 소스',
    title: '열린 공간에서 만들어졌습니다',
    subtitle: '오픈 소스. 데이터는 당신의 것입니다.',
    openSourceTitle: '오픈 소스',
    openSourceDesc: 'MIT 라이선스. GitHub에 전체 소스. 포크하고, 확장하고, 당신의 것으로 만드세요.',
    communityTitle: '커뮤니티',
    communityDesc: 'GitHub Discussions에서 아이디어와 도움을 나눕니다. 기여를 환영합니다.',
    vendorTitle: '프라이버시 우선',
    vendorDesc: '저장소 없음. 백엔드 없음. 데이터 수집 없음. 노트는 Obsidian에 유지 — 수집이나 쿼리 중에만 LLM으로 전송. 로컬 모델은 모든 것을 오프라인으로 유지.',
    obsidianTitle: '순수 Obsidian',
    obsidianDesc: '추가 앱 없음. Obsidian 안에 완전히 존재합니다.',
    cardLabel: '당신의 LLM, 당신의 선택',
    cardSubtitle: '모든 제공자와 작동. 종속 없음.',
    contextNote: '긴 컨텍스트 모델(256K+) 권장. 전체 위키를 한 번에, 완전한 이해.',
    bestValue: '최고의 가성비',
  },
  ecosystem: {
    label: '생태계',
    title: '모든 플러그인이 더 강력해집니다',
    subtitle: '섬이 아닙니다. 당신이 좋아하는 모든 도구가 이제 더 좋습니다.',
    items: [
      { name: '그래프 뷰', standalone: '연결 보기', amplified: '위키가 그래프에 의미를 부여. 허브 페이지, 클러스터, 고립 노트. 장식이 아닌 탐색.' },
      { name: 'Web Clipper', standalone: '글 저장', amplified: 'sources/에 넣으면 AI가 추출, 연결, 업데이트. 한 번 클립으로 10개 이상의 위키 페이지 생성.' },
      { name: 'Dataview', standalone: '데이터 쿼리', amplified: 'AI가 구조를 추가. 태그, 날짜, 카테고리. 빈 테이블이 살아있는 대시보드로.' },
      { name: 'Git', standalone: '버전 추적', amplified: '지식이 어떻게 진화하는지 지켜보세요. 모든 커밋이 당신의 성장 이야기를 전합니다.' },
      { name: 'Marp', standalone: '슬라이드 만들기', amplified: '"내 연구를 10분 발표용으로 요약해"라고 물어보세요. 위키가 지식에서 슬라이드를 만듭니다.' },
      { name: 'Canvas', standalone: '비주얼 캔버스', amplified: 'AI가 지식에서 개념도, 타임라인, 의사결정 트리를 구축. 더 이상 빈 캔버스가 아닙니다.' },
    ],
    cta: '이것은 시작일 뿐입니다. 지식에 구조가 있으면, 모든 플러그인이 더 강력해집니다.',
  },
  footer: {
    emailUser: 'hi',
    emailDomain: 'greenerai.top',
    emailLabel: '연락처:',
    github: 'GitHub',
    discussions: '피드백',
    releases: '릴리스',
    obsidian: 'Obsidian',
  },
  cta: {
    title: '위키를 만들 준비가 되셨나요?',
    subtitle: '오픈 소스. 커뮤니티 주도. Obsidian만 있으면 됩니다.',
    button: 'Obsidian에 추가',
  },
  faq: {
    label: 'FAQ',
    title: '자주 묻는 질문',
    subtitle: '시작하기 전에 알아야 할 모든 것.',
        items: [
      { q: '이 플러그인은 실제로 무엇을 하나요?', a: '노트를 Obsidian에 넣으면 AI가 사람, 개념, 이론을 추출하고 상호 연결된 Wiki 페이지와 양방향 링크를 자동 생성합니다. <em>"X에 대해 뭐라고 썼지?"</em>라고 물어보면 인터넷이 아닌 자신의 노트에서 답을 얻습니다.' },
      { q: '최소 요구 사항은?', a: 'Obsidian v1.6.6+ (데스크톱: Windows, macOS, Linux)와 LLM 제공업체 API 키 필요. 지원: DeepSeek, Gemini, Claude, GPT, Kimi, GLM, OpenRouter, 커스텀. Ollama(로컬 모델)는 API 키 불필요.' },
      { q: '어떤 모델을 선택해야 하나요? 비용은?', a: '긴 컨텍스트 모델(1M tokens) 권장 — Wiki 전체를 한 번에 처리. 1회 수집 비용 약 <em>$0.05–$0.50</em>. 모든 비용은 LLM 제공업체에. 플러그인은 <em>무료 오픈 소스</em>.' },
      { q: 'Ollama로 로컬 모델을 사용할 수 있나요?', a: '네. <em>Ollama</em> 설치, 모델 pull(예: <em>qwen3.5</em>), <em>Ollama(로컬)</em> 선택. API 키 불필요. 클라우드는 수집에, 로컬은 질의에 적합.' },
      { q: '도움말이나 버그 신고는?', a: '버그 신고는 <em>GitHub Issues</em>, 질문은 <em>GitHub Discussions</em> 이용. <em>Obsidian Community Plugin</em> 페이지에서도 찾을 수 있습니다.' },
    ],
  },
};

export const de: Translations = {
  nav: { howItWorks: "So funktioniert's", comparison: 'Warum es wichtig ist', features: 'Funktionen', ecosystem: 'Ökosystem', providers: 'Open Source', install: 'Installation', download: 'Zu Obsidian hinzufügen', faq: 'FAQ', blog: 'Blog', home: 'Startseite' },
  hero: { badge: 'Andrej Karpathys LLM-Wiki-Konzept', title1: 'Deine Notizen.', title2: 'Ein lebendiges Wiki.', subtitle: 'Schreibe in Obsidian. Jede Notiz verbindet sich mit einem Netzwerk, das ständig wächst.', ctaInstall: 'Plugin holen', ctaObsidian: 'Obsidian holen', obsidianHint: 'Obsidian erforderlich.', ctaRead: 'Das Original-Konzept lesen', legendSources: 'sources/', legendEntities: 'entities/', legendConcepts: 'concepts/', scrollHint: 'Scrollen' },
  wikiDemo: { label: "So funktioniert's", title: 'Von der Notiz zum Wiki', subtitle: 'Eine Notiz. Eine Welt voller Verbindungen.', step1Title: 'Einfach hineinlegen', step1Desc: 'Artikel, Papers, Ideen. Lege sie in sources/. Das Plugin liest jedes Wort.', step2Title: 'Das Wesentliche erkennen', step2Desc: 'Personen, Orte, Themen. Die KI erfasst das Gesamtbild und hebt hervor, was zählt.', step3Title: 'Seiten entstehen', step3Desc: 'Jedes Konzept erhält seinen eigenen Raum. Inhalt, Bedeutung, Verbindungen — alles bereit für dich.', step4Title: 'Verbindungen beobachten', step4Desc: 'Seiten verknüpfen sich automatisch. Öffne die Graph-Ansicht und sieh, wie dein Wissen Gestalt annimmt.', step5Title: 'Einfach fragen', step5Desc: 'Frag ganz natürlich. Dein Wiki antwortet mit Quellen, die du überprüfen kannst — und speichert als neue Seiten.', next: 'Weiter', prev: 'Zurück', restart: 'Neustart', sourceNote: 'Quelle', extracted: 'Gefunden', generated: 'Erstellt', linked: 'Verknüpft', ask: 'Frage', answer: 'Antwort' },
  comparison: { label: 'Warum es wichtig ist', title: 'Nichts, was du liest, sollte verloren gehen.', subtitle: 'Verlieren oder wachsen?', beforeLabel: 'Vorher', afterLabel: 'Nachher', items: [{ category: 'Speichern', before: 'Artikel speichern. Ort vergessen. Später suchen. Nichts gefunden.', after: 'In sources/ ablegen. Ideen gefunden, Seiten erstellt, Zusammenfassung bereit. In Sekunden.' }, { category: 'Verknüpfen', before: 'Zwei Notizen manuell verlinken. Eine ändert sich. Die andere bleibt alt. Der Link stirbt.', after: 'Links bleiben lebendig. Wenn neue Informationen alte widersprechen, bleiben alle verbundenen Seiten aktuell.' }, { category: 'Wachsen', before: 'Ein Jahr Notizen. Nur Dateien. Jedes Projekt beginnt von vorn. Gleiches Lesen. Gleiche Schlussfolgerungen.', after: 'Ein Jahr baut ein Wiki. Jede neue Frage schöpft aus allem, was du gesammelt hast. Dein Wissen wächst.' }] },
  features: { label: 'Funktionen', title: 'Was sich ändert', subtitle: 'Keine Funktionen. Eine neue Beziehung zu allem, was du liest.', organizeTitle: 'Es passiert einfach', organizeDesc: 'In sources/ ablegen. KI liest, extrahiert, baut. Keine Ordner. Keine Tags. Keine Arbeit.', organizeTag: 'Null Aufwand', bidirectionalTitle: 'Lebendige Links', bidirectionalDesc: 'Jede Seite wird Teil deines Obsidian-Graphen. Öffne die Graph-Ansicht — und sieh dein Wissen wachsen.', bidirectionalTag: 'Vernetzt', conversationalTitle: 'Einfach sprechen', conversationalDesc: 'Frag wie einen Freund. Dein Wiki antwortet mit Quellen, die du sehen und vertrauen kannst.', conversationalTag: 'Natürlich', autoMaintenanceTitle: 'Bleibt aktuell', autoMaintenanceDesc: 'Neue Dateien? Automatisch erfasst. Widersprüche? Gefunden. Gesundheit? Geprüft. Nach deinen Regeln.', autoMaintenanceTag: 'Nach deinen Regeln',
    smartFixTitle: 'Ein Klick repariert alles',
    smartFixDesc: 'Kausal geordnete Stapelreparatur: Aliase → Duplikate → tote Links → Waisen → leere Seiten. Fünf Phasen mit paralleler Verarbeitung.',
    smartFixTag: 'Smart Fix All',
    granularityTitle: 'Fein oder grob. Du entscheidest.',
    granularityDesc: 'Extraktionstiefe pro Quelle steuern. Standard für den Alltag, Fein für Forschung, Grob für Überblicke.',
    granularityTag: 'Granularität',
        moreLabel: 'Und mehr:',
    moreCapabilities: ['8-sprachige Wiki-Ausgabe', 'Duplikaterkennung & Merge', 'Seiten-Aliase', 'Parallele Generierung', 'Widerspruchserkennung', '5xx Auto-Retry', 'Smart Batch Skip'], },
  install: { label: 'Loslegen', title: 'In Minuten bereit', subtitle: 'Obsidian ist alles, was du brauchst.', step1Title: 'Installieren', step1Desc: 'In Obsidian: Einstellungen → Community-Plugins → Durchsuchen, <em>Karpathy LLM Wiki</em> suchen, auf <em>Installieren</em> dann <em>Aktivieren</em> klicken.', step2Title: 'Konfigurieren', step2Desc: 'Einstellungen → <em>Karpathy LLM Wiki</em>. Wähle dein LLM, gib den Schlüssel ein, teste, speichere.', step3Title: 'Nutzen', step3Desc: '<em>Cmd+P</em> (oder <em>Ctrl+P</em>). <em>Ingest</em> eingeben um Quellen hinzuzufügen. <em>Query</em> eingeben um zu fragen.', pluginPageButton: 'Plugin-Seite öffnen', cta: 'Bei Obsidian holen' },
  providers: { label: 'Open Source', title: 'Offen entwickelt', subtitle: 'Open Source. Deine Daten bleiben deine.', openSourceTitle: 'Open Source', openSourceDesc: 'MIT-Lizenz. Vollständiger Quellcode auf GitHub. Forke, erweitere, mach es zu deinem.', communityTitle: 'Community', communityDesc: 'GitHub Discussions für Ideen und Hilfe. Beiträge willkommen.', vendorTitle: 'Datenschutz zuerst', vendorDesc: 'Kein Speicher. Kein Backend. Keine Datenerfassung. Deine Notizen bleiben in deinem Obsidian — nur während Ingest oder Query an dein LLM gesendet. Lokale Modelle halten alles offline.', obsidianTitle: 'Pures Obsidian', obsidianDesc: 'Keine zusätzlichen Apps. Lebt vollständig in deinem Obsidian.', cardLabel: 'Dein LLM, deine Wahl', cardSubtitle: 'Funktioniert mit jedem Anbieter. Kein Lock-in.', contextNote: 'Modelle mit langem Kontext (256K+) empfohlen. Dein ganzes Wiki in einem Aufruf, vollständiges Verständnis.', bestValue: 'Bester Wert' },
  ecosystem: { label: 'Ökosystem', title: 'Jedes Plugin, verstärkt', subtitle: 'Keine Insel. Jedes Tool, das du liebst, jetzt besser.', items: [{ name: 'Graph-Ansicht', standalone: 'Links sehen', amplified: 'Wiki gibt deinem Graphen Bedeutung. Hub-Seiten, Cluster, Waisen. Erkundung, nicht Dekoration.' }, { name: 'Web Clipper', standalone: 'Artikel speichern', amplified: 'In sources/ ablegen. KI extrahiert, verlinkt, aktualisiert. Ein Clip wird zu 10+ Wiki-Seiten.' }, { name: 'Dataview', standalone: 'Daten abfragen', amplified: 'KI fügt Struktur hinzu. Tags, Daten, Kategorien. Leere Tabellen werden zu lebendigen Dashboards.' }, { name: 'Git', standalone: 'Versionen verfolgen', amplified: 'Sieh dein Wissen wachsen. Jeder Commit erzählt die Geschichte, wie du gewachsen bist.' }, { name: 'Marp', standalone: 'Folien erstellen', amplified: 'Frag: „Fasse meine Forschung für einen 10-Minuten-Vortrag zusammen." Wiki baut Folien aus deinem Wissen.' }, { name: 'Canvas', standalone: 'Visueller Canvas', amplified: 'KI baut Konzeptkarten, Zeitleisten, Entscheidungsbaum aus deinem Wissen. Kein leeres Blatt mehr.' }], cta: 'Erst der Anfang. Wenn dein Wissen Struktur hat, wird jedes Plugin mächtiger.' },
  footer: { emailUser: 'hi', emailDomain: 'greenerai.top', emailLabel: 'Kontakt:', github: 'GitHub', discussions: 'Feedback', releases: 'Releases', obsidian: 'Obsidian' },
  cta: { title: 'Bereit, dein Wiki zu bauen?', subtitle: 'Open Source. Community-getrieben. Nur Obsidian.', button: 'Zu Obsidian hinzufügen' },
  faq: {
    label: 'FAQ',
    title: 'Häufige Fragen',
    subtitle: 'Alles, was du für den Einstieg wissen musst.',
        items: [
      { q: 'Was macht dieses Plugin eigentlich?', a: 'Lege eine Notiz in dein Obsidian-Vault. Die KI extrahiert Personen, Konzepte und Theorien und generiert automatisch vernetzte Wiki-Seiten mit bidirektionalen Links. Frage <em>„Was habe ich über X geschrieben?"</em> — die Antwort kommt aus deinen eigenen Notizen.' },
      { q: 'Was sind die Mindestanforderungen?', a: 'Obsidian v1.6.6+ (Desktop: Windows, macOS, Linux) und ein LLM-API-Key. Unterstützt: DeepSeek, Gemini, Claude, GPT, Kimi, GLM, OpenRouter, benutzerdefiniert. Kein API-Key für Ollama (lokale Modelle).' },
      { q: 'Welches Modell soll ich wählen? Was kostet es?', a: 'Langkontext-Modelle (1M Tokens) empfohlen — sie verarbeiten dein gesamtes Wiki in einem Durchlauf. Ein Ingest kostet <em>$0.05–$0.50</em>. Kosten gehen an den LLM-Anbieter; das Plugin ist <em>kostenlos und Open Source</em>.' },
      { q: 'Kann ich lokale Modelle via Ollama nutzen?', a: 'Ja. Installiere <em>Ollama</em>, pull ein Modell (z.B. <em>qwen3.5</em>), wähle <em>Ollama (Lokal)</em>. Kein API-Key nötig. Cloud für Ingest empfohlen; lokale Modelle für Abfragen.' },
      { q: 'Wie bekomme ich Hilfe oder melde Fehler?', a: 'Nutze <em>GitHub Issues</em> für Fehlermeldungen, <em>GitHub Discussions</em> für Fragen. Auch auf der <em>Obsidian Community Plugin</em>-Seite.' },
    ],
  },
};

export const es: Translations = {
  nav: { howItWorks: 'Cómo funciona', comparison: 'Por qué importa', features: 'Funciones', ecosystem: 'Ecosistema', providers: 'Código abierto', install: 'Instalar', download: 'Añadir a Obsidian', faq: 'FAQ', blog: 'Blog', home: 'Inicio' },
  hero: { badge: 'El concepto LLM Wiki de Andrej Karpathy', title1: 'Tus notas.', title2: 'Una wiki viva.', subtitle: 'Escribe en Obsidian. Cada nota se conecta a una red que no deja de crecer.', ctaInstall: 'Obtener el plugin', ctaObsidian: 'Obtener Obsidian', obsidianHint: 'Requiere Obsidian.', ctaRead: 'Leer el concepto original', legendSources: 'sources/', legendEntities: 'entities/', legendConcepts: 'concepts/', scrollHint: 'Desplazar' },
  wikiDemo: { label: 'Cómo funciona', title: 'De nota a wiki', subtitle: 'Una nota. Un mundo de conexiones.', step1Title: 'Déjalo ahí', step1Desc: 'Artículos, papers, ideas. Ponlos en sources/. El plugin lee cada palabra.', step2Title: 'Ve lo que importa', step2Desc: 'Personas, lugares, temas. La IA lee el panorama completo y resalta lo que importa.', step3Title: 'Aparecen páginas', step3Desc: 'Cada concepto tiene su espacio. Contenido, significado, conexiones — todo listo para ti.', step4Title: 'Mira cómo conecta', step4Desc: 'Las páginas se enlazan entre sí. Abre Vista de gráfico y mira tu conocimiento tomar forma.', step5Title: 'Solo pregunta', step5Desc: 'Pregunta con naturalidad. Tu wiki responde con fuentes que puedes verificar — y guardar como nuevas páginas.', next: 'Siguiente', prev: 'Anterior', restart: 'Reiniciar', sourceNote: 'Fuente', extracted: 'Encontrado', generated: 'Creado', linked: 'Conectado', ask: 'Preguntar', answer: 'Respuesta' },
  comparison: { label: 'Por qué importa', title: 'Nada de lo que leas debería perderse.', subtitle: '¿Perderlo o hacerlo crecer?', beforeLabel: 'Antes', afterLabel: 'Después', items: [{ category: 'Guardar', before: 'Guardas un artículo. Olvidas dónde. Buscas después. Nada.', after: 'Lo dejas en sources/. Las ideas se encuentran, las páginas se construyen, el resumen está listo. En segundos.' }, { category: 'Conectar', before: 'Enlazas dos notas a mano. Una cambia. La otra se queda vieja. El enlace muere.', after: 'Los enlaces se mantienen vivos. Cuando nueva información contradice la anterior, cada página relacionada se mantiene actualizada.' }, { category: 'Crecer', before: 'Un año de notas. Solo archivos. Cada proyecto empieza de cero. Misma lectura. Mismas conclusiones.', after: 'Un año construye una wiki. Cada nueva pregunta aprovecha todo lo que has recopilado. Tu conocimiento crece.' }] },
  features: { label: 'Funciones', title: 'Lo que cambia', subtitle: 'No funciones. Una nueva relación con todo lo que lees.', organizeTitle: 'Sucede solo', organizeDesc: 'Déjalo en sources/. La IA lee, extrae, construye. Sin carpetas. Sin etiquetas. Sin trabajo.', organizeTag: 'Cero esfuerzo', bidirectionalTitle: 'Enlaces vivos', bidirectionalDesc: 'Cada página se une a tu grafo de Obsidian. Abre Vista de gráfico — y mira crecer tu conocimiento.', bidirectionalTag: 'Conectado', conversationalTitle: 'Solo habla', conversationalDesc: 'Pregunta como a un amigo. Tu wiki responde con fuentes que puedes ver y en las que puedes confiar.', conversationalTag: 'Natural', autoMaintenanceTitle: 'Se mantiene al día', autoMaintenanceDesc: '¿Nuevos archivos? Se ingestan. ¿Contradicciones? Se encuentran. ¿Salud? Se comprueba. En tus términos.', autoMaintenanceTag: 'En tus términos',
    smartFixTitle: 'Un clic lo arregla todo',
    smartFixDesc: 'Reparación por lotes ordenada causalmente: alias → duplicados → enlaces rotos → huérfanos → páginas vacías. Cinco fases con procesamiento paralelo.',
    smartFixTag: 'Smart Fix All',
    granularityTitle: 'Fino o grueso. Tú decides.',
    granularityDesc: 'Controla la profundidad de extracción por fuente. Estándar para uso diario, Fino para investigación, Grueso para vistas generales.',
    granularityTag: 'Granularidad',
        moreLabel: 'Y más:',
    moreCapabilities: ['Salida Wiki en 8 idiomas', 'Detección y fusión de duplicados', 'Alias de página', 'Generación paralela', 'Detección de contradicciones', 'Reintento automático 5xx', 'Omisión inteligente por lotes'], },
  install: { label: 'Empezar', title: 'Listo en minutos', subtitle: 'Obsidian es todo lo que necesitas.', step1Title: 'Instalar', step1Desc: 'En Obsidian: Ajustes → Plugins de la comunidad → Explorar, busca <em>Karpathy LLM Wiki</em>, haz clic en <em>Instalar</em> y luego <em>Activar</em>.', step2Title: 'Configurar', step2Desc: 'Ajustes → <em>Karpathy LLM Wiki</em>. Elige tu LLM, introduce la clave, prueba, guarda.', step3Title: 'Usar', step3Desc: '<em>Cmd+P</em> (o <em>Ctrl+P</em>). Escribe <em>Ingest</em> para añadir fuentes. Escribe <em>Query</em> para preguntar.', pluginPageButton: 'Abrir página del plugin', cta: 'Obtener en Obsidian' },
  providers: { label: 'Código abierto', title: 'Construido en abierto', subtitle: 'Código abierto. Tus datos siguen siendo tuyos.', openSourceTitle: 'Código abierto', openSourceDesc: 'Licencia MIT. Código completo en GitHub. Fork, extiéndelo, hazlo tuyo.', communityTitle: 'Comunidad', communityDesc: 'GitHub Discussions para ideas y ayuda. Contribuciones bienvenidas.', vendorTitle: 'Privacidad primero', vendorDesc: 'Sin almacenamiento. Sin backend. Sin recopilación de datos. Tus notas se quedan en tu Obsidian — solo se envían a tu LLM durante la ingestión o consulta. Los modelos locales mantienen todo sin conexión.', obsidianTitle: 'Obsidian puro', obsidianDesc: 'Sin aplicaciones extra. Vive completamente en tu Obsidian.', cardLabel: 'Tu LLM, tú eliges', cardSubtitle: 'Funciona con cualquier proveedor. Sin bloqueos.', contextNote: 'Modelos de contexto largo (256K+) recomendados. Toda tu wiki en una llamada, comprensión completa.', bestValue: 'Mejor valor' },
  ecosystem: { label: 'Ecosistema', title: 'Cada plugin, amplificado', subtitle: 'No es una isla. Cada herramienta que amas, ahora mejor.', items: [{ name: 'Graph View', standalone: 'Ver enlaces', amplified: 'La wiki da significado a tu grafo. Páginas centrales, clústeres, huérfanos. Exploración, no decoración.' }, { name: 'Web Clipper', standalone: 'Guardar artículos', amplified: 'Déjalo en sources/. La IA extrae, enlaza, actualiza. Un clip se convierte en más de 10 páginas wiki.' }, { name: 'Dataview', standalone: 'Consultar datos', amplified: 'La IA añade estructura. Etiquetas, fechas, categorías. Las tablas vacías se convierten en dashboards vivos.' }, { name: 'Git', standalone: 'Rastrear versiones', amplified: 'Mira evolucionar tu conocimiento. Cada commit cuenta la historia de cómo creciste.' }, { name: 'Marp', standalone: 'Crear slides', amplified: 'Pregunta: "Resume mi investigación para una charla de 10 minutos." La wiki construye slides desde tu conocimiento.' }, { name: 'Canvas', standalone: 'Lienzo visual', amplified: 'La IA construye mapas conceptuales, líneas de tiempo, árboles de decisión desde tu conocimiento. Lienzo nunca más en blanco.' }], cta: 'Solo el comienzo. Cuando tu conocimiento tiene estructura, cada plugin se vuelve más potente.' },
  footer: { emailUser: 'hi', emailDomain: 'greenerai.top', emailLabel: 'Contacto:', github: 'GitHub', discussions: 'Feedback', releases: 'Versiones', obsidian: 'Obsidian' },
  cta: { title: '¿Listo para construir tu wiki?', subtitle: 'Código abierto. Impulsado por la comunidad. Solo Obsidian.', button: 'Añadir a Obsidian' },
  faq: {
    label: 'FAQ',
    title: 'Preguntas frecuentes',
    subtitle: 'Todo lo que necesitas saber para empezar.',
        items: [
      { q: '¿Qué hace este plugin realmente?', a: 'Coloca cualquier nota en tu bóveda de Obsidian. La IA extrae personas, conceptos y teorías, y genera páginas wiki interconectadas con enlaces bidireccionales. Pregunta <em>"¿qué escribí sobre X?"</em> — la respuesta viene de tus notas.' },
      { q: '¿Cuáles son los requisitos mínimos?', a: 'Obsidian v1.6.6+ (escritorio: Windows, macOS, Linux) y una clave API de LLM. Compatible: DeepSeek, Gemini, Claude, GPT, Kimi, GLM, OpenRouter o personalizado. Sin clave para Ollama (modelos locales).' },
      { q: '¿Qué modelo elegir? ¿Cuánto cuesta?', a: 'Modelos de contexto largo (1M tokens) recomendados — procesan toda tu wiki en una pasada. Una ingesta cuesta <em>$0.05–$0.50</em>. Los costos van al proveedor LLM; el plugin es <em>gratuito y open source</em>.' },
      { q: '¿Puedo usar modelos locales con Ollama?', a: 'Sí. Instala <em>Ollama</em>, descarga un modelo (ej. <em>qwen3.5</em>), selecciona <em>Ollama (Local)</em>. Sin clave API. Nube recomendada para ingestas; modelos locales para consultas.' },
      { q: '¿Cómo obtener ayuda o reportar errores?', a: 'Usa <em>GitHub Issues</em> para errores, <em>GitHub Discussions</em> para preguntas. También en la página de <em>Obsidian Community Plugin</em>.' },
    ],
  },
};

export const fr: Translations = {
  nav: { howItWorks: "Comment ça marche", comparison: "Pourquoi c'est important", features: "Fonctionnalités", ecosystem: "Écosystème", providers: "Open source", install: "Installation", download: "Ajouter à Obsidian", faq: "FAQ", blog: "Blog", home: "Accueil" },
  hero: { badge: "Le concept LLM Wiki d'Andrej Karpathy", title1: "Vos notes.", title2: "Un wiki vivant.", subtitle: "Écrivez dans Obsidian. Chaque note se connecte à un réseau qui ne cesse de grandir.", ctaInstall: "Obtenir le plugin", ctaObsidian: "Obtenir Obsidian", obsidianHint: "Obsidian requis.", ctaRead: "Lire le concept original", legendSources: "sources/", legendEntities: "entities/", legendConcepts: "concepts/", scrollHint: "Faire défiler" },
  wikiDemo: { label: "Comment ça marche", title: "De la note au wiki", subtitle: "Une note. Un monde de connexions.", step1Title: "Déposez-le", step1Desc: "Articles, papiers, idées. Placez-les dans sources/. Le plugin lit chaque mot.", step2Title: "Voyez l'essentiel", step2Desc: "Personnes, lieux, thèmes. L'IA lit l'ensemble et fait émerger ce qui compte.", step3Title: "Les pages apparaissent", step3Desc: "Chaque concept a son propre espace. Contenu, sens, connexions — tout est prêt pour vous.", step4Title: "Regardez les liens se tisser", step4Desc: "Les pages se lient entre elles. Ouvrez la Vue du graphe et voyez votre savoir prendre forme.", step5Title: "Posez vos questions", step5Desc: "Demandez naturellement. Votre wiki répond avec des sources vérifiables — et les sauve en nouvelles pages.", next: "Suivant", prev: "Précédent", restart: "Recommencer", sourceNote: "Source", extracted: "Trouvé", generated: "Créé", linked: "Connecté", ask: "Question", answer: "Réponse" },
  comparison: { label: "Pourquoi c'est important", title: "Rien de ce que vous lisez ne devrait être perdu.", subtitle: "Le perdre ou le cultiver ?", beforeLabel: "Avant", afterLabel: "Après", items: [{ category: "Sauvegarder", before: "Vous sauvegardez un article. Oubliez où. Cherchez plus tard. Rien.", after: "Déposez-le dans sources/. Les idées trouvées, les pages construites, le résumé prêt. En quelques secondes." }, { category: "Connecter", before: "Deux notes liées à la main. L'une change. L'autre reste ancienne. Le lien meurt.", after: "Les liens restent vivants. Quand une nouvelle information contredit l'ancienne, chaque page concernée reste à jour." }, { category: "Grandir", before: "Un an de notes. Juste des fichiers. Chaque projet recommence. Mêmes lectures. Mêmes conclusions.", after: "Un an construit un wiki. Chaque nouvelle question puise dans tout ce que vous avez collecté. Votre savoir grandit." }] },
  features: { label: "Fonctionnalités", title: "Ce qui change", subtitle: "Pas des fonctionnalités. Une nouvelle relation avec tout ce que vous lisez.", organizeTitle: "Ça se fait tout seul", organizeDesc: "Déposez-le dans sources/. L'IA lit, extrait, construit. Pas de dossiers. Pas de tags. Aucun effort.", organizeTag: "Zéro effort", bidirectionalTitle: "Des liens vivants", bidirectionalDesc: "Chaque page rejoint votre graphe Obsidian. Ouvrez la Vue du graphe — et regardez votre savoir grandir.", bidirectionalTag: "Connecté", conversationalTitle: "Parlez simplement", conversationalDesc: "Demandez comme à un ami. Votre wiki répond avec des sources que vous pouvez voir et vérifier.", conversationalTag: "Naturel", autoMaintenanceTitle: "Reste à jour", autoMaintenanceDesc: "Nouveaux fichiers ? Pris automatiquement. Contradictions ? Détectées. Santé ? Vérifiée. À votre rythme.", autoMaintenanceTag: "À votre rythme",
    smartFixTitle: "Un clic pour tout réparer",
    smartFixDesc: "Réparation par lots en ordre causal : alias → doublons → liens morts → orphelins → pages vides. Cinq phases exécutées en séquence avec traitement parallèle.",
    smartFixTag: "Smart Fix All",
    granularityTitle: "Du fin au grossier. Vous décidez.",
    granularityDesc: "Contrôlez la profondeur d'extraction par source. Standard pour le quotidien, Fin pour la recherche, Grossier pour un aperçu rapide.",
    granularityTag: "Granularité",
    moreLabel: "Et encore :",
    moreCapabilities: ["Wiki en 8 langues", "Détection et fusion des doublons", "Alias de pages", "Génération parallèle", "Détection de contradictions", "Auto-Retry 5xx", "Smart Batch Skip"], },
  install: { label: "Pour commencer", title: "Prêt en quelques minutes", subtitle: "Obsidian est tout ce qu'il vous faut.", step1Title: "Installer", step1Desc: "Dans Obsidian : Paramètres → Plugins communautaires → Parcourir, cherchez <em>Karpathy LLM Wiki</em>, cliquez sur <em>Installer</em> puis <em>Activer</em>.", step2Title: "Configurer", step2Desc: "Paramètres → <em>Karpathy LLM Wiki</em>. Choisissez votre LLM, entrez la clé, testez, sauvegardez.", step3Title: "Utiliser", step3Desc: "<em>Cmd+P</em> (ou <em>Ctrl+P</em>). Tapez <em>Ingest</em> pour ajouter des sources. Tapez <em>Query</em> pour poser une question.", pluginPageButton: "Ouvrir la page du plugin", cta: "Obtenir sur Obsidian" },
  providers: { label: "Open source", title: "Construit ouvertement", subtitle: "Open source. Vos données restent les vôtres.", openSourceTitle: "Open source", openSourceDesc: "Licence MIT. Code source complet sur GitHub. Forkez, étendez, appropriez-vous-le.", communityTitle: "Communauté", communityDesc: "GitHub Discussions pour les idées et l'entraide. Contributions bienvenues.", vendorTitle: "La vie privée d'abord", vendorDesc: "Pas de stockage. Pas de backend. Aucune collecte de données. Vos notes restent dans votre Obsidian — envoyées à votre LLM uniquement pendant l'ingestion ou la requête. Les modèles locaux gardent tout hors ligne.", obsidianTitle: "Obsidian pur", obsidianDesc: "Pas d'applications supplémentaires. Vit entièrement dans votre Obsidian.", cardLabel: "Votre LLM, votre choix", cardSubtitle: "Compatible avec tous les fournisseurs. Pas de dépendance.", contextNote: "Modèles long contexte (256K+) recommandés. Tout votre wiki en une seule requête, compréhension totale.", bestValue: "Meilleur rapport qualité-prix" },
  ecosystem: { label: "Écosystème", title: "Chaque plugin, amplifié", subtitle: "Pas une île. Chaque outil que vous aimez, maintenant meilleur.", items: [{ name: "Vue du graphe", standalone: "Voir les liens", amplified: "Le wiki donne du sens à votre graphe. Pages centrales, regroupements, orphelins. L'exploration, pas la décoration." }, { name: "Web Clipper", standalone: "Sauvegarder des articles", amplified: "Déposez dans sources/. L'IA extrait, lie, met à jour. Un clip devient 10+ pages wiki." }, { name: "Dataview", standalone: "Interroger des données", amplified: "L'IA ajoute de la structure. Tags, dates, catégories. Les tables vides deviennent des tableaux de bord vivants." }, { name: "Git", standalone: "Suivre les versions", amplified: "Regardez votre savoir évoluer. Chaque commit raconte l'histoire de votre progression." }, { name: "Marp", standalone: "Créer des diapositives", amplified: "Demandez : « Résume ma recherche pour une présentation de 10 minutes. » Le wiki construit les diapositives depuis votre savoir." }, { name: "Canvas", standalone: "Toile visuelle", amplified: "L'IA construit des cartes conceptuelles, des frises chronologiques, des arbres de décision depuis votre savoir. Fini la toile vide." }], cta: "Ce n'est que le commencement. Quand votre savoir a une structure, chaque plugin devient plus puissant." },
  footer: { emailUser: "hi", emailDomain: "greenerai.top", emailLabel: "Contact :", github: "GitHub", discussions: "Retours", releases: "Versions", obsidian: "Obsidian" },
  cta: { title: "Prêt à construire votre wiki ?", subtitle: "Open source. Porté par la communauté. Juste Obsidian.", button: "Ajouter à Obsidian" },
  faq: {
    label: 'FAQ',
    title: 'Questions fréquentes',
    subtitle: 'Tout ce que vous devez savoir pour commencer.',
    items: [
      { q: 'Que fait ce plugin exactement ?', a: 'Déposez n\'importe quelle note dans votre coffre Obsidian. L\'IA extrait les personnes, concepts et théories, puis génère des pages wiki interconnectées avec des liens bidirectionnels. Demandez <em>« qu\'ai-je écrit sur X ? »</em> — la réponse vient de vos notes, pas d\'Internet.' },
      { q: 'Quels sont les prérequis ?', a: 'Obsidian v1.6.6+ (bureau: Windows, macOS, Linux) et une clé API LLM. Providers supportés: DeepSeek, Gemini, Claude, GPT, Kimi, GLM, OpenRouter ou personnalisé. Aucune clé nécessaire pour Ollama (modèles locaux).' },
      { q: 'Quel modèle choisir ? Combien ça coûte ?', a: 'Modèles à long contexte (1M tokens) recommandés — ils traitent tout votre wiki en une fois. Une ingestion coûte <em>0,05–0,50 $</em>. Les coûts vont au fournisseur LLM ; le plugin est <em>gratuit et open source</em>.' },
      { q: 'Puis-je utiliser des modèles locaux via Ollama ?', a: 'Oui. Installez <em>Ollama</em>, récupérez un modèle (ex. <em>qwen3.5</em>), sélectionnez <em>Ollama (Local)</em> comme fournisseur. Aucune clé requise. Cloud recommandé pour l\'ingestion ; modèles locaux pour les requêtes.' },
      { q: 'Comment obtenir de l\'aide ou signaler un bug ?', a: 'Utilisez <em>GitHub Issues</em> pour les bugs, <em>GitHub Discussions</em> pour les questions. Retrouvez aussi le plugin sur la page <em>Obsidian Community Plugin</em>.' },
    ],
  },
};

export const pt: Translations = {
  nav: { howItWorks: 'Como funciona', comparison: 'Por que importa', features: 'Recursos', ecosystem: 'Ecossistema', providers: 'Código aberto', install: 'Instalar', download: 'Adicionar ao Obsidian', faq: 'FAQ', blog: 'Blog', home: 'Início' },
  hero: { badge: 'Conceito LLM Wiki de Andrej Karpathy', title1: 'Suas notas.', title2: 'Uma wiki viva.', subtitle: 'Escreva no Obsidian. Cada nota se conecta a uma rede que não para de crescer.', ctaInstall: 'Baixar o plugin', ctaObsidian: 'Baixar Obsidian', obsidianHint: 'Requer Obsidian.', ctaRead: 'Leia o conceito original', legendSources: 'sources/', legendEntities: 'entities/', legendConcepts: 'concepts/', scrollHint: 'Rolar' },
  wikiDemo: { label: 'Como funciona', title: 'De nota a wiki', subtitle: 'Uma nota. Um mundo de conexões.', step1Title: 'Jogue aqui', step1Desc: 'Artigos, papers, ideias. Coloque em sources/. O plugin lê cada palavra.', step2Title: 'Veja o que importa', step2Desc: 'Pessoas, lugares, temas. A IA lê o panorama completo e destaca o que importa.', step3Title: 'Páginas surgem', step3Desc: 'Cada conceito ganha seu espaço. Conteúdo, significado, conexões — tudo pronto para você.', step4Title: 'Veja as conexões', step4Desc: 'As páginas se ligam umas às outras. Abra o Graph View e veja seu conhecimento tomar forma.', step5Title: 'É só perguntar', step5Desc: 'Pergunte naturalmente. Sua wiki responde com fontes que você pode verificar — e salvar como novas páginas.', next: 'Próximo', prev: 'Anterior', restart: 'Recomeçar', sourceNote: 'Fonte', extracted: 'Encontrado', generated: 'Criado', linked: 'Conectado', ask: 'Perguntar', answer: 'Resposta' },
  comparison: { label: 'Por que importa', title: 'Nada do que você lê deveria ser desperdiçado.', subtitle: 'Perder ou fazer crescer?', beforeLabel: 'Antes', afterLabel: 'Depois', items: [{ category: 'Salvar', before: 'Salva um artigo. Esquece onde. Pesquisa depois. Nada.', after: 'Coloca em sources/. Ideias encontradas, páginas construídas, resumo pronto. Em segundos.' }, { category: 'Conectar', before: 'Liga duas notas à mão. Uma muda. A outra fica desatualizada. O link morre.', after: 'Os links se mantêm vivos. Quando novas informações contradizem as antigas, todas as páginas relacionadas se atualizam.' }, { category: 'Crescer', before: 'Um ano de notas. Só arquivos. Todo projeto começa do zero. Mesmas leituras. Mesmas conclusões.', after: 'Um ano constrói uma wiki. Cada nova pergunta se baseia em tudo que você coletou. Seu conhecimento cresce.' }] },
  features: { label: 'Recursos', title: 'O que muda', subtitle: 'Não são recursos. Uma nova relação com tudo que você lê.', organizeTitle: 'Acontece sozinho', organizeDesc: 'Coloca em sources/. A IA lê, extrai, constrói. Sem pastas. Sem tags. Sem trabalho.', organizeTag: 'Zero esforço', bidirectionalTitle: 'Links vivos', bidirectionalDesc: 'Cada página se integra ao seu grafo do Obsidian. Abra o Graph View — e veja seu conhecimento crescer.', bidirectionalTag: 'Conectado', conversationalTitle: 'Só conversar', conversationalDesc: 'Pergunte como a um amigo. Sua wiki responde com fontes que você pode ver e confiar.', conversationalTag: 'Natural', autoMaintenanceTitle: 'Sempre atualizado', autoMaintenanceDesc: 'Novos arquivos? Incluídos automaticamente. Contradições? Detectadas. Saúde? Verificada. Do seu jeito.', autoMaintenanceTag: 'Do seu jeito',
    smartFixTitle: 'Um clique resolve tudo',
    smartFixDesc: 'Correção em lotes com ordem causal: aliases → duplicatas → links quebrados → órfãos → páginas vazias. Cinco fases em sequência com processamento paralelo.',
    smartFixTag: 'Smart Fix All',
    granularityTitle: 'Do fino ao grosso. Você decide.',
    granularityDesc: 'Controle a profundidade de extração por fonte. Padrão para o dia a dia, Fino para pesquisa, Grosso para visão rápida.',
    granularityTag: 'Granularidade',
    moreLabel: 'E mais:',
    moreCapabilities: ['Wiki em 8 idiomas', 'Detecção e fusão de duplicatas', 'Aliases de página', 'Geração paralela', 'Detecção de contradições', 'Auto-Retry 5xx', 'Smart Batch Skip'], },
  install: { label: 'Comece agora', title: 'Pronto em minutos', subtitle: 'Obsidian é tudo que você precisa.', step1Title: 'Instalar', step1Desc: 'No Obsidian: Configurações → Plugins da comunidade → Procurar, busque por <em>Karpathy LLM Wiki</em>, clique em <em>Instalar</em> e depois <em>Ativar</em>.', step2Title: 'Configurar', step2Desc: 'Configurações → <em>Karpathy LLM Wiki</em>. Escolha seu LLM, insira a chave, teste, salve.', step3Title: 'Usar', step3Desc: '<em>Cmd+P</em> (ou <em>Ctrl+P</em>). Digite <em>Ingest</em> para adicionar fontes. Digite <em>Query</em> para perguntar.', pluginPageButton: 'Abrir página do plugin', cta: 'Baixar no Obsidian' },
  providers: { label: 'Código aberto', title: 'Construído abertamente', subtitle: 'Código aberto. Seus dados continuam seus.', openSourceTitle: 'Código aberto', openSourceDesc: 'Licença MIT. Código fonte completo no GitHub. Faça fork, estenda, faça do seu jeito.', communityTitle: 'Comunidade', communityDesc: 'GitHub Discussions para ideias e suporte. Contribuições são bem-vindas.', vendorTitle: 'Privacidade primeiro', vendorDesc: 'Sem armazenamento. Sem backend. Sem coleta de dados. Suas notas ficam no seu Obsidian — enviadas ao seu LLM apenas durante ingestão ou consulta. Modelos locais mantêm tudo offline.', obsidianTitle: 'Obsidian puro', obsidianDesc: 'Sem apps extras. Vive inteiramente dentro do seu Obsidian.', cardLabel: 'Seu LLM, sua escolha', cardSubtitle: 'Funciona com qualquer provedor. Sem lock-in.', contextNote: 'Modelos de contexto longo (256K+) recomendados. Sua wiki inteira em uma chamada, compreensão total.', bestValue: 'Melhor custo-benefício' },
  ecosystem: { label: 'Ecossistema', title: 'Cada plugin, potencializado', subtitle: 'Não é uma ilha. Cada ferramenta que você ama, agora melhor.', items: [{ name: 'Graph View', standalone: 'Ver links', amplified: 'A wiki dá significado ao seu grafo. Páginas centrais, clusters, órfãos. Exploração, não decoração.' }, { name: 'Web Clipper', standalone: 'Salvar artigos', amplified: 'Coloca em sources/. A IA extrai, conecta, atualiza. Um clip vira 10+ páginas wiki.' }, { name: 'Dataview', standalone: 'Consultar dados', amplified: 'A IA adiciona estrutura. Tags, datas, categorias. Tabelas vazias viram dashboards vivos.' }, { name: 'Git', standalone: 'Rastrear versões', amplified: 'Veja seu conhecimento evoluir. Cada commit conta a história de como você cresceu.' }, { name: 'Marp', standalone: 'Criar slides', amplified: 'Pergunte: "Resuma minha pesquisa para uma apresentação de 10 minutos." A wiki monta os slides a partir do seu conhecimento.' }, { name: 'Canvas', standalone: 'Canvas visual', amplified: 'A IA cria mapas conceituais, linhas do tempo, árvores de decisão a partir do seu conhecimento. Adeus, canvas em branco.' }], cta: 'Só o começo. Quando seu conhecimento tem estrutura, cada plugin fica mais poderoso.' },
  footer: { emailUser: 'hi', emailDomain: 'greenerai.top', emailLabel: 'Contato:', github: 'GitHub', discussions: 'Feedback', releases: 'Versões', obsidian: 'Obsidian' },
  cta: { title: 'Pronto para construir sua wiki?', subtitle: 'Código aberto. Movido pela comunidade. Só Obsidian.', button: 'Adicionar ao Obsidian' },
  faq: {
    label: 'FAQ',
    title: 'Perguntas frequentes',
    subtitle: 'Tudo que você precisa saber para começar.',
    items: [
      { q: 'O que este plugin realmente faz?', a: 'Coloque qualquer nota no seu vault do Obsidian. A IA extrai pessoas, conceitos e teorias e gera páginas wiki interligadas com links bidirecionais. Pergunte <em>"o que escrevi sobre X?"</em> — a resposta vem das suas próprias notas.' },
      { q: 'Quais são os requisitos mínimos?', a: 'Obsidian v1.6.6+ (desktop: Windows, macOS, Linux) e uma chave de API LLM. Provedores: DeepSeek, Gemini, Claude, GPT, Kimi, GLM, OpenRouter ou personalizado. Sem chave para Ollama (modelos locais).' },
      { q: 'Qual modelo devo escolher? Quanto custa?', a: 'Modelos de contexto longo (1M tokens) recomendados — processam toda sua wiki em uma passada. Uma ingestão custa <em>$0,05–$0,50</em>. Custos vão para o provedor LLM; o plugin é <em>gratuito e open source</em>.' },
      { q: 'Posso usar modelos locais via Ollama?', a: 'Sim. Instale o <em>Ollama</em>, baixe um modelo (ex. <em>qwen3.5</em>), selecione <em>Ollama (Local)</em>. Sem chave API. Nuvem recomendada para ingestão; modelos locais para consultas.' },
      { q: 'Como obter ajuda ou relatar bugs?', a: 'Use <em>GitHub Issues</em> para bugs, <em>GitHub Discussions</em> para perguntas. Encontre também na página do <em>Obsidian Community Plugin</em>.' },
    ],
  },
};
