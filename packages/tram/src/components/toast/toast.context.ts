import { createContext, useContext } from 'react'
import { createSlotContext, warnDev } from '@xaui/native/system'
import type {
  ToastContextValue,
  ToastEntryContextValue,
  ToastQueue,
} from './toast.type'

/**
 * `useToastContext` is exported so a third party can write its own slot against the
 * values the built-in ones read. Outside a `<Toast>` it throws by name.
 */
export const [ToastProvider, useToastContext] =
  createSlotContext<ToastContextValue>('Tram.Toast')

/**
 * How one toast learns what only the host knows: how to dismiss itself, what that is
 * called aloud, and whether anything may move. Provided **around** each entry; a `Toast`
 * rendered outside a host still renders, with a dismiss that does nothing.
 */
export const ToastEntryContext = createContext<ToastEntryContextValue | null>(null)

/**
 * The queue — not one toast's context, and deliberately a different object: a component
 * that *shows* a toast has no business reading the styles of those on screen.
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
 * Outside a `<ToastHost>` it warns and does nothing, rather than throwing: a screen that
 * crashes on its way to reporting that a save succeeded has turned a good outcome into a
 * bad one.
 */
export function useToast(): ToastQueue {
  const queue = useContext(ToastQueueContext)

  if (queue === null) {
    warnDev(
      'Tram useToast was called outside a <ToastHost>. Nothing will be shown. Mount ' +
        'one once, at the root of the app — it is where the pile renders.'
    )
    return NO_HOST
  }

  return queue
}
