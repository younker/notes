# Add `ship wa fetch` Command

Automate downloading DSHS facility data from the ArcGIS REST API so we stop manually exporting GeoJSON from the web portal.

## Problem

Currently loading facility data requires:
1. Navigate to the WA open data portal
2. Apply filters manually (county, facility type)
3. Export as GeoJSON
4. Save file locally
5. Run `ship wa load --file <path>`

## Solution

New `ship wa fetch` subcommand that queries the ArcGIS Feature Service REST API directly and writes GeoJSON to disk.

## API Details

**Base endpoint:**
```
https://services2.arcgis.com/WW3T8U6q5EkZ9U3n/arcgis/rest/services/Long_Term_Care_Residential_Care_view/FeatureServer/1
```

**Query endpoint:**
```
/query?where=<filter>&outFields=*&outSR=4326&f=geojson
```

**Filter examples:**
- All Yakima BH: `where=LocationCounty='Yakima' AND FacilityType='BH'`
- All Yakima: `where=LocationCounty='Yakima'`
- All statewide: `where=1=1`

**Record counts (as of 2026-02-19):**
- Statewide all types: 130,935
- Yakima all types: 1,369
- Yakima BH: 548

**Pagination:**
- Max records per request: 2,000
- Use `resultOffset` and `resultRecordCount` params for pagination
- Response includes `properties.exceededTransferLimit: true` when more pages exist

**Output format:**
- `f=geojson` returns standard GeoJSON FeatureCollection with EPSG:4326 CRS
- Schema matches existing parser exactly (same field names as current GeoJSON files)

## CLI Design

```bash
# Fetch Yakima BH facilities
ship wa fetch --county Yakima --type BH

# Fetch all Yakima facilities
ship wa fetch --county Yakima

# Fetch statewide (requires pagination)
ship wa fetch --all

# Custom output path
ship wa fetch --county Yakima --type BH --output ./data/dshs/yakima-bh.geojson
```

**Flags:**
- `--county` - Filter by LocationCounty
- `--type` - Filter by FacilityType (AF, BH, SL, EF, GT, GH)
- `--all` - Fetch all statewide (no county filter)
- `--output` - Output file path (default: `data/dshs/{county}-{type}.geojson`)

## Implementation Notes

- Lives in `cmd/ship/wa/fetch.go` alongside existing `load.go`
- HTTP client in `agents/pkg/dshs/` (new file, e.g. `arcgis_client.go`)
- Must handle pagination: loop with resultOffset until exceededTransferLimit is false
- Merge paginated responses into a single FeatureCollection before writing
- No database dependency -- this is purely API-to-file
- Could later add a `--load` flag that pipes directly into the loader, but keep it simple initially

## Facility Type Codes

| Code | Description |
|------|-------------|
| AF | Adult Family Home |
| BH | Boarding Home / Assisted Living |
| SL | Supported Living |
| EF | Enhanced Services Facility |
| GT | Group Training Home |
| GH | Group Home |

## Updated Data Collection Pipeline

After this, `howto-collect-data.md` step 1 becomes:

```bash
bin/ship wa fetch --county Yakima --type BH
bin/ship wa load --file data/dshs/yakima-bh.geojson --county Yakima --type BH
```

Or eventually with `--load`:

```bash
bin/ship wa fetch --county Yakima --type BH --load
```
