import { Animated } from 'react-native'

export const runDotInAnimation = (
  dotScale: Animated.Value,
  dotOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(dotScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 90,
      friction: 9,
    }),
    Animated.timing(dotOpacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runDotOutAnimation = (
  dotScale: Animated.Value,
  dotOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(dotScale, {
      toValue: 0,
      useNativeDriver: true,
      tension: 90,
      friction: 9,
    }),
    Animated.timing(dotOpacity, {
      toValue: 0,
      duration: 140,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runBackgroundInAnimation = (
  backgroundScale: Animated.Value,
  backgroundOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.timing(backgroundScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runBackgroundOutAnimation = (
  backgroundScale: Animated.Value,
  backgroundOpacity: Animated.Value
) => {
  Animated.parallel([
    Animated.timing(backgroundScale, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.timing(backgroundOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runPressInAnimation = (scale: Animated.Value) => {
  Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  }).start()
}

export const runPressOutAnimation = (scale: Animated.Value) => {
  Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  }).start()
}
