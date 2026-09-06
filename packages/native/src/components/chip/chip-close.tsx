import { forwardRef } from 'react'
import { View } from 'react-native'
import { CloseButtonBase } from '../../system/close-button'
import { useChip } from './chip.context'
import type { ChipCloseProps } from './chip.type'

/**
 * The dismiss affordance — a control in its own right, inside a chip that usually is not.
 *
 * ```tsx
 * <Chip variant="default">
 *   <Chip.Label>Design</Chip.Label>
 *   <Chip.Close onPress={remove} accessibilityLabel="Retirer le filtre Design" />
 * </Chip>
 * ```
 *
 * Five lines, because the shared `CloseButtonBase` owns the behaviour — its own press state,
 * the grown touch target, the missing-label warning and the built-in cross — and the chip
 * only hands it the styles its recipe resolved (R5).
 */
export const ChipClose = forwardRef<View, ChipCloseProps>(function ChipClose(
  { isDisabled, ...props },
  ref
) {
  const { closeStyle, closeGlyphStyle, isDisabled: isChipDisabled } = useChip()

  return (
    <CloseButtonBase
      ref={ref}
      name="Chip.Close"
      baseStyle={closeStyle}
      glyphStyle={closeGlyphStyle}
      // The chip's `isDisabled` reaches the cross, because a disabled chip that can still
      // be dismissed is not disabled. An explicit value on the slot still wins.
      isDisabled={isDisabled ?? isChipDisabled}
      {...props}
    />
  )
})

ChipClose.displayName = 'XAUI.Chip.Close'
