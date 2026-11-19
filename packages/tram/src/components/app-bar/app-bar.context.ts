import { createSlotContext } from '@xaui/native/system'
import type { AppBarButtonContextValue, AppBarContextValue } from './app-bar.type'

/**
 * `useAppBar` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside an `<AppBar>` it throws by name.
 */
export const [AppBarProvider, useAppBar] =
  createSlotContext<AppBarContextValue>('Tram.AppBar')

/** What an `AppBar.Button` hands its glyph and its label. */
export const [AppBarButtonProvider, useAppBarButton] =
  createSlotContext<AppBarButtonContextValue>('Tram.AppBar.Button')
