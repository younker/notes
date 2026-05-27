# Operator Resolution Coverage Gaps

**Surfaced:** 2026-04-11 during an end-to-end test loop across four BH facilities (Wallingford, Merrill Gardens Ballard, Aegis Issaquah, Bonaventure Maple Valley). Two code fixes landed during that loop (see "Already fixed" below). This file tracks the four remaining gaps that kept the flow from being hands-off.

## Context

The v3.9 Operator Capability milestone shipped the full pipeline:

```
populate-dshs ─┐
                ├─► wa.operators ─► resolve-sos ─► wa.business_entities
populate-cms ──┘        │                               │
                        ├─► wa.facilities.operator_id   │
                        │                               │
                        └─► scoring aggregator ─► operator_score ─► public API ─► ship-ui
```

During the test loop all four test facilities ended up fully populated end-to-end:

| Facility | Locality | HQ City |
|---|---|---|
| University House at Wallingford (1170) | in_city | Seattle |
| Merrill Gardens at Ballard (2507) | in_city | Seattle |
| Aegis of Issaquah (1997) | in_state | Bellevue |
| Bonaventure of Maple Valley (2694) | in_city | Maple Valley |

But reaching that state required four interventions that a future operator-capability pass should not need. Each is captured below with its reproducer, root cause, and the proposed fix.

## Already fixed (for cross-reference)

These two bugs were fixed inline during the test loop and should NOT be re-done as backlog items:

- **`6a4cc4a` fix(operatorresolver): handle CCFS principal_office shape** — `ParsePrincipalOffice` now handles `"600 UNIVERSITY ST, SUITE 1020, SEATTLE, WA, 98101-1176, UNITED STATES"` (comma between state and zip, trailing country phrase).
- **`e8ebce8` fix(ownership): drop merged_into filter from GetFacilityForSOS** — `--facility` mode no longer excludes property_owners rows that are merged into a canonical sibling.

## Gap 1 — Assessor scraper truncates `taxpayer_name`

**Severity:** High (blocks every large-chain facility from auto-resolving via the property-owner path)

**Reproducer:**

```sql
SELECT facility_id, taxpayer_name, raw_response->>'taxpayer' AS raw_tax
FROM wa.property_owners
WHERE facility_id IN (
  'adbfe5b8-f2dc-4af2-9928-2efb220b4e53',   -- University House at Wallingford
  'c77c2030-9b50-4890-a066-9b429ccaa59b'    -- Merrill Gardens at Ballard
);
```

Observed values:

| Facility | Stored `taxpayer_name` | Length | Truth |
|---|---|---|---|
| University House at Wallingford | `UNIVERSITY HOUSE AT` | 19 | `UNIVERSITY HOUSE AT WALLINGFORD LLC` |
| Merrill Gardens at Ballard | `R D MERRILL AT BALLARD I LL` | 27 | `R D MERRILL AT BALLARD I LLC` (or similar) |

Both `raw_response.taxpayer` JSONB fields also carry the truncated value, so the truncation happens at scrape time, not at insert time. The column itself is `VARCHAR(255)`, so the DB is not the clipper.

**Root cause (suspected, not yet verified):**
The King County assessor scraper (likely in `ship/agents/pkg/assessor/...` or wherever `property_owners` rows are written from `blue.kingcounty.com/Assessor/eRealProperty/Dashboard.aspx?ParcelNbr=...`) reads a fixed-width field from the HTML/PDF and cuts off at some lengths. The two truncation points (19 and 27 chars) suggest either an HTML `title` or a DOM text node that's capped by the source page's display layout. Spot-check the scraper's parse path before writing any code.

