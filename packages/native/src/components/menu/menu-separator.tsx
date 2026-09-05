import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useMenu } from './menu.context'
import type { MenuSeparatorProps } from './menu.type'

/**
 * A rule between two runs of rows.
 *
 * **Placed by you, not drawn between every pair.** A menu of four related actions wants
 * none; a menu whose last row is "Supprimer" wants exactly one, above it. Drawing them all
 * and asking for the exceptions is the wrong way round — a menu is short enough that the
 * one place a break belongs is obvious to whoever wrote it, and invisible to the component.
 *
 * It is not a `Divider`, and does not take that component's variants: this one is the
 * menu's own trim, resolved on the menu's root with everything else the panel reads.
 */
export const MenuSeparator = forwardRef<View, MenuSeparatorProps>(
  function MenuSeparator({ style, ...props }, ref) {
    const { separatorStyle } = useMenu()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View
        ref={ref}
        // A rule carries no information a screen reader can read, and announcing "separator"
        // between every pair of actions is noise in the one place a menu has to be brisk.
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...rest}
        style={[separatorStyle, styleProps, style]}
      />
    )
  }
)

MenuSeparator.displayName = 'XAUI.Menu.Separator'
