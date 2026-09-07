import type { ReactNode } from 'react'
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import type { CloseButtonBaseProps } from '../../system/close-button'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type CloseButtonSlot = 'root' | 'glyph'

/**
 * The four emphasis levels, and no intent: a close button dismisses, and dismissing is
 * neither a success nor a danger. The one that carries an intent is the component around
 * it — `Alert.Close` takes the alert's colours, and it is the alert's recipe that says so.
 */
export type CloseButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

/** All four. The box is small enough at `xs` to still be pressed, thanks to `hitSlop`. */
export type CloseButtonSize = Size

type CloseButtonOwnProps = {
  variant?: CloseButtonVariant
  /** The box and the cross inside it. Square, so here it drives both. */
  size?: CloseButtonSize
  /**
   * Overrides the corner, which is a circle — `size` sets it to half the box. A squared
   * close button in a squared panel is a real design, and every control here takes it.
   */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7). The disc, or the cross on `ghost`. */
  color?: string
  /** Dims the button and stops the press. */
  isDisabled?: boolean
  /**
   * Replaces the built-in cross — an `Icon`, or any glyph. Unset, the button draws its own
   * from two rotated bars, so a dismissible screen works in a project that has installed
   * no icon set.
   */
  children?: ReactNode
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

/**
 * What the shared base still accepts — its press behaviour, `asChild` (R12), `hitSlop`,
 * the a11y props — minus the three the recipe now answers for it. `name` is gone with
 * them: it exists to tell `Chip.Close` from `Alert.Close` in the missing-label warning,
 * and this component has one name.
 */
type CloseButtonBehaviourProps = Omit<
  CloseButtonBaseProps,
  'name' | 'baseStyle' | 'glyphStyle' | 'style' | 'children'
>

/**
 * R14 — the button's own props, the base's, and every `ViewStyle` key neither claims.
 */
export type CloseButtonProps = CloseButtonOwnProps &
  CloseButtonBehaviourProps &
  Omit<ViewStyleProps, keyof CloseButtonOwnProps>
