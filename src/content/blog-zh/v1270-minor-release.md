---
title: "公告：v1.27.0 —— MinerU 加入文档摄入、Bedrock SSO 上线、Stub 不再乱生"
description: "Karpathy LLM Wiki 时代的第一个 MINOR 版本。PDF、图片、Office 文档全部接入和 Markdown 笔记同一条流水线。AWS Bedrock 加上 SSO 与 IAM 两种鉴权。所有改动默认不影响现有 Wiki。"
date: 2026-08-28
tags: ["公告"]
related: ["introducing-llm-wiki", "v123-graph-engine-ai-sdk", "pdf-ingest-guide", "headless-cli", "faster-ingestion"]
---

## 升级，然后忘掉

v1.27.0 在 2026-08-27 发布，是 Karpathy LLM Wiki 时代的第一个 MINOR 版本。如果你只想读一段，读这一段：**默认情况下，你现有的 Wiki 一个字都不会变。** 每一个新增设置都精心限定成"除非你主动打开，否则行为和 v1.26.4 完全一致"。所以这次升级是真的——Obsidian → Settings → Community plugins → Update，点一下就完事。

但你如果愿意四处看看，这一轮能玩的东西不少。下面这些，是真正会影响你日常使用方式的变更。

## 不只是 PDF，文档都进来了

在 v1.25.0 之前，摄入流水线只认 Markdown 笔记。v1.25.0 把 PDF 升为一级来源，靠的是你配的 LLM 直接读。v1.27.0 把这件事补完：**PDF、图片（PNG/JPG/JPEG/JP2/WebP/GIF/BMP）、Office 文档（DOC/DOCX/PPT/PPTX/XLS/XLSX）全部接入同一条流水线。** 一篇研究论文、一份扫描合同、一次复盘的 PPT 演示稿、一张装满结果数据的电子表格——现在走的是和你的笔记完全相同的写入路径。

