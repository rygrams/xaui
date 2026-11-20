/**
 * Where the thumb is and what that fills — the arithmetic of the slide, kept apart from
 * the views that draw it. Every function is a worklet: they run in the animated styles and
 * in the pan, on the UI thread.
 *
 * Every length is counted from the inside of the box's line, because that is where an
 * absolutely-placed child of a bordered view is laid out from.
 */

/** The two numbers of the drawing the travel depends on. */
export type SlideGeometry = {
  /** From the inside of the line to the thumb, on every side. */
  inset: number
  thumbWidth: number
}

/** How far along the track the thumb must reach for the slide to count — Native's. */
export const DEFAULT_THRESHOLD = 0.9

/** How far the finger moves sideways before a touch on the thumb becomes a drag. */
export const DRAG_SLOP = 6

function clamp(value: number, min: number, max: number): number {
  'worklet'
  return Math.min(Math.max(value, min), max)
}

/**
 * The threshold a caller asked for, made safe: the gesture divides by it and compares
 * against it, so anything outside 0–1 is brought back in and a non-number is the default.
 */
export function thresholdOf(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return DEFAULT_THRESHOLD

  return clamp(value, 0, 1)
}

/** From the thumb at rest to the thumb flush at the far end. Nothing before layout. */
export function travelOf(trackLength: number, geometry: SlideGeometry): number {
  'worklet'
  return Math.max(trackLength - geometry.thumbWidth - 2 * geometry.inset, 0)
}

/**
 * The trail's width: from the start edge to the **middle of the thumb**, so the thumb
 * always stands half on it — the `Switch`'s fill. At rest it is the inset and half the
 * thumb, mostly hidden under it. A spring carrying the thumb past home carries no trail
 * with it.
 */
export function trailWidth(offset: number, geometry: SlideGeometry): number {
  'worklet'
  return geometry.inset + Math.max(offset, 0) + geometry.thumbWidth / 2
}

/**
 * The offset of a thumb picked up at `from` and dragged `translation` points toward the
 * end — held between home and the far end.
 */
export function dragOffset(
  from: number,
  translation: number,
  travel: number
): number {
  'worklet'
  return clamp(from + translation, 0, Math.max(travel, 0))
}

/** Whether a thumb let go at `offset` has come far enough for the slide to count. */
export function hasReached(
  offset: number,
  travel: number,
  threshold: number
): boolean {
  'worklet'
  return travel > 0 && offset >= travel * threshold
}
