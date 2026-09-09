import { Toast, ToastHost, useToast, useToastContext } from '../toast'

/**
 * A transient, queued notification. `Snackbar` keeps the familiar name while sharing the
 * v1 toast queue, portal, gestures and Reanimated lifecycle.
 */
export const Snackbar = Toast
export const SnackbarHost = ToastHost
export const useSnackbar = useToast
export const useSnackbarContext = useToastContext

export type {
  ToastActionsProps as SnackbarActionsProps,
  ToastCloseProps as SnackbarCloseProps,
  ToastContextValue as SnackbarContextValue,
  ToastDescriptionProps as SnackbarDescriptionProps,
  ToastHostProps as SnackbarHostProps,
  ToastOptions as SnackbarOptions,
  ToastPlacement as SnackbarPlacement,
  ToastProps as SnackbarProps,
  ToastQueue as SnackbarQueue,
  ToastRecord as SnackbarRecord,
  ToastSlot as SnackbarSlot,
  ToastTitleProps as SnackbarTitleProps,
  ToastVariant as SnackbarVariant,
} from '../toast'
