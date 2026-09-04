import { RadioIndicator } from './radio-indicator'
import { RadioLabel } from './radio-label'
import { RadioRoot } from './radio'

export const Radio = Object.assign(RadioRoot, {
  Indicator: RadioIndicator,
  Label: RadioLabel,
})

export { RadioRoot } from './radio'
export { RadioIndicator } from './radio-indicator'
export { RadioLabel } from './radio-label'
export { useRadio } from './radio.context'
export { radioRecipe } from './radio.recipe'
export type {
  RadioContextValue,
  RadioIndicatorProps,
  RadioLabelProps,
  RadioProps,
  RadioSize,
  RadioSlot,
  RadioVariant,
} from './radio.type'
