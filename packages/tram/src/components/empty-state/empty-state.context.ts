import { createSlotContext } from '@xaui/native/system'
import type { EmptyStateContextValue } from './empty-state.type'

/**
 * `useEmptyState` is exported so a third party can write its own slot against the values
 * the built-in ones read. Outside an `<EmptyState>` it throws by name.
 */
export const [EmptyStateProvider, useEmptyState] =
  createSlotContext<EmptyStateContextValue>('Tram.EmptyState')
