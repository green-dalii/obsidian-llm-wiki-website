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
  philosophy: {
    label: '理念',
    hook1: '读过的东西，存了就忘。半年后想把三个想法串起来，却发现它们散落在六个文件里，怎么也想不起来。知识明明就在 Vault 里，却跟没有一样。',
    hook2: 'ChatGPT 回答完就丢，NotebookLM 总结完就忘。下次再问，从头来过。没有积累，没有复利。',
    hook3: '如果笔记不只是躺在文件夹里呢？如果有一部活的 Wiki —— 交叉引用、自动维护、每加一篇文章就更丰富？这就是 LLM Wiki 的核心理念。',
    hook4: 'Karpathy 说得好：Obsidian 是 IDE，LLM 是程序员，Wiki 是代码库。一年后，你的知识库像利息一样越滚越多 —— 每多读一篇，下一个答案就更精准。',
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
  architecture: {
    label: '架构',
    title: '原始输入，Wiki 产出',
    subtitle: 'Karpathy 的设计哲学：原始笔记不可变，插件驱动 Wiki，你掌控结构。',
    sourcesPath: 'sources/',
    sourcesTitle: '原始来源',
    sourcesDesc: '你的收藏夹——文章、论文、读书笔记、摘录。只读不改。插件从中提取信息，但绝不触碰原文。',
    enginePath: 'AI 引擎',
    engineTitle: 'LLM + 模板',
    engineDesc: '由 wiki/schema/config.md 引导的全文摄入。Schema 定义页面模板、命名规范和维护规则。',
    wikiPath: 'wiki/',
    wikiTitle: 'Wiki',
    wikiDesc: '自动生成的 Markdown 文件——摘要、实体页、概念页、索引、日志。插件负责这一层的生成和维护。你读，它写。',
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
    label: '提供商',
    title: '你的 LLM，你做主',
    subtitle: '主流提供商全支持——云端或本地，随意切换。',
    contextNote: '推荐 256K+ 上下文窗口——完整 Wiki 一次装入推理，LLM 看到全局。',
    bestValue: '最佳性价比',
  },
  ecosystem: {
    label: '生态',
    title: 'Obsidian 生态，全面加持',
    subtitle: 'LLM-Wiki 不是孤岛。它让你已有的每一个工具都更强。',
    items: [
      {
        name: '图谱视图',
        desc: '图谱不再只是装饰。Wiki 赋予它真正的意义——枢纽页面、孤儿页面、知识集群，一目了然。',
      },
      {
        name: 'Web Clipper',
        desc: '浏览器里看到好文章，一键剪辑为 Markdown，丢进 sources/。插件自动处理：提取、链接、更新索引。',
      },
      {
        name: 'Marp',
        desc: '从 Wiki 直接生成幻灯片。"为 10 分钟演讲总结我的 ML 研究" —— 一句话搞定，结果就是一页可展示的 Wiki。',
      },
      {
        name: 'Dataview',
        desc: 'Wiki 页面的元数据自动可查。标签、日期、分类——Dataview 动态生成表格和仪表盘。',
      },
      {
        name: 'Git',
        desc: 'Wiki 就是一堆 Markdown 文件。版本历史、分支、协作天然支持。知识如何演变，一目了然。',
      },
      {
        name: 'Canvas',
        desc: '把 Wiki 结构铺在无限画布上。概念地图、时间线、决策树——AI 从知识图谱直接生成。',
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
