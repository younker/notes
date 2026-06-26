# Admin: Manual Review Match Approval

## Problem

When the platform matching pipeline finds a possible match but confidence is below the auto-confirm threshold, it stores the link with `is_active=false`. These need human review before reviews are collected.

## Data Needed for Review

For each pending match, display side-by-side:

**Our facility (DSHS)**:
- Facility name
- Address (line1, city, state)
- Canonical facility ID

**Platform candidate (e.g. Caring.com)**:
- Facility name (extracted from listing page)
- Address (from detail page JSON-LD)
- Full URL: `https://www.caring.com/{platform_id}`
- Source (caring, apfm, senioradvisor)

**Match metadata**:
- Match confidence level (manual_review)
- Name similarity score
- Address similarity score
- Combined score

## Current State

- Table: `wa.review_platform_links`
- Pending matches: `WHERE is_active = false`
- Approval action: `UPDATE SET is_active = true WHERE id = ?`
- Rejection action: `DELETE WHERE id = ?` (or add a `rejected` status)

## Missing Data

The current schema does not store the platform facility name or address -- only the `platform_id` (URL slug). To avoid re-scraping at review time, the match pipeline should also store:

- `platform_name` (text) -- name as it appears on the platform
- `platform_address` (text) -- address from the platform listing/detail page
- `name_similarity` (numeric) -- score at match time
- `address_similarity` (numeric) -- score at match time
- `combined_score` (numeric) -- overall confidence score

These columns would go on `wa.review_platform_links`.

## Admin UI Actions

Per pending match:
- **Approve** -- set `is_active = true`, enabling review collection
- **Reject** -- delete the link or mark as rejected so it's not re-proposed on the next match run
- **Open platform page** -- link to `https://www.caring.com/{platform_id}` in new tab for visual verification

## Query for Pending Reviews

```sql
SELECT
  rpl.id AS link_id,
  rpl.source,
  rpl.platform_id,
  rpl.match_confidence,
  rpl.platform_name,
  rpl.platform_address,
  rpl.name_similarity,
  rpl.combined_score,
  f.facility_name AS our_name,
  fa.address_line1 AS our_address,
  fa.city AS our_city,
  fa.state AS our_state
FROM wa.review_platform_links rpl
JOIN wa.facilities f ON f.canonical_facility_id = rpl.canonical_facility_id
  AND f.dshs_archive_date IS NULL
JOIN wa.facility_addresses fa ON fa.facility_id = f.id
  AND fa.address_type = 'location'
WHERE rpl.is_active = false
ORDER BY rpl.source, f.facility_name;
```
