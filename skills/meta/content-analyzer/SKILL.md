---
name: content-analyzer
description: Use when analyzing published content for sentiment, readability, structure, topics, wording, and engagement correlation.
version: 1.0.0
---

# Content Analyzer

Analyze published content and convert it into actionable quality and engagement insights.

Use this skill for:

- content audits across blog posts, newsletters, or social media posts,
- identifying structural and language patterns behind performance,
- diagnosing underperforming content with measurable signals,
- comparing results against short-term and long-term baselines.

## Six-Dimension Analysis Workflow

### 1) Sentiment

Classify:

- polarity (`positive`, `negative`, `neutral`, `mixed`),
- dominant emotion (for example `curiosity`, `authority`, `urgency`),
- intensity on a 1-5 scale,
- tonal shifts across sections.

### 2) Readability

Measure:

- Flesch-Kincaid grade,
- average sentence and paragraph length,
- vocabulary complexity,
- passive voice ratio.

Use these metrics to assess whether the content is accessible for its target audience.

### 3) Structure

Evaluate:

- opening hook type,
- heading hierarchy consistency,
- use of visual breaks (lists, quotes, code blocks, media),
- CTA count, placement, and strength,
- closing pattern (summary, question, CTA, cliffhanger).

### 4) Topic Classification

Extract:

- primary and secondary topics,
- top keywords and density,
- topic cluster membership for portfolio analysis.

### 5) Wording Patterns

Inspect:

- power-word usage and density,
- transition words for flow,
- jargon level,
- reader-focus indicators (`you`/`your` density),
- action-verb ratio.

### 6) Engagement Correlation

Correlate content features with outcomes (requires metrics such as views, likes, comments, shares, bookmarks):

1. Group content by attribute (hook type, sentiment, length, etc.).
2. Compute average engagement per group.
3. Rank and compare.
4. Report confidence and sample size.

## Minimum Output Contract

Every analysis should include:

- all six dimensions,
- confidence level for key findings,
- sample size for correlations,
- explicit caveats when the dataset is small.

## Guardrails

1. Always run all six dimensions for every analyzed item.
2. Never claim strong engagement patterns from very small datasets.
3. Always compare with 7-day and 30-day baselines when available.
4. Classify hook type before reporting engagement drivers.
5. Respect source constraints (rate limits, terms, robots.txt when scraping).

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
| --- | --- | --- |
| Sentiment-only analysis | Misses structural and readability drivers | Analyze all six dimensions together |
| Tiny-sample correlation claims | Produces noise and false confidence | Report low confidence and gather more data |
| No baseline comparison | Improvement/regression remains unclear | Compare against short and long baselines |
| Equal weighting of all metrics | Hides depth vs breadth differences | Use metric weighting by business goal |
| Unfiltered URL collection | Pollutes dataset with non-content pages | Restrict to publish-ready content URLs |

## Source

Adapted from [agent-studio content-analyzer skill](https://github.com/oimiragieo/agent-studio/tree/406628a513993fbc92c097db4a2b11522bdf8675/.claude/skills/content-analyzer).
