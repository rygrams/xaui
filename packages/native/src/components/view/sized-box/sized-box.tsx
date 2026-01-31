import React from 'react'
import { View } from 'react-native'
import type { SizedBoxProps } from './sized-box.type'

export const SizedBox: React.FC<SizedBoxProps> = ({
  children,
  width,
  height,
  style,
}) => {
  return (
    <View
      style={[
        {
          width,
          height,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

SizedBox.displayName = 'SizedBox'
