import { JumpListHeader } from './jump-list-header'
import { JumpListKey } from './jump-list-key'
import { JumpListOverlay } from './jump-list-overlay'
import { JumpListRoot } from './jump-list'

export const JumpList = Object.assign(JumpListRoot, {
  Header: JumpListHeader,
  Overlay: JumpListOverlay,
  Key: JumpListKey,
})

export { useJumpList } from './jump-list.context'
export { jumpListRecipe } from './jump-list.recipe'
export {
  JUMP_LIST_ALPHABET,
  groupByInitial,
  initialOf,
  jumpLayoutFor,
} from './jump-list.sections'
export type {
  GroupOptions,
  JumpListLayout,
  JumpListSection,
} from './jump-list.sections'
export type {
  JumpListContextValue,
  JumpListGroup,
  JumpListHeaderProps,
  JumpListKeyProps,
  JumpListOverlayProps,
  JumpListProps,
  JumpListRef,
  JumpListSize,
  JumpListSlot,
} from './jump-list.type'
