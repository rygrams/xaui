import React, { useEffect, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import {
  ConditionalViewAnimation,
  type ConditionalViewProps,
} from './conditional-view.type'
import { FINAL_VALUES, getInitialValues } from './conditional-view.utils'
import { runConditionalViewAnimation } from './conditional-view.animation'

export const ConditionalView: React.FC<ConditionalViewProps> = ({
  isVisible,
  children,
  animation = ConditionalViewAnimation.Fade,
  disableAnimation = false,
}) => {
  const initialValues = useMemo(() => getInitialValues(animation), [animation])

  const opacity = useRef(
    new Animated.Value(disableAnimation ? FINAL_VALUES.opacity : initialValues.opacity)
  ).current
  const scale = useRef(
    new Animated.Value(disableAnimation ? FINAL_VALUES.scale : initialValues.scale)
  ).current
  const translateX = useRef(
    new Animated.Value(
      disableAnimation ? FINAL_VALUES.translateX : initialValues.translateX
    )
  ).current
  const translateY = useRef(
    new Animated.Value(
      disableAnimation ? FINAL_VALUES.translateY : initialValues.translateY
    )
  ).current

  useEffect(() => {
    if (!isVisible) return

    const startValues = disableAnimation ? FINAL_VALUES : initialValues
    opacity.setValue(startValues.opacity)
    scale.setValue(startValues.scale)
    translateX.setValue(startValues.translateX)
    translateY.setValue(startValues.translateY)

    if (disableAnimation) return

    runConditionalViewAnimation({
      opacity,
      scale,
      translateX,
      translateY,
    })
  }, [isVisible, disableAnimation, initialValues, opacity, scale, translateX, translateY])

  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateX }, { translateY }, { scale }],
    }),
    [opacity, scale, translateX, translateY]
  )

  if (!isVisible) {
    return null
  }

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
