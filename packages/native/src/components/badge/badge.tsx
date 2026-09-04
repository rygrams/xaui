import { forwardRef, useMemo } from 'react'
import { Text, View } from 'react-native'
import { Slot, childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { BADGE_DEFAULT_SIZE, badgeOffset, badgeRecipe } from './badge.recipe'
import type { BadgeProps } from './badge.type'
import { placementInsets } from './badge.utils'

/**
 * A count, or the fact that there is one.
 *
 * ```tsx
 * <Badge>3</Badge>
 * <Badge variant="success-soft" size="sm">Payé</Badge>
 * <Badge isDot variant="warning" />
 *
 * <View>
 *   <Icon as={BellIcon} size={24} />
 *   <Badge placement="top-end">12</Badge>
 * </View>
 * ```
 *
 * **One node and no slots**, per the plan. A badge is a mark: whatever is inside it is one
 * line of two or three characters, and a slot would be a name for a `Text` this component
 * can just as well insert itself (R3).
 *
 * **It is not a small `Chip`.** A chip holds a word and hugs it; a badge holds a count and
 * is round unless the count is too wide to be. That is the `minWidth` equal to the height —
 * one digit is a circle, two are a capsule — and it is why the label stays at 12pt through
 * three of the four sizes, because a count that grows with its badge stops being a count.
 *
 * **`placement` makes the parent whatever the badge decorates.** Unset, the badge is in
 * flow and laid out like any other node, which is what a badge at the end of a list row
 * wants. Set, it is pulled half its own height out of that corner of the parent, so its
 * centre lands on the corner it marks.
 */
export const Badge = forwardRef<View, BadgeProps>(function Badge(
  {
    children,
    variant,
    size,
    radius,
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
  // R14, after the component's own vocabulary is destructured: that is what keeps `size`
  // the badge's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)

  // The recipe's own default, read rather than repeated: the `dot` axis is selected by
  // size, and the offset below is measured from it, so both need the resolved value.
  const resolvedSize = size ?? BADGE_DEFAULT_SIZE

  const selection = {
    variant,
    size,
    radius,
    // An axis left unselected contributes nothing, which is exactly "this badge has a
    // label" — no `false` branch with nothing to say.
    dot: isDot ? resolvedSize : undefined,
  }
  const styles = badgeRecipe.resolve({ theme, selection })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours callers invent.
  const tint = color ? badgeRecipe.tint({ theme, color, selection }) : undefined

  // Outside the cache for the reason the insets must not be in it: they exist only under a
  // `placement`, and a cached style carrying them would nudge every badge that is in flow.
  const insets = useMemo(
    () => placementInsets(placement, badgeOffset(theme, resolvedSize, isDot)),
    [placement, theme, resolvedSize, isDot]
  )

  // The order of §2 ter, most general to most specific: the cached recipe, the uncached
  // tint and placement, the style props, then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, insets, styleProps, style]

  // R3 — a stringifiable tree becomes the label, which is the whole component most of the
  // time. A dot has no label: it is the absence of one, so there is nothing to sit in it.
  const text = childrenToString(children)
  const label =
    text !== null ? (
      <Text style={[styles.label, tint?.label]} numberOfLines={1}>
        {text}
      </Text>
    ) : (
      children
    )

  // A dot has no label: it is the absence of one, so there is nothing to sit in it.
  const content = isDot ? null : label

  // R12 — the caller's element becomes the badge, and it takes the children it was written
  // with, so the auto-wrap does not apply to it.
  const Root = asChild ? Slot : View

  return (
    <Root
      ref={ref}
      // No default role: a badge is a label, and what a screen reader reads is the text
      // inside it. What it cannot read is the *subject* — "3" beside a bell means three
      // notifications only to someone who can see the bell — so a placed badge is one of
      // the few places an `accessibilityLabel` is not optional. R9 keeps it the caller's.
      {...rest}
      style={rootStyle}
    >
      {asChild ? children : content}
    </Root>
  )
})

Badge.displayName = 'XAUI.Badge'
