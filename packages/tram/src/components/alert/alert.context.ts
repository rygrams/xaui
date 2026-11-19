import { createSlotContext } from '@xaui/native/system'
import type { AlertContextValue } from './alert.type'

/**
 * `useAlert` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside an `<Alert>` it throws by name.
 */
export const [AlertProvider, useAlert] =
  createSlotContext<AlertContextValue>('Tram.Alert')
