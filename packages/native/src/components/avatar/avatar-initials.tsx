import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useAvatar } from './avatar.context'
import type { AvatarInitialsProps } from './avatar.type'

/**
 * The letters. The root inserts one around a stringifiable fallback, so it is rarely
 * written by hand — composing it is how you give the letters props of their own:
 *
 * ```tsx
 * <Avatar.Fallback>
 *   <Avatar.Initials fontWeight="700">AT</Avatar.Initials>
 * </Avatar.Fallback>
 * ```
 */
export const AvatarInitials = forwardRef<Text, AvatarInitialsProps>(
  function AvatarInitials({ children, style, ...props }, ref) {
    const { initialsStyle } = useAvatar()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        // A face is read by the name beside it, not by the two letters standing in for a
        // photo — those are decoration, and announcing "A T" on every row is noise. R9
        // keeps it overridable for the avatar that really is the only label there is.
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

AvatarInitials.displayName = 'XAUI.Avatar.Initials'
