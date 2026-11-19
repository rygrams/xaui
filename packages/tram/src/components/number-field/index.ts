import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'
import { NumberFieldRoot } from './number-field'
import { NumberFieldDecrement } from './number-field-decrement'
import { NumberFieldField } from './number-field-field'
import { NumberFieldGroup } from './number-field-group'
import { NumberFieldIncrement } from './number-field-increment'

/**
 * Three of the slots **are** the Tram `TextField`'s, re-exported rather than wrapped —
 * Native's arrangement. `Group` is the one Tram adds: the box Native builds with a
 * `FieldGroup`, which Tram does not have.
 */
export const NumberField = Object.assign(NumberFieldRoot, {
  Label: TextFieldLabel,
  Group: NumberFieldGroup,
  Field: NumberFieldField,
  Decrement: NumberFieldDecrement,
  Increment: NumberFieldIncrement,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { NumberFieldRoot } from './number-field'
export { NumberFieldDecrement } from './number-field-decrement'
export { NumberFieldField } from './number-field-field'
export { NumberFieldGroup } from './number-field-group'
export { NumberFieldIncrement } from './number-field-increment'
export { useNumberField } from './number-field.context'
export { NUMBER_FIELD_GEOMETRY, numberFieldRecipe } from './number-field.recipe'
export { numberKeyboard } from './number-field.utils'
export type {
  NumberFieldContextValue,
  NumberFieldDecrementProps,
  NumberFieldFieldProps,
  NumberFieldGroupProps,
  NumberFieldIncrementProps,
  NumberFieldProps,
  NumberFieldSize,
  NumberFieldSlot,
} from './number-field.type'
