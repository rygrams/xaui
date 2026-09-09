import { createSlotContext } from '../../system/slot'
import type { SnackbarContextValue } from './snackbar.type'

export const [SnackbarProvider, useSnackbar] =
  createSlotContext<SnackbarContextValue>('Snackbar')
