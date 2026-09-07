# RadialChart

Several quantities, each as far round its own ring as it has got.

```tsx
import { RadialChart } from '@xaui/native/radial-chart'

<RadialChart
  data={[
    { label: 'Calories', value: 1623, target: 2000 },
    { label: 'Pas', value: 5400, target: 10000 },
    { label: 'Exercice', value: 25, target: 120 },
  ]}
  labelKey="label"
  valueKey="value"
  maxKey="target"
/>

<RadialChart data={rows} labelKey="source" valueKey="kcal" maxValue={2000}>
  <Text>Calories</Text>
  <Text>700 kcal</Text>
</RadialChart>
```

The palette, the variants and the ink are the family's — [`chart.md`](../chart/chart.md).
Like the [`PieChart`](../pie-chart/pie-chart.md) and the
[`RadarChart`](../radar-chart/radar-chart.md), it is square rather than framed, so it draws
its own geometry rather than sitting in the shared plot.

## A ring is not a slice

The `PieChart` splits **one** quantity into shares that add up to the whole. This draws
**several** quantities that have nothing to do with each other, each against a target of its
own.

Calories, steps and minutes do not sum to anything, and a donut of the three would be
drawing a total nobody measured. That is the whole distinction, and it is the one to get
right at the call site.

## The first row is the outermost ring

And the palette walks the rows in that order, so the ring that catches the eye first is the
row written first.

## Each ring has its own target

| what you have            | what you write                              |
| ------------------------ | ------------------------------------------- |
| a goal per row           | `maxKey="target"`                           |
| one goal for all of them | `maxValue={2000}`                           |
| no goal at all           | neither — the largest value becomes the top |

`maxKey` wins wherever a row carries one, so a chart can mix a per-row goal with a shared
fallback.

With neither, the biggest ring closes and the rest are read against it. That makes a figure
honest about itself and says nothing about any other — the `RadarChart`'s `maxValue` rule,
for the same reason: a dashboard of radial charts should give all of them the same top.

A reading of zero or below draws no arc: a ring runs from nothing to its target, and a
negative value would ask for a dash offset longer than the path.

## The track is the rest of the distance

Without it a ring at a fifth is an arc floating in space, with nothing saying how far it had
to go — which is the one thing this figure exists to say. `hasTrack={false}` gives it up for
a figure that is a glyph rather than a chart.

Every track is drawn before every ring, so a ring's rounded cap is never cut by the ground
of the one inside it.

## The rings thin rather than disappear

The stroke is centred on the path, so a ring drawn at the box's own radius loses its outer
half to the canvas edge — and six series at the default thickness ask for more room than a
phone-sized figure has.

So the geometry is **clamped to the room there actually is**: the gap takes at most half of
it, and the thickness takes what is left, divided evenly. What gives is the thickness,
because the alternative is a chart that silently drops its innermost rings.

Every ring shares one thickness. Rings of different weights read as different charts.

## The middle is React Native

The `PieChart`'s arrangement, for the `PieChart`'s reason: what sits in the middle is
`children` in a `View` laid over the canvas — a `Text`, a total, an icon — so it takes the
theme's font and its scaling like everything else on the screen. It takes no touches.

The canvas is turned a quarter turn on its **wrapper** rather than on each circle, which is
`ProgressCircle`'s arrangement and its reason: `Circle`'s own `rotation` prop emits an
invalid DOM property on web. It also leaves the middle upright, since that is the wrapper's
sibling rather than its child.

## Its own props

| Prop        | Type         | Default            | Notes                                        |
| ----------- | ------------ | ------------------ | -------------------------------------------- |
| `data`      | `Data[]`     | —                  | One row per ring, the first outermost        |
| `labelKey`  | `keyof Data` | —                  | What names each ring                         |
| `valueKey`  | `keyof Data` | —                  | The quantity                                 |
| `maxKey`    | `keyof Data` | —                  | That row's own target                        |
| `maxValue`  | `number`     | the largest value  | One target for every ring                    |
| `thickness` | `number`     | the size's own     | Points, raw — it wins over `size`            |
| `gap`       | `number`     | half the thickness | Points of bare ground between two rings      |
| `hasTrack`  | `boolean`    | `true`             | The whole of each ring's distance, behind it |
| `children`  | `ReactNode`  | —                  | What sits in the middle                      |

## In a `Chart`

The frame carries the words and the legend, and its `seriesCount` is what walks the legend's
dots to the same length as the rings:

```tsx
<Chart seriesCount={3}>
  <Chart.Header>
    <Chart.Heading>
      <Chart.Title>Activité du jour</Chart.Title>
    </Chart.Heading>
    <Chart.Legend labels={['Calories', 'Pas', 'Exercice']} />
  </Chart.Header>
  <RadialChart data={rows} labelKey="label" valueKey="value" maxKey="target" />
</Chart>
```
