---
'@xaui/native': patch
---

Add `Fab.Menu` at `@xaui/native/fab`: a FAB that opens its two or three actions as separate pills. The trigger is never re-parented — it measures itself and the actions are anchored to that rectangle — so the FAB stays exactly where the layout put it, where the legacy `FabMenu` moved it into the portal's own corner.
