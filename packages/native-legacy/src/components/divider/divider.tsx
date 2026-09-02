import React from 'react'
import { View } from 'react-native'
import { styles } from './divider.style'
import { useDividerColor, useDividerSize } from './divider.hook'
import type { DividerProps } from './divider.type'

export const Divider: React.FC<DividerProps> = ({
  size = 1,
  themeColor = 'default',
  color,
  orientation = 'horizontal',
}) => {
  const dividerColor = useDividerColor(themeColor, color)
  const sizeStyles = useDividerSize(size, orientation)

  return (
    <View
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        sizeStyles,
        { backgroundColor: dividerColor },
      ]}
    />
  )
}
