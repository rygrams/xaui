import { Animated, Easing } from 'react-native'

const DOT_DURATION = 400
const DOT_DELAY = 160

export const createTypingDotAnimation = (
  anim: Animated.Value,
  delay: number
): Animated.CompositeAnimation =>
  Animated.loop(
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(anim, {
        toValue: -5,
        duration: DOT_DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 0,
        duration: DOT_DURATION,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.delay(DOT_DELAY * 2),
    ])
  )

export const DOT_STAGGER_DELAY = DOT_DELAY
