import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext } from '../../system/icon'
import { childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { AvatarInitials } from './avatar-initials'
import { useAvatar } from './avatar.context'
import type { AvatarFallbackProps } from './avatar.type'

/**
 * What shows when there is no photo — and, for as long as one is loading, what shows
 * behind it.
 *
 * ```tsx
 * <Avatar.Fallback>AT</Avatar.Fallback>
 *
 * <Avatar.Fallback>
 *   <Icon as={PersonIcon} />
 * </Avatar.Fallback>
 * ```
 *
 * It is a layer rather than a state: `Avatar.Image` is absolutely positioned over it, so
 * this slot is simply always there. Nothing here knows whether an image exists.
 *
 * **No default glyph**, where HeroUI ships a person icon. XAUI publishes no icon set —
 * `@xaui/icons` was deleted in P0 — so the mark is always the caller's. What this slot does
 * instead is publish the frame's resolved size and colour to `IconContext`, so an `Icon`
 * written inside it needs no props at all.
 */
export const AvatarFallback = forwardRef<View, AvatarFallbackProps>(
  function AvatarFallback({ children, style, ...props }, ref) {
    const { fallbackStyle, icon } = useAvatar()
    const [styleProps, rest] = useStyleProps(props)

    // R3 — the same rule the root applies, and it is here rather than only there so that
    // `<Avatar>AT</Avatar>` and `<Avatar.Fallback>AT</Avatar.Fallback>` render the same
    // two nodes instead of one path with a wrapper and one without.
    const text = childrenToString(children)
    const content =
      text !== null ? <AvatarInitials>{text}</AvatarInitials> : children

    return (
      <View ref={ref} style={[fallbackStyle, styleProps, style]} {...rest}>
        <IconContext.Provider value={icon}>{content}</IconContext.Provider>
      </View>
    )
  }
)

AvatarFallback.displayName = 'XAUI.Avatar.Fallback'
