import { Animated, Easing } from 'react-native'
import type { AnimationValues } from './conditional-view.utils'

type AnimationRefs = {
  opacity: Animated.Value
  scale: Animated.Value
  translateX: Animated.Value
  translateY: Animated.Value
  toValues: AnimationValues
  onComplete?: () => void
}

export const runConditionalViewAnimation = ({
  opacity,
  scale,
  translateX,
  translateY,
  toValues,
  onComplete,
}: AnimationRefs) => {
  const easing = Easing.out(Easing.cubic)

  const animation = Animated.parallel([
    Animated.timing(opacity, {
      toValue: toValues.opacity,
      duration: 800,
      easing,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: toValues.scale,
      duration: 800,
      easing,
      useNativeDriver: true,
    }),
    Animated.timing(translateX, {
      toValue: toValues.translateX,
      duration: 800,
      easing,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: toValues.translateY,
      duration: 800,
      easing,
      useNativeDriver: true,
    }),
  ])

  animation.start(({ finished }) => {
    if (finished) {
      onComplete?.()
    }
  })

  return animation
}
