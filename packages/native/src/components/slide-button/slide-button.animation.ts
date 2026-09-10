/**
 * The thumb's motion.
 *
 * It grows a little under the finger, the only confirmation the control can give that the
 * drag has taken — the finger is already over the handle, so the scale is what shows in the
 * ring of pill around it. The `Slider`'s knob does the same.
 */
export const THUMB_PRESSED_SCALE = 1.06

/**
 * How the thumb settles when the finger lifts — springing home if the slide fell short,
 * or on to the end if it did not. Stiff and well damped: a confirmation arrives, it does
 * not wobble.
 */
export const THUMB_SPRING = { damping: 20, stiffness: 260, mass: 0.7 } as const

/** How far along the track the thumb must reach for the slide to count, from 0 to 1. */
export const DEFAULT_THRESHOLD = 0.9

/**
 * How much of the pill the slide has swept, in points — the trail's width, and the width
 * of the clip the swept label is read through.
 *
 * It is the fraction of the travel laid over the **whole** pill rather than the handle's
 * raw offset, because the handle stops a handle's width short of the trailing cap and a
 * trail that stopped with it would leave a confirmed slide showing unswept pill.
 *
 * The two callers have to agree to the point: the trail paints the swept ground and the
 * clip decides which half of a straddling word is painted for it. Two expressions of the
 * same edge would eventually drift, so there is one.
 */
export function sweptWidth(offset: number, travel: number, trackLength: number) {
  'worklet'
  return travel > 0 ? (offset / travel) * trackLength : 0
}
