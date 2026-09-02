import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'
import type {
  InputTriggerLabelPlacement,
  InputTriggerSize,
  InputTriggerVariant,
} from '../input-trigger/input-trigger.type'

export type PickerOption = {
  /**
   * Display label for the option.
   */
  label: string
  /**
   * Unique value for the option.
   */
  value: string
  /**
   * Whether this option is disabled.
   * @default false
   */
  disabled?: boolean
}

export type PickerProps = {
  /**
   * List of selectable options.
   */
  options: PickerOption[]
  /**
   * Currently selected value (controlled).
   */
  value?: string
  /**
   * Placeholder text shown when no value is selected.
   * @default 'Select an option...'
   */
  placeholder?: string
  /**
   * Label displayed above or inside the trigger.
   */
  label?: ReactNode
  /**
   * Position of the label relative to the trigger.
   * @default 'outside'
   */
  labelPlacement?: InputTriggerLabelPlacement
  /**
   * Helper text displayed below the trigger.
   */
  description?: ReactNode
  /**
   * Error message when isInvalid is true.
   */
  errorMessage?: ReactNode
  /**
   * Title displayed inside the bottom sheet.
   */
  sheetTitle?: string
  /**
   * Theme color.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Visual variant of the trigger.
   * @default 'flat'
   */
  variant?: InputTriggerVariant
  /**
   * Size of the trigger.
   * @default 'md'
   */
  size?: InputTriggerSize
  /**
   * Border radius.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Controlled open state of the sheet.
   */
  isOpened?: boolean
  /**
   * Whether the trigger is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the trigger is in an invalid state.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Whether the trigger takes full available width.
   * @default true
   */
  fullWidth?: boolean
  /**
   * Custom style for the bottom sheet container.
   */
  sheetStyle?: ViewStyle
  /**
   * Custom end content for the trigger (replaces chevron).
   */
  endContent?: ReactNode
} & PickerEvents

export type PickerEvents = {
  /**
   * Called when the selected value changes.
   */
  onValueChange?: (value: string) => void
  /**
   * Called when the sheet opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Called when the sheet closes.
   */
  onClose?: () => void
}
