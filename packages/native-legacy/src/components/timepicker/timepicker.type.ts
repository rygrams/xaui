import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type TimeValue = {
  /**
   * Hours value (0-23 for 24-hour format, 1-12 for 12-hour format)
   */
  hours: number
  /**
   * Minutes value (0-59)
   */
  minutes: number
}

export type TimePickerMode = 'hour' | 'minute'
export type TimePeriod = 'AM' | 'PM'

export type TimePickerProps = {
  /**
   * Current time value
   */
  value?: TimeValue
  /**
   * Callback fired when time changes
   */
  onChange?: (time: TimeValue) => void
  /**
   * Use 24-hour format. When false, shows AM/PM selector
   * @default false
   */
  is24Hour?: boolean
  /**
   * Theme color for selected elements
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Custom container style
   */
  style?: StyleProp<ViewStyle>
  /**
   * Minimum selectable time
   */
  minTime?: TimeValue
  /**
   * Maximum selectable time
   */
  maxTime?: TimeValue
}

export type TimePickerDialogProps = {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean
  /**
   * Callback fired when dialog should close
   */
  onClose: () => void
  /**
   * Current time value
   */
  value?: TimeValue
  /**
   * Callback fired when time changes during selection
   */
  onChange?: (time: TimeValue) => void
  /**
   * Use 24-hour format. When false, shows AM/PM selector
   * @default false
   */
  is24Hour?: boolean
  /**
   * Theme color for selected elements
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Dialog title
   * @default 'Select time'
   */
  title?: ReactNode
  /**
   * Confirm button text
   * @default 'OK'
   */
  confirmText?: string
  /**
   * Cancel button text
   * @default 'Cancel'
   */
  cancelText?: string
  /**
   * Callback fired when confirm button is pressed
   */
  onConfirm?: (time: TimeValue) => void
  /**
   * Callback fired when cancel button is pressed
   */
  onCancel?: () => void
}

export type TimePickerTriggerProps = {
  /**
   * Current time value shown in trigger.
   */
  value?: TimeValue
  /**
   * Placeholder shown when no value is selected.
   * @default 'Select time'
   */
  placeholder?: string
  /**
   * Use 24-hour format for display.
   * @default false
   */
  is24Hour?: boolean
  /**
   * Theme color for visual accents.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Disable interaction.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Read-only state that blocks opening.
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Show clear button when value exists.
   * @default true
   */
  isClearable?: boolean
  /**
   * Optional custom right icon.
   */
  icon?: ReactNode
  /**
   * Custom trigger container style.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom trigger text style.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Press handler used to open dialog.
   */
  onPress: () => void
  /**
   * Clear handler used when clear button is pressed.
   */
  onClear?: () => void
}
