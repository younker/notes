# Duplicate Facility Deduplication

## Problem

Facilities that get new licenses create duplicate entries. Example:

- Current: https://senioraiq.com/admin/wa/facilities/8496bc33-6d74-4935-8224-586e6887525d
- Previous: https://senioraiq.com/admin/wa/facilities/70ffad5c-df38-4074-99c3-4d89a654bf7f

These are the same physical facility but appear as two separate records. Collected data (regulatory, reviews, property, etc.) is split across both entries.

## Investigation

- What fields distinguish current vs previous license? (license number, dates, status?)
- How do we determine which facility record is "most current"?
- What data is attached to the old facility that would need to migrate to the current one? (regulatory reports, reviews, ownership, scores, POI data, etc.)
- How often do facilities get new licenses?
- Can we detect during DSHS collection when a new facility entry corresponds to an existing one?

## Goal

- Define a dedup strategy that identifies duplicate facilities and merges them under the most current license
- Migrate all associated data (regulatory, reviews, etc.) to the surviving record
- Update the collection process to recognize when a new facility entry matches an existing one, so it updates rather than creates
- This needs to be an ongoing process since new licenses will continue to be issued
