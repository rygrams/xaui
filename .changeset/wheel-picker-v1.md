---
'@xaui/native': patch
---

feat(wheel-picker): a column of options you turn, and the one at the middle is the answer

P5.25b, and it comes before the three pickers that need it: `WheelDatePicker`,
`WheelTimePicker` and `WheelDateTimePicker` are all this component with a different set of
columns and the arithmetic to fill them.

**The column has the value, not the wheel.** A time is two columns and a date is three, so a
wheel with a single value would be a wheel that can only ever be one of them.

**The scroll is the control.** There is no press to select: the row at the middle _is_ the
choice, so a column snaps to a row and reports whichever one it stopped at. That is what
makes this a wheel rather than a short list, and why the rows are `Text` nodes — a row you
could tap would be a second way to choose that the band does not describe.

**It reports at rest, never while turning.** One flick passes nine rows, and every one of
them is a value some caller would have written to a form. `onScrollEndDrag` covers a drag
that stops without momentum and `onMomentumScrollEnd` covers the flick; both are needed, and
neither fires for the other.

**The rows fade and lean away from the middle**, read off the column's scroll offset on the
UI thread through a shared value. That is not decoration: it is the whole of what says this
is a drum with more of it out of sight rather than a list that happens to have stopped. A
position crossing the bridge every frame would animate at the rate React re-renders rather
than at the rate the finger moves.

**The band is the root's**, one shape across every column rather than one per column — two
columns at different widths would show the seam between two bands — and it takes no touch,
so it marks the middle without stopping the wheel under it.

`visibleCount` is **forced odd**, because the whole control is built on there being a middle
row, and rounded up rather than down: a caller who asked for four wanted more than three.
It is raw rather than a token, like the `ProgressCircle`'s `radius`, so the wheel's height
is applied after the cached recipe.

**No `loop`.** An endless drum is a list with no end, faked by rewriting the data around the
finger and jumping the offset back when it drifts. That belongs to the caller's data, where
the caller knows how many months there are; here it would be a component quietly
renumbering its own children.

Four levels and no intent — what the variant names is the band. `secondary` names
`defaultForeground` rather than `foreground`, and the difference is only visible under a
tint: `resolveTint` reads the role off the token's own name, a bare `foreground` maps to the
tint itself, and a band painted the same colour as the row on it is a row you cannot read.
That one was caught on the demo screen, which is what the demo screen is for.

The first placement is `onContentSizeChange` rather than the effect that follows an outside
change: `contentOffset` only takes on iOS, so on Android and web the wheel would open
showing its first row while reporting its fifth — wrong on two platforms out of three.
