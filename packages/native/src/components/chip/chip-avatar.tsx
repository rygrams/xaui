import { forwardRef } from 'react'
import { Image, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useChip } from './chip.context'
import { chipSheet } from './chip.style'
import type { ChipAvatarProps } from './chip.type'

/**
 * A round, chip-sized frame at the leading edge — a photo, initials, a logo.
 *
 * ```tsx
 * <Chip variant="default">
 *   <Chip.Avatar source={author.photo} />
 *   <Chip.Label>Amina</Chip.Label>
 * </Chip>
 * ```
 *
 * Two forms, like `Icon`: `source` renders the image, and anything else is centred and
 * clipped the same way. The diameter comes from the chip's `size` and always fits inside
 * its height, so a chip with an avatar lines up with the chip next to it that has none.
 *
 * It is a frame and not the `Avatar` component of P3.11 — that one has its own sizes, its
 * own fallback and its own status ring. When it lands, this slot becomes its call site
 * rather than a second implementation.
 */
export const ChipAvatar = forwardRef<View, ChipAvatarProps>(function ChipAvatar(
  { children, source, style, ...props },
  ref
) {
  const { avatarStyle } = useChip()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} style={[avatarStyle, styleProps, style]} {...rest}>
      {source ? <Image source={source} style={chipSheet.avatarImage} /> : children}
    </View>
  )
})

ChipAvatar.displayName = 'XAUI.Chip.Avatar'
