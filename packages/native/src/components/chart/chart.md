# Charts

Five figures — `LineChart`, `AreaChart`, `BarChart`, `PieChart`, `RadarChart` — and the plot
the first three share.

## Import

```tsx
import { LineChart } from '@xaui/native/line-chart'
import { AreaChart } from '@xaui/native/area-chart'
import { BarChart } from '@xaui/native/bar-chart'
import { PieChart } from '@xaui/native/pie-chart'
import { RadarChart } from '@xaui/native/radar-chart'
```

## They are drawn here, not wrapped

**Nothing is imported to draw them.** `react-native-svg` is already an optional peer — the
`Select`'s check and the `Icon`'s chevron use it — and everything above it is this library's:
the scales, the paths, the palette.

That is not an aesthetic preference. A chart library is a second design system: it has its
own idea of a colour, its own appearance blob, its own units, and its API is the one place
`variant` and `color` cannot reach. Wrapping one means either exposing that blob — which is
`customAppearance`, the thing R2 removed — or fighting it. The alternative was a native
graphics engine as a peer dependency, which is a lot of install for four figures.

**And the maths becomes tests.** `chart-scale`, `chart-path` and `chart-palette` are 106
cases. A curve that must never dip below its data, an axis that must never label a value
above the tallest bar, a bar whose corner must not exceed its own height — all of that is a
test rather than a screenshot someone has to remember to look at.

## The API is chartkit's shape

```tsx
<LineChart data={rows} xKey="month" yKeys={['revenue']} />
```

Rows of objects, a key for the axis, a key per series. The one difference is **`yKeys`
plural**, because a chart with two series is the common case and not an escape hatch.

**The series are props, not children**, and that is the single place this family parts
company with the rest of the library. A line is not a component a caller composes — it is a
column of their data. What composition there is lives on `ChartPlot`, which takes a render
function for the case a caller needs a mark the five do not draw.

## A shade per series, not a colour per series

The palette is walked out of **one** colour — the variant's ink, or `color` when a caller
gives one — in OKLab lightness.

A chart's series are usually one quantity split: organic and paid traffic, mobile and
desktop. Shades of one colour say "parts of a whole" where a rainbow says "unrelated
things", and it is the only scheme that survives a caller changing the accent, because there
is nothing to change but the seed.

The walk **reduces chroma to stay in gamut** rather than clamping channels. Clamping gives
away the hue — the channel that overflowed stops moving while the others keep going, and a
blue drifts several degrees towards cyan across a ramp — where pulling chroma in keeps the
angle exactly and gives away only saturation, which is what a lighter shade of one colour is
anyway.

## The plot

`LineChart`, `AreaChart` and `BarChart` are three files over one `ChartPlot`, the way the
`Autocomplete` is a few files over `selectRecipe`. Three charts with three axis tables would
be three to keep in step, and the drift would show as a line chart and a bar chart on one
dashboard with labels at two sizes.

It owns the frame, the grid, the axes, both scales and the palette. `PieChart` and
`RadarChart` are square rather than framed, so they take the palette and the ink and draw
their own geometry.

### The axis is honest

`niceScale` picks a step from 1, 2, 2.5, 5 or 10 times a power of ten, then **widens the
domain** to a multiple of it. The other way round — squeezing the ticks into the data's own
range — is what produces an axis labelled 3.33 and 6.67, and an axis whose top tick sits
below the tallest bar is an axis that lies about the data.

`tickCount` is a target, not a count.

### Point spacing and band spacing

A **bar occupies a slot**, so it is centred in one and the ends of the plot are empty. A
**line connects readings**, so the first and the last sit on the plot's edges. A line inset
by half a slot at either end reads as a chart that has been cut off; a bar on the edge is
half outside the plot.

Two scales rather than one with a flag, because they are two shapes. Each chart asks for the
one it is.

### The labels are React Native

`<Text>` beside the canvas rather than inside it, so they take the theme's font, its scaling
and its colour. `<Text>` inside an `<Svg>` needs a font file loaded and ignores the
platform's text size.

The plot reserves 40 points for the y labels and 20 for the x. A label of "1 200 000" is the
case that loses to, and `formatY` is the answer — which is why it exists.

