import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '@xaui/native'
import { PressableFeedback, useStyleProps } from '@xaui/native/system'
import { useToastContext } from './toast.context'
import type { ToastCloseProps } from './toast.type'

/**
 * Anything that sends this toast away early. It knows which toast it belongs to without
 * being told, and it draws nothing of its own — no cross: a Metro toast is closed with a
 * swipe, and a visible way out is the caller's to compose.
 *
 * ```tsx
 * <Toast.Close asChild><Button>fermer</Button></Toast.Close>
 * ```
 */
export const ToastClose = forwardRef<View, ToastCloseProps>(function ToastClose(
  {
    children,
    asChild = false,
    accessibilityRole = 'button',
    style,
    onPress,
    onPressIn,
    onPressOut,
    ...props
  },
  ref
) {
  const { dismiss } = useToastContext()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const handlePress = useCallback(
    (event: Parameters<NonNullable<ToastCloseProps['onPress']>>[0]) => {
      onPress?.(event)
      dismiss()
    },
    [dismiss, onPress]
  )

  return (
    <PressableFeedback
      ref={ref}
      isPressed={isPressed}
      asChild={asChild}
      // Native's scale, highlight and ripple stay off: a Tram press changes no colour, and
      // under `asChild` the caller's `Button` brings its own movement.
      animation={false}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[styleProps, style]}
      onPress={handlePress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {children}
    </PressableFeedback>
  )
})

ToastClose.displayName = 'XAUI.Tram.Toast.Close'
