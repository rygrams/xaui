import { createContext, useContext } from 'react'
import type { RadioGroupContextValue } from './radio-group.type'

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)
RadioGroupContext.displayName = 'XAUI.Radio.Group.Context'

export const RadioGroupProvider = RadioGroupContext.Provider

/**
 * R10 — the set an option belongs to, for a third party writing its own row against the
 * same values `Radio` reads.
 *
 * Strict, and named: a hook that asks for the set is asking for the chosen value, and
 * outside a group there is none to give.
 */
export function useRadioGroup(): RadioGroupContextValue {
  const value = useContext(RadioGroupContext)

  if (value === null) {
    throw new Error(
      'XAUI: useRadioGroup must be called inside <Radio.Group>. It reads which option ' +
        'the set has chosen, and outside a set there is no such thing.'
    )
  }

  return value
}

/**
 * The same context, read by a `Radio` that may not be in a set at all — a standalone
 * radio over its own `isSelected` is the component's original shape and stays supported.
 *
 * Written by hand rather than through `createSlotContext` for exactly that: this is the
 * one context in the library whose absence is a valid arrangement rather than a misplaced
 * slot, so the throwing read and the optional one are two functions instead of one.
 */
export function useOptionalRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext)
}
