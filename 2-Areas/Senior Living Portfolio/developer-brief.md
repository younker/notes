---
title: Developer Brief — Senior Living Portfolio
type: brief
tags: [senior-living-portfolio, brief, wordpress]
author: Justin Younker
date: 2026-05-26
source: 0-Inbox/developer-brief-senior-living-portfolio copy.docx
---

# Developer Brief — Senior Living Portfolio

Three-Site WordPress Build · `internationalseniorliving.com` · `panamaseniorliving.com` · `costaricaseniorliving.com`

| | |
|---|---|
| Prepared by | Justin Younker (Cascadia Development) |
| Document type | Developer RFP / Project Brief |
| Platform | WordPress + Elementor Pro |
| Scope | 3 interconnected websites |
| Date | 2026-05-26 |

> **CONFIDENTIAL — FOR DEVELOPER USE ONLY**

See [[Senior Living Portfolio MOC]] for the project hub. Related: [[SeniorAIQ]], [[SHIP MOC]].

## 1. Project Overview

A portfolio of three interconnected senior living and retirement websites targeting US and Canadian retirees. The sites function as an integrated lead generation, authority, and passive income system — with Blue Zone Senior Living as the flagship brand and the two geo-specific sites feeding into it.

The long-term vision is to use this digital portfolio to generate passive income immediately via affiliate partnerships and directory listings, and to build the audience and authority needed to support future senior living community developments in Costa Rica and Panama.

### 1.1 The Three Sites

| Domain | Role | Build Priority |
|---|---|---|
| `internationalseniorliving.com` | Flagship Brand | Phase 1 — Build first. Concept-driven authority brand. Parent of the portfolio. |
| `panamaseniorliving.com` | Geo Site #1 | Phase 2 — Fastest revenue. Highest search volume. Build concurrently or immediately after Blue Zone. |
| `costaricaseniorliving.com` | Geo Site #2 | Phase 3 — Nicoya Blue Zone tie-in. Build once flagship has traction. Architecture identical to Panama site. |

### 1.2 Target Audience

- US and Canadian retirees (55+) researching retirement abroad
- Individuals in the research/comparison phase — not yet committed to a destination
- Secondary: real estate investors and development partners

### 1.3 What These Sites Are NOT

These are not simple brochure sites. They must be built as lead generation and monetization platforms with directory functionality, email capture, interactive tools, and SEO-optimized content architecture. Design quality should reflect a premium, trustworthy brand.

## 2. Technical Requirements

### 2.1 Platform

| | |
|---|---|
| CMS | WordPress (latest stable) |
| Page Builder | Elementor Pro |
| Hosting | Developer to recommend — must support all 3 sites (WP Engine, Kinsta, or SiteGround) |
| PHP | 8.1+ |
| SSL | HTTPS on all three domains from day one |
| Speed | Target 90+ Google PageSpeed on mobile and desktop |

### 2.2 Required Plugins — All Three Sites

- Rank Math SEO Pro — SEO, schema, sitemaps
- WPForms Pro — Lead capture, consultation booking, free guide downloads
- FluentCRM or MailerLite Integration — Email list management & segmentation
- WP Rocket — Page caching and performance
- Smush Pro or ShortPixel — Image optimization
- MonsterInsights — Google Analytics 4
- WP External Links — Link management
- UpdraftPlus — Automated backups

### 2.3 Required Plugins — Directory Functionality

Each site needs a vetted provider and community directory where operators can be listed. Recommended plugin options (developer to recommend best fit):

- Business Directory Plugin Pro — Preferred for paid listing functionality
- GeoDirectory — Alternative if location-based filtering is prioritized
- Directories Pro — Alternative with strong filtering and search

Directory must support: paid listing tiers, search and filter by category/region, contact forms per listing, featured/sponsored listing placement, and admin-managed listing approval.

### 2.4 Required Functionality — Interactive Tools

Built as Elementor widgets, custom shortcodes, or lightweight custom plugins:

