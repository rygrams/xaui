import {
  bandScale,
  extent,
  linearScale,
  niceScale,
  pointScale,
} from '@xaui/native/system'
import type { Span } from '@xaui/native/system'
import type { ChartDatum, ChartPlot } from './chart.type'

/**
 * How much room the labels get, in points — Native's. The labels are React Native beside
 * the canvas, so the plot reserves their room before either is laid out.
 */
export const Y_AXIS_WIDTH = 40
export const X_AXIS_HEIGHT = 20

/** The space between a y label and the plot. */
export const Y_LABEL_GAP = 6

/** Air above the tallest point, so a line at the domain's top does not touch the edge. */
const TOP_PADDING = 8

/** The least room an x label is given before every nth row goes unlabelled. */
const X_LABEL_ROOM = 56

export type PlotLayoutArgs = {
  data: ReadonlyArray<ChartDatum>
  yKeys: ReadonlyArray<string>
  colors: ReadonlyArray<string>
  width: number
  height: number
  hasXAxis: boolean
  hasYAxis: boolean
  hasZeroBaseline: boolean
  tickCount: number
  spacing: 'point' | 'band'
  bandPadding: number
}

/**
 * The plot's frame, scales and scaled series — everything `ChartPlot` hands its render
 * function — or `null` until the box has been measured.
 *
 * The domain is Native's `niceScale`, widened to steps a reader recognises and, unless the
 * caller says otherwise, down to zero: a bar read from its own minimum lies about its
 * proportions. A reading that is not a number sits on the domain's floor.
 */
export function plotLayout(args: PlotLayoutArgs): ChartPlot | null {
  const { data, yKeys, colors, width, height } = args
  if (width <= 0 || height <= 0) return null

  const inset = args.hasYAxis ? Y_AXIS_WIDTH : 0
  const floor = height - (args.hasXAxis ? X_AXIS_HEIGHT : 0)
  const frame = {
    x: inset,
    y: TOP_PADDING,
    width: Math.max(width - inset, 0),
    height: Math.max(floor - TOP_PADDING, 0),
  }

  const values = yKeys.flatMap(key => data.map(row => Number(row[key])))
  const [low, high] = extent(values)
  const { domain, ticks } = niceScale(
    args.hasZeroBaseline ? Math.min(0, low) : low,
    high,
    args.tickCount
  )

  const scaleY = linearScale(domain, [frame.y + frame.height, frame.y])
  const along: Span = [frame.x, frame.x + frame.width]
  const band =
    args.spacing === 'band'
      ? bandScale(data.length, along, args.bandPadding)
      : pointScale(data.length, along)

  const series = yKeys.map((key, index) => {
    const rows = data.map(row => Number(row[key]))

    return {
      key,
      color: colors[index] ?? colors[0] ?? '',
      values: rows,
      points: rows.map((value, rowIndex) => ({
        x: band.center(rowIndex),
        y: scaleY(Number.isFinite(value) ? value : domain[0]),
      })),
    }
  })

  return {
    frame,
    series,
    band,
    scaleY,
    domainY: domain,
    ticks,
    colors: [...colors],
  }
}

/**
 * Where the zero axis is drawn: at zero when the domain holds it, otherwise on the edge
 * nearest to it — the floor of a domain that starts above zero.
 */
export function axisValue(domain: Span): number {
  const [low, high] = domain
  return Math.min(Math.max(0, low), high)
}

/** Every nth row is labelled, so a dozen months under a phone-wide plot is not a smear. */
export function xLabelEvery(count: number, width: number, wanted?: number): number {
  if (count <= 0) return 1

  const fits = wanted ?? Math.max(1, Math.floor(width / X_LABEL_ROOM))
  return Math.max(1, Math.ceil(count / Math.max(fits, 1)))
}

/**
 * A label's box in the plot's own coordinates, which run left to right — the SVG's; the
 * plot sits in `SVG_FRAME` so `start` and `align` read the same way under RTL.
 */
export type LabelBox = {
  start: number
  width: number
  /** Where the text sits in its box: against its start, centred, or against its end. */
  align: 'start' | 'center' | 'end'
}

export type LabelBoxArgs = {
  /** Where the reading sits along the bottom. */
  center: number
  /** The room between two labelled readings: a step times how many rows one skips. */
  room: number
  index: number
  count: number
  spacing: 'point' | 'band'
}

/**
 * The box an x label is written in.
 *
 * Centred on its reading, as in Native — except, under `point` spacing, the first and the
 * last: those readings sit on the plot's edges, and a centred label there is half outside
 * the plot. They hang from their reading toward the inside instead, as the drawing does.
 */
export function xLabelBox({
  center,
  room,
  index,
  count,
  spacing,
}: LabelBoxArgs): LabelBox {
  if (spacing === 'point' && count > 1) {
    if (index === 0) return { start: center, width: room, align: 'start' }
    if (index === count - 1) {
      return { start: center - room, width: room, align: 'end' }
    }
  }

  return { start: center - room / 2, width: room, align: 'center' }
}

/** The prefix a stacked series' running total is written under in the copied rows. */
const STACK_PREFIX = 'xauiStack:'

/** The key a stacked series is drawn under. */
export function stackKeys(keys: ReadonlyArray<string>): string[] {
  return keys.map(key => `${STACK_PREFIX}${key}`)
}

/**
 * Each row with a running total per series added to it, so the plot's domain reaches the
 * top of the stack. A copy, always: the rows are the caller's. A reading that is not a
 * number adds nothing.
 */
export function stackRows(
  data: ReadonlyArray<ChartDatum>,
  keys: ReadonlyArray<string>
): ChartDatum[] {
  return data.map(row => {
    const next: ChartDatum = { ...row }
    let total = 0

    for (const key of keys) {
      const value = Number(row[key])
      total += Number.isFinite(value) ? value : 0
      next[`${STACK_PREFIX}${key}`] = total
    }

    return next
  })
}
