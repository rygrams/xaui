import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type {
  IconContextValue,
  IconProps,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey, Size } from '@xaui/native/theme'

export type ButtonSlot = 'root' | 'label' | 'icon' | 'spinner'

/**
 * Native's seven names, drawn in Metro. The ladder alternates the two things Tram can do
 * with a rectangle — fill it, or outline it:
 *
 * | Variant       | At rest                                  | Pressed                        |
 * | ------------- | ---------------------------------------- | ------------------------------ |
 * | `primary`     | filled with the accent                   | inverts to the ground's ink    |
 * | `secondary`   | accent outline, accent label             | fills with the accent          |
 * | `default`     | filled with the neutral                  | inverts to the ground's ink    |
 * | `tertiary`    | ink outline — the Windows Phone button   | fills with the ink             |
 * | `ghost`       | the label alone, in the accent           | the label greys                |
 * | `danger`      | filled with the danger colour            | inverts to the ground's ink    |
 * | `danger-soft` | danger outline, danger label             | fills with the danger colour   |
 *
 * Tram has no soft slice — a tint at 15% is a gradient of one — so what Native paints
 * soft, Tram outlines.
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'tertiary'
  | 'ghost'
  | 'danger'
  | 'danger-soft'

export type ButtonSize = Size

type ButtonOwnProps = {
  variant?: ButtonVariant
  /** Height, padding, gap, border and type. Never width. */
  size?: ButtonSize
  /** Overrides the Tram corner. The scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * A raw `#RRGGBB` tint, never a token. It lands where the variant put its colour: the
   * fill of a `primary`, the outline and label of a `secondary`, the label of a `ghost`.
   */
  color?: string
  isDisabled?: boolean
  /** Presses through as disabled, and inserts a `Button.Spinner` if none is composed. */
  isLoading?: boolean
  /** Drops the horizontal padding and squares the button on its fixed height. */
  isIconOnly?: boolean
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type ButtonBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children'
>

/**
 * The button's own props, the press behaviour it forwards, and every `ViewStyle` key its
 * vocabulary does not claim — the same three terms as the Native `Button`, which is the
 * contract.
 */
export type ButtonProps = ButtonOwnProps &
  ButtonBehaviourProps &
  Omit<ViewStyleProps, keyof ButtonOwnProps>

export type ButtonLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** `size` and `color` default to what the root resolved; passing either wins. */
export type ButtonIconProps = IconProps

type ButtonSpinnerOwnProps = {
  style?: StyleProp<ViewStyle>
  /** `false` stops the rotation. The ring stays, so the button does not change size. */
  animation?: boolean
}

export type ButtonSpinnerProps = ButtonSpinnerOwnProps &
  Omit<ViewStyleProps, keyof ButtonSpinnerOwnProps>

/** Resolved styles, not props for a slot to resolve a second time. */
export type ButtonContextValue = {
  labelStyle: StyleProp<TextStyle>
  spinnerStyle: StyleProp<ViewStyle>
  /** Values, not a style: `Icon` hands them to a third-party component. */
  icon: IconContextValue
  isDisabled: boolean
  isLoading: boolean
}
