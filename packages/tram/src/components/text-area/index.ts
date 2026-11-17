import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'
import { TextAreaField } from './text-area-field'
import { TextAreaRoot } from './text-area'

export const TextArea = Object.assign(TextAreaRoot, {
  Label: TextFieldLabel,
  Field: TextAreaField,
  Description: TextFieldDescription,
  Error: TextFieldError,
})

export { useTextArea } from './text-area.context'
export type {
  TextAreaContextValue,
  TextAreaFieldProps,
  TextAreaProps,
} from './text-area.type'
