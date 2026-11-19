import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAlert } from './alert.context'
import type { AlertContentProps } from './alert.type'

/** The title over the description, taking what the row leaves between square and cross. */
export const AlertContent = forwardRef<View, AlertContentProps>(
  function AlertContent({ children, style, ...props }, ref) {
    const { contentStyle } = useAlert()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

AlertContent.displayName = 'XAUI.Tram.Alert.Content'
