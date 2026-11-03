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
