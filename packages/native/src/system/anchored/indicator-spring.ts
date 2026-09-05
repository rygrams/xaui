/**
 * The chevron's turn, shared by the `Select` and the `Accordion`.
 *
 * HeroUI's numbers. Heavily damped against a very high stiffness: it arrives in about a
 * fifth of a second and does not overshoot, which is what a turn of 180 degrees needs —
 * an oscillating chevron reads as a bug rather than as motion.
 */
export const INDICATOR_SPRING = { damping: 140, stiffness: 1000, mass: 4 } as const

/** Degrees. Down when closed, up when open, turning anticlockwise as HeroUI's does. */
export const INDICATOR_ROTATION = [0, -180] as const
