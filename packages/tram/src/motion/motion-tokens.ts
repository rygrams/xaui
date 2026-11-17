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
  /** A page turning in on its top edge: longer than `base`, because it crosses the screen. */
  swivel: 350,
  slow: 400,
  reduced: 150,
} as const

/**
 * The design's springs, for a mass of 1 — which is written on each, because the bounce
 * depends on it and Reanimated's own default is 4. At 4 these numbers damp half as much:
 * `press` rings for a second and a half, and `thumb` leaves its track.
 */
export const spring = {
  /** A firm bounce, about a sixth past, settled in 0.4 s: what answers a finger. */
  press: { mass: 1, damping: 20, stiffness: 400 },
  /** Arrives and stops, with next to no bounce. */
  navigation: { mass: 1, damping: 22, stiffness: 180 },
  tile: { mass: 1, damping: 18, stiffness: 120 },
  /**
   * What slides to an end and settles there — the switch's thumb. One small bounce, about
   * a twentieth of the way past, and at rest within half a second.
   */
  thumb: { mass: 1, damping: 26, stiffness: 370 },
} as const

/**
 * How far something shrinks under the finger: a boxed control, a row that is pressed as a
 * whole — the checkbox with its label — or the one part that is held, the switch's thumb,
 * which is squashed in height only.
 */
export const scale = { press: 0.985, row: 0.97, thumb: 0.92 } as const

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

/**
 * The swivel: a page that turns in on its top edge, from edge-on to flat, and out the
 * same way. `degrees` is where it starts — edge-on, above the screen's plane.
 */
export const swivel = { perspective: 600, degrees: -90 } as const

/**
 * The content cascade: the rows of a list arrive one after the other, each sliding up
 * `rise` points as it fades in, `stagger` milliseconds behind the one before. Past
 * `most` rows they arrive together — nobody waits for the bottom of a long list.
 */
export const cascade = { stagger: 40, rise: 12, most: 8 } as const

/**
 * The five bubbles of an indeterminate progress bar: they come in fast, close up in the
 * middle until `gap` points are left between two of them, and leave fast.
 *
 * `pace` is a speed per stretch of the bar, as a multiple of the slowest — the one at
 * which a bubble covers its own diameter plus `gap` in one `stagger`, which is what keeps
 * two bubbles from ever overlapping. `stops` are where one stretch ends and the next
 * begins, as fractions of the bar: one fewer than there are paces.
 */
export const bubbles = {
  count: 5,
  /** Milliseconds between two bubbles setting off. */
  stagger: 120,
  /** Points left between two bubbles at their closest. */
  gap: 2,
  /** Milliseconds the bar stays empty before the five set off again. */
  rest: 900,
  stops: [0.2, 0.32, 0.42, 0.58, 0.68, 0.82],
  pace: [9, 5, 2.5, 1, 2.5, 4.5, 6.5],
} as const

export type TramSpringName = keyof typeof spring
export type TramEaseName = keyof typeof ease
