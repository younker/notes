# Search Filters: Facility Type and Bed Count

## Summary

Add filtering controls to both the homepage search dropdown and the /search results page. Users should be able to narrow results by facility type and bed count.

## Requirements

### Facility Type Filter
- Dropdown that lists all known facility types (Adult Family Home, Assisted Living Facility, Enhanced Services Facility, etc.)
- Multi-select: users can pick more than one type
- Default: "All" (no filter applied)

### Bed Count Filter
- Operator dropdown: `>`, `>=`, `<`, `<=`, `=`
- Numeric input for the bed count threshold
- Default: `>=` and `20`

### Layout
- Homepage: small dropdown boxes below the search bar, centered under the text input
- /search results page: same filter controls, applied to server-side or client-side filtering

### Implementation Notes
- The PublicFacilityListItem already includes `bed_count` (licensed_bed_count) and facility type can be derived or added to the API response
- Facility type is not currently in the public facilities list API response -- will need to add it
- Client-side filtering is sufficient for the dropdown (data is already loaded); the /search results page may need server-side support depending on dataset size
