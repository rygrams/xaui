import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSnackbar } from './snackbar.context'
import type { SnackbarMessageProps } from './snackbar.type'

export const SnackbarMessage = forwardRef<Text, SnackbarMessageProps>(
  function SnackbarMessage({ children, style, ...props }, ref) {
    const { messageStyle } = useSnackbar()
    const [styleProps, rest] = useStyleProps(props)
    return (
      <Text ref={ref} {...rest} style={[messageStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)
SnackbarMessage.displayName = 'XAUI.Snackbar.Message'
