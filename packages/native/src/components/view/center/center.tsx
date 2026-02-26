import React from 'react'
import { View } from 'react-native'
import type { CenterProps } from './center.type'

export const Center: React.FC<CenterProps> = ({ children, style }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

Center.displayName = 'Center'
