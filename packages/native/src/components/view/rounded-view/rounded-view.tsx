import React from 'react'
import { View, StyleSheet } from 'react-native'
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
        fullWidth && styles.fullWidth,
        fullWidth && !noGrowth ? { flex: 1 } : undefined,
        backgroundColor && { backgroundColor },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
})
