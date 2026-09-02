import { Animated } from 'react-native'

export const runFabPressInAnimation = (
  animatedScale: Animated.Value,
  animatedOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(animatedScale, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }),
    Animated.timing(animatedOpacity, {
      toValue: 0.85,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runFabPressOutAnimation = (
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
