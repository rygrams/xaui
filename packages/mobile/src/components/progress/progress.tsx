import React from 'react'
import { View } from 'react-native'
import { useXUITheme } from '@xaui/core/theme'
import { CircularProgressIndicator } from './circular-progress-indicator'
import { LinearProgressIndicator } from './linear-progress-indicator'
import { clampProgress } from './progress.hook'
import { styles } from './progress.style'
import type { ProgressIndicatorProps } from './progress.type'

export const Progress: React.FC<ProgressIndicatorProps> = props => {
  const {
    variant = 'linear',
    themeColor = 'primary',
    value,
    color,
    backgroundColor,
    size,
    disableAnimation = false,
  } = props

  const theme = useXUITheme()

  const colorScheme = theme.colors[themeColor]
  const mainColor = color ?? colorScheme.main
  const trackColor = backgroundColor ?? colorScheme.background
  const clampedValue = clampProgress(value)
  const accessibilityValue = {
    min: 0,
    max: 100,
    now: clampedValue * 100,
  }

  if (variant === 'circular') {
    const circleSize = size ?? 40
    const borderRadius = 'borderRadius' in props ? props.borderRadius : undefined

    return (
      <View
        style={[styles.circleContainer, { width: circleSize, height: circleSize }]}
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={accessibilityValue}
      >
        <CircularProgressIndicator
          size={circleSize}
          color={mainColor}
          backgroundColor={trackColor}
          value={clampedValue}
          borderRadius={borderRadius}
          disableAnimation={disableAnimation}
        />
      </View>
    )
  }

  const linearSize = size ?? 4
  const borderRadius = 'borderRadius' in props ? props.borderRadius : undefined

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="progressbar"
      accessibilityValue={accessibilityValue}
    >
      <LinearProgressIndicator
        size={linearSize}
        color={mainColor}
        backgroundColor={trackColor}
        value={clampedValue}
        borderRadius={borderRadius}
        disableAnimation={disableAnimation}
      />
    </View>
  )
}
