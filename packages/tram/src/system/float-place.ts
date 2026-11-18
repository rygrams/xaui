/** The three places along a bottom bar something sits at: `start` and `end` (RTL). */
export type FloatPlacement = 'bottom-start' | 'bottom-center' | 'bottom-end'

export type DockAlign = 'flex-start' | 'center' | 'flex-end'

/**
 * Where a control sits across the bar docked at the bottom of the screen: at its start,
 * in its middle, or at its end. Flex alignment follows the layout direction, so `start`
 * is on the right in a right-to-left layout with no second branch — and no left or right.
 */
export function dockAlign(placement: FloatPlacement): DockAlign {
  if (placement === 'bottom-center') return 'center'
  return placement === 'bottom-end' ? 'flex-end' : 'flex-start'
}
