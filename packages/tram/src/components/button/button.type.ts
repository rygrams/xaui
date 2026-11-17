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
import type { TramAccentName } from '../../theme/tram-tokens'

export type ButtonSlot = 'root' | 'label' | 'icon' | 'spinner'

/**
 * Four ways to draw one rectangle, all in the accent — or in a raw `color`:
 *
 * | Variant     | At rest                          | Pressed                     |
 * | ----------- | -------------------------------- | --------------------------- |
 * | `contained` | filled with the true colour      | inverts to the ground's ink |
 * | `flat`      | filled with its soft slice       | fills with the true colour  |
 * | `outline`   | a line and a label in the colour | fills with the true colour  |
 * | `text`      | the label alone                  | the label greys             |
 *
 * **Not Native's names, deliberately** (T1.2). Native's ladder mixes emphasis and
 * intention — `primary`, `default`, `danger` — and Tram has one colour to spend, so a
 * variant only says how the box is drawn. The colour is `accent`, a name from the palette,
 * or a raw `color`: a destructive button is `color={theme.colors.danger}`.
 */
export type ButtonVariant = 'contained' | 'flat' | 'outline' | 'text'

export type ButtonSize = Size

type ButtonOwnProps = {
  variant?: ButtonVariant
  /** Height, padding, gap and type. Never width. */
  size?: ButtonSize
  /** Overrides the Tram corner. The scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="magenta"` — for a button that is not in
   * the theme's accent. It paints exactly as `color` does; `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token. It lands where the variant put its colour: the
   * fill of a `contained`, the soft fill of a `flat`, the line and label of an `outline`,
   * the label of a `text`.
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
 * vocabulary does not claim — the same three terms as the Native `Button`.
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
