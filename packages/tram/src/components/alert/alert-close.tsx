import { forwardRef } from 'react'
import type { View } from 'react-native'
import { CloseButtonBase } from '@xaui/native/system'
import { useAlert } from './alert.context'
import type { AlertCloseProps } from './alert.type'

/**
 * The cross at the end — two bars of the `Button`'s line, no circle. It closes nothing
 * by itself: `onPress` is where the app removes the alert. Needs an `accessibilityLabel`.
 */
export const AlertClose = forwardRef<View, AlertCloseProps>(function AlertClose(
  { isDisabled, hitSlop, ...props },
  ref
) {
  const {
    closeStyle,
    closeGlyphStyle,
    closeReach,
    isDisabled: isAlertDisabled,
  } = useAlert()

  return (
    <CloseButtonBase
      ref={ref}
      name="Tram Alert.Close"
      baseStyle={closeStyle}
      glyphStyle={closeGlyphStyle}
      isDisabled={isDisabled ?? isAlertDisabled}
      // Native's scale, highlight and ripple stay off: a Tram press changes no colour.
      animation={false}
      // The cross is smaller than a finger: the touch reaches past it to 48.
      hitSlop={hitSlop ?? closeReach}
      {...props}
    />
  )
})

AlertClose.displayName = 'XAUI.Tram.Alert.Close'
