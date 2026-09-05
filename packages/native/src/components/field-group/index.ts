import { FieldGroupField } from './field-group-field'
import { FieldGroupIcon } from './field-group-icon'
import { FieldGroupPrefix } from './field-group-prefix'
import { FieldGroupSuffix } from './field-group-suffix'
import { FieldGroupRoot } from './field-group'

/**
 * The four parts of a decorated field. The label, the hint and the error are **not** here:
 * they are the `TextField`'s, and a `FieldGroup` lives inside one.
 */
export const FieldGroup = Object.assign(FieldGroupRoot, {
  Prefix: FieldGroupPrefix,
  Field: FieldGroupField,
  Suffix: FieldGroupSuffix,
  Icon: FieldGroupIcon,
})

export { FieldGroupRoot } from './field-group'
export { FieldGroupField } from './field-group-field'
export { FieldGroupIcon } from './field-group-icon'
export { FieldGroupPrefix } from './field-group-prefix'
export { FieldGroupSuffix } from './field-group-suffix'
export { useFieldGroup } from './field-group.context'
export { decoratorPadding } from './field-group.utils'
export type {
  FieldGroupContextValue,
  FieldGroupFieldProps,
  FieldGroupIconProps,
  FieldGroupPrefixProps,
  FieldGroupProps,
  FieldGroupSide,
  FieldGroupSuffixProps,
} from './field-group.type'
