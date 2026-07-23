---
tags: [ship, frontend, backlog, re-skin]
created: 2026-07-14
status: open
---

# Re-skin Issues Backlog

Post-re-skin defects and missing behavior on the server-rendered Go frontend
(`web/` module — templ + HTMX + Tailwind, port 8090). Each item below is a
self-contained piece of work to be picked up one at a time. Related notes:
[[ship/README]], [[SeniorAIQ]].

All file paths are relative to `/Users/younker/projects/ship/`.

Facility type codes (from `web/pkg/view/models.go:144-155`, DB
`wa.facilities.facility_type`): `AF` = Adult family home, `BH` = Assisted
living, `SL` = Supported living. **There is no "Memory care" type in the data** —
see item 2 open question.

---

## 1. Search bar: Enter should go to a search results page — DONE (2026-07-14)

**Fix.** Wrapped `SearchBox()` in `<form method="get" action="/facilities/search">`;
made the Search button `type="submit"`; removed the `search` event from the
input's `hx-trigger` (now just `keyup changed delay:300ms`). Enter/button now
navigate full-page to `/facilities/search?q=...`, which `SearchFacilities`
already renders as a full page for non-HTMX requests. Keyup typeahead fragment
swap preserved. Verified on a clean instance: full-page GET returns `<html>` +
results; HX-Request returns the fragment only. Files: `web/templates/home.templ`,
regenerated `web/templates/home_templ.go`.

**Problem.** Typing in the search box shows a live typeahead list of matching
facilities (correct). Pressing **Enter** does nothing. Enter should navigate to a
full search results page for the query.

**Where.**
- Input/button: `web/templates/home.templ:38-59` (`SearchBox()`). Input is
  `name="q"`, `hx-get="/facilities/search"`, `hx-target="#search-results"`,
  `hx-trigger="keyup changed delay:300ms, search"`.
- Handler: `web/pkg/handlers/home.go:27-78` (`SearchFacilities`) — renders the
  `ResultsSection` fragment back into `#search-results` in place; single match
  issues `HX-Redirect`. There is **no dedicated full-page results route** today.
- Existing full-page browse pattern to mirror: `web/pkg/handlers/browse.go`
  (`browse()` renders `templates.BrowsePage`).

**Scope / acceptance.**
- Pressing Enter in the search input navigates the browser to a real results
  page (e.g. `GET /search?q=field`) rather than swapping a fragment in place.
- That page renders the same result cards as the current fragment, on a full
  page (reuse `ResultsSection` / `BrowsePage`).
- Live typeahead-as-you-type behavior is preserved (keyup still updates the
  in-place dropdown/list).
- The "Search" button and Enter land on the same results page.

**Notes / decisions.**
- The `type="search"` input's native `search` event fires on Enter, currently
  wired to the same in-place `hx-get`. Simplest fix: wrap the input in a real
  `<form action="/search" method="get">` so Enter does a normal navigation,
  while keeping `hx-get` on keyup for the typeahead. Confirm this doesn't
  double-fire.

---

## 2. Type filter buttons are inert (multi-select, inclusive)

**Problem.** The buttons above results — **All types**, **Assisted living**,
**Memory care**, **Adult family homes** — are visual-only and do nothing.

**Where.**
- Buttons: `web/templates/search.templ:23-35` (`TypeTabs()` / `typeTab()`).
  Comment on line 23 literally says "visual-only placeholders (server-side
  filtering is a follow-up)". "All types" is hardcoded active.
- Cards already carry `data-facility-type={c.TypeCode}` at
  `web/templates/search.templ:48` (currently unused client-side).
- Filter plumbing exists: `facility.Filter{TypeSlug: ...}` used by
  `web/pkg/handlers/browse.go:31-34` (`BrowseType`). Note `TypeSlug` is
  **single-valued** today — multi-select needs a list.

**Desired behavior (from spec).**
- Buttons are clickable and filter the results below dynamically.
- Selection is **inclusive / multi-select**: clicking "Assisted living" then
  "Memory care" shows both.
- "All types" is a reset: selecting it clears all other selections and selects
  only "All types".
- Selecting any specific type de-selects "All types".
- If the last specific type is de-selected, fall back to "All types" selected.
- Default state: "All types" selected.
- Each click re-filters results dynamically (HTMX swap of the results grid, or
  client-side filter on the `data-facility-type` attribute).

**Open question — Memory care (BLOCKER for that button).**
- There is no `memory care` value in `wa.facilities.facility_type` (only `AF`,
  `BH`, `SL`). Decide: is memory care a subtype of `BH`, a separate flag/column,
  or should the button be dropped until the data supports it? Resolve before
  wiring the "Memory care" button. The other three buttons can ship without this.

