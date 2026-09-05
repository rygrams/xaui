import { createSlotContext } from '../../system/slot'
import type {
  TagGroupContextValue,
  TagGroupItemContextValue,
} from './tag-group.type'

/**
 * R10 — `useTagGroup` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<TagGroup>` it throws by name.
 */
export const [TagGroupProvider, useTagGroup] =
  createSlotContext<TagGroupContextValue>('TagGroup')

/** One tag's own state. Everything visual still comes from `useTagGroup()`. */
export const [TagGroupItemProvider, useTagGroupItem] =
  createSlotContext<TagGroupItemContextValue>('TagGroup.Item')
