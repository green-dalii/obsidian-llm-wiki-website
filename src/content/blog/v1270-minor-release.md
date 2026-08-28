---
title: "Announcement: v1.27.0 — MinerU Joins Document Ingest, Bedrock SSO Lands, Stubs Stop Spamming"
description: "The first MINOR release of the Karpathy LLM Wiki era. PDF, images, and Office documents now share the same pipeline as Markdown notes. AWS Bedrock gets SSO and IAM auth. Nothing about your existing wiki changes by default."
date: 2026-08-28
tags: ["announcement"]
related: ["introducing-llm-wiki", "v123-graph-engine-ai-sdk", "pdf-ingest-guide", "headless-cli", "faster-ingestion"]
---

## Upgrade and forget

v1.27.0 shipped on 2026-08-27 and is the first MINOR release of the Karpathy LLM Wiki era. If you only read one paragraph, read this one: **nothing about your existing wiki changes by default.** Every new setting has been carefully scoped to behave exactly like v1.26.4 unless you opt in. So the upgrade is genuinely one click in Obsidian → Settings → Community plugins → Update.

But if you do poke around, there is a lot to play with this cycle. Here is what is actually new for the way you use the plugin.

## Documents, not just PDFs

Until v1.25.0, the ingest pipeline only saw Markdown notes. v1.25.0 added PDFs as a first-class source through your LLM provider. v1.27.0 completes the picture: **PDF, images (PNG, JPG, JPEG, JP2, WebP, GIF, BMP), and Office documents (DOC, DOCX, PPT, PPTX, XLS, XLSX) all join the same pipeline.** A research paper, a scanned contract, a slide deck from last month's review, and a spreadsheet of results now feed into your wiki through the same write path notes have always used.

