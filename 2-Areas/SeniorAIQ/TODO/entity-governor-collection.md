# Governor Collection from WA SOS

## Context

v3.4 (Business Entity Collection) collects business entity data from WA Secretary of State CCFS, storing UBI, incorporation date, principal office address, jurisdiction, business type, and status. This populates `wa.business_entities` and activates the leadership calculator's stability and locality sub-scores.

Governor data is available from the same CCFS system but requires a separate API call per entity. This document captures the plan for collecting that data in a future milestone.

## What Are Governors

WA SOS uses "governor" as a generic term for the people who control a business entity. Depending on entity type:
- LLC: members/managers
- Corporation: directors/officers
- Nonprofit: board members

Reference: https://www.sos.wa.gov/corporations-charities/frequently-asked-questions-faqs/governorsofficersdirectorsmembersmanagers

## Data Source

**Endpoint:** GET `https://ccfs-api.prod.sos.wa.gov/api/BusinessSearch/BusinessInformation?businessID={id}`

Requires Cloudflare Turnstile token in `X-reCAPTCHA` header (same as stage 1 entity collection).

**Response shape (PrincipalsList array):**
```json
{
  "PrincipalsList": [
    {
      "PrincipalID": 3895192,
      "FirstName": "LAURENCE",
      "LastName": "GOTTLIEB",
      "Title": "",
      "Name": "",
      "TypeID": "I",
      "PrincipalBaseType": "GoverningPerson",
      "BusinessID": 1572147,
      "PrincipalStreetAddress": {
        "FullAddress": "",
        "StreetAddress1": "",
        "City": "",
        "State": "",
        "Country": "USA",
        "Zip5": ""
      }
    }
  ]
}
```

Key fields per governor:
- `PrincipalID` -- unique ID within CCFS
- `FirstName`, `LastName` -- individual governors
- `Name` -- entity name (when TypeID is not "I", e.g., a corporate governor)
- `TypeID` -- "I" = Individual, others TBD (likely "E" for entity)
- `PrincipalBaseType` -- "GoverningPerson"
- `Title` -- role title if provided
- Address fields (often empty for individuals)

## Prerequisites

- v3.4 must be complete: `wa.business_entities` populated with `business_id` (CCFS internal ID) stored per entity
- The `business_id` column may need to be added to `wa.business_entities` schema during v3.4 if not already present -- this is the key for the detail API call

## Schema Changes

New table needed:

```sql
CREATE TABLE wa.business_governors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_entity_id UUID NOT NULL REFERENCES wa.business_entities(id),
    principal_id INTEGER NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    entity_name VARCHAR(255),
    title VARCHAR(100),
    type_id VARCHAR(10) NOT NULL,
    principal_base_type VARCHAR(50) NOT NULL,
    collected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(business_entity_id, principal_id)
);
```

A governor can appear across multiple entities (one person governing multiple LLCs). The `principal_id` is unique per governor-entity relationship within CCFS.

## Collection Flow

1. Query `wa.business_entities` for entities that have a `business_id` but no governors collected yet
2. For each entity:
   a. GET `BusinessInformation?businessID={business_id}` with Turnstile token
   b. Extract `PrincipalsList` array
   c. Upsert each governor into `wa.business_governors`
3. Rate limit: 1 req/sec with token refresh every 4 minutes (same as entity collection)

## CLI Command

```
ship ownership governors --county <county> [--dry-run] [--force] [--delay 1s] [--fuzz 2] [--verbose]
```

Matches existing CLI patterns. `--county` scopes to entities linked to facilities in that county.

## Value

- **Ownership graph:** Governor search on CCFS reveals all entities a person controls. One governor (e.g., "RAPHAEL NGWARO") may govern multiple senior housing LLCs across different counties.
- **Cross-facility operator intelligence:** Connects facilities that share governors even when taxpayer names differ.
- **Future scoring input:** Governor count, governor overlap across facilities, individual vs entity governors could feed into brand/leadership scoring.

## Scope Boundaries

- Collect and store governors only -- no scoring changes in this milestone
- No recursive lookups (searching SOS by governor name to find their other entities)
- No governor-to-governor relationship mapping
- Recursive entity discovery via governor search is a separate future milestone

## Estimated Effort

Low-medium. The CCFS client and Turnstile token management will already exist from v3.4. This is a second API call using the same infrastructure, plus a new table and CLI subcommand.
