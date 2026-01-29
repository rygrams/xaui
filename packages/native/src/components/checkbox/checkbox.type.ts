import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type CheckboxVariant = 'filled' | 'light'
export type CheckboxLabelAlignment = 'left' | 'right' | 'justify-left' | 'justify-right'

export type CheckboxProps = {
  /**
   * The label to display alongside the checkbox.
   */
  label?: string
  /**
   * Alignment of the label relative to the checkbox.
   * @default 'right'
   */
  labelAlignment?: CheckboxLabelAlignment
  /**
   * The theme color of the checkbox.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The variant of the checkbox.
   * @default 'filled'
   */
  variant?: CheckboxVariant
  /**
   * The size of the checkbox.
   * @default 'md'
   */
  size?: Size
  /**
   * The border radius of the checkbox.
   * @default 'sm'
   */
  radius?: Radius
  /**
   * Whether the checkbox should take the full width of its container.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Whether the checkbox is checked.
   * @default false
   */
  isChecked?: boolean
  /**
   * Whether the checkbox is in an indeterminate state.
   * @default false
   */
  isIndeterminate?: boolean
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom style for the label text.
   */
  labelStyle?: TextStyle
  /**
   * Custom style for the checkbox container.
   */
  style?: ViewStyle
  /**
   * Callback fired when the checkbox value changes.
   */
  onValueChange?: (isChecked: boolean) => void
}
