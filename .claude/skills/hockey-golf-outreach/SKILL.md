---
name: hockey-golf-outreach
description: Fill Traverse Connect (Traverse City chamber) member contact forms to solicit donations/sponsorships for the TC North Stars 14U AA golf fundraiser. Generates a per-business email body from the golf-outing facts, then drives Chromium to fill each form and pause at the reCAPTCHA for the human to proofread and send. Use when the user wants to do chamber-directory outreach, "run the golf outreach", or process a batch of member listings.
---

# Hockey Golf Outreach

Batch-fills the Traverse Connect member "Send Email" contact form for the
[[Golf Outing Fundraiser]] (TC North Stars 14U AA). A human solves the reCAPTCHA
and clicks Submit; everything else is automated.

## How the site works (verified)

- Member page URL: `https://business.traverseconnect.com/list/member/<slug>-<cardId>`
- The "Send Email" link (`#gz-directory-contactmember`) POSTs a hidden form
  (`targets=<cardId>`, `command=addSingleMember`) to `/inforeq/contactmembers`,
  which opens the real contact form in a NEW TAB. A plain GET of that URL 404s.
- Contact form fields: `Name, Organization, Street, POBox, City, StateProvince,
  ZipPostal, Phone, Fax, Email, AlternateEmail, ContactPreference (1=Email,
  3=Phone, 4=Mail, 2=Fax), CarbonCopy (checkbox), Subject, Message`, plus a
  Google reCAPTCHA v2 checkbox and a Submit button.

## Fixed sender info

Lives in `config.json` (Jason Younker / GTHA, address, phone, email, preference
= Email, carbon-copy = on). Subject defaults to "TC North Stars annual golf
tournament". Edit `config.json` to change any of it.

## Workflow

1. **Collect targets.** Get the list of member-listing URLs the user wants to
   contact (they paste them, or point at a note). Each needs a `url`; a `name`
   and `type` help write a better message.

2. **Generate the message per business.** Build each `message` from the
   `email-template.md` in this folder, using the facts in
   `[[Golf Outing Fundraiser]]` and the tone of `[[Call Script - Generic]]`.
   Customize only the opening hook line to the business/type (e.g. a restaurant
   families frequent, an auto dealer, a bank with a community-giving program).
   Keep the sponsorship tiers, deadline (Aug 3, 2026), 501(c)(3)/EIN, and
   payment lines intact. Do NOT invent facts.

3. **Write `queue.json`** in this folder:
   ```json
   {
     "subject": "TC North Stars annual golf tournament",
     "targets": [
       { "url": "https://business.traverseconnect.com/list/member/<slug>-<id>",
         "name": "Business Name", "type": "Restaurant",
         "message": "Hello,\n\n..." }
     ]
   }
   ```

4. **Run it.** First run only: `npm install` here (Chromium is already cached).
   Then `node send.mjs` (or `node send.mjs path/to/queue.json`). A maximized
   Chromium window opens; for each business it fills the form and stops. The
   user: solves reCAPTCHA -> proofreads -> clicks Submit. It auto-advances to
   the next business on submit; press Enter in the terminal to skip one.

5. **Log outcomes.** Results append to `outcomes.log`. Afterward, update
   [[Golf Outing Donor List]] with who was contacted.

## Notes

- `queue.json`, `outcomes.log`, `node_modules/`, and the browser `.profile` are
  gitignored (kept out of the vault graph).
- reCAPTCHA is intentionally NOT bypassed — a human must clear it and send.