- **Cost of Living Calculator** — User inputs lifestyle details, gets estimated monthly cost in destination vs. US/Canada
- **Retirement Quiz / Destination Matcher** — 5–8 question quiz outputs a recommended destination and captures email before showing results
- **Consultation Booking Widget** — Calendar embed (Calendly or TidyCal) with pre-qualifying form

### 2.5 Email & CRM Integration

- Single email marketing account serving all three sites (MailerLite or ActiveCampaign — developer to advise)
- Subscribers tagged by source site and interest area
- Automated welcome sequence triggered on free guide download
- Opt-in forms embedded on: homepage, free guide page, calculator results, quiz results, blog sidebar

### 2.6 Analytics & Tracking

- Google Analytics 4 on all three sites
- Google Search Console verified for all three domains
- Conversion tracking for: form submissions, guide downloads, consultation bookings, directory listing clicks
- UTM parameter support for tracking traffic sources across sites

## 3. Site Architecture & Page Requirements

Pages marked "Build First" are required for launch. "Phase 2" and "Phase 3" pages can be built in subsequent sprints.

### 3.1 `internationalseniorliving.com` — Flagship Concept Brand

| Page / URL | Phase | Purpose & Requirements |
|---|---|---|
| Homepage `/` | Build First | Hero: "Your trusted guide to retiring in a Blue Zone." Lead capture above fold. Links to both geo sites. Featured testimonials. CTA to free guide and consultation. |
| What is a Blue Zone? `/what-is-a-blue-zone` | Build First | Authoritative explainer on the 5 official Blue Zones and longevity lifestyle. Structured for LLM citation. Schema markup required. |
| Destinations Hub `/destinations` | Build First | Overview page linking to Costa Rica and Panama sub-pages. Built to scale to additional destinations later. |
| Free Guide Download `/free-guide` | Build First | Gated PDF: "The Blue Zone Retirement Guide." Email capture gate. Triggers automated welcome email sequence. |
| About `/about` | Build First | Owner story and senior living development background. Trust anchor of the entire portfolio. |
| Contact / Consultation `/contact` | Build First | Calendly/TidyCal embed + pre-qualifying form. Separate form for general inquiries vs. consultation requests. |
| Blog Hub `/blog` | Build First | Content archive. Categories: Blue Zone Lifestyle, Retirement Planning, Health & Longevity, Destinations. |
| Retirement Quiz `/quiz` | Phase 2 | Interactive destination matcher. 5–8 questions. Email capture before results. Outputs recommended destination. |
| Newsletter `/newsletter` | Phase 2 | "The Blue Zone Brief" signup page. Description of content, frequency, sponsor disclosure. |
| For Developers / Investors `/invest` | Phase 2 | Separate lead capture for real estate investors and development partners. Different CRM tag. |
| FAQ `/faq` | Phase 2 | 50+ structured Q&As with FAQ schema markup. Target AI overview citations. |

### 3.2 `panamaseniorliving.com` — Geo Site (Phase 2 Priority)

| Page / URL | Phase | Purpose & Requirements |
|---|---|---|
| Homepage `/` | Build First | Hero: "Your guide to retiring in Panama." Lead capture. Link to Blue Zone flagship. CTA to free guide. |
| Why Panama `/why-panama` | Build First | Climate, USD economy, Pensionado visa benefits, healthcare, safety. Structured for LLM citation. |
| Cost of Living Guide `/cost-of-living` | Build First | Detailed monthly budget breakdown. Embed cost calculator tool. Updated annually. |
| Pensionado Visa Guide `/pensionado-visa` | Build First | Step-by-step residency guide. Requirements, timeline, attorney referrals, benefits list. |
| Regions Hub `/regions` | Build First | Overview + sub-pages for: Panama City, Boquete, Coronado, Bocas del Toro, El Valle. |
| Healthcare Guide `/healthcare` | Build First | Public vs. private system, top hospitals, cost comparisons to US/Canada. |
| Community Directory `/communities` | Build First | Vetted senior living communities. Paid listing tiers. Search by region. Featured placement for premium listings. |
| Provider Directory `/providers` | Build First | Vetted attorneys, real estate agents, relocation specialists. Paid listings. Category and region filters. |
| Free Guide Download `/free-guide` | Build First | Gated PDF: "The Complete Guide to Retiring in Panama." Email capture. Shares list with Blue Zone site. |
| Contact / Consultation `/contact` | Build First | Consultation booking + general inquiry form. Same calendar system as Blue Zone site. |
| Blog Hub `/blog` | Build First | Content archive. Categories: Cost of Living, Visa & Legal, Regions, Healthcare, Real Estate. |
| Scouting Trips `/scouting-trips` | Phase 2 | Description of curated discovery tours. Booking inquiry form. Price range displayed. |
| Expat Stories `/stories` | Phase 2 | Video + written interviews with US/Canadian expats living in Panama. |
| Panama vs. Costa Rica `/compare` | Phase 2 | Honest comparison guide. High-intent search traffic. Structured for AI citation. |
| FAQ `/faq` | Phase 2 | 50+ Q&As with schema markup. |

