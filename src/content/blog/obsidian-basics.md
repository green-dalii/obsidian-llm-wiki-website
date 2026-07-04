---
title: "Getting Started (1): Obsidian for Absolute Beginners"
description: "What a vault is, how Markdown works, why bidirectional links change how you take notes. The minimum knowledge you need before installing Karpathy LLM Wiki."
date: 2026-04-25
tags: ["getting-started"]
series: "getting-started"
related: ["why-llm-wiki-for-obsidian-users", "introducing-llm-wiki"]
---

## The Mess We All Live With

You have notes everywhere. Apple Notes for grocery lists. Google Docs for work meetings. A text file on your desktop with random quotes you liked. Another text file for project ideas — or was that in Notion? Finding anything takes five minutes of searching. Connecting two ideas across apps is impossible because the ideas don't know the other exists.

This is the default state of personal knowledge in 2026: scattered, siloed, and slowly decaying. You keep taking notes because forgetting feels worse than collecting. But collecting without structure is just hoarding.

Obsidian fixes this. Not by adding another app to your collection — by replacing what all those other apps do with something fundamentally different.

## What Obsidian Actually Is

Obsidian is a Markdown editor. But that undersells it. Think of it as **a local-first knowledge base that grows structure from the connections you make.**

Two things make it different:

- **Your notes live on your hard drive** as plain `.md` files. Not in a proprietary database. Not on a server you don't control. Plain text files you can open with any editor, back up with any tool, and keep forever.
- **Notes can link to each other** with `[[wiki-links]]`. When you type `[[Tesla]]` inside a note, you create a bidirectional connection. The first note knows about Tesla. The Tesla page knows about every note that links to it. Connections work both ways automatically.

Those two features — local plain text and bidirectional links — are the entire foundation. Everything else Obsidian does is built on top of them.

## Three Core Concepts

### Vault

A Vault is just a folder on your computer. That's it. Every `.md` file inside that folder is a note. You can have as many Vaults as you want — one for work, one for personal projects, one for a research paper. They're independent. They don't mix.

Create a new Vault by picking an empty folder or a folder full of Markdown files you already have. Obsidian scans the folder once and indexes every file.

### Markdown

Markdown is a plain-text formatting syntax. Instead of clicking bold and italic buttons, you type `**bold**` and `*italic*`. Headings are `#` symbols. Lists start with `-`. Links are `[text](url)`.

Markdown is future-proof. If Obsidian stops existing tomorrow, your notes are still plain text files readable by any editor on any operating system. Twenty years from now, a terminal will still render them correctly.

### Bidirectional Links

A `[[wikilink]]` is the core of Obsidian's power. When you link from Note A to Note B, Obsidian automatically registers the reverse connection. Note B gets a **backlink** section showing every note that references it.

This sounds simple. It changes everything. Instead of folders and tags — which impose a single hierarchy on your notes — bidirectional links let your knowledge grow like a web. Any note can connect to any other note. A single note can belong to multiple contexts. Connections emerge naturally as you write.

## Why Bidirectional Links Matter

**Discovery without search.** You open a note about machine learning, scroll to the backlinks section, and find three notes you wrote months ago that reference it. You had forgotten about two of them. That's not a failure of memory — it's the default. Bidirectional links surface what you've forgotten without requiring you to know it existed.

**Emergent structure.** You don't need to plan your folder hierarchy upfront. You write notes, link them as you go, and the structure emerges from the links. Over time, clusters form naturally around topics. The Graph View renders this as a visual map.

**No orphan notes.** A note with no links is an orphan. Every orphan is a knowledge island. Obsidian's built-in tools can show you every orphan, so nothing drifts into irrelevance. If a note matters, it should be linked. If it doesn't, delete it.

## Step-by-Step Installation

1. **Download** — Go to [obsidian.md](https://obsidian.md) and click the download button for your operating system (macOS, Windows, Linux).
2. **Install** — Open the downloaded file and follow the installer prompts. Takes about 30 seconds.
3. **Open Obsidian** — The app launches with a welcome screen. Click "Create a new vault."
4. **Name your Vault** — Pick a name (e.g., "My Knowledge Base") and a location on your computer. Choose an empty folder to start fresh.
5. **Start writing** — `Cmd+N` creates a new note. Type `# Title` for a heading, `**bold**` for emphasis, and `[[Another Note]]` to link to a note that doesn't exist yet — Obsidian will create it when you click the link.

That's it. You now have a working Vault with zero configuration.

## How Obsidian Differs from Other Apps

| Feature | Obsidian | Apple Notes | Notion | Evernote | Google Docs |
|---|---|---|---|---|---|
| File format | Plain `.md` | Proprietary | Proprietary | Proprietary | Proprietary |
| Local-first | Yes | Partial (iCloud) | No (cloud) | Partial | No (cloud) |
| Bidirectional links | Native | No | Requires setup | No | No |
| Graph View | Built-in | No | No | No | No |
| Plugins | 2000+ community | No | Limited | Limited | No |
| Offline | Full | Partial | Limited | Partial | No |
| Cost | Free (no accounts) | Free | Subscription | Subscription | Free |
| Export anywhere | Yes (plain text) | No | Limited | Limited | Limited |

Apple Notes is convenient for quick capture. Notion is good for team databases. Evernote was good in 2015. Google Docs is for real-time collaboration. None of them are built for personal knowledge management. Obsidian is.

## What Obsidian Doesn't Do

Obsidian is not a cloud service. No built-in sync (there's a paid option, or you can use iCloud, Dropbox, or Git). No real-time collaboration. No structured database with filters and formulas — that's Notion's territory. No AI features built in.

These aren't weaknesses. They're trade-offs. Obsidian chooses local-first ownership over convenience. It chooses simplicity over feature bloat. And it chooses extensibility through plugins rather than baking every possible feature into the core app.

## The Graph View

Open the Graph View (`Cmd+G`) to see every note and every link rendered as an interactive graph. Each note is a node. Each `[[link]]` is an edge. Related content clusters together visually. Orphans appear as isolated dots.

The Graph View isn't a gimmick. It's the only way to see your knowledge's shape at a glance. You can spot which topics you've explored deeply (dense clusters), which areas need more attention (thinly connected nodes), and whether your notes form a coherent web or a pile of disconnected files.

## Plugins Extend Everything

Obsidian's community plugins turn it into a platform. Need a Kanban board? There's a plugin. A calendar view? Plugin. Daily journaling with prompts? Plugin. A spaced-repetition flashcard system? Plugin.

There are over 2,000 community plugins, and they install in two clicks from within Obsidian. One of them is **Karpathy LLM Wiki**, which turns your Vault into an AI-maintained Wiki — but that's the next article.

## Next Steps

You've installed Obsidian, created your first Vault, and learned the three core concepts. Now open a real question: **what happens when your Vault grows beyond what you can manually maintain?**

That's where [**Getting Started (Two): Why Your Vault Needs LLM Wiki**](/blog/posts/why-llm-wiki-for-obsidian-users) picks up.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
