import { RadioGroupRoot } from './radio-group'
import { RadioIndicator } from './radio-indicator'
import { RadioLabel } from './radio-label'
import { RadioRoot } from './radio'

/** The set is `Radio.Group`: it publishes the context an option is written to read. */
export const Radio = Object.assign(RadioRoot, {
  Group: RadioGroupRoot,
  Indicator: RadioIndicator,
  Label: RadioLabel,
})

/** The same object, for a call site that reads better naming the set. */
export const RadioGroup = RadioGroupRoot

export { useRadio } from './radio.context'
export { useRadioGroup } from './radio-group.context'
export { radioRecipe } from './radio.recipe'
export { radioGroupRecipe } from './radio-group.recipe'
export type {
  RadioContextValue,
  RadioIndicatorProps,
  RadioLabelProps,
  RadioProps,
  RadioSize,
  RadioSlot,
} from './radio.type'
export type {
  RadioGroupContextValue,
  RadioGroupOrientation,
  RadioGroupProps,
  RadioGroupSlot,
} from './radio-group.type'
