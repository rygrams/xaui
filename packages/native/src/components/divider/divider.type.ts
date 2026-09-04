import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'

export type DividerSlot = 'root'

/**
 * The emphasis ladder, narrowed to the three levels a rule can actually be drawn at
 * (§1 bis). A divider **reports nothing** and **is not pressed**, so the status families
 * are absent the way they are from the `Card`, and so is `primary` — a separator painted
 * in the accent is a decision about the accent, which is what `color` is for.
 *
 * The three that remain are the three separator tokens, in the order they get more
 * visible:
 *
 * - **`default`** — `separator`. The hairline between two rows of a list.
 * - **`secondary`** — one step stronger, for the break between two groups of rows.
 * - **`tertiary`** — the strongest, for the break between two sections of a screen.
 *
 * **No `ghost`**, because a rule with no ink is a `Spacer`, and the way to write one is
 * a gap on the parent rather than an invisible child.
 */
export type DividerVariant = 'default' | 'secondary' | 'tertiary'

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerSize = Size

/**
 * What the `Divider` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the divider's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 */
type DividerOwnProps = {
  variant?: DividerVariant
  /**
   * Which way the rule runs. A horizontal one stretches across its parent and a vertical
   * one stretches down it, so the axis a divider does *not* run along is the one it takes
   * from whatever contains it.
   */
  orientation?: DividerOrientation
  /**
   * The thickness — height when horizontal, width when vertical. It is `size` and not
   * `thickness` because that is the vocabulary word (§1 bis), and it is consistent with
   * the rest of the library rather than in spite of it: "`size` drives height, never
   * width" is exactly what this does, on the axis the orientation names.
   *
   * `xs` is the hairline and it is the default, unlike everywhere else in the library.
   * A rule you notice is a rule that is too thick.
   */
  size?: DividerSize
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). There is one thing to colour on a rule,
   * so it lands on the rule.
   */
  color?: string
  /**
   * R12 — the child element becomes the rule and keeps this variant's style. What it is
   * for here is the animated one: an `Animated.View` that collapses a section takes the
   * thickness and the colour from the recipe and the height from a shared value.
   */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  /** Only meaningful under `asChild`, where it is the element that becomes the rule. */
  children?: ReactNode
}

export type DividerProps = Omit<ViewProps, 'style'> &
  DividerOwnProps &
  Omit<ViewStyleProps, keyof DividerOwnProps | keyof ViewProps>
