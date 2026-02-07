import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type DatePickerVariant =
  | 'outlined'
  | 'flat'
  | 'light'
  | 'faded'
  | 'underlined'

export type DatePickerLabelPlacement =
  | 'inside'
  | 'outside'
  | 'outside-left'
  | 'outside-top'

export type DatePickerCustomAppearance = {
  container?: ViewStyle
  text?: TextStyle
  trigger?: ViewStyle
  calendar?: ViewStyle
}

export type DatePickerProps = {
  value?: Date | null
  defaultValue?: Date
  onChange?: (date: Date | null) => void
  locale?: string
  minDate?: Date
  maxDate?: Date
  firstDayOfWeek?: 0 | 1
  variant?: DatePickerVariant
  themeColor?: ThemeColor
  size?: Size
  radius?: Radius
  label?: ReactNode
  placeholder?: string
  description?: ReactNode
  errorMessage?: ReactNode
  labelPlacement?: DatePickerLabelPlacement
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  isClearable?: boolean
  disableAnimation?: boolean
  customAppearance?: DatePickerCustomAppearance
  calendarIcon?: ReactNode
  onOpen?: () => void
  onClose?: () => void
  onOpenChange?: (isOpen: boolean) => void
}

export type CalendarViewMode = 'calendar' | 'year' | 'month'
