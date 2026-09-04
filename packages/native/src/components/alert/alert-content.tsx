import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAlert } from './alert.context'
import type { AlertContentProps } from './alert.type'

/**
 * The middle column — the title and the description, and whatever else the message needs.
 *
 * It exists because the root is a **row**: without it the title and the description would
 * be laid out beside the icon rather than under each other. It takes the width the icon
 * and the close leave (`flex: 1`), which is what makes a long message wrap instead of
 * pushing the cross off the edge.
 *
 * It has no margin of its own (R4): what separates it from the icon is the root's `gap`,
 * and what separates the title from the description is this section's own.
 */
export const AlertContent = forwardRef<View, AlertContentProps>(
  function AlertContent({ children, style, ...props }, ref) {
    const { contentStyle } = useAlert()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} style={[contentStyle, styleProps, style]} {...rest}>
        {children}
      </View>
    )
  }
)

AlertContent.displayName = 'XAUI.Alert.Content'
