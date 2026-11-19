import { createSlotContext } from '@xaui/native/system'
import type { JumpListContextValue, JumpListGroup } from './jump-list.type'

/**
 * `useJumpList` is exported so the app can draw its own header or key, or put the grid
 * up from elsewhere (`open`). Outside a `<JumpList>` it throws by name.
 */
export const [JumpListProvider, useJumpList] =
  createSlotContext<JumpListContextValue>('Tram.JumpList')

/**
 * The group a header or a key is drawing — handed by the list to each copy of the slot
 * written once, so the slot itself takes no key.
 */
export const [JumpListGroupProvider, useJumpListGroup] =
  createSlotContext<JumpListGroup>('Tram.JumpList.Group')
