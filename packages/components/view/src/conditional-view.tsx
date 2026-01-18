import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import {
  ConditionalViewAnimation,
  type ConditionalViewProps,
} from './conditional-view-types'

type AnimationValues = {
  opacity: number
  scale: number
  translateX: number
  translateY: number
}

const FINAL_VALUES: AnimationValues = {
  opacity: 1,
  scale: 1,
  translateX: 0,
  translateY: 0,
}

const getInitialValues = (animation: ConditionalViewAnimation): AnimationValues => {
  switch (animation) {
    case ConditionalViewAnimation.Scale:
      return { opacity: 1, scale: 0.9, translateX: 0, translateY: 0 }
    case ConditionalViewAnimation.SlideUp:
      return { opacity: 0, scale: 1, translateX: 0, translateY: 12 }
    case ConditionalViewAnimation.SlideDown:
      return { opacity: 0, scale: 1, translateX: 0, translateY: -12 }
    case ConditionalViewAnimation.SlideLeft:
      return { opacity: 0, scale: 1, translateX: 12, translateY: 0 }
    case ConditionalViewAnimation.SlideRight:
      return { opacity: 0, scale: 1, translateX: -12, translateY: 0 }
    case ConditionalViewAnimation.ZoomIn:
      return { opacity: 0, scale: 0.8, translateX: 0, translateY: 0 }
    case ConditionalViewAnimation.ZoomOut:
      return { opacity: 0, scale: 1.1, translateX: 0, translateY: 0 }
    case ConditionalViewAnimation.Fade:
    default:
      return { opacity: 0, scale: 1, translateX: 0, translateY: 0 }
  }
}

export const ConditionalView: React.FC<ConditionalViewProps> = ({
  isVisible,
  children,
  animation = ConditionalViewAnimation.Fade,
  disableAnimation = false,
}) => {
  const initialValues = useMemo(() => getInitialValues(animation), [animation])

  const opacity = useRef(
    new Animated.Value(disableAnimation ? FINAL_VALUES.opacity : initialValues.opacity),
  ).current
  const scale = useRef(
    new Animated.Value(disableAnimation ? FINAL_VALUES.scale : initialValues.scale),
  ).current
  const translateX = useRef(
    new Animated.Value(
      disableAnimation ? FINAL_VALUES.translateX : initialValues.translateX,
    ),
  ).current
  const translateY = useRef(
    new Animated.Value(
      disableAnimation ? FINAL_VALUES.translateY : initialValues.translateY,
    ),
  ).current

  useEffect(() => {
    if (!isVisible) return

    const startValues = disableAnimation ? FINAL_VALUES : initialValues
    opacity.setValue(startValues.opacity)
    scale.setValue(startValues.scale)
    translateX.setValue(startValues.translateX)
    translateY.setValue(startValues.translateY)

    if (disableAnimation) return

    const easing = Easing.out(Easing.cubic)

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: FINAL_VALUES.opacity,
        duration: 220,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: FINAL_VALUES.scale,
        duration: 220,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: FINAL_VALUES.translateX,
        duration: 220,
        easing,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: FINAL_VALUES.translateY,
        duration: 220,
        easing,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isVisible, disableAnimation, initialValues, opacity, scale, translateX, translateY])

  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateX }, { translateY }, { scale }],
    }),
    [opacity, scale, translateX, translateY],
  )

  if (!isVisible) {
    return null
  }

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
