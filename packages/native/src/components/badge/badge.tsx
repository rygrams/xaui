import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './badge.style'
import type { BadgeProps } from './badge.type'
import {
  useBadgePlacementStyles,
  useBadgeShapeStyles,
  useBadgeSizeStyles,
  useBadgeVariantStyles,
} from './badge.hook'

export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  shape = 'rectangle',
  placement = 'top-right',
  showOutline = true,
  disableOutline = false,
  isInvisible = false,
  isDot = false,
  isOneChar = false,
  disableAnimation = false,
  style,
  badgeStyle,
  textStyle,
}: BadgeProps) => {
  const shouldRender = !isInvisible && (isDot || content !== undefined)
  if (!shouldRender && !children) {
    return null
  }

  const sizeStyles = useBadgeSizeStyles(size, isDot, isOneChar)
  const variantStyles = useBadgeVariantStyles(themeColor, variant)
  const shapeStyles = useBadgeShapeStyles(shape, sizeStyles.height)
  const placementStyles = useBadgePlacementStyles(placement, sizeStyles.height)

  const outlineEnabled = disableOutline ? false : showOutline
  const outlineStyles = outlineEnabled
    ? { borderWidth: 1, borderColor: '#FFFFFF' }
    : { borderWidth: 0, borderColor: 'transparent' }

  const badgeContent = isDot ? null : content

  return (
    <View style={[styles.container, style]}>
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
            shapeStyles,
            placementStyles,
            outlineStyles,
            variantStyles.shadow,
            badgeStyle,
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
                textStyle,
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
