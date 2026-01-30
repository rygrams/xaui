import React from 'react'
import { View } from 'react-native'
import type { RowProps } from '../layout-types'
import { resolveCrossAxisAlignment, resolveMainAxisAlignment } from '../layout-utils'

export const Row: React.FC<RowProps> = ({
  children,
  mainAxisAlignment,
  crossAxisAlignment,
  spacing,
  reverse = false,
  style,
}) => {
  const gapStyle = spacing === undefined ? undefined : { gap: spacing }

  return (
    <View
      style={[
        {
          flexDirection: reverse ? 'row-reverse' : 'row',
          justifyContent: resolveMainAxisAlignment(mainAxisAlignment),
          alignItems: resolveCrossAxisAlignment(crossAxisAlignment),
        },
        gapStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}
