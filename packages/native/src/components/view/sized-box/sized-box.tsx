import React from 'react'
import { View } from 'react-native'
import type { SizedBoxProps } from './sized-box.type'

export const SizedBox: React.FC<SizedBoxProps> = ({
  children,
  width,
  height,
  fullWidth,
  style,
}) => {
  const fullWidthStyle = fullWidth ? { width: '100%' as const } : undefined

  return (
    <View
      style={[
        {
          width,
          height,
        },
        fullWidthStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}

SizedBox.displayName = 'SizedBox'
