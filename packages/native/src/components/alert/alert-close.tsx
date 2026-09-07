import { forwardRef } from 'react'
import { View } from 'react-native'
import { CloseButtonBase } from '../../system/close-button'
import { useAlert } from './alert.context'
import type { AlertCloseProps } from './alert.type'

/**
 * The dismiss affordance — the only control an alert contains.
 *
 * ```tsx
 * <Alert variant="danger-soft">
 *   <Alert.Content>
 *     <Alert.Title>Envoi impossible</Alert.Title>
 *   </Alert.Content>
 *   <Alert.Close accessibilityLabel="Fermer l’alerte" onPress={dismiss} />
 * </Alert>
 * ```
 *
 * Five lines, because the shared `CloseButtonBase` owns the behaviour — its own press state,
 * the grown touch target, the missing-label warning and the built-in cross — and the alert
 * only hands it the styles its recipe resolved (R5).
 *
 * It sits at the top of the row like the icon, because that is where the root aligns its
 * columns: a cross floating beside the middle of a three-line message is harder to find
 * than one at the corner.
 */
export const AlertClose = forwardRef<View, AlertCloseProps>(function AlertClose(
  { isDisabled, ...props },
  ref
) {
  const { closeStyle, closeGlyphStyle, isDisabled: isAlertDisabled } = useAlert()

  return (
    <CloseButtonBase
      ref={ref}
      name="Alert.Close"
      baseStyle={closeStyle}
      glyphStyle={closeGlyphStyle}
      // The alert's `isDisabled` reaches the cross, because a disabled alert that can
      // still be dismissed is not disabled. An explicit value on the slot still wins.
      isDisabled={isDisabled ?? isAlertDisabled}
      {...props}
    />
  )
})

AlertClose.displayName = 'XAUI.Alert.Close'
