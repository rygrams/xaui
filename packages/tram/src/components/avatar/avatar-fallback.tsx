import { forwardRef } from 'react'
import { View } from 'react-native'
import { IconContext, childrenToString, useStyleProps } from '@xaui/native/system'
import { AvatarInitials } from './avatar-initials'
import { useAvatar } from './avatar.context'
import type { AvatarFallbackProps } from './avatar.type'

/**
 * What shows when there is no photo — and, while one loads, what shows behind it. An
 * `Icon` inside it needs no props: it is handed the frame's size and ink.
 *
 * ```tsx
 * <Avatar.Fallback>am</Avatar.Fallback>
 * <Avatar.Fallback>
 *   <Icon as={PersonIcon} />
 * </Avatar.Fallback>
 * ```
 */
export const AvatarFallback = forwardRef<View, AvatarFallbackProps>(
  function AvatarFallback({ children, style, ...props }, ref) {
    const { fallbackStyle, icon } = useAvatar()
    const [styleProps, rest] = useStyleProps(props)

    const text = childrenToString(children)
    const content =
      text !== null ? <AvatarInitials>{text}</AvatarInitials> : children

    return (
      <View ref={ref} {...rest} style={[fallbackStyle, styleProps, style]}>
        <IconContext.Provider value={icon}>{content}</IconContext.Provider>
      </View>
    )
  }
)

AvatarFallback.displayName = 'XAUI.Tram.Avatar.Fallback'
