import { createSlotContext } from '../../system/slot'
import type { AlertContextValue } from './alert.type'

/**
 * R10 — `useAlert` is exported so a third party can write its own slot
 * (`<Alert.Actions>`) against the same resolved values the built-in ones read, without
 * forking the library. Outside an `<Alert>` it throws by name rather than failing three
 * frames later on an undefined style.
 */
export const [AlertProvider, useAlert] =
  createSlotContext<AlertContextValue>('Alert')
