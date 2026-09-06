import { ListGroupFooter } from './list-group-footer'
import { ListGroupHeader } from './list-group-header'
import { ListGroupRoot } from './list-group'
import { ListGroupSection } from './list-group-section'
import { ListItem } from './list-item'
import { ListItemButton } from './list-item-button'
import { ListItemContent } from './list-item-content'
import { ListItemDescription } from './list-item-description'
import { ListItemPrefix } from './list-item-prefix'
import { ListItemSuffix } from './list-item-suffix'
import { ListItemTitle } from './list-item-title'
import { ListRoot } from './list'

export const ListGroup = Object.assign(ListGroupRoot, {
  Section: ListGroupSection,
  Header: ListGroupHeader,
  Footer: ListGroupFooter,
})

/**
 * `List.Group` is the same object, for a call site that already has `List` imported. The
 * sections are written on `ListGroup` either way — `List.Group.Section` reads as three
 * things when it is two.
 */
export const List = Object.assign(ListRoot, {
  Item: ListItem,
  ItemButton: ListItemButton,
  ItemPrefix: ListItemPrefix,
  ItemContent: ListItemContent,
  ItemTitle: ListItemTitle,
  ItemDescription: ListItemDescription,
  ItemSuffix: ListItemSuffix,
  Group: ListGroup,
})

export { ListRoot } from './list'
export { ListGroupRoot } from './list-group'
export { ListGroupFooter } from './list-group-footer'
export { ListGroupHeader } from './list-group-header'
export { ListGroupSection } from './list-group-section'
export { ListItem } from './list-item'
export { ListItemButton } from './list-item-button'
export { ListItemContent } from './list-item-content'
export { ListItemDescription } from './list-item-description'
export { ListItemPrefix } from './list-item-prefix'
export { ListItemSuffix } from './list-item-suffix'
export { ListItemTitle } from './list-item-title'
export { useList } from './list.context'
export { useListGroup } from './list-group.context'
export { listRecipe } from './list.recipe'
export { listGroupRecipe } from './list-group.recipe'
export type {
  ListContextValue,
  ListItemButtonProps,
  ListItemContentProps,
  ListItemDescriptionProps,
  ListItemPrefixProps,
  ListItemProps,
  ListItemSuffixProps,
  ListItemTitleProps,
  ListProps,
  ListSize,
  ListSlot,
  ListVariant,
} from './list.type'
export type {
  ListGroupContextValue,
  ListGroupProps,
  ListGroupSectionProps,
  ListGroupSlot,
  ListGroupTextSlotProps,
} from './list-group.type'
