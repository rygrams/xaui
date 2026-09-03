import { createContext } from 'react'
import type { ReactNode } from 'react'

export type PortalMethods = {
  addPortal: (key: string, element: ReactNode) => void
  removePortal: (key: string) => void
}

/**
 * `null` outside a host, and `Portal` treats that as "render nothing" rather than
 * throwing: an app that forgot `PortalHost` should lose its overlays, not crash on the
 * first `Dialog`.
 */
export const PortalContext = createContext<PortalMethods | null>(null)
