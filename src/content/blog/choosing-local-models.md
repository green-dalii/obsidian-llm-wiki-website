---
title: "Getting Started (5): Picking a Local Model That Actually Fits Your Wiki"
description: "Qwen3.5, Qwen3.6, Gemma 4, oMLX — which model runs your wiki well, on what hardware, with what tradeoffs. A practical guide to going fully offline without sacrificing usability."
date: 2026-07-20
tags: ["getting-started"]
series: "getting-started"
related: ["choosing-models", "obsidian-basics", "first-100-pages", "introducing-llm-wiki"]
---

## Three reasons, pick the one that's yours

There are three reasons a serious Karpathy LLM Wiki user eventually switches to local models. Pick the one that's yours:

- **Privacy** — your vault holds something that genuinely shouldn't leave the machine: a journalist's sources, a lawyer's client files, research under an NDA, or a personal journal you'd rather no API logs. On ingest, every note, every name gets packed into a prompt and shipped to someone else's GPU. For most people that doesn't matter; for those groups it's a hard constraint.
- **Network** — you're on a plane a lot, behind a corporate firewall that blocks API egress, or on a connection too flaky to trust with a batch ingest job. In those situations the cloud simply isn't there.
- **Cost** — you ingest a lot, and the per-token bill for chewing through thousands of notes has crossed the line where a one-time hardware purchase just makes sense.

If none of those is a real constraint for you — if you're mostly curious — that's fine too, and the end of this post says honestly when local isn't worth the trouble. But if one of them made you nod, keep reading. The plugin was built for this from day one: zero telemetry, no backend, nothing phoning home. And since v1.25.0 even the PDF path runs fully offline (oMLX + Markitdown + Baidu Unlimited-OCR — see [Workflow Guide (8): PDF Ingest](/blog/posts/pdf-ingest-guide/)), which used to be the one thing that dragged people back to the cloud.

The only question left once you've decided is simple: **what do you actually download, and will it run on the hardware you own?**

## Start with what you have, not what's best

Most guides open with a leaderboard of models. That's backwards. The model you should run is almost entirely determined by the hardware already sitting on your desk, so let's start there. Find yourself in one of these three:

```
Your machine is —

  A Mac with an M-series chip (M1/M2/M3/M4)?
      → The easiest path; unified memory does a lot of the work for you. See Apple Silicon.

  A PC / workstation with a discrete NVIDIA GPU?
      → Your ceiling is VRAM, not system RAM, and the math is stricter. See NVIDIA.

  A plain laptop / desktop with no real GPU?
      → You can run a small model, but be straight first: it'll be slow. See CPU-only.
```

### Apple Silicon: unified memory is the cheat code

On a normal PC the model weights have to fit in your graphics card's dedicated VRAM, which is small and expensive. On Apple Silicon there's one big memory pool shared by everything, so the Mac's entire RAM is available to the model. This is why a 64 GB MacBook can comfortably run a 27B-parameter model that would otherwise demand a pair of NVIDIA 3090s, and a 128 GB Mac Studio can run 70B-class models that most people assume need a server rack.

Rough ceilings, so you know where you stand:

| Chip | Unified RAM | What runs comfortably |
|------|-------------|-----------------------|
| M1 / M2 | 8–24 GB | A 7B model; a 13B if you quantize hard |
| M3 | 8–36 GB | A 13B comfortably; a 27B if you push it |
| M4 | 16–48 GB | A 27B, or a 35B MoE with room to spare |
| M4 Max | 36–128 GB | 70B-class, even the big MoE models |

One piece of notation you'll trip over: names like **35B-A3B**. The "A3B" means *active* parameters. It's a Mixture-of-Experts model — 35 billion parameters total, but only 3 billion light up for any given token. So it costs about as much to run as a 3B model while answering closer to a 27B. The Qwen3.5 A3B / A10B family is the best thing to happen to consumer local inference in a while, and it's why a laptop can now punch above its weight.

### NVIDIA: it's all about VRAM

If you're on a discrete NVIDIA card, only the VRAM on the card counts. You can spill overflow into system RAM, but throughput falls off a cliff — roughly 10× slower — so treat your VRAM number as a hard wall.

