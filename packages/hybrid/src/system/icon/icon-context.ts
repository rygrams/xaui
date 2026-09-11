import { createContext, useContext } from 'react'
import type { IconContextValue } from './icon.type'

/**
 * Not a slot context that throws outside its parent: an `Icon` has to work on its own as
 * much as inside a `Button`. An empty context is the honest default — nothing inherited,
 * so the theme decides.
 */
export const IconContext = createContext<IconContextValue>({})

IconContext.displayName = 'XAUI.Icon.Context'

export function useIconContext(): IconContextValue {
  return useContext(IconContext)
}