**Fix:**
1. Find the assessor parser that writes `taxpayer_name` (grep for `taxpayer_name` in `ship/agents/pkg/assessor` and any worker under `ship/cmd/ship`).
2. Capture an HTML fixture for King County parcel `7821200620` (Wallingford) and verify where the truncation happens — is the source HTML itself truncated, or is the parser reading only a prefix?
3. If the source provides the full name in a different field (likely — assessor pages usually have a separate "Current Owner" table row that isn't clipped), update the parser to prefer that field.
4. Backfill: re-run the scraper with `--force` on all existing `property_owners` rows where `length(taxpayer_name) < some-threshold`. Or add a one-shot CLI that walks `property_owners` and re-scrapes.

**Impact once fixed:**
Every subsequent `ship ownership entities` run will hit CCFS with the full legal name and match cleanly, removing the manual `UPDATE wa.property_owners SET taxpayer_name = ...` step that tonight's test loop required.

**Test loop workaround:**
Manually rewrote `taxpayer_name` in `wa.property_owners` to the full legal name before each `ship ownership entities --facility <uuid>` run, then reverted (where necessary) after collection succeeded.

## Gap 2 — Taxpayer is not the operator (architectural gap)

**Severity:** High (the root cause of why the v3.9 operator pipeline is not hands-off)

**Reproducer:**

For every chain-operated facility in WA, the `property_owners.taxpayer_name` is the REAL-ESTATE holding entity, not the DSHS licensee / CMS managing entity. Examples observed during the test loop:

| Facility | Taxpayer (property owner) | Operator (DSHS licensee) |
|---|---|---|
| Merrill Gardens at Ballard | `R D MERRILL AT BALLARD I LLC` | `Merrill Gardens at Ballard LLC` |
| Aegis of Issaquah | `JUNIPER STREET - ISSAQUAH LLC` (raw_response) | `Aegis Senior Communities LLC` |
| Fieldstone OrchardWest | `Csl Yakima Wa Landlord LLC` | (no DSHS PDFs — see Gap 4) |

These are legally distinct entities. The property LLC owns the building; the operator LLC runs the assisted-living business inside it. They file separately with the WA Secretary of State.

**Why this blocks the pipeline:**

`ship ownership entities` is the ONLY path today that populates `wa.business_entities`. It walks `wa.property_owners.taxpayer_name` and searches CCFS by that name. `ship operators resolve-sos` then matches `wa.operators.canonical_name` against `wa.business_entities.business_name` — but because `business_entities` only contains property owners (never operators), there's nothing for the operator resolver to match against. Every non-owner-operator facility falls out at resolve-sos with `skip: no SOS match`.

**Observation that confirms the gap:**
Bonaventure of Maple Valley is the ONE facility in the test loop where the property owner and the operator happen to be the same legal entity (`Bonaventure of Maple Valley LLC` on both sides). It was the only one where the flow could have worked without intervention — and even it needed Gap 1's truncation workaround to get there. Every other facility required rewriting `taxpayer_name` to the operator's canonical name before running `ownership entities`.

**Fix — new operator-driven SOS collector:**

Add a new CLI command and collector that is OPERATOR-driven, not property-owner-driven:

```
ship operators resolve-sos-from-ccfs [--operator <uuid>] [--facility <uuid>] [--limit N] [--dry-run] [--force]
```

Flow:

1. Query `wa.operators WHERE entity_id IS NULL` (same filter as the existing `resolve-sos`).
2. For each operator, call CCFS directly via the existing `sos.TokenClient.Search(ctx, operator.display_name)` — reusing the Turnstile-token-gated client from `ship/agents/pkg/sos/client.go`.
3. Apply the existing `sos.ExactMatch` fuzzy/fallback logic to pick the best WA-Active match.
4. Upsert the result into `wa.business_entities` (source tag `source = 'sos_search_operator'` so the origin is traceable — distinct from `'sos_search'` used by the property-owner collector).
5. Link the operator by setting `wa.operators.entity_id` directly — DO NOT write to `wa.facility_ownership` (that's the property-owner junction and has different semantics).
6. Optionally chain into the existing `ship operators resolve-sos` which then populates `hq_*` from the new `business_entities` row.

Or simpler: merge this into the existing `ship operators resolve-sos` command as a second-pass fallback — if no match is found via `MatchBusinessEntitiesByName` (the current ILIKE query on `wa.business_entities`), fall back to a live CCFS search by `display_name` and upsert the result before retrying the match.

**Design decisions to make during planning:**

- **Merge into `resolve-sos` or separate command?** A fallback inside `resolve-sos` is simpler for users but couples the DB-match and the CCFS-live-lookup into one operation. A separate command is more surgical but adds a step. Recommendation: fallback inside `resolve-sos` with a `--no-ccfs-fallback` opt-out flag for offline runs.
- **Rate limiting.** CCFS's Turnstile + 1-req-per-second constraint applies. For 500+ operators statewide this is ~10 minutes serial. Acceptable — match the existing `ownership entities --delay 1s --fuzz 2` pattern.
- **What to do with operators that STILL don't match?** Log them to a `skipped_no_ccfs` counter and keep `entity_id IS NULL`. Idempotent re-runs can retry later.
- **Conflicts.** If the operator's CCFS search returns a row whose canonicalized name DOES NOT equal the operator's canonical_name, the existing `ResolveSOS` rejection applies. No special handling needed.
- **Schema.** No migration. `wa.business_entities` already has `source` and `source_url` columns; the new collector just writes different values.

**Impact once fixed:**
Every successful `populate-dshs` or `populate-cms` run would chain cleanly into operator resolution without manual data intervention. The two-phase flow (`populate-* → resolve-sos`) becomes the real MVP for operator resolution that v3.9 was shooting for but didn't quite land.

**Related deferrals in REQUIREMENTS.md:**
API-03 (public OpenAPI spec) is a distinct v3.10 deferral. CMS-03 (CMS Ownership dataset) is deferred to v2 HIST-01. This gap is different — it's an OPERATIONAL gap, not a v2 feature.

**Test loop workaround:**
Rewrote `taxpayer_name` to the operator's canonical name before running `ownership entities --facility`, so the existing property-owner-driven collector would pull the right CCFS row. Unsustainable at scale.

## Gap 3 — DSHS parser fails on some inspection reports

**Severity:** Medium (existing tech debt from Phase 88, documented in 88-BUG-OPERATOR-COVERAGE.md and 92.1-SUMMARY.md)

**Reproducer:**

```bash
./bin/ship operators populate-dshs --facility 20af1074-eed9-420a-a8c5-ad2e8faea7ab --force
# Aegis Lodge of Kirkland, license 2492
# Result: skip: no licensee block, attempted=3
```

All three candidate PDFs (inspections, investigations, enforcement_actions) for license 2492 return `ErrNoLicenseeBlock` from `dshslicensee.ParseCoverPage`. The parser's anchor strings (`"Licensee:"`, `"Licensee Name:"`, `"Provider:"`) aren't present in those specific reports on the first 12 pages. Either the reports use a different anchor phrase, or the licensee block lives past page 12.

**Related prior work:**
Phase 92.1 fixed the whitelist bug and added candidate-iteration logic but explicitly kept the "parser must find at least one of three anchors within 12 pages" constraint. When all three candidates fail within that constraint, the facility falls through to `Skipped (parser)` in the per-run summary.

**Fix options (pick one in a follow-up phase):**

1. **Broaden anchor strings.** Inspect the three Aegis Lodge PDFs manually, identify the actual licensee anchor phrase used, and add it to the parser. Risk: unbounded growth of the anchor list.
2. **Increase the page scan window.** The 12-page limit is arbitrary. Some PDFs may put the Statement of Deficiencies (which carries the anchor) on page 15+. Bump to 30. Risk: minor parse-time increase on every PDF.
3. **Pre-filter by PDF metadata.** Only parse PDFs whose CreationDate is recent (skip scanned legacy reports that have no machine-readable text at all). Risk: misses facilities whose only reports are old scans.
4. **Fall back to regex-free anchor search.** Some DSHS reports have the licensee name in running text without an explicit anchor. Use a heuristic (e.g., "first ALL-CAPS line containing LLC/LP/INC on page 1") as a last-ditch attempt. Risk: higher false positive rate.

**Recommendation:** Try option 2 first (30-page scan window). It's the smallest change and catches any facility where the reports simply push deeper into the PDF. If Aegis Lodge still fails, proceed to option 1 after inspecting the actual PDFs.

**Reproducer URLs (captured from populate-dshs log):**
- `https://fortress.wa.gov/dshs/adsaapps/lookup/RCSForms/BH/2492/inspections/2024/R Aegis Lodge of Kirkland Inspection 11-27-2023 - bm.pdf`
- (plus 2 more — run populate-dshs with `--verbose` or check log in `attempted=3` path to get the full list)

**Test loop workaround:**
Skipped Aegis Lodge of Kirkland entirely and tested a different Aegis facility (Issaquah) that had parseable reports.

## Gap 4 — Some facilities have no DSHS PDFs at all

**Severity:** Low (legitimate data gap at DSHS, not a bug)

**Reproducer:**

```bash
curl -s "https://fortress.wa.gov/dshs/adsaapps/lookup/BHForms.aspx?lic=2404" | grep -i "RCSForms/BH/2404"
# returns nothing -- DSHS has zero PDFs for license 2404
```

`populate-dshs` correctly logs `skip: no inspection PDFs listed` and exits clean.

**Example facility:** Fieldstone OrchardWest (`3ff4ded1-5506-4d4e-ab4c-be64f61709e7`, license 2404, Grandview WA).

**Why this is not really a bug:**
Some smaller rural facilities genuinely have no inspection, investigation, or enforcement reports published by DSHS. This might be because:
- The facility is newly licensed and hasn't had its first 18-month inspection yet
- DSHS hasn't digitized older reports
- DSHS pruned expired reports

None of these can be fixed by the SHIP codebase. The `populate-dshs` command does the right thing (skip with a clear log line).

**Fix — fall back to CMS for SNFs; do nothing for pure ALFs:**

1. **If the facility is a SNF** (DOH-regulated, not DSHS), it should never have been enqueued for `populate-dshs` in the first place. Check that `ListFacilitiesNeedingLicensee` filters on `facility_type='BH'` (it does, per Phase 88 SUMMARY). Fieldstone is BH in the test DB, so this filter did the right thing.
2. **If the facility is a BH ALF with no reports**, accept the gap. `operator_id` stays null, the facility renders without an operator card in ship-ui, and its operator_score is nil (composite re-weights per SCO-05 — no penalty).
3. **Future enhancement:** build a secondary operator-lookup path by other means (e.g., CMS dataset cross-reference, manual curator list, AFPM data) for the subset of ALFs with no DSHS reports. Out of scope for v3.10 scope discussions but worth a line in v4+ planning.

**Test loop workaround:**
Picked a different BH facility (Merrill Gardens at Ballard) that had DSHS reports.

## Suggested phasing

| Gap | Phase | Type | Effort |
|---|---|---|---|
| 1. Assessor taxpayer truncation | New v3.10 fix phase or insert as 92.2 | Bug fix | Low — single scraper file, one-shot backfill CLI |
| 2. Operator-driven SOS collector | v3.10 — this is the marquee item | Feature | Medium — one new collector command, one fallback path inside resolve-sos |
| 3. DSHS parser anchor coverage | v3.10 tech debt or separate 88.2 | Bug fix | Low-medium — depends on option chosen |
| 4. No-DSHS-reports fallback | v4+ backlog | Feature | Out of scope |

**Critical path for a v3.10 that actually delivers "operator info for every new facility":** Gap 1 + Gap 2. Those two unblock the hands-off flow for every chain-operated ALF in the state. Gap 3 is a tail-case cleanup. Gap 4 is inherent data scarcity.

## Estimated effort

- Gap 1: 2-4 hours (scraper inspection, parser tweak, backfill CLI, re-run against fixture).
- Gap 2: 1-2 days (new collector, test coverage, fallback wiring in resolve-sos, CCFS rate-limiting validation).
- Gap 3: 2-4 hours (page-window bump or anchor-list extension + test coverage).
- Gap 4: N/A (backlog).

## Cross-references

- `.planning/milestones/v3.9-REQUIREMENTS.md` — v3.9 traceability (API-03, CMS-03 deferred; LIC-03/04 closed by 92.1)
- `.planning/milestones/v3.9-MILESTONE-AUDIT.md` — passed audit; noted zero VERIFICATION.md intentional
- `.planning/phases/88-operator-schema-and-dshs-licensee-parser/88-BUG-OPERATOR-COVERAGE.md` — historical coverage bug report
- `.planning/phases/92.1-dshs-operator-coverage-fix/92.1-01-SUMMARY.md` — prior gap closure (category whitelist + candidate iteration)
- `ship/agents/pkg/sos/client.go` — CCFS client with Turnstile token management (reuse for Gap 2)
- `ship/agents/pkg/sos/collector.go` — property-owner-driven collector (reference pattern for Gap 2)
- `ship/agents/pkg/operatorresolver/resolver.go` — where Gap 2's fallback lookup should land if we merge into resolve-sos
- Test loop artifact: see ship git log commits `6a4cc4a` (parser fix) and `e8ebce8` (merged_into filter) for the two inline fixes

## Reproducer data state

After the test loop, these four facilities are fully populated end-to-end and can be used as regression fixtures:

| Facility ID | Name | Notes |
|---|---|---|
| `adbfe5b8-f2dc-4af2-9928-2efb220b4e53` | University House at Wallingford | taxpayer_name was rewritten (Gap 1 workaround) — still reads `UNIVERSITY HOUSE AT WALLINGFORD LLC` in the test DB |
| `c77c2030-9b50-4890-a066-9b429ccaa59b` | Merrill Gardens at Ballard | taxpayer_name was restored to `R D MERRILL AT BALLARD I LLC` after collection |
| `55a611ca-ff99-44d4-aa24-4b7371bc5427` | AEGIS OF ISSAQUAH | taxpayer_name was restored from `raw_response.taxpayer` |
| `bf521a40-ff9e-45a3-96f6-4c9f69a9e55d` | Bonaventure of Maple Valley | No rewrite needed — property owner happens to equal operator |

If a future phase re-runs the pipeline against these facilities, the `resolve-sos` step should succeed without intervention. If it doesn't, start the investigation with `wa.business_entities` — the CCFS search results from tonight's run are already in the DB and `resolve-sos` is idempotent.
