import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

export const useAutocompleteListboxAnimation = (isOpen: boolean) => {
  const animationOpacity = useRef(new Animated.Value(isOpen ? 1 : 0)).current
  const animationScale = useRef(new Animated.Value(isOpen ? 1 : 0.95)).current

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(animationOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(animationScale, {
          toValue: 1,
          speed: 14,
          bounciness: 4,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(animationOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(animationScale, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isOpen, animationOpacity, animationScale])

  return { animationOpacity, animationScale }
}

export const useAutocompleteSelectorAnimation = (
  isOpen: boolean,
  disableRotation: boolean
) => {
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (disableRotation) {
      return
    }

    Animated.spring(rotation, {
      toValue: isOpen ? 180 : 0,
      speed: 14,
      bounciness: 4,
      useNativeDriver: true,
    }).start()
  }, [isOpen, disableRotation, rotation])

  return { rotation }
}
