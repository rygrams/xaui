import { createSlotContext } from '../../system/slot'
import type { TimeFieldContextValue } from './time-field.type'

/**
 * R10 — the masked text, the keystroke handler and the period.
 *
 * It sits **beside** the `TextField`'s context rather than replacing it: the field below
 * reads its styles from that one and its value from this one, which is what lets the two
 * halves stay the components they already are.
 */
export const [TimeFieldProvider, useTimeField] =
  createSlotContext<TimeFieldContextValue>('TimeField')
