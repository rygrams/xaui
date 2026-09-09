import { createContext, useContext } from 'react'
import type { ToggleButtonGroupContextValue } from './toggle-button-group.type'

const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextValue | null>(
  null
)
ToggleButtonGroupContext.displayName = 'XAUI.ToggleButton.Group.Context'

export const ToggleButtonGroupProvider = ToggleButtonGroupContext.Provider

/** Reads the surrounding set, when this toggle is one of its named options. */
export function useOptionalToggleButtonGroup(): ToggleButtonGroupContextValue | null {
  return useContext(ToggleButtonGroupContext)
}

/** R10 — custom group members can select and read the same value as ToggleButton. */
export function useToggleButtonGroup(): ToggleButtonGroupContextValue {
  const value = useOptionalToggleButtonGroup()

  if (value === null) {
    throw new Error(
      'XAUI: useToggleButtonGroup must be called inside <ToggleButton.Group>.'
    )
  }

  return value
}
