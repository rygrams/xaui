import type { ViewStyle } from 'react-native'
import type { SheetState } from './bottom-sheet.type'

export type SheetGeometry = {
  /** What the band measured itself at — its full content height. */
  height: number
  /** How much of it shows when reduced. `undefined`: the band has no reduced state. */
  collapsedHeight?: number
}

/**
 * Seconds of travel credited to a throw when deciding where it was aimed. It only matters
 * on a band that can be reduced, where letting go has three answers rather than two: a
 * hard flick from the top is heading past the reduced notch, and the finger's position
 * alone would stop it there.
 */
export const THROW_PROJECTION = 0.15

/**
 * How far down the band sits in a given state, in points.
 *
 * The band is always laid out at its full height and moved: `expanded` is where it was
 * measured, `closed` one whole height below, `collapsed` the difference — so a reduced
 * band clips its own tail off the bottom of the screen rather than being laid out again.
 */
export function sheetOffset(state: SheetState, geometry: SheetGeometry): number {
  const { height, collapsedHeight } = geometry

  if (state === 'closed') return height
  if (state === 'expanded' || collapsedHeight === undefined) return 0

  // A `collapsedHeight` taller than the band is not a reduced state, it is the band — and
  // a negative offset would lift it off the bottom of the screen.
  return Math.max(height - collapsedHeight, 0)
}

/**
 * The padding a reduced band keeps under its seam, read off the resolved style so that a
 * caller who overrode it gets a seam that matches what they see. A percentage is not a
 * number of points, so it counts as none.
 */
export function paddingUnderSeam(style: ViewStyle): number {
  const value = style.paddingBottom ?? style.paddingVertical ?? style.padding

  return typeof value === 'number' ? value : 0
}

/**
 * How much of the band shows when reduced. A `Summary` reports where its bottom edge
 * falls, and the band's own bottom padding is added back onto it, so a reduced band ends
 * with the air its expanded self has. `collapsedHeight` is taken as written.
 */
export function collapsedExtent(
  summaryExtent: number | undefined,
  paddingBottom: number,
  collapsedHeight: number | undefined
): number | undefined {
  if (summaryExtent === undefined) return collapsedHeight

  return summaryExtent + paddingBottom
}

export type SheetRelease = {
  from: SheetState
  translationY: number
  velocityY: number
  /** Seconds of travel to credit the throw with, so a flick lands where it was going. */
  projection: number
  /** Fraction of the band's height a drag must cover to count, absent the velocity. */
  dismissThreshold: number
  /** Points a second that count on their own, whatever the distance. */
  dismissVelocity: number
}

/**
 * Where the band goes when the finger lifts.
 *
 * A drag that was not decisive — neither far enough nor fast enough — puts it back.
 * Decisive downward moves one state down, expanded to reduced to closed, unless the throw
 * is heading past the reduced resting place by half of what is left, in which case it
 * closes. Decisive upward only ever expands: there is nothing above full height.
 */
export function nextSheetState(
  release: SheetRelease,
  geometry: SheetGeometry
): SheetState {
  const { from, translationY, velocityY, projection } = release
  const { height, collapsedHeight } = geometry

  const farEnough = Math.abs(translationY) > height * release.dismissThreshold
  const fastEnough = Math.abs(velocityY) > release.dismissVelocity
  if (!farEnough && !fastEnough) return from

  if (translationY < 0) return 'expanded'
  if (collapsedHeight === undefined || from === 'collapsed') return 'closed'

  const released = sheetOffset(from, geometry) + translationY
  const projected = released + velocityY * projection
  const collapsed = sheetOffset('collapsed', geometry)

  return projected > collapsed + (height - collapsed) / 2 ? 'closed' : 'collapsed'
}

/**
 * Where a drag puts the band, `dy` points from where it rests at `resting`: never above
 * full height — a band at the top has nowhere to go — and never further than gone.
 */
export function draggedOffset(resting: number, dy: number, height: number): number {
  'worklet'
  return Math.min(Math.max(resting + dy, 0), Math.max(height, 0))
}

/**
 * How much of its dimming the page behind keeps while the band sits at `offset`: all of
 * it from the lowest open resting place up, none once the band is gone, and in proportion
 * in between — so the page lightens at the pace of a finger sending the band away.
 */
export function sheetShade(offset: number, height: number, lowest: number): number {
  'worklet'
  const travel = height - lowest
  if (travel <= 0) return offset >= height ? 0 : 1

  return Math.min(1, Math.max(0, (height - offset) / travel))
}
