/**
 * The thumb's press.
 *
 * It grows a little under the finger rather than moving, because the finger is already
 * covering it — the scale is what you see in the gap around it, and it is the only
 * confirmation a slider can give that the drag has started.
 */
export const THUMB_PRESSED_SCALE = 1.15

/** Stiff and well damped: a confirmation should arrive, not wobble. */
export const THUMB_SPRING = { damping: 18, stiffness: 320, mass: 0.5 } as const
