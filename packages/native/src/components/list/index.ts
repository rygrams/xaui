import { ListRoot } from './list'
import { ListItem } from './list-item'
import { ListItemContent } from './list-item-content'
import { ListItemDescription } from './list-item-description'
import { ListItemPrefix } from './list-item-prefix'
import { ListItemSuffix } from './list-item-suffix'
import { ListItemTitle } from './list-item-title'

export const List = Object.assign(ListRoot, {
  Item: ListItem,
  ItemPrefix: ListItemPrefix,
  ItemContent: ListItemContent,
  ItemTitle: ListItemTitle,
  ItemDescription: ListItemDescription,
  ItemSuffix: ListItemSuffix,
})

export { ListRoot } from './list'
export { ListItem } from './list-item'
export { ListItemContent } from './list-item-content'
export { ListItemDescription } from './list-item-description'
export { ListItemPrefix } from './list-item-prefix'
export { ListItemSuffix } from './list-item-suffix'
export { ListItemTitle } from './list-item-title'
export { useList } from './list.context'
export { listRecipe } from './list.recipe'
export type {
  ListContextValue,
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
