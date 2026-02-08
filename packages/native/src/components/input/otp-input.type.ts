import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'
import type { TextInputSize, TextInputVariant } from './input.type'

export type OTPInputCustomAppearance = {
  container?: StyleProp<ViewStyle>
  segmentContainer?: StyleProp<ViewStyle>
  segment?: StyleProp<ViewStyle>
  segmentText?: StyleProp<TextStyle>
  label?: StyleProp<TextStyle>
  helperText?: StyleProp<TextStyle>
}

export type OTPInputProps = {
  /**
   * Number of OTP segments.
   * @default 4
   */
  length?: number
  /**
   * Controlled value of the OTP input.
   */
  value?: string
  /**
   * Uncontrolled default value.
   */
  defaultValue?: string
  /**
   * Called when the OTP value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * Called when all segments are filled.
   */
  onComplete?: (value: string) => void
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
   * Theme color used for focus/active states.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Whether the input is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the input is invalid.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Whether to hide entered characters.
   * @default false
   */
  isSecured?: boolean
  /**
   * Error text displayed below the input when invalid.
   */
  errorMessage?: string
  /**
   * Helper text displayed below the input.
   */
  description?: string
  /**
   * Input label.
   */
  label?: string
  /**
   * Regex to filter allowed key input.
   * @default /^[0-9]$/
   */
  allowedKeys?: RegExp
  /**
   * Optional custom styles for input parts.
   */
  customAppearance?: OTPInputCustomAppearance
  /**
   * Whether the component should take full available width.
   * @default false
   */
  fullWidth?: boolean
}
