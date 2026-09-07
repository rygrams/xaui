import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'
import type { Curve } from '../../utils/chart-path'
import type { Point, Span } from '../../utils/chart-scale'

export type ChartSlot = 'root' | 'label' | 'grid' | 'axis'

/**
 * The `ProgressBar`'s five, for the `ProgressBar`'s reasons: a chart reports a quantity, so
 * `primary` and `secondary` are its two emphases and the three intents are for when the
 * number itself is the news. `tertiary` and `ghost` are gone — a series with no ink is not
 * a series — and the `*-soft` pairs with them, since a chart's fills are already soft.
 */
export type ChartVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

/** Three. `size` is the plot's **height** and the axis type. Width is the parent's. */
export type ChartSize = Exclude<Size, 'xs'>

/** One row of the caller's data. The keys are theirs; only the y values must be numbers. */
export type ChartDatum = Record<string, unknown>

export type { Curve }

/**
 * The plot's inside, in the coordinates the paths are written in.
 *
 * An SVG rect — `x`, `y`, `width`, `height` — rather than four edges, and deliberately: an
 * SVG coordinate system is not laid out by flexbox and does not mirror under RTL, so naming
 * an edge `left` would promise something the renderer does not do. The far edges are one
 * addition away where a path needs them.
 */
export type ChartFrame = {
  x: number
  y: number
  width: number
  height: number
}

/** One series, scaled and ready to draw. */
export type ChartSeries = {
  /** The key it came from, which is also what a legend prints. */
  key: string
  color: string
  points: Point[]
  /** The raw numbers, in row order, for a component that needs them again. */
  values: number[]
}

/** What the plot hands its children: everything a path needs and nothing it does not. */
export type ChartPlot = {
  frame: ChartFrame
  series: ChartSeries[]
  /** Where a category sits along the bottom, and how wide its slot is. */
  band: { center: (index: number) => number; width: number; step: number }
  /** Maps a value onto the plot's vertical range. */
  scaleY: (value: number) => number
  /** The y domain after it was rounded out to whole steps. */
  domainY: Span
  ticks: number[]
  /** The palette, in `yKeys` order — the same array the series carry. */
  colors: string[]
}

type ChartAxisOwnProps = {
  /** Whether the horizontal rules are drawn behind the series. @default true */
  hasGrid?: boolean
  /** Whether the x labels are drawn under the plot. @default true */
  hasXAxis?: boolean
  /** Whether the y labels are drawn beside it. @default true */
  hasYAxis?: boolean
  /**
   * How many labels the y axis aims for. A **target**, not a count: the step lands on a
   * number a reader recognises and how many of those fit is then arithmetic. @default 4
   */
  tickCount?: number
  /**
   * How many x labels to draw. A dozen months under a phone-wide plot is a smear, so every
   * nth row is labelled and the rest are not. @default every label that fits
   */
  xLabelCount?: number
  /** How an x value reads under the plot. Unset, it is written as it comes. */
  formatX?: (value: unknown, index: number) => string
  /** How a y value reads beside it — `$10k`, `60 %`. */
  formatY?: (value: number) => string
  /** Whether the y axis starts at zero rather than at the lowest value. @default true */
  hasZeroBaseline?: boolean
}

export type ChartPlotOwnProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = ChartAxisOwnProps & {
  /** The rows. An empty list draws the axes and nothing else, rather than nothing at all. */
  data: ReadonlyArray<Data>
  /** Which key runs along the bottom. */
  xKey: XK
  /** Which keys are the series, in the order the palette walks them. */
  yKeys: ReadonlyArray<YK>
  variant?: ChartVariant
  /** The plot's height and the axis type. Never its width. */
  size?: ChartSize
  /** A raw tint (R7), never a token. The palette is walked out of it. */
  color?: string
  /**
   * Where a reading sits along the bottom.
   *
   * `point` puts the first and last on the plot's edges, which is what a line connecting
   * readings does. `band` gives each one a slot and centres it, which is what a bar
   * occupies. A line inset by half a slot reads as cut off; a bar on the edge is half
   * outside the plot. @default 'point'
   */
  spacing?: 'point' | 'band'
  /** The share of a slot left empty either side of a bar. Only read under `band`. @default 0 */
  bandPadding?: number
  /** Dims the plot. There is nothing to press unless a caller adds it. */
  isDisabled?: boolean
  /** The scaled series, the frame and the scales. */
  children: (plot: ChartPlot) => ReactNode
  style?: StyleProp<ViewStyle>
}

/** R14 — its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ChartPlotProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = ChartPlotOwnProps<Data, XK, YK> &
  Omit<ViewProps, keyof ChartPlotOwnProps<Data, XK, YK>> &
  Omit<ViewStyleProps, keyof ChartPlotOwnProps<Data, XK, YK> | keyof ViewProps>

/**
 * What a chart passes through to the plot, and what its own props are made of: everything
 * above except the render function, which the chart writes itself.
 */
export type ChartSeriesProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = Omit<ChartPlotProps<Data, XK, YK>, 'children' | 'spacing' | 'bandPadding'>

/** The resolved values the plot paints with. SVG takes colours as props, not as styles. */
export type ChartInk = {
  labelColor: string
  labelSize: number
  gridColor: string
  axisColor: string
  labelStyle: StyleProp<TextStyle>
}
