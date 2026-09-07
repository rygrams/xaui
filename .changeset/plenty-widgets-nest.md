---
'@xaui/native': patch
---

feat(widget): a card held in a soft frame

`Widget` is the frame a figure, a table or a list is shown in: a quiet `defaultSoft` ground
with the header and footer sitting straight on it, one raised `surface` card for the thing
itself, and a footer line for when it was last updated. It has **one look** — no `variant`,
no primary/secondary/tertiary. `size` moves the padding, the gaps and the corner; `radius`
moves the frame's corner; `isElevated` (on by default) lifts the card off the frame.

The card's corner is derived from the frame's — the outer radius less the padding between
them — so the arcs nest instead of reading as a sticker laid on the frame.

`Chart.Legend` now works outside a `<Chart>`, which is what a widget's header needs: the
title and the legend sit above the card and the figure sits inside it.
