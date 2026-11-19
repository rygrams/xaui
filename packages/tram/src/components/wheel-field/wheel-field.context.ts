import { createSlotContext } from '@xaui/native/system'
import type { WheelFieldContextValue } from './wheel-field.type'

/**
 * What the field, the page and the wheels of a picker read. Both pickers provide it, and
 * each re-exports the reader under its own name. Outside one it throws by name.
 */
export const [WheelFieldProvider, useWheelField] =
  createSlotContext<WheelFieldContextValue>('Tram.WheelField')
