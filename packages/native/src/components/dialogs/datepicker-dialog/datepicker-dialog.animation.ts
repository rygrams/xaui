import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

type UseDatePickerDialogAnimationParams = {
  visible: boolean
  fadeAnim: Animated.Value
  slideAnim: Animated.Value
  scaleAnim: Animated.Value
  onCloseComplete: () => void
}

export const useDatePickerDialogAnimation = ({
  visible,
  fadeAnim,
  slideAnim,
  scaleAnim,
  onCloseComplete,
}: UseDatePickerDialogAnimationParams) => {
  const [shouldRender, setShouldRender] = useState(false)
  const isClosingRef = useRef(false)

  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      isClosingRef.current = false
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 20,
          stiffness: 300,
          mass: 0.8,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 18,
          stiffness: 280,
          mass: 0.8,
        }),
      ]).start()
      return
    }

    if (!shouldRender || isClosingRef.current) return

    isClosingRef.current = true
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShouldRender(false)
      isClosingRef.current = false
      onCloseComplete()
    })
  }, [visible, fadeAnim, slideAnim, scaleAnim, shouldRender, onCloseComplete])

  return { shouldRender }
}

type UseViewTransitionAnimationParams = {
  fadeAnim: Animated.Value
}

export const useViewTransitionAnimation = ({
  fadeAnim,
}: UseViewTransitionAnimationParams) => {
  const animate = useCallback(() => {
    fadeAnim.setValue(0)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return { animate }
}

type MonthSlideDirection = 'left' | 'right'

type UseMonthSlideAnimationParams = {
  slideAnim: Animated.Value
  fadeAnim: Animated.Value
}

export const useMonthSlideAnimation = ({
  slideAnim,
  fadeAnim,
}: UseMonthSlideAnimationParams) => {
  const animate = useCallback(
    (direction: MonthSlideDirection) => {
      const startX = direction === 'right' ? 60 : -60
      slideAnim.setValue(startX)
      fadeAnim.setValue(0)

      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          damping: 22,
          stiffness: 280,
          mass: 0.7,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start()
    },
    [slideAnim, fadeAnim]
  )

  return { animate }
}
