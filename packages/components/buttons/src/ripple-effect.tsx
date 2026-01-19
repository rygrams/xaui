import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  cancelAnimation,
  Easing,
  runOnJS,
} from 'react-native-reanimated'

export type RippleEffectProps = {
  x: number
  y: number
  size: number
  color: string
  timestamp: number
  onAnimationComplete?: () => void
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  x,
  y,
  size,
  color,
  timestamp,
  onAnimationComplete,
}) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(0.5)

  useEffect(() => {
    cancelAnimation(scale)
    cancelAnimation(opacity)

    scale.value = 0
    opacity.value = 0.5

    scale.value = withTiming(1, {
      duration: 600,
      easing: Easing.out(Easing.ease),
    })

    opacity.value = withTiming(
      0,
      {
        duration: 600,
        easing: Easing.out(Easing.ease),
      },
      (finished) => {
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)()
        }
      },
    )

    return () => {
      cancelAnimation(scale)
      cancelAnimation(opacity)
    }
  }, [timestamp, scale, opacity, onAnimationComplete])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }
  })

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
        },
        animatedStyle,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
  },
})
