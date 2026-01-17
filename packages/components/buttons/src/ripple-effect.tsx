import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Easing } from 'react-native'

export type RippleEffectProps = {
  x: number
  y: number
  size: number
  color: string
  onAnimationComplete?: () => void
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  x,
  y,
  size,
  color,
  onAnimationComplete,
}) => {
  const scale = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAnimationComplete?.()
    })
  }, [scale, opacity, onAnimationComplete])

  return (
    <Animated.View
      style={[
        styles.ripple,
        {
          left: x - size / 2,
          top: y - size / 2,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale }],
          opacity,
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
  },
})
