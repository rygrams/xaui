import React from 'react'
import { View } from 'react-native'
import type { ColumnProps } from '../layout-types'
import { resolveCrossAxisAlignment, resolveMainAxisAlignment } from '../layout-utils'

export const Column: React.FC<ColumnProps> = ({
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
          flex: 1,
          flexDirection: reverse ? 'column-reverse' : 'column',
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
