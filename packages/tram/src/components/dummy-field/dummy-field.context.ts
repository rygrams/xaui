import { createSlotContext } from '@xaui/native/system'
import type { DummyFieldContextValue } from './dummy-field.type'

/**
 * The row's styles and the press. It sits **beside** the Tram `TextField`'s context rather
 * than replacing it, which is what lets the label, the description and the error stay the
 * `TextField`'s own slots. Outside a `<DummyField>` it throws by name.
 */
export const [DummyFieldProvider, useDummyField] =
  createSlotContext<DummyFieldContextValue>('Tram.DummyField')
