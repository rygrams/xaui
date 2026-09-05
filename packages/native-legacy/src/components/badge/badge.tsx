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

/**
 * @deprecated Use `Badge` from `@xaui/native/badge`. This tree is frozen and receives
 * fixes only.
 *
 * The v1 replacement **does not wrap what it decorates**. This one takes the subject as
 * `children` and the badge as `content`; there, the badge *is* the component and
 * `placement` puts it on the corner of whatever contains it. So the wrapper is the
 * caller's, which is what lets a badge sit on anything rather than on what we anticipated.
 *
 * `placement` keeps its name and changes its values — `top-right` becomes **`top-end`**,
 * because the keys underneath are `start` and `end` and a badge on the trailing corner has
 * to mirror in RTL. `content` becomes children, `themeColor` and the four-value `variant`
 * (`solid` / `flat` / `faded` / `shadow`) collapse into one eleven-name `variant`, and
 * `customAppearance` becomes a `style` or style props.
 *
 * `isDot` survives unchanged. `isOneChar` does not: the width already follows the count,
 * because `minWidth` equals the height. `isInvisible` does not either — render it or do
 * not. `showOutline` and `disableOutline` are gone with the wrapper that drew the ring.
 *
 * ```tsx
 * // legacy
 * <Badge content="3" placement="top-right" themeColor="danger">
 *   <BellIcon />
 * </Badge>
 *
 * // v1
 * <View>
 *   <Icon as={BellIcon} size={24} />
 *   <Badge placement="top-end" accessibilityLabel="3 notifications non lues">3</Badge>
 * </View>
 * ```
 */
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
