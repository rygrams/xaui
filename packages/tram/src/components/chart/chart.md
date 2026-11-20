# Charts

The words around a figure — a title, a description, a value and a legend — and the plot
the cartesian charts share. Tram draws the frame with **no shell**: no ground, no padding,
no line and no corner, so the figure sits on the page as Metro's figures did.

A caller who wants a card puts the frame in a Tram `Card`. The figures themselves are
their own pages: `LineChart`, `AreaChart`, `BarChart`, `PieChart`, `RadarChart` and
`RadialChart`.

## Import

```tsx
import { Chart, ChartPlot } from '@xaui/tram/chart'
```

## Anatomy

```tsx
<Chart>
  <Chart.Header>
    <Chart.Heading>
      <Chart.Title />
      <Chart.Description />
      <Chart.Value />
    </Chart.Heading>
    <Chart.Legend>
      <Chart.LegendItem />
    </Chart.Legend>
  </Chart.Header>
  {/* a figure */}
  <Chart.Footer />
</Chart>
```

- **`Chart`** — the frame, and the palette everything in it shares. `accent`, `size` and
  `color` are handed down to the legend and the figure.
- **`Chart.Header`** — the row above the figure, pushed apart and wrapping: a long title
  keeps the row and the legend drops under it.
- **`Chart.Heading`** — the title, its description and a value, as one block.
- **`Chart.Title`** — what the figure is, on `title` Light.
- **`Chart.Description`** — what it measures, on `caption` in the muted ink.
- **`Chart.Value`** — the one number it is about, on `section` Light in tabular figures.
- **`Chart.Legend`** — which colour is which series. `labels` is the short form; children
  are the long one.
- **`Chart.LegendItem`** — one entry: a square of 10 in the series' colour, and its name
  on `caption`. `index` picks the series; `color` gives an entry its own.
- **`Chart.Footer`** — the row under the figure. It wraps.

## Usage

### A frame around a figure

```tsx
<Chart seriesCount={2} accent="cobalt">
  <Chart.Header>
    <Chart.Heading>
      <Chart.Title>data</Chart.Title>
      <Chart.Description>GB per month</Chart.Description>
      <Chart.Value>26 GB</Chart.Value>
    </Chart.Heading>
    <Chart.Legend labels={['wi-fi', 'mobile']} />
  </Chart.Header>
  <LineChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
  <Chart.Footer>
    <Chart.Description>last twelve months</Chart.Description>
  </Chart.Footer>
</Chart>
```

`seriesCount` is the one number the frame asks for: it cannot count the figure's series,
and the legend needs the palette walked to the right length. Unset, the legend walks its
own length. A figure that names its own `accent`, `size` or `color` still wins.

### A legend with values

```tsx
<Chart.Legend>
  <Chart.LegendItem index={0}>wi-fi (18 GB)</Chart.LegendItem>
  <Chart.LegendItem index={1}>mobile (8 GB)</Chart.LegendItem>
</Chart.Legend>
```

Outside a `<Chart>`, a legend takes its own `accent`, `size`, `color` and `count`, which
have to be the figure's.

### A frame with no figure

Both halves are optional: a figure on its own draws no ground, and a frame with a
`Skeleton` in it is what a chart looks like while its data loads.

### A mark of your own

`ChartPlot` is the plot every cartesian chart is drawn in: the grid, the zero axis, the
labels, both scales and the palette. It takes the figures' shared props and a render
function handed the scaled series, the frame, the scales and the ticks.

```tsx
<ChartPlot data={rows} xKey="month" yKeys={['revenue']}>
  {({ series }) => <Path d={linePath(series[0].points)} stroke={series[0].color} />}
</ChartPlot>
```

`spacing` is `point` (the first and last readings on the plot's edges, for a line) or
`band` (each centred in a slot, for a bar). The grid lines are 1 in the faint grey; the
zero axis is a line of 2 in the muted ink, drawn over the marks when `hasXAxis` is on. The
labels are `caption`, tabular and muted. `react-native-svg` is an optional peer.

## Sizes

```tsx
<Chart size="sm">…</Chart>
<Chart size="md">…</Chart>
<Chart size="lg">…</Chart>
```

`size` is the plot's height — 140, 200, 280 — never its width, which is the parent's. The
words around the figure keep their roles at every size.

## Colour

The palette is shades of one colour, walked from the seed: `color`, the named `accent`'s
true colour, or the theme's accent. The three intents are accent names: `green`, `amber`,
`red`.

```tsx
<Chart accent="green" seriesCount={1}>
  …
</Chart>
```

## Accessibility

- `Chart.Title` has the `header` role.
- The axis labels are React Native `Text`, so they follow the theme's font and the
  platform's text size.
- A disabled frame greys the palette and dims itself; a figure dims for its own
  `isDisabled` alone.

## Differences from Native

- **No shell**: Native's frame is a card; Tram's has no ground, padding, line or corner.
- **`variant`** is replaced by `accent`, the palette's seed; `ChartVariant` is gone and
  `color` still wins. The intents are the accents `green`, `amber` and `red`.
- **`size`** moves only the plot. The square figures take the frame's size as well as its
  palette, where Native's take the palette alone.
- **The plot** is Tram's own on Native's maths: grid lines in the faint grey, the zero
  axis a line of 2 over the marks, a legend entry a square rather than a dot.
