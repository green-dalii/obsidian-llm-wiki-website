export interface Translations {
  nav: {
    philosophy: string;
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
  philosophy: {
    label: string;
    hook1: string;
    hook2: string;
    hook3: string;
    hook4: string;
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
  architecture: {
    label: string;
    title: string;
    subtitle: string;
    sourcesPath: string;
    sourcesTitle: string;
    sourcesDesc: string;
    enginePath: string;
    engineTitle: string;
    engineDesc: string;
    wikiPath: string;
    wikiTitle: string;
    wikiDesc: string;
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
    contextNote: string;
    bestValue: string;
  };
  ecosystem: {
    label: string;
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      desc: string;
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
    philosophy: 'Philosophy',
    howItWorks: 'How It Works',
    features: 'Features',
    providers: 'Providers',
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
  philosophy: {
    label: 'Philosophy',
    hook1: "You read. You save. You forget. Six months later, a question requires connecting three ideas across six files — and you draw a blank. The knowledge is in your vault. But it might as well be invisible.",
    hook2: "ChatGPT gives you an answer and throws it away. NotebookLM summarizes and forgets. You ask the same question next week, it starts from scratch. Nothing persists. Nothing compounds.",
    hook3: "What if your notes did not just sit in folders? What if a plugin built a living wiki — cross-referenced, self-maintained, growing richer with every article you add? That is the LLM Wiki concept.",
    hook4: "As Karpathy puts it: Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase. A year from now, your knowledge base compounds like interest — every new source makes the next answer better.",
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
        category: 'Saving what you read',
        before: 'You clip an article, drop it in a folder, forget the filename. Three months later, search returns nothing useful.',
        after: 'Drop it in sources/. The plugin reads it, extracts key ideas, updates 10–15 related wiki pages, and files the summary. Done in seconds.',
      },
      {
        category: 'Cross-references',
        before: 'You manually link two notes. Six months later, one is updated — the other still points to the old version. Links silently rot.',
        after: 'All cross-references are maintained automatically. When new data contradicts an old claim, every affected page updates.',
      },
      {
        category: 'Finding answers',
        before: '"How does this connect to that?" — you spend 20 minutes opening files, skimming, copying fragments. You are the glue.',
        after: 'Ask the same question. The plugin reads relevant wiki pages, synthesizes a cited answer with [[wiki-links]] as breadcrumbs. You read the answer.',
      },
      {
        category: 'Knowledge over time',
        before: 'A year of notes is a pile of files. Each new project starts from zero. You re-read the same sources, re-derive the same insights.',
        after: 'A year of sources builds a dense, cross-referenced wiki. New questions tap into everything you have ever read. Knowledge compounds.',
      },
    ],
  },
  architecture: {
    label: 'Architecture',
    title: 'Sources in. Wiki out.',
    subtitle: "Karpathy's design: raw sources are immutable. The plugin owns the wiki. You evolve the structure over time.",
    sourcesPath: 'sources/',
    sourcesTitle: 'Raw Sources',
    sourcesDesc: 'Your curated collection — articles, papers, book notes, clippings. Immutable. The plugin reads but never modifies. This is your source of truth.',
    enginePath: 'AI Engine',
    engineTitle: 'LLM + Schema',
    engineDesc: 'Full-context ingestion guided by wiki/schema/config.md. The schema defines page templates, naming conventions, and maintenance rules.',
    wikiPath: 'wiki/',
    wikiTitle: 'The Wiki',
    wikiDesc: 'Auto-generated markdown files — summaries, entity pages, concept pages, an index, a log. The plugin owns this layer. You read it; the plugin writes it.',
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
    label: 'Providers',
    title: 'Your LLM, your choice',
    subtitle: 'Works with any major provider — cloud or local. No vendor lock-in.',
    contextNote: 'Long-context models (256K+ tokens) are recommended — the full wiki fits in a single inference call, giving the LLM complete understanding.',
    bestValue: 'Best value',
  },
  ecosystem: {
    label: 'Ecosystem',
    title: 'Powered by the Obsidian ecosystem',
    subtitle: 'LLM-Wiki is not an island. It amplifies every tool you already use.',
    items: [
      {
        name: 'Graph View',
        desc: 'Your graph becomes a live knowledge map — see hub pages, orphan pages, and where clusters form. The wiki gives your graph meaning beyond decoration.',
      },
      {
        name: 'Web Clipper',
        desc: 'Clip any article from your browser as markdown. Drop it into sources/. The AI processes it automatically — extracting ideas, weaving links, updating the index.',
      },
      {
        name: 'Marp',
        desc: 'Generate slide decks from wiki content. A presentation is just a query: "Summarize my ML research for a 10-minute talk." The result is a new wiki page you can present from.',
      },
      {
        name: 'Dataview',
        desc: 'Query wiki page frontmatter dynamically. When the AI adds YAML metadata to pages, Dataview generates tables, dashboards, and filtered views automatically.',
      },
      {
        name: 'Git',
        desc: 'The wiki is just a folder of markdown files. Version history, branching, and collaboration come free. See exactly how your knowledge evolved.',
      },
      {
        name: 'Canvas',
        desc: 'Visualize wiki structures as infinite canvases. The AI can generate concept maps, timelines, and decision trees from your knowledge graph.',
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
    philosophy: '理念',
    howItWorks: '工作原理',
    features: '功能',
    providers: '提供商',
    ecosystem: '生态',
    install: '安装',
  },
  hero: {
    badge: '基于 Andrej Karpathy 的 LLM Wiki 理念',
    title1: '你的笔记。',
    title2: '一部活的 Wiki。',
    subtitle: '把原始笔记放进 Obsidian。插件自动阅读、提取关键概念，构建一部自带交叉引用的自维护 Wiki —— 每添加一个来源，知识就更丰厚。',
    ctaInstall: '获取插件',
    ctaRead: '阅读原始概念',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: '向下滚动',
  },
  philosophy: {
    label: '理念',
    hook1: '你阅读。你保存。你遗忘。六个月后，一个问题需要连接六个文件中的三个想法——你一片空白。知识在你的 Vault 里，但和不存在没什么两样。',
    hook2: 'ChatGPT 给你答案然后扔掉。NotebookLM 总结完就遗忘。下周问同样的问题，它从头开始。没有持久化。没有复利。',
    hook3: '如果你的笔记不只是躺在文件夹里呢？如果插件构建了一部活的 Wiki——交叉引用、自动维护、每添加一篇文章就更丰富呢？这就是 LLM Wiki 的理念。',
    hook4: '正如 Karpathy 所说：Obsidian 是 IDE，LLM 是程序员，Wiki 是代码库。一年后，你的知识库像利息一样复利增长——每添加一个新来源，下一个答案就更好。',
  },
  wikiDemo: {
    label: '工作原理',
    title: '从笔记到 Wiki，步步为营',
    subtitle: '看看一条原始笔记如何变成一部全连接的知识 Wiki。',
    step1Title: '1. 放入源笔记',
    step1Desc: '把文章、论文、读书笔记写入或剪辑到 sources/。插件以只读方式读取所有内容。',
    step2Title: '2. 插件提取实体与概念',
    step2Desc: '插件读取全文上下文（不是片段），识别人物、组织和关键主题。',
    step3Title: '3. 生成 Wiki 页面',
    step3Desc: '每个实体和概念都有专属页面，包含结构化内容、定义和元数据。',
    step4Title: '4. 编织 [[双向链接]]',
    step4Desc: '每个页面交叉引用相关页面。打开图谱视图，看你的知识地图生长。',
    step5Title: '5. 向你的知识提问',
    step5Desc: '用自然语言提问。插件读取你的 Wiki 页面，综合带引用的答案，还可以把回答存为新页面。',
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
    title: '遗忘与复利之间的差别',
    subtitle: '当 LLM-Wiki 进入你的工作流后会发生什么。',
    beforeLabel: '没有 LLM-Wiki',
    afterLabel: '使用 LLM-Wiki',
    items: [
      {
        category: '保存你读过的东西',
        before: '你剪辑了一篇文章，扔进文件夹，忘了文件名。三个月后你需要它——搜索返回的全是无用结果。',
        after: '把文章放入 sources/。插件阅读、提取关键概念，更新 10-15 个相关 Wiki 页面，并归档摘要。几秒钟完成。',
      },
      {
        category: '交叉引用',
        before: '你手动链接了两个笔记，六个月后更新其中一个。另一个仍指向旧版本。链接默默腐烂。',
        after: '所有交叉引用自动维护。当新数据与旧主张矛盾时，每个受影响的页面都会更新。',
      },
      {
        category: '寻找答案',
        before: '"这和那有什么关系？"——你花20分钟打开文件、浏览、复制片段。你是粘合剂。',
        after: '问同样的问题。插件读取相关 Wiki 页面，综合带 [[wiki-links]] 引用的答案。你阅读答案，而非构建它。',
      },
      {
        category: '知识的长期增长',
        before: '一年的笔记只是一堆文件。每个新项目从零开始。你重读同样的来源，重新推导同样的洞察。',
        after: '一年的来源构建了一部密集的、交叉引用的 Wiki。新问题利用你读过的一切。知识复利增长。',
      },
    ],
  },
  architecture: {
    label: '架构',
    title: '源入。Wiki 出。',
    subtitle: 'Karpathy 的设计：原始笔记不可变。插件全权拥有 Wiki。你随时间演化结构。',
    sourcesPath: 'sources/',
    sourcesTitle: '原始笔记',
    sourcesDesc: '你精心策展的集合——文章、论文、读书笔记、摘录。不可变。插件只读不写。这是你的真相来源。',
    enginePath: 'AI 引擎',
    engineTitle: 'LLM + 模式层',
    engineDesc: '由 wiki/schema/config.md 引导的全文摄入。Schema 定义页面模板、命名规范和维护规则。',
    wikiPath: 'wiki/',
    wikiTitle: 'Wiki',
    wikiDesc: '自动生成的 Markdown 文件——摘要、实体页面、概念页面、索引、日志。插件全权拥有这一层。你阅读；插件写作。',
  },
  features: {
    label: '功能',
    title: '使用后会有什么改变',
    subtitle: '不是功能列表。而是一组改变你与自身知识互动方式的行为。',
    organizeTitle: '自动组织',
    organizeDesc: '把文章、论文或笔记扔进 sources/。插件读取全文上下文，提取实体和概念，构建结构化 Wiki 页面——无需手动打标签，无需管理文件夹。',
    organizeTag: '零配置',
    bidirectionalTitle: '双向链接',
    bidirectionalDesc: '每个生成的页面通过 [[双向链接]] 编织进你的 Obsidian 图谱。打开图谱视图，看你的知识地图随着每个新来源有机生长。',
    bidirectionalTag: '[[wiki-links]]',
    conversationalTitle: '对话式查询',
    conversationalDesc: '用自然语言向你的知识提问。插件读取你的 Wiki 页面（而非互联网），综合带 [[wiki-links]] 引用的答案，还可以把回答存为新的 Wiki 页面。',
    conversationalTag: '对话',
    autoMaintenanceTitle: '自动维护',
    autoMaintenanceDesc: '文件监控自动摄入。定期 lint 检测矛盾、陈旧信息、孤立页面。启动健康检查保持 Wiki 一致性——默认全部关闭，避免意外费用。',
    autoMaintenanceTag: '持续运行',
  },
  providers: {
    label: '提供商',
    title: '你的 LLM，你的选择',
    subtitle: '适配任何主流提供商——云端或本地。无厂商锁定。',
    contextNote: '推荐使用 256K+ 上下文窗口的模型——完整 Wiki 可一次性装入推理调用，让 LLM 拥有完整理解。',
    bestValue: '最佳性价比',
  },
  ecosystem: {
    label: '生态',
    title: '由 Obsidian 生态驱动',
    subtitle: 'LLM-Wiki 不是一座孤岛。它放大你已经在使用的每个工具。',
    items: [
      {
        name: '图谱视图',
        desc: '你的图谱成为实时知识地图——看见枢纽页面、孤儿页面、集群在哪里形成。Wiki 赋予图谱真正的意义。',
      },
      {
        name: 'Web Clipper',
        desc: '从浏览器剪辑任何文章为 Markdown。放入 sources/。AI 自动处理——提取概念、编织链接、更新索引。',
      },
      {
        name: 'Marp',
        desc: '从 Wiki 内容直接生成幻灯片。演示只是一次查询："为10分钟演讲总结我的研究。"结果是可直接展示的新 Wiki 页面。',
      },
      {
        name: 'Dataview',
        desc: '动态查询 Wiki 页面 frontmatter。当 AI 为页面添加标签和日期等元数据时，Dataview 自动生成表格和仪表盘。',
      },
      {
        name: 'Git',
        desc: 'Wiki 只是一个 Markdown 文件夹。版本历史、分支和协作都是免费的。精确看见你的知识如何演变。',
      },
      {
        name: 'Canvas',
        desc: '将 Wiki 结构可视化为无限画布。AI 可从你的知识图谱生成概念地图、时间线和决策树。',
      },
    ],
    cta: '这些只是开始。当知识被结构化后，每个 Obsidian 插件都会变得更强大。',
  },
  footer: {
    license: 'MIT 许可证',
    github: 'GitHub',
    discussions: '讨论区',
    releases: '发布版本',
  },
};
