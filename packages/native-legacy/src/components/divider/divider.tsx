import React from 'react'
import { View } from 'react-native'
import { styles } from './divider.style'
import { useDividerColor, useDividerSize } from './divider.hook'
import type { DividerProps } from './divider.type'

/**
 * @deprecated Use `Divider` from `@xaui/native/divider`. This tree is frozen and receives
 * fixes only.
 *
 * The v1 replacement takes `orientation="vertical"` in place of a boolean, `size` in place
 * of a `thickness` number, and a `variant` naming one of the three separator tokens. It
 * needs no width: `alignSelf: 'stretch'` takes the axis it does not run along from the
 * parent, in either orientation.
 */
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
