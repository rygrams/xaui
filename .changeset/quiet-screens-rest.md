---
'@xaui/native': patch
---

feat(empty-state): what is on the screen when there is nothing on the screen

`EmptyState` is a header — a mark, a title, a sentence — and an optional row of actions, as
two roots rather than one column: the gap inside the block is not the gap above the buttons,
and two gaps need two roots (R4).

`plain` draws nothing and is the default, because most empty states fill a screen and a
screen already has a ground. `outlined` is the one that is not a fill: a dashed edge round
the space the content would occupy, which is what a drop target wants.
