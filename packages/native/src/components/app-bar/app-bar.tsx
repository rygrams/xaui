import React from 'react'
import { View } from 'react-native'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import { useAppBarElevationStyles } from './app-bar.hook'
import { styles } from './app-bar.style'
import type {
  AppBarContentProps,
  AppBarEndContentProps,
  AppBarProps,
  AppBarStartContentProps,
} from './app-bar.type'

export const AppBar: React.FC<AppBarProps> = ({
  variant = 'docked',
  elevation = 0,
  themeColor = 'default',
  children,
  style,
}: AppBarProps) => {
  const theme = useXUITheme()
  const elevationStyles = useAppBarElevationStyles(elevation)
  const isFloating = variant === 'floating'
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]
  const isDefaultThemeColor = safeThemeColor === 'default'

  const backgroundColor =
    isDefaultThemeColor
      ? theme.mode === 'dark'
        ? theme.colors.default.background
        : '#FFFFFF'
      : colorScheme.background
  const borderBottomColor =
    isDefaultThemeColor
      ? theme.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.08)'
      : colorScheme.main

  return (
    <View style={[styles.container, isFloating && styles.floatingContainer]}>
      <View
        style={[
          styles.appBar,
          isFloating ? styles.floating : styles.docked,
          {
            backgroundColor,
            borderBottomWidth: isFloating ? 0 : 1,
            borderBottomColor,
          },
          elevationStyles,
          style,
        ]}
      >
        {children}
      </View>
    </View>
  )
}

export const AppBarStartContent: React.FC<AppBarStartContentProps> = ({
  children,
  style,
}: AppBarStartContentProps) => {
  return <View style={[styles.startContent, style]}>{children}</View>
}

export const AppBarContent: React.FC<AppBarContentProps> = ({
  children,
  style,
}: AppBarContentProps) => {
  return <View style={[styles.content, style]}>{children}</View>
}

export const AppBarEndContent: React.FC<AppBarEndContentProps> = ({
  children,
  style,
}: AppBarEndContentProps) => {
  return <View style={[styles.endContent, style]}>{children}</View>
}
