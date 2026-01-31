import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated } from 'react-native'
import type { ConditionalViewProps } from './conditional-view.type'
import { FINAL_VALUES, getExitValues, getInitialValues } from './conditional-view.utils'
import { runConditionalViewAnimation } from './conditional-view.animation'

export const ConditionalView: React.FC<ConditionalViewProps> = ({
  isVisible,
  children,
  animation = 'fade',
  disableAnimation = false,
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible)
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)

  const initialValues = useMemo(() => getInitialValues(animation), [animation])
  const exitValues = useMemo(() => getExitValues(animation), [animation])

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
    if (isVisible) {
      setShouldRender(true)
    }
  }, [isVisible])

  useEffect(() => {
    if (!shouldRender) return

    const startValues = isVisible
      ? disableAnimation
        ? FINAL_VALUES
        : initialValues
      : FINAL_VALUES
    const targetValues = isVisible ? FINAL_VALUES : exitValues
    opacity.setValue(startValues.opacity)
    scale.setValue(startValues.scale)
    translateX.setValue(startValues.translateX)
    translateY.setValue(startValues.translateY)

    if (disableAnimation) {
      if (!isVisible) {
        setShouldRender(false)
      }
      return
    }

    animationRef.current?.stop()
    animationRef.current = runConditionalViewAnimation({
      opacity,
      scale,
      translateX,
      translateY,
      toValues: targetValues,
      onComplete: !isVisible ? () => setShouldRender(false) : undefined,
    })
  }, [
    isVisible,
    shouldRender,
    disableAnimation,
    initialValues,
    exitValues,
    opacity,
    scale,
    translateX,
    translateY,
  ])

  const animatedStyle = useMemo(
    () => ({
      opacity,
      transform: [{ translateX }, { translateY }, { scale }],
    }),
    [opacity, scale, translateX, translateY]
  )

  if (!shouldRender) {
    return null
  }

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}
