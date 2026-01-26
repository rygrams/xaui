import { useEffect } from 'react'
import {
  Easing,
  cancelAnimation,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated'

export const useLinearActivityIndicatorAnimation = (
  disableAnimation: boolean
): {
  primaryTranslateX: SharedValue<number>
  primaryScaleX: SharedValue<number>
  secondaryTranslateX: SharedValue<number>
  secondaryScaleX: SharedValue<number>
} => {
  const primaryTranslateX = useSharedValue(0)
  const primaryScaleX = useSharedValue(0.08)
  const secondaryTranslateX = useSharedValue(0)
  const secondaryScaleX = useSharedValue(0.08)

  useEffect(() => {
    if (disableAnimation) {
      cancelAnimation(primaryTranslateX)
      cancelAnimation(primaryScaleX)
      cancelAnimation(secondaryTranslateX)
      cancelAnimation(secondaryScaleX)
      return
    }

    primaryTranslateX.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(0, { duration: 400, easing: Easing.linear }),
        withTiming(0.836714, {
          duration: 783,
          easing: Easing.bezier(0.5, 0, 0.701732, 0.495819),
        }),
        withTiming(2.00611, {
          duration: 817,
          easing: Easing.bezier(0.302435, 0.381352, 0.55, 0.956352),
        })
      ),
      -1,
      false
    )

    primaryScaleX.value = withRepeat(
      withSequence(
        withTiming(0.08, { duration: 0 }),
        withTiming(0.08, { duration: 733, easing: Easing.linear }),
        withTiming(0.661479, {
          duration: 650,
          easing: Easing.bezier(0.334731, 0.12482, 0.785844, 1),
        }),
        withTiming(0.08, {
          duration: 617,
          easing: Easing.bezier(0.06, 0.11, 0.6, 1),
        })
      ),
      -1,
      false
    )

    secondaryTranslateX.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 0 }),
        withTiming(0.376519, {
          duration: 500,
          easing: Easing.bezier(0.15, 0, 0.515058, 0.409685),
        }),
        withTiming(0.843862, {
          duration: 467,
          easing: Easing.bezier(0.31033, 0.284058, 0.8, 0.733712),
        }),
        withTiming(1.60278, {
          duration: 1033,
          easing: Easing.bezier(0.4, 0.627035, 0.6, 0.902026),
        })
      ),
      -1,
      false
    )

    secondaryScaleX.value = withRepeat(
      withSequence(
        withTiming(0.08, { duration: 0 }),
        withTiming(0.457104, {
          duration: 383,
          easing: Easing.bezier(0.205028, 0.057051, 0.57661, 0.453971),
        }),
        withTiming(0.72796, {
          duration: 500,
          easing: Easing.bezier(0.152313, 0.196432, 0.648374, 1.00432),
        }),
        withTiming(0.08, {
          duration: 1117,
          easing: Easing.bezier(0.257759, -0.003163, 0.211762, 1.38179),
        })
      ),
      -1,
      false
    )

    return () => {
      cancelAnimation(primaryTranslateX)
      cancelAnimation(primaryScaleX)
      cancelAnimation(secondaryTranslateX)
      cancelAnimation(secondaryScaleX)
    }
  }, [disableAnimation])

  return {
    primaryTranslateX,
    primaryScaleX,
    secondaryTranslateX,
    secondaryScaleX,
  }
}
