import React from 'react'
import { View } from 'react-native'
import type { PositionedViewProps } from './positioned-view.type'

export const PositionedView: React.FC<PositionedViewProps> = ({
  children,
  top,
  right,
  bottom,
  left,
  zIndex,
  style,
}) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          top,
          right,
          bottom,
          left,
          zIndex,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

PositionedView.displayName = 'PositionedView'
