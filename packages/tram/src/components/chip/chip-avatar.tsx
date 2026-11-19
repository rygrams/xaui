import { forwardRef } from 'react'
import { Image, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useChip } from './chip.context'
import { chipSheet } from './chip.style'
import type { ChipAvatarProps } from './chip.type'

/**
 * The Metro thumbnail at the start of the chip: a square, sharp, its photo clipped to it.
 * Without a `source`, the children fill it — a Tram `Avatar` of the same side, say.
 */
export const ChipAvatar = forwardRef<View, ChipAvatarProps>(function ChipAvatar(
  { children, source, style, ...props },
  ref
) {
  const { avatarStyle } = useChip()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[avatarStyle, styleProps, style]}>
      {source ? <Image source={source} style={chipSheet.avatarImage} /> : children}
    </View>
  )
})

ChipAvatar.displayName = 'XAUI.Tram.Chip.Avatar'
