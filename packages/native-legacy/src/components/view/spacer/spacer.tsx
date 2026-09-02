import React from 'react'
import { View } from 'react-native'
import type { SpacerProps } from './spacer.type'

export const Spacer: React.FC<SpacerProps> = ({ flex = 1, style }) => {
  return (
    <View
      style={[
        {
          flexGrow: flex,
          flexShrink: 1,
          flexBasis: 0,
        },
        style,
      ]}
    />
  )
}

Spacer.displayName = 'Spacer'
