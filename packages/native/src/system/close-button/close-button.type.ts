import type { ReactNode } from 'react'
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import type { PressableFeedbackProps } from '../pressable-feedback'

type CloseButtonOwnProps = {
  /**
   * Names the slot in the development warning about a missing label — `'Chip.Close'`,
   * `'Alert.Close'`. Without it the warning would say "a close button" and leave the
   * reader to find which one.
   */
  name: string
  /**
   * Replaces the built-in cross — an `Icon`, or any glyph. Unset, the button draws its
   * own from two rotated bars, which is what makes a dismissible component work in a
   * project that has installed no icon set.
   */
  children?: ReactNode
  /**
   * The style the surrounding component's recipe resolved for this node, applied under
   * the caller's own. It is separate from `style` because `style` may be `Pressable`'s
   * function form, and a function cannot be merged into an array without being resolved
   * first — which only this component can do, since it owns the press state.
   */
  baseStyle?: StyleProp<ViewStyle>
  /** One bar of the cross: its length, its thickness and its colour, from the recipe. */
  glyphStyle?: StyleProp<ViewStyle>
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

/**
 * R14 — it renders a `PressableFeedback`, so it carries that node's style keys as props
 * through it.
 */
export type CloseButtonBaseProps = CloseButtonOwnProps &
  Omit<PressableFeedbackProps, 'isPressed' | 'style' | 'children'>
