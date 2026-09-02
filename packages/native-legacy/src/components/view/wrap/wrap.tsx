import React from 'react'
import { View } from 'react-native'
import type { WrapProps } from '../layout-types'
import { resolveMainAxisAlignment } from '../layout-utils'

export const Wrap: React.FC<WrapProps> = ({
  children,
  direction = 'horizontal',
  alignment,
  runAlignment,
  spacing = 0,
  runSpacing = 0,
  style,
  testID,
}) => (
  <View
    testID={testID}
    style={[
      {
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flexWrap: 'wrap',
        justifyContent: resolveMainAxisAlignment(alignment),
        alignContent: resolveMainAxisAlignment(runAlignment),
        gap: spacing,
        rowGap: direction === 'horizontal' ? runSpacing : spacing,
        columnGap: direction === 'horizontal' ? spacing : runSpacing,
      },
      style,
    ]}
  >
    {children}
  </View>
)

Wrap.displayName = 'Wrap'
