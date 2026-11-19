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
import type { OTPSlotState } from './input-otp.utils'

export type InputOTPSlot =
  | 'root'
  | 'group'
  | 'box'
  | 'filled'
  | 'active'
  | 'value'
  | 'placeholder'
  | 'caret'
  | 'separator'

/**
 * Native's three names, two drawings. `primary` (the default) is the ground inside a line
 * of 2 — the Tram `TextField`'s box, one character wide. `secondary` is the discreet
 * surface with no line until the box is the one being typed in.
 *
 * `tertiary` stays in the type so swapping the import is the whole migration, and draws
 * as `primary`: Native's `tertiary` is "the line alone", which is what the Tram box
 * already is.
 */
export type InputOTPVariant = 'primary' | 'secondary' | 'tertiary'

export type InputOTPSize = TramSize

/** What the boxes are allowed to contain. A string is compiled once. */
export type InputOTPPattern = string | RegExp

/** What `ref` gives you: the three things only the hidden input can do. */
export type InputOTPHandle = {
  focus: () => void
  blur: () => void
  clear: () => void
}

type InputOTPOwnProps = {
  /** How many boxes, and therefore how long the code is. */
  maxLength: number
  variant?: InputOTPVariant
  /** The box — 36 × 44, 44 × 52, 52 × 60 — the character in it and the gaps. */
  size?: InputOTPSize
  /** Overrides the box's corner. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for the line and the caret of the
   * box being typed in, read as ink. `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the active line and the caret, as written.
   * Ignored while `isInvalid` — an error outranks a brand colour.
   */
  color?: string
  /** Controlled. Leave it out and the component keeps the value itself. */
  value?: string
  /** The starting value when uncontrolled. */
  defaultValue?: string
  onChangeText?: (value: string) => void
  /** Fired once the last box is filled — the only event most callers need. */
  onComplete?: (value: string) => void
  /**
   * What the code may contain, tested against the whole value. `OTP_DIGITS`,
   * `OTP_LETTERS` and `OTP_ALPHANUMERIC` are the three usual answers.
   */
  pattern?: InputOTPPattern
  /**
   * One character per box, or a single character repeated across all of them. Shown only
   * where there is neither a typed character nor the caret.
   */
  placeholder?: string
  /** Every line in `danger`, and no active line: the red already says where to look. */
  isInvalid?: boolean
  /** Greys the lines and the characters, and stops the hidden input. */
  isDisabled?: boolean
  /** The keyboard the hidden input asks for. @default 'numeric' */
  inputMode?: TextInputProps['inputMode']
  /**
   * Everything else the hidden `TextInput` should carry — `textContentType`,
   * `onSubmitEditing`. A prop rather than a slot: the input is not composed, it is the
   * one node this component owns and hides.
   */
  textInputProps?: Omit<
    TextInputProps,
    | 'value'
    | 'defaultValue'
    | 'onChangeText'
    | 'onFocus'
    | 'onBlur'
    | 'editable'
    | 'maxLength'
    | 'style'
  >
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The component's own props, the `View`'s, and every `ViewStyle` key neither claims —
 * Native's three terms.
 *
 * **No `asChild`**, as on Native: the root owns a hidden `TextInput` that has to be its
 * own child, and `Slot` merges into a single element.
 */
export type InputOTPProps = InputOTPOwnProps &
  Omit<ViewProps, keyof InputOTPOwnProps> &
  Omit<ViewStyleProps, keyof InputOTPOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name. */
type InputOTPViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    children?: ReactNode
  }

/** A group takes a render function as well as elements: the number of boxes is data. */
export type InputOTPGroupProps = Omit<InputOTPViewProps, 'children'> & {
  children?: ReactNode | ((state: InputOTPRenderState) => ReactNode)
}

/** What the render function is handed. */
export type InputOTPRenderState = {
  slots: readonly OTPSlotState[]
  value: string
  maxLength: number
  isFocused: boolean
  isDisabled: boolean
  isInvalid: boolean
}

export type InputOTPBoxProps = Omit<InputOTPViewProps, 'children'> & {
  /** Which box this is. It is what the root's state is read by. */
  index: number
  /** Replaces the value, the placeholder and the caret with your own. */
  children?: ReactNode
}

export type InputOTPSeparatorProps = InputOTPViewProps

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
type InputOTPTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

export type InputOTPValueProps = InputOTPTextProps
export type InputOTPPlaceholderProps = InputOTPTextProps

type InputOTPCaretOwnProps = {
  /** `false` stops the blink. The bar stays, so nothing moves. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type InputOTPCaretProps = InputOTPCaretOwnProps &
  Omit<ViewStyleProps, keyof InputOTPCaretOwnProps>

/**
 * Resolved styles, not props for a slot to resolve a second time.
 *
 * The box comes in three — empty, filled, active — each resolved once by the root, so a
 * six-box code picks references on every keystroke instead of building six styles.
 */
export type InputOTPContextValue = {
  groupStyle: StyleProp<ViewStyle>
  boxStyle: StyleProp<ViewStyle>
  boxFilledStyle: StyleProp<ViewStyle>
  boxActiveStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  caretStyle: StyleProp<ViewStyle>
  separatorStyle: StyleProp<ViewStyle>
  slots: readonly OTPSlotState[]
  value: string
  maxLength: number
  isFocused: boolean
  isDisabled: boolean
  isInvalid: boolean
  /** An ancestor asked for no animation at all. */
  isStill: boolean
  /** So a custom box, or a "change number" link, can put the caret back. */
  inputRef: RefObject<TextInput | null>
}

/** What one box publishes to whatever it contains. */
export type InputOTPBoxContextValue = {
  slot: OTPSlotState | undefined
}
