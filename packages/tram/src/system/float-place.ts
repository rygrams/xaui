/** The three places along a bottom bar something sits at: `start` and `end` (RTL). */
export type FloatPlacement = 'bottom-start' | 'bottom-center' | 'bottom-end'

/** The edge of the screen a bar is docked on. */
export type DockEdge = 'top' | 'bottom'

/** What a docked bar is placed by: an edge, or a place along the bottom one. */
export type DockPlacement = FloatPlacement | DockEdge

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

/**
 * The edge a placement docks a bar on: the top one for `top`, the bottom one for the
 * rest. A bar comes in from that edge and leaves by it.
 */
export function dockEdge(placement: DockPlacement): DockEdge {
  return placement === 'top' ? 'top' : 'bottom'
}
