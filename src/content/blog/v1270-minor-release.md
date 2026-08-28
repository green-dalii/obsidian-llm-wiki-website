---
title: "What's New in v1.27.0 — Drop Any Document Into Your Vault, Sign In With Your Work Account"
description: "PDFs, images, and Office files join your wiki alongside Markdown notes. AWS Bedrock now accepts SSO. Empty stub pages are off by default. Your existing wiki doesn't change — click Update and you're done."
date: 2026-08-28
tags: ["announcement"]
related: ["introducing-llm-wiki", "v123-graph-engine-ai-sdk", "pdf-ingest-guide", "headless-cli", "faster-ingestion"]
---

## One click, then forget

v1.27.0 is out. If you have the plugin installed, you'll see an **Update** button in **Obsidian → Settings → Community plugins**. Click it. Your wiki, your settings, your history — all of it comes with you. Nothing changes by default.

But if you do poke around, here is what is now possible that wasn't before.

## Drop anything into your vault

Until today, only PDFs could join your wiki as source material. Now PDFs are joined by **images (PNG, JPG, JPEG, JP2, WebP, GIF, BMP)** and **Office documents (DOC, DOCX, PPT, PPTX, XLS, XLSX)**. A scanned contract, a slide deck from last month's review, a spreadsheet full of numbers — drop it in your vault the same way you would a note, and it becomes part of the same wiki graph.

The conversion is one switch in Settings → Wiki Configuration → Markdown Conversion Backend → **MinerU**. The token lives only in Obsidian's SecretStorage — never in your `data.json`, never in any log. If you ever need the old way back, flip the switch to **Native** and PDFs work exactly like they did before v1.27.0. Five on-ramps in total are documented in the [PDF Ingest guide](/blog/posts/pdf-ingest-guide/); pick whichever fits your vault.

## Sign in with your work account

If your organization uses AWS Bedrock, you no longer have to keep an API key in your settings. v1.27.0 adds two more ways to authenticate:

- **SSO.** The standard "log in with your work account" flow. Click **Sign in with AWS SSO**, paste the verification URL the browser gives you, and you're in. The plugin handles the rest in the background.
- **IAM.** Static access keys for environments without SSO — CI runners, scheduled batch jobs. Stored in Obsidian's SecretStorage like every other credential.

The original **API key** mode is unchanged. If you already pay for Bedrock this way, keep using it. Whichever mode you pick, the provider row in Settings only asks for the inputs that mode actually needs. The full walkthrough is in the [Bedrock section of the plugin README](https://github.com/green-dalii/obsidian-llm-wiki#aws-bedrock--three-auth-modes-v1270-425).

The SSO flow is desktop-only right now. Mobile support is on the way; if it matters to your workflow, please open an Issue and tell us your scenario.

## No more empty stub pages

This one is small, but you'll notice it. Until today, if your source mentioned a name your wiki couldn't resolve to an existing page, the plugin would silently create an empty stub page. Sometimes those stubs were useful. Often they just cluttered your graph with one-line placeholders that absorbed every same-name reference in your vault while erasing the dead-link signal that produced them.

v1.27.0 turns that off by default. If your source mentions something unresolved, the dead link stays visible in your lint reports until a real source defines it — which is what the lint system is for. Ingest still creates pages through normal channels; this only changes what happens to genuinely unresolvable names.

If you liked the old behaviour, the toggle is in **Settings → Advanced** → **Create Stubs for Unresolvable Links**. One click to bring the stubs back. The default is whichever you pick.

## Source pages keep their evidence trail

Every entity and concept page in your wiki already carried a **Mentions in Source** section — the verbatim quotes from the source the AI extracted. The page that represented the underlying document itself (`sources/<slug>.md`) did not. If you ever tried to verify a claim by opening the source page, you'd find the quote trail ended at the entity, not at the source.

Now it does. Every page in the wiki carries the same evidence trail back to the text that produced it. Lint checks those quotes against the underlying PDF (or Markdown) so a misplaced citation is caught before it reaches your graph. For research workflows, this means the trail from any wiki page back to the original document is unbroken in both directions.

## A few smaller things

- **Per-step task policies** — a new field in **LLM Advanced** lets you tell the plugin "use text mode for `extract` but JSON for `merge-triage`" without touching code. The built-in defaults stay intact for every step you don't list. Useful if you have a particular step that's dragging on cost or quality.
- **Ingest candidate gate** — opt-in toggle under **Settings → Advanced**. For sources whose language has a measured profile, candidates that are only mentioned (inside parentheses, enumerations, short list items) are pruned before they cost a page. Off by default; fewer pages is a behaviour change, so it's your call.

## How to get it

- **Already installed?** **Obsidian → Settings → Community plugins → Update**. One click.
- **New?** **Obsidian → Settings → Community plugins → Browse → search "Karpathy LLM Wiki" → Enable**, or use the [Add to Obsidian](/) button on the home page.

Full release notes with engineering detail live on the [v1.27.0 release page](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.27.0), with the maintainer's own framing on [Discussion #555](https://github.com/green-dalii/obsidian-llm-wiki/discussions/555).