---
title: "What's New in v1.29 — It Finds What You Meant"
description: "Your question no longer has to use the page's words — every page's full text is searched now. Ingest survives models that think. Pictures inside your notes count as evidence. Nothing changes until you want it to."
date: 2026-10-29
tags: ["announcement"]
related: ["v1270-minor-release", "query-engine-pipeline", "pdf-ingest-guide", "choosing-models", "monte-carlo-ppr"]
---

## Update, and nothing moves

v1.29.0 is out, and it lands on top of v1.28.0. If you have the plugin installed, **Obsidian → Settings → Community plugins** shows an **Update** button. Click it.

Everything v1.28.0 added is off until you switch it on. The one change that is on by default — how a question gets matched to pages — comes with a way back. So nothing about your wiki moves unless you go looking for it.

Here is what is now possible that wasn't.

## It finds the page you meant

This is the one that changes how you use the plugin.

Until now, when you asked a question, the plugin compared your words against page titles, aliases and one-line summaries. Not the page. The **body** — usually the longest text on the page, and the part where the actual answer lives — was never looked at. If your question didn't happen to use the same words as the title, retrieval fell through to a slower, costlier path that asked a model to guess what you meant.

Now the whole page is scored, title and body together. So the sentence you'd say out loud finds the paragraph you wrote six months ago, even when the two share almost no words. Ask in Chinese about a page you wrote in English, or the other way round; the page still surfaces.

Two smaller things ride along with it. The question itself gets widened before the search runs — once with related terms your own wiki supplies, once with terms a model proposes — so a question that names the topic indirectly still reaches it. And the work behind all this is now done once per session instead of once per question, which is why the first question after you open your vault is slightly slower and every question after it is not.

**"Ask however you like" is a real promise, and if it misfires for your vault there is a way back.** Settings → Advanced → **Legacy query scorer** restores the previous ranking exactly as it was. Off by default, because the new one is better on the vaults this was measured against — but your vault is not one of those vaults, so the switch is yours.

You can also see what happened now. The line above an answer reads something like `🔍 12 pages · ⚡ BM25F+PPR · 📚 4 sources`: how many pages retrieval loaded, which channels actually ran, and how many sources the answer drew on. It used to name the model unconditionally, even when no model had been called — which made it the answer to "what happened" while the graph did all the work. Hover it for the detail: how many words the expansion added, how many rounds of your conversation the retrieval carried.

## Ingest stops dying when the model thinks

A reasoning model spends its output budget on thinking before it writes anything. The plugin used to declare a fixed ceiling, and a model that thought hard enough could spend the entire thing before producing a single extracted entity — then hand back an empty batch. Worse, the error you saw blamed your file: *this source is too large for the model's context window*. Your file was fine. The budget was wrong.

Extraction now declares the model's own output ceiling and lets the model stop when it's done — an unused ceiling costs nothing, while a short one costs the whole turn. If a provider rejects the declared ceiling, the plugin learns by halving it inside the first batch instead of failing the run.

Three controls came with the fix, all under **LLM Configuration**:

- **Thinking level** — Default, Low, Medium or High. Default sends nothing and lets the provider decide, which is usually right. Providers translate the level into their own terms, so the same setting means different amounts on different models.
- **Model context window** — set it when you know the real value and it's small, so the declared ceiling can never exceed what the window holds. A local model with an 8K window never receives a 128K request.
- **Max output tokens per call** — this existed but was hidden for most providers, including the ones most likely to hit the problem. It's now in LLM Advanced Parameters for every provider, next to the thinking level that spends it.

And when a run does run out, the message names reasoning instead of pointing at a setting that doesn't exist.

## Pictures inside your notes count as evidence

A lot of notes carry their real content in a screenshot: a table someone pasted, a diagram the paragraph beneath it refers to, a figure from a paper you're summarizing. Those images were invisible to ingest.

Turn on **Analyze embedded images during Markdown ingestion** in Advanced settings and every eligible local embed — `![[…]]` or `![…](…)` — is read together with the paragraphs nearest to it, so the picture lands on the same page as the text pointing at it. Images travel in packages, so a note isn't limited by how many it has; each single image is capped, an animated GIF sends one still frame, and a remote URL is never downloaded. If you want to audit what the model actually saw, **Save embedded image visual evidence to source page** writes a collapsible section onto the source page.

Off by default. The [document ingest guide](/blog/posts/pdf-ingest-guide/) covers this path and the other five, including where each one sends your file.

## Answers cite like a paper

Citations are numbered `[1]`, `[2]`, `[3]` in order of first appearance, a repeat citation keeps its number, and the bibliography at the bottom is clickable. Ask a follow-up and the numbering stays stable, so you can say "the third source" out loud and mean it.

The composer grows as you write instead of scrolling inside a fixed box, and **clear history** now actually clears the record.

## Endpoints that need a header

Some providers won't talk to you without one: a routing header, a tenant id, a session key. There is now a free-text **Custom Headers** field directly below the API Base URL — one `Name: value` per line, sent with every request, blank lines and `#` comments ignored. It ships with a preset for OpenCode, and a variant for endpoints that speak `/v1/responses` instead of `/v1/chat/completions`.

While that was being fixed, a second thing was found and fixed with it. Some setups refuse a browser's cross-origin request, which used to mean every streamed answer silently degraded into a buffered one — you watched a spinner, then got the whole reply at once. A refused origin is now remembered and the stream is retried over a desktop transport. If that retry fails too, the failure is recorded rather than swallowed.

## A few smaller things

- **Obsidian's excluded files are respected everywhere now.** You could already exclude notes in Obsidian, and the plugin already honoured that when you picked files by hand. Watched folders did not — a note you'd excluded got ingested anyway the moment you edited it. It doesn't now.
- **One tag vocabulary.** The tags offered to the model, the tags enforced on write, and the tags lint checks are now a single list built from your notes' nested tags, your existing pages' tags, and the custom list in Settings. A value outside that list is dropped, never written, so what the model is offered is exactly what lands on disk.
- **A machine filename no longer becomes an entity.** Ingesting a note whose own filename is an ID — a UUID, a timestamp — sometimes produced an entity page named after that ID, whose body just re-told the note. Those are gone.
- **One hub can't drag everything.** Related-page lists are shaped so a single page linked from everywhere stops pulling every other page toward itself, and links that every page carries count for less.

## How to get it

- **Already installed?** **Obsidian → Settings → Community plugins → Update**. One click.
- **New?** **Obsidian → Settings → Community plugins → Browse → search "Karpathy LLM Wiki" → Enable**, or use the [Add to Obsidian](/) button on the home page.

Release notes for both versions live on the [v1.29.0](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.29.0) and [v1.28.0](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.28.0) pages. The retrieval rewrite has its own piece: [Inside the System (7): Inside the Query Pipeline](/blog/posts/query-engine-pipeline/).