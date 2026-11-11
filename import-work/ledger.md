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