转换本身现在是插件层的一颗开关。Settings → Wiki Configuration → Markdown Conversion Backend → *MinerU*（新加的内置选项）或 *Native*（原有的云视觉路径，按设计仍只支持 PDF）。MinerU 的 token 只放在 Obsidian SecretStorage 里，永远不进 `data.json`。如果你更习惯手动路线，[MinerU Extractor 在线服务](https://mineru.net/OpenSourceTools/Extractor) 还在那儿——下载转换好的 `.md`，放进 vault 里 wiki 文件夹之外的位置，作为普通 Markdown 笔记摄入即可。

对大多数 vault 来说，这只是一个开关的事。打开之后，picker 里就会出现 vault 里所有文档类型。文件不会移动、不会改名、什么都不会变——除非你拨了那颗开关。[PDF 摄入指南](/zh/blog/posts/pdf-ingest-guide/) 详细讲了全部五条入口——MinerU、原生云服务商、Apple Silicon 上的本地 OCR、在线 UI、Force PDF Support——以及每条的取舍。

## AWS Bedrock 加上 SSO 了

如果你之前因为"只有 API key 一种登录方式"而不愿意在 Bedrock 上投入，那么这轮解决了这个问题。v1.27.0 给 AWS Bedrock 加了两种新的鉴权模式：

- **API key** —— Bedrock 支持落地以来一直在用的方式。和 v1.26.4 行为字节级一致。如果你已经为 Bedrock API key 付费了，继续用这个就好。
- **SSO** —— IAM Identity Center 设备流。在 Settings → Provider → Bedrock 点 *Sign in with AWS SSO*，把浏览器里显示的验证码粘过去，插件通过 `karpathywiki-bedrock-sso`（只放在 SecretStorage 里）拿到 SSO token，交换成临时角色凭据，再用手写的 SigV4 给每个请求签名。整个过程没引入任何 AWS SDK。
- **IAM** —— 静态访问密钥，给没有 SSO 的环境用（CI runner、定时批处理）。存在 `karpathywiki-bedrock-iam` 里；内存缓存按访问密钥维度 memoize，保证 SigV4 签名落在凭据有效期内。

三种模式共用同一套 SecretStorage 纪律：`data.json`、日志、文档里都不会出现凭据。Settings → Provider → Bedrock 那一行现在只会要你所选模式真正需要的字段，所以选哪个都不会让界面变脏。Bedrock region 在同一行配，与鉴权模式无关。

SSO 流程目前仅桌面端（移动端故意没开，因为验证码在移动端的体验更糙）。如果你的工作流依赖移动端 Bedrock SSO，请开个 Issue 把场景说清楚——底层设计已经准备好，只差 UI。

## Fix Dead Links 不再乱建空页面

日常用起来很小、但很舒服的改动。以前，如果你的源笔记提到了一个 Wiki 解析不到的名字，插件会静默建一张空 stub 页——模型的 create-stub 回答会这么做，确定性的兜底分支也会这么做，而你没有办法拒绝。并且从那以后，vault 里所有同名引用都会被这张空页吸走，原本"死链"的信号也跟着没了。

v1.27.0 在 Settings → Advanced 引入了一颗新开关 `createStubsForUnresolvableLinks`。默认开，所以现有 vault 行为不变。关掉它之后，死链会继续显示在 lint 报告里，直到一个真正的源把它定义出来；摄入照样会通过常规通路建页。两道闸门回答的是两个不同的问题：原有的 never-LLM-expand 闸门（#197，行为未变）问"LLM 可以填这个 stub 吗？"；新增的这道问"这个 stub 页到底要不要写下来？"。

## 来源页现在也带原文引用

每张实体页和概念页早就带一段 `Mentions in Source`——用抽取阶段捕获的原文引用搭出来的。但代表原始文档本身的那张页——`sources/<slug>.md`——一直没有。实测一个 vault：96% 的概念页有这段，但 1,045 张来源页里 0 张有。修复之后，把每条实体的原文引用聚合到 analysis 上的那条路径也接进了 summary 页。转写出的来源页现在和每张实体页一样，带着同一条通往原文的可追溯链路；lint 还会把每条引用回到底层 PDF（或 Markdown）做校对，让错放的引用在进入 Wiki 之前就被拦下。

对研究工作流而言，这意味着——打开一张来源页时，看到的 `Mentions in Source` 段，是和实体页同等质量的证据链。

## 每步 task policies

LLM Advanced 里新增了一个字段：**Task Policies**。原本藏在服务商配置里，现在是顶层控制。一行配置就能告诉插件"`extract` 用 text 模式，`merge-triage` 用 JSON"。格式是 `extract=text:on,merge-triage=text:on,page-generate=-:off`；拼错标签不会悄悄匹配不到，对应的描述现在直接列出常见步骤名（`extract`、`merge-triage`、`dedup`…），不再要求你记住内部的流水线标签。

这是把"按步骤度量"打开的杠杆。如果流水线上某一步在成本或质量上拖累你，现在可以不动代码、定向处理它。你没列出来的步骤，内置基线保持原样。

## 摄入候选门控（可选）

对源语言已经有实测 profile 的 vault，v1.27.0 加了一颗可选开关 `skipMentionOnlyCandidates`（Settings → Advanced，默认关）。实测一个德语 vault：28.7% 的抽取候选其实"被提到但没被原文处理"——9.6% 的名字根本没在正文里出现，19.1% 只出现在括号、列举、或短列表项里。这些候选每一条都要付出"建一张页 + 跑去重 + 跑生成"的代价。门控在分析和排版之间跑：叙述里的候选正常建页，被门控的名字会从其他候选的 related-link 列表里剔掉，避免门控制造新的死链。

profile 都是钉死的：德语有实测；英语、法语、西语、葡语、荷语、韩语有边界 case 钉死的估算；中、日字符阈值明确不测（在中文 vault 上先实测，不猜）；屈折变化的语言故意不给 profile，宁缺勿滥。跨语言笔记不走门控——那些名字是翻译，不是候选。默认关：少建页是行为变化，留给用户选。

## 一些小事，也值得知道

每条一行：

- **Query Wiki 流式路径在每步 LLM 计量表里现在有自己的标签。** 之前它和真正未标注的调用折叠在同一行 `untagged`，现在落在 `query-wiki`。
- **推理剥离探测和 token-key 探测缓存现在按 `(baseURL, model)` 配对做键。** 之前有个隐蔽 bug：服务商 A 的 model-1 命中缓存会静默压住 model-2 的探测请求。多模型服务商上看到诡异的"缓存未命中"报告的，这次修了。
- **补全 append 不会再把模型的可见推理段落写进 Wiki 页面。** 原本只有这一条原始 prose 写入路径没做 thinking 块剥离；思维链模型现在不会把自己的推理原文搬进目标段。
- **`npm audit` HIGH 从 1 降到 0。** pnpm 与 npm lockfile 解析不一致，原本覆盖没生效；现在 `overrides` 和 `pnpm.overrides` 用同一份扁平值声明。对用户不可见，但既然有些人在跟踪，就值得提一句。

## 一个偏社区的版本

这轮有 5 位外部贡献者各自合了 PR。插件的生态健康，前提是进来的路一直开着——下面就是走过这条路的人：

- **@XEurekaX** —— MinerU 后端（#404）
- **@anavalo** —— OpenRouter baseURL 测试桩修复（#516）+ Test Connection 空模型防护（#518）
- **@EvgenyPonomarev** —— OpenRouter 模型 404 URL 兜底（#535）
- **@pttydou** —— OpenRouter `:` 变体在模型目录里可见（#538）
- **@rexplx** —— 来源页原文引用缺失的 Issue（#496）

还有 **@DocTpoint**，本轮架构级贡献者，合了 18 个 PR，覆盖横跨 v1.25.x → v1.27.0 的摄入可靠性工作。如果你用这个插件有一段时间了、最近发现事情"莫名其妙地顺"，那背后有一大半是 DocTpoint。

## 怎么拿到

如果你已经在用近期版本，**Obsidian → Settings → Community plugins → Update**，点一下。Wiki、设置、历史全部自动带过去。

如果你是新用户：**Obsidian → Settings → Community plugins → Browse → 搜 "Karpathy LLM Wiki" → Enable**，或者直接用首页的 [Add to Obsidian](/) 按钮。

完整发布说明（含工程细节）见 [GitHub 上的 v1.27.0 release](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.27.0) 与上游 [Discussion #555](https://github.com/green-dalii/obsidian-llm-wiki/discussions/555)。
