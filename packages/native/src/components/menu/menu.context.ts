import { createSlotContext } from '../../system/slot'
import type { MenuContextValue, MenuItemContextValue } from './menu.type'

/**
 * R10 — `useMenu` is exported so a third party can write its own slot against the same
 * resolved values the built-in ones read. Outside a `<Menu>` it throws by name.
 */
export const [MenuProvider, useMenu] = createSlotContext<MenuContextValue>('Menu')

/** One row's own state. Everything visual still comes from `useMenu()`. */
export const [MenuItemProvider, useMenuItem] =
  createSlotContext<MenuItemContextValue>('Menu.Item')
