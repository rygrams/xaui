import { Animated } from 'react-native'

export const runCheckmarkEnterAnimation = (animatedValue: Animated.Value) => {
  animatedValue.setValue(0)
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
  }).start()
}

export const runCheckmarkExitAnimation = (animatedValue: Animated.Value) => {
  Animated.timing(animatedValue, {
    toValue: 0,
    duration: 150,
    useNativeDriver: true,
  }).start()
}
