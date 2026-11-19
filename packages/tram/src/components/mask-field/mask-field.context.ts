import { createSlotContext } from '@xaui/native/system'
import type { MaskFieldContextValue } from './mask-field.type'

/**
 * R10 — the masked text and the keystroke handler.
 *
 * It sits **beside** the Tram `TextField`'s context rather than replacing it: the field
 * reads its styles from that one and its value from this one, which is what lets the
 * label, the description and the error stay the `TextField`'s own slots.
 */
export const [MaskFieldProvider, useMaskField] =
  createSlotContext<MaskFieldContextValue>('Tram.MaskField')
