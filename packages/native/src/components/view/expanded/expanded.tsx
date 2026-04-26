import React from 'react'
import { View } from 'react-native'
import type { ExpandedProps } from './expanded.type'

export const Expanded: React.FC<ExpandedProps> = ({
  children,
  flex = 1,
  style,
  testID,
}) => (
  <View testID={testID} style={[{ flex }, style]}>
    {children}
  </View>
)

Expanded.displayName = 'Expanded'
