---
'@xaui/core': patch
'@xaui/native': patch
---

Fix AppBar theme-color surface behavior and improve AppBar documentation previews.

- ensure `secondary` theme background uses its own neutral token in core colors
- update AppBar slot alignment API by using `alignment` on `AppBarContent`
- refine floating AppBar width behavior to fill available space with a 97% max width
- add AppBar screenshot previews in docs using assets from `apps/docs/public/screenshots`
