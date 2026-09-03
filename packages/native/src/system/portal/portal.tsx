import { useContext, useId, useLayoutEffect } from 'react'
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
 * Both halves run in layout effects rather than effects, which is deliberate: the content
 * lands in the same commit as the trigger's, so an overlay neither shows one frame late
 * nor survives one frame past the unmount that closed it. The unpublish sits in its own
 * effect so that it does not depend on `children` — a re-publish then keeps the portal's
 * place in the host's order instead of dropping it and re-adding it at the end.
 */
export function Portal({ children }: PortalProps) {
  const context = useContext(PortalContext)
  const key = useId()

  useLayoutEffect(() => {
    context?.addPortal(key, children)
  }, [children, context, key])

  useLayoutEffect(() => {
    return () => context?.removePortal(key)
  }, [context, key])

  return null
}

Portal.displayName = 'XAUI.Portal'
