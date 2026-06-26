# Entity Model Consolidation & Operator Resolution

**Status:** Proposed milestone
**Supersedes:** TODO/operator-resolution-coverage-gaps.md (Gaps 2 and 4 absorbed; Gaps 1 and 3 remain independent)
**Related:** TODO/entity-governor-collection.md (complementary, stays independent)

## Problem

The codebase has two parallel systems for tracking who runs a facility:

1. **Legacy:** `wa.operators` table + `facilities.operator_id` -- stores the DSHS **licensee** (the LLC that holds the license) but calls it "operator" everywhere
2. **New:** `wa.facility_entities` with distinct roles (`licensee`, `operator`, `owner`) -- correctly named but not fully adopted

The legacy path is what the public API and scoring engine read. The result: users see the licensee holding company labeled as "operator" (e.g., "Cascadia Senior Living Holdings, LLC" instead of the actual operator "Cascadia Senior Living & Development").

The `facility_entities` table was added in migration 000039 as the new canonical storage, but the migration was never completed -- scoring, the public API query, and the UI all still read from the legacy path.

## Goals

1. **Single source of truth:** `wa.facility_entities` is the only place entity roles are stored and read
2. **Correct labels:** The public API never shows a licensee as an operator
3. **Scoring continuity:** Portfolio-level operator scoring (median, enforcement density, years active) works against facility_entities without regression
4. **Operator resolution coverage:** Facilities without DSHS PDFs (like Fieldstone OrchardWest) can still get operator data via direct CCFS search
5. **Drop legacy tables:** `wa.operators` table and `facilities.operator_id` column are removed

## Non-goals

- Assessor scraper truncation fix (Gap 1 from coverage-gaps doc -- stays independent)
- DSHS parser anchor coverage (Gap 3 -- stays independent)
- Governor collection into a new table (separate TODO)
- Scoring weight changes

## Requirements

### ENT-01: Scoring reads from facility_entities

Rewrite `LoadOperatorInputsForFacility` (and any other scoring queries that join through `facilities.operator_id`) to join through `wa.facility_entities` instead.

Peer grouping logic:
- Group by `entity_name` where `role = 'operator'`
- When no operator entity exists, fall back to `role = 'licensee'` (preserves current behavior)
- `entity_id` (when populated) can serve as a more precise grouping key

Must produce identical scores for all currently-scored facilities (regression test against production snapshot).

### ENT-02: API uses facility_entities exclusively

The `PublicFacilityBySlug` query drops the `wa.operators` JOIN. The response shape changes:

- Remove the legacy `operator` block (currently `PublicOperator` type with id, name, hq_city, hq_state, locality)
- Promote `oper` (currently `EntityBlock`) to `operator` in the response
- If no `facility_entities(role='operator')` row exists, `operator` is `null` -- do NOT substitute the licensee
- `licensee` block stays as-is
- `owner` block stays as-is

### ENT-03: Frontend removes fallback chain

The Svelte facility page currently has:
```
{#if facility.oper?.name}
  ...show oper...
{:else if facility.operator?.name}
  ...show legacy operator (actually licensee)...
```

After ENT-02, there's only `facility.operator` (the renamed oper). The fallback to the legacy block is removed. When operator is null, show an appropriate empty state.

### ENT-04: Operator-driven CCFS search

New collection path for facilities that lack DSHS PDFs or where `resolve-operator` found no match:

1. For each facility with a `facility_entities(role='licensee')` row but no `facility_entities(role='operator')` row
2. Search CCFS by the licensee's `entity_name`
3. Traverse the governor graph (same logic as existing `resolve-operator`)
4. Write result to `facility_entities(role='operator')`

This is essentially what `resolve-operator` already does, but today it requires `facilities.operator_id` to be set (which requires `populate-dshs` to have found a licensee in a PDF). After ENT-01/02, it should read the licensee from `facility_entities` directly.

Also add a direct CCFS name search fallback for operators that have no entity_id (absorbs Gap 2 from coverage-gaps doc): search CCFS by `display_name`, upsert result into `business_entities`, link via `entity_id` on the facility_entities row.

### ENT-05: populate-dshs stops dual-writing

`populate-dshs` currently writes to both `wa.operators` (via `UpsertOperator`) and `wa.facility_entities(role='licensee')`. After this work, it only writes to `facility_entities`. The `UpsertOperator` + `LinkFacilityOperator` calls are removed.

### ENT-06: Drop legacy schema

Migration to:
- Drop `facilities.operator_id` column
- Drop `facilities.operator_locality` column
- Drop `wa.operators` table
- Remove all sqlc queries that reference the dropped objects
- Clean up `GetOperatorContextByFacility` (used by facility summarizer) to read from facility_entities

### ENT-07: CLI command cleanup

- `resolve-operator` reads licensee from `facility_entities(role='licensee')` instead of `wa.operators`
- `resolve-sos` links `entity_id` on the `facility_entities` row instead of `wa.operators.entity_id`
- `recompute-locality` operates on `facility_entities` rows
- `populate-cms` writes to `facility_entities(role='licensee')` only

## Phase sketch

| Phase | Requirements | Risk |
|---|---|---|
| 1. Scoring migration | ENT-01 | High -- complex query rewrite, needs regression testing |
| 2. API + frontend | ENT-02, ENT-03 | Medium -- breaking API change, coordinate deploy |
| 3. Collection pipeline update | ENT-04, ENT-05, ENT-07 | Medium -- multiple CLI commands to update |
| 4. Schema cleanup | ENT-06 | Low -- mechanical once nothing references old tables |

## Absorbed from operator-resolution-coverage-gaps.md

- **Gap 2** (operator-driven SOS collector) -> ENT-04
- **Gap 4** (no DSHS PDFs) -> resolved by ENT-04's direct CCFS search path; also by ENT-02 showing null instead of misleading licensee data

## Stays independent

- **Gap 1** (assessor taxpayer_name truncation) -> separate fix, unrelated to entity model
- **Gap 3** (DSHS parser anchor coverage) -> separate fix, parser improvement
