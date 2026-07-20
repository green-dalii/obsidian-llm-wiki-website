---
title: "Getting Started (5): Picking a Local Model That Actually Fits Your Wiki"
description: "Qwen3.5, Qwen3.6, Gemma 4, oMLX — which model runs your wiki well, on what hardware, with what tradeoffs. A practical guide to going fully offline without sacrificing usability."
date: 2026-07-20
tags: ["getting-started"]
series: "getting-started"
related: ["choosing-models", "obsidian-basics", "first-100-pages", "introducing-llm-wiki"]
---

## Why run local at all

Three reasons drive people to a fully-offline Karpathy LLM Wiki setup:

- **Privacy posture**: notes never leave the machine. Client records, research drafts, personal journals.
- **Network reality**: travel, restricted networks, behind a corporate firewall that blocks API egress.
- **Cost ceiling**: high-frequency batch ingest on cloud APIs adds up. A one-time hardware purchase amortizes.

The plugin was designed for this case from the start — zero telemetry, no backend, no data collection. Since v1.25.0 the **fully-local PDF path** (oMLX + Markitdown + Baidu Unlimited-OCR, see [Workflow Guide (8): PDF Ingest](/blog/posts/pdf-ingest-guide/)) closes the last gap that used to push users back to cloud for PDFs.

This post walks through the practical question: **which local model, on which hardware, does what well?** The answer changes fast — this post is calibrated to v1.25.0's recommendations and the model releases of mid-2026.

## The hardware tiers (what you're running on)

### Apple Silicon (M-series)

Unified memory is the killer feature. The LLM weights live in the same memory pool as everything else, so a Mac with 64 GB unified memory can run a 27B-parameter quantized model comfortably, and a 128 GB machine can run 70B-class models that would need 2× NVIDIA 3090s otherwise.

| Chip | Unified RAM | Practical ceiling |
|------|-------------|-------------------|
| M1 / M2 | 8–24 GB | 7B Q4_K_M, 13B Q3_K_S |
| M3 | 8–36 GB | 13B Q4_K_M, 27B Q3_K_M |
| M4 | 16–48 GB | 27B Q4_K_M, 35B-A3B comfortably |
| M4 Max | 36–128 GB | 70B Q4, 122B-A10B feasible |
| M4 Ultra (when available) | 64–192 GB | 122B+ at higher precision |

The "A3B" / "A10B" notation refers to **active parameters** in a Mixture-of-Experts model — the model has 35B (or 122B) total parameters but only 3B (or 10B) activate per token, so the actual compute and memory-bandwidth cost is closer to a 3B (or 10B) dense model. This is the architecture behind the recent Qwen3.5-A3B / Qwen3.5-A10B family.

### NVIDIA

Discrete GPU VRAM is the constraint, not system RAM. You can spill to CPU but throughput drops by an order of magnitude.

| VRAM | Practical ceiling |
|------|-------------------|
| 8 GB (RTX 3060/4060) | 7B Q4_K_M |
| 12 GB (RTX 3060/4070) | 13B Q4_K_M |
| 16 GB (RTX 4060 Ti/4070 Ti Super) | 13B Q5_K_M, 27B Q3_K_S |
| 24 GB (RTX 3090/4090) | 27B Q4_K_M, 35B-A3B |
| 48 GB (RTX A6000 / 2× 3090) | 70B Q4 |
| 80 GB (A100 / H100) | 70B Q5, 122B-A10B |

### CPU-only (no GPU)

Still possible for small models — Qwen3.5-7B at Q4 runs on a modern desktop CPU at ~3 tokens/sec, which is slow but usable for a 1k-token query. Not recommended for batch ingest.

## The model shortlist (mid-2026)

These are the models the v1.25.0 release notes name, plus a few that have stabilized since. The recommendation is **per task**, because the plugin's Per-Task Models setting (v1.24.0) lets you pick different models for Ingest / Lint / Query.