The conversion is now a plugin-level switch. Settings → Wiki Configuration → Markdown Conversion Backend → *MinerU* (the new built-in option) or *Native* (the existing cloud-vision path, still PDF-only by design). The MinerU token lives only in Obsidian SecretStorage, never in `data.json`. For users who prefer the manual route, the [MinerU Extractor online service](https://mineru.net/OpenSourceTools/Extractor) is still there — download the converted `.md`, drop it in your vault outside the wiki folder, and ingest as a regular Markdown note.

For most vaults this is a single setting change and then the picker shows every document type your vault contains. Nothing moves; nothing renames; nothing changes unless you flip the switch. The [PDF Ingest guide](/blog/posts/pdf-ingest-guide/) walks through all five entry points — MinerU, native cloud providers, local OCR on Apple Silicon, the online UI, and Force PDF Support — with the tradeoffs for each.

## AWS Bedrock with SSO is here

If you have been holding off on Bedrock because the API-key-only flow did not fit your organization's auth setup, that is over. v1.27.0 adds two more auth modes for AWS Bedrock:

- **API key** — the path that has shipped since Bedrock support landed. Byte-for-byte identical to v1.26.4. If you already pay for a Bedrock API key, keep using this.
- **SSO** — IAM Identity Center device flow. Click *Sign in with AWS SSO*, paste the verification URL code in the browser, and the plugin receives an SSO token via `karpathywiki-bedrock-sso` in SecretStorage, exchanges it for temporary role credentials, and signs every request with a hand-rolled SigV4. Zero AWS SDK added to the bundle.
- **IAM** — static access keys for environments without SSO (CI runners, scheduled batch jobs). Stored in `karpathywiki-bedrock-iam` in SecretStorage; the in-memory cache memoizes per access-key to keep SigV4 signing within expiry.

All three modes share the same SecretStorage discipline: no credentials in `data.json`, logs, or docs. The provider row in Settings → Provider → Bedrock now asks only for the inputs the selected mode actually needs, so the surface stays clean whichever mode you pick. Bedrock region is configured in the same row and is independent of auth mode.

The SSO flow is desktop-only right now (mobile intentionally not enabled yet, since the user-code handoff has more rough edges there). If mobile Bedrock SSO matters to your workflow, please file an Issue — the design is ready, the UI is not.

## Fix Dead Links stops creating empty pages

A small but very pleasant change in daily use. Until now, if your source mentioned a name the wiki could not resolve to an existing page, the plugin would silently create an empty stub page — in both the model's create-stub answer and the deterministic fallback, with no way to decline. The same page then absorbed every same-name reference in the vault while erasing the dead-link signal that produced it.

v1.27.0 introduces a `createStubsForUnresolvableLinks` toggle in Settings → Advanced settings. Default is ON, so every existing vault keeps the current outcome. Turn it OFF and the dead link stays visible in every lint report until a real source defines it; ingest still creates pages through normal channels. The two gates answer different questions: the never-LLM-expand gate (#197, unchanged) asks "may an LLM fill the stub?"; this new one asks "is the stub page written at all?". You can opt out without losing anything else.

## Source pages keep the quotes now

Every entity and concept page already carried a `Mentions in Source` section built from the verbatim quotes the extraction captured. The page that represented the underlying document itself — `sources/<slug>.md` — did not. A measured vault showed the section on 96% of concept pages but 0 of 1,045 source pages. The route that aggregates per-item quotes onto the analysis is now wired into the summary page as well. The transcribed source keeps the same verbatim trail back to the original document that every entity page carries, and lint grounds those quotes against the underlying PDF (or Markdown) so a misplaced citation is caught before it reaches the wiki.

For research workflows this matters in a quiet way: when you open a source page, the `Mentions in Source` section is now the same quality of evidence trail you get on an entity page.

## Per-step task policies

A new field in LLM Advanced: **Task Policies**. Previously hidden in provider configuration, now a top-level control. You can tell the plugin "use text mode for `extract` but JSON for `merge-triage`" through a single settings string. The format is `extract=text:on,merge-triage=text:on,page-generate=-:off`; a misspelled label silently matches nothing, and the per-step control's description now names the common step labels (`extract`, `merge-triage`, `dedup`, …) so you do not need to know internal pipeline label strings to configure it at all.

This is the lever that makes per-step measurement possible. If a particular step in the pipeline is dragging on cost or quality, you can now target it without code changes. The built-in baseline stays intact for every step you do not list.

## Ingest candidate gate (opt-in)

For vaults whose source language has a measured profile, v1.27.0 adds an opt-in `skipMentionOnlyCandidates` toggle (Settings → Advanced, default off). On a measured German vault, 28.7% of extracted candidates were named but never treated by their source — 9.6% had a name absent from the body entirely, 19.1% appeared only inside parentheses, enumerations, or short list items. Each still cost a page plus dedup and generation calls. The gate runs between analysis and page planning: prose candidates keep their pages, and gated names are pruned from other candidates' related-link lists so the gate never manufactures a dead link.

The profiles are pinned: German is measured; English, French, Spanish, Portuguese, Dutch, and Korean are estimated with pinned edge cases; Chinese and Japanese character-script thresholds are deliberately unmeasured (the first thing to measure on a Chinese vault, not a guess); stem-changing languages deliberately get no profile rather than a bad guess. Cross-language notes are not gated — their names are translations, not candidates. Off by default: fewer pages is a behaviour change, so it stays the user's choice.

## Smaller things worth knowing

A few items worth a line each:

- **Ingest flow now labels itself correctly in the per-step accounting table.** The Query Wiki stream path used to fold into a generic `untagged` row alongside genuinely unlabelled calls. It now lands under `query-wiki`.
- **The reasoning-strip probe and token-key probe caches are now keyed per `(baseURL, model)` pair.** A subtle bug where cache hits on provider A's model-1 were silently suppressing cache probes on provider A's model-2 is fixed; you will only notice if you were hitting weird "cache miss" reports on multi-model providers.
- **Complementary appends no longer leak the model's visible reasoning into wiki bodies.** The per-section append was the one raw-prose writer without thinking-block stripping; visible reasoning from a thinking model would have been appended verbatim into the target section. Fixed in this cycle.
- **`npm audit` HIGH went from 1 to 0.** A pnpm/npm lockfile divergence was leaving three vulnerable transitive copies of `brace-expansion` even after the original override; both `overrides` and `pnpm.overrides` are now declared with the same flat values. No user-visible change, but worth mentioning since some of you track this.

## A small but meaningful community cycle

Five distinct external contributors shipped PRs this cycle. The plugin is healthier when the road into it is open, and these are the people who used that road:

- **@XEurekaX** — MinerU backend (#404)
- **@anavalo** — OpenRouter baseURL fixture fix (#516) and the Test Connection blank-model guard (#518)
- **@EvgenyPonomarev** — OpenRouter model-404 URL-fault fix (#535)
- **@pttydou** — OpenRouter `:` variants visible in the catalog (#538)
- **@rexplx** — Source-page verbatim quotes issue report (#496)

Plus **@DocTpoint**, architect-level contributor with 18 PRs this cycle covering the long-running v1.25.x → v1.27.0 ingest-reliability work. If you have been running the plugin for a while and things "just work" lately, much of that is DocTpoint.

## How to get it

If you are on a recent version of the plugin, this release appears as a one-click update in **Obsidian → Settings → Community plugins → Update**. Your wiki, settings, and history carry over automatically.

If you are new: **Obsidian → Settings → Community plugins → Browse → search "Karpathy LLM Wiki" → Enable**, or use the [Add to Obsidian](/) button on the home page.

For the full release notes with engineering detail, see the [v1.27.0 release on GitHub](https://github.com/green-dalii/obsidian-llm-wiki/releases/tag/1.27.0) and the upstream [Discussion #555](https://github.com/green-dalii/obsidian-llm-wiki/discussions/555).
