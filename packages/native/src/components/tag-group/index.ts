import { TagGroupItem } from './tag-group-item'
import { TagGroupItemLabel } from './tag-group-item-label'
import { TagGroupItemRemoveButton } from './tag-group-item-remove-button'
import { TagGroupList } from './tag-group-list'
import { TagGroupRoot } from './tag-group'

export const TagGroup = Object.assign(TagGroupRoot, {
  List: TagGroupList,
  Item: TagGroupItem,
  ItemLabel: TagGroupItemLabel,
  ItemRemoveButton: TagGroupItemRemoveButton,
})

export { TagGroupRoot } from './tag-group'
export { TagGroupItem } from './tag-group-item'
export { TagGroupItemLabel } from './tag-group-item-label'
export { TagGroupItemRemoveButton } from './tag-group-item-remove-button'
export { TagGroupList } from './tag-group-list'
export { useTagGroup, useTagGroupItem } from './tag-group.context'
export { tagGroupRecipe } from './tag-group.recipe'
export { nextSelection } from './tag-group.utils'
export type {
  TagGroupContextValue,
  TagGroupItemContextValue,
  TagGroupItemLabelProps,
  TagGroupItemProps,
  TagGroupItemRemoveButtonProps,
  TagGroupListProps,
  TagGroupProps,
  TagGroupSize,
  TagGroupSlot,
  TagGroupVariant,
  TagItemRenderState,
  TagSelectionMode,
} from './tag-group.type'
