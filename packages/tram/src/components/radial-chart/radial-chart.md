# RadialChart

Several quantities, each as far round its own ring as it has got, drawn the Metro way:
rings cut square at their ends, over a track of the faint grey.

A ring is not a slice. A `PieChart` splits one quantity into shares of a whole; a
`RadialChart` draws quantities that have nothing to do with each other — calories, steps,
minutes — each against a target of its own.

## Import

```tsx
import { RadialChart } from '@xaui/tram/radial-chart'
```

## Anatomy

```tsx
<RadialChart data={rows} labelKey="label" valueKey="value">
  {/* what sits in the middle */}
</RadialChart>
```

- **`RadialChart`** — one element with no slots: the rings and their tracks are drawn from
  the props. Its `children` are laid over the middle of the canvas, as React Native, and
  take no touches. It can stand alone or sit in a `Chart` frame.

## Usage

### Basic

```tsx
<RadialChart
  data={[
    { label: 'calories', value: 1623, target: 2000 },
    { label: 'steps', value: 5400, target: 10000 },
    { label: 'exercise', value: 25, target: 120 },
  ]}
  labelKey="label"
  valueKey="value"
  maxKey="target"
/>
```

The first row is the outermost ring, and the palette walks the rows in that order.

### The targets

| What you have            | What you write                         |
| ------------------------ | -------------------------------------- |
| a goal per row           | `maxKey="target"`                      |
| one goal for all of them | `maxValue={2000}`                      |
| no goal at all           | neither — the largest value is the top |

A row's own target wins over `maxValue`. A reading of zero or below draws no arc; a
reading past its target closes its ring.

### The middle

```tsx
<RadialChart data={activity} labelKey="label" valueKey="value" maxKey="target">
  <Typography variant="section">81 %</Typography>
  <Typography variant="caption">calories</Typography>
</RadialChart>
```

### The rings

```tsx
<RadialChart
  data={activity}
  labelKey="label"
  valueKey="value"
  maxKey="target"
  hasTrack={false}
  thickness={20}
  gap={2}
  size="sm"
/>
```

`thickness` sets every ring's width in points and wins over `size`; `gap` is the bare
ground between two rings, half the thickness by default. When the rings ask for more room
than the box has, they thin rather than drop. `hasTrack={false}` leaves out the grey
behind each ring — for a figure used as a glyph.

## Sizes

```tsx
<RadialChart size="sm" {...props} />
<RadialChart size="md" {...props} />
<RadialChart size="lg" {...props} />
```

`size` is the outermost ring's diameter — 140, 200 or 260 — and its thickness — 10, 14
or 18.

## Colour

The rings wear shades of one colour, walked out of the theme's accent. `accent` seeds the
palette with another of the twenty named accents; `color` seeds it with a raw tint and
wins when both are set. Inside a `Chart`, the frame's `accent`, `color` and `size` are the
defaults. `isDisabled` dims the figure.

```tsx
<RadialChart color="#1BA1E2" {...props} />
```

## Accessibility

- The figure sets no role and reads nothing by itself: give it an `accessibilityLabel`
  that states the readings, or write them in the middle or beside it.
- The middle takes no touches, so it never blocks a press meant for what is under it.
- Nothing moves, so there is nothing for reduced motion to change.

## Differences from Native

- **`accent`** replaces `variant`, as across the chart family: it seeds the palette with a
  named accent's true colour. `color` still wins.
- **The ends of a ring** are cut square (`butt`); Native rounds them.
- **An empty ring** draws no arc at all.
- The thinning, the per-row targets and the quarter turn of the canvas are Native's.