### 3.3 `costaricaseniorliving.com` — Geo Site (Phase 3)

| Page / URL | Phase | Purpose & Requirements |
|---|---|---|
| All Pages `/*` | Phase 3 | Architecture is identical to `panamaseniorliving.com`. Swap Panama-specific content for Costa Rica. Add Nicoya Blue Zone angle throughout. Build Panama first, then replicate template for Costa Rica with content substitution. |
| Nicoya Blue Zone Page `/nicoya-blue-zone` | Phase 3 | Unique to this site. Deep content on the Nicoya Peninsula as one of the world's 5 official Blue Zones. Cross-links to `internationalseniorliving.com`. |

## 4. Design Direction

### 4.1 Brand Hierarchy

- **Blue Zone Senior Living** — Premium, nature-inspired, longevity-focused. Warm but sophisticated. High-end wellness brand meets travel editorial.
- **Panama Senior Living** — Professional, aspirational, modern. Confident and welcoming. Slightly more corporate than Blue Zone.
- **Costa Rica Senior Living** — Natural, lush, adventurous. Can lean into the tropical and eco-conscious aesthetic more than Panama.

### 4.2 Shared Design System

All three sites share a common design system — clearly part of the same portfolio family — while having distinct color personalities. Developer should build a shared Elementor Theme Builder template kit and customize per site.

| Element | Spec | Notes |
|---|---|---|
| Heading Font | Cormorant Garamond or Playfair Display | Serif display font. Conveys trust, authority, premium positioning. |
| Body Font | DM Sans or Outfit | Clean, modern, highly legible for 55+ audience. |
| Min Font Size | 16px body, 18px preferred | Audience is 55+. Readability is non-negotiable. |
| Shared Primary Color | `#2C4A2E` (Forest Green) | Shared across all three sites for portfolio cohesion. |
| Shared Accent Color | `#C8973A` (Gold) | CTAs, highlights, premium accents. |

### 4.3 Mobile Requirements

- Fully responsive and mobile-first across all three sites
- 55+ audience often uses tablets — design tested at tablet breakpoints
- Forms and CTAs fully functional and easy to use on mobile
- Clean hamburger menu on mobile

## 5. SEO Requirements

Sites are built to compete in organic search and to be cited by AI tools (ChatGPT, Claude, Perplexity, Google AI Overviews). SEO is not an afterthought — it must be baked into the build.

### 5.1 Technical SEO — Required at Launch

- XML sitemaps auto-generated and submitted to Google Search Console for all three domains
- Canonical tags configured correctly across all pages
- `robots.txt` properly configured
- Schema markup implemented: Organization, WebSite, FAQPage, BreadcrumbList, LocalBusiness where applicable
- Open Graph and Twitter Card meta tags on all pages
- Hreflang not required (English only)
- Clean URL structure — no query strings, no dates in URLs
- Internal linking structure built per the architecture in Section 3

### 5.2 Content SEO — Developer Setup Only

The developer is NOT responsible for writing content. The following SEO infrastructure must be set up:

- Rank Math Pro configured and connected to Google Search Console
- SEO title and meta description templates set for all page types (posts, pages, category archives)
- Breadcrumb navigation enabled and displaying correctly
- Blog category structure created per Section 3
- FAQ pages built with Rank Math FAQ blocks for schema auto-generation

