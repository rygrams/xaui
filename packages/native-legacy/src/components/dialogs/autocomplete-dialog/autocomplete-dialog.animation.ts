import { useEffect } from 'react'
import { Animated } from 'react-native'

type UseAutocompleteDialogAnimationParams = {
  visible: boolean
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  scaleAnim: Animated.Value
}

export const useAutocompleteDialogAnimation = ({
  visible,
  fadeAnim,
  slideAnim,
  scaleAnim,
}: UseAutocompleteDialogAnimationParams) => {
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 65,
          friction: 10,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 8,
        }),
      ]).start()
    } else {
      fadeAnim.setValue(0)
      slideAnim.setValue(0)
      scaleAnim.setValue(0)
    }
  }, [visible, fadeAnim, slideAnim, scaleAnim])
}
