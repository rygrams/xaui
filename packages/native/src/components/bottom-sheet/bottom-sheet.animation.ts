/**
 * How the sheet arrives and leaves.
 *
 * A spring rather than a curve, because the sheet is a surface the finger has been holding
 * — or is about to. Damped enough not to bounce off the bottom edge, which on a sheet
 * reads as the screen wobbling rather than as the sheet settling.
 */
export const SHEET_SPRING = { damping: 28, stiffness: 260, mass: 0.9 } as const

/**
 * How fast a downward flick closes the sheet regardless of how far it travelled, in points
 * per second.
 *
 * Without it a quick flick from the top of a tall sheet is refused — the finger has not
 * covered a third of its height, however clearly it meant to throw the thing away.
 */
export const DISMISS_VELOCITY = 900
