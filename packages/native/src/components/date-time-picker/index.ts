import { DateTimePicker as DateTimePickerRoot } from './date-time-picker'
import {
  DateTimePickerCalendar,
  DateTimePickerClock,
  DateTimePickerSheet,
} from './date-time-picker-sheet'
import { DateTimePickerIndicator } from './date-time-picker-indicator'
import { DateTimePickerSteps } from './date-time-picker-steps'
import { DateTimePickerTrigger } from './date-time-picker-trigger'
import { DateTimePickerValue } from './date-time-picker-value'

export const DateTimePicker = Object.assign(DateTimePickerRoot, {
  Trigger: DateTimePickerTrigger,
  Value: DateTimePickerValue,
  Indicator: DateTimePickerIndicator,
  Sheet: DateTimePickerSheet,
  Steps: DateTimePickerSteps,
  Calendar: DateTimePickerCalendar,
  Clock: DateTimePickerClock,
})

export { DateTimePicker as DateTimePickerRoot } from './date-time-picker'
export {
  DateTimePickerCalendar,
  DateTimePickerClock,
  DateTimePickerSheet,
} from './date-time-picker-sheet'
export { DateTimePickerIndicator } from './date-time-picker-indicator'
export { DateTimePickerSteps } from './date-time-picker-steps'
export { DateTimePickerTrigger } from './date-time-picker-trigger'
export { DateTimePickerValue } from './date-time-picker-value'
export { useDateTimePicker } from './date-time-picker.context'
export type {
  DateTimePickerCalendarProps,
  DateTimePickerClockProps,
  DateTimePickerContextValue,
  DateTimePickerProps,
  DateTimePickerSheetProps,
  DateTimePickerSize,
  DateTimePickerStep,
  DateTimePickerTextProps,
  DateTimePickerTriggerProps,
  DateTimePickerValueProps,
  DateTimePickerVariant,
  DateTimePickerViewProps,
} from './date-time-picker.type'
