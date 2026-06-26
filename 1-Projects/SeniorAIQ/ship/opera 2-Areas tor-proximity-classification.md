---
date: 2026-06-19
type: spec
project: SHIP
tags: [senioraiq, ship, scoring]
---

Part of [[SeniorAIQ]] / SHIP. Expands the "local vs. headquartered far away" signal in the Operator category of [[AIQ-scoring-summary]]. See also [[howto-collect-data]].

# Operator & Owner Proximity Classification

How SHIP classifies the geographic relationship between a senior housing facility and the headquarters of its operator (or owner). The classifier returns a fine-grained tier; the website collapses the tier into one of four consumer-facing labels.

## Fine-grained Tiers

The classifier returns the strongest applicable tier. Rules are evaluated top to bottom; the first match wins.

| Tier | Rule |
|---|---|
| `same_city` | HQ state == facility state AND HQ city == facility city |
| `in_county` | HQ state == facility state AND HQ county == facility county (different city) |
| `within_drive` | HQ state == facility state AND drive time from HQ to facility ≤ 45 minutes (different county) |
| `same_state` | HQ state == facility state (drive time > 45 minutes, or drive time unknown) |
| `adjacent` | HQ state != facility state AND the two states share a land border |
| `national` | HQ in a US state, not adjacent, great-circle distance > 300 miles |
| `out_of_country` | HQ state is non-empty but not a recognized US state code |
| `unknown` | Facility state missing, or HQ state empty |

Distance uses real lat/lng coordinates when available and falls back to the state centroid when missing.

Drive time uses standard routing (typical traffic conditions). When drive time data is unavailable, the tier falls back to `same_state`.

The 300-mile cutoff separating `regional` from `national` is a fixed threshold.

US Census divisions and regions are no longer used for tier classification.

## Consumer-facing Labels

The website collapses the 8 fine-grained tiers into 4 display labels.

| Label | Operator copy | Owner copy | Collapsed from |
|---|---|---|---|
| `local` | "Local operator" | "Local owner" | `same_city`, `in_county`, `within_drive` |
| `regional` | "Regional operator" | "Regional owner" | `same_state`, `adjacent` |
| `national` | "National operator" | "National owner" | `national` |
| `international` | "International operator" | "International owner" | `out_of_country`, `unknown` |

The badge is omitted when no operator or owner entity exists for the facility.

## Worked Examples (Yakima, WA facility)

| Operator HQ | Tier | Label | Reasoning |
|---|---|---|---|
| Yakima, WA (different address) | `same_city` | local | Same state, same city |
| Selah, WA | `in_county` | local | Same state, same county, different city |
| Ellensburg, WA | `within_drive` | local | Same state, different county, ~25 miles / ~25 min drive |
| Seattle, WA | `same_state` | regional | Same state, drive time ~2.5 hrs over Snoqualmie Pass |
| Portland, OR | `adjacent` | regional | WA and OR share a land border |
| Boise, ID | `adjacent` | regional | WA and ID share a land border |
| Phoenix, AZ | `national` | national | US-based, WA and AZ do not share a border, > 300 miles |
| Atlanta, GA | `national` | national | US-based, no shared border with WA, > 300 miles |
| Toronto, ON | `out_of_country` | international | HQ state not a recognized US code |
| No HQ state on file | `unknown` | international | Insufficient data to classify |

Note: `adjacent` fires whenever two states share a land border, regardless of US Census region or division. WA-OR and WA-ID both qualify as `adjacent`.

## Key Changes from Previous Version

| What changed | Previous rule | New rule |
|---|---|---|
| Local definition | Same city, same county, or same state | Same city, same county, or ≤45-min drive time |
| Regional definition | Same Census division or region | Same state (beyond drive time) or adjacent state |
| National definition | Not applicable (called "out-of-region") | US-based HQ not adjacent and > 300 miles away |
| International label | "Out-of-region" (red) catch-all | Dedicated label for non-US HQ only |
| Census divisions/regions | Used for `in_division` and `in_region` tiers | Removed — no longer used |
| Proximal tier | Separate consumer label ("Nearby operator") | Removed — absorbed into National (>300 miles) |

## Out of Scope

| Feature | Reason |
|---|---|
| Distance-decayed continuous scoring | Categorical tiers chosen for explainability |
| Multi-state operator portfolio aggregation | Each (operator, facility) pair classified independently |
| Public facility search filter by proximity | Display and scoring only at this stage |
| Region, division, and adjacency for US territories (PR, GU, VI, AS, MP) | Territories classify as `unknown` / international |
