import { Animated, Dimensions, Easing } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const BAR_WIDTH = SCREEN_WIDTH * 0.45
const LOOP_DURATION = 1100

export const createLoaderAnimation = (
  translateX: Animated.Value
): Animated.CompositeAnimation =>
  Animated.loop(
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH,
      duration: LOOP_DURATION,
      easing: Easing.bezier(0.4, 0, 0.6, 1),
      useNativeDriver: true,
    })
  )

export const getLoaderBarWidth = () => BAR_WIDTH

export const getLoaderInitialX = () => -BAR_WIDTH