| VRAM | What runs well |
|------|----------------|
| 8 GB (RTX 3060/4060) | A 7B model, and that's it |
| 12 GB (RTX 4070) | A 13B comfortably |
| 16 GB (RTX 4070 Ti Super) | A 13B with headroom, a 27B if you squeeze |
| 24 GB (RTX 3090/4090) | A 27B, or a 35B-A3B MoE |
| 48 GB+ (A6000 / dual 3090) | 70B-class |

A single 24 GB 4090 is the sweet spot for most enthusiasts — it comfortably runs the models that make the wiki feel good.

### CPU only: possible, but be honest with yourself

No GPU at all? You can still run a small model — Qwen3.5-7B at a heavy quantization will chug along on a modern desktop CPU at maybe 3 tokens per second. That's fine for a single short query if you're patient. It is miserable for ingesting a vault of notes, where you'll be waiting minutes per file. If CPU is all you have, the pragmatic move is to try it on ten notes, and if the wait drives you crazy, keep query local and push ingest to the cloud (the hybrid pattern at the end). Local-everything on CPU is a "because I can" setup, not a "because it's good" one.

## The four or five models worth your attention right now

Model releases move fast, so instead of a giant catalog that's stale in three months, here are the handful actually worth downloading in mid-2026. Pick based on what you want most:

- **If you want one model that does everything okay:** Qwen3.5-13B at Q5_K_M. This is the default I recommend to almost everyone. It's about a 10 GB download, fits on a 16 GB machine, follows the wiki's structured-output prompts reliably, and never leaves you fighting it. Start here.
- **If you want real quality on the chat side:** Qwen3.5-27B, or the 35B-A3B MoE if your hardware likes MoE. This is the jump you feel — answers get more coherent, entity extraction gets sharper, long queries hold together. Worth it once you've got 24 GB+ to work with.
- **If you want Google's particular strengths:** Gemma 4. It's excellent at structured output and holds instructions well on long prompts, which matters for wide queries. Comes in a range of sizes including a tiny E4B that's shockingly capable for classification-style work.
- **If you want frontier reasoning and have the memory to burn:** DeepSeek-V3. It's the strongest open reasoner and the best multilingual model here, with native long context. It's also heavy — plan on 64 GB of unified RAM minimum — so this is a big-Mac-Studio or serious-GPU-rig choice, not a laptop one.
- **The freshest option:** Qwen3.6-27B, if you want the newest long-context extraction quality and don't mind being an early adopter. It's less field-tested than 3.5 but pulls ahead on very long wiki pages.

The wiki's prompt templates have been tuned hardest against Qwen's output shape, which is the main reason it sits at the top of these recommendations — you'll hit fewer malformed-output surprises. If you're unsure, Qwen3.5-13B is the answer.

## Four real setups, and what to run on each

Abstract recommendations stay vague, so here are four machines and a sensible config for each.

**The traveling consultant — MacBook Pro, M4 Pro, 48 GB.** A road machine that has to do everything offline, with plenty of headroom. Run a strong 27B for ingest so entity extraction is accurate, a lean 13B for the background lint sweeps, and a 35B-A3B MoE for query because the MoE gives near-27B answers at a fraction of the running cost. LM Studio is the easiest provider to point the plugin at.

```
Ingest:  Qwen3.5-27B-Instruct (Q4_K_M, MLX)
Lint:    Qwen3.5-13B-Instruct (Q5_K_M, MLX)
Query:   Qwen3.5-35B-A3B (Q4, MLX)
Provider: LM Studio (port 1234)
```

**The privacy maximalist — Mac Studio, M4 Max, 128 GB.** Notes that will never touch a network, and the hardware to make offline feel like nothing was sacrificed. With this much unified memory you can reach for the big guns: the newest Qwen3.6 for long-context ingest, and a 122B-A10B MoE for query — active-10B cost, near-frontier answers. Use oMLX rather than LM Studio; it's the Apple-Silicon-native server and it squeezes noticeably more throughput out of the chip by skipping cross-platform overhead.

