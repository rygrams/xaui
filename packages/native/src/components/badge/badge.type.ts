import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type BadgeSlot = 'root' | 'label'

/**
 * The full vocabulary (§1 bis), and the `Chip`'s eleven — a badge is what a chip is when
 * it is too small to hold a word: something a component **reports** about itself. So the
 * three status families are here for the same reason they are there, and a name means the
 * same thing in both.
 *
 * `danger` is the default rather than `primary`, and it is the only component in the
 * library whose default is not the first name in the ladder. A badge is overwhelmingly the
 * count of something that wants attention — unread, failed, overdue — and a red one is what
 * a caller writing `<Badge>3</Badge>` means. The accent count is a `variant` away.
 */
export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

export type BadgeSize = Size

/**
 * Which corner it hangs off, when it hangs off something.
 *
 * Unset, the badge is in flow and the parent lays it out like any other node — which is the
 * right thing for a badge at the end of a list row. Set, it is absolutely positioned in
 * that corner of the **parent**, so the parent is whatever the badge decorates:
 *
 * ```tsx
 * <View>
 *   <Icon as={BellIcon} size={24} />
 *   <Badge placement="top-end">3</Badge>
 * </View>
 * ```
 *
 * It is a prop rather than four style keys the caller writes because the offset is derived
 * from the badge's own `size` — it is pulled out by half its height on each axis, so its
 * centre sits on the corner it marks, and that arithmetic belongs with the measurements
 * rather than at every call site. R13 is the other half: the keys are `start` and `end`, so
 * a badge on the trailing corner mirrors in RTL instead of staying put.
 */
export type BadgePlacement = 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start'

/**
 * What the `Badge` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the badge's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type BadgeOwnProps = {
  variant?: BadgeVariant
  /** Height, horizontal padding and type. The width follows the count inside it. */
  size?: BadgeSize
  /**
   * Overrides the capsule. A badge is a pill at every size — that is what makes a
   * two-digit count read as one object — so this is the prop for the square marker.
   */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). Where it lands follows the variant: the
   * fill of a `primary`, the border and label of a `tertiary`, the label of a `ghost`.
   */
  color?: string
  /**
   * The bare circle — no label, no padding, a fixed diameter. It is what a badge is when
   * the fact that there is *something* is the whole message: a dot on a tab, an unsaved
   * marker on a row.
   *
   * Children are not rendered while it is set: a dot is the absence of a label, so there
   * is nothing for one to sit in.
   */
  isDot?: boolean
  placement?: BadgePlacement
  /** R12 — the child element becomes the badge and keeps this variant's style. */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type BadgeProps = Omit<ViewProps, 'style'> &
  BadgeOwnProps &
  Omit<ViewStyleProps, keyof BadgeOwnProps | keyof ViewProps>
