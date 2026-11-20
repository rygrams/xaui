import { createContext, useContext, useId, useLayoutEffect } from 'react'
import type { ReactNode } from 'react'

export type ToastOutletContextValue = {
  /** The pile, ready to be drawn by whoever owns it. */
  pile: ReactNode
  /** The outlet the pile is drawn in, or `null` when the host draws it itself. */
  owner: string | null
  /** An outlet asks for the pile; what it is handed back gives it up. */
  claim: (outlet: string) => () => void
}

export const ToastOutletContext = createContext<ToastOutletContextValue | null>(null)

/**
 * Where the pile is drawn while a `Modal` is open.
 *
 * A `Modal` is a window of its own, over everything the app's root draws — the host's
 * pile included. Rendered inside one, this takes the pile over for as long as it is
 * mounted, and hands it back when the modal closes. The toasts already there are moved,
 * not sent again. `SwivelPage` mounts one in every full-screen page; an app does the
 * same in a `Modal` of its own:
 *
 * ```tsx
 * <Modal transparent>
 *   {content}
 *   <ToastOutlet />
 * </Modal>
 * ```
 *
 * Outside a `ToastHost` it renders nothing. It imports nothing of the toast's drawing or
 * its gesture, so a component that mounts one does not load them.
 */
export function ToastOutlet() {
  const host = useContext(ToastOutletContext)
  const outlet = useId()
  const claim = host?.claim

  useLayoutEffect(() => claim?.(outlet), [claim, outlet])

  return host?.owner === outlet ? host.pile : null
}

ToastOutlet.displayName = 'XAUI.Tram.ToastOutlet'
