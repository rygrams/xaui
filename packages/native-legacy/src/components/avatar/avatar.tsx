import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from './avatar.style'
import type { AvatarProps } from './avatar.type'
import {
  getDefaultInitials,
  useAvatarColors,
  useAvatarRadiusStyles,
  useAvatarSizeStyles,
} from './avatar.hook'

/**
 * @deprecated Use `Avatar` from `@xaui/native/avatar`. This tree is frozen and receives
 * fixes only.
 *
 * The v1 replacement composes where this one configures. `src` becomes `Avatar.Image`,
 * `name` plus `getInitials` become whatever you write inside `Avatar.Fallback`, and `icon`
 * and `fallback` collapse into that one slot — the library computes no initials for you,
 * because splitting a name is a locale decision and not a component's.
 *
 * **`showFallback` has no equivalent, and that is the point.** The fallback is not a state
 * there: `Avatar.Image` is absolutely positioned over `Avatar.Fallback`, and an image with
 * nothing decoded draws nothing, so the fallback shows while the photo loads and stays if
 * the URL is wrong. There is no flag to set and no `onError` to handle.
 *
 * `themeColor` becomes the eleven-name `variant` union or a raw `color`; `size` takes the
 * four tokens rather than a number; `isBordered` is `variant="tertiary"`; and
 * `customAppearance` becomes a `style`, or style props, on each slot.
 *
 * ```tsx
 * // legacy
 * <Avatar src={photo} name="Amina Traoré" size="md" themeColor="primary" showFallback />
 *
 * // v1
 * <Avatar size="md" variant="primary">
 *   <Avatar.Image source={{ uri: photo }} />
 *   <Avatar.Fallback>AT</Avatar.Fallback>
 * </Avatar>
 * ```
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  icon,
  fallback,
  size = 'md',
  radius = 'full',
  themeColor = 'default',
  isBordered = false,
  isDisabled = false,
  showFallback = false,
  getInitials,
  customAppearance,
}: AvatarProps) => {
  const [isError, setIsError] = React.useState(false)

  const { size: resolvedSize, fontSize } = useAvatarSizeStyles(size)
  const radiusStyles = useAvatarRadiusStyles(radius, resolvedSize)
  const { backgroundColor, textColor, borderColor } = useAvatarColors(
    themeColor,
    isDisabled
  )

  const accessibilityLabel = name ?? 'Avatar'
  const shouldShowFallback = showFallback || !src || isError
  const initials = name ? (getInitials ?? getDefaultInitials)(name) : ''

  return (
    <View
      style={[
        styles.container,
        {
          width: resolvedSize,
          height: resolvedSize,
          backgroundColor,
          opacity: isDisabled ? 0.6 : 1,
          borderWidth: isBordered ? 1 : 0,
          borderColor: isBordered ? borderColor : 'transparent',
        },
        radiusStyles,
        customAppearance?.container,
      ]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      {!shouldShowFallback && src ? (
        <Image
          source={{ uri: src }}
          style={[styles.image, radiusStyles, customAppearance?.image]}
          accessibilityLabel={accessibilityLabel}
          onError={() => setIsError(true)}
        />
      ) : (
        <View style={[styles.fallback, { width: '100%', height: '100%' }]}>
          {fallback ?? icon ?? (
            <Text
              style={[
                {
                  color: textColor,
                  fontSize,
                  fontWeight: '600',
                },
                customAppearance?.text,
              ]}
            >
              {initials}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}
