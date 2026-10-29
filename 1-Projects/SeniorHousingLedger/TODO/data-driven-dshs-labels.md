# Data-Driven DSHS Facility Types Blog Post

## Prerequisite: Load All DSHS Facility Types Statewide

Currently we only have BH (Boarding Home/Assisted Living) data for King and Yakima counties. To make the facility types blog post data-driven, we need all six facility types loaded statewide.

### Data to collect

- **AF** -- Adult Family Homes (largest category statewide, thousands of facilities)
- **BH** -- Boarding Homes / Assisted Living (already have King + Yakima, need remaining counties)
- **SL** -- Supported Living
- **EF** -- Enhanced Services Facilities
- **GT** -- Group Training Homes
- **GH** -- Group Homes

### Steps

1. Confirm which facility types are available in the DSHS GeoJSON feed
2. Load all available types for all counties statewide
3. Backfill Google Places data for newly loaded facilities

## Blog Post Data Points to Add

Once statewide data is loaded, update `ship-ui/src/posts/washington-dshs-facility-types-explained.md` with stats like:

- Total facility count per type statewide (e.g., "Washington has X,XXX licensed adult family homes -- more than all other facility types combined")
- Total bed count per type
- Average facility size (beds) per type -- highlights the AF (2-6) vs BH (median 64) contrast
- Geographic distribution -- which types concentrate in urban vs rural counties
- County-level density comparisons (facilities per capita or per senior population)
- Google rating averages by facility type -- do smaller AF homes rate higher than large BH communities?
- Bed count distribution within BH (6-bed homes vs 188-bed communities sharing the same license type)
- Number of facilities with dementia/mental health/DD specialties by type
