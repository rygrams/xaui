import { createContext, useContext } from 'react'
import { createSlotContext } from '@xaui/native/system'
import type {
  NumberFieldContextValue,
  NumberFieldGroupContextValue,
} from './number-field.type'

/**
 * R10 — the text, the keystroke, the two ends of the stepper and their styles. It sits
 * **beside** the `TextField`'s context rather than replacing it: the field reads its look
 * from that one and its value from this one.
 */
export const [NumberFieldProvider, useNumberField] =
  createSlotContext<NumberFieldContextValue>('Tram.NumberField')

const NumberFieldGroupContext = createContext<NumberFieldGroupContextValue | null>(
  null
)

export const NumberFieldGroupProvider = NumberFieldGroupContext.Provider

/** The box the field sits in, or `null` for a field drawn on its own. */
export function useOptionalNumberFieldGroup(): NumberFieldGroupContextValue | null {
  return useContext(NumberFieldGroupContext)
}
