import { useContext, useEffect, useId, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'
import { PortalContext } from './portal-context'

export type PortalProps = {
  children: ReactNode
}

/**
 * Renders its children into the nearest `PortalHost` instead of where it sits. What
 * `Dialog`, `Sheet`, `Drawer` and `Snackbar` are built on: an overlay has to escape the
 * clipping and stacking of whatever container happened to hold the trigger.
 *
 * Publishing in a layout effect rather than an effect is deliberate — the content lands
 * in the same commit as the trigger's, so an overlay never shows one frame late.
 */
export function Portal({ children }: PortalProps) {
  const context = useContext(PortalContext)
  const key = useId()

  useLayoutEffect(() => {
    context?.addPortal(key, children)
  }, [children, context, key])

  useEffect(() => {
    return () => context?.removePortal(key)
  }, [context, key])

  return null
}

Portal.displayName = 'XAUI.Portal'
