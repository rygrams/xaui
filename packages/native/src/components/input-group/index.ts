import { InputGroupField } from './input-group-field'
import { InputGroupIcon } from './input-group-icon'
import { InputGroupPrefix } from './input-group-prefix'
import { InputGroupSuffix } from './input-group-suffix'
import { InputGroupRoot } from './input-group'

/**
 * The four parts of a decorated field. The label, the hint and the error are **not** here:
 * they are the `Input`'s, and an `InputGroup` lives inside one.
 */
export const InputGroup = Object.assign(InputGroupRoot, {
  Prefix: InputGroupPrefix,
  Field: InputGroupField,
  Suffix: InputGroupSuffix,
  Icon: InputGroupIcon,
})

export { InputGroupRoot } from './input-group'
export { InputGroupField } from './input-group-field'
export { InputGroupIcon } from './input-group-icon'
export { InputGroupPrefix } from './input-group-prefix'
export { InputGroupSuffix } from './input-group-suffix'
export { useInputGroup } from './input-group.context'
export { decoratorPadding } from './input-group.utils'
export type {
  InputGroupContextValue,
  InputGroupFieldProps,
  InputGroupIconProps,
  InputGroupPrefixProps,
  InputGroupProps,
  InputGroupSide,
  InputGroupSuffixProps,
} from './input-group.type'
