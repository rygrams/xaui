import React from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { CenterProps } from './center.type'

export const Center: React.FC<CenterProps> = ({
  children,
  fullWidth = false,
  style,
}) => {
  const fullWidthStyle = fullWidth
    ? ({ flexGrow: 1, flexShrink: 1, flexBasis: 'auto', width: '100%' } as ViewStyle)
    : { flexGrow: 1 }

  return (
    <View
      style={[
        {
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
