import { MaskFieldField } from './mask-field-field'
import { MaskFieldRoot } from './mask-field'
import { TextFieldDescription, TextFieldError, TextFieldLabel } from '../text-field'

/**
 * Three of the slots **are** the `TextField`'s, re-exported rather than wrapped — the
 * `TextArea`'s arrangement, for the `TextArea`'s reason: a wrapper would add three
 * components to the tree to change a `displayName`, and the string it would change is the
 * one that tells you the truth.
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

/**
 * The mask primitives, re-exported so a caller wiring `convert` or reading a shape does not
 * reach into `utils/`.
 */
export {
  MASK_FIELD_MASKS,
  dateOrderFor,
  dateSeparatorFor,
  formatMaskedDate,
  formatMaskedTime,
  maskInput,
  parseMaskedDate,
  parseMaskedTime,
  resolveMask,
} from '../../utils/mask'
export type { DateOrder, Mask, MaskFieldMask, SegmentLabels } from '../../utils/mask'
