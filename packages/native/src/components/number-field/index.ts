import { NumberFieldDecrement } from './number-field-decrement'
import { NumberFieldField } from './number-field-field'
import { NumberFieldIncrement } from './number-field-increment'
import { NumberFieldRoot } from './number-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/**
 * Three of the slots **are** the `TextField`'s, re-exported rather than wrapped — the
 * `MaskField`'s arrangement, for the `MaskField`'s reason: a wrapper would add three
 * components to the tree to change a `displayName`, and the string it would change is the
 * one that tells you the truth.
 */
export const NumberField = Object.assign(NumberFieldRoot, {
  Label: TextFieldLabel,
  Field: NumberFieldField,
  Decrement: NumberFieldDecrement,
  Increment: NumberFieldIncrement,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { NumberFieldRoot } from './number-field'
export { NumberFieldDecrement } from './number-field-decrement'
export { NumberFieldField } from './number-field-field'
export { NumberFieldIncrement } from './number-field-increment'
export { useNumberField } from './number-field.context'
export { numberFieldRecipe } from './number-field.recipe'
export type {
  NumberFieldContextValue,
  NumberFieldDecrementProps,
  NumberFieldFieldProps,
  NumberFieldIncrementProps,
  NumberFieldProps,
  NumberFieldSlot,
} from './number-field.type'

/**
 * The number primitives, re-exported so a caller reading a typed value back — or writing a
 * stepper of their own — does not reach into the component's folder.
 */
export {
  canStep,
  clampNumber,
  formatNumber,
  numberMarks,
  parseNumber,
  stepNumber,
} from './number-field.utils'
export type { NumberBounds } from './number-field.utils'