## The curve never leaves its data

`monotone` is Fritsch–Carlson: the tangent at each point starts as the average of the slopes
either side of it, is **flattened to zero wherever the data turns**, and is capped at three
times the neighbouring slope elsewhere. That cap is the condition under which a cubic Hermite
segment cannot leave the interval its endpoints set.

The alternative — a control point at the x-midpoint — is four lines and overshoots: two high
readings either side of a low one bow the curve below the low one, and on an area chart that
is ink under the axis.

`curve="linear"` for straight edges.

## Variants and colour

| `variant`   | The series' ink |
| ----------- | --------------- |
| `primary`   | `accent`        |
| `secondary` | `foreground`    |
| `success`   | `success`       |
| `warning`   | `warning`       |
| `danger`    | `danger`        |

The `ProgressBar`'s five, for the `ProgressBar`'s reasons: a chart reports a quantity, so
`primary` and `secondary` are its two emphases and the three intents are for when the number
itself is the news. `tertiary` and `ghost` are gone — a series with no ink is not a series —
and the `*-soft` pairs with them, since a chart's fills are already soft.

The ink is `bgSelected`, a **role** rather than a token named in an axis: the tint pass
re-runs `paint` and never the axes, so a series colour written as an axis would snap back to
the accent the moment a caller set `color`, and the palette walked out of it would go too.

**No chart paints its own ground.** A chart is drawn on the card it sits on; one that painted
its own would be a card inside a card. The `Card` around it in the demo is the caller's, and
so is the legend — which series a dot stands for is a sentence in the caller's language.

## Sizes

| `size` | Plot height | Ring / web |
| ------ | ----------- | ---------- |
| `sm`   | 140         | 140 / 180  |
| `md`   | 200         | 200 / 240  |
| `lg`   | 280         | 260 / 300  |

**`size` is the plot's height, never its width.** A chart spans its parent — RN's own
behaviour, and the reason there is no `fullWidth` — and how tall it is is the only thing a
caller cannot infer from the column it sits in. A pie and a radar are square, so for those it
is a diameter.

## Shared props

Every cartesian chart takes these, plus everything `View` accepts and the `ViewStyle` keys as
props (R14):

| Prop              | Type                        | Default     | Notes                                                |
| ----------------- | --------------------------- | ----------- | ---------------------------------------------------- |
| `data`            | `Data[]`                    | —           | An empty list draws the axes                         |
| `xKey`            | `keyof Data`                | —           | What runs along the bottom                           |
| `yKeys`           | `(keyof Data)[]`            | —           | The series, in palette order                         |
| `variant`         | `ChartVariant`              | `'primary'` |                                                      |
| `size`            | `'sm' \| 'md' \| 'lg'`      | `'md'`      | The plot's height                                    |
| `color`           | `string`                    | —           | The palette's seed                                   |
| `hasGrid`         | `boolean`                   | `true`      |                                                      |
| `hasXAxis`        | `boolean`                   | `true`      |                                                      |
| `hasYAxis`        | `boolean`                   | `true`      |                                                      |
| `tickCount`       | `number`                    | `4`         | A target, not a count                                |
| `xLabelCount`     | `number`                    | what fits   | Every nth row is labelled                            |
| `formatX`         | `(value, index) => string`  | —           |                                                      |
| `formatY`         | `(value: number) => string` | —           |                                                      |
| `hasZeroBaseline` | `boolean`                   | `true`      | An axis from the data's floor lies about proportions |
| `isDisabled`      | `boolean`                   | `false`     |                                                      |

## Extending them

`ChartPlot` is exported. It takes the same props and a **render function** that receives the
scaled series, the frame, both scales and the ticks — enough to draw a mark none of the five
does, on the same axes as the ones that do.

```tsx
<ChartPlot data={rows} xKey="month" yKeys={['revenue']}>
  {({ series, frame }) => (
    <Path d={linePath(series[0].points)} stroke={series[0].color} />
  )}
</ChartPlot>
```

`chart-scale` and `chart-path` are `utils/` — private, and deliberately: they are the
family's own maths, not an API. A chart of your own reaches for `ChartPlot`.
