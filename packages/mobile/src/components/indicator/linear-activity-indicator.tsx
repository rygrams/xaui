import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useXUITheme } from '../../core'
import { useLinearActivityIndicatorAnimation } from './indicator.hook'
import type { ActivityIndicatorProps } from './indicator.type'

export const LinearActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  size = 4,
  themeColor = 'primary',
  color,
  backgroundColor,
  disableAnimation = false,
  borderRadius = 0,
  showTrack = true,
}) => {
  const theme = useXUITheme()

  const { primaryTranslateX, primaryScaleX, secondaryTranslateX, secondaryScaleX } =
    useLinearActivityIndicatorAnimation(disableAnimation)

  const colorScheme = theme.colors[themeColor]
  const mainColor = color || colorScheme.main
  const trackColor = showTrack
    ? (backgroundColor ?? colorScheme.background)
    : 'transparent'

  const barStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: mainColor,
    borderRadius,
  }

  const primaryStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: `${(primaryTranslateX.value - 1.45167) * 100}%` },
      { scaleX: primaryScaleX.value },
    ],
  }))

  const secondaryStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: `${(secondaryTranslateX.value - 0.548889) * 100}%` },
      { scaleX: secondaryScaleX.value },
    ],
  }))

  return (
    <View
      style={{
        height: size,
        width: '100%',
        borderRadius,
        backgroundColor: trackColor,
        overflow: 'hidden',
      }}
    >
      <Animated.View style={[barStyle, primaryStyle]} />
      <Animated.View style={[barStyle, secondaryStyle]} />
    </View>
  )
}