### For Ingest (entity extraction, concept pages, page generation)

Ingest wants a model that follows instructions precisely, handles structured output, and doesn't refuse benign requests. **Throughput matters more than absolute quality** — you're paying this cost on every new source note.

| Model | Size | Strength | Weakness |
|-------|------|----------|----------|
| **Qwen3.5-27B-Instruct (Q4_K_M)** | ~17 GB on Apple Silicon | Best open-source instruction-following at this size for entity extraction | Needs ≥32 GB unified RAM |
| **Qwen3.5-35B-A3B (Q4)** | ~20 GB | MoE — active 3B cost, near-27B quality | First-token latency higher than dense |
| **Qwen3.6-27B-Instruct** | ~17 GB | 256K+ context, beats Qwen3.5 on long-wiki extractions | Newer, less field-tested |
| **Gemma 4-26B-A4B** | ~16 GB | Google's open weights, strong on structured output | Slightly weaker multilingual coverage |
| **DeepSeek-V3 (Q4)** | ~40 GB | Top open-source reasoning, native 128K context | Heavy — needs 64 GB unified RAM minimum |

The v1.25.0 release notes put Qwen3.5 at the top of this list because the prompt templates in `src/wiki/prompts/*.ts` were tested most heavily against its output shape.

### For Lint (alias merging, dead-link fixing, contradiction detection)

Lint runs on your whole wiki at intervals. It needs a model that's both **perceptive enough to spot subtle contradictions** and **cheap enough to run periodically**. A model that's great at creative writing is overkill here — you want determinism.

| Model | Size | Why it fits |
|-------|------|-------------|
| **Qwen3.5-13B-Instruct (Q5_K_M)** | ~10 GB | Mid-tier instruction-following, fits in 16 GB |
| **Gemma 4-E4B (Q4)** | ~4 GB | Tiny, fast, surprisingly good at classification |
| **DeepSeek-V3 (Q4)** | (same as above) | If you already have it loaded for ingest |

The user-reported sweet spot is a 13B-class model for lint. Below 7B you start losing nuance on contradictions; above 27B you're overpaying for tasks that don't need it.

### For Query (chat, retrieval-augmented generation)

Query is the user-facing surface. Latency and reasoning quality both matter. The plugin's first-query PPR warmup (v1.24.0) means the first query after a settings change is now fast, but you still want a model that **answers well under a multi-thousand-token context**.

| Model | Size | Why it fits |
|-------|------|-------------|
| **Qwen3.6-27B with 256K+ context** | ~17 GB | Long-wiki answers without truncation |
| **Qwen3.5-35B-A3B (Q4)** | ~20 GB | Excellent answer quality at MoE cost |
| **Gemma 4-31B** | ~20 GB | Google's strongest open model for chat |
| **DeepSeek-V3** | (heavy) | Top-tier reasoning, slower throughput |

If you can only afford one model on your hardware, **make it your query model** — that's where the user-perceived quality lives. The other two tasks can fall back to a cheaper model.

## A practical configuration matrix

Three pre-built configurations that fit the named hardware tiers. Per-task model assignment is set in **Settings → Wiki → Model Scope → Per-Task**.

### MacBook Pro M4 Pro (48 GB unified)

```
Ingest:  Qwen3.5-27B-Instruct (Q4_K_M, MLX)
Lint:    Qwen3.5-13B-Instruct (Q5_K_M, MLX)
Query:   Qwen3.5-35B-A3B (Q4, MLX)
Provider: LM Studio (port 1234)
```

All three fit comfortably. Ingest and Lint use the same base model family for prompt-template compatibility; query uses a slightly bigger MoE for answer quality.

### Mac Studio M4 Max (128 GB unified)