```
Ingest:  Qwen3.6-27B (Q4_K_M, MLX) with 256K context
Lint:    Qwen3.5-13B (Q5_K_M, MLX)
Query:   Qwen3.5-122B-A10B (Q4, MLX)
Provider: oMLX (Apple-Silicon-native, OpenAI-compatible)
```

**The tinkerer with a gaming rig — Linux, RTX 4090, 24 GB VRAM.** VRAM is the wall here, and 24 GB won't hold a 27B and a 13B loaded at once. So the trick is to swap: run the 13B for ingest and lint, and load a 27B (with a little CPU offload) only when you query. If juggling models annoys you, just run the 13B for everything — ingest will be a touch slower to reach the same quality, but it's a perfectly good setup. Ollama is the simplest thing to install.

```
Ingest:  Qwen3.5-13B (Q5_K_M, GGUF)
Lint:    Qwen3.5-13B (Q5_K_M, GGUF)
Query:   Qwen3.5-27B (Q4_K_M, GGUF) with partial CPU offload
Provider: Ollama
```

**The thin-and-light minimalist — MacBook Air, M2, 16 GB.** One model for all three jobs, because that's what fits. A 7B at Q4 will run, and it'll answer your questions offline on a fanless laptop, which is genuinely impressive. Be realistic about ingest quality though: you'll see more "it grabbed the wrong entity" cases that need a manual fix. It works — it's just the floor of "actually usable."

```
Ingest:  Qwen3.5-7B-Instruct (Q4_K_M)
Lint:    Qwen3.5-7B-Instruct (Q4_K_M)
Query:   Qwen3.5-7B-Instruct (Q4_K_M)
Provider: Ollama
```

## The single biggest lever: different models for different jobs

The feature that changes the most, and almost nobody uses at first: **the plugin lets you run a fast, cheap model for ingest and a smart, expensive model for query — at the same time.**

Think about what each job actually needs. Ingest runs on every new note; you're paying that cost constantly, so throughput matters more than brilliance. Lint sweeps your whole wiki on a schedule looking for contradictions and dead links; it needs to be perceptive but cheap enough to run in the background. Query is the part you actually stare at, so that's where you want your best model. Matching each job to a right-sized model instead of using one do-everything model is the biggest quality-per-dollar (and quality-per-watt) lever available.

You set it in settings, no code required: **Settings → Wiki → Model Scope**, switch from *Unified* to *Per-Task*, and then you get three independent dropdowns — one for Ingest, one for Lint, one for Query. Leave any of them blank and it falls back to your default model. When you run Test Connection, the plugin checks each model in turn and tells you if any one of them is unreachable, so you won't discover a typo mid-ingest.

Rule of thumb: if you can only afford to run one good model on your hardware, **make it the query model**. That's where you perceive quality. Ingest and lint can share a cheaper one. For the deeper reasoning behind why this matters so much, the deep dive is [Inside the System (3): Choosing the Right Model for Each Task](/blog/posts/choosing-models/).

## The context-length trap

A long context window is the number most people fixate on when picking a model — 256K sounds safer than 128K. But it's worth measuring first what the plugin actually feeds the model on a normal question.

Usually under 10K tokens.

Here's why. The plugin doesn't dump your whole vault into the prompt. It runs a Monte Carlo Personalized PageRank cascade that *pre-ranks* your wiki pages and hands the model only the most relevant handful (see [Inside the System (6): Monte Carlo PPR](/blog/posts/monte-carlo-ppr/) for the mechanics). Measured on a real 2,142-page vault, the prompt sizes look like this:

| Pages fed to the model | Typical prompt | Even on a heavy query |
|------------------------|---------------:|----------------------:|
| Top 5 | ~3,800 tokens | ~12,000 tokens |
| Top 10 | ~6,400 tokens | ~20,000 tokens |
| Top 20 | ~11,000 tokens | ~31,000 tokens |

So unless you're firing off deliberately sprawling queries ("summarize everything I know about X"), 32K of context is plenty. A model that claims 128K but quietly loses the thread past 32K is completely fine for this. Chasing a 256K window buys you nothing here — the pre-ranking already did the hard part.

