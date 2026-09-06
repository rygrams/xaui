import { useId } from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import { areaPath, linePath } from '../../utils/chart-path'
import { ChartPlot } from '../chart'
import type { ChartDatum } from '../chart'
import type { AreaChartProps } from './area-chart.type'

/**
 * How much of the colour the fill is at the line, and at the axis.
 *
 * A **gradient rather than a flat wash**, and it is the difference between an area chart
 * that reads and one that is a block of colour: the ink belongs at the line, where the
 * number is, and the further from it the less there is to say.
 *
 * Kept **well under a fifth** of the colour at its strongest. The line is what carries the
 * number and the fill only says which side of it is "under"; anything heavier competes with
 * the line, and two overlaid series stop being two — the lower one reads as a shadow of the
 * upper rather than as its own quantity.
 */
const FILL_TOP = 0.18
const FILL_BOTTOM = 0.01

/**
 * The `LineChart` with the ground under it filled.
 *
 * ```tsx
 * <AreaChart data={rows} xKey="month" yKeys={['revenue']} />
 * <AreaChart data={rows} xKey="month" yKeys={['organic', 'paid']} isStacked />
 * ```
 *
 * **Stacked and overlaid answer different questions.** Stacked reads as a total split into
 * parts; overlaid reads as several quantities compared. A stacked chart whose parts are not
 * parts of one whole is a chart that adds unrelated numbers together, which is why it is a
 * prop a caller sets rather than what happens by default with two series.
 *
 * **The fill is a gradient, not a wash.** The ink belongs at the line and fades to nothing
 * at the axis — which is also what keeps two overlaid areas legible.
 *
 * **The stack is summed here, not scaled twice.** Each series is drawn at the running total
 * of the ones under it, so the top edge of the last one is the total — and the plot's own
 * domain is widened to reach it, because a stack whose top leaves the axis is a stack drawn
 * outside its own chart.
 */
export function AreaChart<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
>({
  curve = 'monotone',
  isStacked = false,
  strokeWidth = 2,
  ...props
}: AreaChartProps<Data, XK, YK>) {
  const id = safeId(useId())

  return (
    <ChartPlot
      {...props}
      // The domain has to reach the top of the stack, and only the caller's rows know what
      // that is. Summing them into one column is what makes the axis honest.
      data={isStacked ? stackRows(props.data, props.yKeys) : props.data}
      yKeys={isStacked ? stackKeys(props.yKeys) : props.yKeys}
    >
      {({ series, frame }) => {
        // Painted back to front, so the shortest series is not hidden by the tallest.
        const drawn = isStacked ? [...series].reverse() : series

        return (
          <>
            <Defs>
              {series.map(one => (
                <LinearGradient
                  key={one.key}
                  id={`${id}-${safeId(one.key)}`}
                  x1="0"
                  y1={frame.y}
                  x2="0"
                  y2={frame.y + frame.height}
                  gradientUnits="userSpaceOnUse"
                >
                  {/* The opacity is its **own prop**, not an alpha channel in the colour.
                      `react-native-svg`'s native gradient parser drops the alpha out of an
                      `rgba()` stop, so a fill written that way comes back solid on a device
                      and correct on the web — which is the worst way to be wrong. */}
                  <Stop offset="0" stopColor={one.color} stopOpacity={FILL_TOP} />
                  <Stop offset="1" stopColor={one.color} stopOpacity={FILL_BOTTOM} />
                </LinearGradient>
              ))}
            </Defs>

            {drawn.map(one => (
              <Path
                key={`${one.key}-fill`}
                d={areaPath(one.points, frame.y + frame.height, curve)}
                fill={`url(#${id}-${safeId(one.key)})`}
              />
            ))}

            {strokeWidth > 0
              ? drawn.map(one => (
                  <Path
                    key={`${one.key}-line`}
                    d={linePath(one.points, curve)}
                    stroke={one.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                ))
              : null}
          </>
        )
      }}
    </ChartPlot>
  )
}

AreaChart.displayName = 'XAUI.AreaChart'

/**
 * A string with everything an SVG fragment id cannot hold taken out.
 *
 * Two sources feed one: `useId` returns something like `«r0»`, and a stacked series' key
 * carries the prefix's colon. Neither is legal in a `url(#…)` reference — and both resolve
 * on the web and silently do not on a device, which is the worst way to be wrong.
 */
function safeId(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '')
}

/** The key a stacked series is drawn under — the original, plus the ones below it. */
const STACK_PREFIX = 'xauiStack:'

function stackKeys<YK extends string>(keys: ReadonlyArray<YK>): string[] {
  return keys.map(key => `${STACK_PREFIX}${key}`)
}

/**
 * Each row with a running total per series added to it.
 *
 * A copy, always: the rows are the caller's and are never written to. The prefix is what
 * keeps a totalled column from colliding with one of their own.
 */
function stackRows<Data extends ChartDatum, YK extends keyof Data & string>(
  data: ReadonlyArray<Data>,
  keys: ReadonlyArray<YK>
): Record<string, unknown>[] {
  return data.map(row => {
    const next: Record<string, unknown> = { ...row }
    let total = 0

    for (const key of keys) {
      const value = Number(row[key])
      total += Number.isFinite(value) ? value : 0
      next[`${STACK_PREFIX}${key}`] = total
    }

    return next
  })
}
