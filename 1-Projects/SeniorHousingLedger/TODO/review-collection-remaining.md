# Review Collection: Remaining Work

## Working end-to-end

- Google: resolve -> collect -> score (fully operational)
- Caring.com: resolve -> collect -> score (fully operational)
- APFM: resolve -> collect -> score (fully operational, separate pipeline)

## Blocked: SeniorAdvisor resolve not wired

SeniorAdvisor scraper and collector are built and wired into the handler, but
`ship reviews resolve --source` only accepts "google" and "caring". Without
links in wa.review_platform_links, collect returns 0 facilities.

### Full wiring needed

1. Add `ListFacilities` to SeniorAdvisor client
   - Parse all community cards (name, address, slug) from city listing pages
   - Return []MatchCandidate compatible with ScraperResolver

2. Create SeniorAdvisor match adapter
   - Implement MatchClient interface (like NewCaringMatchClient)
   - Wrap SeniorAdvisor client's new ListFacilities method

3. Wire into resolve CLI
   - Add "senioradvisor" to allSources in cmd/ship/reviews/resolve.go
   - Add case in resolver switch to build ScraperResolver with SA match client
   - Update error message and help text

Note: SeniorAdvisor only provides aggregate ratings (no individual reviews
due to robots.txt blocking /reviews/ paths). Lower priority than LDEX
integration which provides full review history.

## Bug fix: collect without --cutoff returns 0 on re-runs

- RunPlatformCollect passes zero-value time.Time as cutoff when flag is omitted
- SQL condition `last_collected_at < $2` is never true for year 0001
- Only `last_collected_at IS NULL` rows match, so already-collected links are skipped
- Fix: either default --cutoff to a reasonable value (e.g. 7d) or document
  that --cutoff is required for recollection

## Fixed

- SeniorAdvisor not-found retry loop (handler.go): MarkPlatformCollected now
  called even when FetchAggregate returns nil
