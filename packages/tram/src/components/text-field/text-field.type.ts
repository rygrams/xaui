import type { ReactNode, RefObject } from 'react'
import type {
  StyleProp,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type TextFieldSlot =
  | 'root'
  | 'label'
  | 'field'
  | 'placeholder'
  | 'focus'
  | 'description'
  | 'error'

export type TextFieldSize = TramSize

type TextFieldOwnProps = {
  /** The field's height, its padding, the gaps and the type. Never width. */
  size?: TextFieldSize
  /** Overrides the field's corner. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for a field that is not in the
   * theme's accent. It is the colour of the border once the field has the focus, read as
   * ink: a line has to stand out on the ground. `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the border of the focused field, as written.
   * Ignored while `isInvalid` — an error outranks a brand colour.
   */
  color?: string
  /**
   * Draws the border in `danger`, focused or not, and `TextField.Error` with it. The
   * label and the description keep their ink.
   *
   * It does **not** mount or unmount `TextField.Error`: that stays the caller's.
   */
  isInvalid?: boolean
  /** Greys the border, the text and the label, and makes the field uneditable. */
  isDisabled?: boolean
  /** Tells a screen reader the field has to be filled. It draws nothing. */
  isRequired?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The field's own props, the wrapper `View`'s, and every `ViewStyle` key neither already
 * claims — the Native `TextField`'s three terms. `TextInputProps` are not here: they
 * belong to `TextField.Field`.
 *
 * **No `variant`**, where Native has four: they are four fills of the box, and the Metro
 * box has one — the ground, inside a line. **No `labelPlacement`** either: a Metro label
 * stands above its box.
 */
export type TextFieldProps = TextFieldOwnProps &
  Omit<ViewProps, keyof TextFieldOwnProps> &
  Omit<ViewStyleProps, keyof TextFieldOwnProps | keyof ViewProps> & {
    /** Merge into the single child instead of rendering a `View`. */
    asChild?: boolean
  }

/**
 * Everything `TextInput` accepts, plus the `TextStyle` keys as props. `editable` is
 * absent: `isDisabled` on the root is what stops the field. `readOnly` is `TextInput`'s
 * own, and greys nothing.
 */
export type TextFieldFieldProps = Omit<TextInputProps, 'editable'> &
  Omit<TextStyleProps, keyof TextInputProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
type TextFieldTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type TextFieldLabelProps = TextFieldTextProps
export type TextFieldDescriptionProps = TextFieldTextProps
export type TextFieldErrorProps = TextFieldTextProps

/** Read off `TextInput`'s own props, so they follow React Native's payload. */
export type FieldFocusEvent = Parameters<NonNullable<TextInputProps['onFocus']>>[0]
export type FieldBlurEvent = Parameters<NonNullable<TextInputProps['onBlur']>>[0]

/** Resolved styles, and the values a slot cannot compute for itself. */
export type TextFieldContextValue = {
  labelStyle: StyleProp<TextStyle>
  fieldStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  errorStyle: StyleProp<TextStyle>
  /** A value and not a style: `placeholderTextColor` is a `TextInput` prop. */
  placeholderTextColor?: string
  /**
   * Values, not a style: the two ends the border moves between, mixed in a worklet as
   * the focus comes and goes.
   */
  border: { rest: string; focus: string }
  /** How far the field's `hitSlop` reaches for a box drawn under 48. */
  reach: number
  /** The input itself, so a touch on the label can hand it the focus. */
  fieldRef: RefObject<TextInput | null>
  labelId: string
  descriptionId: string
  errorId: string
  isDisabled: boolean
  isInvalid: boolean
  isRequired: boolean
  /** An ancestor asked for no animation at all. */
  isStill: boolean
}
