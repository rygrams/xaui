import { polarPoint, polygonPath } from './chart-path'
import type { Point } from './chart-scale'

const FULL_TURN = Math.PI * 2

/**
 * How much of the box the labels take, as a fraction of the radius.
 *
 * The web has to shrink to leave room for the names around it, and the room a name needs is
 * its own text width — which is not knowable before it is laid out. A fraction is the honest
 * approximation, and a radar with no labels gets the whole box back.
 */
const LABEL_ROOM = 0.24

/** A name sits just past the web, outside its outermost ring rather than on it. */
const LABEL_REACH = 1.16

/** What a radar is asked to draw. */
export type RadarBox = {
  /** One name per axis, in row order. */
  axes: ReadonlyArray<string>
  /** One list of readings per series, each in axis order. */
  series: ReadonlyArray<ReadonlyArray<number>>
  /** The square the web is drawn in. */
  box: number
  /** Whether room is kept around the web for the axis names. */
  hasLabels: boolean
  /** How many rings. At least one. */
  levels: number
  /**
   * The top of every axis. Unset, it is the highest reading — comparable within one chart,
   * not between two.
   */
  maxValue?: number
}

/** The web, in the coordinates its paths are written in. */
export type RadarWeb = {
  center: Point
  radius: number
  /** One per axis: where its spoke ends, and where its name is centred. */
  spokes: { label: string; end: Point; labelAt: Point }[]
  /** The rings, innermost first, as closed paths. */
  rings: string[]
  /** Each series' polygon and its vertices. */
  series: { d: string; points: Point[] }[]
}

/**
 * The web and the series on it, or `null` under three axes — where there is no polygon.
 *
 * **Every axis shares one scale**, because a radar whose axes were scaled apart would be
 * several charts drawn on top of each other. A reading that is not a number sits at the
 * centre, and a web with no reading above zero keeps its rings with every series at the
 * centre rather than dividing by nothing.
 *
 * The first axis points up and the rest follow clockwise, `polarPoint`'s convention. The
 * edges are always straight: the vertices are the axes, and a curve between two of them
 * would draw a reading on an axis that does not exist.
 */
export function radarWeb({
  axes,
  series,
  box,
  hasLabels,
  levels,
  maxValue,
}: RadarBox): RadarWeb | null {
  const count = axes.length
  if (count < 3) return null

  const center = { x: box / 2, y: box / 2 }
  const radius = (box / 2) * (hasLabels ? 1 - LABEL_ROOM : 1)
  const rings = Math.max(Math.floor(levels), 1)
  const readings = series.flatMap(values => values.filter(Number.isFinite))
  const top = maxValue ?? Math.max(...readings, 0)
  const scale = top > 0 ? radius / top : 0
  const angleOf = (index: number) => (index / count) * FULL_TURN

  return {
    center,
    radius,
    spokes: axes.map((label, index) => ({
      label,
      end: polarPoint(center, radius, angleOf(index)),
      labelAt: polarPoint(center, radius * LABEL_REACH, angleOf(index)),
    })),
    rings: Array.from({ length: rings }, (_, level) =>
      polygonPath(
        axes.map((_, index) =>
          polarPoint(center, (radius * (level + 1)) / rings, angleOf(index))
        )
      )
    ),
    series: series.map(values => {
      const points = axes.map((_, index) => {
        const value = values[index]
        return polarPoint(
          center,
          (Number.isFinite(value) ? value : 0) * scale,
          angleOf(index)
        )
      })

      return { d: polygonPath(points), points }
    }),
  }
}
