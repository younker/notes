# LDEX Business Reviews API -- Research & Next Steps

**Status:** Sandbox access granted, 30-day window (from ~Apr 8 2026)
**Contact:** Valeria Ledezma <valeria@localdataexchange.com>
**Pricing:** $100/month minimum, per-API-call + per-publisher cost (details TBD)
**Docs:** https://api.ldex.co/publisher-reviews/docs
**Calendar:** https://calendly.com/valeria-localdataexchange/product-tech-meeting

## Sandbox Credentials

- API-key: IhXft7aruUe3SOO372jUCqSp67J05gfC
- Dev-finish-queue: https://sqs.us-west-2.amazonaws.com/501388824769/dev-ynkr-finished-reviews
- Dev-errors-queue: https://sqs.us-west-2.amazonaws.com/501388824769/dev-ynkr-errors
- S3-Bucket: ynkr-reviews
- AWS credentials: configure via `aws configure --profile ldex-sandbox` (region us-west-2)

## Architecture

Async SQS-based workflow (not REST):
1. Send JSON request to their SQS request queue
2. LDEX scrapes the publisher asynchronously
3. Results land on customer-specific SQS response queue (one message per publisher)
4. Review data stored in S3 as `.jl` (JSON Lines) files, linked from response

Request queue (staging): https://sqs.us-west-2.amazonaws.com/501388824769/dev-request-reviews

## Request Payload

```json
{
  "job": "App\\Jobs\\RequestReviews",
  "data": {
    "api_key": "IhXft7aruUe3SOO372jUCqSp67J05gfC",
    "foreign_key": "your-tracking-id",
    "lazy": true,
    "business": {
      "id": "facility-canonical-id",
      "name": "Facility Name",
      "address": {
        "street": "123 Main St",
        "city": "Yakima",
        "state": "WA",
        "zip": "98901",
        "country": "USA"
      }
    },
    "publishers": {
      "maps.google.com": {
        "profile_key": "https://maps.google.com/maps/place/?q=place_id:ChIJ...",
        "first_page_only": false
      }
    }
  }
}
```

- `foreign_key` -- use canonical_facility_id for tracking
- `lazy: true` -- increases timeout for large review batches
- `profile_key` -- business URL/ID on that publisher (required)
- `last_review_hashes` -- send previous hashes for incremental fetching
- `first_page_only` -- false to get all pages
- `social_profile: true` on a publisher -- presence check only (no reviews)

## Response Payload

```json
{
  "foreign_key": "12345",
  "batch_id": "A65orb5vlJ9gByQw",
  "task_id": "XPeZ3bBLwOQDRkrQ",
  "task_status": 200,
  "publisher": "maps.google.com",
  "profile_key": "http://...",
  "reviews_urls": ["https://s3.../XPeZ3bBLwOQDRkrQ.jl"],
  "histogram": {
    "primary": {
      "score": 9.5,
      "total_reviews": 421
    }
  }
}
```

## Review Data Fields (from S3 .jl files)

| Field | Type | Notes |
|-------|------|-------|
| rating | int | e.g., 1-5 |
| review_hash | string | MD5 for dedup |
| text | string | base64 encoded |
| posted_at | int | Unix timestamp |
| author_name | string | base64 encoded |
| source_date | string | Raw date text from source |
| scraped_at | int | Unix timestamp |

## Task Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | No business page found |
| 404 | Business not found |
| 429 | Rate limited by publisher |
| 460 | Business has no reviews |
| 461 | No new reviews |
| 504 | Timeout |
| 530 | Partial success |

## Relevant Publishers for Senior Housing

| Publisher | Already Have? | LDEX Value | Notes |
|-----------|--------------|------------|-------|
| maps.google.com | Yes (5 reviews via Places API) | **High** -- full review history | Major upgrade from 5-review cap |
| caring.com | Yes (scraping) | Low | Already collecting |
| aplaceformom.com | Yes (GraphQL) | Low | Already collecting |
| healthgrades.com | No | **Medium** | If facilities are listed |
| bbb.org | No | **Medium** | Brand/reputation signal |
| care.com | No | **Low-Medium** | Caregiver-focused, different audience |
| facebook.com | No | Skip | Requires login cookies |
| yelp.com | No | Skip | Requires login cookies + ToS concerns |

Full publisher list: airbnb.com, angieslist.com, apartmentratings.com, apartments.com,
aplaceformom.com, avvo.com, bbb.org, carfax.com, care.com, caring.com, citysearch.com,
clearsurance.com, dealerrater.com, edmunds.com, expedia.com, facebook.com, gayot.com,
glassdoor.com, golfnow.com, greatschools.org, grubhub.com, healthgrades.com,
homeadvisor.com, homestars.com, houzz.com, indeed.com, judysbook.com, lawyers.com,
maps.google.com, opentable.com, orbitz.com, ratemds.com, realself.com, superpages.com,
theknot.com, travelocity.com, tripadvisor.com, trustpilot.com, vitals.com, vrbo.com,
webmd.com, weddingwire.com, wellness.com, yellowpages.com, yelp.com, zillow.com,
zocdoc.com, zomato.com

## Other LDEX APIs

| API | Relevance |
|-----|-----------|
| Entity Resolution API | Could help facility-to-publisher matching |
| Listings Management API | Not relevant |
| Competitor Analysis API | Not relevant |
| Geo Grid Ranking API | Not relevant |

## Next Steps (when ready)

1. Set up AWS profile: `aws configure --profile ldex-sandbox`
2. Explore S3 bucket: `aws s3 ls s3://ynkr-reviews/ --recursive --profile ldex-sandbox`
3. Check SQS queues for any existing messages
4. Submit test request for one known facility on maps.google.com
5. Check healthgrades.com and bbb.org presence via social_profile: true
6. Compare Google review volume (LDEX full history vs Places API 5-review cap)
7. Evaluate cost per facility before committing

## Value Proposition

The biggest win is **Google reviews**. Currently capped at 5 per facility via Places API.
LDEX could provide full review history (50-300+ reviews per popular facility). This would
dramatically improve review signal quality and make LLM review summaries much richer.

Secondary value: healthgrades.com and bbb.org as new data sources for review scoring
and brand/reputation signals.
