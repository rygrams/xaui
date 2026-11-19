import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'
import { MaskFieldRoot } from './mask-field'
import { MaskFieldField } from './mask-field-field'

/**
 * Three of the slots **are** the Tram `TextField`'s, re-exported rather than wrapped —
 * Native's arrangement. Only `Field` is the mask's.
 */
export const MaskField = Object.assign(MaskFieldRoot, {
  Label: TextFieldLabel,
  Field: MaskFieldField,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { MaskFieldRoot } from './mask-field'
export { MaskFieldField } from './mask-field-field'
export { useMaskField } from './mask-field.context'
export type {
  MaskFieldContextValue,
  MaskFieldFieldProps,
  MaskFieldProps,
} from './mask-field.type'
