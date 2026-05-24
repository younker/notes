# How to Collect Data for Facility Scoring

## Prerequisites

```bash
make dev-up        # Start PostgreSQL and Redis
make db-migrate    # Create schema
make build-cli     # Build ship CLI -> bin/ship
```

## Step 1: Load DSHS facility data

Everything else depends on this. Run it first.

```bash
ship wa load --file ./data/dshs/long_term_residential_care-king.geojson --county King
```

## Step 2: Collect data sources

These all depend on step 1 but are independent of each other.
Steps 2a and 2b must run sequentially. Everything else can run in parallel.

```
wa load (1)
├── reviews resolve (2a) -> reviews collect (2b)
├── ownership extract (3)
├── wa location (4)
└── wa inspections (5)
```

### 2a. Resolve Google Place IDs

```bash
ship reviews resolve --county King
```

### 2b. Collect Google Reviews

Requires 2a to finish first.

```bash
ship reviews collect --county King --workers 1 --delay 5s --fuzz 8
```

### 2c. Property ownership (county assessor)

```bash
ship ownership extract --county King
```

### 2d. POI proximity (hospitals, pharmacies, grocery, parks)

```bash
ship wa location --county King --workers 1 --delay 5s --fuzz 8
```

### 2e. Inspection reports (scrape, download, extract, score)

```bash
ship wa inspections --county King --workers 1 --delay 8s --fuzz 10
```

## Step 3: Score facilities

Requires all data sources from step 2 to be collected. Runs three sub-steps automatically:
1. Score each facility individually (regulatory, reviews, property, location, leadership)
2. Compute operator rollups (median/min/max across facilities per owner)
3. Rescore all facilities with updated operator data (brand scores)

```bash
ship wa score --county King
```

Already-scored facilities are skipped unless `--force` is set. Use `--dry-run` to preview without writing to the database.

Sub-steps can also be run individually:

```bash
ship wa rollups                          # Step 2 only
ship wa rescore --county King            # Step 3 only
```

## What feeds scoring

| Weight | Component  | Source Table            | Key Columns                    |
|--------|------------|------------------------|--------------------------------|
| 30%    | Regulatory | wa.inspection_reports  | event_score, response_score    |
| 25%    | Reviews    | wa.google_reviews      | rating                         |
| 15%    | Property   | wa.property_owners     | assessed_value                 |
| 15%    | Location   | wa.facility_proximity  | distance_km, category          |
| 10%    | Leadership | wa.property_owners     | cross-facility ownership query |
| 5%     | Brand      | wa.facilities          | operator grouping              |

## Related

- [[SHIP MOC]]
- [[02-every-assisted-living-inspection-in-king-county-scored]] - blog post about the inspection data this how-to describes
