import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { useMergedRef } from '@xaui/native'
import { BottomSheetPress } from './bottom-sheet-press'
import { useBottomSheet } from './bottom-sheet.context'
import type { BottomSheetTriggerProps } from './bottom-sheet.type'

/**
 * What brings the band up. It paints nothing of its own — a sheet's trigger is a `Button`
 * far more often than not: `asChild`. A screen reader hears whether the band is open, and
 * the focus comes back here once it has gone.
 *
 * While the sheet is disabled it opens nothing and is grey: the `Button` handed to
 * `asChild` draws its own disabled state, and a string is set in the muted ink.
 */
export const BottomSheetTrigger = forwardRef<View, BottomSheetTriggerProps>(
  function BottomSheetTrigger({ accessibilityState, onPress, ...props }, ref) {
    const { triggerStyle, triggerLabelStyle, trigger, isOpen, isDisabled, toggle } =
      useBottomSheet()
    const refs = useMergedRef(trigger, ref)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<BottomSheetTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        if (!isDisabled) toggle()
      },
      [onPress, isDisabled, toggle]
    )

    return (
      <BottomSheetPress
        ref={refs}
        isDisabled={isDisabled}
        boxStyle={triggerStyle}
        labelStyle={triggerLabelStyle}
        // Merged, not spread over: a caller naming another state must not drop these.
        accessibilityState={{
          disabled: isDisabled,
          expanded: isOpen,
          ...accessibilityState,
        }}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        {...props}
        onPress={handlePress}
      />
    )
  }
)

BottomSheetTrigger.displayName = 'XAUI.Tram.BottomSheet.Trigger'
