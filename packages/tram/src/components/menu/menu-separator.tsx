import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useMenu } from './menu.context'
import type { MenuSeparatorProps } from './menu.type'

/**
 * A break between two runs of rows — a gap, not a rule: Metro separates with space. It is
 * placed by the caller, not drawn between every pair; a menu whose last row is
 * "supprimer" wants exactly one, above it.
 */
export const MenuSeparator = forwardRef<View, MenuSeparatorProps>(
  function MenuSeparator({ style, ...props }, ref) {
    const { separatorStyle } = useMenu()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        // A gap carries nothing a screen reader can read.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[separatorStyle, styleProps, style]}
      />
    )
  }
)

MenuSeparator.displayName = 'XAUI.Tram.Menu.Separator'
