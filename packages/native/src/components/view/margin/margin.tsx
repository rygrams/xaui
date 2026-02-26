import React from 'react'
import { View } from 'react-native'
import type { MarginProps } from './margin.type'

export const Margin: React.FC<MarginProps> = ({
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
  const fullWidthStyle = fullWidth ? { width: '100%' as const } : undefined

  return (
    <View
      style={[
        {
          flex: 1,
          margin: all,
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
