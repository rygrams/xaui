import { DatePicker as DatePickerRoot } from './date-picker'
import { DatePickerCalendar } from './date-picker-calendar'
import { DatePickerContent } from './date-picker-content'
import { DatePickerIndicator } from './date-picker-indicator'
import { DatePickerOverlay } from './date-picker-overlay'
import { DatePickerTrigger } from './date-picker-trigger'
import { DatePickerValue } from './date-picker-value'

export const DatePicker = Object.assign(DatePickerRoot, {
  Trigger: DatePickerTrigger,
  Value: DatePickerValue,
  Indicator: DatePickerIndicator,
  Overlay: DatePickerOverlay,
  Content: DatePickerContent,
  Calendar: DatePickerCalendar,
})

export { DatePicker as DatePickerRoot } from './date-picker'
export { DatePickerCalendar } from './date-picker-calendar'
export { DatePickerContent } from './date-picker-content'
export { DatePickerIndicator } from './date-picker-indicator'
export { DatePickerOverlay } from './date-picker-overlay'
export { DatePickerTrigger } from './date-picker-trigger'
export { DatePickerValue } from './date-picker-value'
export { useDatePicker } from './date-picker.context'
export { datePickerRecipe } from './date-picker.recipe'
export type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerContextValue,
  DatePickerOverlayProps,
  DatePickerProps,
  DatePickerSize,
  DatePickerSlot,
  DatePickerTriggerProps,
  DatePickerValueProps,
  DatePickerVariant,
} from './date-picker.type'
