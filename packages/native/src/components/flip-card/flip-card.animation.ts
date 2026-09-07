/**
 * The turn.
 *
 * A spring rather than a timing, and a slightly under-damped one: a card that stops dead at
 * a hundred and eighty degrees reads as a texture swap, and the small overshoot at the end
 * is what makes it read as an object with a weight. `faceAngle` follows past its own ends
 * rather than clamping, which is what lets that overshoot be visible.
 *
 * Stiffness and damping only — mass stays at Reanimated's default. Anything past these two
 * is a different animation, and that is a component's job rather than a prop's.
 */
export const FLIP_SPRING = { stiffness: 140, damping: 16, mass: 1 } as const
