---
title: "公告：许可证变更 — 从 MIT 到 Apache 2.0，悄无声息"
description: "三个文件改动，你用的插件不变。Karpathy LLM Wiki 项目为何迁移到 Apache 2.0 + DCO——对用户、贡献者与下游 fork 意味着什么。"
date: 2026-07-03
tags: ["公告"]
related: ["introducing-llm-wiki"]
series: "announcement"
---

一个项目：本版本拉入了四个 Apache 2.0 包，有六位人类贡献者，想让自己的名字不出现在被乱改名的 fork 里——这个项目已经超过 MIT 的范围了。

我们从 MIT 换到了 **Apache License 2.0 + DCO**。你 vault 里的插件没变。三个文件变了。

## 实际变了什么

- `LICENSE` 从 MIT 换成 Apache 2.0。
- 新增 `NOTICE` 文件，列出到目前为止为这个仓库写过代码的人。
- `CONTRIBUTING.md` 现在含一段 DCO v1.1 说明，让未来的贡献从 commit 起就有明确许可。

整个表面变化就这些。插件的 API、Obsidian 社区插件市场上架、Sponsor 区块、你的 vault 工作流——都没变。现在安装或更新，你运行时不会感受到任何差异。

## 什么**没**变

- ✅ 插件依然**免费**、**开源**、在 Obsidian 社区插件市场上架。
- ✅ 你依然可以**fork**、**修改**、**围绕它提供服务**、**分发闭源衍生品**。Apache 2.0 是 MIT-plus，不是 MIT-minus——MIT 给的每项权限，Apache 都给。
- ✅ 你依然可以商用。Sponsor 区块不变。
- ✅ **MIT 时点的 fork 仍保持 MIT。** 这项变更向前适用；过去贡献的代码不会按提交时没生效的条款被追溯重新许可。
- ✅ 你依赖的现有 MIT fork 不受影响。它们保留 MIT 条款。

## 给贡献者——过去的和未来的

**过去的贡献**保留在你提交时生效的 MIT 条款下。那时只有 MIT 一个许可证在生效，法律记录明确。

**向前**，新贡献默认 Apache 2.0。机制是 commit 信息里的一行 `Signed-off-by:` ——一句话声明你写了这些代码或有权提交。这就是 Linux 内核用的同一个 DCO 机制。全文在新的 CONTRIBUTING.md 段落里；摘要：`git commit` 加 `-s`，会自动加上这行。

**如果你反对**这项变更（任何理由都行），请在 [Discussion #237](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237) 留评论。我很乐意讨论具体顾虑。变更已在 main 上落地，但记录开放，你的意见重要。

## NOTICE 文件背后的人

Apache 2.0 附带的 NOTICE 文件是个小而具体的东西——列出为这个仓库写过代码的人。截至本版本，是六位人类加上一长串 issue 报告者、复现者、部分字符串的翻译者，他们不在文件里但应当被致谢。

**代码贡献者**（按 commit 历史顺序，不是权威顺序）：

- **Greener-Dalii**——维护者。架构、摄入流水线、检索级联、AI-SDK 迁移、多文件摄入、欢迎页、hub 生命周期框架、Sponsor 区块。
- **@DocTpoint**——hub-retirement 结晶信号（[PR #215](https://github.com/green-dalii/obsidian-llm-wiki/pull/215)），175 LOC + 12 单元测试 + 136 LOC 集成测试。也推动了 hub 生命周期框架，塑造了 v1.23 的冷启动分类。
- **@Indexed-Apogrypha**——source-slug fingerprint 修复，以及几次高质量的 Issue 复现，专门针对供应商版本回归类问题。
- **@dmarchevsky**——多个 PR 的 review 反馈。
- **@FrancoTampieri**——意大利语本地化。v1.22 的第 10 种语言。设立了 README 现在记录的"贡献者驱动"先例。
- **@YounianC**——v1.23 合并的 UX 改进。

更大的社区——issue 报告者、测试者、部分字符串的翻译者、赞助一杯咖啡的人——比任何文件都装得下，但这是项目存在的原因。

---

## 附录

**为什么是现在做这项变更。**自这个项目在 MIT 下启动以来，三件事变了。

依赖树。v1.23 拉入了 [Vercel AI-SDK v6](https://sdk.vercel.ai/) 及其四个子包（`@ai-sdk/openai@3`、`@ai-sdk/anthropic@3`、`@ai-sdk/openai-compatible@2`，外加 `ai@6`）。这些包本身都以 Apache 2.0 发布。MIT 插件搭配 Apache 2.0 依赖在法律上能跑，但这是个安静的错配——Apache 软件基金会和大多数企业法务在做许可证审查时会标出来。

贡献者群体。一位维护者起步时，MIT 是正确选择——简单范围，"自由分享"就是全部论点。几个版本后，仓库有了六位有真实归属的人类贡献者。Apache 2.0 给每位贡献者一个明确、显式的专利授权——一句白纸黑字的小而重要的保护："你自己的专利以后不会被用来对这个项目反咬一口。"

品牌。"Karpathy Wiki" / "Greener-Dalii" 是我们想保持不让乱改名的 fork 借用的东西。Apache 2.0 含一个商标条款，干干净净地做这件事，但不限制实际的 fork、修改或商用。

**这是 / 不是**。这是法律框架追赶项目真实的位置：一个多贡献者、依赖丰富、有品牌意识的软件，发到别人的 vault 里。这**不是**控制欲，不是对过去工作的重新许可，也不是停止使用插件的理由。如果你在 MIT 下用这个插件，对你来说变更不可见。如果你在 fork 或以 MIT 分发，你的 fork 保持 MIT。唯一变的是向前的新代码按什么条款许可。

### 你能做的事

- **如果你是用户**，你什么都不用做。插件和之前完全一样。
- **如果你贡献过代码**，你的贡献保留 MIT。你后续的 commit 应加 `Signed-off-by:` 行——`git commit -s` 自动加。
- **如果你维护 MIT fork**，你的 fork 保留 MIT。这项变更不强制你这边做任何重新许可。
- **如果你有问题或顾虑**，开放讨论在 [Discussion #237](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)。

---

**源**：[LICENSE](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/LICENSE) · [NOTICE](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/NOTICE) · [CONTRIBUTING.md](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/CONTRIBUTING.md) · [Discussion #237](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)

**安装**：[Obsidian 社区插件](https://obsidian.md/plugins?id=karpathywiki) · [v1.23.1 发布说明](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.23.1)