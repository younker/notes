# POI Rename and Filtering

## Problem

Multiple issues with the "Location" / points of interest data:

### 1. Naming confusion

The system calls this data "Location" in many places, but it's really "Points of Interest" (POI). The label should be updated to reflect what the data actually represents.

### 2. Inaccurate location types

POI categories/types are often wrong. Example: facility 70ffad5c-df38-4074-99c3-4d89a654bf7f ("Landmark Assisted Living") shows as category "Hospital" and type "Hospital", but it's an assisted living facility. Google shows it as "Nursing home". We need to investigate why the collected type differs from what Google itself shows.

### 3. Irrelevant results not filtered

Health spas show up as hospitals. Multiple medical centers appear when only one is needed. No prioritization exists between actual hospitals vs urgent care centers vs other medical facilities.

## Investigation

- Audit all distinct hospital/medical types collected across King and Yakima counties
- Categorize each type: keep as-is, limit count, or filter out entirely
- Determine filtering rules: e.g., keep all actual hospitals, limit urgent care to 1, remove health spas
- Investigate why Google Places API returns incorrect types for some facilities
- Inventory all places in the codebase that use "Location" where "POI" would be more accurate

## Goal

- Rename "Location" to "POI" (or similar) where appropriate
- Filter POI results to only include relevant entries
- Prioritize actual hospitals over secondary care facilities
- Limit secondary care categories to 1 result each
