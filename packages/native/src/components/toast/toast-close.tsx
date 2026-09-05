import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useToastContext } from './toast.context'
import type { ToastCloseProps } from './toast.type'

/**
 * Anything that sends this toast away early.
 *
 * It knows which toast it belongs to without being told: the host provides the dismiss
 * around each entry, and the `Toast` folds it into the context its slots read.
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
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[
        styleProps,
        typeof style === 'function' ? style({ pressed: isPressed }) : style,
      ]}
      onPress={handlePress}
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
    >
      {children}
    </PressableFeedback>
  )
})

ToastClose.displayName = 'XAUI.Toast.Close'
