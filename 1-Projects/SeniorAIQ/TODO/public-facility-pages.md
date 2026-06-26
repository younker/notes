# Public Facility Pages -- Milestone Plan

**Status:** Planned for v3.7 (after review summaries)
**Depends on:** v3.6 review summaries

## Goal

Expose facility detail pages publicly so families can access facility scores, review
summaries, and data. Currently all facility pages are admin-only behind RequireAdmin
middleware.

## Scope

1. Public facility detail page (scores, reviews summary, location, ownership)
2. Public facility search/listing
3. SEO considerations (structured data, meta tags, sitemaps)
4. Google AI results surfacing (Schema.org markup for local business / health facility)

## Google AI Results Strategy

To surface in Google AI Overviews and search results:

1. **Schema.org markup** -- LocalBusiness or MedicalBusiness type with:
   - aggregateRating
   - review snippets
   - address, geo coordinates
   - facility type, bed count
2. **Sitemap** -- XML sitemap of all public facility pages
3. **Meta tags** -- title, description, Open Graph for social sharing
4. **Content quality** -- review summaries provide unique textual content per page

## Technical Considerations

- API: new public endpoints (no auth) or split existing endpoints
- Rate limiting for public endpoints
- Caching strategy (scores don't change frequently)
- URL structure: /facilities/{slug} or /wa/{county}/{facility-name}
- Static generation vs server-rendered pages
