import { createContext, useContext } from 'react'
import { createSlotContext } from '@xaui/native/system'
import type {
  ListContextValue,
  ListItemContextValue,
  ListRowContextValue,
  ListSwipeContextValue,
} from './list.type'

/**
 * `useList` is exported so a third party can write its own row against the values the
 * built-in ones read. Outside a `<List>` it throws by name.
 */
export const [ListProvider, useList] =
  createSlotContext<ListContextValue>('Tram.List')

const ListItemContext = createContext<ListItemContextValue>({ index: 0 })
ListItemContext.displayName = 'XAUI.Tram.List.ItemIndex'

/** The index of the item `renderItem` is drawing: its turn in the entrance. */
export const ListItemProvider = ListItemContext.Provider
export const useListItem = () => useContext(ListItemContext)

/** The styles of one row — live or grey — for the slots inside it. */
export const [ListRowProvider, useListRow] =
  createSlotContext<ListRowContextValue>('Tram.List.Item')

/** The row a `List.SwipeAction` lies under. */
export const [ListSwipeProvider, useListSwipe] =
  createSlotContext<ListSwipeContextValue>('Tram.List.Swipe')
