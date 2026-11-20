import { createSlotContext } from '@xaui/native/system'
import type { StepContextValue, StepperContextValue } from './stepper.type'

/** The resolved styles. Outside a `<Stepper>` it throws by name. */
export const [StepperProvider, useStepper] =
  createSlotContext<StepperContextValue>('Tram.Stepper')

/** One step's standing, numbered by the root. */
export const [StepProvider, useStep] =
  createSlotContext<StepContextValue>('Tram.Stepper.Item')
