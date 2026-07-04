---
title: "Announcement: License Change — MIT to Apache 2.0, Quietly"
description: "Three files change. The Karpathy LLM Wiki plugin you use doesn't. Why the project is migrating to Apache 2.0 with DCO — and what it means for users, contributors, and forks."
date: 2026-07-03
tags: ["announcement"]
related: ["introducing-llm-wiki", "v123-graph-engine-ai-sdk"]
series: "announcement"
---

A project that pulled in four Apache 2.0 packages this release, ships with six human contributors, and wants to keep its name out of confusingly-renamed forks — that project has outgrown MIT.

We've moved from MIT to **Apache License 2.0 + DCO**. The plugin in your vault doesn't change. Three files do.

## What actually changed

`LICENSE` is now Apache 2.0 instead of MIT.

A new `NOTICE` file lists the people who have written code in this repository so far.

`CONTRIBUTING.md` now includes a DCO v1.1 section so future contributions are licensed explicitly from the commit onward.

## What it does NOT change

- ✅ The plugin is still **free**, **open-source**, and **on the Obsidian Community Plugin marketplace**.
- ✅ You can still **fork**, **modify**, **sell services around it**, and **distribute closed-source derivatives**. Apache 2.0 is MIT-plus, not MIT-minus — every permission MIT grants, Apache grants too.
- ✅ You can still use it commercially. The Sponsor section is unchanged.
- ✅ **MIT-licensed forks remain MIT-licensed at the point of fork.** This change applies going forward; nothing retroactively relicenses past contributions differently than they were when submitted.
- ✅ Existing MIT forks you depend on are not affected. They keep their MIT terms.

## For contributors — past and future

**Past contributions** stay under the MIT terms you submitted them under. The legal record is unambiguous.

**Going forward**, new contributions will be Apache 2.0 by default. The mechanism is a `Signed-off-by:` line in your commit message — a one-line statement that you wrote the code or have the right to submit it. This is the same DCO mechanism the Linux kernel uses. The full text is in the new CONTRIBUTING.md section; the summary is: add `-s` to `git commit`, and you'll get the line automatically.

**If you object** to this change for any reason, please leave a comment on [Discussion #237](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237). I'm happy to discuss individual concerns. The change is live on `main`, but the record is open and your input matters.

## The people behind the NOTICE file

**Greener-Dalii** — maintainer. Architecture, ingest pipeline, retrieval cascade, AI-SDK migration, Multi-File Ingest, Welcome note, hub lifecycle framework, the Sponsor section.

**@DocTpoint** — hub-retirement crystallization signal ([PR #215](https://github.com/green-dalii/obsidian-llm-wiki/pull/215)), 175 LOC + 12 unit tests + 136 LOC integration tests. Also drove the hub-lifecycle framing that shaped v1.23's cold-start taxonomy.

**@Indexed-Apogrypha** — source-slug fingerprint fix and several high-quality Issue reproductions for the provider-version regression class.

**@dmarchevsky** — review feedback across multiple PRs.

**@FrancoTampieri** — Italian locale support. v1.22's 10th language. Set the contributor-driven precedent the README now documents.

**@YounianC** — UX improvement that landed in v1.23.

The larger community — issue reporters, testers, translators of partial strings, the people who sponsored a coffee — is bigger than any file can hold, but it's why this project exists.

---

## Appendix

**Why this change, specifically now.** Three things shifted since this project started under MIT.

The dependency tree. v1.23 pulls in [Vercel AI-SDK v6](https://sdk.vercel.ai/) and four of its sub-packages (`@ai-sdk/openai@3`, `@ai-sdk/anthropic@3`, `@ai-sdk/openai-compatible@2`, plus `ai@6`). Those packages all ship under Apache 2.0 themselves. Mixing an MIT plugin with Apache 2.0 dependencies works legally, but it's a quiet mismatch that the Apache Software Foundation and most enterprise lawyers will flag in a license review.

The contributor base. When the project was one maintainer, MIT was the right call. A few versions later, six human contributors with real attribution. Apache 2.0 gives every one of them a clear, explicit patent grant — a small but meaningful protection for volunteer work that says, in writing, *"your own patents won't be used against this project later."*

The brand. "Karpathy Wiki" / "Greener-Dalii" is something we'd like to keep out of confusingly-renamed forks. Apache 2.0 includes a trademark clause that does this cleanly without restricting actual forking, modification, or commercial use.

**What this is, and what it isn't.** This is the legal framework catching up to where the project actually is: a multi-contributor, dependency-rich, brand-conscious piece of software that ships into other people's vaults. This is *not* a control play, a relicensing of past work, or a reason to stop using the plugin. If you've been using this plugin under MIT, the change is invisible to you. If you've been forking or distributing under MIT, your fork stays MIT. The only thing that changes is what new code, going forward, is licensed under.

### What you can do

- **If you're a user**, you don't need to do anything. The plugin keeps working exactly as it did.
- **If you've contributed code in the past**, your contributions remain under MIT. New commits from you should add a `Signed-off-by:` line — `git commit -s` does this automatically.
- **If you maintain an MIT fork**, your fork stays MIT. Nothing in this change forces any relicensing on your end. If you want to switch your fork to Apache 2.0 in solidarity, that's your call, but there's no obligation.
- **If you have questions or concerns**, the open thread is [Discussion #237](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237).

---

**Source**: [LICENSE](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/LICENSE) · [NOTICE](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/NOTICE) · [CONTRIBUTING.md](https://github.com/green-dalii/obsidian-llm-wiki/blob/main/CONTRIBUTING.md) · [Discussion #237](https://github.com/green-dalii/obsidian-llm-wiki/discussions/237)

**Install**: [Obsidian Community Plugin](https://obsidian.md/plugins?id=karpathywiki) · [v1.23.1 release notes](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.23.1)