import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { Radius, ThemeColor } from '../../types'

export type TextInputVariant = 'flat' | 'faded' | 'bordered' | 'underlined'
export type TextInputSize = 'sm' | 'md' | 'lg'
export type TextInputLabelPlacement = 'outside' | 'inside'

export type TextInputCustomAppearance = {
  container?: StyleProp<ViewStyle>
  inputContainer?: StyleProp<ViewStyle>
  inputWrapper?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
  input?: StyleProp<TextStyle>
  helperText?: StyleProp<TextStyle>
}

export type TextInputProps = Omit<
  RNTextInputProps,
  'value' | 'defaultValue' | 'style'
> & {
  /**
   * Controlled value of the input.
   */
  value?: string
  /**
   * Uncontrolled default value of the input.
   */
  defaultValue?: string
  /**
   * Called when the input value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * Input label.
   */
  label?: ReactNode
  /**
   * Label position relative to the field.
   * @default 'outside'
   */
  labelPlacement?: TextInputLabelPlacement
  /**
   * Helper text displayed below the input.
   */
  description?: ReactNode
  /**
   * Error text displayed below the input when invalid.
   */
  errorMessage?: ReactNode
  /**
   * Start slot content.
   */
  startContent?: ReactNode
  /**
   * End slot content.
   */
  endContent?: ReactNode
  /**
   * Theme color used for focus/active states.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Visual style variant.
   * @default 'flat'
   */
  variant?: TextInputVariant
  /**
   * Input size.
   * @default 'md'
   */
  size?: TextInputSize
  /**
   * Input radius.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Whether the input should be secured (password mode).
   * @default false
   */
  isSecured?: boolean
  /**
   * Whether to show a clear button when input has value.
   * @default false
   */
  isClearable?: boolean
  /**
   * Whether the input is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the input is read-only.
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Whether the input is invalid.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Whether the component should take full available width.
   * @default true
   */
  fullWidth?: boolean
  /**
   * Optional custom styles for input parts.
   */
  customAppearance?: TextInputCustomAppearance
}
