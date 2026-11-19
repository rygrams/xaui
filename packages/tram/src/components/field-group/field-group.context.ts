import { createContext, useContext } from 'react'
import type { FieldGroupContextValue } from './field-group.type'

const FieldGroupContext = createContext<FieldGroupContextValue | null>(null)
FieldGroupContext.displayName = 'XAUI.Tram.FieldGroup.Context'

export const FieldGroupProvider = FieldGroupContext.Provider

/**
 * `useFieldGroup` is exported so a third party can write its own decorator against the
 * values the built-in ones read. Strict, and named: a decorator outside a group has no box
 * to stand in.
 */
export function useFieldGroup(): FieldGroupContextValue {
  const value = useContext(FieldGroupContext)

  if (value === null) {
    throw new Error(
      'XAUI: Tram useFieldGroup must be called inside <FieldGroup>. A decorator is a cell ' +
        'of its box, so it can only be drawn in one.'
    )
  }

  return value
}

/**
 * The same context, read by a **field** that may or may not stand in a group — a plain
 * `TextField`'s field is a valid arrangement, not a misplaced slot. Native's two reads, by
 * the same names.
 */
export function useOptionalFieldGroup(): FieldGroupContextValue | null {
  return useContext(FieldGroupContext)
}
