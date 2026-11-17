/** Cubic-bezier control points — pass them to `Easing.bezier(...ease.metro)`. */
export const ease = {
  /** Starts fast, brakes hard: the Metro curve, for anything arriving or settling. */
  metro: [0.1, 0.9, 0.2, 1],
  /** Accelerates away: for what leaves the screen (the turnstile out). */
  exit: [0.6, 0, 0.9, 0.4],
} as const

/** Milliseconds. `reduced` is the fade every motion collapses to on request. */
export const duration = {
  fast: 80,
  base: 250,
  slow: 400,
  reduced: 150,
} as const

export const spring = {
  press: { damping: 20, stiffness: 400 },
  navigation: { damping: 22, stiffness: 180 },
  tile: { damping: 18, stiffness: 120 },
} as const

/**
 * How far something shrinks under the finger: a whole control, or the one part of it that
 * is held — the switch's thumb.
 */
export const scale = { press: 0.985, thumb: 0.92 } as const

/**
 * The Metro tilt: a pressed control leans toward the finger, as if pushed in at that
 * point. `degrees` is the lean at an edge; a control wider than `wideFrom` leans by
 * `wideDegrees`, because the same angle on a full-width bar swings its far end too far.
 */
export const tilt = {
  perspective: 600,
  degrees: 6,
  wideDegrees: 3,
  wideFrom: 200,
} as const

export type TramSpringName = keyof typeof spring
