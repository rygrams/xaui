import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './badge.style'
import type { BadgeProps } from './badge.type'
import {
  useBadgePlacementStyles,
  useBadgeRadiusStyles,
  useBadgeSizeStyles,
  useBadgeVariantStyles,
} from './badge.hook'

export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'full',
  placement = 'top-right',
  showOutline = true,
  disableOutline = false,
  isInvisible = false,
  isDot = false,
  isOneChar = false,
  disableAnimation = false,
  customAppearance,
}: BadgeProps) => {
  const shouldRender = !isInvisible && (isDot || content !== undefined)
  if (!shouldRender && !children) {
    return null
  }

  const forceOneChar = isOneChar
  const sizeStyles = useBadgeSizeStyles(size, isDot, forceOneChar)
  const variantStyles = useBadgeVariantStyles(themeColor, variant)
  const radiusStyles = useBadgeRadiusStyles(radius, sizeStyles.height)
  const placementStyles = useBadgePlacementStyles(placement, sizeStyles.height)

  const outlineEnabled = disableOutline ? false : showOutline
  const outlineStyles = outlineEnabled
    ? { borderWidth: 1, borderColor: '#FFFFFF' }
    : { borderWidth: 0, borderColor: 'transparent' }

  const badgeContent = isDot ? null : content

  return (
    <View style={[styles.container, customAppearance?.container]}>
      {children}
      {shouldRender && (
        <View
          style={[
            styles.badge,
            {
              minWidth: sizeStyles.minWidth,
              height: sizeStyles.height,
              paddingHorizontal: sizeStyles.paddingHorizontal,
              backgroundColor: variantStyles.backgroundColor,
              opacity: disableAnimation ? 1 : 1,
            },
            radiusStyles,
            placementStyles,
            outlineStyles,
            variantStyles.shadow,
            customAppearance?.badge,
          ]}
          accessible
          accessibilityRole="text"
        >
          {badgeContent !== undefined && badgeContent !== null && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: sizeStyles.fontSize,
                  color: variantStyles.color,
                },
                customAppearance?.text,
              ]}
            >
              {badgeContent}
            </Text>
          )}
        </View>
      )}
    </View>
  )
}
