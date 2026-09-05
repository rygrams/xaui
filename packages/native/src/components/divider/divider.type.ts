import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'

export type DividerSlot = 'root'

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerSize = Size

/**
 * What the `Divider` itself understands. R14 — a name in here is the component's, so the
 * style prop that shares it is not exposed: `size` is the divider's scale and never
 * `ViewStyle`'s, and `color` is R7's tint.
 *
 * **No `variant`**, and it is the only component in the core without one. A variant is the
 * design system's *vocabulary* (§1 bis) — a name that means the same thing across the
 * library. On a rule there is nothing for that name to describe: no fill against a
 * foreground, no border against a surface, no intent to report. It had three values naming
 * the three separator tokens, which is a shade of grey wearing a word. `size` says how
 * heavy the rule is and `color` says what colour it is, in React Native's own values —
 * between them there is nothing a third name would add.
 */
type DividerOwnProps = {
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
   * R12 — the child element becomes the rule and keeps its resolved style. What it is
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
