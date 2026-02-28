import React from 'react'
import { View } from 'react-native'
import { useRoundedViewStyle } from './rounded-view.hook'
import type { RoundedViewProps } from './rounded-view.type'

export const RoundedView: React.FC<RoundedViewProps> = ({
  children,
  all,
  top,
  bottom,
  left,
  right,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  fullWidth = false,
  backgroundColor,
  style,
  noGrowth = false,
}) => {
  const borderRadiusStyle = useRoundedViewStyle({
    all,
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  })

  return (
    <View
      style={[
        borderRadiusStyle,
        fullWidth && { width: '100%' },
        noGrowth ? undefined : { flex: 1 },
        backgroundColor && { backgroundColor },
        style,
      ]}
    >
      {children}
    </View>
  )
}
