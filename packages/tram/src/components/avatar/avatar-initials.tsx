import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useAvatar } from './avatar.context'
import type { AvatarInitialsProps } from './avatar.type'

/**
 * The letters, on the Tram scale the size chose. The root writes one around a
 * stringifiable child; composing it is how the letters get props of their own.
 */
export const AvatarInitials = forwardRef<Text, AvatarInitialsProps>(
  function AvatarInitials({ children, style, ...props }, ref) {
    const { initialsStyle } = useAvatar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        // Two letters standing in for a photo are decoration: the name beside them is
        // what a screen reader reads.
        accessibilityElementsHidden
        importantForAccessibility="no"
        numberOfLines={1}
        {...rest}
        style={[initialsStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

AvatarInitials.displayName = 'XAUI.Tram.Avatar.Initials'
