import { Animated } from 'react-native'

export const runMenuBoxPressInAnimation = (
  animatedScale: Animated.Value,
  animatedOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(animatedScale, {
      toValue: 0.99,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }),
    Animated.timing(animatedOpacity, {
      toValue: 0.8,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runMenuBoxPressOutAnimation = (
  animatedScale: Animated.Value,
  animatedOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }),
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start()
}
