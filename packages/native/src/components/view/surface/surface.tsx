import React from 'react'
import { View } from 'react-native'
import { useXUITheme } from '../../../core'
import { useBorderRadiusStyles } from '../../../core/theme-hooks'
import type { SurfaceThemeColor, SurfaceProps } from './surface.type'
import { getSafeThemeColor } from '@xaui/core'

const resolveBackgroundColor = (
  color: SurfaceThemeColor,
  theme: ReturnType<typeof useXUITheme>
) => {
  if (color === 'background' || color === 'foreground') {
    return theme.colors[color]
  }

  const safeColor = getSafeThemeColor(color)

  return theme.colors[safeColor].background
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  themeColor = 'background',
  padding,
  radius = 'none',
  fullWidth = false,
  style,
}) => {
  const theme = useXUITheme()
  const radiusStyle = useBorderRadiusStyles(radius)
  const background = resolveBackgroundColor(themeColor, theme)

  return (
    <View
      style={[
        radiusStyle,
        fullWidth && { flexShrink: 1, flexBasis: 'auto', width: '100%' },
        {
          backgroundColor: background,
          padding,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

Surface.displayName = 'Surface'
