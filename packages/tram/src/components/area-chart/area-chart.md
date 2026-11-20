# AreaChart

The `LineChart` with the ground under it filled, drawn the Metro way: the line's stroke of
2 over a flat fill at a fifth of the colour, with no gradient.

The fill only says which side of the line is "under"; the line carries the number. The
axes, the grid and the palette come from the shared plot of the chart family; the words
around the figure come from the `Chart` frame.

## Import

```tsx
import { AreaChart } from '@xaui/tram/area-chart'
```

## Anatomy

```tsx
<Chart>
  <Chart.Header>…</Chart.Header>
  <AreaChart />
  <Chart.Footer />
</Chart>
```

- **`AreaChart`** — the plot. It has no slots of its own: it draws the grid, the areas,
  their lines and the axis labels from its props. Its ref is the plot's view.
- **`Chart`** (from `@xaui/tram/chart`) — the optional frame, with no ground, line or
  corner. It hands its `accent`, `size` and `color` down to the figure inside.

## Usage

### Basic

```tsx
<AreaChart data={rows} xKey="month" yKeys={['revenue']} />
```

`xKey` runs along the bottom; each key in `yKeys` is a series, in the order the palette
walks them. An empty `data` draws the axes and nothing else.

### Stacked or overlaid

```tsx
<AreaChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} isStacked />
```

Stacked reads as a total split into parts; overlaid (the default) as several quantities
compared. Stacked, each series is drawn at the running total of the ones under it and
fills only its own band, so the y axis reaches the top of the stack and the flat fills do
not pile into a dark floor.

### Curve and stroke

```tsx
<AreaChart
  data={rows}
  xKey="day"
  yKeys={['value']}
  curve="monotone"
  strokeWidth={0}
/>
```

`curve` is `linear` by default; `monotone` smooths the line without leaving the data.
`strokeWidth` is the line along the top of each area, 2 by default; `0` leaves the fill
bare.

### Axes and grid

`hasGrid`, `hasXAxis`, `hasYAxis`, `tickCount`, `xLabelCount`, `formatX`, `formatY` and
`hasZeroBaseline` are the chart family's shared props, as on the `LineChart`.

## Sizes

```tsx
<AreaChart size="sm" data={rows} xKey="month" yKeys={['wifi']} />
<AreaChart size="md" data={rows} xKey="month" yKeys={['wifi']} />
<AreaChart size="lg" data={rows} xKey="month" yKeys={['wifi']} />
```

`size` is the plot's height — 140, 200 or 280 — never its width, which is the parent's.

## Colour

The palette is walked out of one colour, a shade per series. `accent` picks one of the
twenty named Metro accents — the intents are `green`, `amber` and `red` — and `color`
takes a raw tint and wins when both are set. Inside a `Chart`, the frame's appearance is
the default.

```tsx
<Chart seriesCount={2} accent="teal">
  <Chart.Header>
    <Chart.Legend labels={['wi-fi', 'mobile']} />
  </Chart.Header>
  <AreaChart data={rows} xKey="month" yKeys={['wifi', 'mobile']} isStacked />
</Chart>
```

`isDisabled` dims the plot.

## Accessibility

- The plot is a plain `View` with no role. Its `View` props are passed through: give it
  `accessible` and an `accessibilityLabel` that says what the figure shows.
- A `Chart.Title` in the frame is a `header` to a screen reader.

## Differences from Native

- **The fill** is flat, a fifth of the colour; Native's is a gradient fading to the axis.
- **Stacked**, each series fills only its own band, so flat fills do not darken where they
  overlap.
- **`curve`** defaults to `linear`; Native defaults to `monotone`.
- **`accent`** replaces `variant`: the palette's seed is one of the twenty named accents,
  the intents being `green`, `amber` and `red`.
