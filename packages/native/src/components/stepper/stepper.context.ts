import { createSlotContext } from '../../system/slot'
import type { StepContextValue, StepperContextValue } from './stepper.type'

/**
 * R10 — `useStepper` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<Stepper>` it throws by name.
 */
export const [StepperProvider, useStepper] =
  createSlotContext<StepperContextValue>('Stepper')

/**
 * One step's standing, and it comes from the **root** rather than from the item.
 *
 * That is the difference from an `Accordion.Item`, which declares its own `value`: a row
 * of an accordion is open or closed on its own, where a step only means something in the
 * order it sits in. The root numbers its children and hands each one where it stands, so
 * a step inserted in the middle renumbers the rest by being there.
 */
export const [StepProvider, useStep] =
  createSlotContext<StepContextValue>('Stepper.Item')
