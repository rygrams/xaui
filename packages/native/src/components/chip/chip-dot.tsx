import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChip } from './chip.context'
import type { ChipDotProps } from './chip.type'

/**
 * The status mark — a filled circle, sized by the chip and painted in its foreground.
 *
 * ```tsx
 * <Chip variant="tertiary">
 *   <Chip.Dot />
 *   <Chip.Label>En cours</Chip.Label>
 * </Chip>
 * ```
 *
 * The foreground and not a status token of its own: on a filled `success` chip the only
 * readable colour is the one the label already uses, and on a `success-soft` one that
 * token *is* the green. `backgroundColor` is a style prop (R14) for the rare dot that
 * reports something other than what its chip does.
 *
 * `accessibilityElementsHidden` is not set here: the dot carries no information the label
 * beside it does not already say, and a chip whose colour is its only meaning is an
 * accessibility problem the dot cannot fix.
 */
export const ChipDot = forwardRef<View, ChipDotProps>(function ChipDot(
  { style, ...props },
  ref
) {
  const { dotStyle } = useChip()
  const [styleProps, rest] = useStyleProps(props)

  return <View ref={ref} style={[dotStyle, styleProps, style]} {...rest} />
})

ChipDot.displayName = 'XAUI.Chip.Dot'
