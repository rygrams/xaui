import { createSlotContext } from '../../system/slot'
import type { DummyFieldContextValue } from './dummy-field.type'

/**
 * R10 — `useDummyField` is exported so a slot can read the resolved styles, accessibility IDs
 * and press handlers. Outside a `<DummyField>` it throws by name.
 */
export const [DummyFieldProvider, useDummyField] =
  createSlotContext<DummyFieldContextValue>('DummyField')
