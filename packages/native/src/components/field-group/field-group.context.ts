import { createContext, useContext } from 'react'
import type { FieldGroupContextValue } from './field-group.type'

const FieldGroupContext = createContext<FieldGroupContextValue | null>(null)
FieldGroupContext.displayName = 'XAUI.FieldGroup.Context'

export const FieldGroupProvider = FieldGroupContext.Provider

/**
 * R10 — `useFieldGroup` is exported so a third party can write its own decorator against the
 * same measurement the built-in two report into. It carries **only** what the `TextField`'s
 * own context cannot: the two measured widths. Everything visual comes from `useTextField()`,
 * because a group is a `TextField`'s field and its styles were resolved there.
 *
 * Strict, and named: a decorator outside a group has nothing to report its width to.
 */
export function useFieldGroup(): FieldGroupContextValue {
  const value = useContext(FieldGroupContext)

  if (value === null) {
    throw new Error(
      'XAUI: useFieldGroup must be called inside <FieldGroup>. It reads the widths the ' +
        'decorators measured, so it can only be called under one.'
    )
  }

  return value
}

/**
 * The same context, read by a **field** that may or may not have decorators around it.
 *
 * Written by hand rather than through `createSlotContext` for exactly that: a field outside
 * a group is a valid arrangement — it is what every plain `TextField` is — rather than a
 * misplaced slot, so the throwing read and the optional one are two functions instead of one.
 * `useOptionalChart` is the same shape for the same reason.
 */
export function useOptionalFieldGroup(): FieldGroupContextValue | null {
  return useContext(FieldGroupContext)
}
