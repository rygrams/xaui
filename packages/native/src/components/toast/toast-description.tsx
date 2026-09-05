import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useToastContext } from './toast.context'
import type { ToastDescriptionProps } from './toast.type'

/**
 * The detail. It stays muted whatever the variant: the title already said in colour what
 * kind of thing happened, and saying it twice leaves nothing for the eye to rank.
 */
export const ToastDescription = forwardRef<Text, ToastDescriptionProps>(
  function ToastDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useToastContext()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[descriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

ToastDescription.displayName = 'XAUI.Toast.Description'
