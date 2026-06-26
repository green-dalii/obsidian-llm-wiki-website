import type { ScenariosTranslation } from './types';

export const ja: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: '日常生活',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: '健康科学のリファレンスノート——睡眠構造、睡眠負債、実用的な衛生習慣に関する重要な研究をまとめたもの。自分の健康を改善するために保存するであろう記事。',
      sourceNote: `# 『Why We Sleep』主要な知見

睡眠は、脳と身体をリセットするために最も効果的な行動です。

## 睡眠の構造
- NREM ステージ 3（深睡眠）：身体修復、免疫機能
- REM：感情処理、創造性、記憶の定着
- 1サイクル約 90 分、1晩に 4〜5 サイクルが理想

## 睡眠負債の代償
- 1週間 6 時間睡眠を続けると：認知パフォーマンスは血中アルコール濃度 0.05% 相当
- 慢性的睡眠負債はアルツハイマー病と関連する——グリンパティッククリアランスが 60% 低下
- 5 時間睡眠 → 健康な若年男性でもテストステロンが 10〜15% 低下

## 実践的な睡眠衛生
- 寝室の最適温度：18〜19°C
- 就寝 90 分前からブルーライトを避ける——メラノプシンの感度は 480nm でピーク
- カフェインの半減期は 6 時間：最終摂取は 14 時までに
- 就寝時刻より起床時刻の一貫性の方が重要

## 未解決の問題
- 昼寝で夜の睡眠負債は補えるか？エビデンスは混在
- メラトニン：0.3mg で 3mg と同等の効果。市販サプリの多くは過剰投与`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'グリンパティック系', type: 'entity', lineIdx: 0 },
        { name: '睡眠構造', type: 'concept', lineIdx: 0 },
        { name: '睡眠負債', type: 'concept', lineIdx: 0 },
        { name: 'カフェイン', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'グリンパティック系', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: '主に深睡眠中に作動する脳の老廃物除去システム。慢性的睡眠不足により除去能力は最大 60% 低下し、睡眠の質の低下とアルツハイマー病リスクの関連を裏付けている。' },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: '神経科学者・睡眠研究者、『Why We Sleep』の著者。深睡眠におけるグリンパティッククリアランスの重要な役割と、睡眠負債がもたらす累積的な認知コストを実証した。' },
        { title: '睡眠構造', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: '睡眠サイクルの構造：身体修復と免疫機能は NREM ステージ 3、感情処理と記憶の定着は REM が担う。1サイクルは約 90 分で、1晩に 4〜5 サイクルが理想的とされる。' },
        { title: '睡眠負債', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: '慢性的な睡眠不足がもたらす累積的影響。1週間 6 時間睡眠を続けると、認知パフォーマンスは血中アルコール濃度 0.05% 相当に低下する。ホルモン分泌障害、インスリン感受性の低下、前頭前野の退化とも関連する。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: '慢性的睡眠不足は長期的な脳の健康にどのように影響しますか？',
      chatAnswerLead: { text: '[[慢性的な睡眠不足]]は[[グリンパティック系]]——深睡眠中に作動する老廃物除去機構——を損ないます。研究によると、持続的な睡眠不足により除去能力は最大 60% 低下し、神経変性疾患のリスクと直接的に結びつきます。' },
      chatAnswerDetail: 'グリンパティック機能障害に加えて、睡眠負債はテストステロン生成を乱し（5 時間睡眠で 10〜15% 低下）、インスリン感受性を損ない、意思決定と衝動制御を担う前頭前野の機能を退化させます。',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: '深い読書',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: 'カーネマンの古典から取った個人的な読書ノート——要約ではなく、意思決定に関する考え方を実際に変えた部分を抜粋したダイジェスト。何かを読むことで本当にメンタルモデルが更新された後に書くようなノート。',
      sourceNote: `# 『Thinking, Fast and Slow』読書ノート

カーネマンの認知に関する二重プロセスモデル。テーゼ：私たちは合理的だと思っ
ているが、実際には体系的な誤りをもたらす直感的なシステム 1 に支配されている。

## システム 1 とシステム 2
- システム 1：高速、自動的、努力不要。顔認識、声の敵意の検出、2+2 の暗算。
  常時稼働
- システム 2：低速、慎重、努力が必要。17×24 の暗算、税務書類の記入、論理的
  な議論の妥当性検証。怠惰で、システム 1 にデフォルトで同意する

核心的な問題：システム 2 は怠惰である。システム 1 の瞬間的な判断をチェック
せず承認してしまう。ここがほとんどの認知バイアスの源泉である。

## 主なヒューリスティックとバイアス

**利用可能性ヒューリスティック**
頻度判断は、事例がどれくらい容易に想起されるかによって行われる。サメの襲撃は
糖尿病合併症より頻繁に感じられる——メディア報道がそれを生き生きと描写する
からだ——しかし糖尿病は年間 20 万倍も多く人を死亡させている。

**アンカリング**
数字に曝露されると、その後の判断がその数字に縛られる。不動産エージェントは
低い推定価格を見せられたエージェントより 15% 高い見積もりを見せられる——
アンカリングは影響しないと主張してもなお。この効果は無意識に作用する。

**損失回避**
損失の痛みは、同等の利益の喜びの約 2 倍である。これが以下を説明する：
- 人は負け株を保有し、勝ち株を売る（処分効果）
- 「送料無料」は「5 ドル引き」より効果的
- 給与カットは、インフレ調整後で給与が上昇していても、激しい怒りを買う

## プロスペクト理論（ノーベル賞受賞の洞察）
効用は参照依存的である。結果を絶対的な値ではなく、参照点との相対関係で評価
する。1,000 ドルのボーナスは嬉しい；同僚が 2,000 ドルもらったときの
1,000 ドルのボーナスは損失のように感じる。

## 私の学び
- 重要な意思決定の前には必ずシステム 2 を起動させる：問題を書き出し、該当し
  うるバイアスを列挙し、一晩寝かせる
- 会議：議論をアンカリングしたい場合を除いて、最初に数字を提示しない
- 個人の財務：意思決定を自動化する（システム 1）ことで、衝動的な支出から
  貯蓄を守る。設定したら忘れてしまう

## まだ考え中の問い
- システム 1 は訓練できるか？チェスのグランドマスターのパターン認識は可能
  性を示唆している
- システム 1 がシステム 2 を上回る領域はあるか？（熟考 vs. 直感）
- これは LLM の推論とどう相互作用するか？LLM は純粋なシステム 2 か、
  それともシステム 1 の直感をシミュレートできるか？`,
      extractedItems: [
        { name: 'ダニエル・カーネマン', type: 'entity', lineIdx: 0 },
        { name: 'システム 1', type: 'concept', lineIdx: 0 },
        { name: 'システム 2', type: 'concept', lineIdx: 0 },
        { name: '利用可能性ヒューリスティック', type: 'concept', lineIdx: 0 },
        { name: 'アンカリング', type: 'concept', lineIdx: 0 },
        { name: '損失回避', type: 'concept', lineIdx: 0 },
        { name: 'プロスペクト理論', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'ダニエル・カーネマン', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: 'イスラエル系アメリカ人の心理学者。プロスペクト理論により 2002 年ノーベル経済学賞を受賞。アモス・トヴェルスキーとの共同研究は行動経済学の基礎を築き、人間の意思決定を支配する体系的な認知バイアスを明らかにした。' },
        { title: 'システム 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: '高速で自動的、かつ努力を要しない思考システム。常時稼働し、パターンを認識し、瞬間的に判断を下し、直感に頼る。意識下に作動するため、ほとんどの認知バイアスの源泉となる。' },
        { title: 'システム 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: '低速で慎重、かつ努力を要する思考システム。複雑な推論、論理的分析、意識的な意思決定を担う。本質的に怠惰で、システム 1 の判断を検証せず承認してしまうことが多い。' },
        { title: 'アンカリング効果', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: '最初の数字に曝露されることで、その後の判断が不釣り合いに影響を受ける認知バイアス。影響を受けていないと主張する専門家でも、制御された実験では完全なアンカリング効果を示す。' },
        { title: 'プロスペクト理論', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'カーネマンとトヴェルスキーによって提唱された理論。人々は結果を絶対的な値ではなく参照点との相対関係で評価することを示す。効用は参照依存的であり、同じ結果もフレーミング次第で異なる感情を生む。' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'システム 1 とシステム 2 は意思決定においてどのように相互作用しますか？',
      chatAnswerLead: { text: '[[システム 1]]は直感と瞬間的な判断を継続的に生成し、[[システム 2]]はそのほとんどを検証せずに承認してしまいます。効果的な意思決定には、意識的に[[システム 2]]を起動させることが必要です——問題を書き出し、想定されるバイアスを列挙し、一晩寝かせてから行動するのです。' },
      chatAnswerDetail: 'カーネマンの重要な洞察は、システム 2 はシステム 1 の信頼できるチェック機能ではないということです。起動には意識的な努力が必要であり、ほとんどの場合、システム 1 がすでに下した判断を合理化するだけに過ぎません。',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'インスピレーション',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: '時間をかけて保存したウェブ記事のクリップ集——共通するテーマを持つ記事、エッセイ、インタビュー：より良く考える方法について。いつか繋がることを期待して集めるスクラップのようなもの。',
      sourceNote: `# メンタルモデルと思考——クリップ集

ランダムな集大成。メンタルモデルが複数の本や会話に登場したときに、随時追加している。

## 事実と信念について
> James Clear からクリップ
「人間は世界をナビゲートするために、ある程度正確な世界の見方を必要としている。しかし
『正確であること』は心が優先する唯一のものではない。もし脳が特定の信念を採用すること
による報酬を予期するなら、その信念を採用することに何の問題もない。結果として、誤った信念は
それが真実だからではなく、社会的目的に資するからこそ保持され得る——それは我々が自分の
トライブと絆を深める助けとなる。」

## 自分の頭で考えるには
> Paul Graham からクリップ
「同業者と異なる考え方をしなければうまくできない種類の仕事がある。困難は、人々が
自分がスペクトラム上のどこにいるかについてしばしば誤認していることである。最も
conventional-minded な人々は、自分が independent-minded だと確信している。対して
本当に independent-minded な人々は、自分が十分に independent-minded ではないかも
しれないと心配する。」

## 二段階思考
> Farnam Street からクリップ
「一段階思考は単純で表面的であり、ほとんどすべての人ができる。二段階思考は、決定から
生じる結果の連鎖を追跡する習慣である。多くの非凡な成果は、一段階では否定的だが
二段階では肯定的である決定から生まれる。」

## インバージョン
> Farnam Street からクリップ
「インバージョンの核となる前提は、難しい問題を一方の方向からのみアプローチしてはならない
ということである。代わりに、前方と後方の両方から検証する。チャーリー・マンガー：
『私が知りたいのは、自分がどこで死ぬかということだけだ。そうすればそこには行かないからな。』」

## 予測について
> Morgan Housel からクリップ
「ほとんどの問題は見た目より複雑だが、ほとんどの解決策は現状よりシンプルであるべきだ。
予測はより少なく、歴史をもっと読め。失敗をより多く研究し、成功をより少なく研究せよ。」

## 繋げたいこと
- 事実 vs 信念 → 社会的絆のメカニズム？
- 二段階思考 + インバージョン → どちらも幅より深さを重視する
- Graham のスペクトラム → 自分が実際にどこにいるかを知るには？`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'チャーリー・マンガー', type: 'entity', lineIdx: 0 },
        { name: '二段階思考', type: 'concept', lineIdx: 0 },
        { name: 'インバージョン', type: 'concept', lineIdx: 0 },
        { name: '独立した思考', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: '『Atomic Habits』の著者。意思決定、習慣、人間の行動に関するライター。彼の研究は、なぜ人々が誤った信念を保持するのか、そして社会的アイデンティティが何を説得力あるものにするかをどう形作るかを探求している。' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Y Combinator の共同創業者で、スタートアップ、技術、思考に影響力のあるエッセイスト。「How to Think for Yourself」は独立した思考を 3 つの構成要素——真理への細心さ、慣習への抵抗、好奇心——に分解している。' },
        { title: '二段階思考', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: '即時の結果を超えて結果の連鎖を追跡する習慣。多くの非凡な成果は、一段階では否定的だが二段階では肯定的である決定から生まれる。重要な技法：繰り返し「それでどうなる？」と問うこと。' },
        { title: 'インバージョン', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: '問題を前方と後方の両方から検証する問題解決手法。成果をどのように達成するかではなく、その逆をどのように保証するかを問い——それらのことを避ける。「愚かさを避けることは、 brilliance を探すより容易い。」' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: '二段階思考とインバージョンの共通点は何ですか？',
      chatAnswerLead: { text: '[[二段階思考]]と[[インバージョン]]はどちらも幅より深さを重視し、システム 1 の即時の直感に抵抗することを要求します。二段階思考は結果を前方へ辿り、インバージョンは失敗を後方へ辿ります。どちらも明らかなことの先を見ることを強制します。' },
      chatAnswerDetail: '相違点：二段階思考は加算的（他に何が起きるか？）であるのに対し、インバージョンは減算的（何を避けるべきか？）である。併用すれば強力な意思決定フレームワークになる：インバージョンで悪い選択肢を排除し、二段階思考で残った選択肢を評価する。',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'コンテンツ制作',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: 'ポッドキャストエピソードの制作企画書——ゲストのリサーチ、構造化された質問、物語の構成。十分に準備されたインタビューと、とりとめのない会話を区別する種類のドキュメント。',
      sourceNote: `# The Knowledge Stack — 第 12 回企画

ゲスト：Dr. Andy Matuschak（独立研究者、元 Apple、元 Khan Academy）
テーマ：「思考のための道具と読書の未来」

## ゲストの背景
- Khan Academy で習熟度学習アルゴリズムの R&D を主導
- Apple で初期の iPad 教育イニシアチブに従事
- 現在、思考のための道具を研究する独立研究所を運営
- 著名な業績：「Evergreen notes」メソッド、「Working in public」研究実践
- 彼の essay "Why books don't work" は PKM コミュニティで大きな議論を巻き起こした

## 核となる質問
1. あなたは「books don't work」と書いた——ほとんどの人が読んだ内容を 90% 忘れる。
   知識伝達のための「機能する」メディアとはどのようなものだろうか？
2. あなたの「evergreen notes」システムは atomicity と progressive summarization を重視する。
   これは伝統的なノートテイキングとどう違うか？
3. あなたは思考のための道具の研究と主流採用のギャップについて声を上げてきた。
   最大の障壁は何ですか？
4. LLM が今やあらゆる本について即座に質問に答えられる時代において、
   2026 年における人間の読書の役割は何ですか？
5. あなたの研究実践は徹底的にオープンである——未完成の思考を毎日公開している。
   これはノイズを生まないか？深さとスピードのバランスをどう取っていますか？

## 言及すべき重要な参考文献
- Matuschak, A. (2019). "Why books don't work"
- Nielsen, M. (2018). "Augmenting human intellect"
- Engelbart, D. (1962). "Augmenting Human Intellect"——すべてのデモの母

## インタビュー後の未解決の問い
- 録音前に Andy's 完全な "Evergreen notes" essay を読むべきか？
- カウンターポイントのゲストが必要か？
- 録音の形式：非同期のボイスメモ、それともライブビデオ？`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'ダグラス・エンゲルバート', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: '思考のための道具', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: '思考のための道具を研究する独立研究者。元 Khan Academy と Apple 所属。「Why books don\'t work」エッセイと、atomic で linked なナレッジマネジメントのための「evergreen notes」メソッドで知られる。' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: 'Sal Khan が設立したオンライン教育プラットフォーム。習熟度学習アルゴリズムと反転授業モデルで知られる。Matuschak は在籍期間中、適応学習システムの R&D を主導した。' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'atomicity、コンセプト指向、progressive summarization を重視するノートテイキングのメソッド。ノートは一時的な思考を捕捉するのではなく、永続的に有用で継続的に改良されるよう書かれる。' },
        { title: '思考のための道具', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: '人間の思考、記憶、創造性を増幅するために設計されたソフトウェアとシステム。Engelbart の 1962 年 "Augmenting Human Intellect" に起源を持つ。重要な課題：研究プロトタイプと主流採用のギャップを埋めること。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Evergreen notes と伝統的なノートテイキングの根本的な違いは何ですか？',
      chatAnswerLead: { text: '[[Evergreen notes]]は永続的に有用で継続的に改良されるよう書かれるのに対し、伝統的なノートテイキングは短期的な想起のためだけの一時的な思考を捕捉します。Evergreen notes は[[アトミシティ]]（1 ノート 1 アイデア）、[[コンセプト指向]]（ソースではなく概念で命名）、[[プログレッシブサマリゼーション]]（多層の蒸留）を重視します。' },
      chatAnswerDetail: '根本的なシフトは「私は何を読んだか？」から「私は何を信じているか？」への移行です。伝統的なノートは bibliographic であるが、evergreen notes は epistemic である。これにより composable になる——元のソースを読み返すことなく、atomic なノートをリンクして新しいアイデアを構築できます。',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: '学術研究',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: '記念碑的な AI 論文に関する研究ノート——見出しだけでなく基礎を理解する必要があるときに行うディープダイブ。Vaswani ら、2017。',
      sourceNote: `# Attention Is All You Need — ノート

RNN を終わらせ、Transformer を誕生させた論文。Vaswani ら、2017。

## 核心となるアイデア
トークンを逐次的に処理する（RNN 方式）代わりに、「注意」を使ってすべてを
並列に処理する——各トークンが他のすべてのトークンを観察し、どれが
重要かを決定する。重要な洞察：逐次処理は特徴ではなくボトルネックだった。

## 三つの注意機構
- セルフアテンション：文中のすべての単語が他のすべての単語に注意を向ける。
  これにより RNN が約 50 トークン後に失う長距離依存関係を捕捉できる
- マルチヘッドアテンション：8 個の並列注意演算を実行し、それぞれが異なる
  関係タイプ（構文、意味、共参照）を学習する。結果を連結する。
  各ヘッドは異なるものを専門とする
- Scaled Dot-Product：Q·K^T の演算を sqrt(d_k) で割る。スケーリング因子が
  ないと、高次元で勾配が爆発する

## 位置エンコーディング
再帰構造がないため、モデルは単語の順序を認識しない。解決策：異なる周波数の
正弦波/余弦波を入力埋め込みに加算する。これによりパラメータを追加せずに
モデルに位置情報を与える。

## なぜこれがすべてを変えたか
- 訓練が並列化可能（RNN はトークンごとに訓練、Transformer はシーケンス全体を
  一度に訓練）→ より大きなデータセットへのスケール
- 長距離依存：RNN は約 50 トークンの記憶だった；Transformer には固定上限がない
  （コンテキストウィンドウに制約され、それは 512 から 1M+ トークンへ拡大した）
- この論文は直接的にもたらした：BERT (2018)、GPT (2018+)、すべての現代 LLM

## 未解決の問い
- 注意は本当に最終形態か？State Space Models（Mamba、S4）が注意の
  二次複雑度に挑戦している
- 複数のヘッドは本当に異なるパターンを学習しているのか、それとも冗長なのか？`,
      extractedItems: [
        { name: 'Vaswani ら', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'セルフアテンション', type: 'concept', lineIdx: 0 },
        { name: 'マルチヘッドアテンション', type: 'concept', lineIdx: 0 },
        { name: '位置エンコーディング', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani ら', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: '2017 年に "Attention Is All You Need" を発表し、Transformer アーキテクチャを導入した Google Brain チーム。彼らの研究は RNN に取って代わり、大規模な並列訓練を可能にし、BERT、GPT、そしてすべての現代 LLM を直接的にもたらした。' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Bidirectional Encoder Representations from Transformers、2018 年に Google が発表。Transformer のエンコーダースタック上に直接構築され、11 の NLP タスクで当時の最高性能を達成し、事前学習 + 微調整のパワーを実証した。' },
        { title: 'セルフアテンション', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'Transformer の核となる機構：シーケンス内のすべてのトークンが同時に他のすべてのトークンに注意を向け、重み付きの関係を計算する。並列処理を可能にし、RNN の約 50 トークンという限界を超える長距離依存を捕捉する。' },
        { title: 'マルチヘッドアテンション', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: '複数の並列注意演算（通常 8 ヘッド）を実行し、それぞれが異なる関係タイプ（構文、意味、共参照）を学習する。出力を連結して投影することで、異なる表現部分空間での共同注意が可能になる。' },
        { title: '位置エンコーディング', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Transformer はすべてのトークンを並列に処理するため、本質的に単語の順序という概念を持たない。位置エンコーディングは異なる周波数の正弦波/余弦波を入力埋め込みに加え、学習可能なパラメータを追加せず位置を符号化する。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: '注意は最終形態なのか、それとも State Space Models がそれに取って代わるのか？',
      chatAnswerLead: { text: '[[注意]]は最終形態ではありません——[[State Space Models]]（Mamba、S4）はすでにその O(n²) 複雑度に挑戦しています。SSM は長文脈タスクで競争力のある性能を維持しながら、シーケンス長に対して[[線形スケーリング]]を実現します。' },
      chatAnswerDetail: 'しかし、注意は巨大なエコシステム上の利点を持っています：すべての主要な LLM（GPT、Claude、Gemini）は注意の上に構築されており、GPU ハードウェアは行列乗算に最適化されています。SSM は注意を完全に置き換える前に、理論上の効率だけでなく、大規模での実践的な優位性を証明する必要があります。',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'ビジネス',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: '競合戦略の分析——ビジネスモデル、成長レバー、市場ポジションを分解する。PM、コンサルタント、創業者が重要な戦略的意思決定の前に書くようなリサーチノート。',
      sourceNote: `# Stripe の戦略的進化

## 開発者ツールから経済インフラへ

Stripe は「決済を受け入れる 7 行のコード」として始まった。しかしその
フレーミングは真の戦略を曖昧にしている。彼らは決済を簡単にすることで
勝利したのではなく、開発者を買手にすることで勝利した。

## 主な戦略的施策
- **API ファーストの流通**：Stripe を統合するすべての開発者が社内の
  champion になる。SMB セグメントには営業チーム不要
- **複合製品**：Payments → Billing → Tax → Treasury → Issuing。各製品は
  前製品のデータを活用する。スイッチングコストは指数関数的に増大する——
  決済処理業者は置き換えられるが、財務スタック全体を置き換えることはできない
- **カードネットワークのバイパス**：Visa/Mastercard との直接統合により
  アクワイアラーの仲介業者を排除。レガシーアクワイアラー経由の競合に対し、
 推定 15〜25bps のマージン優位性

## 収益モデル
- 1 取引あたり 2.9% + $0.30（コア決済）
- Billing/Tax/Radar：1 取引あたり追加 0.4〜0.8%
- 決済以外の製品（Link、Capital、Atlas）からの収益シェアが拡大中
- 推定 $1T+ の総決済高（2023 年）、約 $14B+ の純収益を意味する

## 競合ポジション
- vs Adyen：Stripe は開発者体験で勝利；Adyen はエンタープライズで勝利
- vs Square：Stripe はオンライン優先；Square は POS 優先。収束しつつある
- 脅威：大規模 merchants の内製化（Shopify、DoorDash）

## 未解決の問い
- 融資/融資隣接サービスへの進出なしに、Stripe は成長を維持できるか？
- 中国/SEA への進出は依然として最小限——規制障壁か戦略的選択か？`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'API ファースト流通', type: 'concept', lineIdx: 0 },
        { name: '複合製品戦略', type: 'concept', lineIdx: 0 },
        { name: 'カードネットワーク経済学', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: '2010 年設立の決済インフラ企業。コア戦略：開発者を買い手としてターゲットにする API ファースト流通、そして複合製品（Billing、Tax、Treasury、Issuing）への拡大。推定 $1T+ の決済高と $14B+ の純収益。' },
        { title: 'Visa & Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: '消費者決済の大部分を処理する支配的なグローバルカードネットワーク。決済処理業者は彼らのインフラと連携する必要がある——アクワイアラーを介さない直接統合は、15〜25bps のマージン優位性をもたらす可能性がある。' },
        { title: 'API ファースト流通', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'API を通じて開発者をターゲットにすることで製品を流通させる go-to-market 戦略。すべての統合者が社内の champion となり、従来の営業チームなしでボトムアップ型の採用を生み出す。Stripe はその典型例である。' },
        { title: '複合製品戦略', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: '各新レイヤーが前レイヤーのデータを活用する形で、相互接続された製品を構築する戦略。スイッチングコストは指数関数的に増大する——一つの製品を置き換えるのは容易だが、スタック全体を置き換えるのはほぼ不可能になる。' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: '融資への進出なしに Stripe は成長を維持できますか？',
      chatAnswerLead: { text: '[[Stripe]]は古典的な成長の天井に直面しています：決済処理のマージンは縮小しており（2.9% + $0.30 は既に Shopify、DoorDash による内製化からの圧力下にある）。同社は高マージンの隣接サービス（融資、Capital）への拡大を果たすか、成長率の低下を受け入れるかのどちらかが必要です。' },
      chatAnswerDetail: '複合製品戦略が Stripe の答えである：各レイヤーは前レイヤーの上に構築され、スタック全体を徐々に置き換えにくくしている。しかし融資は最も高マージンの金融サービスであり——同時に Stripe が最も慎重に進出してきた分野でもある。',
      chatSource: 'stripe-strategy.md',
    },
  ],
};