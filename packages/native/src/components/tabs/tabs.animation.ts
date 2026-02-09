import { Animated, Easing } from 'react-native'

export const runTabsCursorAnimation = (
  translateX: Animated.Value,
  width: Animated.Value,
  scaleX: Animated.Value,
  toX: number,
  toWidth: number,
  duration: number
) => {
  scaleX.setValue(0.75)

  Animated.parallel([
    Animated.timing(translateX, {
      toValue: toX,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }),
    Animated.timing(width, {
      toValue: toWidth,
      duration,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }),
    Animated.timing(scaleX, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }),
  ]).start()
}
