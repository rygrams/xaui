import { Animated } from 'react-native'

export const runTabsCursorAnimation = (
  translateX: Animated.Value,
  width: Animated.Value,
  toX: number,
  toWidth: number,
  duration: number
) => {
  Animated.parallel([
    Animated.timing(translateX, {
      toValue: toX,
      duration,
      useNativeDriver: false,
    }),
    Animated.timing(width, {
      toValue: toWidth,
      duration,
      useNativeDriver: false,
    }),
  ]).start()
}
