import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useWidget } from './widget.context'
import type { WidgetViewSlotProps } from './widget.type'

/**
 * The well, and what is in it.
 *
 * **A ground, not a chart slot.** A figure, a table, a list of rows, a map — whatever the
 * widget is showing goes here, and the only thing this slot knows about it is that it is a
 * different level from the card around it.
 *
 * It clips, so a figure drawn to its edges takes the well's corner rather than overhanging
 * it. That matters for exactly the case this component exists for: a chart's own box is a
 * rectangle, and a rectangle in a rounded well shows its corners.
 */
export const WidgetContent = forwardRef<View, WidgetViewSlotProps>(
  function WidgetContent({ children, style, ...props }, ref) {
    const { contentStyle } = useWidget()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

WidgetContent.displayName = 'XAUI.Widget.Content'
