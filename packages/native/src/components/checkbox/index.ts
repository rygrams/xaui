import { CheckboxIndicator } from './checkbox-indicator'
import { CheckboxLabel } from './checkbox-label'
import { CheckboxRoot } from './checkbox'

export const Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
})

// Exported individually as well: the parts are what a third party composes against, and
// what the next control of the same family reuses rather than copies.
export { CheckboxRoot } from './checkbox'
export { CheckboxIndicator } from './checkbox-indicator'
export { CheckboxLabel } from './checkbox-label'
export { useCheckbox } from './checkbox.context'
export { checkboxRecipe } from './checkbox.recipe'
export type {
  CheckboxContextValue,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxProps,
  CheckboxSize,
  CheckboxSlot,
  CheckboxVariant,
} from './checkbox.type'
