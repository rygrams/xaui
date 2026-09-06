---
'@xaui/native': patch
---

feat(charts): `LineChart`, `AreaChart`, `BarChart`, `PieChart` and `RadarChart` — drawn here

P5.34, P5.34b, P5.34e, P5.34f and P5.34g. **Nothing is imported to draw them.**
`react-native-svg` is already an optional peer — the `Select`'s check and the `Icon`'s
chevron use it — and everything above it is this library's: the scales, the paths, the
palette.

That is not an aesthetic preference. **A chart library is a second design system**: its own
idea of a colour, its own appearance blob, its own units, and an API that is the one place
`variant` and `color` cannot reach. Wrapping one means either exposing that blob — which is
`customAppearance`, the thing R2 removed — or fighting it. The alternative considered was a
native graphics engine as a peer dependency, which is a great deal of install for five
figures.

**And the maths becomes tests.** `chart-scale`, `chart-path` and `chart-palette` are 106
cases: a curve that must never dip below its data, an axis that must never label a value
above the tallest bar, a bar whose corner must not exceed its own height, a ramp that must
not drift off its hue. Each of those is a test rather than a screenshot someone has to
remember to look at — and two of them were bugs the tests found before the demo did.

The API is chartkit's shape — rows of objects, `xKey`, a key per series — with `yKeys` plural,
because a chart with two series is the common case and not an escape hatch. **The series are
props, not children**, and that is the one place this family parts company with the rest of
the library: a line is not a component a caller composes, it is a column of their data. What
composition there is lives on `ChartPlot`, which takes a render function.

**A shade per series, not a colour per series.** The palette is walked out of one colour in
OKLab lightness, and **reduces chroma to stay in gamut rather than clamping channels** —
clamping gives away the hue, and a blue drifts several degrees towards cyan across a ramp.
Shades of one colour say "parts of a whole" where a rainbow says "unrelated things", and it
is the only scheme that survives a caller changing the accent.

`LineChart`, `AreaChart` and `BarChart` are three files over one `ChartPlot`, the way the
`Autocomplete` is a few files over `selectRecipe`. It owns the frame, the grid, the axes and
both scales — **point spacing for a line, band spacing for a bar**, because a line inset by
half a slot reads as cut off and a bar on the edge is half outside the plot. `PieChart` and
`RadarChart` are square rather than framed, and take the palette and the ink to draw their
own geometry.

The axis is honest: `niceScale` picks a step from 1, 2, 2.5, 5 or 10 times a power of ten and
then **widens the domain** to a multiple of it, rather than squeezing ticks into the data's
own range — which is what produces an axis labelled 3.33, and how a top tick ends up below
the tallest bar.

The curve is Fritsch–Carlson: flat at every turning point, capped at three times the
neighbouring slope elsewhere. A midpoint cubic is four lines and overshoots — two high
readings either side of a low one bow the curve below the low one, and on an area chart that
is ink under the axis.

No chart paints its own ground; the card around it and the legend beside it are the caller's.
`tsup`'s DTS pass gets a larger heap, because the generic chart props push the default over.
