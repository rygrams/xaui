import { Animated } from 'react-native'

export const runPressInAnimation = (
  animatedScale: Animated.Value,
  animatedOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(animatedScale, {
      toValue: 0.975,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }),
    Animated.timing(animatedOpacity, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runPressOutAnimation = (
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
