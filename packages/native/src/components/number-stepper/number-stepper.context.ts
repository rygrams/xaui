import { createSlotContext } from '../../system/slot'
import type { NumberStepperContextValue } from './number-stepper.type'

/**
 * R10 — the number, the two ends, and the styles the three slots wear.
 *
 * Exported so a third party can write a slot of their own — a unit beside the value, a
 * reset — against the same resolved values the built-in ones read.
 */
export const [NumberStepperProvider, useNumberStepper] =
  createSlotContext<NumberStepperContextValue>('NumberStepper')
