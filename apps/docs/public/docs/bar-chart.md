# BarChart

A bar per row, and a bar per series inside it once there is more than one.

```tsx
import { BarChart } from '@xaui/native/bar-chart'

<BarChart data={rows} xKey="month" yKeys={['units']} />
<BarChart data={rows} xKey="month" yKeys={['organic', 'paid']} isGrouped />
```

Everything shared is in [`chart.md`](../chart/chart.md).

## Grouped compares, stacked totals

Stacked is the default, because a bar chart with two series is usually one quantity split.
The [`AreaChart`](../area-chart/area-chart.md) makes the same distinction in the same words.

Grouped divides the slot the row already has, rather than introducing a second scale: the
group **is** the slot, and each series takes an equal share of it.

Only the topmost segment of a stack is rounded. A corner between two segments is a gap in a
bar that is meant to read as one.

## The corner is a capsule, and it is computed

`radius` is a **raw number in points**, not a `RadiusKey`: a bar's corner is bounded by its
own width, not by the container scale, and a `2xl` on a six-point bar would be a circle.

Unset, it is **under a third of the bar's width**, computed from the slot the scale gave it
so it holds at four bars and at forty.

A third rather than a half, and the half is what a capsule is: a capsule reads as a shape
rather than as a measurement — the eye stops at the dome instead of at the value it marks —
and a narrow bar, one of three in a group, becomes a pill with no flat top at all.

`barPath` clamps it to the bar's own **height** as well, which is what keeps the shortest bar
a stadium rather than a shape whose two arcs cross and render as a knot. That case is not
exotic: it is the first bar of every chart that starts near zero.

## Its own props

| Prop        | Type      | Default      | Notes                                |
| ----------- | --------- | ------------ | ------------------------------------ |
| `isGrouped` | `boolean` | `false`      | Side by side rather than stacked     |
| `radius`    | `number`  | half the bar | Points, clamped to the bar's own box |
| `gap`       | `number`  | `0.4`        | The share of a slot left empty       |
