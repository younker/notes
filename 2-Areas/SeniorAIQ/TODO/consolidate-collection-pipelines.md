# Phase 68: Consolidate Collection Pipelines

Parked: 2026-03-21
Status: Not started -- context gathering was in progress when parked

## What This Phase Is

Unify the 4 review collection pipelines (Google, APFM, Caring, SeniorAdvisor) into
a single consolidated flow. Currently two separate systems exist: Google has its own
table (google_reviews) and resolve flow, while the other three share platform_reviews.

## Decisions Made

### Google is just another platform
- Google reviews follow the exact same process as platform reviews
- Google is not special -- just a different platform like APFM
- All data collected for each review must be stored (nothing dropped)

### Single unified reviews table
- All reviews (Google + platform) go into one table (rename or keep platform_reviews)
- Google-specific columns (language_code, author_uri, google_maps_uri) go in the meta JSONB column
- google_reviews table becomes legacy after migration

### Decided: google_places table stays as-is
- google_places is resolution metadata, not review data -- different concern than review consolidation
- Google resolver/collector already knows how to read/write google_places
- Only change: Google collector writes reviews to unified table instead of google_reviews
- Resolution step stays untouched

## Current Database Schema

### Two review tables (to be unified)
- wa.google_reviews: facility_id, google_place_id, google_review_id, rating (int 1-5),
  review_text, language_code, author_name, author_uri, published_at, google_maps_uri,
  collected_at, canonical_facility_id
- wa.platform_reviews: canonical_facility_id, source (text), source_review_id,
  rating (numeric 3,1), normalized_rating (numeric 3,2), review_text, author_name,
  published_at, source_url, meta (jsonb), collected_at

### Supporting tables
- wa.google_places: resolution data (facility_id -> google_place_id, match_confidence, place metadata)
- wa.review_platform_links: facility -> platform mapping (canonical_facility_id, source,
  platform_id, match_confidence, is_active, last_collected_at)

## Code Duplication to Address

### Handler (agents/pkg/reviews/handler.go, ~694 lines)
- collectPlatformFacility() has a switch statement with near-identical code blocks for caring/apfm
- Each case: fetch reviews -> loop -> build PlatformReviewInput -> upsert -> mark collected
- SeniorAdvisor is special-cased (returns aggregate, not individual reviews)
- Adding a new platform requires code changes in multiple places

### Platform clients (agents/pkg/reviews/{apfm,caring,senioradvisor,google}/)
- Each has client.go, types.go, client_test.go
- All wrap *resty.Client with baseURL
- All have FetchReviews(ctx, platformID) returning platform-specific review structs
- Review structs share: Rating, ReviewText, AuthorName, PublishedAt, SourceReviewID

### Handler struct uses builder pattern
```go
h := NewHandler(cfg, store, googleClient, logger).
  WithCaringClient(caringClient).
  WithAPFMClient(apfmClient).
  WithSeniorAdvisorClient(saClient)
```

## Consolidation Ideas (not decided)

1. Extract common Collector interface behind all platform clients
2. Replace switch statement with map-based registry keyed by source name
3. Move review conversion logic from handler into each platform package
4. Unify upsert pattern -- parametrize only fetch and conversion steps
5. Handle SeniorAdvisor aggregate-only behavior within the interface

## Files Involved

- agents/pkg/reviews/handler.go -- orchestrator
- agents/pkg/reviews/store.go -- persistence interface (136 lines)
- agents/pkg/reviews/postgres_store.go -- DB implementation
- agents/pkg/reviews/similarity.go -- matching utilities (81 lines)
- agents/pkg/reviews/apfm/client.go (139 lines)
- agents/pkg/reviews/caring/client.go (291 lines)
- agents/pkg/reviews/senioradvisor/client.go (109 lines)
- agents/pkg/reviews/google/client.go (188 lines)
- cmd/ship/reviews/match.go -- CLI match command
- db/migrations/000003_google_reviews.up.sql
- db/migrations/000026_platform_reviews.up.sql
- db/migrations/000027_review_platform_links.up.sql

## Related

See also: TODO/review-collection-remaining.md (match pipeline gaps, bug fixes)
