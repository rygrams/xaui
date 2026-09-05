import { createContext, useContext } from 'react'
import { createSlotContext } from '../../system/slot'
import { warnDev } from '../../utils/warn-dev'
import type { ToastContextValue, ToastQueue } from './toast.type'

/**
 * R10 — the slots of one toast read their resolved styles from here. Outside a `<Toast>`
 * it throws by name.
 */
export const [ToastProvider, useToastContext] =
  createSlotContext<ToastContextValue>('Toast')

/**
 * How one toast learns to dismiss itself.
 *
 * Provided by the host **around** each entry, because the id is the host's and nothing
 * else has it. The `Toast` reads it and folds it into its own context, so a `Toast.Close`
 * two levels down needs nothing passed to it — and a `Toast` rendered outside a host still
 * renders, with a dismiss that does nothing rather than a crash.
 */
export const ToastDismissContext = createContext<(() => void) | null>(null)

/**
 * The queue, which is a different thing from one toast's context and deliberately not the
 * same object: a component that *shows* a toast has no business reading the styles of the
 * toasts already on screen.
 */
export const ToastQueueContext = createContext<ToastQueue | null>(null)

const NO_HOST: ToastQueue = {
  toast: () => '',
  dismiss: () => {},
  dismissAll: () => {},
}

/**
 * How anything asks for a toast.
 *
 * Outside a `<ToastHost>` it warns once and does nothing, rather than throwing. A missing
 * host is a setup mistake in the app shell, and a screen that crashes on its way to
 * reporting that a save succeeded has turned a good outcome into a bad one.
 */
export function useToast(): ToastQueue {
  const queue = useContext(ToastQueueContext)

  if (queue === null) {
    warnDev(
      'useToast was called outside a <ToastHost>. Nothing will be shown. Mount one once, ' +
        'at the root of the app — it is where the stack renders.'
    )
    return NO_HOST
  }

  return queue
}
