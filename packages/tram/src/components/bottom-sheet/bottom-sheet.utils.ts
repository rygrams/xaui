import type { ViewStyle } from 'react-native'

/**
 * The padding the band ends with, read off the resolved style so that a caller who
 * overrode it keeps it under the home indicator's inset. A percentage is not a number of
 * points, so it counts as none.
 */
export function paddingBelow(style: ViewStyle): number {
  const value = style.paddingBottom ?? style.paddingVertical ?? style.padding

  return typeof value === 'number' ? value : 0
}

export type SheetRelease = {
  translationY: number
  velocityY: number
  /** The band's measured height, in points. */
  height: number
  /** Fraction of the band's height a drag must cover to count, absent the velocity. */
  dismissThreshold: number
  /** Points a second that count on their own, whatever the distance. */
  dismissVelocity: number
}

/**
 * Whether letting go sends the band away. Only a drag **down** does, and only a
 * decisive one — far enough or fast enough; anything else springs it back up. The band
 * has one height, so there is nowhere else to go.
 */
export function isDismissed(release: SheetRelease): boolean {
  const { translationY, velocityY, height } = release
  if (translationY <= 0) return false

  return (
    translationY > height * release.dismissThreshold ||
    velocityY > release.dismissVelocity
  )
}

/**
 * Where a drag puts the band, `dy` points from where it rests at `resting`: never above
 * its height — a band at the top has nowhere to go — and never further than gone.
 */
export function draggedOffset(resting: number, dy: number, height: number): number {
  'worklet'
  return Math.min(Math.max(resting + dy, 0), Math.max(height, 0))
}

/**
 * How much of its dimming the page behind keeps while the band sits at `offset`: all of
 * it while the band is up, none once it is gone, and in proportion in between — so the
 * page lightens at the pace of a finger sending the band away.
 */
export function sheetShade(offset: number, height: number): number {
  'worklet'
  if (height <= 0) return 1

  return Math.min(1, Math.max(0, (height - offset) / height))
}
