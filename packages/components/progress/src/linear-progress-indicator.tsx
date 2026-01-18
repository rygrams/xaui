import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { LinearProgressIndicatorProps } from './progress-types'

const MIN_VALUE = 0
const MAX_VALUE = 1

const DeterminateProgress: React.FC<LinearProgressIndicatorProps> = ({
  size = 4,
  color,
  backgroundColor,
  value,
  borderRadius,
  disableAnimation,
}) => {
  const { current: progressAnim } = useRef<Animated.Value>(new Animated.Value(0))

  useEffect(() => {
    const clampedValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, value))

    if (disableAnimation) {
      progressAnim.setValue(clampedValue)
    } else {
      Animated.timing(progressAnim, {
        toValue: clampedValue,
        duration: 500,
        easing: Easing.bezier(0, 0, 0.2, 1),
        useNativeDriver: Platform.OS !== 'web',
      }).start()
    }
  }, [value, disableAnimation, progressAnim])

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View
      style={[
        styles.track,
        {
          height: size,
          backgroundColor,
          borderRadius: borderRadius ?? size / 2,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          {
            width: progressWidth,
            backgroundColor: color,
            borderRadius: borderRadius ?? size / 2,
          },
        ]}
      />
    </View>
  )
}

export const LinearProgressIndicator: React.FC<LinearProgressIndicatorProps> = ({
  size = 4,
  themeColor = 'primary',
  value,
  color,
  backgroundColor,
  borderRadius,
  disableAnimation = false,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]

  const progressHeight = size || 4

  const mainColor = color || colorScheme.main
  const trackColor = backgroundColor || colorScheme.background

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: (value ?? 0) * 100 }}
    >
      <DeterminateProgress
        size={progressHeight}
        color={mainColor}
        backgroundColor={trackColor}
        value={value ?? 0}
        borderRadius={borderRadius}
        disableAnimation={disableAnimation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
})
