---
title: "Multi-Language Wiki Content: Write in English, Read in Japanese"
description: "v1.6.5 introduced Wiki Output Language — 8 languages for your Wiki content, completely independent from the UI language."
date: 2026-05-03
tags: ["i18n", "multilingual", "feature"]
related: ["eight-languages"]
---

## The Problem: Your Language, Your Choice

You're a Japanese developer using Obsidian with an English UI. You drop Japanese notes into `sources/`. Should your Wiki be in English or Japanese?

Before v1.6.5, the answer was: it had to match your UI language.

## The Solution: Independent Wiki Output Language

v1.6.5 introduced the **Wiki Output Language** setting — choose what language the LLM writes Wiki pages in, independent from the plugin's UI language.

**You can now have:**
- English UI + Japanese Wiki
- Chinese UI + English Wiki
- Any combination of the 8 supported languages

**Supported languages:** EN, ZH, JA, KO, DE, FR, ES, PT — plus custom input.

## How It Works

All LLM-facing prompts are written in English. The Wiki Output Language setting is injected as a configuration parameter. This means:

1. **Consistent prompt quality** — English prompts are most reliable
2. **No prompt translation overhead** — no 8 versions of every prompt
3. **Flexible output** — the LLM handles translation at generation time

## What's Next

The multi-language Wiki was step one. The next step was bringing the same 8-language support to the plugin's own UI — which happened in v1.8.0.

[View on GitHub](https://github.com/green-dalii/obsidian-llm-wiki)
