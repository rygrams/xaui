import { createContext, useContext } from 'react'
import type { ToggleButtonGroupContextValue } from './toggle-button-group.type'

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextValue | null>(
  null
)
ToggleButtonGroupContext.displayName = 'XAUI.Tram.ToggleButton.Group.Context'

export const ToggleButtonGroupProvider = ToggleButtonGroupContext.Provider

/** Reads the surrounding group, when this button is one of its named cases. */
export function useOptionalToggleButtonGroup(): ToggleButtonGroupContextValue | null {
  return useContext(ToggleButtonGroupContext)
}

/** A custom member can choose and read the same value as a `ToggleButton`. */
export function useToggleButtonGroup(): ToggleButtonGroupContextValue {
  const value = useOptionalToggleButtonGroup()

  if (value === null) {
    throw new Error(
      'XAUI Tram: useToggleButtonGroup must be called inside <ToggleButton.Group>.'
    )
  }

  return value
}
