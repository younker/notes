# Scoring Data Analysis -- Improvement Opportunities

**Status:** Research complete, informing future milestones
**Date:** 2026-04-08

## Current Scoring Categories

| Category | Weight | Data Richness | Signal Quality |
|----------|--------|---------------|----------------|
| Regulatory | 30% | High | Strong -- multi-stage pipeline with OCR + LLM scoring |
| Reviews | 25% | Medium-High | Good -- 4 platforms, Bayesian adjustment, platform-equal weighting |
| Property | 15% | Low | Thin -- assessed value only, single metric vs county median |
| Location | 15% | Medium | Decent -- 4 POI categories with distance decay |
| Leadership | 10% | Medium | Moderate -- entity type + stability + locality |
| Brand | 5% | Very Low | Bootstrap problem -- derived from other scores, no real brand signal |

## Priority Improvements

### 1. Property Calculator (15% weight, thinnest real signal)

Currently: single `assessed_value / county_median` ratio. County assessor records often
contain year built, square footage, and improvement values that aren't extracted.

Opportunities:
- Extract year built, sqft, improvement value from existing assessor scrapes
- Tax assessment trending (value changes over time)
- Building condition proxies from assessor data

### 2. Leadership Governor Data (10% weight, partially wired)

The `governors` JSONB field on wa.business_entities is collected but never parsed for scoring.
Officer names, titles, and addresses sit unused.

Opportunities:
- Parse governor data for: officer count, in-state officers, cross-facility overlap
- Recursive governor lookup for SPE/subsidiary chains (pending todo)
- Officer tenure/turnover tracking over time

### 3. Brand Calculator (5% weight, bootstrap-only)

No actual brand/reputation data. Just portfolio size + median score of sibling facilities.
First scoring run always returns NULL.

Opportunities:
- BBB ratings via LDEX API
- Accreditation status from industry bodies
- Cross-referencing owner names across state databases

### 4. Location POI Categories (15% weight, 4 types only)

Hospital, pharmacy, grocery, park. Already tracked as v2.5 future work in PROJECT.md.

Opportunities:
- Transit stops (GTFS or Google Places)
- Medical clinics
- Religious institutions
- Senior centers

### 5. County Coverage Expansion

Only King and Yakima counties have assessor recipes. Property data is NULL for all other
counties, causing weight redistribution.

### 6. SeniorAdvisor Resolver

Scraping client exists but no resolve pipeline. Reviews only collected if links are manually
created.

## King County Weight Analysis (Future)

King County has more facilities than Yakima (~52). Collecting full data for King County
and analyzing correlations between categories would provide statistical basis for
weight redistribution. Currently weights are expert baseline.

Approach:
1. Collect all data sources for King County facilities
2. Analyze category score distributions and correlations
3. Identify which categories provide strongest independent signal
4. Consider data-driven weight adjustment

## Planned Milestone Sequence

1. **v3.6 -- Review Summaries** -- LLM review summarization per facility
2. **v3.7 -- Public Facility Pages** -- expose facility detail pages publicly
3. **v3.8+ -- LDEX Integration / Weight Analysis** -- informed by sandbox research and King County data
