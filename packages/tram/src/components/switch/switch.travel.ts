/**
 * Where the thumb is and what that fills — the arithmetic of the switch, kept apart from
 * the views that draw it. Every function is a worklet: they run in the animated styles and
 * in the pan, on the UI thread.
 *
 * `progress` is the thumb's place along its travel, 0 at the start and 1 at the end. A
 * spring carries it a little past either one; the drawing never follows it there.
 */

/** The four numbers of the drawing the travel depends on. */
export type TravelGeometry = {
  /** The track's outer width. */
  width: number
  /** From the track's outer edge to the fill. */
  inset: number
  thumbWidth: number
}

/** How far the finger moves sideways before a press becomes a drag. */
export const DRAG_SLOP = 6

function clamp(value: number, min: number, max: number): number {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

/** From the thumb flush at the start to the thumb flush at the end. */
export function travelOf(geometry: TravelGeometry): number {
  'worklet'
  return Math.max(geometry.width - geometry.thumbWidth, 0)
}

/** The thumb's distance from the start. It stops at the ends, whatever the spring does. */
export function thumbOffset(progress: number, geometry: TravelGeometry): number {
  'worklet'
  return clamp(progress, 0, 1) * travelOf(geometry)
}

/**
 * The accent's width: from the inset to the **middle of the thumb**, so the thumb always
 * stands half on the colour. At rest it is a sliver hidden under the thumb.
 */
export function fillWidth(progress: number, geometry: TravelGeometry): number {
  'worklet'
  const middle = thumbOffset(progress, geometry) + geometry.thumbWidth / 2

  return Math.max(middle - geometry.inset, 0)
}

/**
 * The progress of a thumb picked up at `from` and dragged `translation` points toward the
 * end. A track with no travel has nowhere to go.
 */
export function dragProgress(
  from: number,
  translation: number,
  geometry: TravelGeometry
): number {
  'worklet'
  const travel = travelOf(geometry)
  if (travel === 0) return clamp(from, 0, 1)

  return clamp(from + translation / travel, 0, 1)
}

/** What a thumb let go at `progress` settles on: on, once it is past the half. */
export function isOnAt(progress: number): boolean {
  'worklet'
  return progress > 0.5
}
