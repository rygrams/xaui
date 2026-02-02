import React from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
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
}) => {
  const fullWidthStyle = fullWidth
    ? ({ flexShrink: 1, flexBasis: 'auto', width: '100%' } as ViewStyle)
    : undefined

  return (
    <View
      style={[
        {
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
