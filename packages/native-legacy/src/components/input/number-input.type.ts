import type { StyleProp, ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'
import type {
  TextInputCustomAppearance,
  TextInputLabelPlacement,
  TextInputSize,
  TextInputVariant,
} from './input.type'

export type NumberInputCustomAppearance = TextInputCustomAppearance & {
  stepperContainer?: StyleProp<ViewStyle>
  stepperButton?: StyleProp<ViewStyle>
}

export type NumberInputProps = {
  /**
   * Controlled numeric value.
   */
  value?: number
  /**
   * Uncontrolled default numeric value.
   */
  defaultValue?: number
  /**
   * Called when the numeric value changes.
   */
  onValueChange?: (value: number | undefined) => void
  /**
   * Minimum allowed value.
   */
  minValue?: number
  /**
   * Maximum allowed value.
   */
  maxValue?: number
  /**
   * Step increment/decrement amount.
   * @default 1
   */
  step?: number
  /**
   * Whether to hide the stepper buttons.
   * @default false
   */
  hideStepper?: boolean
  /**
   * Intl.NumberFormat options for display formatting.
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * Locale for number formatting.
   * @default 'en-US'
   */
  locale?: string
  /**
   * Input label.
   */
  label?: string
  /**
   * Label position relative to the field.
   * @default 'outside'
   */
  labelPlacement?: TextInputLabelPlacement
  /**
   * Helper text displayed below the input.
   */
  description?: string
  /**
   * Error text displayed below the input when invalid.
   */
  errorMessage?: string
  /**
   * Placeholder text.
   */
  placeholder?: string
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
   * Whether to show a clear button.
   * @default false
   */
  isClearable?: boolean
  /**
   * Whether the component should take full available width.
   * @default true
   */
  fullWidth?: boolean
  /**
   * Optional custom styles for input parts.
   */
  customAppearance?: NumberInputCustomAppearance
}
