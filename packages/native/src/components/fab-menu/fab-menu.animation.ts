import { Animated, Easing } from 'react-native'

export const runMenuExpandAnimation = (
  overlayOpacity: Animated.Value,
  itemAnimations: Animated.Value[]
) => {
  const itemSequence = itemAnimations.map((anim, index) =>
    Animated.timing(anim, {
      toValue: 1,
      duration: 150,
      delay: index * 50,
      useNativeDriver: true,
    })
  )

  Animated.parallel([
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.stagger(50, itemSequence),
  ]).start()
}

export const runMenuCollapseAnimation = (
  overlayOpacity: Animated.Value,
  itemAnimations: Animated.Value[],
  onComplete?: () => void
) => {
  const reversed = [...itemAnimations].reverse()
  const itemSequence = reversed.map((anim, index) =>
    Animated.timing(anim, {
      toValue: 0,
      duration: 120,
      delay: index * 30,
      useNativeDriver: true,
    })
  )

  Animated.parallel([
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
    Animated.stagger(30, itemSequence),
  ]).start(onComplete)
}

export const runFabRotateAnimation = (
  rotateValue: Animated.Value,
  toExpanded: boolean
) => {
  Animated.spring(rotateValue, {
    toValue: toExpanded ? 1 : 0,
    useNativeDriver: true,
    speed: 20,
    bounciness: 0,
  }).start()
}

export const runMenuVisibilityAnimation = (
  visibilityValue: Animated.Value,
  toExpanded: boolean,
  onComplete?: () => void
) => {
  Animated.timing(visibilityValue, {
    toValue: toExpanded ? 1 : 0,
    duration: toExpanded ? 220 : 180,
    easing: toExpanded
      ? Easing.out(Easing.cubic)
      : Easing.in(Easing.cubic),
    useNativeDriver: true,
  }).start(onComplete)
}
