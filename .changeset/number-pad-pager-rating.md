---
'@xaui/native': patch
---

`NumberPad`, `Pager` and `Rating`

P5.3d, P5.30 and P5.39.

**`NumberPad`** — Key · Backspace · Action · Label · Icon. The grid is data, not markup: `1`
to `9`, the `0` and the backspace are not a decision a caller makes, so the root renders
them. What is composed is the one free corner of the bottom row, and that is what `children`
is; left out, the corner is still a cell, or the `0` slides to the start of its row and stops
being the middle column.

It **draws no display** — what the value looks like is the screen's, an `InputOTP`'s boxes or
a row of dots. A masked PIN is therefore a composition rather than a prop: `InputOTP.Value`
takes children that win over the box's own character.

`maxLength` clamps rather than truncating, and measures the insert whole, for the `00` key
that would otherwise land halfway over the limit. A cell owns its press state, which the root
cannot see, so the root resolves both faces and each cell picks — the `Menu`'s arrangement,
and what keeps a pad of eleven the cost of a pad of two. The bare cells read the **page's**
foreground rather than the variant's: a `primary` pad puts `accentForeground` on its digits,
and a backspace with no ground of its own would take white on white.

**`Pager`** — Content · Page · Indicator · Dot. Whole pages on either axis. A page is the
track, measured, on both axes — and the measurement is the track's rather than the root's,
because the indicator sits in the flow under the pages.

It shares the paging arithmetic with the `Carousel` and nothing else. A page is the whole
track where a slide is a division of it, so this uses RN's own `pagingEnabled`; the travel is
`scrollTo({ animated: true })`, because a page's move is a whole viewport, which is the
distance the platform's own pagers travel on that curve. The dot changes colour and does not
stretch: a page control is a fixed row of marks, and a mark that grows moves the row's
arithmetic under a reader counting it.

**`Rating`** — Item · Icon. One component for the input and the average, because a mark's
fill is a **fraction**: 4.3 shows three tenths of the fifth mark, where a boolean per mark
would have had to round it. A mark is the same glyph twice — the neutral one sizes the mark,
the filled one is pinned over it in a clip cut to the fraction — and which layer an instance
is in comes from the layer rather than a prop, so the glyph is written once. A press reads
`locationX` and rounds **up**, the only rounding that matches the gesture.

`PressableFeedback` is unchanged; the `Pager` and the `Rating` use `Animated.ScrollView` and
`PressableFeedback` as they are.
