---
title: "Maintenance (2): The Plugin's Localization Pipeline"
description: "v1.8.0 extended the UI from 2 languages to 8, with 269+ fields translated per locale. Inside the i18n process that keeps every release consistent — and what shipping to non-English users taught the team."
date: 2026-05-10
tags: ["getting-started"]
related: ["multilingual-wiki", "introducing-llm-wiki"]
series: "maintenance"
---

## From 2 to 8 Languages

When we first released the plugin, it supported English and Chinese. By v1.8.0, that grew to **8 languages**: EN, ZH, JA, KO, DE, FR, ES, PT.

Every button, every label, every notification — all translated. Not with automated tools, but with careful attention to how software feels in each language.

## The Translation Challenge

269+ UI fields across 8 languages means over 2,000 translations to maintain.

**Natural expressions, not literal translations.** "Add to Obsidian" isn't a direct translation in every language — it's adapted to how users in that locale actually describe the action.

**Technical terms stay in English.** Commands like "Ingest", "Query", "Lint", and "Smart Fix All" are kept in English because they appear in the Obsidian command palette.

## What Changed in v1.8.0

- **6 new language files** — each with 269+ fields
- **Dynamic download badges** — real-time download counts from Obsidian
- **Language switcher** — 8 options in all language interfaces

## What's Next

The full UI internationalization was the last major piece. Focus shifted to performance and reliability — culminating in the extraction prompt rearchitecture of v1.12.0.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
