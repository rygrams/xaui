import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSnackbar } from './snackbar.context'
import type { SnackbarActionsProps } from './snackbar.type'

export const SnackbarActions = forwardRef<View, SnackbarActionsProps>(
  function SnackbarActions({ children, style, ...props }, ref) {
    const { actionsStyle } = useSnackbar()
    const [styleProps, rest] = useStyleProps(props)
    return (
      <View ref={ref} {...rest} style={[actionsStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)
SnackbarActions.displayName = 'XAUI.Snackbar.Actions'
