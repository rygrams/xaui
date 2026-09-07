/**
 * Where the rings sit, and how thick they are.
 *
 * Pure, because a ring half a stroke outside its own box is clipped rather than wrong: the
 * arc still draws, it is just missing its outer edge, and that is a defect you cannot see
 * in a screenshot of a chart you have not seen before. It needs a table of inputs and
 * outputs, which is what a test is.
 */

/** What the caller asked for, before anything is clamped to fit. */
export type RadialBox = {
  /** The square the whole figure is drawn in. */
  diameter: number
  /** How many rings there are. */
  count: number
  /** How thick each one is asked to be, in points. */
  thickness: number
  /** How much bare ground is left between two of them, in points. */
  gap: number
}

/** One ring, in the coordinates an SVG circle is written in. */
export type RadialRing = {
  /** The path's own radius — the stroke is centred on it, so this is its middle. */
  radius: number
  /** How long that path is, and therefore what a dash offset is measured against. */
  circumference: number
}

/** Every ring shares a thickness: rings of different weights read as different charts. */
export type RadialGeometry = { strokeWidth: number; rings: RadialRing[] }

/** Below this a ring is a hairline that reads as an artefact rather than as a series. */
const MIN_THICKNESS = 1

/**
 * The rings, outermost first, all of them inside the box.
 *
 * **Everything is clamped to the room there actually is**, rather than trusted. The stroke
 * is centred on the path, so a ring drawn at the box's own radius loses its outer half to
 * the canvas edge — and six series at the default thickness ask for more room than a phone
 * -sized figure has. What gives is the thickness, because the alternative is a chart that
 * silently drops its innermost rings.
 *
 * **The gap can take at most half the room.** Past that a chart of several series is mostly
 * bare ground, and the rings it is separating have gone to nothing.
 */
export function radialRings({
  diameter,
  count,
  thickness,
  gap,
}: RadialBox): RadialGeometry {
  const rings = Math.max(Math.floor(count), 0)
  const span = diameter / 2

  if (rings === 0 || span <= 0) return { strokeWidth: 0, rings: [] }

  const spacing = clamp(gap, 0, span / (2 * rings))
  // What is left for the ink once the gaps have taken theirs. The clamp above is what
  // keeps this above zero, whatever the caller asked for.
  const room = span - spacing * (rings - 1)
  const strokeWidth = clamp(thickness, MIN_THICKNESS, room / rings)

  return {
    strokeWidth,
    rings: Array.from({ length: rings }, (_, index) => {
      // The outermost ring's centre line sits half a stroke inside the box, and each ring
      // after it a whole stroke and a gap further in.
      const radius = span - strokeWidth / 2 - index * (strokeWidth + spacing)

      return { radius, circumference: 2 * Math.PI * radius }
    }),
  }
}

function clamp(value: number, min: number, max: number): number {
  // A caller can write anything into a raw number prop, `NaN` included, and an SVG radius
  // of `NaN` draws nothing at all with no error on any platform.
  if (!Number.isFinite(value)) return min

  return Math.min(Math.max(value, min), max)
}
