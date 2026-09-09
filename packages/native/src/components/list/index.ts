import { ListAction } from './list-action'
import { ListContent } from './list-content'
import { ListDescription } from './list-description'
import { ListItem } from './list-item'
import { ListLeading } from './list-leading'
import { ListTitle } from './list-title'
import { ListRoot } from './list'

export const List = Object.assign(ListRoot, {
  Item: ListItem,
  Leading: ListLeading,
  Content: ListContent,
  Title: ListTitle,
  Description: ListDescription,
  Action: ListAction,
})

export { ListRoot } from './list'
export { ListAction } from './list-action'
export { ListContent } from './list-content'
export { ListDescription } from './list-description'
export { ListItem } from './list-item'
export { ListLeading } from './list-leading'
export { ListTitle } from './list-title'
export { useList, useListItem } from './list.context'
export { listRecipe } from './list.recipe'
export type {
  ListActionProps,
  ListContentProps,
  ListContextValue,
  ListDescriptionProps,
  ListItemContextValue,
  ListItemProps,
  ListLeadingProps,
  ListProps,
  ListRootComponent,
  ListSlot,
  ListTitleProps,
} from './list.type'
