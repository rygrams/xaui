---
'@xaui/native': patch
---

feat(widget): a card with a well cut into it

`Widget` is the frame a figure, a table or a list is shown in: a header with a title and a
description, a recessed well for the thing itself, and a footer for when it was last
updated. The well's corner is derived from the card's — the outer radius less the padding
between them — so the arcs nest instead of reading as a sticker laid on the card.

`Chart.Legend` now works outside a `<Chart>`, which is what a widget's header needs: the
title and the legend sit above the well and the figure sits inside it.
