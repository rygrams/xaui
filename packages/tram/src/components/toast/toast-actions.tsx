import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useToastContext } from './toast.context'
import type { ToastActionsProps } from './toast.type'

/**
 * The row of things you can do about it, at the end of the line. What goes in is the
 * caller's — Tram `Button`s, which the toast draws as text in its own ink.
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

ToastActions.displayName = 'XAUI.Tram.Toast.Actions'
