import { createSlotContext } from '@xaui/native/system'
import type { MenuContextValue, MenuItemContextValue } from './menu.type'

/**
 * `useMenu` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Menu>` it throws by name.
 */
export const [MenuProvider, useMenu] =
  createSlotContext<MenuContextValue>('Tram.Menu')

/** One row's own state. Everything visual still comes from `useMenu()`. */
export const [MenuItemProvider, useMenuItem] =
  createSlotContext<MenuItemContextValue>('Tram.Menu.Item')
