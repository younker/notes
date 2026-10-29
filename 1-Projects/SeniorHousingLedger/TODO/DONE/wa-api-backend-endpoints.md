# WA Admin API Backend Endpoints

Implement 6 read-only API endpoints under `/api/wa/` to serve the WA admin frontend pages. All endpoints require bearer token auth. The OpenAPI 3.0.3 spec lives at `ship/api/openapi/wa.yaml` and the TypeScript contracts at `ship-ui/src/lib/api/wa-types.ts` -- the backend must match these exactly.

**Current state:** Zero of the 6 endpoints exist. No routes are registered in `ship/api/cmd/server/main.go`, and no WA handler file exists in `ship/api/pkg/handlers/`. The database tables (`wa.facilities`, `wa.facility_addresses`, `wa.facility_scores`, `wa.operator_scores`, `wa.operator_facility_map`, `wa.property_owners`, `wa.business_entities`, `wa.facility_ownership`) and some sqlc queries already exist but need new queries for the WA response shapes.

## Endpoints

### 1. `GET /api/wa/facilities` -- List all WA facilities

- Returns `{ facilities: WAFacilityRow[], count: number }`
- Each row: id, facility_name, facility_type, city, county, stage, owner_id, owner_name, operator_id, operator_name, composite_score (nullable), collection_count, collection_total (always 6)
- Joins facilities with latest scores, operator mapping, and business entity ownership
- No pagination initially (full list)

### 2. `GET /api/wa/facilities/{id}` -- Get facility detail

- Returns `WAFacilityDetail` -- everything in WAFacilityRow plus: address_line1, address_line2, state, zip_code, phone, license_number, bed_count, administrator_name, and a `categories` array
- Address comes from `wa.facility_addresses` where address_type = 'location'
- `categories` is an array of 6 `WACategorySummary` objects (one per category: regulatory, reviews, property, location, leadership, brand), each with: name, collected (bool), collected_at (nullable datetime), score (nullable number), reason (nullable string)
- Category collection status and scores come from `wa.facility_scores` for the current scoring version
- Null means not collected/scored; 0 means scored with result of zero

### 3. `GET /api/wa/facilities/{id}/score` -- Get facility score breakdown

- Returns `WAFacilityScore`: facility_id, facility_name, scored (bool), composite_score (nullable), scoring_version (nullable), scored_at (nullable), and a `categories` array
- Each category in the array is a `WACategoryWeight`: name, nominal_weight, effective_weight, score (nullable), reason (nullable), collected (bool)
- Nominal weight is the configured weight before redistribution; effective weight is after redistributing uncollected categories' weight proportionally to collected ones

### 4. `GET /api/wa/facilities/{id}/categories/{category}` -- Get category detail

- `category` path param is one of: regulatory, reviews, property, location, leadership, brand
- Returns `WAFacilityCategoryDetail`: facility_id, category, collected (bool), collected_at (nullable), score (nullable), reason (nullable), data (object)
- The `data` field shape varies by category:
  - **regulatory**: inspection report data (report_count, citations, etc.)
  - **reviews**: Google/Yelp review aggregates (rating, review_count, etc.)
  - **property**: county assessor data (assessed_value, land_value, etc.)
  - **location**: proximity scores (hospital_score, pharmacy_score, grocery_score, park_score)
  - **leadership**: ownership/operator entity data (entity_type, ownership details)
  - **brand**: operator portfolio data (facility_count, portfolio_score, track_record)
- Data comes from the respective agent collection tables

### 5. `GET /api/wa/operators/{id}` -- Get operator detail

- Returns `WAOperatorDetail`: id, canonical_name, entity_type, facility_count, median_score (nullable), and `facilities` array
- Each facility in the array is a `WAEntityFacility`: id, facility_name, city, county, composite_score (nullable), collection_count, collection_total
- Uses `wa.operator_facility_map` to find associated facilities

### 6. `GET /api/wa/owners/{id}` -- Get owner detail

- Returns `WAOwnerDetail`: same shape as WAOperatorDetail (id, canonical_name, entity_type, facility_count, median_score, facilities array)
- Uses `wa.facility_ownership` and `wa.business_entities` to find the owner entity and its associated facilities

## Implementation notes

- Create a new handler file `ship/api/pkg/handlers/wa.go` (or `wa_facility.go` / `wa_operator.go` if preferred)
- Register all 6 routes in `ship/api/cmd/server/main.go` under the admin auth middleware
- New sqlc queries will be needed in `ship/db/queries/` to produce the WA-specific response shapes (existing queries don't match the WA response types)
- Run `make db-sqlc` after adding queries
- All nullable fields: null = not scored/collected, 0 = scored with zero result
- Refer to `ship/api/openapi/wa.yaml` for the authoritative schema
