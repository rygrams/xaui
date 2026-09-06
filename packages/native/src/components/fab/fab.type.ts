import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { IconProps } from '../../system/icon'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps } from '../../system/style-props'
import type { RadiusKey } from '../../theme/theme.type'

export type FabSlot = 'root' | 'label' | 'icon' | 'spinner'

/**
 * The `Button`'s union, minus nothing: a floating action button is a button, and the one it
 * floats over is as likely to be a delete as a compose.
 */
export type FabVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'success'
  | 'success-soft'
  | 'warning'
  | 'warning-soft'
  | 'danger'
  | 'danger-soft'

/** Material's three, measured: 40, 56 and 96 points square. The legacy's, kept. */
export type FabSize = 'sm' | 'md' | 'lg'

/**
 * Where it floats, or nowhere.
 *
 * Unset it sits in the flow like any other control, which is what a FAB inside a card or a
 * toolbar wants. The three others pin it to the bottom of its nearest positioned ancestor —
 * `start` and `end` rather than left and right, so a right-to-left layout moves it without a
 * second branch (R13).
 */
export type FabPlacement = 'bottom-start' | 'bottom-center' | 'bottom-end'

type FabOwnProps = {
  variant?: FabVariant
  /** The square's side, or an extended one's height. Never its width. */
  size?: FabSize
  /** Overrides the circle. `full` is the default and what makes it a FAB. */
  radius?: RadiusKey
  /** A raw tint (R7), landing where the variant put its tokens. */
  color?: string
  /**
   * Wider than it is tall, with room for a word beside the mark.
   *
   * A prop rather than "there is a `Fab.Label` in here", because the root's recipe resolves
   * before its children do: the shape has to be known when the box is measured, and the box
   * is measured before the label inside it exists.
   */
  isExtended?: boolean
  /** Pinned to the bottom of the nearest positioned ancestor. Unset, it sits in the flow. */
  placement?: FabPlacement
  /** How far in from that edge, in points. @default 16 */
  offset?: number
  isDisabled?: boolean
  /** Swaps the mark for a spinner and stops the press. The label stays. */
  isLoading?: boolean
  /** R12 — merge into the single child instead of rendering a pressable. */
  asChild?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/** R14 — it renders a `PressableFeedback`, so it carries that node's style keys through it. */
export type FabProps = FabOwnProps &
  Omit<
    PressableFeedbackProps,
    'isPressed' | 'style' | 'children' | keyof FabOwnProps
  >

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type FabLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type FabIconProps = IconProps

/** R5 — resolved style ids, never a token for a slot to resolve again. */
export type FabContextValue = {
  labelStyle: StyleProp<TextStyle>
  spinnerStyle: StyleProp<ViewStyle>
  /**
   * Values, not a style: an icon is a third party's component and takes `size` and `color`
   * as props. Flattened once here, the way the `Button` and the `Chip` publish theirs.
   */
  icon: { size: number | undefined; color: string | undefined }
  isDisabled: boolean
  isLoading: boolean
}
