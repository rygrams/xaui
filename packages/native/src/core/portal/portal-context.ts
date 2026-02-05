import { createContext } from 'react'
import type { ReactNode } from 'react'

export type PortalMethods = {
  addPortal: (key: string, element: ReactNode) => void
  removePortal: (key: string) => void
}

export const PortalContext = createContext<PortalMethods | null>(null)
