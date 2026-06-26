import type { ScenariosTranslation } from './types';

export const en: ScenariosTranslation = {
  scenarios: [
    {
      id: 'daily-life',
      label: 'Daily Life',
      icon: 'heart',
      filename: 'sleep-hygiene.md',
      sourceNoteContext: "A health science reference note — summarizing key research on sleep architecture, debt, and practical hygiene. The kind of article you'd save to improve your own wellbeing.",
      sourceNote: `# Why We Sleep: Key Findings

Sleep is the single most effective thing we can do to reset our brain and body.

## Sleep Architecture
- NREM Stage 3 (deep sleep): physical restoration, immune function
- REM: emotional processing, creativity, memory consolidation
- Each cycle ~90 min, 4-5 cycles per night ideal

## The Cost of Sleep Debt
- After 1 week of 6h/night: cognitive performance equals 0.05% BAC
- Chronic sleep debt linked to Alzheimer's — glymphatic clearance drops 60%
- 5h sleep → testosterone drops 10–15% in healthy young men

## Practical Sleep Hygiene
- Optimal bedroom temperature: 18–19°C
- No blue light 90 min before bed — melanopsin sensitivity peaks at 480nm
- Caffeine half-life 6h: last intake before 2pm
- Wake-time consistency matters more than bedtime consistency

## Open Questions
- Do naps compensate for night debt? Evidence mixed
- Melatonin: 0.3mg as effective as 3mg. Most supplements are overdosed.`,
      extractedItems: [
        { name: 'Matthew Walker', type: 'entity', lineIdx: 0 },
        { name: 'Glymphatic System', type: 'entity', lineIdx: 0 },
        { name: 'Sleep Architecture', type: 'concept', lineIdx: 0 },
        { name: 'Sleep Debt', type: 'concept', lineIdx: 0 },
        { name: 'Caffeine', type: 'entity', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Glymphatic System', path: 'wiki/entities/glymphatic-system.md', tags: ['Neuroscience', 'Brain'], summary: "The brain's waste clearance system that operates primarily during deep sleep. Chronic sleep deprivation reduces glymphatic clearance by up to 60%, linking poor sleep to Alzheimer's risk." },
        { title: 'Matthew Walker', path: 'wiki/entities/matthew-walker.md', tags: ['Scientist', 'Author'], summary: 'Neuroscientist and sleep researcher, author of "Why We Sleep." Demonstrated the critical role of deep sleep in glymphatic clearance and the cumulative cognitive costs of sleep debt.' },
        { title: 'Sleep Architecture', path: 'wiki/concepts/sleep-architecture.md', tags: ['Neuroscience', 'Sleep'], summary: 'The structure of sleep cycles: NREM Stage 3 for physical restoration and immune function, REM for emotional processing and memory consolidation. Each cycle lasts ~90 minutes, with 4-5 cycles per night ideal.' },
        { title: 'Sleep Debt', path: 'wiki/concepts/sleep-debt.md', tags: ['Health', 'Cognition'], summary: 'The cumulative effect of insufficient sleep. After one week of 6h/night, cognitive performance equals 0.05% BAC. Linked to hormonal disruption, impaired insulin sensitivity, and prefrontal cortex degradation.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 1, to: 0 }, { from: 1, to: 3 },
        { from: 2, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 5 },
      ],
      chatQuestion: 'How does chronic sleep deprivation affect long-term brain health?',
      chatAnswerLead: { text: '[[Chronic sleep deprivation]] impairs the [[glymphatic system]] — the brain\'s waste clearance mechanism that operates during deep sleep. Research shows clearance drops by up to 60% with sustained poor sleep, creating a direct link to neurodegenerative disease risk.' },
      chatAnswerDetail: 'Beyond glymphatic dysfunction, sleep debt also disrupts testosterone production (10–15% drop with 5h sleep), impairs insulin sensitivity, and degrades prefrontal cortex function — the area responsible for decision-making and impulse control.',
      chatSource: 'sleep-hygiene.md',
    },

    {
      id: 'reading',
      label: 'Deep Reading',
      icon: 'book-open',
      filename: 'thinking-fast-and-slow.md',
      sourceNoteContext: "Personal reading notes from Kahneman's classic — not a summary, but a digest of what actually changed how I think about decisions. The kind of notes you write after reading something that genuinely shifts your mental model.",
      sourceNote: `# Thinking, Fast and Slow — Reading Notes

Kahneman's dual-process model of cognition. The thesis: we think we're rational,
but we're governed by an intuitive System 1 that makes systematic errors.

## System 1 vs System 2
- System 1: fast, automatic, effortless. Recognizes faces, detects hostility in a
  voice, answers 2+2. Always on.
- System 2: slow, deliberate, effortful. Multiplies 17×24, fills out a tax form,
  checks the validity of a logical argument. Lazily defaults to System 1.

The core problem: System 2 is lazy. It endorses System 1's snap judgments without
checking them. This is the source of most cognitive biases.

## Key Heuristics and Biases

**Availability Heuristic**
We judge frequency by how easily examples come to mind. Shark attacks feel more
common than diabetes complications because media coverage makes them vivid — yet
diabetes kills 200,000× more people annually.

**Anchoring**
Exposure to a number anchors subsequent judgments. Real estate agents shown a high
list price estimate 15% higher than those shown a low one — even when they insist
the anchor had no effect. The effect is unconscious.

**Loss Aversion**
Losses hurt roughly twice as much as equivalent gains feel good. This explains why:
- People hold losing stocks, sell winners (disposition effect)
- "Free shipping" works better than "$5 off"
- Salary cuts are met with outrage, even when inflation-adjusted pay rises

## Prospect Theory (the Nobel-winning insight)
Utility is reference-dependent. We evaluate outcomes relative to a reference point,
not in absolute terms. A $1,000 bonus feels great; a $1,000 bonus when your
colleague got $2,000 feels like a loss.

## My Takeaways
- Before any major decision, force System 2 activation: write down the problem,
  list what biases might apply, sleep on it.
- Meetings: never present a number first unless you want to anchor the discussion.
- Personal finance: automate decisions (System 1) to protect savings from impulsive
  spending. Set it and forget it.

## Questions I'm Still Thinking About
- Can System 1 be trained? Chess grandmasters' pattern recognition suggests yes.
- Are there domains where System 1 outperforms System 2? (Blink vs. deliberation?)
- How does this interact with LLM reasoning? Are LLMs pure System 2, or can they
  simulate System 1 intuition?`,
      extractedItems: [
        { name: 'Daniel Kahneman', type: 'entity', lineIdx: 0 },
        { name: 'System 1', type: 'concept', lineIdx: 0 },
        { name: 'System 2', type: 'concept', lineIdx: 0 },
        { name: 'Availability Heuristic', type: 'concept', lineIdx: 0 },
        { name: 'Anchoring', type: 'concept', lineIdx: 0 },
        { name: 'Loss Aversion', type: 'concept', lineIdx: 0 },
        { name: 'Prospect Theory', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Daniel Kahneman', path: 'wiki/entities/daniel-kahneman.md', tags: ['Psychologist', 'Nobel Laureate'], summary: 'Israeli-American psychologist who won the 2002 Nobel Prize in Economics for Prospect Theory. His work with Amos Tversky founded behavioral economics and revealed the systematic cognitive biases that govern human decision-making.' },
        { title: 'System 1', path: 'wiki/concepts/system-1.md', tags: ['Cognition', 'Psychology'], summary: 'The fast, automatic, and effortless thinking system that operates continuously. It recognizes patterns, makes snap judgments, and relies on intuition. It is the source of most cognitive biases because it operates below conscious awareness.' },
        { title: 'System 2', path: 'wiki/concepts/system-2.md', tags: ['Cognition', 'Psychology'], summary: 'The slow, deliberate, and effortful thinking system responsible for complex reasoning, logical analysis, and conscious decision-making. It is lazy by design and often defaults to endorsing System 1\'s judgments without verification.' },
        { title: 'Anchoring Effect', path: 'wiki/concepts/anchoring-effect.md', tags: ['Bias', 'Decision-Making'], summary: 'A cognitive bias where exposure to an initial number disproportionately influences subsequent judgments. The effect operates unconsciously — even experts who deny being influenced show the full anchoring effect in controlled experiments.' },
        { title: 'Prospect Theory', path: 'wiki/concepts/prospect-theory.md', tags: ['Behavioral Economics', 'Psychology'], summary: 'Developed by Kahneman and Tversky, prospect theory shows that people evaluate outcomes relative to a reference point rather than in absolute terms. Utility is reference-dependent — the same outcome feels different depending on the frame.' },
      ],
      links: [
        { from: 0, to: 1 }, { from: 0, to: 4 }, { from: 1, to: 2 }, { from: 1, to: 3 },
        { from: 3, to: 4 }, { from: 0, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'How does System 1 interact with System 2 in decision-making?',
      chatAnswerLead: { text: '[[System 1]] generates intuitions and snap judgments continuously, while [[System 2]] lazily endorses them without verification most of the time. Effective decision-making requires deliberately forcing [[System 2]] activation — writing down the problem, listing potential biases, and sleeping on it before acting.' },
      chatAnswerDetail: 'The key insight from Kahneman is that System 2 is not a reliable check on System 1. It requires conscious effort to activate, and most of the time it simply rationalizes whatever System 1 already decided.',
      chatSource: 'thinking-fast-and-slow.md',
    },

    {
      id: 'inspiration',
      label: 'Inspiration',
      icon: 'scissors',
      filename: 'thinking-clippings.md',
      sourceNoteContext: "A collection of web clippings saved over time — articles, essays, and interviews that share a common thread: how to think better. The kind of scraps you collect hoping they'll eventually connect.",
      sourceNote: `# Mental Models & Thinking — Clippings Collection

Random collection. I add to this whenever a mental model shows up across multiple
books or conversations.

## On Facts and Beliefs
> Clipped from James Clear
"Humans need a reasonably accurate view of the world in order to navigate it. But
'accurate' is not the only thing our minds prioritize. If a brain anticipates a
reward for adopting a particular belief, it's perfectly happy to do so. The result
is that false beliefs can be held not because they are true, but because they serve
a social purpose — they help us bond with our tribe."

## How to Think for Yourself
> Clipped from Paul Graham
"There are some kinds of work that you can't do well unless you think differently
from your peers. The difficulty is that people are often mistaken about where they
fall on the spectrum. The most conventional-minded people are confident that they're
independent-minded, while the genuinely independent-minded worry they might not be
independent-minded enough."

## Second-Order Thinking
> Clipped from Farnam Street
"First-order thinking is simplistic and superficial, and just about everyone can do
it. Second-order thinking is the practice of tracing the chain of consequences that
follow from a decision. Many extraordinary results come from decisions that are
first-order negative but second-order positive."

## Inversion
> Clipped from Farnam Street
"The core premise of inversion is that you should not approach difficult problems
from only one direction. Instead, examine them both forward and backward. Charlie
Munger: 'All I want to know is where I'm going to die, so I'll never go there.'"

## On Forecasting
> Clipped from Morgan Housel
"Most problems are more complicated than they look, but most solutions should be
simpler than they are. Read fewer forecasts and more history. Study more failures
and fewer successes."

## What I Want To Connect
- Facts vs beliefs → social bonding mechanism?
- Second-order thinking + inversion → both reward depth over breadth
- Graham's spectrum → how do I know where I actually fall?`,
      extractedItems: [
        { name: 'James Clear', type: 'entity', lineIdx: 0 },
        { name: 'Paul Graham', type: 'entity', lineIdx: 0 },
        { name: 'Charlie Munger', type: 'entity', lineIdx: 0 },
        { name: 'Second-Order Thinking', type: 'concept', lineIdx: 0 },
        { name: 'Inversion', type: 'concept', lineIdx: 0 },
        { name: 'Independent-Mindedness', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'James Clear', path: 'wiki/entities/james-clear.md', tags: ['Author', 'Habits'], summary: 'Author of "Atomic Habits" and writer on decision-making, habits, and human behavior. His work explores why people hold false beliefs and how social identity shapes what we find convincing.' },
        { title: 'Paul Graham', path: 'wiki/entities/paul-graham.md', tags: ['Founder', 'Essayist'], summary: 'Co-founder of Y Combinator and influential essayist on startups, technology, and thinking. His essay "How to Think for Yourself" dissects independent-mindedness into three components: truth-fastidiousness, resistance to conformity, and curiosity.' },
        { title: 'Second-Order Thinking', path: 'wiki/concepts/second-order-thinking.md', tags: ['Mental Model', 'Decision-Making'], summary: 'The practice of tracing chains of consequences beyond immediate outcomes. Many extraordinary results come from decisions that are first-order negative but second-order positive. The key technique: repeatedly ask "And then what?"' },
        { title: 'Inversion', path: 'wiki/concepts/inversion.md', tags: ['Mental Model', 'Decision-Making'], summary: 'A problem-solving approach that examines problems forward and backward. Instead of asking how to achieve an outcome, ask how to guarantee the opposite — then avoid those things. "Avoiding stupidity is easier than seeking brilliance."' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 3 }, { from: 0, to: 1 },
        { from: 1, to: 4 }, { from: 0, to: 5 }, { from: 3, to: 4 },
      ],
      chatQuestion: 'What is the common thread between Second-Order Thinking and Inversion?',
      chatAnswerLead: { text: '[[Second-Order Thinking]] and [[Inversion]] both reward depth over breadth and require resisting System 1\'s immediate intuition. Second-order thinking traces consequences forward; inversion traces failures backward. Both force you to look beyond what is obvious.' },
      chatAnswerDetail: 'Where they differ: Second-order thinking is additive (what else happens?), while inversion is subtractive (what should I avoid?). Used together, they form a powerful decision framework: use inversion to eliminate bad options, then use second-order thinking to evaluate the remaining ones.',
      chatSource: 'thinking-clippings.md',
    },

    {
      id: 'creation',
      label: 'Content Creation',
      icon: 'mic',
      filename: 'podcast-episode-plan.md',
      sourceNoteContext: 'A production planning doc for a podcast episode — research on the guest, structured questions, narrative arc. The kind of document that separates well-prepared interviews from rambling conversations.',
      sourceNote: `# The Knowledge Stack — Episode 12 Plan

Guest: Dr. Andy Matuschak (independent researcher, ex-Apple, ex-Khan Academy)
Topic: "Tools for Thought and the Future of Reading"

## Guest Background
- Led R&D at Khan Academy on mastery learning algorithms
- Worked at Apple on early iPad education initiatives
- Now runs independent research lab studying tools for thought
- Known for: "Evergreen notes" methodology, "Working in public" research practice
- His essay "Why books don't work" sparked major debate in PKM community

## Core Questions
1. You wrote that "books don't work" — most people forget 90% of what they read.
   What would a "working" medium for knowledge transfer look like?
2. Your "evergreen notes" system emphasizes atomicity and progressive summarization.
   How does this differ from traditional note-taking?
3. You've been vocal about the gap between tools-for-thought research and mainstream
   adoption. What's the biggest blocker?
4. With LLMs now able to answer questions about any book instantly, what's the role
   of human reading in 2026?
5. Your research practice is radically open — you publish half-finished thoughts daily.
   Doesn't this create noise? How do you balance depth with speed?

## Key References to Mention
- Matuschak, A. (2019). "Why books don't work"
- Nielsen, M. (2018). "Augmenting human intellect"
- Engelbart, D. (1962). "Augmenting Human Intellect" — the mother of all demos

## Open Questions for Post-Interview
- Should I read Andy's full "Evergreen notes" essay before recording?
- Do I need a second guest for counterpoint?
- Recording logistics: async voice memo or live video?`,
      extractedItems: [
        { name: 'Andy Matuschak', type: 'entity', lineIdx: 0 },
        { name: 'Khan Academy', type: 'entity', lineIdx: 0 },
        { name: 'Douglas Engelbart', type: 'entity', lineIdx: 0 },
        { name: 'Evergreen Notes', type: 'concept', lineIdx: 0 },
        { name: 'Tools for Thought', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Andy Matuschak', path: 'wiki/entities/andy-matuschak.md', tags: ['Researcher', 'PKM'], summary: 'Independent researcher studying tools for thought. Formerly at Khan Academy and Apple. Known for "Why books don\'t work" essay and the "evergreen notes" methodology for atomic, linked knowledge management.' },
        { title: 'Khan Academy', path: 'wiki/entities/khan-academy.md', tags: ['Education', 'Nonprofit'], summary: 'Online education platform founded by Sal Khan. Known for mastery learning algorithms and the flipped classroom model. Matuschak led R&D on adaptive learning systems during his tenure.' },
        { title: 'Evergreen Notes', path: 'wiki/concepts/evergreen-notes.md', tags: ['PKM', 'Methodology'], summary: 'A note-taking methodology emphasizing atomicity, concept-orientation, and progressive summarization. Notes are written to be permanently useful and continuously refined, rather than capturing transient thoughts.' },
        { title: 'Tools for Thought', path: 'wiki/concepts/tools-for-thought.md', tags: ['Technology', 'Cognition'], summary: 'Software and systems designed to augment human thinking, memory, and creativity. Originated with Engelbart\'s 1962 "Augmenting Human Intellect." Key challenge: closing the gap between research prototypes and mainstream adoption.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 0, to: 4 }, { from: 2, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'What is the core difference between evergreen notes and traditional note-taking?',
      chatAnswerLead: { text: '[[Evergreen notes]] are written to be permanently useful and continuously refined, while traditional note-taking captures transient thoughts for short-term recall. Evergreen notes emphasize [[atomicity]] (one idea per note), [[concept-orientation]] (named by concept, not source), and [[progressive summarization]] (multi-layer distillation).' },
      chatAnswerDetail: 'The key shift is from "what did I read?" to "what do I believe?" Traditional notes are bibliographic; evergreen notes are epistemic. This makes them composable — you can build new ideas by linking atomic notes without re-reading original sources.',
      chatSource: 'podcast-episode-plan.md',
    },

    {
      id: 'academic',
      label: 'Academic Research',
      icon: 'microscope',
      filename: 'attention-is-all-you-need.md',
      sourceNoteContext: 'Research notes on a seminal AI paper — the kind of deep-dive you do when you need to understand the foundations, not just the headlines. Vaswani et al., 2017.',
      sourceNote: `# Attention Is All You Need — Notes

The paper that killed RNNs and birthed the Transformer. Vaswani et al., 2017.

## The Core Idea
Instead of processing tokens sequentially (RNN style), process everything in
parallel using "attention" — let each token look at every other token and decide
which ones matter. The key insight: sequential processing was the bottleneck,
not a feature.

## Three Attention Mechanisms
- Self-Attention: every word in a sentence attends to every other word. This
captures long-range dependencies that RNNs lose after ~50 tokens.
- Multi-Head Attention: run 8 parallel attention operations, each learning
different relationship types (syntax, semantics, coreference). Concatenate
the results. Each head specializes in something different.
- Scaled Dot-Product: the Q·K^T operation divided by sqrt(d_k). Without the
scaling factor, gradients explode at high dimensions.

## Positional Encoding
Since there's no recurrence, the model has no idea about word order. The fix:
add sine/cosine waves of different frequencies to input embeddings. This gives
the model position information without adding parameters.

## Why This Changed Everything
- Training was parallelizable (RNNs trained token-by-token, Transformers train
the whole sequence at once) → scale to larger datasets
- Long-range dependencies: RNNs had ~50-token memory; Transformers have no
fixed limit (bounded by context window, which grew from 512 to 1M+ tokens)
- This paper led directly to: BERT (2018), GPT (2018+), every modern LLM

## Open Questions
- Is attention truly the final form? State Space Models (Mamba, S4) challenge
the quadratic complexity of attention
- Do multiple heads actually learn distinct patterns, or are they redundant?`,
      extractedItems: [
        { name: 'Vaswani et al.', type: 'entity', lineIdx: 0 },
        { name: 'Google Brain', type: 'entity', lineIdx: 0 },
        { name: 'BERT', type: 'entity', lineIdx: 0 },
        { name: 'Self-Attention', type: 'concept', lineIdx: 0 },
        { name: 'Multi-Head Attention', type: 'concept', lineIdx: 0 },
        { name: 'Positional Encoding', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Vaswani et al.', path: 'wiki/entities/vaswani-et-al.md', tags: ['AI', 'Researchers'], summary: 'The Google Brain team that published "Attention Is All You Need" (2017), introducing the Transformer architecture. Their work replaced RNNs, enabled parallel training at scale, and directly led to BERT, GPT, and every modern LLM.' },
        { title: 'BERT', path: 'wiki/entities/bert.md', tags: ['AI', 'NLP'], summary: 'Bidirectional Encoder Representations from Transformers, published by Google in 2018. Built directly on the Transformer\'s encoder stack, BERT achieved state-of-the-art results across 11 NLP tasks and demonstrated the power of pre-training + fine-tuning.' },
        { title: 'Self-Attention', path: 'wiki/concepts/self-attention.md', tags: ['AI', 'NLP'], summary: 'The core mechanism of the Transformer: every token in a sequence attends to every other token simultaneously, computing weighted relationships. Enables parallel processing and captures long-range dependencies beyond RNNs\' ~50-token limit.' },
        { title: 'Multi-Head Attention', path: 'wiki/concepts/multi-head-attention.md', tags: ['AI', 'NLP'], summary: 'Runs multiple parallel attention operations (typically 8 heads), each learning different relationship types (syntax, semantics, coreference). Outputs are concatenated and projected, allowing joint attention across different representation subspaces.' },
        { title: 'Positional Encoding', path: 'wiki/concepts/positional-encoding.md', tags: ['AI', 'NLP'], summary: 'Since Transformers process all tokens in parallel, they have no inherent notion of word order. Positional encoding adds sine/cosine waves of varying frequencies to input embeddings, encoding position without adding trainable parameters.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 2, to: 4 },
        { from: 3, to: 4 }, { from: 1, to: 5 },
      ],
      chatQuestion: 'Is attention the final form, or will State Space Models replace it?',
      chatAnswerLead: { text: '[[Attention]] is not the final form — [[State Space Models]] (Mamba, S4) are already challenging its O(n²) complexity. SSMs achieve [[linear scaling]] with sequence length while maintaining competitive performance on long-context tasks.' },
      chatAnswerDetail: 'However, attention has a massive ecosystem advantage: every major LLM (GPT, Claude, Gemini) is built on it, and GPU hardware is optimized for matrix multiplication. SSMs need to prove not just theoretical efficiency but practical superiority at scale before replacing attention entirely.',
      chatSource: 'attention-is-all-you-need.md',
    },

    {
      id: 'business',
      label: 'Business',
      icon: 'trending-up',
      filename: 'stripe-strategy.md',
      sourceNoteContext: 'A competitive strategy analysis — breaking down the business model, growth levers, and market position. The kind of research note a PM, consultant, or founder writes before a major strategic decision.',
      sourceNote: `# Stripe's Strategic Evolution

## From Developer Tool to Economic Infrastructure

Stripe started as "7 lines of code to accept payments." But that framing
obscures the real strategy: they didn't win by making payments easier —
they won by making the developer the buyer.

## Key Strategic Moves
- **API-first distribution**: every developer who integrates Stripe becomes
  an internal champion. No sales team needed for SMB segment
- **Compound product**: Payments → Billing → Tax → Treasury → Issuing. Each
  product leverages data from the previous one. Switching costs increase
  exponentially — you can replace a payment processor, you can't replace
  your entire financial stack
- **Card network bypass**: Stripe's direct integrations with Visa/Mastercard
  remove acquirer middlemen. Estimated 15–25 bps margin advantage over
  competitors who route through legacy acquirers

## Revenue Model
- 2.9% + $0.30 per transaction (core payments)
- Billing/Tax/Radar: additional 0.4–0.8% per transaction
- Growing revenue share from non-payment products (Link, Capital, Atlas)
- Estimated $1T+ total payment volume (2023), implying ~$14B+ net revenue

## Competitive Position
- vs Adyen: Stripe wins on developer experience; Adyen wins on enterprise
- vs Square: Stripe online-first; Square POS-first. Converging
- Threat: in-house builds by large merchants (Shopify, DoorDash)

## Open Questions
- Can Stripe maintain growth without expanding into lending/lending-adjacent?
- China/SEA expansion still minimal — regulatory barrier or strategic choice?`,
      extractedItems: [
        { name: 'Stripe', type: 'entity', lineIdx: 0 },
        { name: 'Visa', type: 'entity', lineIdx: 0 },
        { name: 'Mastercard', type: 'entity', lineIdx: 0 },
        { name: 'API-First Distribution', type: 'concept', lineIdx: 0 },
        { name: 'Compound Product', type: 'concept', lineIdx: 0 },
        { name: 'Card Network Economics', type: 'concept', lineIdx: 0 },
      ],
      generatedPages: [
        { title: 'Stripe', path: 'wiki/entities/stripe.md', tags: ['Fintech', 'SaaS'], summary: 'Payment infrastructure company founded in 2010. Core strategy: API-first distribution targeting developers as buyers, then expanding into compound products (Billing, Tax, Treasury, Issuing). Estimated $1T+ payment volume and $14B+ net revenue.' },
        { title: 'Visa & Mastercard', path: 'wiki/entities/visa-mastercard.md', tags: ['Fintech', 'Networks'], summary: 'The dominant global card networks that process the majority of consumer payments. Payment processors must interact with their infrastructure — direct integration bypassing acquirers can yield 15–25 bps margin advantage.' },
        { title: 'API-First Distribution', path: 'wiki/concepts/api-first-distribution.md', tags: ['Strategy', 'Go-to-Market'], summary: 'A go-to-market strategy where the product is distributed through APIs targeting developers. Every integrator becomes an internal champion, creating bottom-up adoption without traditional sales teams. Stripe is the archetype.' },
        { title: 'Compound Product Strategy', path: 'wiki/concepts/compound-product.md', tags: ['Strategy', 'Product'], summary: 'Building interconnected products where each new layer leverages data from previous ones. Switching costs increase exponentially — replacing one product is easy, replacing the entire stack is nearly impossible.' },
      ],
      links: [
        { from: 0, to: 2 }, { from: 0, to: 1 }, { from: 2, to: 3 }, { from: 1, to: 3 },
        { from: 1, to: 4 }, { from: 3, to: 5 }, { from: 4, to: 5 },
      ],
      chatQuestion: 'Can Stripe maintain growth without expanding into lending?',
      chatAnswerLead: { text: '[[Stripe]] faces a classic growth ceiling: payment processing margins are compressing (2.9% + $0.30 is already under pressure from in-house builds by Shopify, DoorDash). The company must either expand into higher-margin adjacent services (lending, capital) or accept lower growth rates.' },
      chatAnswerDetail: "The compound product strategy is Stripe's answer: each layer builds on the previous one, making the entire stack progressively harder to replace. But lending is the highest-margin financial service — and the one Stripe has been most cautious about entering.",
      chatSource: 'stripe-strategy.md',
    },
  ],
};