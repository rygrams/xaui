import { InputDescription, InputError, InputLabel } from '../input'
import { TextAreaField } from './text-area-field'
import { TextAreaRoot } from './text-area'

/**
 * Three of the four slots **are** the `Input`'s, re-exported rather than wrapped.
 *
 * A wrapper would add three components to the tree to change a `displayName` string, and
 * the string it would change is the one that tells you the truth: a `XAUI.Input.Label`
 * showing up inside a `XAUI.TextArea.Root` is exactly what is happening. Only the field
 * differs, and it is the only one written here.
 */
export const TextArea = Object.assign(TextAreaRoot, {
  Label: InputLabel,
  Field: TextAreaField,
  Description: InputDescription,
  Error: InputError,
})

export { useTextArea } from './text-area.context'
export type {
  TextAreaContextValue,
  TextAreaFieldProps,
  TextAreaProps,
} from './text-area.type'
