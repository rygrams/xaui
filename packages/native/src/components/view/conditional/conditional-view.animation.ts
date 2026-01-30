import { Animated, Easing } from 'react-native'
import { FINAL_VALUES } from './conditional-view.utils'

type AnimationRefs = {
  opacity: Animated.Value
  scale: Animated.Value
  translateX: Animated.Value
  translateY: Animated.Value
}

export const runConditionalViewAnimation = ({
  opacity,
  scale,
  translateX,
  translateY,
}: AnimationRefs) => {
  const easing = Easing.out(Easing.cubic)

  Animated.parallel([
    Animated.timing(opacity, {
      toValue: FINAL_VALUES.opacity,
      duration: 220,
      easing,
      useNativeDriver: true,
    }),
    Animated.timing(scale, {
      toValue: FINAL_VALUES.scale,
      duration: 220,
      easing,
      useNativeDriver: true,
    }),
    Animated.timing(translateX, {
      toValue: FINAL_VALUES.translateX,
      duration: 220,
      easing,
      useNativeDriver: true,
    }),
    Animated.timing(translateY, {
      toValue: FINAL_VALUES.translateY,
      duration: 220,
      easing,
      useNativeDriver: true,
    }),
  ]).start()
}
