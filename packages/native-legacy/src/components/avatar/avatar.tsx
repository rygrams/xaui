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
 * The v1 replacement composes instead of configuring: the photo is `Avatar.Image`, the
 * initials are `Avatar.Fallback`, and the fallback is the layer underneath rather than a
 * `source ?? name` branch — so a broken URL leaves the letters in place with nothing to
 * handle. `themeColor` becomes one flat `variant` union of eleven names, `size` takes the
 * four tokens instead of a number, and `customAppearance` becomes a `style` on each slot.
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
