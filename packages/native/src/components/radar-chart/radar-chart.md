# RadarChart

Several quantities at once, each on its own axis.

```tsx
import { RadarChart } from '@xaui/native/radar-chart'
;<RadarChart
  data={[
    { skill: 'Vitesse', alice: 80, bob: 55 },
    { skill: 'Endurance', alice: 65, bob: 90 },
    { skill: 'Précision', alice: 92, bob: 70 },
  ]}
  axisKey="skill"
  yKeys={['alice', 'bob']}
  maxValue={100}
/>
```

The palette, the variants and the ink are the family's — [`chart.md`](../chart/chart.md).

## The data is transposed

**A row here is an axis, not a reading along one**, and it is the one thing to get right at
the call site. That is what a radar is: several quantities compared across the same set of
measures. Reading it the other way round produces a chart with one axis per month, which is
a line chart drawn in a circle.

## The edges are always straight

The vertices **are** the axes. A curve between two of them would draw a reading on an axis
that does not exist, which is why nothing here takes a `curve`.

## `maxValue` is what makes two radars comparable

Unset, the web's edge is the highest reading in this chart — so its shape says how the
measures compare _within_ it, and nothing at all about any other chart. A dashboard of radars
should give all of them the same top.

Every axis shares one scale, always. A radar whose axes were scaled apart would be several
charts drawn on top of each other.

## Its own props

| Prop          | Type             | Default    | Notes                                  |
| ------------- | ---------------- | ---------- | -------------------------------------- |
| `data`        | `Data[]`         | —          | One row per **axis**                   |
| `axisKey`     | `keyof Data`     | —          | What names each axis                   |
| `yKeys`       | `(keyof Data)[]` | —          | The series                             |
| `levels`      | `number`         | `4`        | Rings — the chart's only scale         |
| `maxValue`    | `number`         | the data's | The top of every axis                  |
| `hasLabels`   | `boolean`        | `true`     | `false` hands the whole box to the web |
| `fillOpacity` | `number`         | `0.18`     |                                        |
| `strokeWidth` | `number`         | `2`        |                                        |
| `hasPoints`   | `boolean`        | `false`    | A dot at every vertex                  |

Fewer than three axes draws nothing: two axes is a line, and one is a point.

The labels sit just outside the outermost ring, in a fixed box pulled back by half its width
— the only placement that works at every angle without measuring the text first. `hasLabels`
is what a radar used as a glyph rather than as a figure turns off, and it hands the room back
to the web.
