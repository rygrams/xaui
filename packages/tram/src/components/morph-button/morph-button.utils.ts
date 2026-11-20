import { spring } from '../../motion/motion-tokens'
import type { MorphSpring } from './morph-button.type'

export type MorphSpringConfig = Required<MorphSpring>

/**
 * The spring the box travels on, or `undefined` when it does not travel. `true` is the
 * Tram `navigation` spring — it arrives and stops, with next to no bounce, as a page does
 * — and an object is merged over it, one knob at a time.
 */
export function morphSpringFor(
  animation: boolean | MorphSpring
): MorphSpringConfig | undefined {
  if (animation === false) return undefined
  if (animation === true) return spring.navigation

  return { ...spring.navigation, ...animation }
}
