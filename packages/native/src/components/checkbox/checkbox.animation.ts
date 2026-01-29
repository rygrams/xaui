import { Animated } from 'react-native'

export const runCheckAnimation = (
  opacity: Animated.Value,
  strokeDashoffset: Animated.Value
) => {
  Animated.parallel([
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }),
    Animated.timing(strokeDashoffset, {
      toValue: 44,
      duration: 250,
      useNativeDriver: false,
    }),
  ]).start()
}

export const runUncheckAnimation = (
  opacity: Animated.Value,
  strokeDashoffset: Animated.Value
) => {
  Animated.parallel([
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }),
    Animated.timing(strokeDashoffset, {
      toValue: 66,
      duration: 250,
      useNativeDriver: false,
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
