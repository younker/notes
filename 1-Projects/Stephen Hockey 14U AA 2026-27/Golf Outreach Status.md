---
date: 2026-07-10
type: status
team: 14U AA Traverse City (TC North Stars)
season: 2026-27
tags: [hockey]
---

# Golf Outreach — Status & How to Resume

Live status of the chamber-directory sponsorship outreach for the
[[Golf Outing Fundraiser|14UAA Golf Outing]]. Full send record is in
[[Golf Outing Donor List]] (Chamber Form Outreach section).

## Where things stand (as of 2026-07-10)

- **110 businesses emailed** via the Traverse Connect member "Send Email" form.
- **Rule now in force:** only Traverse City businesses (listing city = "Traverse
  City"). Out-of-town listings (Grawn, Williamsburg, Kalkaska, Petoskey, etc.)
  are skipped automatically.

### Open items to pick up first
- [ ] **Send Oleson's email** — direct email to info@olesonsfoods.com (their
  listing has no chamber form). Body is the standard one; open your mail client.
- [ ] **Email Manthei Supply** — skipped mid-batch 2026-07-10; do it. 📅 2026-07-11

## Category progress

| Category | Status |
|---|---|
| Home & Garden | DONE — every fresh TC listing with email contacted |
| Computers, IT & Technology | Mostly done — remaining: Kraft Business Systems, Copy Central, Snap! Printing, Infinity POS, Applied Innovation, Idea Stream, Flight Path Creative, The Quell Group |
| Business & Professional Services | 3 batches done (~45); large category (228), many mid-size TC locals remain |
| Finance & Insurance | 8 sent (credit unions + local agencies); more local agents/banks remain |
| Restaurants, Food & Beverages | 12 sent; many independent TC spots remain |
| Automotive, Aviation & Marine | Only Mercedes-Benz + Discount Tire sent; rest untouched |
| Event Services | Reviewed & SKIPPED — all nonprofits, no sponsor prospects |
| Construction/Contractors, Health Care, Shopping/Retail, Personal Services, Legal, Real Estate, Lodging, Advertising/Media, etc. | Not started — good sources for the next batches |

## How to resume (with Claude Code)

Just say: *"run the golf outreach — pull the next batch from <category URL>"* or
paste specific member URLs. Claude will vet for Traverse City + email, dedup
against what's already sent, generate the emails, and open the pre-filled forms.
You solve the reCAPTCHA, proofread, and click Submit; it auto-advances.

The tooling lives in `.claude/skills/hockey-golf-outreach/`:
- `SKILL.md` — the workflow
- `send.mjs` — batch runner (fills each form, pauses at reCAPTCHA)
- `vet.mjs` — checks a listing's city + email (`node vet.mjs <slug...>`)
- `gen-queue.mjs` + `email-template.md` — the standard email body
- `config.json` — your fixed sender info
- `outcomes.log` — raw per-send log (local only; donor list is the record)

Category listing URLs look like
`https://business.traverseconnect.com/list/ql/<name>-<id>` (find them at
business.traverseconnect.com/list).

## Known quirks

- **Skipped = logged as "submitted."** Closing a form tab reads as a submit in
  the log, so a business you skip still shows "submitted" in `outcomes.log`.
  Tell Claude which you skipped so the donor list stays accurate (as with Manthei).
- **No-email listings** can't use the form (no "Send Email" link) — needs a
  direct email (like Oleson's). `vet.mjs` flags these as `no-email`.
- **First run on a new machine** needs `npm install` in the skill folder
  (Playwright/Chromium aren't in git).
