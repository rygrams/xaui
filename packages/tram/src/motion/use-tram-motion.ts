import { useCallback } from 'react'
import { useReducedMotion, withSpring, withTiming } from 'react-native-reanimated'
import { duration, spring } from './motion-tokens'
import type { TramSpringName } from './motion-tokens'

/**
 * The one way a Tram component moves a shared value:
 *
 * ```ts
 * const animate = useTramMotion()
 * scale.value = animate(0.99)
 * offset.value = animate(width, 'navigation')
 * ```
 *
 * A spring, so a second gesture can interrupt the first — or a short fade when the user
 * asked the system to reduce motion, which is why no component calls `withSpring` itself.
 */
export function useTramMotion() {
  const isReduced = useReducedMotion()

  return useCallback(
    (to: number, kind: TramSpringName = 'press') => {
      'worklet'
      return isReduced
        ? withTiming(to, { duration: duration.reduced })
        : withSpring(to, spring[kind])
    },
    [isReduced]
  )
}
