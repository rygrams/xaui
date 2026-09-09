import { createSlotContext } from '../../system/slot'
import type { ListContextValue, ListItemContextValue } from './list.type'

export const [ListProvider, useList] = createSlotContext<ListContextValue>('List')

export const [ListItemProvider, useListItem] =
  createSlotContext<ListItemContextValue>('ListItem')
