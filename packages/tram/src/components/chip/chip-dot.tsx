import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChip } from './chip.context'
import type { ChipDotProps } from './chip.type'

/**
 * A small square before the label — Native's dot, sharp. In the ink, except on a soft
 * slice, where it is the full colour the pale fill stands for.
 */
export const ChipDot = forwardRef<View, ChipDotProps>(function ChipDot(
  { style, ...props },
  ref
) {
  const { dotStyle } = useChip()
  const [styleProps, rest] = useStyleProps(props)

  return <View ref={ref} {...rest} style={[dotStyle, styleProps, style]} />
})

ChipDot.displayName = 'XAUI.Tram.Chip.Dot'
