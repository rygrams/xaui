import { createContext, useContext } from 'react'
import type { ListGroupContextValue } from './list-group.type'

const ListGroupContext = createContext<ListGroupContextValue | null>(null)
ListGroupContext.displayName = 'XAUI.ListGroup.Context'

export const ListGroupProvider = ListGroupContext.Provider

/**
 * R10 — the group's resolved heading styles and the appearance it hands down, for a third
 * party writing a section of its own.
 *
 * Strict, and named: a hook that asks for the group is asking for its headings, and outside
 * one there are none.
 */
export function useListGroup(): ListGroupContextValue {
  const value = useContext(ListGroupContext)

  if (value === null) {
    throw new Error(
      'XAUI: useListGroup must be called inside <ListGroup>. It reads the styles that ' +
        'group resolved, so it can only be called under one.'
    )
  }

  return value
}

/**
 * The same context, read by a `List` that may not be in a group at all — a list on its own
 * is this component's original shape and stays supported.
 *
 * Written by hand rather than through `createSlotContext` for exactly that: this is a
 * context whose absence is a valid arrangement rather than a misplaced slot, so the
 * throwing read and the optional one are two functions instead of one.
 */
export function useOptionalListGroup(): ListGroupContextValue | null {
  return useContext(ListGroupContext)
}
