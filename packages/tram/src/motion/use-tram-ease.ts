import { useCallback } from 'react'
import {
  Easing,
  ReduceMotion,
  useReducedMotion,
  withTiming,
} from 'react-native-reanimated'
import { duration, ease } from './motion-tokens'
import type { TramEaseName } from './motion-tokens'

/**
 * The other way a Tram component moves a shared value — on a curve, for what has a set
 * length rather than a target a finger can change: a page turning in, a row of a cascade.
 *
 * ```ts
 * const glide = useTramEase()
 * turn.value = glide(1, 'metro', duration.swivel)
 * turn.value = glide(0, 'exit')
 * ```
 *
 * `ms` is one of the `duration` tokens. With motion reduced the curve and the length give
 * way to the same short fade `useTramMotion` falls back to.
 */
export function useTramEase() {
  const isReduced = useReducedMotion()

  return useCallback(
    (to: number, curve: TramEaseName = 'metro', ms: number = duration.base) => {
      'worklet'
      if (isReduced) {
        return withTiming(to, {
          duration: duration.reduced,
          reduceMotion: ReduceMotion.Never,
        })
      }

      const [x1, y1, x2, y2] = ease[curve]

      return withTiming(to, {
        duration: ms,
        easing: Easing.bezier(x1, y1, x2, y2),
        reduceMotion: ReduceMotion.Never,
      })
    },
    [isReduced]
  )
}
