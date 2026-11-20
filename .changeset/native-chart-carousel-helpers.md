---
'@xaui/native': patch
---

The charts' maths and the carousel's paging arithmetic move from the private `utils/` into `system/`, public from `@xaui/native/system`: `system/chart` holds `niceScale`, `linearScale`, `bandScale`, `pointScale`, `extent`, `linePath`, `areaPath`, `barPath`, `polygonPath`, `polarPoint`, `arcPath` and `chartPalette`, with the `Point`, `Span`, `Curve` and `Arc` types; `system/carousel` holds `carouselMetrics`, `trackIndexFromOffset`, `trackProgressFromOffset` and `stepIndex`. `@xaui/tram` reads them instead of restating them. The charts, the `Carousel` and the `Pager` behave as before. The square figures' geometry follows into `system/chart` — `pieSlices`, `radarWeb` and `radialRings`, with their `PieBox`, `RadarBox`, `RadarWeb`, `RadialBox`, `RadialRing` and `RadialGeometry` types — and the `PieChart`, `RadarChart` and `RadialChart` draw from it unchanged.
