# LineChart

A line per series, over a shared scale.

```tsx
import { LineChart } from '@xaui/native/line-chart'
;<LineChart
  data={rows}
  xKey="month"
  yKeys={['organic', 'paid']}
  formatY={value => `${value / 1000}k`}
/>
```

Everything about the plot, the palette, the axes and the API's shape is in
[`chart.md`](../chart/chart.md) — this page is only what is this chart's own.

## Its own props

| Prop          | Type                     | Default      | Notes                           |
| ------------- | ------------------------ | ------------ | ------------------------------- |
| `curve`       | `'monotone' \| 'linear'` | `'monotone'` | The curve never leaves its data |
| `strokeWidth` | `number`                 | `2`          |                                 |
| `hasPoints`   | `boolean`                | `false`      | A dot on every reading          |

`hasPoints` is off by default because twelve months of dots is a dotted line. It earns itself
on a short series, where each reading is a thing you point at rather than a trend.

The cap and the join are round: a line ending in a square cap reads as clipped at the axis,
and every trend line ends at the edge of its plot.
