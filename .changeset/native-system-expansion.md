---
'@xaui/native': patch
---

`system/` gains `expansion/` — `nextExpansion` and `isExpandedIn`, the `Accordion`'s single/multiple selection rule, pure, on `@xaui/native/system` so `@xaui/tram` reads the same rule instead of restating it. The `Accordion` itself now reads it from there; its behaviour is unchanged.
