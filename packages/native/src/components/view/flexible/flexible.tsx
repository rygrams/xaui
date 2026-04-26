import React from 'react'
import { View } from 'react-native'
import type { FlexibleProps } from '../layout-types'

export const Flexible: React.FC<FlexibleProps> = ({
  children,
  flex = 1,
  fit = 'loose',
  style,
  testID,
}) => (
  <View
    testID={testID}
    style={[
      fit === 'tight'
        ? { flex }
        : { flexGrow: flex, flexShrink: 1, flexBasis: 'auto' },
      style,
    ]}
  >
    {children}
  </View>
)

Flexible.displayName = 'Flexible'
