# BarChart

A bar per row, and a bar per series inside it once there is more than one, drawn the Metro
way: square rectangles of flat colour, stacked by default with no gap between segments, and
a corner of 2 at most.

The axes, the grid and the palette come from the shared plot of the chart family; the
words around the figure come from the `Chart` frame.

## Import

```tsx
import { BarChart } from '@xaui/tram/bar-chart'
```

## Anatomy

```tsx
<Chart>
  <Chart.Header>…</Chart.Header>
  <BarChart />
  <Chart.Footer />
</Chart>
```

- **`BarChart`** — the plot. It has no slots of its own: it draws the grid, the bars and
  the axis labels from its props. Its ref is the plot's view.
- **`Chart`** (from `@xaui/tram/chart`) — the optional frame, with no ground, line or
  corner. It hands its `accent`, `size` and `color` down to the figure inside.

## Usage

### Basic

```tsx
<BarChart data={rows} xKey="month" yKeys={['units']} />
```

Each row has a slot along the bottom, and its bar is centred in it. An empty `data` draws
the axes and nothing else.

### Stacked or grouped

```tsx
<BarChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
<BarChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} isGrouped />
```

Stacked is the default: a stack totals. It is summed into the rows before the plot scales
them, so the y axis reaches the top of the tallest stack rather than the tallest segment.
`isGrouped` stands the series side by side, sharing the row's slot: a group compares.

### Gap and corner

```tsx
<BarChart data={rows} xKey="month" yKeys={['units']} gap={0.2} radius={2} />
```

`gap` is the share of a slot left empty either side of a bar, `0.4` by default. `radius`
is the corner of the bar's far end, in points: `0` by default and held at 2.

### Negative values

The zero axis is a line of 2 drawn over the bars, so a bar stands on it and a negative
one hangs from it.

### Axes and grid

`hasGrid`, `hasXAxis`, `hasYAxis`, `tickCount`, `xLabelCount`, `formatX`, `formatY` and
`hasZeroBaseline` are the chart family's shared props, as on the `LineChart`.

## Sizes

```tsx
<BarChart size="sm" data={rows} xKey="month" yKeys={['units']} />
<BarChart size="md" data={rows} xKey="month" yKeys={['units']} />
<BarChart size="lg" data={rows} xKey="month" yKeys={['units']} />
```

`size` is the plot's height — 140, 200 or 280 — never its width, which is the parent's.

## Colour

The palette is walked out of one colour, a shade per series. `accent` picks one of the
twenty named Metro accents — the intents are `green`, `amber` and `red` — and `color`
takes a raw tint and wins when both are set. Inside a `Chart`, the frame's appearance is
the default.

```tsx
<Chart seriesCount={2} accent="violet">
  <Chart.Header>
    <Chart.Legend labels={['wi-fi', 'mobile']} />
  </Chart.Header>
  <BarChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} />
</Chart>
```

`isDisabled` dims the plot.

## Accessibility

- The plot is a plain `View` with no role. Its `View` props are passed through: give it
  `accessible` and an `accessibilityLabel` that says what the figure shows.
- A `Chart.Title` in the frame is a `header` to a screen reader.

## Differences from Native

- **`radius`** defaults to 0 and is held at 2; Native's default is a third of the bar, a
  capsule.
- **`accent`** replaces `variant`: the palette's seed is one of the twenty named accents,
  the intents being `green`, `amber` and `red`.
