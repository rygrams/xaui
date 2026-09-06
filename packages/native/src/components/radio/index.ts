import { RadioGroupRoot } from './radio-group'
import { RadioIndicator } from './radio-indicator'
import { RadioLabel } from './radio-label'
import { RadioRoot } from './radio'

/**
 * The set is `Radio.Group` rather than a component of its own, because it is not one: it
 * publishes the context an option was already written to read, and importing a group from
 * a second module to make three radios exclusive would be a seam with nothing behind it.
 */
export const Radio = Object.assign(RadioRoot, {
  Group: RadioGroupRoot,
  Indicator: RadioIndicator,
  Label: RadioLabel,
})

/** The same object, for a call site that reads better naming the set. */
export const RadioGroup = RadioGroupRoot

export { RadioRoot } from './radio'
export { RadioGroupRoot } from './radio-group'
export { RadioIndicator } from './radio-indicator'
export { RadioLabel } from './radio-label'
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
  RadioVariant,
} from './radio.type'
export type {
  RadioGroupContextValue,
  RadioGroupOrientation,
  RadioGroupProps,
  RadioGroupSlot,
} from './radio-group.type'
