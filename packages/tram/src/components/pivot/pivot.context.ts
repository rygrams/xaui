import { createSlotContext } from '@xaui/native/system'
import type { PivotContextValue } from './pivot.type'

/**
 * `usePivot` is exported so a third party can write its own title or section against the
 * values the built-in ones read — and so a section's content can follow `position`.
 * Outside a `<Pivot>` it throws by name.
 */
export const [PivotProvider, usePivot] =
  createSlotContext<PivotContextValue>('Tram.Pivot')