## 6. Monetization Infrastructure

These are not optional features — they are the revenue engine of the portfolio.

### 6.1 Directory Listings (Paid)

- Directory plugin installed and configured on both geo sites
- Three listing tiers: Basic (free), Standard (paid), Featured (premium)
- Stripe or PayPal payment integration for listing purchases
- Admin approval workflow for all new listings
- Category taxonomy: Senior Living Communities, Attorneys/Legal, Real Estate, Healthcare, Relocation Services
- Each listing must include: contact form, website link, phone, address, description, photos, region tag

### 6.2 Lead Capture System

- WPForms Pro installed and configured on all three sites
- Free guide download form: name + email required, triggers automated email with PDF attachment
- Consultation booking form: name, email, phone, destination interest, timeline, additional notes
- Newsletter signup form: name + email, single-step
- All form submissions feed into CRM/email platform with appropriate tags by source and intent

### 6.3 Affiliate Link Management

- ThirstyAffiliates or Pretty Links for affiliate link cloaking and tracking
- Initial affiliate link categories: Relocation Services, Insurance, Legal, Real Estate, Travel
- Click tracking enabled and connected to GA4

### 6.4 Scouting Trips Page

- Inquiry form: name, email, destination interest, travel window, group size, budget range
- Form submissions tagged separately in CRM as high-intent leads

## 7. Deliverables & Handoff Requirements

### 7.1 What I Need Delivered

- WordPress installed and configured on hosting for all three domains
- Elementor Pro theme built and deployed on all three sites
- All Phase 1 pages built per Section 3 (content will be provided separately)
- All plugins installed, configured, and tested
- Directory functionality live and accepting test listings on both geo sites
- All forms built, tested, and connected to email platform
- GA4 and Search Console configured for all three domains
- Mobile responsiveness verified across iOS Safari, Android Chrome, and tablet
- PageSpeed score of 85+ on mobile, 90+ on desktop for all three sites
- 30-minute screen-share walkthrough showing content management, blog posts, directory listings
- Admin credentials and hosting access delivered securely

### 7.2 What I Will Provide

- All written content for Phase 1 pages
- Logo files (or direction to create simple wordmark logos)
- Photography direction (stock photo sources or purchased images)
- PDF guides for lead magnets
- Affiliate account details once established

### 7.3 Suggested Timeline

| Week | Milestone | Details |
|---|---|---|
| 1–2 | Blue Zone — Foundation | Hosting, WP install, theme, plugins, all Phase 1 pages built (content placeholders OK) |
| 3–4 | Panama — Full Build | All Phase 1 pages, directory live, forms live, analytics configured |
| 5–6 | Costa Rica — Template Build | Replicate Panama template, swap content, add Nicoya Blue Zone page |
| 7 | QA, Speed, Handoff | Cross-browser testing, PageSpeed optimization, walkthrough call, credential handoff |

## 8. Budget Guidance & Hiring Notes

Intended for posting on Upwork or Fiverr Pro. Ranges reflect fair market rates for the scope described.

| Scope Item | Budget Range | Notes |
|---|---|---|
| Full 3-site build (all Phase 1 pages) | $1,500 – $3,500 | Upwork mid-tier. Elementor Pro included. |
| Directory plugin setup + payment integration | $300 – $600 | May be bundled into main quote |
| Interactive calculator + quiz tools | $200 – $500 | Depends on complexity |
| Hosting (annual) | $200 – $600/year | SiteGround, WP Engine, or Kinsta |

### 8.1 How to Vet Candidates

- Require a portfolio showing at least 2 WordPress sites with directory or lead-gen functionality
- Ask specifically: "Have you built paid directory listings with Stripe/PayPal integration before?"
- Prefer candidates with Elementor Pro certification or demonstrated Elementor builds
- Run a small paid test task ($50–100) before committing to the full project
- Require weekly progress updates with screenshots or staging site links

---

Questions? Contact Justin — Cascadia Development.
