# Facility and Entity Name Cleanup

## Problem

Many facility, owner, and operator names have formatting issues from the source data. Examples:

- `"A Safe Haven" Senior Care LLC` -- stray quotes around partial name
- `"1st Care AFH LLC` -- opening quote with no closing quote
- `!1ST FAMILY HOME AFH LLC` -- leading punctuation, ALL CAPS
- `@ DASH POINT CARE AFH, LLC` -- leading "@" symbol, ALL CAPS
- `***** Living At Lake Meridian AFH` -- leading asterisks, inconsistent capitalization ("At" should be "at")

## Investigation

- How widespread is the problem? Run a query to find names with leading special characters, ALL CAPS, stray quotes, etc.
- Where does this data originate? (DSHS data, assessor data, or both?)
- Should cleanup happen at collection time, as a post-processing step, or both?
- What are the capitalization rules? Title case with lowercase articles/prepositions (a, an, the, at, of, etc.)?
- Should we preserve a raw name and store a cleaned display name separately?

## Goal

Build a name normalization routine that:
- Strips leading/trailing special characters (!, @, *, quotes)
- Fixes unmatched quotes
- Converts ALL CAPS to title case with proper handling of articles/prepositions
- Applies consistently to facility names, owner names, and operator names
