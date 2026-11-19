import { pageSlide } from '../../motion/motion-tokens'
import { turnstileAngle } from '../../system/turnstile'
import type { TramPageTransition } from '../../theme/tram-pages'

/** What a page looks like at one moment of its way in or out. Degrees and points. */
export type PagePose = { opacity: number; rotateY: number; translateX: number }

export type PoseOptions = { transition: TramPageTransition; isRtl: boolean }

/**
 * A page's pose for a `turn` between -1 and 1: at 0 it is in place; at 1 it has gone the
 * way a page goes when the app moves forward; at -1 it waits where a page arrives from.
 * The same number draws both directions, which is what lets one way be interrupted by
 * the other.
 *
 * A turnstile turns on the start edge, the far side going away; a slide waits on the end
 * side. Both mirror in a right-to-left layout.
 */
export function pagePose(
  turn: number,
  { transition, isRtl }: PoseOptions
): PagePose {
  'worklet'
  const side = Math.max(-1, Math.min(1, turn))
  const opacity = transition === 'none' ? 1 : 1 - Math.abs(side)
  const towardEnd = isRtl ? -1 : 1

  if (transition === 'turnstile') {
    return { opacity, rotateY: turnstileAngle(side, isRtl), translateX: 0 }
  }

  if (transition === 'slide') {
    return {
      opacity,
      rotateY: 0,
      translateX: -side * pageSlide.distance * towardEnd,
    }
  }

  return { opacity, rotateY: 0, translateX: 0 }
}
