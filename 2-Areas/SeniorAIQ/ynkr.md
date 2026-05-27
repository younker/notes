# Notes

- [x] get prompts to justin
- [x] annual state survey (inspection) -- no issues requires a badge!
- [x] facility slug: /state/city/facility_type/facility_name
- [x] filter review on facility detail pg to only include those with a body. for example, for facility id 8d837326-5637-4033-916c-b8fb582cbff1 in production, we show 4 reviews, one of them, from Amy Ross on February 26, 2022, has no review text, just a review rating (stars). When a facility has more than 4 reviews, show the latest reviews with both a rating and a review body. If they have 4 or fewer reviews, show them but if the review body is empty, put a placeholder that say "No review provided, only rating"

- [ ] find out why the review summary is not showing
- [ ] create sitemap (seo)
- [ ] buy facility data -> hookup with payment methods (paypal, google pay, apple pay, etc)
    * most important consideration
    * if most recent inspection, bump score
- [ ] rm facility type (eg boarding home)... we want name, what and where
    * can we get better language there
    * add address
- [ ] operator: highlight somehow above fold

- [ ] regional vs out-of-state
    * in same region OR
    * adjascent state OR
    * within 200 miles

### Facility Reviews


### Strange Scores

How does http://localhost:5174/miranda-care-yakima-wa score 84 while http://localhost:5174/sola-yakima-2-yakima-wa scores 83. The reviews for Miranda Care a very poor (3 1 star reviews) so how can that score so high?

### missing inspections

Possible bug with the "Inspections" section. For example, http://localhost:5174/miranda-care-yakima-wa facility has no inspection reports available. When I look up the reports_url for that facility (id: f92ac07c-3d15-4218-b9af-551d7f4c41db, url:  https://fortress.wa.gov/dshs/adsaapps/lookup/AFHForms.aspx?lic=208501). If I visit the reports_url, I see there is 1 report. When I run "ship wa inspections --facility-id f92ac07c-3d15-4218-b9af-551d7f4c41db" to collect that data, I get:
time=2026-04-11T12:27:40.647-04:00 level=INFO msg="connected to database"
time=2026-04-11T12:27:40.655-04:00 level=INFO msg="S3 downloader configured" bucket=wa-facility-reports
time=2026-04-11T12:27:40.656-04:00 level=INFO msg="extractor configured" bucket=wa-facility-reports
time=2026-04-11T12:27:40.656-04:00 level=INFO msg="scorer configured" model=claude-sonnet-4-5
time=2026-04-11T12:27:40.668-04:00 level=INFO msg="starting inspection scraper" facilities=1
time=2026-04-11T12:27:47.900-04:00 level=WARN msg="no reports found on page or in database" facility="MIRANDA CARE"
time=2026-04-11T12:27:47.903-04:00 level=INFO msg="no reports to download" facility="MIRANDA CARE"
time=2026-04-11T12:27:47.906-04:00 level=INFO msg="no reports to extract" facility="MIRANDA CARE"

=== Inspection Scrape Complete ===
Facilities: 1/1 succeeded
Reports:    0 found (0 new)
PDFs:       0 downloaded, 0 skipped, 0 failed
Text:       0 extracted, 0 scanned, 0 skipped, 0 failed
Scoring:    0 scored, 0 skipped, 0 failed
Duration:   7.251562276s
Errors:     0

### Missing location data

Facility ID 55e32d1d-e69c-41ce-a3bf-3862c8baea3f in production is missing name, type, address & status from the location detail page: https://senioraiq.com/admin/wa/facilities/55e32d1d-e69c-41ce-a3bf-3862c8baea3f/categories/location

### Leadership vs Brand

