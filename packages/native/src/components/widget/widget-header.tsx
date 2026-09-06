import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useWidget } from './widget.context'
import type { WidgetViewSlotProps } from './widget.type'

/**
 * The row above the well: what this is, and what belongs beside it.
 *
 * `space-between`, aligned to the top — so a two-line heading on the leading edge and a
 * legend, a menu or a badge on the trailing one sit level at their first line rather than
 * centred against each other.
 */
export const WidgetHeader = forwardRef<View, WidgetViewSlotProps>(
  function WidgetHeader({ children, style, ...props }, ref) {
    const { headerStyle } = useWidget()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[headerStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

WidgetHeader.displayName = 'XAUI.Widget.Header'
