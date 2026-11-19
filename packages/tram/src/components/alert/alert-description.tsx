import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAlert } from './alert.context'
import type { AlertDescriptionProps } from './alert.type'

/** The detail, in the title's ink faded — the `Card`'s. */
export const AlertDescription = forwardRef<Text, AlertDescriptionProps>(
  function AlertDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useAlert()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

AlertDescription.displayName = 'XAUI.Tram.Alert.Description'
