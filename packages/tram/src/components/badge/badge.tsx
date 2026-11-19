import { forwardRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, childrenToString, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { tramAccents } from '../../theme/tram-tokens'
import { DEFAULT_SIZE, DEFAULT_VARIANT, badgeRecipe } from './badge.recipe'
import type { BadgeProps } from './badge.type'
import { placementInsets } from './badge.utils'

/**
 * A count, or a sign that something is new: a sharp rectangle of the accent with the
 * number cut into it — drawn as the `Button` is, from a fill to the number alone.
 *
 * ```tsx
 * <View>
 *   <Avatar>am</Avatar>
 *   <Badge placement="top-end">3</Badge>
 * </View>
 *
 * <Badge accent="red" size="sm">99+</Badge>
 * <Badge variant="outline">12</Badge>
 * <Badge isDot />
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
  // A named accent is painted as the `Button` paints it: the true colour as a fill, the
  // mode's ink as a line or a number. A raw `color` is the caller's word, never corrected.
  const named =
    accent && !color
      ? accentPaintFor(tramAccents[accent], variant, theme.colors.background)
      : undefined
  const paint = color ?? named?.tint
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? badgeRecipe.tint({ theme, color: paint, selection })
    : undefined
  const ink = named?.label ? { color: named.label } : undefined
  const labelStyle = [styles.label, tint?.label, ink]

  // A dot has no number to carry the colour: with no box drawn, the square is the ink.
  const inkDot =
    isDot && variant === 'text'
      ? { backgroundColor: StyleSheet.flatten<TextStyle>(labelStyle).color }
      : undefined

  // Most general to most specific: the cached recipe, the tint, the corner, the style
  // props, `style`.
  const rootStyle = [
    styles.root,
    tint?.root,
    inkDot,
    placementInsets(placement),
    styleProps,
    style,
  ]

  // A stringifiable tree is the count: `<Badge>3</Badge>` is most badges.
  const text = childrenToString(children)
  const label =
    text !== null ? (
      <Text style={labelStyle} numberOfLines={1}>
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
