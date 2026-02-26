import React from 'react'
import { View } from 'react-native'
import type { CenterProps } from './center.type'

export const Center: React.FC<CenterProps> = ({ children, fullWidth, style }) => {
  const fullWidthStyle = fullWidth ? { width: '100%' as const } : undefined

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        fullWidthStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}

Center.displayName = 'Center'
