import { createSlotContext } from '../../system/slot'
import type { DateFieldContextValue } from './date-field.type'

/**
 * R10 — the masked text and the keystroke handler.
 *
 * It sits **beside** the `TextField`'s context rather than replacing it: the field below
 * reads its styles from that one and its value from this one, which is what lets the two
 * halves stay the components they already are.
 */
export const [DateFieldProvider, useDateField] =
  createSlotContext<DateFieldContextValue>('DateField')
