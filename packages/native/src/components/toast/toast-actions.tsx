import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useToastContext } from './toast.context'
import type { ToastActionsProps } from './toast.type'

/**
 * The row of things you can do about it — "Annuler", "Réessayer".
 *
 * A row rather than a single `Action`, because the useful toast has two: the thing and the
 * way out of it. Whatever goes in is the caller's; a toast that dictated its own buttons
 * would dictate their wording too.
 */
export const ToastActions = forwardRef<View, ToastActionsProps>(
  function ToastActions({ children, style, ...props }, ref) {
    const { actionsStyle } = useToastContext()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[actionsStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ToastActions.displayName = 'XAUI.Toast.Actions'
