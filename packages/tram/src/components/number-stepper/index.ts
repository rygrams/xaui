import { NumberStepperRoot } from './number-stepper'
import { NumberStepperDecrement } from './number-stepper-decrement'
import { NumberStepperIncrement } from './number-stepper-increment'
import { NumberStepperTrack } from './number-stepper-track'
import { NumberStepperValue } from './number-stepper-value'

export const NumberStepper = Object.assign(NumberStepperRoot, {
  Track: NumberStepperTrack,
  Decrement: NumberStepperDecrement,
  Value: NumberStepperValue,
  Increment: NumberStepperIncrement,
})

export { NumberStepperRoot } from './number-stepper'
export { NumberStepperDecrement } from './number-stepper-decrement'
export { NumberStepperIncrement } from './number-stepper-increment'
export { NumberStepperTrack } from './number-stepper-track'
export { NumberStepperValue } from './number-stepper-value'
export { useNumberStepper } from './number-stepper.context'
export { numberStepperRecipe } from './number-stepper.recipe'
export type {
  NumberStepperButtonProps,
  NumberStepperContextValue,
  NumberStepperProps,
  NumberStepperSize,
  NumberStepperSlot,
  NumberStepperTrackProps,
  NumberStepperValueProps,
  NumberStepperVariant,
} from './number-stepper.type'
