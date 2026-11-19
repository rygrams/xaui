import { ListAction } from './list-action'
import { ListContent } from './list-content'
import { ListDescription } from './list-description'
import { ListItem } from './list-item'
import { ListLeading } from './list-leading'
import { ListSubtitle } from './list-subtitle'
import { ListSwipe } from './list-swipe'
import { ListSwipeAction } from './list-swipe-action'
import { ListTitle } from './list-title'
import { ListRoot } from './list'

export const List = Object.assign(ListRoot, {
  Item: ListItem,
  Leading: ListLeading,
  Content: ListContent,
  Title: ListTitle,
  Subtitle: ListSubtitle,
  Description: ListDescription,
  Action: ListAction,
  Swipe: ListSwipe,
  SwipeAction: ListSwipeAction,
})

export { ListRoot } from './list'
export { ListAction } from './list-action'
export { ListContent } from './list-content'
export { ListDescription } from './list-description'
export { ListItem } from './list-item'
export { ListLeading } from './list-leading'
export { ListSubtitle } from './list-subtitle'
export { ListSwipe } from './list-swipe'
export { ListSwipeAction } from './list-swipe-action'
export { ListTitle } from './list-title'
export { useList, useListItem, useListRow, useListSwipe } from './list.context'
export { LIST_GEOMETRY, listRecipe } from './list.recipe'
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
  ListRowContextValue,
  ListRowStyles,
  ListSlot,
  ListSubtitleProps,
  ListSwipeActionPaint,
  ListSwipeActionProps,
  ListSwipeContextValue,
  ListSwipeProps,
  ListTitleProps,
} from './list.type'
