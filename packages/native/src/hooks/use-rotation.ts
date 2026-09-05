import { useEffect } from 'react'
import type { ViewStyle } from 'react-native'
import {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

/**
 * One turn. Slow enough to read as waiting, fast enough not to read as stuck — HeroUI
 * arrives at the same figure from the other side, a 1000ms turn played at 1.1×.
 *
 * It is a constant rather than a parameter because the library turns at one speed: two
 * spinners on one screen at two rates is a bug, and the only way to be sure of that is
 * for there to be one number.
 */
export const ROTATION_DURATION = 900

/**
 * A full turn, repeating, on the UI thread. Returns the animated style to merge onto the
 * node that spins.
 *
 * **A caller that must animate nothing does not call it.** Hooks cannot be conditional,
 * so "no animation" is only true if this one is never reached — which is why both call
 * sites render two components rather than branch inside one.
 */
export function useRotation(): ViewStyle {
  const angle = useSharedValue(0)

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, { duration: ROTATION_DURATION, easing: Easing.linear }),
      -1,
      false
    )
    // A repeat with no end runs until something stops it, and unmounting the component
    // that started it is not by itself that something.
    return () => cancelAnimation(angle)
  }, [angle])

  return useAnimatedStyle(() => {
    'worklet'
    return { transform: [{ rotate: `${angle.value}deg` }] }
  }, [angle])
}
