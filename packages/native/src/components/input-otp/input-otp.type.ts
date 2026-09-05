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
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { OTPSlotState } from './input-otp.utils'

export type InputOTPSlot =
  | 'root'
  | 'group'
  | 'box'
  | 'value'
  | 'placeholder'
  | 'caret'
  | 'separator'

/**
 * Three of the `Input`'s four levels — a one-time code is a field, and a box of it is a
 * field one character wide. `primary` is the `fieldBackground` fill plus the theme's
 * `field` shadow, `secondary` the neutral fill and the default here, `tertiary` the border
 * alone.
 *
 * **No `ghost`**, where the `Input` has one, and it is the shape of the component that
 * removes it: an input is one wide field whose position the caret and the label already
 * give away, so it survives having neither fill nor edge. A code is *six* boxes, and their
 * only job before anything is typed is to say **how many characters are expected and where
 * they go**. With no fill and no border there is nothing to count. It is the reason the
 * `Checkbox` has no `ghost` either — a box that is not a box is not a box.
 *
 * HeroUI splits their OTP slot the same two ways their input is split, and they reach for
 * the `field` shadow on `primary` here explicitly — which is the same reading our `Input`
 * takes.
 */
export type InputOTPVariant = 'primary' | 'secondary' | 'tertiary'

/**
 * Three of the four, and `xs` is the one missing. The box's width is the control height
 * less one spacing step, so `xs` is 28 by 32 — a box that small has to carry an 18pt
 * character to stay legible, and 18 in 28 leaves no room for the two-point active ring
 * without the digit touching it. A code is also the one field a user reads back to
 * themselves character by character, which is the worst place to save eight points.
 *
 * `sm` is the compact size; below it, use fewer boxes rather than smaller ones.
 */
export type InputOTPSize = Exclude<Size, 'xs'>

/** What the boxes are allowed to contain. A string is compiled once, per §. */
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
  /** The box's height and width, the type inside it, and the gaps. */
  size?: InputOTPSize
  /** Overrides the `lg` radius the theme chose for every size. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). It lands where the variant put its
   * tokens, and it is also the ring the active box takes — the focus colour is a role
   * like any other.
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
   * What a box may contain. `OTP_DIGITS`, `OTP_LETTERS` and `OTP_ALPHANUMERIC` are
   * exported for the three usual answers; anything else is your own expression.
   *
   * It is tested against the **whole** value rather than each character, so a pattern
   * that allows a shape rather than a set works too.
   */
  pattern?: InputOTPPattern
  /**
   * One character per box, or a single character repeated across all of them. Shown only
   * where there is neither a typed character nor the caret.
   */
  placeholder?: string
  /** Paints the boxes in `danger` and takes the active ring off the accent. */
  isInvalid?: boolean
  /** Dims the boxes and stops the hidden input. */
  isDisabled?: boolean
  /** The keyboard the hidden input asks for. @default 'numeric' */
  inputMode?: TextInputProps['inputMode']
  /**
   * Everything else the hidden `TextInput` should carry — `autoComplete="one-time-code"`,
   * `textContentType`, `onSubmitEditing`. It is a prop rather than a slot because the
   * input is not composed: it is the one node this component owns and hides.
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
 * R14 — the component's own props, the `Pressable`'s, and every `ViewStyle` key neither
 * already claims.
 *
 * **No `asChild`** (the one root in the library without it, deliberately): this root is
 * not a pass-through container. It owns a hidden `TextInput` that has to be its own
 * child, and `Slot` merges into a *single* element. A caller who wants their own element
 * around the boxes wraps the `InputOTP` instead of replacing it.
 */
export type InputOTPProps = InputOTPOwnProps &
  Omit<ViewProps, keyof InputOTPOwnProps> &
  Omit<ViewStyleProps, keyof InputOTPOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
type InputOTPViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & {
    children?: ReactNode
  }

/**
 * A group takes a render function as well as elements, which is what lets a caller draw
 * `maxLength` boxes without writing them out — the one place in the library where a slot
 * does, because the number of children is data here rather than markup.
 */
export type InputOTPGroupProps = Omit<InputOTPViewProps, 'children'> & {
  children?: ReactNode | ((state: InputOTPRenderState) => ReactNode)
}

/** What the render function is handed. Everything the boxes are drawn from. */
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

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
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
 * R5 — resolved styles, not props for a slot to resolve a second time.
 *
 * The box comes in two, because exactly one box is active at a time and a slot that
 * resolved its own would be re-running the recipe per box. The root resolves both once —
 * two cache reads — and each box picks the reference that applies to it.
 */
export type InputOTPContextValue = {
  groupStyle: StyleProp<ViewStyle>
  boxStyle: StyleProp<ViewStyle>
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
  /** So a custom box, or a "change number" link, can put the caret back. */
  inputRef: RefObject<TextInput | null>
}

/** What one box publishes to whatever it contains. */
export type InputOTPBoxContextValue = {
  slot: OTPSlotState | undefined
}
