import type { ViewStyle } from 'react-native'
import type { BadgePlacement } from './badge.type'

/**
 * `placement` turned into the four keys React Native understands, given how far the badge
 * has to be pulled out of the corner it marks.
 *
 * A pure function rather than a lookup in the recipe, because the insets must **not** exist
 * when there is no placement: in flow the node is `position: 'relative'`, where an inset is
 * a nudge rather than a placement, and a cached style carrying `top: -10` would shift every
 * badge that is simply sitting at the end of a row.
 *
 * R13 — `start` and `end`, never `left` and `right`, so a badge on the trailing corner
 * mirrors with the layout instead of staying put.
 */
export function placementInsets(
  placement: BadgePlacement | undefined,
  offset: number
): ViewStyle | undefined {
  if (!placement) return undefined

  // Written out rather than built from computed keys: a computed key widens to `string`,
  // and `ViewStyle` would then accept a typo for an inset that simply never applies.
  const vertical: ViewStyle = placement.startsWith('top')
    ? { top: -offset }
    : { bottom: -offset }

  const horizontal: ViewStyle = placement.endsWith('start')
    ? { start: -offset }
    : { end: -offset }

  return { position: 'absolute', ...vertical, ...horizontal }
}
