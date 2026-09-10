/**
 * The thumb's motion.
 *
 * It grows a little under the finger, the only confirmation the control can give that the
 * drag has taken — the finger is already over the disc, so the scale is what shows in the
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
