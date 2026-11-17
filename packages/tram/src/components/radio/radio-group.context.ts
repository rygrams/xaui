import { createContext, useContext } from 'react'
import type { RadioGroupContextValue } from './radio-group.type'

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)
RadioGroupContext.displayName = 'XAUI.Tram.Radio.Group.Context'

export const RadioGroupProvider = RadioGroupContext.Provider

/**
 * The set an option belongs to, for a third party writing its own row against the values
 * `Radio` reads. Strict: outside a group there is no chosen value to give.
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
 * The same context, read by a `Radio` that may not be in a set at all. Written by hand
 * rather than through `createSlotContext` for that: its absence is a valid arrangement,
 * not a misplaced slot.
 */
export function useOptionalRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext)
}
