import { createSlotContext } from '../../system/slot'
import type { EmptyStateContextValue } from './empty-state.type'

/** R10 — the resolved styles, for a slot of your own between the title and the buttons. */
export const [EmptyStateProvider, useEmptyState] =
  createSlotContext<EmptyStateContextValue>('EmptyState')
