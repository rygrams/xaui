---
'@xaui/native': patch
---

`Stack` and `Grid` join the layout lot

**`Stack`** overlays. The root is the containing block (`position: relative`) and
`Stack.Item` is a layer taken out of the flow (`position: absolute`); where a layer sits is
R14 — `top`, `bottom`, `start`, `end`, `zIndex`. The first child stays in the flow and gives
the stack its size. Overlaying is composed rather than inferred: a stack that positioned
every child but the first would have to guess which one sets the size, and would change
meaning the day a caller reordered them.

**`Grid`** lays out a fixed number of columns, wrapping, and **measures** its column width
rather than expressing it as a percentage. `width: '33.33%'` resolves against the content
box and knows nothing about the gaps, so three cells plus two gaps overflow their row. The
root reads its own width and publishes the exact column width; `Grid.Item span={n}` covers
several columns, gaps included. `gap` is the grid's own prop because the root has to read
it to size the cells.

`Container` and the remaining legacy `view/` entries are not planned: they are R14 or
`Stack`.
