import React from 'react'
import { View } from 'react-native'
import type { PaddingProps } from './padding.type'

export const Padding: React.FC<PaddingProps> = ({
  children,
  all,
  horizontal,
  vertical,
  top,
  right,
  bottom,
  left,
  fullWidth,
  style,
  noGrowth = false,
}) => {
  const fullWidthStyle = fullWidth ? { width: '100%' as const } : undefined

  return (
    <View
      style={[
        {
          flex: noGrowth ? undefined : 1,
          padding: all,
          paddingHorizontal: horizontal,
          paddingVertical: vertical,
          paddingTop: top,
          paddingRight: right,
          paddingBottom: bottom,
          paddingLeft: left,
        },
        fullWidthStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}

Padding.displayName = 'Padding'
