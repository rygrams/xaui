import type { ReactNode } from 'react'
import type { StyleProp, TextProps, ViewProps, ViewStyle } from 'react-native'
import type {
  AsChildProps,
  Curve,
  Point,
  Span,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type ChartSlot =
  | 'root'
  | 'plot'
  | 'label'
  | 'grid'
  | 'axis'
  | 'header'
  | 'heading'
  | 'footer'
  | 'title'
  | 'description'
  | 'value'
  | 'legend'
  | 'legendItem'
  | 'legendDot'
  | 'legendLabel'

/** Three. `size` is the plot's **height** — 140, 200, 280. Width is the parent's. */
export type ChartSize = TramSize

/** One row of the caller's data. The keys are theirs; only the y values must be numbers. */
export type ChartDatum = Record<string, unknown>

export type { Curve }

/**
 * The plot's inside, in the coordinates the paths are written in: an SVG rect, which does
 * not mirror under RTL, so no edge is named `left`.
 */
export type ChartFrame = {
  x: number
  y: number
  width: number
  height: number
}

/** One series, scaled and ready to draw. */
export type ChartSeries = {
  /** The key it came from. */
  key: string
  color: string
  points: Point[]
  /** The raw numbers, in row order. */
  values: number[]
}

/** Where a category sits along the bottom, and how wide its slot is. */
export type ChartBand = {
  center: (index: number) => number
  width: number
  step: number
}

/** What the plot hands its children: everything a path needs and nothing it does not. */
export type ChartPlot = {
  frame: ChartFrame
  series: ChartSeries[]
  band: ChartBand
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
  /** Whether the x labels and the zero axis are drawn. @default true */
  hasXAxis?: boolean
  /** Whether the y labels are drawn beside the plot. @default true */
  hasYAxis?: boolean
  /** How many labels the y axis aims for. A target, not a count. @default 4 */
  tickCount?: number
  /** How many x labels to draw. @default every label that fits */
  xLabelCount?: number
  /** How an x value reads under the plot. Unset, it is written as it comes. */
  formatX?: (value: unknown, index: number) => string
  /** How a y value reads beside it — `10k`, `60 %`. */
  formatY?: (value: number) => string
  /** Whether the y axis starts at zero rather than at the lowest value. @default true */
  hasZeroBaseline?: boolean
}

export type ChartPlotOwnProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = ChartAxisOwnProps & {
  /** The rows. An empty list draws the axes and nothing else. */
  data: ReadonlyArray<Data>
  /** Which key runs along the bottom. */
  xKey: XK
  /** Which keys are the series, in the order the palette walks them. */
  yKeys: ReadonlyArray<YK>
  /**
   * One of the twenty named accents — the palette's seed. The three intents are accent
   * names: `green`, `amber`, `red`. `color` wins when both are set.
   */
  accent?: TramAccentName
  /** The plot's height. Never its width. */
  size?: ChartSize
  /** A raw tint, never a token. The palette is walked out of it. */
  color?: string
  /**
   * Where a reading sits along the bottom: `point` puts the first and last on the plot's
   * edges (a line), `band` centres each in a slot (a bar). @default 'point'
   */
  spacing?: 'point' | 'band'
  /** The share of a slot left empty either side of a bar. Only read under `band`. @default 0 */
  bandPadding?: number
  /** Dims the plot. */
  isDisabled?: boolean
  /** The scaled series, the frame and the scales. */
  children: (plot: ChartPlot) => ReactNode
  style?: StyleProp<ViewStyle>
}

/** Its own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ChartPlotProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = ChartPlotOwnProps<Data, XK, YK> &
  Omit<ViewProps, keyof ChartPlotOwnProps<Data, XK, YK>> &
  Omit<ViewStyleProps, keyof ChartPlotOwnProps<Data, XK, YK> | keyof ViewProps>

/** What a figure passes through to the plot: everything above but the render function. */
export type ChartSeriesProps<
  Data extends ChartDatum,
  XK extends keyof Data & string,
  YK extends keyof Data & string,
> = Omit<ChartPlotProps<Data, XK, YK>, 'children' | 'spacing' | 'bandPadding'>

type ChartFrameOwnProps = {
  /** One of the twenty named accents: the palette the figure and the legend both read. */
  accent?: TramAccentName
  /** The figure's height. The words around it keep their roles at every size. */
  size?: ChartSize
  /** A raw tint. It wins over `accent`. */
  color?: string
  /**
   * How many series the figure inside draws. The frame cannot count them, and a legend
   * needs the palette walked to the right length.
   */
  seriesCount?: number
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** The frame's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ChartFrameProps = ChartFrameOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ChartFrameOwnProps> &
  Omit<ViewStyleProps, keyof ChartFrameOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name. */
export type ChartViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type ChartTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type ChartLegendOwnProps = {
  /** The short form: one entry per label, coloured in palette order. */
  labels?: ReadonlyArray<string>
  /**
   * The appearance to walk the palette from, for a legend **outside** a `<Chart>`. They
   * have to be the figure's, or the legend names the wrong colours. Inside a frame the
   * frame wins.
   */
  accent?: TramAccentName
  size?: ChartSize
  color?: string
  /** How many series the ramp has. Defaults to the number of labels, or of children. */
  count?: number
  children?: ReactNode
}

export type ChartLegendProps = ChartLegendOwnProps &
  Omit<ViewProps, keyof ChartLegendOwnProps> &
  Omit<ViewStyleProps, keyof ChartLegendOwnProps | keyof ViewProps>

type ChartLegendItemOwnProps = {
  /** Which series it stands for — the index the figure walked its `yKeys` in. */
  index?: number
  /** A colour of its own, for an entry the palette does not cover. */
  color?: string
  children?: ReactNode
}

export type ChartLegendItemProps = ChartLegendItemOwnProps &
  Omit<ViewProps, keyof ChartLegendItemOwnProps> &
  Omit<ViewStyleProps, keyof ChartLegendItemOwnProps | keyof ViewProps>

/** The resolved values the plot paints with. SVG takes colours as props, not as styles. */
export type ChartInk = {
  labelColor: string
  labelSize: number
  gridColor: string
  axisColor: string
}
