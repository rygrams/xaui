import { Animated, Easing } from 'react-native'

const SPRING_CONFIG = {
  useNativeDriver: true,
  speed: 14,
  bounciness: 4,
}

const TIMING_CONFIG = {
  duration: 280,
  easing: Easing.bezier(0.2, 0, 0, 1),
  useNativeDriver: true,
}

export const runOpenAnimation = (
  translateY: Animated.Value,
  backdropOpacity: Animated.Value,
  targetTranslateY: number
): Animated.CompositeAnimation => {
  const animation = Animated.parallel([
    Animated.spring(translateY, {
      ...SPRING_CONFIG,
      toValue: targetTranslateY,
    }),
    Animated.timing(backdropOpacity, {
      ...TIMING_CONFIG,
      toValue: 1,
    }),
  ])
  animation.start()
  return animation
}

export const runCloseAnimation = (
  translateY: Animated.Value,
  backdropOpacity: Animated.Value,
  screenHeight: number,
  onComplete?: () => void
): Animated.CompositeAnimation => {
  const animation = Animated.parallel([
    Animated.timing(translateY, {
      ...TIMING_CONFIG,
      toValue: screenHeight,
    }),
    Animated.timing(backdropOpacity, {
      ...TIMING_CONFIG,
      toValue: 0,
    }),
  ])
  animation.start(({ finished }) => {
    if (finished && onComplete) {
      onComplete()
    }
  })
  return animation
}

export const runSnapAnimation = (
  translateY: Animated.Value,
  targetTranslateY: number
): Animated.CompositeAnimation => {
  const animation = Animated.spring(translateY, {
    ...SPRING_CONFIG,
    toValue: targetTranslateY,
  })
  animation.start()
  return animation
}
