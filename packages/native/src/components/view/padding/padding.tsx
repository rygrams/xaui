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
  style,
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          padding: all,
          paddingHorizontal: horizontal,
          paddingVertical: vertical,
          paddingTop: top,
          paddingRight: right,
          paddingBottom: bottom,
          paddingLeft: left,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

Padding.displayName = 'Padding'
