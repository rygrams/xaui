import type { Span } from '@xaui/native/system'
import { TRAM_RADIUS } from '../../theme/tram-tokens'
import { axisValue } from '../chart/chart.utils'
import type { ChartBand, ChartSeries } from '../chart'

/**
 * A bar's corner: square by default, and never past the Tram corner of 2. Native's
 * default is a third of the bar, a capsule; a caller's `NaN` reads as square.
 */
export function barCorner(radius: number | undefined): number {
  if (radius === undefined || !Number.isFinite(radius)) return 0

  return Math.min(Math.max(radius, 0), TRAM_RADIUS)
}

export type BarRect = {
  key: string
  color: string
  x: number
  y: number
  width: number
  height: number
  /** The corner of the bar's far end. Only the top of a stack has one. */
  corner: number
}

export type BarLayoutArgs = {
  /**
   * The scaled series. In a stack their values are **running totals** — the rows went
   * through `stackRows` — so a segment runs from the total under it to its own.
   */
  series: ReadonlyArray<ChartSeries>
  band: ChartBand
  scaleY: (value: number) => number
  domainY: Span
  isGrouped: boolean
  corner: number
}

/**
 * Every bar of the chart, as rectangles.
 *
 * One series is a bar per row. Several stack by default, with **no gap** between segments,
 * or stand side by side in the row's slot when grouped, each taking an equal share of it.
 * A reading that is not a number draws nothing.
 */
export function barLayout({
  series,
  band,
  scaleY,
  domainY,
  isGrouped,
  corner,
}: BarLayoutArgs): BarRect[] {
  const baseline = scaleY(axisValue(domainY))
  const isStacked = !isGrouped && series.length > 1
  const width =
    isGrouped && series.length > 0 ? band.width / series.length : band.width

  return series.flatMap((one, seriesIndex) =>
    one.values.flatMap((value, row) => {
      if (!Number.isFinite(value)) return []

      const below =
        isStacked && seriesIndex > 0 ? series[seriesIndex - 1].values[row] : 0
      const top = scaleY(value)
      const bottom = isStacked && seriesIndex > 0 ? scaleY(below) : baseline
      const height = Math.abs(bottom - top)
      if (height <= 0) return []

      const x = isGrouped
        ? band.center(row) - band.width / 2 + width * seriesIndex
        : band.center(row) - width / 2
      const isTop = !isStacked || seriesIndex === series.length - 1

      return [
        {
          key: `${one.key}-${row}`,
          color: one.color,
          x,
          y: Math.min(top, bottom),
          width,
          height,
          corner: isTop ? corner : 0,
        },
      ]
    })
  )
}
