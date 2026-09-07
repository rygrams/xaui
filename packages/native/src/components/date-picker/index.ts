import { DatePicker as DatePickerRoot } from './date-picker'
import { DatePickerCalendar } from './date-picker-calendar'
import { DatePickerContent } from './date-picker-content'
import { DatePickerDescription } from './date-picker-description'
import { DatePickerError } from './date-picker-error'
import { DatePickerField } from './date-picker-field'
import { DatePickerIndicator } from './date-picker-indicator'
import { DatePickerLabel } from './date-picker-label'
import { DatePickerOverlay } from './date-picker-overlay'
import { DatePickerTrigger } from './date-picker-trigger'
import { DatePickerValue } from './date-picker-value'

export const DatePicker = Object.assign(DatePickerRoot, {
  Field: DatePickerField,
  Label: DatePickerLabel,
  Description: DatePickerDescription,
  Error: DatePickerError,
  Trigger: DatePickerTrigger,
  Value: DatePickerValue,
  Indicator: DatePickerIndicator,
  Overlay: DatePickerOverlay,
  Content: DatePickerContent,
  Calendar: DatePickerCalendar,
})

export { CalendarGlyphIcon } from './calendar-glyph-icon'
export { DatePicker as DatePickerRoot } from './date-picker'
export { DatePickerCalendar } from './date-picker-calendar'
export { DatePickerContent } from './date-picker-content'
export { DatePickerDescription } from './date-picker-description'
export { DatePickerError } from './date-picker-error'
export { DatePickerField } from './date-picker-field'
export { DatePickerIndicator } from './date-picker-indicator'
export { DatePickerLabel } from './date-picker-label'
export { DatePickerOverlay } from './date-picker-overlay'
export { DatePickerTrigger } from './date-picker-trigger'
export { DatePickerValue } from './date-picker-value'
export { useDatePicker } from './date-picker.context'
export { datePickerRecipe } from './date-picker.recipe'
export type {
  DatePickerCalendarProps,
  DatePickerContentProps,
  DatePickerContextValue,
  DatePickerDescriptionProps,
  DatePickerErrorProps,
  DatePickerFieldProps,
  DatePickerLabelProps,
  DatePickerOverlayProps,
  DatePickerProps,
  DatePickerSize,
  DatePickerSlot,
  DatePickerTriggerProps,
  DatePickerValueProps,
  DatePickerVariant,
} from './date-picker.type'
