import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type RadioVariant = 'filled' | 'light'
export type RadioLabelAlignment =
  | 'left'
  | 'right'
  | 'justify-left'
  | 'justify-right'
export type RadioOrientation = 'vertical' | 'horizontal'

export type RadioProps = {
  /**
   * The label to display alongside the radio.
   */
  label?: string
  /**
   * Value associated to this option when used inside RadioGroup.
   */
  value?: string
  /**
   * Alignment of the label relative to the radio.
   * @default 'right'
   */
  labelAlignment?: RadioLabelAlignment
  /**
   * The theme color of the radio.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The variant of the radio.
   * @default 'filled'
   */
  variant?: RadioVariant
  /**
   * The size of the radio.
   * @default 'md'
   */
  size?: Size
  /**
   * The border radius of the radio.
   * @default 'full'
   */
  radius?: Radius
  /**
   * Whether the radio should take full width.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Controlled checked state when used outside RadioGroup.
   */
  isChecked?: boolean
  /**
   * Uncontrolled checked state when used outside RadioGroup.
   * @default false
   */
  defaultChecked?: boolean
  /**
   * Whether the radio is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom style for label text.
   */
  labelStyle?: TextStyle
  /**
   * Custom style for container.
   */
  style?: ViewStyle
  /**
   * Callback fired when the radio checked state changes.
   */
  onValueChange?: (isChecked: boolean) => void
}

export type RadioGroupProps = {
  /**
   * Group options.
   */
  children: ReactNode
  /**
   * Controlled selected value.
   */
  value?: string
  /**
   * Uncontrolled default selected value.
   */
  defaultValue?: string
  /**
   * Callback fired when selected value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * Whether all radios in group are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Shared theme color for radios.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Shared variant for radios.
   * @default 'filled'
   */
  variant?: RadioVariant
  /**
   * Shared size for radios.
   * @default 'md'
   */
  size?: Size
  /**
   * Shared radius for radios.
   * @default 'full'
   */
  radius?: Radius
  /**
   * Shared label alignment for radios.
   * @default 'right'
   */
  labelAlignment?: RadioLabelAlignment
  /**
   * Shared full width behavior for radios.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Group orientation.
   * @default 'vertical'
   */
  orientation?: RadioOrientation
  /**
   * Space between options.
   */
  gap?: number
  /**
   * Custom style for the group container.
   */
  style?: ViewStyle
}
