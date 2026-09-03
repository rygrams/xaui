import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { IconContextValue, IconProps } from '../../system/icon'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type ButtonSlot = 'root' | 'label' | 'icon' | 'spinner'

/**
 * The ten sanctioned appearances (R7). Emphasis and intention are one flat union, which
 * is why there is no `themeColor` beside it: `primary` … `ghost` are the emphasis levels,
 * and each intention carries its own `-soft` low-emphasis level rather than one of them
 * being special-cased.
 */
export type ButtonVariant =
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

export type ButtonSize = Size

export type ButtonProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
> & {
  variant?: ButtonVariant
  /** Height, padding, gap, radius and type. Never width. */
  size?: ButtonSize
  /** Overrides the radius `size` chose. Unset, a button is the shape its size implies. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). Where it lands follows the variant: the
   * background of a `primary`, the label of a `ghost`, the border and label of a
   * `tertiary`. Its contrasted, soft and pressed slices are derived in OKLab, so it
   * behaves exactly like `accent` — which is also why it must be a hex value.
   */
  color?: string
  isDisabled?: boolean
  /** Presses through as disabled, and inserts a `Button.Spinner` if none is composed. */
  isLoading?: boolean
  /** Drops the horizontal padding and squares the button on its fixed height. */
  isIconOnly?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

export type ButtonLabelProps = TextProps & {
  children?: ReactNode
}

/**
 * `Icon`'s three forms, plus the `style` every slot carries (R2). `size` and `color`
 * default to what the root resolved; passing either wins over it.
 */
export type ButtonIconProps = IconProps

export type ButtonSpinnerProps = {
  style?: StyleProp<ViewStyle>
  /** `false` stops the rotation. The ring stays, so the button does not change size. */
  animation?: boolean
}

/**
 * R5 — resolved styles, not props for a slot to resolve a second time. Each entry is the
 * cached `StyleSheet` reference with the uncached tint pass layered over it, so a slot
 * merges its own `style` on top and does no work of its own.
 */
export type ButtonContextValue = {
  labelStyle: StyleProp<TextStyle>
  spinnerStyle: StyleProp<ViewStyle>
  /**
   * Values, not a style: `Icon` hands `size` and `color` to a third-party component, so
   * the root flattens its icon slot once here rather than in every icon it contains.
   */
  icon: IconContextValue
  isDisabled: boolean
  isLoading: boolean
}
