import { NumberStepperDecrement } from './number-stepper-decrement'
import { NumberStepperIncrement } from './number-stepper-increment'
import { NumberStepperTrack } from './number-stepper-track'
import { NumberStepperValue } from './number-stepper-value'
import { NumberStepperRoot } from './number-stepper'

/**
 * Four slots, and the track is written first — it is out of flow, so its place in the JSX
 * is what puts it under the rest rather than over it.
 */
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

/**
 * The same number primitives the `NumberField` re-exports, so a caller does not reach into
 * `utils/`, which is private.
 */
export {
  canStep,
  clampNumber,
  formatNumber,
  numberMarks,
  parseNumber,
  stepNumber,
} from '../../utils/number'
export type { NumberBounds } from '../../utils/number'
