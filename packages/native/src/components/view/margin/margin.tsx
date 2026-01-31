import React from 'react'
import { View } from 'react-native'
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
  style,
}) => {
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
        style,
      ]}
    >
      {children}
    </View>
  )
}

Margin.displayName = 'Margin'
