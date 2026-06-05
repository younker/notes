---
date: 2026-06-05
type: project-idea
status: exploring
tags:
- project-idea
---

# Identity Theft Recovery Meta-Navigator

Part of [[Project Ideas MOC]].

## The Idea

A neutral, non-affiliate, opinionated meta-navigator website for identity theft victims. Sits as a curatorial layer above existing resources like IdentityTheft.gov and ITRC. Tells users which official resource to use first and why, routes them to the single best next action based on their situation, and distinguishes immediate actions from later ones with rationale.

## Differentiation

- Opinionated curation (not "here are 30 options")
- Zero financial stake in pushing paid monitoring services (no LifeLock/Aura/IdentityForce affiliate links)
- Decision tree based on what happened: SSN exposed, card stolen, tax return rejected, medical bill unrecognized, etc.
- Readable/scannable interface vs. bureaucratic government sites

## Research — What Already Exists

- **IdentityTheft.gov** (FTC) — Generates personalized plan, walks through steps, pre-fills dispute letters. Official, free, comprehensive. BUT bureaucratic, treats all paths as equal weight, no opinionated routing.
- **Identity Theft Resource Center / ITRC** (idtheftcenter.org, 888-400-5530) — Nonprofit with free human case managers by phone. Website is a help-center, not a decision tree; the curation happens on the call.
- **Blog posts** (US Bank, Goldman Sachs, NerdWallet, honestcredit.org) — Scattered, SEO-driven, most loaded with affiliate links pushing paid monitoring services.
- **State AG sites** — Vary wildly in quality.
- **IRS Identity Theft Central, FBI IC3, CFPB, USA.gov** — All cover pieces but none provide the meta-navigation layer.

## Gap Identified

A neutral meta-navigator that:

- Asks "what happened to you?" and routes to the one best next action
- Tells users which official resource to use first and why
- Distinguishes "next hour" vs "next month" actions with rationale
- Has no affiliate motive

## Challenges Before Building

- **SEO is brutal** — affiliate-funded sites dominate every relevant query
- **IdentityTheft.gov is "good enough"** for many people; marginal value is in opinionated routing and readability
- **Liability** — prescriptive guidance to vulnerable people in crisis carries real risk; needs disclaimers and possibly legal review
- **Maintenance burden** — phone numbers, forms, agency processes change; stale ID-theft site is worse than none
- **Trust signal** — panicked, scam-wary victims start with trust in .gov and established nonprofits; new site asks for trust at their worst moment

## Lean Test

Write a single Markdown/HTML page with the opinionated content. Host it free. Share in r/IdentityTheft and r/personalfinance when relevant questions arise. If users say "this helped, where can I find more," signal exists. If they shrug or point to IdentityTheft.gov, gap is smaller than it feels.

## Sources

- https://www.identitytheft.gov/
- https://www.idtheftcenter.org/
- https://www.fbi.gov/how-we-can-help-you/victim-services/seeking-victim-information/identity-theft-victim-resources
- https://www.consumerfinance.gov/ask-cfpb/what-do-i-do-if-i-think-i-have-been-a-victim-of-identity-theft-en-31/
- https://www.usa.gov/identity-theft
- https://www.irs.gov/identity-theft-central
