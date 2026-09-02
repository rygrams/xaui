import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const useSelectListboxAnimation = (isOpen: boolean) => {
  const animationOpacity = useRef(new Animated.Value(0)).current
  const animationScale = useRef(new Animated.Value(0.98)).current

  useEffect(() => {
    if (!isOpen) {
      return
    }

    animationOpacity.setValue(0)
    animationScale.setValue(0.98)
    Animated.parallel([
      Animated.timing(animationOpacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(animationScale, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isOpen, animationOpacity, animationScale])

  return { animationOpacity, animationScale }
}
