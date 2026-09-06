import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useWidget } from './widget.context'
import type { WidgetViewSlotProps } from './widget.type'

/**
 * The title and its description, as one block.
 *
 * R4, and `ProgressBar.Header`'s reason: the gap between a title and its subtitle is a
 * different gap from the one between that block and whatever sits beside it, and two gaps
 * belong to two roots. It shrinks rather than pushing, so a long title wraps instead of
 * squeezing the trailing content off the row.
 */
export const WidgetHeading = forwardRef<View, WidgetViewSlotProps>(
  function WidgetHeading({ children, style, ...props }, ref) {
    const { headingStyle } = useWidget()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[headingStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

WidgetHeading.displayName = 'XAUI.Widget.Heading'
