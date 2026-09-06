# PieChart

The whole, and its parts.

```tsx
import { PieChart } from '@xaui/native/pie-chart'

<PieChart data={rows} labelKey="device" valueKey="count">
  <Text>4,5K</Text>
  <Text>Appareils</Text>
</PieChart>

<PieChart data={rows} labelKey="browser" valueKey="share" innerRadius={0} />
```

The palette, the variants and the ink are the family's — [`chart.md`](../chart/chart.md).
A ring is square rather than framed, so it draws its own geometry rather than sitting in the
shared plot.

## `innerRadius` is a fraction, not points

The hole has to stay in proportion at every size. A caller who writes 40 points gets a donut
on a phone and a pie on a tablet. `0` is the pie; the default is the donut.

## The middle is React Native

What sits in the hole is `children` in a `View` laid over the canvas — a `Text`, a number, an
icon — so it takes the theme's font and its scaling like everything else on the screen. SVG
text needs a font file loaded and ignores the platform's text size.

It takes no touches, so a press still reaches the slice under it.

## The gap is drawn, not stroked

Each slice is shortened by half the gap at either end, so the ring's ground shows through
between them. A stroke would sit **on top of** the slice and read as an outline.

A slice thinner than the gap keeps a hairline rather than being drawn inside out: a row with
a real value should not disappear because it is small.

A slice covering the whole circle is drawn as **two half arcs**, because an SVG arc from a
point back to itself is a no-op — a single-category pie would otherwise render as nothing at
all.

## Its own props

| Prop          | Type         | Default | Notes                                  |
| ------------- | ------------ | ------- | -------------------------------------- |
| `data`        | `Data[]`     | —       | One row per slice                      |
| `labelKey`    | `keyof Data` | —       | What names each slice                  |
| `valueKey`    | `keyof Data` | —       | The quantity                           |
| `innerRadius` | `number`     | `0.62`  | A fraction of the radius. `0` is a pie |
| `gap`         | `number`     | `1.5`   | Degrees between slices                 |
| `children`    | `ReactNode`  | —       | What sits in the hole                  |

A value of zero or below is dropped: a slice of less than nothing has no meaning in a pie,
and clamping is what keeps one from eating the ring in the other direction.
