import { ToastActions } from './toast-actions'
import { ToastClose } from './toast-close'
import { ToastDescription } from './toast-description'
import { ToastTitle } from './toast-title'
import { Toast as ToastRoot } from './toast'

export const Toast = Object.assign(ToastRoot, {
  Title: ToastTitle,
  Description: ToastDescription,
  Actions: ToastActions,
  Close: ToastClose,
})

export { Toast as ToastRoot } from './toast'
export { ToastActions } from './toast-actions'
export { ToastClose } from './toast-close'
export { ToastDescription } from './toast-description'
export { ToastHost } from './toast-host'
export { ToastTitle } from './toast-title'
export { useToast, useToastContext } from './toast.context'
export { toastRecipe } from './toast.recipe'
export type { ToastHostProps } from './toast-host'
export type {
  ToastActionsProps,
  ToastCloseProps,
  ToastContextValue,
  ToastDescriptionProps,
  ToastOptions,
  ToastPlacement,
  ToastProps,
  ToastQueue,
  ToastRecord,
  ToastSlot,
  ToastTitleProps,
  ToastVariant,
} from './toast.type'
