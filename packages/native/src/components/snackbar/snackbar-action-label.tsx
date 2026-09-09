import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSnackbar } from './snackbar.context'
import type { SnackbarActionLabelProps } from './snackbar.type'

export const SnackbarActionLabel = forwardRef<Text, SnackbarActionLabelProps>(
  function SnackbarActionLabel({ children, style, ...props }, ref) {
    const { actionLabelStyle } = useSnackbar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[actionLabelStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

SnackbarActionLabel.displayName = 'XAUI.Snackbar.ActionLabel'
