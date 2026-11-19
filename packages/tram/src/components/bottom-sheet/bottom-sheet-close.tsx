import { forwardRef, useCallback } from 'react'
import { View } from 'react-native'
import { warnDev } from '@xaui/native/system'
import { closeButtonSheet } from '../close-button/close-button.style'
import { BottomSheetPress } from './bottom-sheet-press'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetCloseProps } from './bottom-sheet.type'

/**
 * Anything that sends the band back down — and any answer on it, since answering closes
 * it.
 *
 * ```tsx
 * <BottomSheet.Close accessibilityLabel="fermer" />
 * <BottomSheet.Close asChild>
 *   <Button>ajouter au panier</Button>
 * </BottomSheet.Close>
 * ```
 *
 * **Left empty it draws a cross**, where Native's draws nothing: the `CloseButton`'s two
 * bars without their circle, in the band's ink, in a box of 48. A cross is not text, so
 * it needs an `accessibilityLabel`. `asChild` makes it one of the caller's buttons; a
 * string is set in `body`. The caller's `onPress` runs first, then the band goes.
 */
export const BottomSheetClose = forwardRef<View, BottomSheetCloseProps>(
  function BottomSheetClose({ children, asChild = false, onPress, ...props }, ref) {
    const { closeStyle, closeLabelStyle, closeBarStyle, close } = useBottomSheet()
    const isCross = !asChild && (children === undefined || children === null)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<BottomSheetCloseProps['onPress']>>[0]) => {
        onPress?.(event)
        close()
      },
      [onPress, close]
    )

    if (isCross && !props.accessibilityLabel && !props['aria-label']) {
      warnDev(
        'Tram BottomSheet.Close: an empty close draws a cross and needs an ' +
          '`accessibilityLabel` — the cross is not text.'
      )
    }

    return (
      <BottomSheetPress
        ref={ref}
        asChild={asChild}
        boxStyle={closeStyle}
        labelStyle={closeLabelStyle}
        {...props}
        onPress={handlePress}
      >
        {isCross ? (
          <>
            <View style={[closeBarStyle, closeButtonSheet.bar]} />
            <View style={[closeBarStyle, closeButtonSheet.barMirrored]} />
          </>
        ) : (
          children
        )}
      </BottomSheetPress>
    )
  }
)

BottomSheetClose.displayName = 'XAUI.Tram.BottomSheet.Close'
