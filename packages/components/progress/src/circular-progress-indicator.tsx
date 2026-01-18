import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { useXUITheme } from '@xaui/core'
import type { CircularProgressIndicatorProps } from './progress-types'

const MIN_VALUE = 0
const MAX_VALUE = 1

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const DeterminateProgress: React.FC<CircularProgressIndicatorProps> = ({
  size = 40,
  color,
  backgroundColor,
  value,
  strokeCap,
  disableAnimation,
}) => {
  const { current: progressAnim } = useRef<Animated.Value>(new Animated.Value(0))
  const strokeWidth = size * 0.1

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

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const center = size / 2

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  })

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeCap}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
        />
      </Svg>
    </View>
  )
}

export const CircularProgressIndicator: React.FC<CircularProgressIndicatorProps> = ({
  size = 40,
  themeColor = 'primary',
  value,
  color,
  backgroundColor,
  strokeCap,
  disableAnimation = false,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor]

  const circleSize = size || 40

  const mainColor = color || colorScheme.main
  const trackColor = backgroundColor || colorScheme.background
  const effectiveStrokeCap = strokeCap || 'butt'

  return (
    <View
      style={[styles.container, { width: circleSize, height: circleSize }]}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: (value ?? 0) * 100 }}
    >
      <DeterminateProgress
        size={circleSize}
        color={mainColor}
        backgroundColor={trackColor}
        value={value ?? 0}
        strokeCap={effectiveStrokeCap}
        disableAnimation={disableAnimation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
