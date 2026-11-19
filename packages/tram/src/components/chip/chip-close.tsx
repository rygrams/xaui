import { forwardRef } from 'react'
import type { View } from 'react-native'
import { CloseButtonBase } from '@xaui/native/system'
import { useChip } from './chip.context'
import type { ChipCloseProps } from './chip.type'

/**
 * The cross at the end of the chip — two bars of the `Button`'s line, no circle. Its own
 * control, so a static chip can still be dismissed. Needs an `accessibilityLabel`.
 */
export const ChipClose = forwardRef<View, ChipCloseProps>(function ChipClose(
  { isDisabled, hitSlop, ...props },
  ref
) {
  const {
    closeStyle,
    closeGlyphStyle,
    closeReach,
    isDisabled: isChipDisabled,
  } = useChip()

  return (
    <CloseButtonBase
      ref={ref}
      name="Tram Chip.Close"
      baseStyle={closeStyle}
      glyphStyle={closeGlyphStyle}
      isDisabled={isDisabled ?? isChipDisabled}
      // Native's scale, highlight and ripple stay off: a Tram press changes no colour.
      animation={false}
      // The cross is smaller than a finger: the touch reaches past it to 48.
      hitSlop={hitSlop ?? closeReach}
      {...props}
    />
  )
})

ChipClose.displayName = 'XAUI.Tram.Chip.Close'
