import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useToastContext } from './toast.context'
import type { ToastTitleProps } from './toast.type'

/** What happened. The one node the variant colours. */
export const ToastTitle = forwardRef<Text, ToastTitleProps>(function ToastTitle(
  { children, style, ...props },
  ref
) {
  const { titleStyle } = useToastContext()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} {...rest} style={[titleStyle, styleProps, style]}>
      {children}
    </Text>
  )
})

ToastTitle.displayName = 'XAUI.Toast.Title'
