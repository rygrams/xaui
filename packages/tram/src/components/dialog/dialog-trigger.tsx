import { forwardRef, useCallback } from 'react'
import type { View } from 'react-native'
import { useMergedRef } from '@xaui/native'
import { DialogPress } from './dialog-press'
import { useDialog } from './dialog.context'
import type { DialogTriggerProps } from './dialog.type'

/**
 * What asks the question. It paints nothing of its own — a dialog's trigger is a `Button`
 * far more often than not: `asChild`. A screen reader hears whether the banner is open,
 * and the focus comes back here once it has closed.
 *
 * While the dialog is disabled it opens nothing and is grey: the `Button` handed to
 * `asChild` draws its own disabled state, and a string is set in the muted ink.
 */
export const DialogTrigger = forwardRef<View, DialogTriggerProps>(
  function DialogTrigger({ accessibilityState, onPress, ...props }, ref) {
    const { triggerStyle, trigger, isOpen, isDisabled, toggle } = useDialog()
    const refs = useMergedRef(trigger, ref)

    const handlePress = useCallback(
      (event: Parameters<NonNullable<DialogTriggerProps['onPress']>>[0]) => {
        onPress?.(event)
        if (!isDisabled) toggle()
      },
      [onPress, isDisabled, toggle]
    )

    return (
      <DialogPress
        ref={refs}
        isDisabled={isDisabled}
        boxStyle={triggerStyle}
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

DialogTrigger.displayName = 'XAUI.Tram.Dialog.Trigger'
