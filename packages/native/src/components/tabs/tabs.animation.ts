/**
 * How the indicator travels.
 *
 * A spring rather than a curve, and a soft one: the indicator is following a finger, so it
 * should arrive with a little weight rather than snapping. Lighter than the chevron's —
 * that one turns 180 degrees and must not overshoot, this one slides a few dozen points
 * and a touch of overshoot is what makes it feel attached to the press.
 */
export const INDICATOR_SPRING = { damping: 20, stiffness: 220, mass: 0.6 } as const
