---
title: "Getting Started: Why Your Vault Needs a Wiki"
description: "The accumulation paradox: more notes mean harder access. Manual wiki maintenance scales worse than the value it adds — Karpathy LLM Wiki automates page creation, link writing, and updates in your Obsidian vault."
date: 2026-04-26
tags: ["getting-started"]
series: "getting-started"
related: ["introducing-llm-wiki", "first-100-pages"]
---

## The Accumulation Paradox

More notes should mean more knowledge. In practice, more notes means more mess.

When your Vault has 50 notes, you can maintain everything manually. You know what each note contains. You write `[[links]]` as you go. The structure is tidy because you built it recently.

When your Vault hits 500 notes, you stop remembering what you have. Notes you wrote six months ago contain ideas you've since re-discovered and re-written. Links point to notes that have been renamed or restructured. Some notes have zero links and zero tags — they exist in the Vault but not in your mental model. They might as not exist.

This is the accumulation paradox: **the knowledge you've collected becomes harder to access as it grows.** The effort required to maintain connections scales faster than the value of the notes themselves. At some point, the friction of maintenance outweighs the benefit of taking notes in the first place.

Most people solve this by abandoning old notes and starting fresh. The cycle repeats every 6–12 months. You lose everything you wrote.

## Three Burdens of Manual Wiki Maintenance

**Burden 1: Page creation.** Every concept, person, or project you mention deserves its own page. But deciding what deserves a page is work. Should "Transformer Architecture" get its own note? What about "Attention Mechanism" — same page or separate? Every decision takes mental energy. Over hundreds of notes, that energy adds up. Most people skip the decision and let connections rot.

**Burden 2: Link writing.** Writing `[[wiki-links]]` is easy when you're linking to something you already know. It's impossible when you don't know the concept exists. You can't link to what you've forgotten. And even when you do know, you have to manually type the link, check that the target page exists, and ensure the link text is descriptive. This is mechanical work. It doesn't make your thinking better.

**Burden 3: Keeping updated.** A note you wrote last year mentions "GPT-4" as the cutting edge. Today it's GPT-5.5. Is the note wrong? Outdated? Still useful with context? You don't know unless you re-read it. And re-reading 500 notes to check for accuracy is not something anyone does. Outdated information accumulates silently.

## How LLM Wiki Automates All Three

LLM Wiki solves these three burdens by offloading the architecture work to an LLM while keeping you in control of the content.

**Automated page creation.** You write notes normally in a `sources/` folder. When you run the "Ingest Sources" command, LLM Wiki reads each source, identifies the entities and concepts inside it, and creates dedicated pages for each one. The LLM decides what deserves a page — not you. It extracts people, theories, projects, and technical terms with high accuracy because it understands the text.

**Automated link writing.** Every page it creates gets `[[bidirectional links]]` to every related page. The links are semantically accurate — they connect notes based on meaning, not keyword matching. When you open a new wiki page, the backlinks section shows you every source that references it. Connections that would take you hours to build manually are established in seconds.

**Automated updates.** Re-run ingestion on new sources, and the LLM updates existing wiki pages as needed. It adds new connections, flags contradictions between sources, and keeps the index current. If a new source mentions "GPT-5.5" and your existing wiki page on "Large Language Models" still references "GPT-4," the LLM adds an update note or reconciles the discrepancy. You don't need to re-read old notes to maintain accuracy or worry about stale information. The re-ingestion process handles it.

## One-Minute Demo

Here's what using LLM Wiki looks like on a typical day:

1. You find an interesting article about retrieval-augmented generation. You copy the key points into a new note in `sources/`. Takes 2–3 minutes.
2. Press `Cmd+P`, type "Ingest Sources," press Enter.
3. Wait 15 seconds. The plugin sends your source to the configured LLM, which extracts entities, creates pages, and builds links.
4. Open the `wiki/` folder. You now have pages for "Retrieval-Augmented Generation," "Dense Passage Retrieval," and "Hybrid Search" — all linked to each other and to any existing wiki pages that reference similar concepts.
5. Open the Graph View. Three new nodes appear in your existing knowledge graph, already connected.

**Source to structured wiki in 15 seconds.** That's the core loop. Write, ingest, explore. Write, ingest, explore.

## How LLM Wiki Fits Obsidian

LLM Wiki doesn't replace Obsidian. It extends it.

- **Same file format.** Wiki pages are plain Markdown files in a `wiki/` folder. You can edit them by hand, rename them, or delete them. They're not locked in a database.
- **Same linking.** Wiki pages use the same `[[wikilinks]]` system. They appear in the Graph View alongside your manually written notes.
- **Same plugin marketplace.** LLM Wiki is a community plugin. It coexists with Dataview, Templater, Kanban, and every other plugin you use.
- **You stay in control.** If the LLM creates a page you don't want, delete it. If a link is wrong, fix it. The AI assists. You decide.

## What LLM Wiki Requires

To use LLM Wiki, you need an LLM provider with API access. The plugin sends source text to the provider, which processes it and returns structured wiki content.

Supported providers:

- **DeepSeek** — Best price-to-performance. Recommended for daily ingestion. DeepSeek V4-Flash costs $0.14 per million tokens.
- **OpenAI** — GPT-5 series. Good quality, higher cost. Useful when you want maximum accuracy during query operations.
- **Anthropic (Claude)** — Excellent for query and complex reasoning. Claude Sonnet 4.6 hits a strong quality/cost balance for query workloads.
- **Gemini** — Fast output. Gemini-3.5-Flash produces output roughly 4x faster than GPT-5.5, useful for batch ingestion.
- **Ollama** — Run models locally on your machine. No data leaves your computer. Context windows are smaller (8K–128K), so Ollama works best for query rather than ingestion.

You can configure different providers for ingestion and query. Typical setup: DeepSeek or Gemini for cost-effective ingestion, Claude for high-quality query responses.

## The Mental Shift

Using LLM Wiki requires a small shift in how you think about note-taking.

**Before LLM Wiki:** "I write. I link. I organize. The structure is my responsibility."

**After LLM Wiki:** "I write. The AI organizes. I query."

Your job is still to write good source material. The AI still needs high-quality input — garbage in, garbage out applies. But the mechanical work of page creation, link maintenance, and index updating moves from your shoulders to the LLM's.

This frees you to focus on what matters: **thinking, writing, and exploring connections** — not maintaining infrastructure. You end up writing more because the friction of organization disappears. Notes that would have stayed as fragments in your head become structured knowledge because the path from raw thought to wiki page is one command and fifteen seconds.

## Next Steps

You understand why manual maintenance breaks at scale, how LLM Wiki automates the three burdens, and what providers you can use.

Next up: [**Getting Started (Three): Meet Karpathy LLM Wiki**](/blog/posts/introducing-llm-wiki) — the full walkthrough of installation, configuration, and your first ingestion.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
