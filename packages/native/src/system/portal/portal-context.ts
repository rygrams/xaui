import { createContext } from 'react'
import type { ReactNode } from 'react'

export type PortalMethods = {
  addPortal: (key: string, element: ReactNode) => void
  removePortal: (key: string) => void
  /**
   * Where the host's own view sits in the window, in points.
   *
   * An overlay is measured against a trigger that reports window coordinates, but it is
   * rendered inside this host — so it is laid out against the host's origin, not the
   * window's. Anything the two differ by (a status bar, a safe-area inset, a host mounted
   * below a header) is exactly the distance the overlay would be wrong by. Subtracting it
   * is what makes `measureInWindow` on the trigger mean the same thing on both sides.
   */
  origin: { x: number; y: number }
}

/**
 * `null` outside a host, and `Portal` treats that as "render nothing" rather than
 * throwing: an app that forgot `PortalHost` should lose its overlays, not crash on the
 * first `Dialog`.
 */
export const PortalContext = createContext<PortalMethods | null>(null)
