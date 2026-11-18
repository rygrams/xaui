/** The three places something floats at: along the bottom edge, `start` and `end` (RTL). */
export type FloatPlacement = 'bottom-start' | 'bottom-center' | 'bottom-end'

export type FloatPlace =
  | { alignSelf: 'flex-start' }
  | { position: 'absolute'; bottom: number; alignSelf: 'center' }
  | { position: 'absolute'; bottom: number; start: number }
  | { position: 'absolute'; bottom: number; end: number }

/**
 * Where a floating control is laid: pinned to the bottom of its nearest positioned
 * ancestor, `offset` points in from the bottom edge and from the side it is on — `start`
 * and `end`, never left and right. The centre is `alignSelf`, because a `start: '50%'`
 * would centre the box's edge rather than the box.
 *
 * With no placement it stays in the flow, hugging its content.
 */
export function floatPlace(
  placement: FloatPlacement | undefined,
  offset: number
): FloatPlace {
  if (placement === undefined) return { alignSelf: 'flex-start' }
  if (placement === 'bottom-center') {
    return { position: 'absolute', bottom: offset, alignSelf: 'center' }
  }

  return placement === 'bottom-end'
    ? { position: 'absolute', bottom: offset, end: offset }
    : { position: 'absolute', bottom: offset, start: offset }
}

/**
 * How far below its place a floating control `height` points tall starts from, and leaves
 * to: just past the bottom edge it is pinned `offset` points from. In the flow there is no
 * edge, and it travels its own height.
 */
export function floatTravel(
  placement: FloatPlacement | undefined,
  offset: number,
  height: number
): number {
  'worklet'
  return placement === undefined ? height : height + Math.max(0, offset)
}