**Scope / acceptance.**
- Clicking type buttons toggles them per the inclusive rules above.
- Results below reflect the union of selected types, updating on each click.
- Filtering approach (server HTMX swap vs. client-side show/hide on
  `data-facility-type`) chosen and applied consistently on both the homepage
  results and the browse/search results page.

---

## 3. Facility "Save" button — hide for anonymous users

**Problem.** The **Save** button on the facility detail page does nothing.

**Where.**
- Button: `web/templates/facility.templ:71` — inert `<a href="#">Save</a>`.
- Handler: `web/pkg/handlers/facility.go:17-56` (`FacilityProfile`); already
  calls `currentUser()` at line 52 (only checks `IsAdmin` today).
- Auth: `web/pkg/handlers/auth.go:38-44` (`currentUser`) reads the
  `ship_auth_token` cookie → `auth.Service.Session()`
  (`web/pkg/auth/auth.go:119-129`), returns `auth.User`. Anonymous = error.

**Research (do first).** Can we save a list for a user who is **not** logged in
(e.g. anonymous/local persistence, cookie or localStorage list that later merges
into an account)? Document the finding. This decides whether the button ever
shows for anon users.

**Scope / acceptance (interim, until research says otherwise).**
- Pass the logged-in/anonymous state into the facility template.
- Show the Save button **only** when a valid user session exists; hide it for
  anonymous users.
- No behavior change to the button itself yet — that is item 4.

**Depends on / links.** Feeds [[#4. Logged-in Save → persisted favorites]].

---

## 4. Logged-in Save → persisted favorites ("My favorites")

**Problem.** For logged-in users the Save button must persist the facility to
that user's favorites, survive across browsers/sessions, and surface in a
"My favorites" list.

**Where / what's missing.**
- No favorites concept exists anywhere (searched `web/`, `db/`, `api/`).
- User + session schema: `db/migrations/000006_users_otp.up.sql` (`users`,
  `sessions`), `is_admin` in `000011_admin_role.up.sql`.
- Next migration number is **000052** (latest is
  `db/migrations/000051_proximity_drive_time.up.sql`).
- Facilities: `wa.facilities.id` UUID (`db/migrations/000001_core_schema.up.sql`).

**Scope / acceptance.**
- New migration `000052_user_saved_facilities.{up,down}.sql`:
  `user_saved_facilities(user_id FK users, facility_id FK wa.facilities,
  created_at)`, unique on `(user_id, facility_id)`.
- Regenerate sqlc (`make db-sqlc`) — do not hand-edit generated files.
- POST endpoint (e.g. `/facilities/{id}/save` + unsave/toggle), guarded by a
  valid session; wire the Save button to it via HTMX.
- Save button reflects saved state (saved vs. not) on the facility page.
- A "My favorites" list view for the logged-in user showing saved facilities.
- Persistence verified across sessions/browsers (server-side, not cookie-only).

**Depends on.** Item 3 (logged-in gating) and the item 3 research on anon saving
(determines whether anon lists merge into the account on login).

---

## 5. Facility "Export PDF" button — generate + notify

**Problem.** The **Export PDF** button on the facility detail page does nothing.
Exporting is expected to take time.

**Where.**
- Button: `web/templates/facility.templ:72` — inert `<a href="#">Export PDF</a>`.
- No PDF generation anywhere in the repo (no Go PDF lib, no wkhtmltopdf, no
  endpoint). Existing PDF references are unrelated (DSHS inspection PDFs pulled
  by the CLI into S3).

**Research (do first).**
- PDF generation approach: render the templ page to PDF. Options to evaluate —
  headless Chromium (chromedp / rod) rendering the existing HTML, wkhtmltopdf,
  or a Go-native lib (gofpdf/maroto). Headless-Chrome-of-the-existing-page keeps
  visual parity with the re-skin; note the collector EC2 already needs Chromium
  ([[project_collector_ec2_chromium]] equivalent).
- **Async notification (the key open question):** exporting is slow, so how is
  the user told it's done? Evaluate: (a) synchronous with a "Working…" button
  state and streamed file download when ready; (b) background job + poll
  (HTMX polling an endpoint that returns "ready" + download link); (c) email the
  PDF/link when complete. Pick one and document why.

**Scope / acceptance.**
- Clicking Export PDF flips the button to a "Working…" / disabled state.
- A PDF of the facility page is generated server-side.
- User is notified/handed the file per the chosen mechanism above.
- Button returns to its normal state after completion or failure (with an error
  path).

---

## Suggested order

1. **Item 1** (search Enter) — small, self-contained, high visibility.
2. **Item 2** (type filters) — resolve the Memory-care data question first.
3. **Item 3** (hide Save for anon) — quick, unblocks item 4.
4. **Item 4** (favorites persistence) — migration + endpoint + list.
5. **Item 5** (PDF export) — largest; research spike before building.
