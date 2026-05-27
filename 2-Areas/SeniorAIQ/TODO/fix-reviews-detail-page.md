# Fix: Reviews category detail page shows no reviews

## Location

`ship/api/pkg/handlers/wa_facility.go`, function `collectionStatus` (line 513)

## Problem

`collectionStatus()` returns `"not_linked"` when no `review_platform_links` row exists, even when `wa.facility_reviews` rows exist for that source. The parent facility page uses `google_places.reviews_collected_at` to determine collected status, so the two pages disagree.

Example: facility `96d9d48a-cf20-4b0a-9179-84c5d1c00f8c` has 15 reviews (10 apfm, 5 google) but zero platform link rows. The category detail page shows "Data has not been collected."

## Fix

In `collectionStatus()`, check `reviewCount > 0` before checking the platform link. If reviews exist, return `"collected"` regardless of link state:

```go
func collectionStatus(link *db.WaReviewPlatformLink, reviewCount int32) string {
	if reviewCount > 0 {
		return "collected"
	}
	if link == nil {
		return "not_linked"
	}
	if !link.LastCollectedAt.Valid {
		return "linked_not_collected"
	}
	return "collected_empty"
}
```

## Tests

Existing tests should still pass -- the test cases that assert `"not_linked"` have `reviewCount == 0` for those sources.
