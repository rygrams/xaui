import React from 'react'
import { View } from 'react-native'
import type { ViewStyle } from 'react-native'
import type { ColumnProps } from '../layout-types'
import { resolveCrossAxisAlignment, resolveMainAxisAlignment } from '../layout-utils'

export const Column: React.FC<ColumnProps> = ({
  children,
  mainAxisAlignment,
  crossAxisAlignment,
  spacing,
  reverse = false,
  fullWidth,
  style,
}) => {
  const gapStyle = spacing === undefined ? undefined : { gap: spacing }
  const fullWidthStyle = fullWidth
    ? ({ flexShrink: 1, flexBasis: 'auto', width: '100%' } as ViewStyle)
    : undefined

  return (
    <View
      style={[
        {
          flexDirection: reverse ? 'column-reverse' : 'column',
          justifyContent: resolveMainAxisAlignment(mainAxisAlignment),
          alignItems: resolveCrossAxisAlignment(crossAxisAlignment),
        },
        fullWidthStyle,
        gapStyle,
        style,
      ]}
    >
      {children}
    </View>
  )
}
