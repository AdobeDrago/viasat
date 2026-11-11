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
