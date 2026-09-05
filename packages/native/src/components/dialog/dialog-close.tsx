import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useDialog } from './dialog.context'
import type { DialogCloseProps } from './dialog.type'

/**
 * Anything that closes the panel. It renders no glyph of its own: a dialog's dismissal is
 * usually a `Button` saying "Compris", not a cross in a corner — the `Overlay` is what
 * takes the press outside, and `system/close-button` is there for the cross.
 */
export const DialogClose = forwardRef<View, DialogCloseProps>(function DialogClose(
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
  const { close } = useDialog()
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const handlePress = useCallback(
    (event: Parameters<NonNullable<DialogCloseProps['onPress']>>[0]) => {
      onPress?.(event)
      close()
    },
    [close, onPress]
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

DialogClose.displayName = 'XAUI.Dialog.Close'
