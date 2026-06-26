---
title: SeniorAIQ
type: moc
tags: [senioraiq, moc]
---

# SeniorAIQ

Top-level Map of Content for the SeniorAIQ initiative. Senior housing intelligence platform aggregating, scoring, and surfacing senior housing data for Washington State. Live at [senioraiq.com](https://senioraiq.com).

**Project hierarchy:**
- **SeniorAIQ** -- umbrella initiative, brand, and website (this hub)
- **SHIP** (Senior Housing Intelligence Platform) -- Go backend repo at `~/projects/ship/`. Notes under [[#Backend ship/|ship/]] below.
- **ship-ui** -- SvelteKit frontend repo at `~/projects/ship-ui/`. Notes under [[#Frontend ship-ui/|ship-ui/]] below.

Blog content, planning, partner correspondence, and anything spanning both repos lives at this umbrella level.

## Overview & reference

- [[Game Plan 2026]] -- ownership structure, Phase 1 launch (2026-09-01), products/pricing, execution, Phase 2 ideas (from Justin Younker)
- [[AIQ-scoring-summary]] -- platform overview, scoring categories and weights, data sources, current coverage
- [[TAGGING-CONVENTION-HANDOFF]] -- multi-repo tag convention (parent-only tagging via GSD)
- [[ynkr]] -- raw notes: open bugs, fix snippets, review collection sequence, tech debt

## Active work

- [[TODO]] -- umbrella SeniorAIQ tasks/bugs roll-up (queries `#ship/todo` and `#ship/bug`)
- `TODO/` -- 18+ open detail docs (one markdown per topic)
- `TODO/DONE/` -- completed TODOs (archive)

## Blog

All blog content lives in `blog/`. King County series (parts 01--05) plus standalone posts.

- [[blog-content-strategy]] -- LLM-citation strategy, content tiers, priority content queue
- King County series:
  - [[01-the-problem-with-picking-a-senior-living-facility]]
  - [[02-every-assisted-living-inspection-in-king-county-scored]]
  - [[03-what-aggregated-reviews-tell-us-about-king-county-senior-housing]]
  - [[04-who-owns-king-countys-assisted-living-facilities]]
  - [[05-one-score-to-compare-them-all-ranking-king-county-facilities]]
- Standalone drafts:
  - [[yakima-county-assisted-living-facility-rankings-by-quality-score]]
  - [[understanding-senior-housing-options]]
  - [[facility-metrics-summary]]

## Backend (ship/)

Notes specific to the Go backend repo (`~/projects/ship/`). Data collection, AWS infra, scoring algorithms.

- [[README]] -- local dev setup, environment variables, `dev.sh` commands
- [[INFRA]] -- AWS infrastructure: architecture diagram, service inventory, monthly cost estimates
- [[load-issue]] -- ECS blog page TCP timeout, env var build vs runtime mismatch
- [[howto-collect-data]] -- data collection methodology for facility scoring
- [[sl-uncollected-2026-06-05]] -- 65 uncollected SL facilities in King County

## Frontend (ship-ui/)

Notes specific to the SvelteKit frontend repo (`~/projects/ship-ui/`). Page rendering, UI components, public site.

*No frontend-specific notes yet -- add them in `ship-ui/`.*

## Correspondence

- [[Emails — justin-projects]] -- SeniorAIQ-related email threads with Justin
- `Threads/` -- 22+ inbound email threads (DSHS, AWS, Anthropic receipts, partner conversations, etc.)

## Related projects

- [[Senior Living Portfolio MOC]] -- sibling project (WordPress retiree sites) co-owned with Justin Younker
- Active milestone planning in `~/projects/.planning/` (GSD workflow files; intentionally NOT in vault)
- `obsidian-todo` skill at `~/.claude/skills/obsidian-todo/` for capturing new SHIP-related todos into this area
