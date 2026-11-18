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

/** A tile turning over to its back: a half turn around its horizontal axis. */
export const flip = { perspective: 800, degrees: 180 } as const

/**
 * The swivel: a page that turns in on one of its edges — the top one, or the bottom one
 * for a banner laid there — from edge-on to flat, and out the same way. `degrees` is
 * where it starts: edge-on, above the screen's plane.
 *
 * `flat` is the milliseconds after which a page on its way in reads as flat: the Metro
 * curve has turned it all but a few degrees and spends the rest braking. What a banner
 * holds starts arriving then — waiting for the curve's end leaves it empty for a beat.
 */
export const swivel = { perspective: 600, degrees: -90, flat: 150 } as const

/**
 * The swipe that sends a banner back where it came from. Past `distance` of its way to
 * edge-on, or flung that way faster than `velocity` points a second, a released banner leaves; short of both
 * it comes back flat. One that may not be dismissed follows the finger over `resist`
 * degrees and no further.
 */
export const swipe = { distance: 0.4, velocity: 800, resist: 8 } as const

/**
 * The content cascade: the rows of a list arrive one after the other, each sliding up
 * `rise` points as it fades in, `stagger` milliseconds behind the one before. Past
 * `most` rows they arrive together — nobody waits for the bottom of a long list. After a
 * change of tab the rows come from the side of the new tab instead, from `slide` points.
 */
export const cascade = { stagger: 40, rise: 12, slide: 24, most: 8 } as const

/**
 * The content of a tab: the panel of the tab just chosen comes in from that tab's side,
 * `slide` points away, as it fades in.
 */
export const panel = { slide: 32 } as const

/**
 * A wheel of squares, let go and left alone. Thrown, it keeps its momentum and slows at
 * `deceleration` — `withDecay`'s own rate, per millisecond — until it moves at less than
 * `catchBelow` points a second. The `navigation` spring catches it there, at the speed
 * it has, and stops it on a whole square: the one nearest to where `carry` more
 * milliseconds would have taken it. At that speed that is a square still ahead, so a
 * thrown wheel is never pulled back.
 *
 * `rest` is how long, in milliseconds, a wheel nobody touches keeps its neighbours on
 * screen before they fade and only the current square is left.
 */
export const wheel = {
  deceleration: 0.998,
  catchBelow: 500,
  carry: 150,
  rest: 1400,
} as const

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

/**
 * The swipe that sends a toast away, in points — not the banner's `swipe`, which counts in
 * turns of a swivel. `slop` is how far a finger travels before
 * its gesture has taken an axis; past `distance` points **or** `velocity` points a second,
 * a release finishes the way out. Either is enough: a flick is short, a slow push is not
 * fast, and both meant it.
 */
export const toastSwipe = { slop: 10, distance: 50, velocity: 500 } as const

export type TramSpringName = keyof typeof spring
export type TramEaseName = keyof typeof ease
