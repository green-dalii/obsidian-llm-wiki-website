import type { ScenariosTranslation } from './types';

export const zh: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: '日常生活',
      icon: 'heart',
      filename: '养生笔记.md',
      sourceNoteContext: '一篇健康科学参考笔记——汇总了睡眠结构、睡眠负债及实用卫生习惯的核心研究。正是你会为了改善自己的健康而收藏的那类文章。',
      sourceNote: `# 中医体质学说与现代健康管理

体质是你身体的"操作系统"——理解自己的体质类型，是健康管理的第一步。

## 九种体质分类
- 平和质：阴阳平衡，精力充沛。约占人群 32%，是调理的目标状态
- 气虚质：容易疲劳，说话有气无力。约占 13%，白领高发
- 阳虚质：怕冷畏寒，手脚冰凉。多见于女性与老年人
- 阴虚质：口干舌燥，手心发热。熬夜人群的典型体质
- 痰湿质：体型偏胖，容易困倦。与代谢综合征高度重叠

## 体质与疾病风险（循证数据）
- 痰湿质 → 2 型糖尿病风险升高 3 倍（北京中医药大学队列研究，n=12,000+）
- 气郁质 → 抑郁症易感性增加，与 5-HT 转运体基因多态性相关
- 血瘀质 → 心脑血管事件风险显著升高

## 现代生活如何破坏体质
- 长期熬夜（23:00 后入睡）→ 持续 6 个月即可从平和质转为阴虚质
- 久坐 8h+/天 → 气滞血瘀叠加痰湿，典型"办公室体质"
- 高糖高油外卖 → 3 个月即可出现痰湿指标异常
- 过度思虑/焦虑 → 气郁，且气郁又加重失眠，形成恶性循环

## 调养核心思路
- 气虚：黄芪党参炖汤 + 八段锦，4–6 周可见精力改善
- 痰湿：控碳水 + 每天快走 40 分钟，8 周腰围平均减少 5cm
- 关键原则：起居有常 > 食疗 > 药补。睡好比吃什么补品都重要`,
      extractedItems: [
        { name: '黄芪', type: 'entity', lineIdx: 0 },
        { name: '八段锦', type: 'entity', lineIdx: 0 },
        { name: '九种体质', type: 'concept', lineIdx: 0 },
        { name: '痰湿质', type: 'concept', lineIdx: 0 },
        { name: '阴虚质', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: '黄芪', path: 'wiki/entities/astragalus.md', tags: ['中药', '补气'], summary: '黄芪为补气要药，常用于气虚质的调理。与党参配伍炖汤，配合八段锦练习，4-6周可改善精力状态。现代研究证实其具有免疫调节和抗疲劳作用。' },
        { title: '八段锦', path: 'wiki/entities/baduanjin.md', tags: ['养生', '运动'], summary: '中国传统健身功法，八组动作配合呼吸吐纳。对气虚质人群尤其有效——配合黄芪食疗，4-6周可显著改善精力状态。现代研究表明其可降低血压、改善平衡能力。' },
        { title: '九种体质学说', path: 'wiki/concepts/nine-constitutions.md', tags: ['中医', '养生'], summary: '中医将人体体质分为平和质、气虚质、阳虚质、阴虚质、痰湿质、湿热质、血瘀质、气郁质、特禀质九种类型。理解自身体质是个性化健康管理的基础。' },
        { title: '痰湿质', path: 'wiki/concepts/phlegm-dampness.md', tags: ['中医', '代谢'], summary: '痰湿质表现为体型偏胖、容易困倦。与代谢综合征高度重叠，2型糖尿病风险升高3倍（北京中医药大学队列研究，n=12,000+）。调理以控制饮食、增加运动为核心。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: '长期熬夜对身体有哪些具体的循证影响？',
      chatAnswerLead: { text: '[[长期熬夜]]最直接的影响是破坏[[昼夜节律]]——持续6个月23:00后入睡，即可将[[平和质]]转为[[阴虚质]]。研究显示，熬夜人群的皮质醇节律紊乱、胰岛素敏感性下降、炎症标志物升高。' },
      chatAnswerDetail: '从中医角度，熬夜耗伤阴液，导致阴虚火旺；从现代医学角度，睡眠不足会降低瘦素、升高胃饥饿素，增加高糖高脂食物的摄入欲望，形成"熬夜→吃垃圾食品→痰湿加重"的恶性循环。',
      chatSource: '养生笔记.md',
    },

    {
      id: 'reading',
      label: '深度阅读',
      icon: 'book-open',
      filename: '思考快与慢.md',
      sourceNoteContext: '卡尼曼经典著作的个人阅读笔记——不是摘要，而是真正改变了我对决策的理解的那些洞见。那种读完一本书后，觉得自己的思维模型被刷新了而写下的笔记。',
      sourceNote: `# 《思考，快与慢》阅读笔记

卡尼曼用"系统1/系统2"的框架，解释了我们为什么明明不傻，却总是做出错误的判断。

## 系统 1 与系统 2
- 系统 1：快速、自动、不费力。识别面孔、察觉对方语气里的敌意、算 2+2。全天候运行
- 系统 2：缓慢、需要努力、按步骤推理。算 17×24、填写税表、检查逻辑三段论。它很懒惰，经常直接采纳系统 1 的直觉判断

核心洞见：大多数错误不是"不知道"，而是系统 2 懒得审查。你以为自己在思考，其实你的系统 1 已经替你做完了决定。

## 几个让我停下来的启发式偏差

**可得性启发**
我们根据"想起来有多容易"来判断概率。空难比糖尿病并发症更让人恐惧，因为新闻每天都在报道——但实际上糖尿病每年多杀死 20 万倍的患者。你的担心和实际风险，毫无关系。

**锚定效应**
你看到的第一个数字会"锚住"你后续的判断。房地产中介看到高价挂牌价时，估价平均高 15%，并且坚持声称"锚点没有影响我"。这个效应完全不在意识层面。

**损失厌恶**
亏损的痛苦大约是同等收益带来的快乐的 2 倍。这解释了：
- 散户永远在止损前三思而不行，却迫不及待落袋为安
- "免运费"比"立减 5 元"更好卖
- 降薪会激起巨大愤怒，哪怕实际购买力相比去年是上涨的

## 前景理论（卡尼曼靠这个得了诺奖）
效用的评判基准是"参照点"，而非绝对值。涨薪 1000 元很高兴；涨薪 1000 元但同事涨了 2000 元——痛不欲生。

## 我打算怎么用
- 重要决策前（跳槽、大额消费、合作分账），先写下来，列出可能影响的偏差，睡三晚再回来看
- 开会永远不要先报数字（除非你打算锚定别人），不要被对方第一个数字带跑
- 个人储蓄和投资，自动化管理：把系统 2 的计划写成规则，让系统 1 无脑执行。每月自动定投，不看不查

## 还在思考的问题
- 系统 1 能被训练成"直觉=准"吗？象棋大师的pattern recognition似乎证明了可以
- 有没有「系统 1 比系统 2 更好的」领域？Malcolm Gladwell 的 Blink 就是讲这个
- LLM 的推理是纯系统 2 吗？还是大模型某种程度上已经形成了系统 1 式的"直觉"？`,
      extractedItems: [
        { name: '丹尼尔·卡尼曼', type: 'entity', lineIdx: 0 },
        { name: '系统1', type: 'concept', lineIdx: 0 },
        { name: '系统2', type: 'concept', lineIdx: 0 },
        { name: '可得性启发', type: 'concept', lineIdx: 0 },
        { name: '锚定效应', type: 'concept', lineIdx: 0 },
        { name: '损失厌恶', type: 'concept', lineIdx: 0 },
        { name: '前景理论', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: '丹尼尔·卡尼曼', path: 'wiki/entities/daniel-kahneman.md', tags: ['心理学家', '诺贝尔奖'], summary: '以色列裔美国心理学家，因前景理论获2002年诺贝尔经济学奖。他与阿莫斯·特沃斯基的合作奠定了行为经济学基础，揭示了人类决策中系统性的认知偏差。' },
        { title: '系统1与系统2', path: 'wiki/concepts/system-1-system-2.md', tags: ['认知科学', '心理学'], summary: '卡尼曼提出的双系统理论：系统1是快速、自动、直觉的思维；系统2是缓慢、费力、理性的思维。大多数决策错误源于系统2懒得审查系统1的直觉判断。' },
        { title: '可得性启发', path: 'wiki/concepts/availability-heuristic.md', tags: ['认知偏差', '决策'], summary: '人们根据"想起来有多容易"来判断事件频率。媒体曝光度高的风险（如空难）被高估，而实际更危险的风险（如糖尿病）被低估。可得性启发是投资、健康决策中最常见的偏差之一。' },
        { title: '锚定效应', path: 'wiki/concepts/anchoring-effect.md', tags: ['认知偏差', '谈判'], summary: '先接触到的数字会锚定后续判断。房地产中介面对高价挂牌价时，估价平均高15%，且声称"未受影响"。锚定效应完全在潜意识层面运作，连专家也无法免疫。' },
        { title: '前景理论', path: 'wiki/concepts/prospect-theory.md', tags: ['行为经济学', '心理学'], summary: '卡尼曼与特沃斯基提出的理论：人们对收益和损失的效用评估基于参照点而非绝对值。损失带来的痛苦约为同等收益带来快乐的2倍。解释了为何降薪比不涨薪更令人愤怒。' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '系统1和系统2在决策中如何分工与配合？',
      chatAnswerLead: { text: '[[系统1]]全天候运行，负责生成直觉和快速判断；[[系统2]]本应负责审查这些判断，但它非常懒惰，大多数时候直接采纳系统1的结论。有效的决策需要刻意激活系统2——写下问题、列出可能的偏差、睡一觉再决定。' },
      chatAnswerDetail: '卡尼曼的核心洞察是：系统2不是系统1的可靠检查员。它需要刻意努力才能激活，而大多数时候它只是为系统1已经做出的决定寻找合理化解释。这也是为什么"道理我都懂，但就是做不到"——知识在系统2，行动在系统1。',
      chatSource: '思考快与慢.md',
    },

    {
      id: 'inspiration',
      label: '灵感捕捉',
      icon: 'scissors',
      filename: '思考碎片剪藏.md',
      sourceNoteContext: '一段时间内陆续保存的网页剪藏——文章、随笔、访谈，它们共享一条暗线：如何更好地思考。那种你希望它们最终会彼此连接的碎片。',
      sourceNote: `# 思考碎片 · 剪藏文集

写在一个杂乱笔记里的各种想法和观察。遇到第三个"跟这个有关"的瞬间就会更新进来。

## 信息环境与独立思考
> 剪自 晚点LatePost 对刘海龙的访谈
"如果你把所有问题归结为媒介，认为不使用媒介，就没有这些问题。我觉得这过于简化了。
人类社会就是跟着媒介发展，人的进化也是跟着媒介变化、技术变化不断在变化。整个信息
环境如同气候，人类得学会适应新的媒介形态、信息分发方式，和它一同进化。"

## 不要用上一代的方法论
> 剪自 晚点LatePost 对 MiniMax 创始人闫俊杰的访谈
"更好的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型。中国
大部分公司，不管创业公司还是大厂，都还在用做推荐系统的方法来做大模型产品。推荐的
逻辑是：用户越多，反馈越多，推荐引擎越聪明。而 AI 大模型和产品的真实关系并非如此。"

## 站在大多数人对面的勇气
> 剪自 北京青年周刊 对王小伟的访谈
"马克·吐温讲过，当你发现自己站在大多数人的一边时，你应该停下来反思。每个人的第一
任务，不是读海德格尔，是真诚面对自己的日常。我们的注意力需要有开放性，能够接受不
愉快，并将其视为一种必要的异质性和否定性。哲学就是如鲠在喉，要持续制造不适感。"

## 专注与复利
> 剪自 晚点LatePost 对宇树科技创始人王兴兴的访谈
"很多时候就是灵感涌现。你24小时一直在思考这个问题，我不信问题解决不了。我们主要的
对手还是自己，就是我们每天、每月、每年比自己过去做得更好，同行基本就追不上。"

## 创新是一种信念
> 剪自 晚点LatePost 对 DeepSeek 创始人梁文锋的访谈
"我们真正缺乏的不是资金，而是信心，以及组织高水平人才进行有效创新的能力。有经验的
人可能会被固有的思维束缚，而没有经验的人更愿意反复摸索。创新首先是一种信念。
为什么硅谷的创新能力强？首先是敢。所有策略都是上一代的产物，未来未必仍然适用。"

## 我想理清的关系
- 刘海龙的信息环境 + 王小伟的反思 → 如何不被媒介操控情绪？
- 闫俊杰的方法论 + 梁文锋的信念 → 创新需要放弃哪些"经验"？
- 王兴兴的专注 + 梁文锋的敢 → 长期主义的两个侧面`,
      extractedItems: [
        { name: '刘海龙', type: 'entity', lineIdx: 0 },
        { name: '闫俊杰', type: 'entity', lineIdx: 0 },
        { name: '梁文锋', type: 'entity', lineIdx: 0 },
        { name: '信息环境', type: 'concept', lineIdx: 0 },
        { name: '独立思考', type: 'concept', lineIdx: 0 },
        { name: '创新信念', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: '刘海龙', path: 'wiki/entities/liu-hailong.md', tags: ['学者', '传播学'], summary: '中国人民大学新闻学院教授，研究媒介环境学与传播理论。提出信息环境如同气候，人类需要学会适应新的媒介形态，而非简单地拒绝媒介来逃避问题。' },
        { title: '梁文锋', path: 'wiki/entities/liang-wenfeng.md', tags: ['创业者', 'AI'], summary: 'DeepSeek创始人。核心理念：中国真正缺乏的不是资金，而是信心和组织高水平人才进行有效创新的能力。主张"尽可能少干预，让每个人有自由发挥的空间和试错机会"。' },
        { title: '信息环境与独立思考', path: 'wiki/concepts/information-environment.md', tags: ['媒介', '认知'], summary: '信息环境如同气候，人类需要学会适应新的媒介形态。真正的风险不是信息偏食，而是失去时间感、历史感和因果判断能力。独立思考的关键是保持注意力的开放性。' },
        { title: '方法论迭代', path: 'wiki/concepts/methodology-evolution.md', tags: ['创新', '产品'], summary: '每一代技术都有上一代的方法论陷阱。推荐系统的逻辑不适用于大模型产品。创新需要识别上一代策略的边界，并建立符合新技术本质的新方法论。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: '信息茧房和独立思考之间是什么关系？',
      chatAnswerLead: { text: '[[信息茧房]]的本质不是技术问题，而是[[注意力]]的封闭性。算法推荐只是放大了人类本来就有的"选择性接触"倾向。真正的独立思考需要刻意保持[[注意力的开放性]]，主动接受不愉快的异质性信息。' },
      chatAnswerDetail: '刘海龙指出：信息环境如同气候，人类得学会和它一同进化。王小伟则补充：哲学的作用是持续制造不适感。两者共同指向一个结论——独立思考不是"找到正确答案"，而是"维持一个能容纳否定性的认知状态"。',
      chatSource: '思考碎片剪藏.md',
    },

    {
      id: 'creation',
      label: '内容创作',
      icon: 'mic',
      filename: '播客节目策划.md',
      sourceNoteContext: '一期播客节目的制作策划文档——嘉宾研究、结构化问题链、叙事弧线设计。那种能区分精心准备的深度访谈和随性闲聊的策划稿。',
      sourceNote: `# 「纸上谈兵」第 24 期节目策划

嘉宾：梁文锋（DeepSeek 创始人）
话题："硬核创新：为什么中国也能做出世界级的大模型"

## 嘉宾背景
- DeepSeek 创始人，2023 年底发布 DeepSeek-V2 引发全球关注
- 幻方量化创始人，国内最早将 AI 应用于量化投资的团队之一
- 核心理念："我们真正缺乏的不是资金，而是信心，以及组织高水平人才进行有效创新的能力"

## 核心问题链
1. DeepSeek-V2 的架构创新（MLA 多头潜在注意力）是如何想到的？为什么其他大厂没有先做出来？
2. 你说"更好的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型"——这直接挑战了推荐系统的底层逻辑。能详细解释吗？
3. 你主张"尽可能少干预，让每个人有自由发挥的空间和试错机会"——在幻方和 DeepSeek，这种文化是如何具体落地的？
4. 面对 OpenAI、Google、Anthropic 这些巨头，DeepSeek 的差异化竞争策略是什么？
5. "所有策略都是上一代的产物，未来未必仍然适用"——你对 AI 未来 3-5 年的判断是什么？

## 引用资料
- DeepSeek-V2 技术报告（MLA 架构详解）
- 梁文锋 2024 年多次访谈合集

## 待确认事项
- 录制时间：梁文锋近期行程很紧，需协调
- 是否增加英文同传？面向海外听众
- 需要准备哪些技术细节以防深度追问？`,
      extractedItems: [
        { name: '梁文锋', type: 'entity', lineIdx: 0 },
        { name: 'DeepSeek', type: 'entity', lineIdx: 0 },
        { name: '幻方量化', type: 'entity', lineIdx: 0 },
        { name: 'MLA架构', type: 'concept', lineIdx: 0 },
        { name: '硬核创新', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: '梁文锋', path: 'wiki/entities/liang-wenfeng.md', tags: ['创业者', 'AI'], summary: 'DeepSeek和幻方量化创始人。核心理念：中国真正缺乏的不是资金，而是信心和组织高水平人才进行有效创新的能力。主张"尽可能少干预，让每个人有自由发挥的空间和试错机会"。' },
        { title: 'DeepSeek', path: 'wiki/entities/deepseek.md', tags: ['AI', '大模型'], summary: '中国AI公司，以DeepSeek-V2的MLA架构创新引发全球关注。代表了中国在大模型基础架构层面的原创性突破，证明硬核创新不需要大厂资源也能实现。' },
        { title: 'MLA架构', path: 'wiki/concepts/mla-architecture.md', tags: ['AI', '架构'], summary: 'Multi-head Latent Attention，DeepSeek-V2的核心创新。通过低秩压缩键值缓存，将推理时的KV缓存减少数倍，同时保持模型性能，显著降低推理成本。' },
        { title: '硬核创新', path: 'wiki/concepts/hardcore-innovation.md', tags: ['创新', '文化'], summary: '梁文锋提出的创新理念：真正的创新来自对技术本质的深度理解，而非应用层的快速迭代。关键要素：敢于挑战主流共识、给予人才充分的试错空间、将组织目标与技术突破深度绑定。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '梁文锋说的"更好的应用不会导向更好的模型"是什么意思？',
      chatAnswerLead: { text: '梁文锋指出，[[大模型]]和[[推荐系统]]遵循完全不同的增长逻辑。推荐系统的逻辑是"用户越多→反馈越多→引擎越聪明"，但大模型的真实关系是"更好的模型可以导向更好的应用，但更好的应用和更多用户并不会导向更好的模型"。模型能力的提升来自算法、数据和算力的突破，而非用户反馈的循环。' },
      chatAnswerDetail: '这一判断直接挑战了中国互联网"流量至上"的默认假设。它意味着做大模型不能像做App那样追求DAU增长，而需要长期、高额、低反馈的基础研发投入。DeepSeek选择了一条与多数大厂不同的路。',
      chatSource: '播客节目策划.md',
    },

    {
      id: 'academic',
      label: '学术研究',
      icon: 'microscope',
      filename: 'Transformer论文笔记.md',
      sourceNoteContext: '一篇里程碑式AI论文的研究笔记——那种需要真正理解基础原理而非只读标题时才会做的深度研读。Vaswani 等，2017。',
      sourceNote: `# Transformer 论文核心要点

"Attention Is All You Need" — 这篇论文终结了 RNN 时代。
Vaswani 等，2017，Google Brain。

## 核心思想
RNN 逐词处理序列（像念书一样一个字一个字读），Transformer 一次看完整句话，
用"注意力机制"让每个词自己决定要关注句子里的哪些其他词。关键洞察：
顺序处理不是优点，是瓶颈。

## 三个注意力机制
- 自注意力（Self-Attention）：句子中每个词同时关注所有词，捕捉长距离依赖。
RNN 在超过 50 个 token 后"记忆"衰减，Transformer 没有这个限制
- 多头注意力（Multi-Head）：8 组并行的注意力运算，每组学习不同类型的关系
——句法、语义、指代。然后拼接起来。不同头会各自专精某种模式
- 缩放点积：Q·K^T 除以 sqrt(d_k)。不用这个缩放因子，高维空间内积值过大，
梯度会爆炸。数学很直白，但工程上这个因子是整个计算的定海神针

## 位置编码
Transformer 没有循环结构，天然不知道词的顺序。方案：在输入嵌入上叠加不同
频率的正弦/余弦波。这样模型获得了位置信息，且不增加任何可训练参数。
删掉这一段，模型就退化成一个词袋模型——"今天吃午饭"和"午饭吃今天"没有区别。

## 为什么这篇论文改变了整个 AI
- 训练可并行化：RNN 必须逐 token 跑，Transformer 一次处理全序列 → 数据量级
直接飞跃。GPT 系列、BERT、Claude、Gemini 全都站在这个地基上
- 长距离依赖：RNN 记忆约 50 个 token 后衰减，Transformer 只受上下文窗口限制。
从 2017 年的 512 token 到今天的 1M+ token——全部建立在"不再需要 RNN"这个基础
决策之上
- 这条线的直接产物：BERT (2018) → GPT 系列 → 你今天能用的每一个 LLM

## 还没弄懂
- 注意力是"终极形态"吗？State Space Models（Mamba, S4）正在挑战注意力的二次
复杂度。线性注意力不需要 O(n²)
- 多头注意力的各个"头"真的学到了不同的东西吗？还是大部分头其实是冗余的？
论文说要验证，但我没找到权威的实验证据`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'DeepSeek', type: 'entity', lineIdx: 0 },
        { name: '自注意力', type: 'concept', lineIdx: 0 },
        { name: '多头注意力', type: 'concept', lineIdx: 0 },
        { name: '位置编码', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', '研究者'], summary: 'Google Brain团队，2017年发表"Attention Is All You Need"，提出Transformer架构。这篇论文终结了RNN时代，直接催生了BERT、GPT及随后所有现代大语言模型。' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Google于2018年发布的预训练语言模型，基于Transformer编码器。在11项NLP任务上刷新纪录，证明了"大规模预训练+下游微调"范式的强大。是Transformer从实验室走向工业应用的里程碑。' },
        { title: '自注意力机制', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'Transformer的核心机制：序列中每个词同时关注所有其他词，计算加权关系。使得并行处理成为可能，并能捕捉RNN无法维持的长距离依赖（超过50个token后RNN记忆衰减）。' },
        { title: '多头注意力', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: '并行运行多组注意力运算（通常8头），每组学习不同类型的关系。输出拼接后线性投影，使模型能联合关注不同表示子空间的信息。不同头会各自专精句法、语义、指代等模式。' },
        { title: '位置编码', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: '由于Transformer并行处理所有词，没有词序概念。位置编码通过叠加不同频率的正弦/余弦波到输入嵌入上，在不增加可训练参数的情况下编码位置信息。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: 'Transformer的注意力机制会被状态空间模型取代吗？',
      chatAnswerLead: { text: '[[注意力]]不是终极形态——[[状态空间模型]]（Mamba, S4）正在挑战其O(n²)的二次复杂度。SSM实现了与序列长度成[[线性比例]]的扩展，在长上下文任务上保持竞争性能。' },
      chatAnswerDetail: '但注意力拥有巨大的生态优势：GPT、Claude、Gemini等所有主流LLM都建立在它之上，GPU硬件也针对矩阵乘法优化。SSM需要证明的不仅是理论效率，还有大规模实践中的优越性，才能真正取代注意力。',
      chatSource: 'Transformer论文笔记.md',
    },

    {
      id: 'business',
      label: '商业决策',
      icon: 'trending-up',
      filename: 'Temu出海策略.md',
      sourceNoteContext: '一份竞争策略分析——拆解商业模式、增长杠杆和市场定位。那种产品经理、咨询顾问或创业者在重要战略决策前会写的研究笔记。',
      sourceNote: `# Temu 出海策略分析

Temu 上线不到两年，下载量超过 2 亿。靠的不是低价——中国跨境电商从来不缺低价。
它的真正策略被大多数人误读了。

## 核心策略不是"便宜"

**全托管模式才是真正的护城河**
传统跨境电商：商家负责选品、定价、物流、售后，平台只是流量入口。
Temu 全托管：商家只负责供货和报一个出厂价。定什么价、上什么渠道、
怎么发货、怎么退款——全部由 Temu 决定。

这意味着什么？Temu 不是"卖便宜货的电商"，而是"具有零售定价权
的全球供应链调度系统"。它掌握了从工厂到消费者之间的每一个环节的
全部数据。这个数据闭环，SHEIN 用 10 年做到，Temu 用 18 个月。

## 单位经济学的关键
- 航空小包直邮，单件履约成本约 $3–5，比亚马逊 FBA 便宜 60%
- 免运费门槛从 $10 提到 $29，证明履约成本正在被规模摊薄
- 但：退货率约 30%（服装品类），远超亚马逊的 15%。退货是 Temu
  最大的成本黑洞

## 争议与风险
- 美国国会正在推进 de minimis 规则修改（800 美元以下免税政策），
  若取消将直接冲击 Temu 的单位经济模型
- 品牌化缺失：用户记住的是"Temu 便宜"，记不住任何品牌
- SHEIN 和 TikTok Shop 正在加速追赶。拼多多在国内靠"五环外"起家
  ——但美国没有"五环外"这个需求结构

## 还没想清楚的问题
- Temu 的终局是"全球版的拼多多"还是"下一个 Wish"？
- 全托管模式的盈利路径：市场估算 Temu 每年烧掉 50–80 亿人民币。什么时候能回正？
- 如果 de minimis 取消，Temu 的应对方案是什么？海外仓？本土化？`,
      extractedItems: [
        { name: 'Temu', type: 'entity', lineIdx: 0 },
        { name: '拼多多', type: 'entity', lineIdx: 0 },
        { name: 'SHEIN', type: 'entity', lineIdx: 0 },
        { name: '全托管模式', type: 'concept', lineIdx: 0 },
        { name: '单位经济学', type: 'concept', lineIdx: 0 },
        { name: 'de minimis规则', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Temu', path: 'wiki/entities/temu.md', tags: ['跨境电商', '出海'], summary: '拼多多旗下跨境电商平台。核心创新为"全托管模式"——商家只供货，定价、物流、售后全部由平台决定。18个月内构建了覆盖全球的供应链调度系统，下载量超2亿。' },
        { title: 'SHEIN', path: 'wiki/entities/shein.md', tags: ['跨境电商', '快时尚'], summary: '中国快时尚跨境电商，Temu的核心竞争对手。用10年时间建立了从广州番禺工厂到全球消费者的数据闭环系统。其供应链柔性程度是传统快时尚品牌的5-10倍。' },
        { title: '全托管模式', path: 'wiki/concepts/full-service-model.md', tags: ['跨境电商', '商业模式'], summary: 'Temu的核心商业模式：商家只负责供货，平台掌握定价权、渠道选择、物流和售后。使Temu成为"具有零售定价权的全球供应链调度系统"，而非传统流量中介。' },
        { title: '单位经济学', path: 'wiki/concepts/unit-economics.md', tags: ['商业', '财务'], summary: 'Temu的单位经济：航空小包直邮单件履约成本$3-5（比亚马逊FBA便宜60%），退货率约30%（服装品类）是最大成本黑洞。de minimis规则若取消将直接冲击模型。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Temu 的终局是全球版的拼多多还是下一个 Wish？',
      chatAnswerLead: { text: 'Temu面临两个根本性挑战：[[品牌化缺失]]（用户记住的是"便宜"而非任何品牌）和[[政策风险]]（de minimis规则若取消，单位经济模型直接崩塌）。如果无法解决这两个问题，Temu可能成为下一个Wish——低价平台的典型失败案例。' },
      chatAnswerDetail: '但Temu也有拼多多不具备的优势：全托管模式积累的数据闭环、母公司的资金支持、以及供应链深度整合的能力。如果能利用这些优势建立品牌认知，并提前布局海外仓应对de minimis风险，Temu有机会成为真正的全球零售基础设施。',
      chatSource: 'Temu出海策略.md',
    },
  ],
};