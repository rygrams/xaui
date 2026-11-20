import { useMemo } from 'react'
import {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  LinearTransition,
  ReduceMotion,
  useReducedMotion,
} from 'react-native-reanimated'
import { duration, ease } from '../../motion/motion-tokens'
import { morphSpringFor } from './morph-button.utils'
import type { MorphFaceMotion, MorphSpring } from './morph-button.type'

/**
 * How far the arriving face rises as it fades in, in points — the mock-up's. Less than
 * the cascade's row: the box is already moving under it, and a face that also travelled
 * far would read as a second object.
 */
const FACE_RISE = 8

const [X1, Y1, X2, Y2] = ease.metro

type MorphMotion = {
  /** The box's travel, on the pressable itself. `undefined`: it jumps. */
  layout: ReturnType<typeof LinearTransition.springify> | undefined
  faces: MorphFaceMotion
}

const STILL: MorphMotion = {
  layout: undefined,
  faces: { entering: undefined, exiting: undefined },
}

/**
 * How the button changes shape. Nothing is measured: one face is mounted or the other,
 * and Reanimated's layout transition carries the box between the two sizes on the
 * `navigation` spring — so a card whose sentence grows afterwards grows the box with it.
 *
 * The new face arrives just after the box sets off: a short rise and fade on the Metro
 * curve, `fast` behind it. The face leaving goes in `fast`, clipped by the moving box.
 *
 * With motion reduced the box does not travel and the face takes the 150 ms fade every
 * Tram motion collapses to. `isStill` — `animation={false}`, or an ancestor's
 * `disable-all` — plays nothing at all.
 */
export function useMorphMotion(
  animation: boolean | MorphSpring,
  isStill: boolean
): MorphMotion {
  const isReduced = useReducedMotion()
  const travel = isStill ? undefined : morphSpringFor(animation)
  const stiffness = travel?.stiffness
  const damping = travel?.damping
  const mass = travel?.mass

  return useMemo(() => {
    if (stiffness === undefined || damping === undefined || mass === undefined)
      return STILL

    if (isReduced) {
      return {
        layout: undefined,
        faces: {
          entering: FadeIn.duration(duration.reduced).reduceMotion(
            ReduceMotion.Never
          ),
          exiting: undefined,
        },
      }
    }

    const metro = Easing.bezier(X1, Y1, X2, Y2)

    return {
      layout: LinearTransition.springify()
        .stiffness(stiffness)
        .damping(damping)
        .mass(mass),
      faces: {
        entering: FadeInDown.duration(duration.base)
          .delay(duration.fast)
          .easing(metro)
          .withInitialValues({ opacity: 0, transform: [{ translateY: FACE_RISE }] }),
        exiting: FadeOut.duration(duration.fast),
      },
    }
  }, [stiffness, damping, mass, isReduced])
}
