import { useEffect } from 'react'
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'

const MIN_VALUE = 0
const MAX_VALUE = 1

export const clampProgress = (value: number): number =>
  Math.max(MIN_VALUE, Math.min(MAX_VALUE, value))

export const useProgressAnimation = (
  value: number,
  disableAnimation?: boolean
): SharedValue<number> => {
  const progressAnim = useSharedValue(clampProgress(value))

  useEffect(() => {
    const clampedValue = clampProgress(value)

    if (disableAnimation) {
      progressAnim.value = clampedValue
      return
    }

    progressAnim.value = withTiming(clampedValue, {
      duration: 500,
      easing: Easing.bezier(0, 0, 0.2, 1),
    })
  }, [value, disableAnimation, progressAnim])

  return progressAnim
}
