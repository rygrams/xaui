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
  style,
  imageStyle,
  textStyle,
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
        style,
      ]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      {!shouldShowFallback && src ? (
        <Image
          source={{ uri: src }}
          style={[styles.image, radiusStyles, imageStyle]}
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
                textStyle,
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