What does matter is how gracefully a model behaves when a wide query does push the prompt long. Some models keep following instructions cleanly at 50K tokens; others start dropping structure past 64K. Gemma 4 is a standout for holding it together. Spend your attention on that, not on the headline context number.

## Quantization, in plain English

Quantization is just how much you compress the model's weights to make it smaller and faster, at some cost to quality. You'll see labels like `Q4_K_M`, `Q5_K_M`, `Q8_0`. Don't overthink it:

- **Q5 is the sweet spot.** It's about a third the size of the full model and keeps roughly 97% of the quality. If you don't have a specific reason to do otherwise, pick Q5_K_M.
- **Q4 when you need to fit more.** Drop to Q4 when going down a quant level lets you load a meaningfully bigger model in the same memory. A bigger model at Q4 usually beats a smaller model at Q5.
- **Q8 if you're swimming in memory.** Diminishing returns, but if you've got the headroom and want to be sure quantization isn't costing you anything, go Q8 and forget about it.

On Apple Silicon you'll see MLX builds labeled `4bit` and `8bit` instead — those map to roughly Q4 and Q6; MLX doesn't offer a 5-bit yet, so `8bit` is the safe choice when you can afford it. As of v1.25.0 MLX is the default recommendation for Macs. The recipe most people land on: **Q5 for ingest and lint, Q4 for query** so you can load a bigger, smarter query model in the same RAM. If you've got memory to spare, Q6 or Q8 across the board is the no-regrets option.

## When local isn't enough — three honest signals

Local isn't always the right answer. Here are the three signs it's time to go hybrid — keep the privacy-sensitive parts local, hand the demanding parts to the cloud:

1. **Ingest is painfully slow** — minutes per note. Your model is too small or too aggressively quantized. Either step up to a bigger local model, or (thanks to per-task settings) push *just ingest* to a cloud provider while everything else stays offline.
2. **Query answers are wrong on the subtle stuff.** If the model hallucinates past what the PPR retrieval can rescue, that's a reasoning-quality ceiling. Move to a larger model, or offload only the final answer-generation call to the cloud while keeping retrieval local.
3. **Multilingual quality is uneven.** If your vault mixes, say, CJK and European languages and your local model is English-first, you'll see it in the answers. DeepSeek-V3 is the strongest open multilingual option if you want to stay local; otherwise this is a good reason to hybrid.

The pattern that works best: **ingest and store locally (the privacy-critical part), query in the cloud (the quality-critical part).** Because of per-task models, that's a single dropdown change — not a rebuild.

## What to do tomorrow morning

Enough theory. Here's the concrete first hour if you've never run a local model:

1. **Install a runner.** Ollama is the simplest and works everywhere. LM Studio if you'd rather have a GUI. On a Mac where you want maximum speed, install oMLX.
2. **Pull a starter model.** `ollama pull qwen3.5:13b` — about 10 GB, and the one model to bet on for a first run.
3. **Point the plugin at it.** Settings → Wiki Configuration → Provider → Ollama. It auto-detects the local server.
4. **Run Test Connection.** It should pass in a couple of seconds. If it doesn't, the server isn't running or the port's wrong — fix that before anything else.
5. **Ingest one note and look at the result.** Did it pull out the right entities? Do the generated links make sense? If yes, you're done — pull the network cable and enjoy it. If the extraction looks sloppy, that's your signal to step up to a 27B.

The floor for "genuinely usable" is a 7B at Q4 — below that you fight the model more than you use the wiki. The sweet spot for most people is a 13B at Q5. And a 27B at Q4 is where long-context queries start to feel genuinely good. Start in the middle, and move up only when a real limitation pushes you there.

For the fully-offline PDF stack on Apple Silicon, see [Workflow Guide (8): PDF Ingest](/blog/posts/pdf-ingest-guide/). And for the deeper reasoning behind why per-task models matter so much, the deep dive is [Inside the System (3): Choosing the Right Model for Each Task](/blog/posts/choosing-models/).
