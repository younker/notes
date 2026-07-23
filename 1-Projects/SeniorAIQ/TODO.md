# SHIP Project Tasks

Hub for SHIP TODOs and bugs. Detail docs live in `1-Projects/SeniorAIQ/TODO/` (legacy location — to be migrated into this folder in a future cleanup).

## TODO

- [ ] Create sitemap (SEO) #ship/todo
- [ ] Buy facility data — wire payment methods (PayPal, Google Pay, Apple Pay) #ship/todo
- [ ] Remove facility type label (e.g. "boarding home"); show name / what / where with address #ship/todo
- [ ] Highlight operator above the fold on facility pages #ship/todo
- [ ] Regional vs out-of-state filter (same region / adjacent state / within 200 mi) — see [[operator-proximity-classification]] #ship/todo
- [ ] Research messy facility data + propose new ingest/storage (445 canonical_facility_ids have >1 active wa.facilities row — DSHS ingest not archiving prior rows on license renewal; dedup query masks the symptom at read time) #ship/todo
- [ ] Audit remaining King data gaps (post-AFH/SL): 20 BH missing inspections, 28 OP missing reviews, 310 missing property owner, 621 missing operator entity, 768 missing licensee entity — classify each cluster as bug vs uncollected and either fix or schedule a collect run #ship/todo
- [ ] Run collection for [[sl-uncollected-2026-06-05|65 uncollected SL facilities]] (King County) — backlog, not a bug; will be covered by next `--before` run #ship/todo
- [ ] [[admin-review-match-approval]] #ship/todo
- [ ] [[analytics-data-gaps]] #ship/todo
- [ ] [[apfm-graphql-fallback]] #ship/todo
- [ ] [[bedrock-inspection-scorer-dedup]] #ship/todo
- [ ] [[bedrock-prompt-caching]] #ship/todo
- [ ] [[bedrock-review-summarizer-input-hash]] #ship/todo
- [ ] [[bedrock-switch-haiku-extraction]] #ship/todo
- [ ] [[consolidate-collection-pipelines]] #ship/todo
- [ ] [[data-driven-dshs-labels]] #ship/todo
- [ ] [[entity-governor-collection]] #ship/todo
- [ ] [[entity-model-consolidation]] #ship/todo
- [ ] [[ldex-business-reviews-api]] #ship/todo
- [ ] [[poi-rename-and-filtering]] #ship/todo
- [ ] [[public-facility-pages]] #ship/todo
- [ ] [[review-collection-remaining]] #ship/todo
- [ ] [[scoring-data-analysis]] #ship/todo
- [ ] [[admin-action-triggers]] #ship/todo
- [x] 🔺 Resolve pre-existing backend Terraform drift so applies aren't `-target`ed — `aws_ecs_task_definition.api` wants replacing, 2 S3 SSE configs change, an SNS billing sub is pending; review + apply-or-discard #ship/todo ✅ 2026-07-13 (branch `fix/terraform-drift`, applied; `terraform plan` now clean. Billing email sub is PendingConfirmation — click the link sent to admin@senioraiq.com)
- [ ] 🔺 Backfill facility URL slugs — only ~267/2,375 canonical facilities have slugs (mostly BH), so the public site + search show almost exclusively assisted-living; run the slug generator across all active facilities #ship/todo
- [ ] Retire the unused `ship-ui`-scoped GitHub OIDC role in `infrastructure/frontend` (repoint to `ship` or delete; the ship CI uses the backend `ship-prod-github-actions` role) #ship/todo
- [ ] Remove the dead CloudFront `S3Origin` + `ship-ui-production` bucket (SvelteKit static assets, unreferenced after the Go cutover) — keep `BlogImagesOrigin` #ship/todo
- [ ] Terraform tidy: remove the vestigial `enable_web_cutover` var + priority conditional in `ship_web.tf`; drop the 3 stale `ship_ui` outputs still pending in backend state #ship/todo
- [ ] Add a CI test gate for `ship/web` — run `go test` + `make web-check` (templ/CSS staleness) on PRs to the ship repo #ship/todo
- [ ] Code cleanup: remove dead `view.AdminScoreTier`; regenerate/share the api `middleware` `mockQuerier` (currently `panic("not implemented")` stubs for the grown `db.Querier`) #ship/todo
- [ ] Reskin deferred follow-ups: card badges (clean record / N citations / investigation open), memory-care tab + server-side `type=` filter, Save/Export PDF, year-built + distance rows, reviews infinite scroll, reconcile leadership/brand vs ownership/operator score categories #ship/todo

## Bugs

- [ ] Review summary not showing on facility detail page #ship/bug
- [ ] Strange scores: Miranda Care Yakima (84) outscores Sola Yakima 2 (83) despite 3 one-star reviews #ship/bug
- [ ] Missing inspections: Miranda Care (facility `f92ac07c-3d15-4218-b9af-551d7f4c41db`, license 208501) — DSHS reports_url has 1 report, scraper returns "no reports found" #ship/bug
- [ ] Missing location data: facility `55e32d1d-e69c-41ce-a3bf-3862c8baea3f` missing name / type / address / status on detail page #ship/bug
- [ ] Leadership vs Brand: relabel + fix detail page; calculators at weight 0 — confirm intent (v3.9 tech debt in STATE.md) #ship/bug
- [ ] `pdfextract` not on PATH in prod — Textract image fallback triggered; bake `/home/ec2-user/ship/bin` into deploy env #ship/bug
- [ ] Reviews `match` CLI only supports `--source caring` (no APFM / SeniorAdvisor match pipelines) #ship/bug
- [ ] SeniorAdvisor not-found review links retry indefinitely (never marked collected) #ship/bug
- [ ] Reviews `collect` without `--cutoff` returns 0 facilities on re-runs (only collects never-collected links) #ship/bug
- [ ] `platform_reviews` empty at rescore time — multi-source scoring path wired and tested but not activated with real data #ship/bug
- [ ] [[facility-summary-sparse-data]] #ship/bug
- [ ] [[fix-reviews-detail-page]] #ship/bug

## Open tasks by priority

```tasks
not done
(tag includes #ship/todo) OR (tag includes #ship/bug)
sort by priority
```

- [ ] Add real estate transaction date (county assessor data) to track ownership changes — from [[Game Plan 2026]] #ship/todo
- [ ] Implement milestone v3.14.1 Agentic Chat Platform — admin-only Go in-process supervisor (FacilityAdvisor + BlogDrafter, SSE streaming, Bedrock streaming client); plan at .planning/milestones/v3.14.1-{REQUIREMENTS,ROADMAP}.md; resolve blog-rules embedding before Phase 119 #ship/todo