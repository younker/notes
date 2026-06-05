---
title: SeniorAIQ
type: moc
tags: [senioraiq, ship, moc]
---

# SeniorAIQ

Top-level Map of Content for the SeniorAIQ / SHIP project. Senior housing intelligence platform aggregating, scoring, and surfacing senior housing data for Washington State. Live at [senioraiq.com](https://senioraiq.com).

Two source repos at `~/projects/ship/` (Go backend) and `~/projects/ship-ui/` (SvelteKit frontend). This area is the canonical location for all SHIP planning, TODOs, drafts, handoffs, and reference docs.

## Overview & reference

- [[Game Plan 2026]] -- ownership structure, Phase 1 launch (2026-09-01), products/pricing, execution, Phase 2 ideas (from Justin Younker)
- [[AIQ-scoring-summary]] -- platform overview, scoring categories and weights, data sources, current coverage
- [[INFRA]] -- AWS infrastructure: architecture diagram, service inventory, monthly cost estimates
- [[README]] -- local dev setup, environment variables, dev.sh commands
- [[blog-content-strategy]] -- LLM-citation strategy for the blog, content tiers, priority content queue

## Active work

- `TODO/` -- 18 open SHIP TODOs (operational backlog, one markdown doc per topic)
- `TODO/DONE/` -- 12 completed TODOs (archive)
- `drafts/` -- 4 unpublished blog drafts (facility metrics, Yakima rankings, etc.)

## Handoffs & open issues

- [[TAGGING-CONVENTION-HANDOFF]] -- multi-repo tag convention (parent-only tagging via GSD)
- [[load-issue]] -- ECS blog page TCP timeout, env var build vs runtime mismatch
- [[ynkr]] -- raw notes: open bugs, fix snippets, review collection sequence, tech debt

## Related

- Sub-repos live at `~/projects/ship/` and `~/projects/ship-ui/`
- Active milestone planning in `~/projects/.planning/` (GSD workflow files; intentionally NOT in vault)
- `obsidian-todo` skill at `~/.claude/skills/obsidian-todo/` for capturing new SHIP-related todos into this area
