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

No `variant` and no `xs`: a slider reports a quantity rather than an intent, and a rail
four points thick is a line rather than a control.

### A rail with a knob on it, not a capsule with a core

The legacy proportions rather than HeroUI's: 6 to 10 points of rail under a 16 to 24 point
disc. The knob overhangs the rail by half their difference on each side, and the rail
reserves that overhang as a margin — without it the knob spills into whatever sits above
and below, and the layout has no idea the control is thicker than its rail.

The three pairs are off the spacing grid on purpose. A rail is not a gap between two
things, and rounding 6 to `spacing(1.5)` would put the sizes on a scale with no bearing on
how thin a line can be and still be pressable.

The geometry is a **compound** of `size` and `orientation` rather than two axes. The two
cannot be written apart — which side of the rail is its thickness, which is its length, how
far to pull the knob back — and an `orientation` axis setting `height: undefined` to undo a
`size` axis's height is how this first shipped: declaration order is application order, the
second axis won, and the rail had no thickness at all.

### Three steps of one colour

The rail is the theme's neutral, the reach is the colour at thirty-five percent, the knob
is the colour at full. The eye lands on the knob, which is the value, rather than on the
bar behind it, which is only how far the value has come.

Material's slider is the same relationship with the steps assigned differently: their
inactive track is the soft one and their active track is full. Moving the soft step onto
the _reach_ is where this stops being theirs — a filled bar at full strength competes with
the handle for the eye, and the handle is the part you can move.

The thirty-five percent is **derived from the resolved role** in the recipe rather than
named in the theme. The soft family is a pair, fifteen and twenty, sized for a chip or a
soft button; a bar three hundred points long needs more than either. Adding a third step
would move every `*-soft` family in the library for one component's sake. Taking it off the
role also means a raw `color` flows through untouched, and the reach and the knob can never
drift apart because they come from the same place.

Disabled drops the colour entirely rather than dimming it: a pale wash reads as an enabled
slider seen through fog, a neutral one reads as switched off.

### Ranges and vertical rails

`value={[20, 60]}` is two thumbs and a fill **between** them, and it reports a pair back —
the shape the caller wrote is the shape they get. One `<Slider.Thumb index>` per end,
written rather than conjured by the rail.

**The thumbs cannot cross.** Each is bounded by its neighbour rather than by the range, so
dragging the lower past the upper stops it dead instead of swapping the two: a swap loses
the finger's grip mid-drag, and it ends up pushing the thumb it did not pick up. A press on
the rail moves the **nearest** thumb, because moving the first every time would send half a
range's presses over the other end.

`orientation="vertical"` counts **from the bottom**. A rail whose fill grew downwards would
report a larger value the lower the knob sat, which is the opposite of what a vertical
control means everywhere it appears — it reaches the gesture, the press and the fill's
anchor, three places that each had to be inverted.

Ten more tests on `withThumbAt` and `nearestThumb`, including the non-crossing in both
directions and the tie that always goes to the lower thumb.
