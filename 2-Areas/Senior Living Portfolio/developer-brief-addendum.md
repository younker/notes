---
title: Developer Brief — Addendum (Tech Stack Pushback)
type: addendum
tags: [senior-living-portfolio, brief, addendum, tech-stack]
date: 2026-06-02
---

# Developer Brief — Addendum

Jason's pushback on the tech stack choices in [[developer-brief]]. WordPress as the platform is correct for the budget, content ops, and hiring pool. Three specific decisions inside the WordPress choice are worth revisiting before the brief gets posted.

## 1. Drop Elementor Pro

The brief specifies Elementor Pro as the page builder. Elementor ships heavy DOM and CSS that fights the PageSpeed 90 mobile target in §2.1. The 55+ audience is also more likely to be on slower devices and connections — perf isn't aesthetic, it's accessibility.

**Recommended substitutes (developer to pick one):**

- **Bricks Builder** — class-first, lean output, modern. Best technical option.
- **Gutenberg + Kadence Blocks or GeneratePress Pro** — native WordPress block editor + a lightweight block theme. Cheapest hosting cost, fastest sites, slightly less flashy authoring UX.

Either path keeps the "Justin can edit pages himself" requirement intact while eliminating the perf tax. Avoid stacking Elementor + caching + minification plugins to compensate — that's a known anti-pattern that masks the root cause.

## 2. Build interactive tools as standalone JS widgets

§2.4 calls for a Cost of Living Calculator and a Retirement Quiz / Destination Matcher. The brief suggests building them as "Elementor widgets, custom shortcodes, or lightweight custom plugins."

**Pick the shortcode-embedded standalone widget path:**

- Build each as a small Preact or vanilla JS bundle (<20KB gzipped)
- Mount via a WordPress shortcode (e.g. `[cost-calculator]`, `[retirement-quiz]`)
- Stand-alone bundle in `/wp-content/uploads/widgets/` or served from a CDN
- Post to a generic REST endpoint for email capture; no coupling to Elementor or any builder

**Why:**
- Portable. If the platform ever changes (Astro, Next.js, anything), the widgets come with us unchanged.
- Smaller perf footprint than a builder-coupled widget.
- Independently testable.
- Same dev can build all three calculators (the Panama cost calculator and the Costa Rica one share 95% of code; only the data file changes).

## 3. Audit plugin sprawl

§2.2 lists 8 plugins on every site before functionality starts. Each plugin is a security, perf, and update-fatigue liability. Before launch, the developer should justify each one or replace it.

**Likely consolidations:**

- **WP Rocket + Smush Pro** → consider a single replacement like **FlyingPress** (handles caching + image optimization + critical CSS in one) or use Cloudflare APO for caching and let Cloudflare resize images.
- **MonsterInsights** → drop entirely. Add the GA4 script via Rank Math's analytics module or directly in the theme. MonsterInsights is a marketing wrapper around free Google code.
- **WP External Links** → drop. A 3-line theme snippet adds `rel="noopener noreferrer"` and `target="_blank"` to external links.
- **UpdraftPlus** → drop if hosting (WP Engine, Kinsta) already includes daily backups, which they do.

Realistic baseline: 4–5 plugins (Rank Math, WPForms or Fluent Forms, directory plugin, CRM integration, caching/perf). Everything else is a code smell.

## 4. Directory plugin reality check

§2.3 names three directory plugin options. All three have rough edges around paid listings + Stripe + admin approval. Expect to write custom PHP to override templates or extend submission flows regardless of which one is chosen.

**Vetting question to add to §8.1:** "Show me a live site where you implemented paid directory listings with Stripe and admin approval — and walk me through the customizations you had to write on top of the plugin."

If no candidate has built this before, the directory functionality should be priced as a separate line item from the rest of the build, not bundled.

## 5. What stays as-is in the brief

- WordPress as the CMS ✓
- PHP 8.1+, HTTPS, hosting choice ✓
- Rank Math Pro for SEO ✓
- WPForms Pro (or Fluent Forms — both fine) for lead capture ✓
- FluentCRM or MailerLite for email ✓
- Shared design system across three sites ✓
- Phase 1 → Panama → Costa Rica template-clone sequencing ✓
- Budget range and Upwork/Fiverr hiring path ✓

## Summary for Justin

> "Keep WordPress. Drop Elementor — use Bricks or Gutenberg + Kadence/GeneratePress for better perf. Build the calculator and quiz as standalone JS widgets embedded via shortcode, not as builder widgets, so they survive any future platform change. Trim 3–4 plugins that don't earn their slot. Price the directory work as a separate line item from the rest of the build."