Looking at leadership and brand for facility https://senioraiq.com/admin/wa/facilities/55e32d1d-e69c-41ce-a3bf-3862c8baea3f in production I see "Leadership" has UBI, Business name, Principal office and incorporation date. How is this leadership? Isn't this owner information? As for "Brand", 1) it shows as not collected. What collects that info? 2) when I click on that, it shows "Asc Overlake" (https://senioraiq.com/admin/wa/owners/5555fe42-59bc-4e35-a008-2a5f19031f3f) with the facility I just came from, Aegis Living Bellevue Overlake. Again, this seems like Asc Overlake owns this facility making the "Brand" and "Leadership" sections redundant. I need an explanation of what these are suppose to be in reference to the scoring algorithm. We then need to relable them and fix the detail page to show the proper information.

In a previous milestone (v3.9) there was a comment that "Leadership/Brand calculators still in tree at weight 0; consider deletion in a future cleanup" (this tech debt item in tracked in STATE.md)



## Fix

time=2026-03-19T21:04:53.127Z level=INFO msg="textract unsupported document, trying image fallback" key="1695/R Brookdale Yakima Complaint 02-22-2023 - AH.pdf"
time=2026-03-19T21:05:15.214Z level=INFO msg="scanned (flagged)" facility="Brookdale Yakima" filename="R Brookdale Yakima Complaint 02-22-2023 - AH.pdf" pages=1 confidence=94.3%
time=2026-03-19T21:05:15.511Z level=INFO msg="local PDF extraction failed, using textract" key="1695/R Brookdale Yakima Complaint 12-08-2022 - AH.pdf" err="pdfextract: exec: \"pdfextract\": executable file not found in $PATH"

export PATH=/home/ec2-user/ship/bin:$PATH

## Reviews

  # 1. Match facilities to Caring.com pages (seeds review_platform_links)
  bin/ship reviews match --source caring --county Yakima

  # Dry run first to see what would be matched:
  bin/ship reviews match --source caring --county Yakima --dry-run

  # 2. Collect reviews from each source
  bin/ship reviews collect --source caring --county Yakima
  bin/ship reviews collect --source apfm --county Yakima
  bin/ship reviews collect --source senioradvisor --county Yakima

  # Dry run to see which facilities would be collected:
  bin/ship reviews collect --source caring --dry-run

  # Recollect facilities older than 30 days:
  bin/ship reviews collect --source caring --cutoff 30d

  # 3. Rescore with new review data
  bin/ship wa rescore --county Yakima --force

  # 4. Recompute owner rollups
  bin/ship wa rollups --county Yakima

  Note: APFM and SeniorAdvisor collect commands depend on having links in wa.review_platform_links for those sources. Currently only --source caring is supported by the match command. APFM and
  SeniorAdvisor links would need to be seeded (either by extending match or manual DB insertion) before their collectors can run. This is tracked as tech debt.

  Tech debt carried forward

  - match CLI only supports --source caring (no APFM/SeniorAdvisor match pipelines)
  - SeniorAdvisor not-found links retry indefinitely (not marked collected)
  - collect without --cutoff on re-runs returns 0 facilities (only collects never-collected links)
  - platform_reviews was empty at rescore time -- multi-source scoring path is wired and tested but not yet activated with real data

## Collection Sequence

1. ship wa load --file <geojson> --county <County> --type BH
    └── Ingests DSHS facility records (foundation for everything)

2a. ship wa inspections --county <County> --workers 3
2b. ship reviews resolve --county <County> --workers 5
2c. ship reviews collect --county <County> --workers 5  (requires 2b)
2d. ship wa location --county <County> --workers 5
2e. ship ownership extract --county <County> --workers 3
    └── 2a, 2b, 2d, 2e can run in parallel
    └── 2c depends on 2b (needs Place IDs)

3. ship wa backfill-display-names
    └── Normalizes names across all tables

4. ship wa migrate-canonical
    └── Deduplicates facilities into canonical records

5. ship wa score --county <County> --workers 4
    └── Internally runs: score → rollups → rescore

Key constraints:
- Step 1 must be first
- Step 2b must precede 2c
- Steps 2a/2b/2d/2e are independent and parallelizable
- Steps 3-5 are sequential and require all collection to be done
- All commands support --dry-run and --force
