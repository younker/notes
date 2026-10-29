# Consolidate Brand Category Page into Owner Page

## Context

The brand category page (`/admin/wa/facilities/:id/categories/brand`) shows owner aggregate data (canonical_name, entity_type, facility_count, median_score, min_score, max_score). The owner page (`/admin/wa/owners/:id`) already shows most of this but is missing min_score and max_score. These pages display the same underlying data from `wa.owner_scores`. The brand page should be eliminated, with its unique data (min/max scores) moved to the owner page.

## Changes

### 1. Backend: Add min_score and max_score to WaOwnerDetail query

**File: `ship/db/queries/ownership.sql`** (line ~124-131)
- Add `os.min_score` and `os.max_score` to the `WaOwnerDetail` SELECT

**File: `ship/db/ownership.sql.go`** (generated)
- Run `make db-sqlc` to regenerate

**File: `ship/api/pkg/handlers/wa_entity.go`**
- Add `MinScore *int16` and `MaxScore *int16` to `WAOwnerDetailResponse`
- Populate from the query result

### 2. Frontend: Add min/max scores to owner page

**File: `ship-ui/src/lib/api/wa-types.ts`** (line 90-97)
- Add `min_score?: number` and `max_score?: number` to `WAOwnerDetail`

**File: `ship-ui/src/routes/admin/wa/owners/[id]/+page.svelte`**
- Add Min Score and Max Score rows to the info-grid `<dl>`

### 3. Frontend: Redirect brand "View details" links to owner page

**File: `ship-ui/src/routes/admin/wa/facilities/[id]/+page.svelte`** (line 130)
- For the brand category row, change the "View details" link from `/admin/wa/facilities/{id}/categories/brand` to `/admin/wa/owners/{facility.owner_id}` (only when owner_id exists; hide link otherwise)

**File: `ship-ui/src/routes/admin/wa/facilities/[id]/score/+page.svelte`** (line 126)
- Same: for brand category, link to `/admin/wa/owners/{facilityDetail.owner_id}` instead of the category page (facilityDetail is already fetched)

### 4. Frontend: Remove brand section from category page

**File: `ship-ui/src/routes/admin/wa/facilities/[id]/categories/[category]/+page.svelte`** (lines 73-80, 307-322)
- Remove the `BrandData` interface
- Remove the `{:else if categoryData.category === 'brand'}` block (it falls through to the generic `{:else}` if someone somehow navigates there directly)

## Verification

1. `cd ship && make db-sqlc && make build-api && make test-go`
2. `cd ship-ui && npm run check`
3. Visit `/admin/wa/owners/:id` - confirm min_score and max_score display
4. Visit `/admin/wa/facilities/:id` - confirm brand "View details" links to owner page
5. Visit `/admin/wa/facilities/:id/score` - confirm brand "View details" links to owner page
