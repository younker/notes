# APFM GraphQL API Fallback Plan

If the Hydra GraphQL API (`hydra.prod.aplaceformom.com/graphql`) becomes unavailable (auth required, rate limited, endpoint removed), fall back to scraping care-type listing pages.

## What Changes

| Concern | GraphQL (current) | Listing Pages (fallback) |
|---------|-------------------|--------------------------|
| Endpoint | `hydra.prod.aplaceformom.com/graphql` | `aplaceformom.com/{care-type}/washington/{city}` |
| Transport | POST with JSON body | GET with plain HTTP |
| Requests per city | 1 (all care types in one query) | 6 (one per care type slug) |
| Response format | JSON | HTML (parse with goquery) |
| Address source | `address` field in response | HTML card elements (`CommunityCard__Address` class) |
| Slug source | `slug` field in response | URL path after `/community/` in card links |
| Dedup | May not be needed (depends on query) | Required -- same facility appears across care types |
| Pagination | skip/limit with totalFilteredCount | Not needed for WA cities (all fit on one page) |
| Rate limiting | Unknown tolerance | Throttle between requests (reuse Pacer) |

## Migration Steps

### 1. Replace the HTTP call in ListFacilities

Current: POST to GraphQL endpoint with `findSortedOwlCommunities` query.

Fallback: Loop over 6 care-type URL slugs, GET each listing page.

```
Care type slugs (confirmed via sitemaps):
  assisted-living
  alzheimers-care
  independent-living
  nursing-homes
  care-homes
  home-care

URL pattern: https://www.aplaceformom.com/{care-type}/washington/{city-slug}
```

### 2. Replace response parsing

Current: Unmarshal JSON response, read `name`, `address`, `slug` fields.

Fallback: Parse HTML with goquery. Two data sources on the page:
- **HTML cards**: `CommunityCard__Address` class has full street address (street, city, state, zip)
- **JSON-LD**: `CollectionPage > ItemList` has facility name and `/community/{slug}` URL but NO street address

Use HTML cards for addresses. Use JSON-LD ItemList for the canonical facility list (name + slug). Cross-reference by matching the APFM numeric ID that appears in both the slug and the card's data attributes.

### 3. Add dedup logic

GraphQL may return each facility once. Listing pages return the same facility under multiple care types. Add a `seen` map keyed on slug to dedup.

### 4. Remove pagination logic

GraphQL uses skip/limit. Listing pages for WA cities show all results on one page -- no pagination needed. Remove the pagination loop entirely.

### 5. Adjust rate limiting

GraphQL: single request per city, rate limit at city level.
Listing pages: 6 requests per city. Add inter-request delay (500ms or reuse Pacer) between care-type fetches within a city.

### 6. Update error detection

GraphQL: check for HTTP errors or empty `data` field.
Listing pages: check for Cloudflare challenge (HTTP 200 with non-empty body but zero facilities parsed from HTML). Same detection logic from SCRP-04.

## What Does NOT Change

- `MatchCandidate` struct (Name, Address, Slug, PageURL)
- `MatchClient` interface and `apfmMatchAdapter` in resolve_scraper.go
- ScraperResolver orchestration (city loop, matching, confidence scoring)
- Downstream collect/CLI in Phase 71
- Detail page `FetchReviews` (already implemented, uses `/community/{slug}`)

## Scope of Code Changes

Only `agents/pkg/reviews/apfm/client.go` needs modification:
- `ListFacilities` -- replace GraphQL call with care-type page loop
- Add `fetchCandidates(ctx, url)` -- GET + parse HTML
- Add `parseCandidates(html)` -- goquery HTML card parsing
- Remove GraphQL query/response structs
- Remove pagination logic
- Add dedup map

Tests in `client_test.go` need updated fixtures (HTML instead of JSON) but test names and assertions stay the same.

## Trigger Conditions

Switch to fallback if any of:
- GraphQL endpoint returns 401/403
- GraphQL endpoint starts requiring an API key or session token
- GraphQL endpoint is removed or renamed
- Response shape changes (field renames, query deprecation)
- Rate limiting makes GraphQL unusable (429 responses)

## Verified Data (2026-03-25)

Listing page for Yakima assisted-living returns 13 facilities with:
- Full street addresses in HTML cards
- Names and slugs in JSON-LD ItemList
- No pagination needed
- No auth required
- Server-side rendered (works with plain HTTP GET)
