import { DateTimeFieldField } from './date-time-field-field'
import { DateTimeFieldPeriod } from './date-time-field-period'
import { DateTimeFieldRoot } from './date-time-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/** Three of the slots **are** the `TextField`'s — the `DateField`'s arrangement. */
export const DateTimeField = Object.assign(DateTimeFieldRoot, {
  Label: TextFieldLabel,
  Field: DateTimeFieldField,
  Period: DateTimeFieldPeriod,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { DateTimeFieldRoot } from './date-time-field'
export { DateTimeFieldField } from './date-time-field-field'
export { DateTimeFieldPeriod } from './date-time-field-period'
export { useDateTimeField } from './date-time-field.context'
export type {
  DateTimeFieldContextValue,
  DateTimeFieldFieldProps,
  DateTimeFieldPeriodProps,
  DateTimeFieldProps,
} from './date-time-field.type'
