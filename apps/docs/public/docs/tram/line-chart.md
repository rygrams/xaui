# LineChart

A line per series over a shared scale, drawn the Metro way: a stroke of 2 with sharp
corners and square-cut ends, straight from one reading to the next, and squares for points.

The series are props, not children: each line is a column of your data, named in `yKeys`.
The axes, the grid and the palette come from the shared plot of the chart family; the
words around the figure come from the `Chart` frame.

## Import

```tsx
import { LineChart } from '@xaui/tram/line-chart'
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
    <Chart.Legend />
  </Chart.Header>
  <LineChart />
  <Chart.Footer />
</Chart>
```

- **`LineChart`** — the plot. It has no slots of its own: it draws the grid, the lines,
  the points and the axis labels from its props. Its ref is the plot's view.
- **`Chart`** (from `@xaui/tram/chart`) — the optional frame. It has no ground, line or
  corner; it hands its `accent`, `size` and `color` down to the figure inside and lays
  out the title, the value and the legend.

## Usage

### Basic

```tsx
<LineChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
```

`xKey` runs along the bottom; each key in `yKeys` is a line, in the order the palette
walks them. An empty `data` draws the axes and nothing else.

### In a frame

```tsx
<Chart seriesCount={2}>
  <Chart.Header>
    <Chart.Heading>
      <Chart.Title>data</Chart.Title>
      <Chart.Description>GB per month, on this phone</Chart.Description>
    </Chart.Heading>
    <Chart.Legend labels={['wi-fi', 'mobile']} />
  </Chart.Header>
  <LineChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
</Chart>
```

The frame cannot count the series: `seriesCount` walks the legend's palette to the same
length as the figure's.

### Curve and points

```tsx
<LineChart data={rows} xKey="day" yKeys={['value']} curve="monotone" hasPoints />
```

`curve` is `linear` by default. `monotone` (Fritsch–Carlson) smooths the line without
leaving the data — it never dips below a valley. `hasPoints` draws a square of 6 on every
reading; it reads best on a short series. `strokeWidth` sets the line's thickness.

### Axes and grid

```tsx
<LineChart
  data={rows}
  xKey="month"
  yKeys={['wifi']}
  hasGrid={false}
  hasXAxis={false}
  hasYAxis={false}
  size="sm"
/>
```

`formatX` and `formatY` write the labels, `tickCount` aims the y axis at a number of
labels, `xLabelCount` thins the x labels, and `hasZeroBaseline={false}` starts the y axis
at the lowest value instead of zero.

## Sizes

```tsx
<LineChart size="sm" data={rows} xKey="month" yKeys={['wifi']} />
<LineChart size="md" data={rows} xKey="month" yKeys={['wifi']} />
<LineChart size="lg" data={rows} xKey="month" yKeys={['wifi']} />
```

`size` is the plot's height — 140, 200 or 280 — never its width, which is the parent's.

## Colour

The palette is walked out of one colour, a shade per series. `accent` picks one of the
twenty named Metro accents — the intents are `green`, `amber` and `red` — and `color`
takes a raw tint and wins when both are set. Inside a `Chart`, the frame's appearance is
the default.

```tsx
<LineChart accent="teal" data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
```

`isDisabled` dims the plot.

## Accessibility

- The plot is a plain `View` with no role. Its `View` props are passed through: give it
  `accessible` and an `accessibilityLabel` that says what the figure shows.
- A `Chart.Title` in the frame is a `header` to a screen reader.

## Differences from Native

- **`curve`** defaults to `linear` — Metro's figures were angular. Native defaults to
  `monotone`, which stays one prop away.
- **The stroke** has mitred corners and square-cut ends; Native's cap and join are round.
- **`hasPoints`** draws squares of 6; Native draws dots.
- **`accent`** replaces `variant`: the palette's seed is one of the twenty named accents,
  the intents being `green`, `amber` and `red`.
