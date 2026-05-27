# Rename Operator to Owner

## Problem

The data we collect is ownership data (from county assessor property records via `ship ownership extract`), but after extraction everything in the system is called "operator". These are different concepts:

- **Owner**: The entity that owns the property (what we actually collect from assessor data)
- **Operator**: The entity that manages/runs the facility (staffing, operations, etc.) — hired by owners

The system conflates the two. The current pipeline collects owner data but labels it as operator data throughout: `wa.operator_scores`, `wa.operator_facility_map`, operator detail pages, etc.

## Goal

Rename everything from "operator" to "owner" to accurately reflect what the data represents, with a data-preserving migration for production. A separate future effort will add actual operator tracking.

## Database Migration (data-preserving)

New migration to rename (not recreate). All data is preserved — ALTER TABLE RENAME is metadata-only in PostgreSQL.

```sql
-- Up migration

-- Rename tables
ALTER TABLE wa.operator_scores RENAME TO owner_scores;
ALTER TABLE wa.operator_facility_map RENAME TO owner_facility_map;

-- Rename columns
ALTER TABLE wa.owner_facility_map RENAME COLUMN operator_score_id TO owner_score_id;

-- Rename indexes
ALTER INDEX wa.idx_operator_scores_entity_type RENAME TO idx_owner_scores_entity_type;
ALTER INDEX wa.idx_operator_facility_map_operator RENAME TO idx_owner_facility_map_owner;

-- Rename foreign key constraints (if named with "operator")
-- Check actual constraint names in 000014/000015 migrations
```

```sql
-- Down migration

ALTER TABLE wa.owner_scores RENAME TO operator_scores;
ALTER TABLE wa.owner_facility_map RENAME TO operator_facility_map;
ALTER TABLE wa.operator_facility_map RENAME COLUMN owner_score_id TO operator_score_id;
ALTER INDEX wa.idx_owner_scores_entity_type RENAME TO idx_operator_scores_entity_type;
ALTER INDEX wa.idx_owner_facility_map_owner RENAME TO idx_operator_facility_map_operator;
```

Existing migrations: `000014_score_schema.up.sql`, `000015_operator_facility_map.up.sql`

## SQL Queries (db/queries/)

**scores.sql** — rename these query names and update table/column references:
- `UpsertOperatorScore` → `UpsertOwnerScore`
- `ListOperatorScores` → `ListOwnerScores`
- `DeleteOperatorFacilityMap` → `DeleteOwnerFacilityMap`
- `InsertOperatorFacilityMap` → `InsertOwnerFacilityMap`
- `ListFacilitiesByOperatorID` → `ListFacilitiesByOwnerID`
- `WaCategoryBrand` — update table references
- `ListCurrentFacilityScoresWithOperator` → `ListCurrentFacilityScoresWithOwner`
- `WaOperatorDetail` → `WaOwnerDetail`
- `WaOperatorFacilities` → `WaOwnerFacilities`

**facilities.sql** — CTEs named `first_operator` → `first_owner`, fields `operator_id`/`operator_name` → `owner_id`/`owner_name` in `WaFacilityDetail` and `WaFacilityListAll`

**analytics.sql** — `OperatorSummary` → `OwnerSummary`

Then run `make db-sqlc` to regenerate Go code from updated queries.

## Go Backend (ship/)

### Structs/Types
- `WaOperatorScore` → `WaOwnerScore` (db/models.go — sqlc generated)
- `WaOperatorFacilityMap` → `WaOwnerFacilityMap` (db/models.go — sqlc generated)
- `OperatorHandler` → `OwnerHandler` (api/pkg/handlers/operator.go → owner.go)
- `OperatorFacility` → `OwnerFacility` (api/pkg/handlers/operator.go)
- `OperatorResponse` → `OwnerResponse` (api/pkg/handlers/operator.go)
- `OperatorListResponse` → `OwnerListResponse` (api/pkg/handlers/operator.go)
- `OperatorSummaryItem` → `OwnerSummaryItem` (api/pkg/handlers/analytics.go)
- `OperatorSummaryResponse` → `OwnerSummaryResponse` (api/pkg/handlers/analytics.go)
- `OperatorRollup` → `OwnerRollup` (scoring/pkg/store/store.go)
- `FacilityInputs.HasOperatorData` → `HasOwnerData` (scoring/pkg/store/store.go)
- `operatorGroup` → `ownerGroup` (scoring/pkg/aggregator/rollup.go)
- `brand.Input.HasOperatorData` → `HasOwnerData` (scoring/pkg/calculators/brand/brand.go)
- `brand.Audit.HasOperatorData` → `HasOwnerData` (scoring/pkg/calculators/brand/brand.go)
- `WAFacilityDetailResponse.OperatorID/OperatorName` → `OwnerID/OwnerName` (api/pkg/handlers/wa_facility.go)

