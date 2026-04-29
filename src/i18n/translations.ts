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
    badge: 'v1.4.0 — Persistent, compounding knowledge',
    title1: 'Your notes.',
    title2: 'Self-organized.',
    subtitle: "An Obsidian plugin that transforms raw notes into a structured, interconnected wiki — with [[bidirectional links]], auto-generated indices, and conversational query. Based on Andrej Karpathy's LLM Wiki concept.",
    ctaInstall: 'Install Plugin',
    ctaRead: 'Read the concept',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: 'Scroll',
  },
  philosophy: {
    label: 'Philosophy',
    hook1: "You read. You save. You forget. Six months later, a question requires connecting three ideas across six files — and you draw a blank. The knowledge is in your vault. But it might as well be invisible.",
    hook2: "ChatGPT gives you an answer and throws it away. NotebookLM summarizes and forgets. Every RAG pipeline retrieves chunks, stitches them together, and discards the result. Nothing persists. Nothing compounds.",
    hook3: "What if your notes did not just sit in folders? What if an LLM built a living wiki — cross-referenced, self-maintained, growing richer with every article you add?",
    hook4: "A year from now, asking about a topic you researched last month will not return raw text. It will return a curated, cited synthesis — the accumulated understanding of everything you have read. That is compounding knowledge.",
  },
  wikiDemo: {
    label: 'How It Works',
    title: 'From note to wiki, step by step',
    subtitle: 'See how LLM-Wiki transforms a single source note into a fully connected knowledge graph.',
    step1Title: '1. Drop a source note',
    step1Desc: 'Write anything in sources/. The plugin reads your raw notes as read-only input.',
    step2Title: '2. AI extracts entities & concepts',
    step2Desc: 'The LLM scans the full context, identifies people, organizations (entities), and key themes (concepts).',
    step3Title: '3. Generate wiki pages',
    step3Desc: 'For each entity and concept, a dedicated wiki page is auto-generated with structured content.',
    step4Title: '4. Weave [[bidirectional links]]',
    step4Desc: 'Every page references related pages. Your Obsidian Graph View comes alive with organic connections.',
    step5Title: '5. Ask your knowledge',
    step5Desc: 'Query in natural language. The LLM walks your knowledge graph and returns cited answers with wiki-links.',
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
    subtitle: 'What happens when LLM-Wiki enters your workflow.',
    beforeLabel: 'Without LLM-Wiki',
    afterLabel: 'With LLM-Wiki',
    items: [
      {
        category: 'Ingesting knowledge',
        before: 'You read an article, clip it, and drop it in a folder. Three months later you need it — but you forgot the filename, never tagged it, and search returns nothing useful.',
        after: 'Drop the article in sources/. The LLM reads it, extracts entities and concepts, updates 10-15 related wiki pages, and files the summary in your index. Done in seconds.',
      },
      {
        category: 'Maintaining cross-references',
        before: 'You manually link two related notes, then update one six months later. The other still points to the old claim. Cross-references silently rot.',
        after: 'The LLM maintains all cross-references automatically. When new data contradicts an old claim, the wiki is updated across every affected page.',
      },
      {
        category: 'Querying your notes',
        before: '"How does this connect to that?" — you spend 20 minutes opening files, skimming, copying fragments into a new note, then manually synthesizing. The answer is scattered; you are the glue.',
        after: 'Ask the same question. The LLM reads relevant wiki pages, synthesizes a cited answer with [[wiki-links]] as breadcrumbs, and files it back into the wiki. You read the answer, not build it.',
      },
      {
        category: 'Knowledge over time',
        before: 'A year of notes is just a pile of files. Each new project starts from zero. You re-read the same sources, re-derive the same insights, forget the same details.',
        after: 'A year of sources has built a dense, cross-referenced wiki. New questions tap into the accumulated synthesis of everything you have read. Your knowledge base compounds like interest.',
      },
    ],
  },
  architecture: {
    label: 'Architecture',
    title: 'Three layers. One purpose.',
    subtitle: "Karpathy's design: raw sources are immutable. The LLM owns the wiki entirely. You co-evolve the schema over time.",
    sourcesPath: 'sources/',
    sourcesTitle: 'Raw Sources',
    sourcesDesc: 'Your curated collection — articles, papers, journals, clippings. Immutable. The LLM reads but never modifies. This is your source of truth.',
    enginePath: 'AI Engine',
    engineTitle: 'LLM + Schema',
    engineDesc: 'Full-context ingestion guided by wiki/schema/config.md. The schema tells the LLM how to structure pages, what conventions to follow, and how to maintain consistency.',
    wikiPath: 'wiki/',
    wikiTitle: 'The Wiki',
    wikiDesc: 'Auto-generated markdown files — summaries, entity pages, concept pages, an index, a log. The LLM owns this layer entirely. You read it; the LLM writes it.',
  },
  features: {
    label: 'Features',
    title: 'What changes when you use it',
    subtitle: 'Not a feature list. A set of behaviors that fundamentally alter how you interact with your own knowledge.',
    organizeTitle: 'Auto-Organize',
    organizeDesc: 'Drop raw notes into sources/. The AI reads, extracts, categorizes, and builds a structured wiki — entities, concepts, and summaries — without you lifting a finger. Your chaos becomes architecture while you are not looking.',
    organizeTag: 'Zero-config',
    bidirectionalTitle: 'Bidirectional Links',
    bidirectionalDesc: 'Every generated page auto-woven with [[bidirectional links]] into your Obsidian graph. Your Graph View comes alive — new notes sprout organic connections to entities, concepts, and sources.',
    bidirectionalTag: '[[wiki-links]]',
    conversationalTitle: 'Conversational Query',
    conversationalDesc: 'Not search — dialogue. Ask questions about your knowledge and receive streaming Markdown responses with embedded [[wiki-links]] as breadcrumbs. Every answer is a trailhead, not a dead end.',
    conversationalTag: 'Chat',
    autoMaintenanceTitle: 'Auto Maintenance',
    autoMaintenanceDesc: 'File watcher for automatic ingestion. Periodic lint detects contradictions, stale info, orphaned pages. Startup health check ensures your wiki stays consistent.',
    autoMaintenanceTag: 'Self-healing',
  },
  providers: {
    label: 'Providers',
    title: 'Your LLM, your choice',
    subtitle: 'Works with any major provider — cloud or local. No vendor lock-in.',
    contextNote: 'Models with 1M+ context window are recommended — the full Wiki fits in a single inference call.',
    bestValue: 'Best value',
  },
  ecosystem: {
    label: 'Ecosystem',
    title: 'Powered by the Obsidian ecosystem',
    subtitle: 'LLM-Wiki is not an island. It amplifies every tool you already use.',
    items: [
      {
        name: 'Graph View',
        desc: 'Your Obsidian graph becomes a live map of your knowledge. See which pages are hubs, which are orphans, where the clusters form. The wiki makes the graph meaningful — not just decorative.',
      },
      {
        name: 'Web Clipper',
        desc: 'Clip any article from your browser as markdown. Drop it into sources/. The LLM processes it automatically — extracting entities, weaving links, updating the index. Reading becomes building.',
      },
      {
        name: 'Marp',
        desc: 'Generate slide decks directly from wiki content. A presentation is just a query: "Summarize my ML research for a 10-minute talk." The result is a new wiki page you can present from.',
      },
      {
        name: 'Dataview',
        desc: 'Query wiki page frontmatter dynamically. When the LLM adds YAML metadata to pages, Dataview generates tables, lists, and dashboards automatically. Your wiki becomes queryable like a database.',
      },
      {
        name: 'Git',
        desc: 'The wiki is just a folder of markdown files. Version history, branching, rollbacks, and collaboration come free. See exactly how your knowledge evolved — every edit, every insight, every correction.',
      },
      {
        name: 'Canvas',
        desc: 'Visualize wiki structures as infinite canvases. The LLM can generate canvas layouts from your knowledge graph — concept maps, timelines, decision trees. Your knowledge gains a spatial dimension.',
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
    badge: 'v1.4.0 — 持续复利增长的知识',
    title1: '你的笔记。',
    title2: '自动组织。',
    subtitle: '一个 Obsidian 插件，将原始笔记转化为结构化、互联互通的 Wiki —— 具备 [[双向链接]]、自动生成索引和对话式查询功能。基于 Andrej Karpathy 的 LLM Wiki 理念。',
    ctaInstall: '安装插件',
    ctaRead: '阅读概念设计',
    legendSources: 'sources/',
    legendEntities: 'entities/',
    legendConcepts: 'concepts/',
    scrollHint: '向下滚动',
  },
  philosophy: {
    label: '理念',
    hook1: '你阅读。你保存。你遗忘。六个月后，一个问题需要连接六个文件中的三个想法——你一片空白。知识在你的 Vault 里。但它和不存在没什么两样。',
    hook2: 'ChatGPT 给你答案然后扔掉。NotebookLM 总结完就遗忘。每条 RAG 流水线检索片段、拼凑起来、然后丢弃结果。没有持久化。没有复利。',
    hook3: '如果你的笔记不只是躺在文件夹里呢？如果 LLM 构建了一个活的 Wiki——交叉引用、自动维护、每添加一篇文章就更丰富呢？',
    hook4: '一年后，询问你上个月研究过的话题，返回的不是原始文本。而是一个经过策划、带引用的综合——你读过的所有内容的累积理解。这就是知识的复利。',
  },
  wikiDemo: {
    label: '工作原理',
    title: '从笔记到 Wiki，步步为营',
    subtitle: '看看 LLM-Wiki 如何将一条原始笔记转化为全连接的知识图谱。',
    step1Title: '1. 放入源笔记',
    step1Desc: '在 sources/ 中写任何东西。插件以只读方式读取你的原始笔记。',
    step2Title: '2. AI 提取实体与概念',
    step2Desc: 'LLM 扫描全文语境，识别人物、组织（实体）和关键主题（概念）。',
    step3Title: '3. 生成 Wiki 页面',
    step3Desc: '为每个实体和概念自动生成结构化的专属 Wiki 页面。',
    step4Title: '4. 编织 [[双向链接]]',
    step4Desc: '每个页面引用相关页面。你的 Obsidian 图谱视图因有机连接而焕发生机。',
    step5Title: '5. 向你的知识提问',
    step5Desc: '用自然语言查询。LLM 遍历你的知识图谱，返回带引用的答案和 Wiki 链接。',
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
        category: '知识摄入',
        before: '你读了一篇文章，剪辑它，扔进文件夹。三个月后你需要它——但你忘了文件名，从没打标签，搜索返回的全是无用结果。',
        after: '把文章放入 sources/。LLM 阅读、提取实体和概念，更新 10-15 个相关 Wiki 页面，并将摘要归档到索引中。几秒钟完成。',
      },
      {
        category: '维护交叉引用',
        before: '你手动链接了两个笔记，六个月后更新其中一个。另一个仍指向旧主张。交叉引用默默腐烂。',
        after: 'LLM 自动维护所有交叉引用。当新数据与旧主张矛盾时，Wiki 在每个受影响的页面上更新。',
      },
      {
        category: '查询笔记',
        before: '"这和那有什么关系？"——你花20分钟打开文件、浏览、复制片段到新笔记，然后手动综合。答案分散在各处；你是粘合剂。',
        after: '问同样的问题。LLM 阅读相关 Wiki 页面，综合带 [[wiki-links]] 引用的答案，并将其归档回 Wiki。你阅读答案，而非构建它。',
      },
      {
        category: '知识的长期增长',
        before: '一年的笔记只是一堆文件。每个新项目从零开始。你重读同样的来源，重新推导同样的洞察，遗忘同样的细节。',
        after: '一年的来源构建了一个密集的、交叉引用的 Wiki。新问题可以利用你读过的所有内容的累积综合。你的知识库像利息一样复利增长。',
      },
    ],
  },
  architecture: {
    label: '架构',
    title: '三层分离。一个目标。',
    subtitle: 'Karpathy 的设计：原始笔记不可变。LLM 全权拥有 Wiki。你和 LLM 共同演化 Schema。',
    sourcesPath: 'sources/',
    sourcesTitle: '原始笔记',
    sourcesDesc: '你精心策展的集合——文章、论文、日志、摘录。不可变。LLM 只读不写。这是你的真相来源。',
    enginePath: 'AI 引擎',
    engineTitle: 'LLM + 模式层',
    engineDesc: '由 wiki/schema/config.md 引导的全文摄入。Schema 告诉 LLM 如何构建页面、遵循什么约定、如何保持一致性。',
    wikiPath: 'wiki/',
    wikiTitle: 'Wiki',
    wikiDesc: '自动生成的 Markdown 文件——摘要、实体页面、概念页面、索引、日志。LLM 全权拥有这一层。你阅读；LLM 写作。',
  },
  features: {
    label: '功能',
    title: '使用后会有什么改变',
    subtitle: '不是功能列表。而是一组从根本上改变你与自身知识互动方式的行为。',
    organizeTitle: '自动组织',
    organizeDesc: '把原始笔记扔进 sources/。AI 自动阅读、提取、分类并构建结构化 Wiki —— 实体、概念、摘要 —— 无需你动手。你的混乱在你没注意的时候就变成了架构。',
    organizeTag: '零配置',
    bidirectionalTitle: '双向链接',
    bidirectionalDesc: '每个生成的页面自动通过 [[双向链接]] 编织进你的 Obsidian 图谱。你的图谱视图焕发生机 —— 新笔记自然生长出与实体、概念和源的连接。',
    bidirectionalTag: '[[wiki-links]]',
    conversationalTitle: '对话式查询',
    conversationalDesc: '不是搜索 —— 是对话。向你的知识提问，接收流式 Markdown 回复，其中嵌入了 [[wiki-links]] 作为面包屑。每个答案都是一条 trails 的起点，而非死胡同。',
    conversationalTag: '对话',
    autoMaintenanceTitle: '自动维护',
    autoMaintenanceDesc: '文件监控自动摄入。定期 lint 检测矛盾、陈旧信息、孤立页面。启动健康检查确保你的 Wiki 始终保持一致。',
    autoMaintenanceTag: '自修复',
  },
  providers: {
    label: '提供商',
    title: '你的 LLM，你的选择',
    subtitle: '适配任何主流提供商 —— 云端或本地。无厂商锁定。',
    contextNote: '推荐使用 1M+ 上下文窗口的模型——完整 Wiki 可一次性装入推理调用。',
    bestValue: '最佳性价比',
  },
  ecosystem: {
    label: '生态',
    title: '由 Obsidian 生态驱动',
    subtitle: 'LLM-Wiki 不是一座孤岛。它放大你已经在使用的每个工具。',
    items: [
      {
        name: '图谱视图',
        desc: '你的 Obsidian 图谱成为你知识的实时地图。看见哪些是枢纽页面、哪些是孤儿页面、集群在哪里形成。Wiki 让图谱有意义——而不只是装饰。',
      },
      {
        name: 'Web Clipper',
        desc: '从浏览器剪辑任何文章为 Markdown。放入 sources/。LLM 自动处理——提取实体、编织链接、更新索引。阅读即构建。',
      },
      {
        name: 'Marp',
        desc: '直接从 Wiki 内容生成幻灯片。演示只是一次查询："为10分钟演讲总结我的 ML 研究。"结果是一个你可以直接展示的新 Wiki 页面。',
      },
      {
        name: 'Dataview',
        desc: '动态查询 Wiki 页面 YAML 元数据。当 LLM 为页面添加标签、日期等 frontmatter 时，Dataview 自动生成表格、仪表盘和过滤视图。你的 Wiki 变得像数据库一样可查询。',
      },
      {
        name: 'Git',
        desc: 'Wiki 只是一个 Markdown 文件夹。版本历史、分支、回滚和协作都是免费的。精确看见你的知识如何演变——每次编辑、每个洞察、每次修正。',
      },
      {
        name: 'Canvas',
        desc: '将 Wiki 结构可视化为无限画布。LLM 可以从你的知识图谱生成画布布局——概念地图、时间线、决策树。你的知识获得空间维度。',
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
