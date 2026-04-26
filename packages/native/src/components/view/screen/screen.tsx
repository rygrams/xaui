import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useXUITheme } from '../../../core'
import type { ScreenProps } from './screen.type'

export const Screen: React.FC<ScreenProps> = ({
  children,
  padding,
  backgroundColor,
  safeArea = false,
  style,
}) => {
  const theme = useXUITheme()
  const resolvedBackgroundColor = backgroundColor ?? theme.colors.background
  const containerStyle = [{ flex: 1, backgroundColor: resolvedBackgroundColor, padding }, style]

  if (safeArea) {
    return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>
  }

  return <View style={containerStyle}>{children}</View>
}

Screen.displayName = 'Screen'
