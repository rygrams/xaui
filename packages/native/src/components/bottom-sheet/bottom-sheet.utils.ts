import type { ViewStyle } from 'react-native'

/** Where a sheet can come to rest. `closed` is a state the sheet leaves in, not one it sits in. */
export type SheetState = 'expanded' | 'collapsed' | 'closed'

export type SheetGeometry = {
  /** What the sheet measured itself at — its full content height. */
  height: number
  /** How much of it shows when reduced. `undefined` means the sheet has no reduced state. */
  collapsedHeight?: number
}

/**
 * How far down the sheet sits in a given state.
 *
 * The sheet is always laid out at its full height and moved: `expanded` is where it was
 * measured, `closed` is one whole height below that, and `collapsed` is the difference —
 * which is why a reduced sheet clips its own tail off the bottom of the screen rather than
 * re-laying anything out. Nothing re-measures when the state changes.
 */
export function sheetOffset(state: SheetState, geometry: SheetGeometry): number {
  const { height, collapsedHeight } = geometry

  if (state === 'closed') return height
  if (state === 'expanded' || collapsedHeight === undefined) return 0

  // Clamped: a `collapsedHeight` taller than the sheet is not a reduced state, it is the
  // sheet — and a negative offset would lift it off the bottom of the screen.
  return Math.max(height - collapsedHeight, 0)
}

/**
 * The padding a reduced sheet has to keep under its seam.
 *
 * Read off the resolved style rather than off the recipe, so a caller who overrode the
 * sheet's padding gets a seam that matches what they see. A percentage is not a number of
 * points and there is nothing to add, so it counts as none.
 */
export function paddingUnderSeam(style: ViewStyle): number {
  const value = style.paddingBottom ?? style.paddingVertical ?? style.padding

  return typeof value === 'number' ? value : 0
}

/**
 * How much of the sheet shows when reduced.
 *
 * A `Summary` reports **where its bottom edge falls**, and the sheet's own bottom padding
 * is added back onto it. Without that the visible slice ends on the summary's last pixel:
 * twenty points of air above the handle, none at all under the last line, and on a phone
 * with gesture navigation the system bar sitting on the text.
 *
 * `collapsedHeight` gets no such treatment. It is a number the caller wrote against a
 * sheet they were looking at, and "two hundred points show" has to mean two hundred.
 */
export function collapsedExtent(
  summaryExtent: number | undefined,
  paddingBottom: number,
  collapsedHeight: number | undefined
): number | undefined {
  if (summaryExtent === undefined) return collapsedHeight

  return summaryExtent + paddingBottom
}

type Release = {
  from: SheetState
  translationY: number
  velocityY: number
  /** Seconds of travel to credit the throw with, so a flick lands where it was going. */
  projection: number
  /** Fraction of the sheet's height a drag must cover to count, absent the velocity. */
  dismissThreshold: number
  /** Points a second that count on their own, whatever the distance. */
  dismissVelocity: number
}

/**
 * Where the sheet goes when the finger lifts.
 *
 * **A drag that was not decisive puts it back**, whatever distance it covered — the sheet
 * springs home rather than creeping to a new state a hesitant gesture never asked for.
 * Decisive is far enough *or* fast enough, and either alone is sufficient: a flick from the
 * top of a tall sheet has not covered a third of it however clearly it meant to.
 *
 * Decisive downward moves one state down — expanded to collapsed, collapsed to closed —
 * unless the throw is heading past the collapsed position entirely, in which case it skips
 * to closed. That is the one thing a strict one-state-per-gesture rule gets wrong: dragging
 * a sheet the whole way to the bottom and having it stop half open reads as a refusal.
 *
 * Decisive upward only ever expands, because there is nothing above expanded.
 */
export function nextSheetState(
  release: Release,
  geometry: SheetGeometry
): SheetState {
  const { from, translationY, velocityY, projection } = release
  const { height, collapsedHeight } = geometry

  const farEnough = Math.abs(translationY) > height * release.dismissThreshold
  const fastEnough = Math.abs(velocityY) > release.dismissVelocity
  if (!farEnough && !fastEnough) return from

  if (translationY < 0) return 'expanded'

  // No reduced state: the sheet has only somewhere to go, and it is away.
  if (collapsedHeight === undefined) return 'closed'
  if (from === 'collapsed') return 'closed'

  // Where the throw is heading, not where the finger stopped. Past the collapsed resting
  // place by half of what is left means it was aimed at the bottom, not at the notch.
  const released = sheetOffset(from, geometry) + translationY
  const projected = released + velocityY * projection
  const collapsed = sheetOffset('collapsed', geometry)

  return projected > collapsed + (height - collapsed) / 2 ? 'closed' : 'collapsed'
}
