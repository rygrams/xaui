# PieChart

The whole and its parts, drawn as a ring in Metro flat colour: one shade of an accent per
slice, the ground showing through a drawn gap between them, and what sits in the hole
written in React Native.

A ring is square rather than framed, so it draws its own geometry instead of sitting in the
shared plot of the other charts. It can still sit in a `Chart` frame, which hands it its
`accent`, `size` and `color`.

## Import

```tsx
import { PieChart } from '@xaui/tram/pie-chart'
```

## Anatomy

```tsx
<PieChart>{/* the middle */}</PieChart>
```

- **`PieChart`** — the root, a square view holding the ring. Its ref is that view.
- **children** — what sits in the hole: a `View` laid over the ring, centred, that takes no
  touches. It is drawn only when there are children.

## Usage

### Basic

```tsx
<PieChart data={rows} labelKey="device" valueKey="sessions" />
```

Each row is a slice; `valueKey` is the quantity, and each slice is its share of the total.
`labelKey` names the slice — what a legend would print.

### The middle

```tsx
<PieChart data={rows} labelKey="device" valueKey="sessions">
  <Typography variant="section">4.5 k</Typography>
  <Typography variant="caption" color={theme.colors.muted}>
    sessions
  </Typography>
</PieChart>
```

The middle is React Native rather than SVG text, so it takes the theme's font and the
platform's text size like everything else on the screen.

### Pie, not ring

```tsx
<PieChart data={rows} labelKey="browser" valueKey="share" innerRadius={0} gap={0} />
```

`innerRadius` is a fraction of the radius, not points, so the hole stays in proportion at
every size: `0.62` by default, `0` for a pie. `gap` is in degrees between two slices,
`1.5` by default, `0` to leave them touching.

### With a legend

```tsx
<Chart seriesCount={rows.length}>
  <Chart.Header>
    <Chart.Heading>
      <Chart.Title>devices</Chart.Title>
    </Chart.Heading>
  </Chart.Header>
  <PieChart data={rows} labelKey="device" valueKey="sessions" />
  <Chart.Footer>
    <Chart.Legend labels={rows.map(row => row.device)} />
  </Chart.Footer>
</Chart>
```

## Sizes

```tsx
<PieChart size="sm" data={rows} labelKey="device" valueKey="sessions" />
<PieChart size="md" data={rows} labelKey="device" valueKey="sessions" />
<PieChart size="lg" data={rows} labelKey="device" valueKey="sessions" />
```

`size` is the ring's diameter: 140, 200 or 260.

## Colour

The palette is walked out of one colour, a shade per slice. `accent` picks one of the
twenty named Metro accents — the intents are `green`, `amber` and `red` — and `color` takes
a raw tint and wins when both are set. Inside a `Chart`, the frame's appearance is the
default.

```tsx
<PieChart accent="orange" data={rows} labelKey="device" valueKey="sessions" />
```

`isDisabled` dims the ring.

## Accessibility

- The ring is a plain `View` with no role. Its `View` props are passed through: give it
  `accessible` and an `accessibilityLabel` that says what the parts are.
- The middle is ordinary text and is read as such.

## Differences from Native

- **`accent`** replaces `variant`: the palette's seed is one of the twenty named accents,
  the intents being `green`, `amber` and `red`.
- **A single slice** takes no gap and draws a full ring.
- **A row at zero** draws nothing; Native keeps a hairline at the seam.
