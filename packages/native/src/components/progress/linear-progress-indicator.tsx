import React from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useProgressAnimation } from './progress.hook'
import { styles } from './progress.style'
import type { ProgressIndicatorProps as LinearProgressIndicatorProps } from './progress.type'

export const LinearProgressIndicator: React.FC<LinearProgressIndicatorProps> = ({
  size = 4,
  color,
  backgroundColor,
  value,
  borderRadius,
  disableAnimation,
}) => {
  const progressAnim = useProgressAnimation(value, disableAnimation)
  const radius = Math.max(0, Math.min(size / 2, borderRadius ?? 0))

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressAnim.value * 100}%`,
  }))

  return (
    <View
      style={[
        styles.track,
        {
          height: size,
          backgroundColor,
          borderRadius: radius,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          animatedStyle,
          {
            backgroundColor: color,
            borderRadius: radius,
          },
        ]}
      />
    </View>
  )
}
