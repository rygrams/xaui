import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { Slot, childrenToString, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { groundPaint } from '../../system/ground-paint'
import { isLineReport, namedSoftInk } from '../../system/report-tokens'
import { DEFAULT_SIZE, DEFAULT_VARIANT, badgeRecipe } from './badge.recipe'
import type { BadgeProps } from './badge.type'
import { placementInsets } from './badge.utils'

/**
 * A count, or a sign that something is new: a sharp rectangle of the accent with the
 * number cut into it, the count of a Metro tile.
 *
 * ```tsx
 * <View>
 *   <Avatar>am</Avatar>
 *   <Badge placement="top-end">3</Badge>
 * </View>
 *
 * <Badge variant="danger" size="sm">99+</Badge>
 * <Badge isDot accent="lime" />
 * ```
 *
 * `placement` pins it inside a corner of the nearest positioned parent, flush with its
 * edges — not astride the corner as in Native. What the number counts is the caller's to
 * say: a badge has no role, and its parent's label is what a screen reader reads.
 */
export const Badge = forwardRef<View, BadgeProps>(function Badge(
  {
    children,
    variant = DEFAULT_VARIANT,
    size,
    radius,
    accent,
    color,
    isDot = false,
    placement,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = {
    variant,
    size,
    radius,
    // The dot's side follows the badge's size, so `dot` is keyed by it.
    dot: isDot ? (size ?? DEFAULT_SIZE) : undefined,
  }
  const styles = badgeRecipe.resolve({ theme, selection })
  const paint = groundPaint({
    accent,
    color,
    isLine: isLineReport(variant),
    page: theme.colors.background,
  })
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? badgeRecipe.tint({ theme, color: paint, selection })
    : undefined
  const ink = namedSoftInk(variant, accent, color, theme.colors.background)

  // Most general to most specific: the cached recipe, the tint, the corner, the style
  // props, `style`.
  const rootStyle = [
    styles.root,
    tint?.root,
    placementInsets(placement),
    styleProps,
    style,
  ]

  // A stringifiable tree is the count: `<Badge>3</Badge>` is most badges.
  const text = childrenToString(children)
  const label =
    text !== null ? (
      <Text
        style={[styles.label, tint?.label, ink ? { color: ink } : undefined]}
        numberOfLines={1}
      >
        {text}
      </Text>
    ) : (
      children
    )

  const Root = asChild ? Slot : View

  return (
    <Root ref={ref} {...rest} style={rootStyle}>
      {asChild ? children : isDot ? null : label}
    </Root>
  )
})

Badge.displayName = 'XAUI.Tram.Badge'
