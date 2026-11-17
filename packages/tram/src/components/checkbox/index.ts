import { CheckboxIndicator } from './checkbox-indicator'
import { CheckboxLabel } from './checkbox-label'
import { CheckboxRoot } from './checkbox'

export const Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
})

export { useCheckbox } from './checkbox.context'
export { checkboxRecipe } from './checkbox.recipe'
export type {
  CheckboxContextValue,
  CheckboxIndicatorProps,
  CheckboxLabelProps,
  CheckboxProps,
  CheckboxSize,
  CheckboxSlot,
} from './checkbox.type'
