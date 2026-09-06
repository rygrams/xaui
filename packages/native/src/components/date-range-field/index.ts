import { DateRangeFieldField } from './date-range-field-field'
import { DateRangeFieldRoot } from './date-range-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/** Three of the slots **are** the `TextField`'s — the `DateField`'s arrangement. */
export const DateRangeField = Object.assign(DateRangeFieldRoot, {
  Label: TextFieldLabel,
  Field: DateRangeFieldField,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { DateRangeFieldRoot } from './date-range-field'
export { DateRangeFieldField } from './date-range-field-field'
export { useDateRangeField } from './date-range-field.context'
export type {
  DateRange,
  DateRangeFieldContextValue,
  DateRangeFieldFieldProps,
  DateRangeFieldProps,
} from './date-range-field.type'
