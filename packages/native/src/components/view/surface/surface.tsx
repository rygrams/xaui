import React from 'react'
import { View } from 'react-native'
import { useXUITheme } from '../../../core'
import { useBorderRadiusStyles } from '../../../core/theme-hooks'
import type { SurfaceThemeColor, SurfaceProps } from './surface.type'

const resolveBackgroundColor = (
  color: SurfaceThemeColor,
  theme: ReturnType<typeof useXUITheme>
) => {
  if (color === 'background' || color === 'foreground') {
    return theme.colors[color]
  }

  return theme.colors[color].background
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  themeColor = 'background',
  padding,
  radius = 'md',
  style,
}) => {
  const theme = useXUITheme()
  const radiusStyle = useBorderRadiusStyles(radius)
  const background = resolveBackgroundColor(themeColor, theme)

  return (
    <View
      style={[
        radiusStyle,
        {
          width: '100%',
          height: '100%',
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
