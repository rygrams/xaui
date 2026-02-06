import { Animated } from 'react-native'

export const runSegmentPressInAnimation = (animatedScale: Animated.Value) => {
  Animated.spring(animatedScale, {
    toValue: 0.96,
    useNativeDriver: true,
    speed: 50,
    bounciness: 0,
  }).start()
}

export const runSegmentPressOutAnimation = (animatedScale: Animated.Value) => {
  Animated.spring(animatedScale, {
    toValue: 1,
    useNativeDriver: true,
    speed: 50,
    bounciness: 0,
  }).start()
}
