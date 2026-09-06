import { DateRangePicker as DateRangePickerRoot } from './date-range-picker'
import {
  DateRangePickerCalendar,
  DateRangePickerSheet,
} from './date-range-picker-sheet'
import { DateRangePickerIndicator } from './date-range-picker-indicator'
import { DateRangePickerTrigger } from './date-range-picker-trigger'
import { DateRangePickerValue } from './date-range-picker-value'

export const DateRangePicker = Object.assign(DateRangePickerRoot, {
  Trigger: DateRangePickerTrigger,
  Value: DateRangePickerValue,
  Indicator: DateRangePickerIndicator,
  Sheet: DateRangePickerSheet,
  Calendar: DateRangePickerCalendar,
})

export { DateRangePicker as DateRangePickerRoot } from './date-range-picker'
export {
  DateRangePickerCalendar,
  DateRangePickerSheet,
} from './date-range-picker-sheet'
export { DateRangePickerIndicator } from './date-range-picker-indicator'
export { DateRangePickerTrigger } from './date-range-picker-trigger'
export { DateRangePickerValue } from './date-range-picker-value'
export { useDateRangePicker } from './date-range-picker.context'
export type {
  DateRangePickerCalendarProps,
  DateRangePickerContextValue,
  DateRangePickerProps,
  DateRangePickerSheetProps,
  DateRangePickerSize,
  DateRangePickerTriggerProps,
  DateRangePickerValueProps,
  DateRangePickerVariant,
} from './date-range-picker.type'
