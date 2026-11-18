import { createSlotContext } from '@xaui/native/system'
import type { ListBoxContextValue, ListBoxRowStyles } from './list-box.type'

/**
 * `useListBox` is exported so a third party can write its own row against the values the
 * built-in ones read. Outside a `<ListBox>` it throws by name.
 */
export const [ListBoxProvider, useListBox] =
  createSlotContext<ListBoxContextValue>('Tram.ListBox')

/**
 * The styles of one row — live or grey — for the slots inside it. Outside a
 * `ListBox.Item` or a `ListBox.ItemButton` it throws by name.
 */
export const [ListBoxRowProvider, useListBoxRow] =
  createSlotContext<ListBoxRowStyles>('Tram.ListBox.Item')