```
Ingest:  Qwen3.6-27B (Q4_K_M, MLX) with 256K context
Lint:    Qwen3.5-13B (Q5_K_M, MLX)
Query:   Qwen3.5-122B-A10B (Q4, MLX) — top-tier
Provider: oMLX (Apple-Silicon-native OpenAI-compatible server)
```

oMLX outperforms LM Studio on Apple Silicon because it bypasses some cross-platform abstractions. The 122B-A10B active-10B MoE gives you near-frontier answer quality on a 128 GB machine.

### Linux + RTX 4090 (24 GB VRAM)

```
Ingest:  Qwen3.5-13B (Q5_K_M, GGUF)
Lint:    Qwen3.5-13B (Q5_K_M, GGUF)  — same model
Query:   Qwen3.5-27B (Q4_K_M, GGUF) with partial CPU offload
Provider: Ollama (simplest setup)
```

On a single 4090 you can't fit a 27B and a 13B simultaneously, but you can swap them based on which task is running. Or: drop one and use Qwen3.5-13B for everything (ingest will be slower than 27B but still acceptable).

### Minimal: M2 MacBook Air (16 GB unified)

```
Ingest:  Qwen3.5-7B-Instruct (Q4_K_M)
Lint:    Qwen3.5-7B-Instruct (Q4_K_M)  — same model
Query:   Qwen3.5-7B-Instruct (Q4_K_M)  — same model
Provider: Ollama
```

One model for everything. Ingest quality is noticeably lower than the 27B path — you'll see more "wrong entity extracted" cases that need manual review. But it works, on a thin-and-light laptop.

## The context-length trap

A common mistake: choosing a model because it advertises 128K or 256K context. **The number you actually use is far smaller** because the wiki pages are pre-ranked by the PPR cascade (see [Inside the System (6): Monte Carlo PPR](/blog/posts/monte-carlo-ppr/) for how this works).

The empirical distribution from the v1.23.0 tuning cycle on a 2,142-page real-vault:

| Top-k | Mean prompt tokens | p95 prompt tokens |
|-------|-------------------:|------------------:|
| k=5 | 3,800 | 12,100 |
| k=10 | 6,400 | 19,800 |
| k=20 | 11,200 | 31,500 |

So unless you're doing wide queries ("summarize everything related to X"), 32K context is plenty. A model that advertises 128K but loses coherence past 32K is fine. A model that advertises 256K but doesn't lose coherence at 200K is overkill but harmless.

What **does** matter is the cascade's PPR behavior on long prompts. Models that degrade gracefully (still follow instructions at 50K tokens) handle wide queries better. Gemma 4-31B is strong here; some Qwen variants lose structure past 64K.

## Quantization: MLX vs GGUF

The two ecosystems for Apple Silicon and NVIDIA respectively. v1.25.0's local recommendations list is the first time MLX is the default for Apple Silicon — GGUF still works but is a tier slower.

| Format | Best for | Tradeoff |
|--------|----------|----------|
| **MLX** | Apple Silicon (M-series) | Apple-native, uses Apple's AMX/NEON; ~20–40% faster than GGUF on M3/M4 |
| **GGUF** | NVIDIA, CPU, cross-platform | Universal; llama.cpp under the hood; smaller community now |
| **GPTQ / AWQ** | Older NVIDIA cards (pre-Ampere) | 4-bit weight-only quantization; faster than GGUF on RTX 30-series but worse quality at the same size |

The rule of thumb from the v1.25.0 release notes: **MLX on Apple Silicon, GGUF everywhere else**, unless you're on RTX 30-series where GPTQ can beat GGUF by 15%.

## MLX vs GGUF quantization levels

Within each format, the quantization level (Q4, Q5, Q6, Q8) trades quality against size/throughput. The naming convention is `Q{level}_K_{variant}` for GGUF and `4bit`/`8bit` for MLX.

