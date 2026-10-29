---
title: "How We Score Senior Housing Facilities"
---

# How We Score Senior Housing Facilities

Each facility receives a composite quality score from 0 to 100, built from six categories. A score of 50 represents "meets the standard" -- not average among peers, but an absolute baseline. When a category has no available data, its weight redistributes proportionally across the remaining categories. A facility needs at least three scored categories to receive a composite score.

---

## Regulatory (30% of composite)

Regulatory is the single heaviest category because it directly reflects resident safety.

We pull DSHS inspection reports -- the actual PDF documents from state inspections -- and use AI to evaluate two dimensions per report: how severe were the violations found (event score), and how well did the facility respond (response score). Each report gets scored on both dimensions, then the per-report scores are averaged across all available reports.

The violation severity carries 60% of the weight within this category, the response quality 40%. A facility with clean inspections and no violations scores near the top. A facility with severe or life-threatening violations scores near the bottom regardless of how well they responded afterward.

**High score (80-95):** No violations or only minor ones, with good corrective responses.
**Low score (0-30):** Severe or life-threatening violations, poor response quality.

---

## Reviews (25% of composite)

Customer satisfaction signal drawn from Google Reviews. Three factors contribute:

- **Star rating** (the dominant factor): A facility's Google rating mapped to an 80-point scale. A 5-star facility gets the full 80 points; a 1-star facility gets zero.
- **Review volume** (up to 10 bonus points): A logarithmic bonus that rewards having more reviews, with diminishing returns. Going from 1 to 10 reviews matters more than going from 90 to 100.
- **Review recency** (up to 5 bonus points): A small bonus for facilities that are actively accumulating new reviews in the last 24 months.

The star rating dominates because it's the strongest signal of resident/family satisfaction. Volume and recency are smaller bonuses that add confidence to the rating.

**High score (75-95):** 4.5+ stars with 100+ reviews, many recent.
**Low score (0-30):** Below 2.5 stars, few reviews.

---

## Property (15% of composite)

A proxy for physical facility quality, based on the county assessor's assessed property value compared to the county median.

A facility assessed at exactly the county median scores 50. A facility at twice the median scores 100. Below the median, the score drops proportionally. The idea: higher assessed values generally correlate with newer construction, better maintenance, or larger/better-equipped buildings.

This is the simplest category right now -- just one data point. Future versions may incorporate building age, improvement-to-land ratios, and other property quality signals.

**High score (75+):** Assessed value 1.5x or more above the county median.
**Mid score (50):** Right at the county median.
**Low score (0-25):** Well below the county median.

---

## Location (15% of composite)

Measures proximity to four types of places that matter most to senior residents:

| Category | Why It Matters | Ideal Distance | Weight |
|----------|---------------|----------------|--------|
| Hospitals | Emergency and acute care access | Within 5 km | 40% |
| Pharmacies | Medication access | Within 1 km | 25% |
| Grocery stores | Food and supplies | Within 2 km | 20% |
| Parks | Recreation and quality of life | Within 1 km | 15% |

For each category, a facility within the ideal distance gets a perfect sub-score. Beyond the ideal, the score decays linearly to zero at a maximum distance threshold (20 km for hospitals, 5-8 km for the others). If a POI type doesn't exist nearby at all, that sub-score is zero -- we treat the absence of a nearby hospital as genuinely bad, not just unknown.

Hospitals carry the most weight because emergency access is the highest-stakes proximity factor for senior residents.

**High score (80-95):** All four POI types within their ideal distances.
**Low score (0-20):** Most POIs beyond their maximum thresholds.

---

## Leadership (10% of composite)

Evaluates the ownership behind a facility across three dimensions:

- **Entity type (30% within category):** What kind of organization owns the facility? Nonprofits score highest (mission-aligned with care), followed by individuals (personal accountability), then LLCs, corporations, and REITs (investment-driven structures tend to distance ownership from operations).
- **Geographic locality (35% within category):** Where is the owner based relative to Washington state? In-state owners score highest, neighboring states next, then decreasing scores for more distant states. Local ownership suggests closer operational involvement.
- **Operational stability (35% within category):** How long has the owning entity been in business? Entities operating 7+ years score highest. Newly incorporated entities (under 1 year) score lowest. Longevity suggests operational maturity.

When a sub-dimension has no data (e.g., we can't determine where the owner is based), its weight redistributes to the sub-dimensions we do have data for.

**High score (80+):** Nonprofit, based in Washington, operating 7+ years.
**Low score (25-40):** REIT or unknown entity, out-of-state, newly incorporated.

---

## Brand (5% of composite)

The lightest category, measuring operator reputation across their portfolio of facilities.

Two factors:

- **Track record (70% within category):** The median composite score across all other facilities the same operator runs. If an operator's other facilities score well, that's a positive signal for this one.
- **Portfolio size (30% within category):** How many facilities the operator manages. Larger portfolios suggest institutional systems and processes, though this is a weaker signal than actual performance.

Track record carries the bulk of the weight because past performance across the portfolio is more meaningful than size alone. A small operator with excellent facilities outscores a large chain with mediocre ones.

This category returns no score on the first scoring run (since cross-facility data hasn't been computed yet), and its 5% weight redistributes to the other categories.

**High score (75-95):** Large portfolio with high median scores across facilities.
**Low score (0-30):** Single facility or small operator with poor peer performance.
