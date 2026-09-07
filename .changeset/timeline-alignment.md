---
'@xaui/native': patch
---

`Timeline` — the row is built on one line

The dot, the time and the title were each placed by their own arithmetic, so none of them
met. Everything now hangs off a single number, `line` — the middle of the title's first line,
which is the height an entry reads at.

**The insets were written by hand and drifted.** `inset` was a per-size constant (5 / 7 / 9)
rather than the value it stands for, so the dot's centre landed at 13 against a line at 12 at
`md`, and at 17 against 14 at `lg`. `timelineInset(line, height)` derives it now, from the
title's own `lineHeight`, which means a theme that changes `lineHeights` keeps the column
together instead of pulling it apart.

**`Timeline.Leading` was never on the line at all.** A cell in a row stretches, and a
stretched `Text` draws at the top of it — so a time, set smaller than the title it labels, sat
four points above both the dot and the words. It takes the same line as the marker now: an
inset on a `start` entry, `alignSelf: 'center'` on a `center` one. It also sets
`fontVariant: ['tabular-nums']`, because right-aligning proportional figures still leaves
`11:06` and `10:43` starting in different places, and times that each begin somewhere else
read ragged however straight their right edge is.

**An end segment is now drawn, just not painted.** `Timeline.Connector` returned `null` for
the last entry's lower half and a bare `View` for the first entry's upper half, and the
marker's place in a rail is decided by what is above and below it — so on `center` the first
dot jumped to the top of its entry and the last one fell to the bottom, an entry's height of
error. Only the colour goes now; the flex stays.

**`Timeline.Rail` takes `marker`** — how tall the marker it carries is, when it is not the
dot. The upper half of the line is a height, and the only height a rail can work out on its
own is the dot's, so a rail told nothing places a 28pt circled icon eight points below the
title. The number is republished into the context rather than passed to the connectors, which
are children the rail does not own (R1). It stays out of the recipe's selection, so it cannot
reach the style cache.

**The rail's column is a `minWidth` and the entry is a row with a `gap`.** A composed marker
wider than the dot used to spill out of a fixed 24pt column and land on the words; the three
columns had no gutter between them at all. The gutter cannot be padding inside the rail — the
rail's own slack is what centres the line in it, so widening it moves the line rather than the
text.
