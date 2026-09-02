import React from 'react'
import { View } from 'react-native'
import type { ConstrainedBoxProps } from './constrained-box.type'

export const ConstrainedBox: React.FC<ConstrainedBoxProps> = ({
  children,
  constraints,
  style,
  testID,
}) => (
  <View
    testID={testID}
    style={[
      {
        minWidth: constraints.minWidth,
        maxWidth: constraints.maxWidth,
        minHeight: constraints.minHeight,
        maxHeight: constraints.maxHeight,
      },
      style,
    ]}
  >
    {children}
  </View>
)

ConstrainedBox.displayName = 'ConstrainedBox'
