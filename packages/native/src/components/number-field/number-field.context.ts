import { createSlotContext } from '../../system/slot'
import type { NumberFieldContextValue } from './number-field.type'

/**
 * R10 — the text, the keystroke, and the two ends of the stepper.
 *
 * It sits **beside** the `TextField`'s context rather than replacing it, exactly as the
 * `MaskField`'s does: the field below reads its styles from that one and its value from
 * this one, which is what lets the two halves stay the components they already are.
 */
export const [NumberFieldProvider, useNumberField] =
  createSlotContext<NumberFieldContextValue>('NumberField')
