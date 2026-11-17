export { childrenToString } from './children-to-string'
export { createSlotContext } from './create-slot-context'
export { mergeProps } from './merge-props'
export { mergeRefs } from './merge-refs'
export { Slot } from './slot'
export type { SlotProps } from './slot'
export type { AsChildProps, MergeableProps, PossibleRef } from './slot.type'
// A root asks this before auto-inserting a slot (`isLoading` and its spinner). Published
// because `@xaui/tram` roots ask the same question and may only import entrypoints.
export { containsElementOfType } from '../../utils/children'
