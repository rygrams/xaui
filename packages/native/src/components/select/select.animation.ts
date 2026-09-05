import { Easing, Keyframe } from 'react-native-reanimated'
import type { SelectPlacement } from './select.type'

/**
 * HeroUI's spring, value for value. Heavily damped against a very high stiffness: the
 * chevron arrives in about a fifth of a second and does not overshoot, which is what a
 * turn of 180 degrees needs — an oscillating chevron reads as a bug rather than as motion.
 */
export const INDICATOR_SPRING = {
  damping: 140,
  stiffness: 1000,
  mass: 4,
} as const

/** Degrees. Down when closed, up when open, turning anticlockwise as HeroUI's does. */
export const INDICATOR_ROTATION = [0, -180] as const

const ENTER_MS = 200
const EXIT_MS = 150

/**
 * The panel grows out of the trigger rather than fading in over it: it starts slightly
 * small and offset **towards** the trigger, so the motion points back at what opened it.
 * A list placed above therefore enters downwards and one placed below enters upwards,
 * which is the only reason placement reaches the animation at all.
 */
export function contentEntering(placement: SelectPlacement) {
  const from = placement === 'bottom' ? -8 : 8

  return new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateY: from }, { scale: 0.95 }],
    },
    100: {
      opacity: 1,
      transform: [{ translateY: 0 }, { scale: 1 }],
      easing: Easing.out(Easing.cubic),
    },
  }).duration(ENTER_MS)
}

/**
 * The mirror, shorter. Closing is an acknowledgement rather than an arrival, and a
 * dismissal that takes as long as the opening feels like the control is arguing.
 */
export function contentExiting(placement: SelectPlacement) {
  const to = placement === 'bottom' ? -8 : 8

  return new Keyframe({
    0: { opacity: 1, transform: [{ translateY: 0 }, { scale: 1 }] },
    100: {
      opacity: 0,
      transform: [{ translateY: to }, { scale: 0.95 }],
      easing: Easing.in(Easing.cubic),
    },
  }).duration(EXIT_MS)
}

export const overlayEntering = new Keyframe({
  0: { opacity: 0 },
  100: { opacity: 1 },
}).duration(ENTER_MS)

export const overlayExiting = new Keyframe({
  0: { opacity: 1 },
  100: { opacity: 0 },
}).duration(EXIT_MS)
