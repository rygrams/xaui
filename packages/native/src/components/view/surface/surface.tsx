import React from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import { useXUITheme } from '../../../core'
import { useBorderRadiusStyles } from '../../../core/theme-hooks'
import type { SurfaceBackgroundColor, SurfaceProps } from './surface.type'

const resolveBackgroundColor = (
  color: SurfaceBackgroundColor,
  theme: ReturnType<typeof useXUITheme>
) => {
  if (color === 'background' || color === 'foreground') {
    return theme.colors[color]
  }

  return theme.colors[color].background
}

export const Surface: React.FC<SurfaceProps> = ({
  children,
  backgroundColor = 'background',
  padding,
  radius = 'md',
  fullWidth = false,
  style,
}) => {
  const theme = useXUITheme()
  const radiusStyle = useBorderRadiusStyles(radius)
  const background = resolveBackgroundColor(backgroundColor, theme)
  const fullWidthStyle = fullWidth
    ? ({ flexShrink: 1, flexBasis: 'auto', width: '100%' } as ViewStyle)
    : undefined

  return (
    <View
      style={[
        radiusStyle,
        fullWidthStyle,
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
