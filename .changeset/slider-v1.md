---
'@xaui/native': patch
---

`Slider` — Output · Track · Fill · Thumb

**Two callbacks, and the difference matters.** `onValueChange` fires on every step the thumb
crosses, mid-drag included, and is what a live preview reads. `onValueCommit` fires once,
when the finger lifts — it is where a network call belongs, because the first can fire
fifty times in a second. The legacy component had one of each under different names and
nothing saying which was which.

**The snap counts steps from the minimum**, not from zero. A range from 5 in steps of 10
stops at 5, 15, 25; rounding the value itself would give 10, 20, 30 and move every stop.
The rounding precision reads the **minimum** as well as the step, which is what the tests
caught: a range from `0.05` in steps of `0.1` has two decimals of precision, and rounding
to the step's alone turned its first stop into `0.1`.

**The travel is inset by half a thumb at each end**, and the fill runs to the thumb's centre
rather than to the raw proportion. Without both, the thumb hangs over the track's ends at
the extremes and the fill runs out from under it.

**A press anywhere on the track moves the thumb there** — the half of a slider people
forget, because dragging a narrow thumb is a fine gesture on a mouse and a poor one on a
finger.

The thumb grows 15% under the press rather than moving: the finger is already covering it,
so the scale is what you see in the gap around it, and it is the only confirmation a slider
can give that the drag has started.

`react-native-gesture-handler` is an optional peer of this package and this is the first
component to need it. It is imported in `slider-thumb.tsx` and nowhere else, so only an app
that reaches for `@xaui/native/slider` pays for it.

No `variant` and no `xs`: a slider reports a quantity rather than an intent, and a track
four points tall is a line rather than a control.

A range slider and a vertical one are not here. The context already carries what a second
thumb would need and `useSlider` is exported, but two thumbs is two values, a different
type for `value`, and rules about which one gives way.
