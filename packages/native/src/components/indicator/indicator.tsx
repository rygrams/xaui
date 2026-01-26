import React from 'react'
import { View } from 'react-native'
import { useXUITheme } from '../../core'
import { CircularActivityIndicator } from './circular-activity-indicator'
import { LinearActivityIndicator } from './linear-activity-indicator'
import { styles } from './indicator.style'
import type { ActivityIndicatorProps } from './indicator.type'

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = props => {
  const {
    variant = 'circular',
    themeColor = 'primary',
    color,
    backgroundColor,
    size,
    disableAnimation = false,
    borderRadius,
    showTrack,
  } = props

  const theme = useXUITheme()

  const colorScheme = theme.colors[themeColor]
  const mainColor = color ?? colorScheme.main
  const trackColor =
    backgroundColor ?? (showTrack ? colorScheme.background : 'transparent')

  if (variant === 'circular') {
    const circleSize = size ?? 40

    return (
      <View
        style={[styles.container, { width: circleSize, height: circleSize }]}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel="Loading"
      >
        <CircularActivityIndicator
          size={circleSize}
          themeColor={themeColor}
          color={mainColor}
          backgroundColor={trackColor}
          disableAnimation={disableAnimation}
        />
      </View>
    )
  }

  const linearSize = size ?? 4

  return (
    <View
      style={styles.container}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
    >
      <LinearActivityIndicator
        size={linearSize}
        themeColor={themeColor}
        color={mainColor}
        backgroundColor={trackColor}
        disableAnimation={disableAnimation}
        borderRadius={borderRadius}
        showTrack={showTrack}
      />
    </View>
  )
}
