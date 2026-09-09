import { Easing, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated'
import type { MorphSpring } from './morph-button.type'

/**
 * How the box travels between the two shapes.
 *
 * **Nothing is measured.** A face is mounted or it is not, and Reanimated's layout
 * transition animates the box between the two sizes — which is what lets a card whose
 * content grows afterwards, a sentence arriving from the network, grow with it instead of
 * being stuck at the size it had when it was measured.
 *
 * Slightly under-damped on purpose: ζ ≈ 0.85, so the shape settles with a hint of
 * overshoot rather than stopping dead. A box that arrives exactly at its target reads as a
 * layout swap, and the small overrun is what makes it read as one object changing shape.
 * Stiff and heavy in the same ratio as the `Accordion`'s panel, because the distance is the
 * same kind of distance — a height, not a rotation.
 */
export const MORPH_SPRING = { stiffness: 1400, damping: 110, mass: 3 } as const

/** The spring as Reanimated's builder. Rebuilt only when the caller retunes it. */
export function morphTransition(spring: Required<MorphSpring>) {
  return LinearTransition.springify()
    .stiffness(spring.stiffness)
    .damping(spring.damping)
    .mass(spring.mass)
}

/**
 * Shorter than the travel, and it has to be: the two faces are never both on screen, so
 * this is the arriving one catching up rather than a crossfade. A fade as long as the
 * spring would leave the card half transparent for most of the morph.
 */
const FACE_MS = 140

/**
 * The faces fade rather than sliding. The box is already moving underneath them, and two
 * things travelling at once reads as the button fighting itself.
 */
export const faceEntering = FadeIn.duration(FACE_MS).easing(Easing.out(Easing.ease))
export const faceExiting = FadeOut.duration(FACE_MS).easing(Easing.in(Easing.ease))