| Level | Size vs FP16 | Quality vs FP16 | When to use |
|-------|--------------|-----------------|-------------|
| Q8_0 | 50% | ~99% | Storage-cheap, want quality |
| Q6_K | 40% | ~98% | Diminishing returns over Q5 |
| **Q5_K_M** | 35% | ~97% | **Recommended for most setups** |
| Q4_K_M | 28% | ~94% | When you need to fit a bigger model in the same RAM |
| Q3_K_S | 22% | ~88% | Last resort |

For MLX the equivalents are 8bit (~Q6) and 4bit (~Q4_K_M). MLX doesn't have a 5-bit or 7-bit option yet.

The user-reported sweet spot across the v1.24 tuning cycle: **Q5_K_M on ingest/lint, Q4_K_M on query** (so you can load a bigger query model in the same memory). Unless you have plenty of headroom, in which case Q6_K everywhere is the safest choice.

## The Per-Task Models setting

Since v1.24.0, the plugin supports **per-task model assignment**. The path:

**Settings → Wiki → Model Scope → Per-Task** (vs Unified)

Switch from `Unified` to `Per-Task`, then independently pick:

- **Ingest model** — used by source-analyzer, page-factory × 7, conversation-ingest × 4, wiki-engine, schema-manager, auto-maintain × 2
- **Lint model** — used by analysis-phase, dedup-phase, fill-empty-page, fix-dead-link × 2, fix-runners × 2, link-orphan, merge-duplicates, contradictions
- **Query model** — used by QueryView × 3 send + save-eval + seed-selector

Each task's model resolution goes through `core/model-resolver.ts`'s `resolveModelForTask(settings, task)`. Empty per-task fields fall back to `settings.model`. Test Connection probes each model sequentially with fail-fast — if any per-task model fails the probe, the connection is unhealthy until you fix it.

The 28 LLM call sites that switched to per-task model resolution in v1.24.0 (PR #264) are the single biggest reason the per-task setting actually pays off — you can use a fast cheap model for ingest and a smart expensive model for query without writing code.

## When local isn't enough

A few signals that you've outgrown a local setup and should consider hybrid (local + cloud for specific tasks):

- **Ingest takes >10 minutes per note**: the model is too small or too quantized. Either move to a bigger local model or switch ingest to a cloud provider while keeping query local.
- **Query answers are wrong on subtle facts**: the model is hallucinating beyond what the PPR cascade can rescue. Try a larger model, or offload the final LLM call to a cloud provider while keeping the retrieval local.
- **Multilingual coverage is uneven**: if your wiki mixes CJK + European languages and the local model is English-centric, the answer quality will be visibly worse. DeepSeek-V3 is the strongest multilingual open model as of mid-2026.

A common pattern: **ingest locally (privacy-critical), query in cloud (quality-critical)**. The Per-Task Models setting makes this one config change.

## Where to start

If you've never run a local model before:

1. **Install Ollama** (simplest setup, cross-platform) or **LM Studio** (nicer GUI, also cross-platform). On Apple Silicon and you want maximum throughput, install **oMLX** instead.
2. **Pull a starter model**: `ollama pull qwen3.5:13b` (about 8 GB download).
3. **In the plugin**: Settings → Wiki Configuration → Provider → Ollama. The plugin auto-detects the local server.
4. **Run a Test Connection**: should pass in seconds.
5. **Ingest one note**. If the entity extraction looks reasonable, you're set. If not, try a bigger model.

The 7B Q4 model on a modern laptop is the floor for "actually usable". Below that, you'll fight the model more than the wiki. The 13B Q5 is the sweet spot for most setups. The 27B Q4 is where quality noticeably improves on long-context queries.

For PDF ingest on Apple Silicon specifically, see [Workflow Guide (8): PDF Ingest](/blog/posts/pdf-ingest-guide/) for the oMLX + Markitdown + Baidu Unlimited-OCR stack.

If you want to understand why the per-task model setting matters at all, the deep dive is [Inside the System (3): Choosing the Right Model for Each Task](/blog/posts/choosing-models/).