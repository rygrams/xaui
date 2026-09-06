import { EmptyStateContent } from './empty-state-content'
import { EmptyStateDescription, EmptyStateTitle } from './empty-state-text'
import { EmptyStateHeader } from './empty-state-header'
import { EmptyStateMedia } from './empty-state-media'
import { EmptyStateRoot } from './empty-state'

export const EmptyState = Object.assign(EmptyStateRoot, {
  Header: EmptyStateHeader,
  Media: EmptyStateMedia,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Content: EmptyStateContent,
})

export { EmptyStateRoot } from './empty-state'
export { EmptyStateContent } from './empty-state-content'
export { EmptyStateHeader } from './empty-state-header'
export { EmptyStateMedia } from './empty-state-media'
export { EmptyStateDescription, EmptyStateTitle } from './empty-state-text'
export { useEmptyState } from './empty-state.context'
export { emptyStateRecipe } from './empty-state.recipe'
export type {
  EmptyStateContextValue,
  EmptyStateMediaProps,
  EmptyStateMediaVariant,
  EmptyStateProps,
  EmptyStateSize,
  EmptyStateSlot,
  EmptyStateTextProps,
  EmptyStateVariant,
  EmptyStateViewProps,
} from './empty-state.type'
