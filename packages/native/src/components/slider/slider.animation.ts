import { Animated } from 'react-native'

export const runSliderThumbPressInAnimation = (scale: Animated.Value) => {
  Animated.spring(scale, {
    toValue: 1.08,
    friction: 6,
    tension: 120,
    useNativeDriver: false,
  }).start()
}

export const runSliderThumbPressOutAnimation = (scale: Animated.Value) => {
  Animated.spring(scale, {
    toValue: 1,
    friction: 6,
    tension: 120,
    useNativeDriver: false,
  }).start()
}
