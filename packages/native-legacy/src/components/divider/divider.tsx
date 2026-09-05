import React from 'react'
import { View } from 'react-native'
import { styles } from './divider.style'
import { useDividerColor, useDividerSize } from './divider.hook'
import type { DividerProps } from './divider.type'

/**
 * @deprecated Use `Divider` from `@xaui/native/divider`. This tree is frozen and receives
 * fixes only.
 *
 * `size` changes meaning: it was a thickness in points and is now one of the four tokens,
 * `xs` being a hairline and `lg` six points. `xs` is also the default, where the rest of
 * the library defaults to `md` — a rule you notice is a rule that is too thick.
 *
 * `themeColor` is gone and **there is no `variant` to replace it**: the v1 `Divider` is the
 * one component in the core without one. A variant is the design system's vocabulary, and
 * on a rule there is nothing for such a name to describe — it briefly had three, naming
 * three separator tokens, which is a shade of grey wearing a word. `color` stays, and is
 * the way past the theme's `separator`.
 *
 * `orientation` keeps its name and its values, and the rule now takes the axis it does not
 * run along from its parent, so neither a width nor a height needs writing.
 *
 * ```tsx
 * // legacy
 * <Divider size={2} themeColor="secondary" orientation="vertical" />
 *
 * // v1
 * <Divider size="md" orientation="vertical" />
 * ```
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
