import React from 'react'
import { View } from 'react-native'
import type { FlexProps } from '../layout-types'
import {
  resolveCrossAxisAlignment,
  resolveMainAxisAlignment,
  resolveMainAxisSize,
} from '../layout-utils'

export const Flex: React.FC<FlexProps> = ({
  children,
  direction,
  mainAxisAlignment,
  crossAxisAlignment,
  mainAxisSize,
  wrap = false,
  gap,
  reversed = false,
  flex,
  style,
  testID,
}) => {
  const flexDir = direction === 'horizontal'
    ? (reversed ? 'row-reverse' : 'row')
    : (reversed ? 'column-reverse' : 'column')

  return (
    <View
      testID={testID}
      style={[
        resolveMainAxisSize(mainAxisSize, direction),
        {
          flexDirection: flexDir,
          justifyContent: resolveMainAxisAlignment(mainAxisAlignment),
          alignItems: resolveCrossAxisAlignment(crossAxisAlignment),
          flexWrap: wrap ? 'wrap' : 'nowrap',
          ...(gap !== undefined && { gap }),
          ...(flex !== undefined && { flex }),
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

Flex.displayName = 'Flex'
