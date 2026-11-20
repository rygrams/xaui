import { createSlotContext } from '@xaui/native/system'
import type { NumberStepperContextValue } from './number-stepper.type'

/**
 * `useNumberStepper` is exported so a control beside the stepper can read or move the
 * value. Outside a `<NumberStepper>` it throws by name.
 */
export const [NumberStepperProvider, useNumberStepper] =
  createSlotContext<NumberStepperContextValue>('Tram.NumberStepper')
