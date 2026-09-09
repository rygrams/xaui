import { SnackbarAction } from './snackbar-action'
import { SnackbarActionLabel } from './snackbar-action-label'
import { SnackbarActions } from './snackbar-actions'
import { SnackbarClose } from './snackbar-close'
import { SnackbarMessage } from './snackbar-message'
import { SnackbarRoot } from './snackbar'

export const Snackbar = Object.assign(SnackbarRoot, {
  Message: SnackbarMessage,
  Actions: SnackbarActions,
  Action: SnackbarAction,
  ActionLabel: SnackbarActionLabel,
  Close: SnackbarClose,
})
export { SnackbarRoot } from './snackbar'
export { SnackbarAction } from './snackbar-action'
export { SnackbarActionLabel } from './snackbar-action-label'
export { SnackbarActions } from './snackbar-actions'
export { SnackbarClose } from './snackbar-close'
export { SnackbarMessage } from './snackbar-message'
export { useSnackbar } from './snackbar.context'
export { snackbarRecipe } from './snackbar.recipe'
export type {
  SnackbarActionProps,
  SnackbarActionLabelProps,
  SnackbarActionsProps,
  SnackbarCloseProps,
  SnackbarContextValue,
  SnackbarMessageProps,
  SnackbarPosition,
  SnackbarProps,
  SnackbarSlot,
  SnackbarVariant,
} from './snackbar.type'
