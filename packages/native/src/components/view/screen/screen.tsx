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
  const Container = safeArea ? SafeAreaView : View

  return (
    <Container
      style={[
        {
          flex: 1,
          backgroundColor: resolvedBackgroundColor,
          padding,
        },
        style,
      ]}
    >
      {children}
    </Container>
  )
}

Screen.displayName = 'Screen'