### Functions/Handlers
- `NewOperatorHandler` → `NewOwnerHandler` (api/pkg/handlers/operator.go)
- `OperatorHandler.List` → `OwnerHandler.List`
- `OperatorHandler.Get` → `OwnerHandler.Get`
- `WAEntityHandler.GetOperator` → `GetOwner` (api/pkg/handlers/wa_entity.go)
- `NormalizeOperatorName` → `NormalizeOwnerName` (scoring/pkg/ownership/normalize.go)
- `SaveOperatorRollups` → `SaveOwnerRollups` (scoring/pkg/store/postgres_store.go)
- `toOperatorFacility` → `toOwnerFacility`

### API Routes (api/cmd/server/main.go)
- `GET /api/operators` → `GET /api/owners`
- `GET /api/operators/{id}` → `GET /api/owners/{id}`
- `GET /api/wa/operators/{id}` → `GET /api/wa/owners/{id}`
- `GET /api/admin/analytics/operators` → `GET /api/admin/analytics/owners`

### OpenAPI Spec (api/openapi/wa.yaml)
- Endpoint path, operationId, parameter descriptions, schema field names, component descriptions

### Tests
- `operator_test.go` → `owner_test.go` (api/pkg/handlers/)
- `operatorMockQuerier` → `ownerMockQuerier`
- Helper functions: `makeOperator` → `makeOwner`, etc.
- `rollup_test.go` — test case names referencing "operator"
- `facility_test.go` — mock querier stubs for renamed query methods

### CLI (cmd/ship/wa/)
- `rollups.go` — update Short/Long descriptions referencing "operator"
- `score.go` — update comments referencing "operator"

## Frontend (ship-ui/)

### Types
- `WAOperatorDetail` → `WAOwnerDetail` (src/lib/api/wa-types.ts)
- `OperatorSummary` → `OwnerSummary` (src/lib/api/client.ts)
- `OperatorSummaryResponse` → `OwnerSummaryResponse` (src/lib/api/client.ts)
- `OperatorFacility` → `OwnerFacility` (src/lib/api/client.ts)
- `OperatorDetail` → `OwnerDetail` (src/lib/api/client.ts)
- `BrandAudit.has_operator_data` → `has_owner_data` (src/lib/api/client.ts)
- `operator_id`/`operator_name` fields on `WAFacilityRow`, `WAFacilityDetail` → `owner_id`/`owner_name` (src/lib/api/wa-types.ts)

### API Client Functions
- `api.analytics.getOperators()` → `getOwners()` — update URL to `/api/admin/analytics/owners`
- `api.operators.get(id)` → `api.owners.get(id)` — update URL to `/api/owners/{id}`
- `api.wa.getOperator(id)` → `api.wa.getOwner(id)` — update URL to `/api/wa/owners/{id}`

### Routes (rename directories)
- `src/routes/admin/wa/operators/` → `src/routes/admin/wa/owners/`
- `src/routes/admin/wa/operators/[id]/` → `src/routes/admin/wa/owners/[id]/`
- Update all internal references and links

### Components
- `OperatorDrillDown.svelte` → `OwnerDrillDown.svelte` (src/lib/components/admin/)
- `operatorName` state → `ownerName`

### Pages referencing operator fields
- `src/routes/admin/wa/facilities/[id]/+page.svelte` — `operator_name`/`operator_id` refs
- `src/routes/admin/wa/facilities/[id]/score/+page.svelte` — operator link
- `src/routes/admin/wa/facilities/+page.svelte` — sort field, search filter, table column
- `src/routes/admin/+layout.svelte` — nav link text and href
- `src/routes/admin/+page.svelte` — dashboard card link and description
- `src/routes/admin/analytics/scatter/+page.svelte` — scoring category labels ("operator longevity", "Operator credibility" → "owner longevity", "Owner credibility")

## Do NOT Rename

- `ship ownership extract` CLI subcommand — already correctly named
- `ListOperationalFacilities` / `ListOperationalFacilitiesByCounty` — "operational" means "currently operating", unrelated
- `ClassifyOwner()` — already correctly named
- `facility_ownership` table — already correctly named
