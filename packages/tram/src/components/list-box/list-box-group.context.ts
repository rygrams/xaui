import { createContext, useContext } from 'react'
import type { ListBoxGroupContextValue } from './list-box-group.type'

const ListBoxGroupContext = createContext<ListBoxGroupContextValue | null>(null)
ListBoxGroupContext.displayName = 'XAUI.Tram.ListBoxGroup.Context'

export const ListBoxGroupProvider = ListBoxGroupContext.Provider

/**
 * The group a `ListBox` sits in, or `null`: a list on its own is a valid arrangement, not
 * a misplaced slot.
 */
export function useOptionalListBoxGroup(): ListBoxGroupContextValue | null {
  return useContext(ListBoxGroupContext)
}

/** For the group's own slots. Outside a `<ListBoxGroup>` it throws by name. */
export function useListBoxGroup(): ListBoxGroupContextValue {
  const group = useContext(ListBoxGroupContext)

  if (group === null) {
    throw new Error(
      'XAUI: useListBoxGroup must be called inside <ListBoxGroup>. A section reads the ' +
        'values its group resolved, so it can only be rendered as a child of one.'
    )
  }

  return group
}

const ListBoxSectionContext = createContext<string | undefined>(undefined)
ListBoxSectionContext.displayName = 'XAUI.Tram.ListBoxGroup.Section.Context'

export const ListBoxSectionProvider = ListBoxSectionContext.Provider

/**
 * The id a section is labelled by, for its header to carry — or `undefined` for a header
 * placed straight in the group.
 */
export function useListBoxSectionLabel(): string | undefined {
  return useContext(ListBoxSectionContext)
}
