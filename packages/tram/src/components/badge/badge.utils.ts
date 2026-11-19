import type { ViewStyle } from 'react-native'
import type { BadgePlacement } from './badge.type'

/**
 * The corner a placed badge is pinned to. Flush with the parent's edges: Native's badge
 * straddles the corner, half out; a Tram one stays inside the square it counts for, as
 * the count did on a Metro tile.
 */
export function placementInsets(
  placement: BadgePlacement | undefined
): ViewStyle | undefined {
  if (!placement) return undefined

  const vertical: ViewStyle = placement.startsWith('top')
    ? { top: 0 }
    : { bottom: 0 }
  const horizontal: ViewStyle = placement.endsWith('start')
    ? { start: 0 }
    : { end: 0 }

  return { position: 'absolute', ...vertical, ...horizontal }
}
