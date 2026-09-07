# AreaChart

The [`LineChart`](../line-chart/line-chart.md) with the ground under it filled.

```tsx
import { AreaChart } from '@xaui/native/area-chart'

<AreaChart data={rows} xKey="month" yKeys={['revenue']} />
<AreaChart data={rows} xKey="month" yKeys={['organic', 'paid']} isStacked />
```

Everything shared is in [`chart.md`](../chart/chart.md).

## Stacked and overlaid answer different questions

**Stacked** reads as a total split into parts. **Overlaid** reads as several quantities
compared. A stacked chart whose parts are not parts of one whole is a chart that adds
unrelated numbers together — which is why it is a prop a caller sets rather than what happens
by default the moment there are two series.

The stack is summed into the data before it is scaled, so the plot's own domain reaches the
top of it: a stack whose top leaves the axis is a stack drawn outside its own chart. The rows
are copied, never written to, and the totalled column is prefixed so it cannot collide with
one of the caller's.

Series are painted back to front, so the shortest is not hidden by the tallest.

## The fill is a gradient, and a light one

The ink belongs at the line, where the number is; the further from it, the less there is to
say. So the fill runs from **under a fifth** of the colour at the line to nothing at the axis.

Kept that light on purpose. The line carries the number and the fill only says which side of
it is "under" — anything heavier competes with the line, and two overlaid series stop being
two, because the lower one reads as a shadow of the upper rather than as its own quantity.

## Its own props

| Prop          | Type                     | Default      | Notes                    |
| ------------- | ------------------------ | ------------ | ------------------------ |
| `curve`       | `'monotone' \| 'linear'` | `'monotone'` |                          |
| `isStacked`   | `boolean`                | `false`      | Total split into parts   |
| `strokeWidth` | `number`                 | `2`          | `0` leaves the fill bare |
