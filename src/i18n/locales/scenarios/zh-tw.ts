import type { ScenariosTranslation } from './types';

export const zhTw: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: '日常生活',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: '一篇健康科學的參考筆記——彙整了關於睡眠結構、睡眠負債以及實用睡眠衛生習慣的關鍵研究。正是那種你會為了改善自身健康而收藏的文章。',
      sourceNote: `# 為什麼我們需要睡眠：核心發現

睡眠是我們能重置大腦與身體的單一最有效手段。

## 睡眠結構
- NREM 第三階段（深層睡眠）：生理修復、免疫功能
- REM：情緒處理、創造力、記憶鞏固
- 每個週期約 90 分鐘,每晚理想為 4-5 個週期

## 睡眠負債的代價
- 連續一週每晚睡 6 小時：認知表現相當於血液酒精濃度 0.05%
- 慢性睡眠負債與阿茲海默症相關——膠淋巴系統清除率下降 60%
- 健康年輕男性睡 5 小時 → 睪固酮下降 10–15%

## 實用的睡眠衛生
- 最佳臥室溫度：18–19°C
- 睡前 90 分鐘避免藍光——黑色素光蛋白對 480nm 波長最為敏感
- 咖啡因半衰期 6 小時：最後攝取應在下午 2 點前
- 起床時間的固定比就寢時間的固定更為重要

## 未解的問題
- 午睡能否補償夜間睡眠不足？證據不一
- 褪黑激素：0.3mg 與 3mg 同樣有效。多數補充劑劑量過高`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: '膠淋巴系統', type: 'entity', lineIdx: 0 },
        { name: '睡眠結構', type: 'concept', lineIdx: 0 },
        { name: '睡眠負債', type: 'concept', lineIdx: 0 },
        { name: '咖啡因', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: '膠淋巴系統', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: '大腦的廢物清除系統,主要於深層睡眠期間運作。慢性睡眠剝奪會使膠淋巴清除率降低多達 60%,將睡眠不足與阿茲海默症風險連結起來。' },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: '神經科學家暨睡眠研究者,《為什麼我們要睡覺》作者。證明了深層睡眠在膠淋巴清除中的關鍵角色,以及睡眠負債的累積認知成本。' },
        { title: '睡眠結構', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: '睡眠週期的結構：NREM 第三階段負責生理修復與免疫功能,REM 負責情緒處理與記憶鞏固。每個週期約 90 分鐘,每晚理想為 4-5 個週期。' },
        { title: '睡眠負債', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: '睡眠不足的累積效應。連續一週每晚睡 6 小時,認知表現相當於血液酒精濃度 0.05%。與荷爾蒙失調、胰島素敏感性降低,以及前額葉皮質退化相關。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: '慢性睡眠剝奪會如何影響長期的大腦健康？',
      chatAnswerLead: { text: '[[慢性睡眠剝奪]]會損害[[膠淋巴系統]]——這是大腦在深層睡眠期間運作的廢物清除機制。研究顯示,持續睡眠不足會使清除率降低多達 60%,直接連結到神經退化性疾病的風險。' },
      chatAnswerDetail: '除了膠淋巴功能失調之外,睡眠負債還會擾亂睪固酮分泌（睡 5 小時下降 10–15%）、損害胰島素敏感性,並使前額葉皮質功能退化——而前額葉皮質正是負責決策與衝動控制的區域。',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: '深度閱讀',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: 'Kahneman 經典著作的個人閱讀筆記——不是摘要,而是真正改變了我對決策的理解的那些洞見。那種讀完一本讓你心智模型煥然一新的書後,你會寫下的筆記。',
      sourceNote: `# 《快思慢想》閱讀筆記

Kahneman 的雙系統認知模型。核心論點：我們自認理性,實則受制於直覺的系統 1,
系統 1 會犯下系統性的錯誤。

## 系統 1 與系統 2
- 系統 1：快速、自動、不費力。辨識面孔、察覺語氣中的敵意、回答 2+2。隨時運作
- 系統 2：緩慢、審慎、需要努力。計算 17×24、填寫稅單、檢驗邏輯論證的有效性。
  會懶洋洋地預設為系統 1 的判斷

核心問題：系統 2 很懶。它會在未經審查的情況下認可系統 1 的即時判斷。
這正是大多數認知偏誤的源頭。

## 重要的啟發法與偏誤

**可得性啟發法**
我們以例子的浮現難易來判斷頻率。鯊魚攻擊感覺比糖尿病併發症更常見,
因為媒體報導讓前者栩栩如生——然而糖尿病每年奪走的生命是鯊魚攻擊的 20 萬倍。

**定錨效應**
接觸到某個數字會定錨後續的判斷。房地產經紀人看到比平均值高 15% 的估價時,
後續估價也會偏高——即使他們堅稱定錨沒有影響。這個效應在潛意識中運作。

**損失厭惡**
損失的痛苦大約是等量收益所帶來快感的兩倍。這解釋了：
- 投資人緊抱虧損的股票、賣出漲幅的股票（處分效應）
- 「免運費」比「折抵 5 美元」更有效
- 即使經通膨調整後實質薪資上升,減薪仍會引發憤怒

## 前景理論（諾貝爾級洞見）
效用是參考點依賴的。我們相對於參考點而非絕對值來評估結果。
拿到 1,000 美元獎金感覺很好;但同事拿到 2,000 美元、你只拿 1,000 美元時,感覺像是損失。

## 我的收穫
- 在任何重大決策之前,強制啟動系統 2：寫下問題、列出可能涉及的偏誤、睡一覺再決定
- 開會時：除非你想定錨整個討論,否則永遠不要先報數字
- 個人財務：自動化決策（交給系統 1）以保護儲蓄免於衝動消費。設定好就不管它

## 仍在思考的問題
- 系統 1 能被訓練嗎？西洋棋大師的模式辨識能力似乎證明可以
- 有沒有系統 1 表現優於系統 2 的領域？（《決斷 2 秒間》vs. 深思熟慮？）
- 這與 LLM 推理的關係為何？LLM 是純粹的系統 2,還是能模擬系統 1 的直覺？`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: '系統 1', type: 'concept', lineIdx: 0 },
        { name: '系統 2', type: 'concept', lineIdx: 0 },
        { name: '可得性啟發法', type: 'concept', lineIdx: 0 },
        { name: '定錨效應', type: 'concept', lineIdx: 0 },
        { name: '損失厭惡', type: 'concept', lineIdx: 0 },
        { name: '前景理論', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: '以色列裔美國心理學家,因前景理論獲 2002 年諾貝爾經濟學獎。他與 Amos Tversky 合作開創行為經濟學,揭示了主導人類決策的系統性認知偏誤。' },
        { title: '系統 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: '快速、自動且不費力的思維系統,持續運作。它辨識模式、做出即時判斷、依賴直覺。它正是大多數認知偏誤的源頭,因為它在意識之下運作。' },
        { title: '系統 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: '緩慢、審慎且費力的思維系統,負責複雜推理、邏輯分析與有意識的決策。它天生懶惰,經常預設為認可系統 1 的判斷而不加以驗證。' },
        { title: '定錨效應', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: '一種認知偏誤：接觸到初始數字會不成比例地影響後續判斷。這個效應在潛意識中運作——即使是聲稱不受影響的專家,在受控實驗中仍會展現完整的定錨效應。' },
        { title: '前景理論', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: '由 Kahneman 與 Tversky 提出,前景理論顯示人們相對於參考點而非絕對值來評估結果。效用是參考點依賴的——同一個結果,在不同的框架下感覺截然不同。' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '系統 1 與系統 2 在決策中如何互動？',
      chatAnswerLead: { text: '[[系統 1]]持續生成直覺與即時判斷,而[[系統 2]]多數時候懶洋洋地認可這些判斷,未加以驗證。有效的決策需要刻意強制啟動[[系統 2]]——寫下問題、列出可能的偏誤、睡一覺再行動。' },
      chatAnswerDetail: 'Kahneman 的核心洞見是：系統 2 不是系統 1 的可靠守門員。它需要有意識的努力才能啟動,而大多數時候它只是在為系統 1 已做出的決定進行合理化。',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: '靈感捕捉',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: '一段時間累積保存的網頁剪藏——文章、隨筆、訪談,共享一條主軸：如何更好地思考。那種你抱著期待它們終將彼此串連而收集的片段。',
      sourceNote: `# 心智模型與思考 —— 剪藏集

隨性的彙整。每當某個心智模型在不同書籍或對話中反覆出現,我就會加進來。

## 關於事實與信念
> 剪自 James Clear
「人類需要對世界有合理準確的認知才能在其中航行。但『準確』並不是我們大腦唯一優先
的事。如果一個大腦預期某個信念能帶來回報,它會欣然採用。結果是,人們持有錯誤的信念
並非因為它們為真,而是因為它們服務於某種社會目的——它們幫助我們與所屬群體建立連結。」

## 如何為自己而思考
> 剪自 Paul Graham
「有些工作,除非你與同儕的思考方式不同,否則做不好。難處在於人們常常誤判自己在光譜
上的位置。最從眾的人自信地認為自己很獨立,而真正獨立的人反而擔心自己獨立得不夠。」

## 二階思考
> 剪自 Farnam Street
「一階思考是簡化且表面的,幾乎人人都做得到。二階思考是追蹤一個決策所引發的後果
鏈。許多非凡的成果來自於那些一階為負、二階為正的決定。」

## 反向思考
> 剪自 Farnam Street
「反向思考的核心前提是：你不應該只從一個方向處理困難的問題。相反地,要同時從正向與
反向檢視它。Charlie Munger：『我只想知道我会死在什麼地方,這樣我就永遠不去那裡。』」

## 關於預測
> 剪自 Morgan Housel
「多數問題比看起來更複雜,但多數解方應該比它們實際呈現的更簡單。少讀預測、多讀歷史。
多研究失敗、少研究成功。」

## 我想連結的關係
- 事實 vs 信念 → 社會連結機制？
- 二階思考 + 反向思考 → 兩者都獎賞深度而非廣度
- Graham 的光譜 → 我如何知道自己真正落在哪裡？`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: '二階思考', type: 'concept', lineIdx: 0 },
        { name: '反向思考', type: 'concept', lineIdx: 0 },
        { name: '獨立思考', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: '《原子習慣》作者,撰寫關於決策、習慣與人類行為的文章。他的工作探討了為何人們會持有錯誤信念,以及社會認同如何形塑我們覺得「有說服力」的內容。' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Y Combinator 共同創辦人,也是深具影響力的隨筆作家,主題涵蓋新創、科技與思考。他的隨筆〈如何為自己而思考〉將獨立思考拆解為三個面向：對真相的挑剔、對從眾的抵抗,以及好奇心。' },
        { title: '二階思考', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: '追蹤超越當下結果的後果鏈的實踐。許多非凡的成果來自於那些一階為負、二階為正的決策。關鍵技巧：反覆追問「然後呢？」' },
        { title: '反向思考', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: '一種同時從正向與反向檢視問題的解題方法。與其問如何達成目標,不如問如何確保失敗——然後避開那些事。「避免愚蠢比追求卓越更容易。」' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: '二階思考與反向思考之間的共同主軸是什麼？',
      chatAnswerLead: { text: '[[二階思考]]與[[反向思考]]都獎賞深度而非廣度,並要求抗拒系統 1 的即時直覺。二階思考向前追蹤後果;反向思考向後追蹤失敗。兩者都迫使你超越顯而易見的層次。' },
      chatAnswerDetail: '兩者的差異在於：二階思考是加法（還會發生什麼？）,反向思考是減法（我應該避開什麼？）。兩者結合,構成一個強大的決策框架：用反向思考淘汰糟糕的選項,再用二階思考評估剩下的選項。',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: '內容創作',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: '一集 Podcast 節目的製作企劃——來賓研究、結構化提問、敘事弧線。那種能區分精心準備的深度訪談與閒聊的文件。',
      sourceNote: `# 《知識堆疊》第 12 集節目企劃

來賓：Dr. Andy Matuschak（獨立研究者、前 Apple、前 Khan Academy）
主題：「思考工具與閱讀的未來」

## 來賓背景
- 在 Khan Academy 領導精通式學習演算法的研發
- 在 Apple 參與早期 iPad 教育計畫
- 如今經營獨立研究實驗室,研究思考工具
- 知名於：「Evergreen notes」方法論、「Working in public」研究實踐
- 他的隨筆「Why books don't work」在 PKM 社群引發重大辯論

## 核心提問
1. 你寫過「books don't work」——大多數人會忘記所讀的 90%。一個「有效」的知識傳遞媒介應該長什麼樣？
2. 你的「evergreen notes」系統強調原子化與漸進式摘要。這與傳統筆記有何不同？
3. 你一直大聲疾呼思考工具研究與主流採用之間的落差。最大的阻礙是什麼？
4. 當 LLM 現在能即時回答任何書的問題時,2026 年人類閱讀的角色是什麼？
5. 你的研究實踐極度開放——你每天都發表半成品思考。這不會製造雜訊嗎？你如何平衡深度與速度？

## 提及的關鍵參考資料
- Matuschak, A. (2019).「Why books don't work」
- Nielsen, M. (2018).「Augmenting human intellect」
- Engelbart, D. (1962).「Augmenting Human Intellect」——所有 demo 的原點

## 錄製後待釐清的問題
- 錄製前是否應該讀完 Andy 的「Evergreen notes」全文？
- 是否需要第二位來賓提供對比觀點？
- 錄製形式：非同步語音備忘錄還是即時影音？`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: '思考工具', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: '研究思考工具的獨立研究者。曾任職於 Khan Academy 與 Apple。知名於「Why books don\'t work」隨筆,以及「evergreen notes」這種原子化、互相連結的知識管理方法論。' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: '由 Sal Khan 創立的線上教育平台。以精通式學習演算法與翻轉教室模式聞名。Matuschak 在其任內領導適應性學習系統的研發。' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: '一種強調原子化、概念導向與漸進式摘要的筆記方法論。筆記被書寫為永久有用且持續精煉,而非捕捉稍縱即逝的想法。' },
        { title: '思考工具', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: '用以增強人類思考、記憶與創造力的軟體與系統。起源於 Engelbart 1962 年的「Augmenting Human Intellect」。關鍵挑戰：縮小研究原型與主流採用之間的落差。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Evergreen notes 與傳統筆記之間的核心差異是什麼？',
      chatAnswerLead: { text: '[[Evergreen notes]]被書寫為永久有用且持續精煉,而傳統筆記只是捕捉短期回憶用的稍縱即逝想法。Evergreen notes 強調[[原子化]]（一個想法一篇筆記）、[[概念導向]]（以概念而非來源命名）,以及[[漸進式摘要]]（多層次的萃取）。' },
      chatAnswerDetail: '關鍵轉變是從「我讀了什麼？」轉向「我相信什麼？」。傳統筆記是書目性的;Evergreen notes 是認識論性的。這讓它們可組合——你可以透過連結原子化筆記來建構新想法,不必重讀原始資料。',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: '學術研究',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: '一篇劃時代 AI 論文的研究筆記——那種當你需要真正理解其基礎而非只讀標題時才會做的深度研讀。Vaswani 等人,2017。',
      sourceNote: `# 〈Attention Is All You Need〉閱讀筆記

終結 RNN、催生 Transformer 的那篇論文。Vaswani 等人,2017。

## 核心構想
不再以序列方式（RNN 風格）處理 token,而是平行處理一切,使用「注意力」——
讓每個 token 觀察所有其他 token,並決定哪些是重要的。關鍵洞見：序列處理是瓶頸,
而非特性。

## 三種注意力機制
- 自注意力（Self-Attention）：句子中每個詞都對所有其他詞施加注意力。這捕捉了 RNN
在約 50 個 token 後會喪失的長距離依賴
- 多頭注意力（Multi-Head Attention）：平行執行 8 組注意力運算,每組學習不同類型的
關係（句法、語義、指代）。將結果串接起來。每個頭各自專精不同面向
- 縮放點積：Q·K^T 除以 sqrt(d_k)。少了這個縮放因子,梯度在高維下會爆炸

## 位置編碼
既然沒有循環結構,模型對詞序一無所知。解法：在輸入嵌入上加入不同頻率的
正弦/餘弦波。這讓模型獲得位置資訊,卻不增加任何參數。

## 為何這改變了一切
- 訓練可平行化（RNN 逐 token 訓練,Transformer 一次處理整個序列）→ 資料規模得以放大
- 長距離依賴：RNN 的記憶約 50 個 token;Transformer 沒有固定上限（受限於脈絡長度,
而脈絡長度已從 512 成長到 1M+ token）
- 這篇論文直接催生了：BERT（2018）、GPT（2018+）,以及每一個現代 LLM

## 未解的問題
- 注意力真的是最終形態嗎？狀態空間模型（Mamba、S4）正挑戰注意力的二次方複雜度
- 多個頭真的學到不同的模式,還是冗餘的？`,
      extractedItems: [
        { name: 'Vaswani 等人', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: '自注意力', type: 'concept', lineIdx: 0 },
        { name: '多頭注意力', type: 'concept', lineIdx: 0 },
        { name: '位置編碼', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani 等人', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: 'Google Brain 團隊,2017 年發表〈Attention Is All You Need〉,提出 Transformer 架構。他們的工作取代了 RNN、實現了規模化平行訓練,並直接催生了 BERT、GPT 與每一個現代 LLM。' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Google 於 2018 年發表的雙向編碼器表示模型。直接建立在 Transformer 的編碼器堆疊之上,BERT 在 11 項 NLP 任務上刷新紀錄,展現了預訓練加上微調的強大威力。' },
        { title: '自注意力', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'Transformer 的核心機制：序列中每個 token 同時對所有其他 token 施加注意力,計算加權關係。實現了平行處理,並能捕捉 RNN 約 50 個 token 限制之外的長距離依賴。' },
        { title: '多頭注意力', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: '平行執行多組注意力運算（通常為 8 頭）,每組學習不同類型的關係（句法、語義、指代）。輸出經串接與投影,使模型能跨不同表示子空間進行聯合注意力。' },
        { title: '位置編碼', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: '由於 Transformer 平行處理所有 token,它天生沒有詞序概念。位置編碼在輸入嵌入上加入不同頻率的正弦/餘弦波,以編碼位置資訊,同時不增加可訓練參數。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: '注意力是最終形態,還是會被狀態空間模型取代？',
      chatAnswerLead: { text: '[[注意力]]並非最終形態——[[狀態空間模型]]（Mamba、S4）已經在挑戰其 O(n²) 的複雜度。SSM 實現了[[線性擴展]],在長脈絡任務上仍維持有競爭力的表現。' },
      chatAnswerDetail: '然而,注意力擁有巨大的生態系優勢：每一個主流 LLM（GPT、Claude、Gemini）都建立在它之上,而 GPU 硬體也針對矩陣乘法最佳化。SSM 需要證明的不只是理論效率,還包括規模化時的實務優勢,才能完全取代注意力。',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: '商業決策',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: '一份競爭策略分析——拆解商業模式、成長槓桿與市場定位。那種產品經理、顧問或創業家在重大策略決策前會寫的研究筆記。',
      sourceNote: `# Stripe 的策略演進

## 從開發者工具到經濟基礎設施

Stripe 起步時是「7 行程式碼搞定付款」。但這個框架掩蓋了真正的策略：
他們不是靠「把付款變簡單」取勝——他們是讓開發者成為買家。

## 關鍵策略動作
- **API 優先的分銷**：每一位整合 Stripe 的開發者都成為內部倡議者。中小企業市場
  不需要業務團隊
- **複合產品**：付款 → 訂閱 → 稅務 → 財資 → 發卡。每個產品都運用前一層的資料。
  轉換成本以指數級增加——你可以替換一家付款處理商,但你無法替換整套金融堆疊
- **繞過卡組織**：Stripe 與 Visa/Mastercard 的直接整合,移除了收單行中間人。
  相較於透過傳統收單行的競爭對手,估計有 15–25 個基點的利潤優勢

## 營收模式
- 每筆交易 2.9% + $0.30（核心付款）
- 訂閱/稅務/Radar：每筆交易額外 0.4–0.8%
- 非付款產品（Link、Capital、Atlas）營收占比持續成長
- 估計 1 兆美元以上的總支付量（2023 年）,意味著 140 億美元以上的淨營收

## 競爭位置
- vs Adyen：Stripe 贏在開發者體驗;Adyen 贏在企業客戶
- vs Square：Stripe 線上優先;Square 實體優先。兩者正在匯流
- 威脅：大型商家（Shopify、DoorDash）自行建置

## 未解的問題
- Stripe 能否在不擴張到借貸/借貸相關業務的情況下維持成長？
- 中國/東南亞的擴張仍然有限——是監管障礙還是策略選擇？`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'API 優先分銷', type: 'concept', lineIdx: 0 },
        { name: '複合產品', type: 'concept', lineIdx: 0 },
        { name: '卡組織經濟學', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: '成立於 2010 年的支付基礎設施公司。核心策略：API 優先分銷,以開發者為買家,再擴張為複合產品（訂閱、稅務、財資、發卡）。估計有 1 兆美元以上的支付量與 140 億美元以上的淨營收。' },
        { title: 'Visa 與 Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: '主導全球的卡組織,處理大多數消費者付款。支付處理商必須與其基礎設施互動——繞過收單行的直接整合可帶來 15–25 個基點的利潤優勢。' },
        { title: 'API 優先分銷', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: '一種透過 API 將產品分銷給開發者的市場進入策略。每一個整合者都成為內部倡議者,創造由下而上的採用,不需要傳統業務團隊。Stripe 是典型代表。' },
        { title: '複合產品策略', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: '建立互相連結的產品,每個新層都運用前一層的資料。轉換成本以指數級增加——替換單一產品容易,替換整套堆疊則幾乎不可能。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Stripe 能在不擴張到借貸業務的情況下維持成長嗎？',
      chatAnswerLead: { text: '[[Stripe]]面臨典型的成長天花板：付款處理的利潤正在被壓縮（2.9% + $0.30 的費率已承受 Shopify、DoorDash 自建系統的壓力）。Stripe 要嘛擴張到更高利潤的鄰接服務（借貸、資本）,要嘛接受較低的成長率。' },
      chatAnswerDetail: '複合產品策略正是 Stripe 的答案：每一層都建立在前一層之上,讓整個堆疊越來越難被取代。但借貸是利潤最高的金融服務——也是 Stripe 一直最謹慎進入的一個。',
      chatSource: 'stripe-strategy.md',
    },
  ],
};