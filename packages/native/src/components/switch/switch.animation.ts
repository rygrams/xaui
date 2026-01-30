import { Animated } from 'react-native'

export const runThumbPositionAnimation = (
  thumbPosition: Animated.Value,
  isSelected: boolean
) => {
  Animated.spring(thumbPosition, {
    toValue: isSelected ? 1 : 0,
    useNativeDriver: true,
    damping: 15,
    stiffness: 150,
  }).start()
}

export const runSwitchPressInAnimation = (
  animatedScale: Animated.Value,
  animatedThumbScale: Animated.Value,
  isOverlap: boolean
) => {
  Animated.parallel([
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }),
    Animated.spring(animatedThumbScale, {
      toValue: isOverlap ? 1.1 : 1.2,
      useNativeDriver: true,
    }),
  ]).start()
}

export const runSwitchPressOutAnimation = (
  animatedScale: Animated.Value,
  animatedThumbScale: Animated.Value
) => {
  Animated.parallel([
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }),
    Animated.spring(animatedThumbScale, {
      toValue: 1,
      useNativeDriver: true,
    }),
  ]).start()
}
