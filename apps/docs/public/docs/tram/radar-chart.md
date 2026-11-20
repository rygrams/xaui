# RadarChart

Several quantities at once, each on its own axis, drawn the Metro way: rings and spokes
in lines of 1 of the faint grey, each series a polygon with sharp corners, a stroke of 2
and a flat fill, and the axis names in `caption` around the web.

## Import

```tsx
import { RadarChart } from '@xaui/tram/radar-chart'
```

## Anatomy

```tsx
<RadarChart data={rows} axisKey="skill" yKeys={['alice', 'bob']} />
```

- **`RadarChart`** — one element with no slots: the web, the series and the axis names
  are drawn from the props. It can stand alone, or sit in a `Chart` frame that gives it a
  title, a legend and its palette.

## Usage

### Basic

```tsx
<RadarChart
  data={[
    { skill: 'speed', alice: 80, bob: 55 },
    { skill: 'stamina', alice: 65, bob: 90 },
    { skill: 'aim', alice: 92, bob: 70 },
  ]}
  axisKey="skill"
  yKeys={['alice', 'bob']}
  maxValue={100}
/>
```

### The data is transposed

A row is an **axis**, not a reading along one: `axisKey` names each axis and `yKeys` are
the series, in the order the palette walks them. The vertices are the axes, so the edges
are always straight. Fewer than three axes draws nothing.

### A common top

Unset, `maxValue` is the highest reading in this chart, so its shape compares the measures
within it and says nothing about any other radar. Give every radar on a screen the same
`maxValue` to compare them.

### In a frame

```tsx
<Chart seriesCount={2} accent="cobalt">
  <Chart.Header>
    <Chart.Heading>
      <Chart.Title>profile</Chart.Title>
      <Chart.Description>Out of 100, one scale for all</Chart.Description>
    </Chart.Heading>
    <Chart.Legend labels={['Alice', 'Bob']} />
  </Chart.Header>
  <RadarChart
    data={skills}
    axisKey="skill"
    yKeys={['alice', 'bob']}
    maxValue={100}
  />
</Chart>
```

The frame's `accent`, `color` and `size` are defaults; the radar's own props win.

### As a glyph

```tsx
<RadarChart
  data={skills}
  axisKey="skill"
  yKeys={['alice']}
  hasLabels={false}
  hasPoints
  levels={3}
  size="sm"
/>
```

`hasLabels={false}` hands the whole box to the web. `hasPoints` draws a square of 6 at
every vertex. `levels` sets the number of rings (4 by default), `fillOpacity` the share of
colour in a series' fill (0.18), and `strokeWidth` the outline (2).

## Sizes

```tsx
<RadarChart size="sm" {...props} />
<RadarChart size="md" {...props} />
<RadarChart size="lg" {...props} />
```

`size` is the web's square box — 180, 240 or 300 — before the labels are given room.

## Colour

The series wear shades of one colour, walked out of the theme's accent. `accent` seeds
the palette with another of the twenty named accents; `color` seeds it with a raw tint and
wins when both are set. `isDisabled` dims the figure.

```tsx
<RadarChart accent="magenta" {...props} />
```

## Accessibility

- The figure sets no role and reads nothing by itself: give it an `accessibilityLabel`
  that states what it shows, or put the numbers beside it in text.
- Nothing moves, so there is nothing for reduced motion to change.

## Differences from Native

- **`accent`** replaces `variant`, as across the chart family: it seeds the palette with
  a named accent's true colour. `color` still wins.
- **The drawing**: rings and spokes in lines of 1 of the faint grey, mitred polygons, and
  square points where Native draws dots. The API is otherwise Native's.
