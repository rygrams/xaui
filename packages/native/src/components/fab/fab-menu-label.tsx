import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useFabMenu } from './fab-menu.context'
import type { FabMenuLabelProps } from './fab-menu.type'

/**
 * The word on a pill.
 *
 * Written by hand only when there is a mark beside it — a bare string child of
 * `Fab.Menu.Item` is wrapped in one of these already (R3).
 *
 * Single-line: the column is as wide as its widest action, and an action long enough to
 * wrap is one that should have been shorter.
 */
export const FabMenuLabel = forwardRef<Text, FabMenuLabelProps>(
  function FabMenuLabel({ children, numberOfLines = 1, style, ...props }, ref) {
    const { itemLabelStyle } = useFabMenu()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[itemLabelStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

FabMenuLabel.displayName = 'XAUI.Fab.Menu.Label'
