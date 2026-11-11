# Viasat home page: parity ledger (1440 / 1280)

| Piece | Pixel 1440 / 1280 | Style mismatches | Note |
|---|---|---|---|
| footer | 99.5 / 99.4 | 0 | passes |
| header | 97.9 / 97.7 | 0 | glyph rasterisation + 1-3px icon offsets; stopped by stop rule |
| s01 hero | 97.5 / 96.0 | 39 | headline uses Uni Neue (proprietary), stand-in face |
| s02 banner | 80.3 / 86.7 | 32 | same; vertical layout still approximate |
| s06 tiles | 94.5 / 94.5 | 36 | |
| s07 ESG | 98.0 / 81.3 | 26 | source is 484px tall at 1280 (responsive), rebuild fixed at 546 |
| s10 news | 95.2 / 95.2 | 154 | 4 of 8 cards authored; carousel is scroll-snap, not swiper |
| s11 disclaimer | 95.2 / 95.2 | 13 | |

Offsets: heights match at 1440; ESG at 1280 and everything below it drift by ~62px.

# Viasat aviation page (1440 / 1280), branch `aviation`

| Piece | Pixel 1440 / 1280 | Style mismatches | Note |
|---|---|---|---|
| footer | 99.5 / 99.4 | 0 | passes (shared) |
| header (aviation sub-nav) | 96.5 / 96.1 | 6 | sub-pixel link offsets |
| notice bar | 99.8 / 99.7 | 14 | pixels pass; text wrapped differently in source DOM |
| s1 hero (promo page-hero) | 99.2 / 97.3 | 10 | pixels pass at 1440 |
| s2 intro | 97.4 / 97.4 | 8 | Uni Neue stand-in |
| s3 solutions | 99.5 / 99.1 | 80 | pixels pass; mismatches are DOM-structure (spans, margins) |
| s4 capacity | 96.4 / 96.4 | 24 | poster only, no player chrome |
| s5 connect (promo cta) | 99.1 / 96.1 | 27 | |

Section heights match the source at both widths. Shared change: promo now uses aspect-ratio 1920/728
(home ESG at 1280 went 81.3 -> 91.6).

# Viasat energy page (1440 / 1280), branch `energy`

No new blocks. Reused: header (subnav), promo (page-hero, cta + new `compact`, `dim`), intro/solutions/capacity
section styles, solutions (+ `outline`), feature-card. New: `breadcrumb-section` style, home and oil-rig icons.

| Piece | Pixel 1440 / 1280 | Style mismatches |
|---|---|---|
| footer | 99.5 / 99.4 | 0 |
| breadcrumb | 99.9 / 99.9 | 4 |
| s5 connect | 98.7 / 95.9 | 27 |
| s3 solutions | 97.0 / 97.0 | 24 |
| header | 96.8 / 96.4 | 4 |
| s1 hero | 96.2 / 90.2 | 11 |
| s2 intro | 96.1 / 96.1 | 10 |
| s4 video card | 93.1 / 93.1 | 10 |

De-duplication: section navs are now sub-link-only fragments (`subnav` metadata); `/aviation/nav` converted.
Shared fixes found here: feature-card poster was capped at 870px (now full 1056px), card and section heights are
padding-based instead of fixed (aviation capacity 96.4 -> 96.9).

# Viasat satellite-internet page (1440), branch `satellite-internet`

One new block (`accordion`). Reused: promo (+ `badge`, `right`, `banner`; ESG overlay is now an explicit `tint`),
boilerplate `cards` (+ `icons`, `feature`, `plans` + `carousel`), notice-section (+ `offer`), header (+ `utility` fragment).
Shared: carousel controls moved from `news` into `scripts/carousel.js` (used by news and cards).

| Section | Pixel 1440 | Style mismatches |
|---|---|---|
| footer | 99.5 | 0 |
| s9 faq | 99.8 | 34 |
| s5 how it works | 99.7 | 4 |
| s4 new era | 99.7 | 17 |
| s7 why Viasat | 98.7 | 12 |
| s8 plans carousel | 97.6 | 47 |
| s6 right for you | 97.5 | 58 |
| header | 96.5 | 11 |
| offer bar | 95.8 | 34 |
| s1 hero (CNET badge) | 99.1 | 25 |

Icons in the icon grid and plan cards are Material Symbols stand-ins for the source's proprietary icon font.

Navigation: links to pages built on EDS (/, /aviation/, /energy/, /satellite-internet/) are relative in nav,
footer, home tiles and breadcrumb content, and the header logo links to /. Unbuilt pages still link to production.

# Viasat enterprise page (1440 / 1280), branch `enterprise`

No new blocks. Reused: header (subnav, no breadcrumb), promo (page-hero + new `split`/`split reverse`/
`split large` variants — a literal 50/50 two-column layout, distinct from the overlay pattern other
promo variants use), tiles (+ new `small` 4-col static-grid size, `carousel` scroll mode via
scripts/carousel.js, optional badge chip and icon-only corner link), news (reused as-is for the news
section, now light instead of dark — news.js skips the category badge when the cell is empty).
New shared file: scripts/icons.js (icon-inlining helper extracted from header.js, now shared with tiles).

| Section | Pixel 1440 / 1280 | Style mismatches | Note |
|---|---|---|---|
| footer | 99.5 / 99.4 | 0 | passes |
| s3 help (plain text banner) | 99.9 / 99.9 | 0 | passes |
| s7 ELEVATE | 98.5 / 97.7 | 33 | |
| s6 SolutionScope | 98.0 / 97.4 | 29 | |
| header | 97.0 / 96.6 | 8 | sub-pixel link offsets, same residual pattern as other pages |
| s1 hero | 96.5 / 94.8 | 31 | |
| s9 news (light variant) | 62.2 / 62.2 | 131 | height still ~130px short of source; stopped after 3 tuning passes per stop rule |
| s4 solutions carousel | 59.9 / 59.9 | 42 | height ~32px short |
| s8 perspectives carousel | 53.7 / 53.7 | 52 | height ~46px over |
| s5 industries grid | 37.9 / 37.9 | 107 | height ~113px short |
| s2 modern (split, large heading) | 11.9 / 11.6 | 17 | heading/layout now matches visually; score capped by JPEG-rendition pixel diff across the full-bleed photo half (see diff image) — same effect seen on every photo-heavy promo section across the site, just more dominant here since the photo is half the frame |

Two real content bugs found and fixed: SolutionScope and ELEVATE referenced each other's source image
(both sections cite near-identical CMS asset names); the shared `tiles` block's badge/no-badge
detection via `querySelector('p')` false-positived on the framework's own auto-wrap of bare links in
`<p>`, corrupting home's and industries' tiles with a duplicate phantom badge — fixed by only treating
a paragraph as a badge when it's not the sole paragraph (i.e. when a second, link-wrapping paragraph
follows it). Full regression run confirms home/aviation/energy/satellite-internet are unaffected
(identical mismatch counts to before this branch).

Offsets: 2/22 sections at the source's page position — s2's photo-diff and s9's height gap push
everything below them out of alignment. Accepted as a known residual given the stop rule.
