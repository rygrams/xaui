import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import { styles } from './scaffold.style'
import type { ScaffoldBodyProps } from './scaffold.type'

export const ScaffoldBody: React.FC<ScaffoldBodyProps> = ({
  children,
  scrollable = true,
  isRefreshing = false,
  themeColor = 'primary',
  style,
  contentContainerStyle,
  onRefresh,
  onScroll,
}) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const tintColor = theme.colors[safeThemeColor].main

  if (!scrollable) {
    return <View style={[styles.body, style]}>{children}</View>
  }

  return (
    <ScrollView
      style={[styles.body, style]}
      contentContainerStyle={contentContainerStyle}
      scrollEventThrottle={16}
      onScroll={onScroll}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={tintColor}
            colors={[tintColor]}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  )
}
