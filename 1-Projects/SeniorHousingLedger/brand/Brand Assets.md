---
title: Brand Assets
project: SeniorHousingLedger
type: reference
created: 2026-09-21
tags: [seniorhousingledger, brand]
---

# Brand Assets

Logo package for [[SeniorHousingLedger]], delivered 2026-08-11. Wordmark reads **The Senior Housing Ledger** (the rename from SeniorAIQ).

## Mark

Circular ring with a 3x3 dot grid, center dot filled dark navy - a ledger/data-grid read. Wordmark set in a serif, stacked three lines, with a rule under "Ledger".

![[2026_Alien@2x.png]]

## Palette

| Role | Hex |
|------|-----|
| Navy (wordmark "The" / "Ledger", ring, center dot) | `#002f5b` |
| Teal-blue (disc, "Senior Housing") | `#006f94` |
| Green-teal accent | `#058887` |
| Knockout | `#ffffff` |

## Files

Source files ship under `brand/logo/`, original archive at `brand/logo.zip`. All named `2026_Alien` (vendor's internal project name, not the brand).

- Vector: `logo/SVG/2026_Alien.svg`, `logo/AI/2026_Alien.ai`, `logo/EPS/2026_Alien.eps`, `logo/PDF/2026_Alien.pdf`
- Raster: `logo/1x/`, `logo/2x/`, `logo/3x/` (PNG), `logo/1.5x/` (WebP), `logo/2x/2026_Alien@2x-100.jpg`

Use the SVG for web (ship-ui), the AI/EPS for print or anything a vendor needs to rescale.

## 2026-10 green refresh (proposed)

New logo files received 2026-10-01 (Illustrator, by Jonathan Mahurin). Same mark and wordmark, recolored from teal-blue to green + navy. Not yet on the site; the live site still uses the teal emblem.

![[tshl-logo-full-color@2x.png]]

![[tshl-logo-grn-wht-preview-navy.png]]

- **Full color** - for light backgrounds. Green "The Senior Housing", navy "Ledger", ring and rule.
- **grn-wht** - for dark backgrounds. "Ledger", rule and outer ring are white; the 8 grid dots are knockouts (show the background). Looks wrong on white.

| Role | Hex |
|------|-----|
| Navy | `#002f5b` |
| Green | `#1f7a4d` |
| Knockout | `#ffffff` |

Hex values come from the grn-wht PDF (RGB). The EPS files render slightly off (`#1e3057` / `#2b794a`), likely a CMYK conversion, so trust the PDF colors. The green matches the site's existing footer border.

Files under `brand/logo-2026-10/`:

- `source/` - `2026_TSHL_Logo_Full_Color.eps`, `2026_TSHL_Logo_grn-wht.eps`, `2026_TSHL_Logo_grn-wht.pdf` (originals; EPS won't open in macOS Preview, needs Illustrator or Ghostscript)
- `web/` - `tshl-logo-full-color.svg`, `tshl-logo-grn-wht.svg` (cropped to the artwork, ~19KB), plus `@2x` PNGs (880px wide) for email

Still needed: a full-color PDF, so the full-color SVG/PNG can be rebuilt with the RGB colors (current full-color web files come from the EPS).

## Open items

- Domain is still `senioraiq.com`. Decide whether the site moves to a Senior Housing Ledger domain, and whether the old one redirects.
- Blog drafts under `blog/` and [[AIQ-scoring-summary]] still carry the SeniorAIQ brand in body copy.

## Related

- [[SeniorHousingLedger]] - project hub
- [[Game Plan 2026]]
