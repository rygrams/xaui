import { DateFieldField } from './date-field-field'
import { DateFieldRoot } from './date-field'
import { DateFieldSheet, DateFieldSheetCalendar } from './date-field-sheet'
import { DateFieldTrigger } from './date-field-trigger'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/**
 * Three of the slots **are** the `TextField`'s, re-exported rather than wrapped — the
 * `TextArea`'s arrangement, for the `TextArea`'s reason: a wrapper would add three
 * components to the tree to change a `displayName`, and the string it would change is the
 * one that tells you the truth.
 */
export const DateField = Object.assign(DateFieldRoot, {
  Label: TextFieldLabel,
  Field: DateFieldField,
  Trigger: DateFieldTrigger,
  Sheet: DateFieldSheet,
  SheetCalendar: DateFieldSheetCalendar,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { DateFieldRoot } from './date-field'
export { DateFieldField } from './date-field-field'
export { DateFieldGlyph } from './date-field-glyph'
export { DateFieldSheet, DateFieldSheetCalendar } from './date-field-sheet'
export { DateFieldTrigger } from './date-field-trigger'
export { useDateField } from './date-field.context'
export type {
  DateFieldContextValue,
  DateFieldFieldProps,
  DateFieldProps,
  DateFieldSheetCalendarProps,
  DateFieldSheetProps,
  DateFieldTriggerProps,
} from './date-field.type'
