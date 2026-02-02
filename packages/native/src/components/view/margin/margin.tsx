import React from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { MarginProps } from './margin.type'

export const Margin: React.FC<MarginProps> = ({
  children,
  value,
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
          margin: value,
          marginHorizontal: horizontal,
          marginVertical: vertical,
          marginTop: top,
          marginRight: right,
          marginBottom: bottom,
          marginLeft: left,
        },
        fullWidthStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}

Margin.displayName = 'Margin'
