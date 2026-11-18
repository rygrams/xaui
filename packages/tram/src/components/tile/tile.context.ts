import { createContext, useContext } from 'react'
import { createSlotContext } from '@xaui/native/system'
import type { TileContextValue } from './tile.type'

/**
 * `useTile` is exported so the app can set its own text on a tile — `foreground` is the
 * colour that reads on this fill — or write its own slot. Outside a `<Tile>` it throws by
 * name.
 */
export const [TileProvider, useTile] =
  createSlotContext<TileContextValue>('Tram.Tile')

const TileGridContext = createContext(false)

export const TileGridProvider = TileGridContext.Provider

/** Whether a `Tile.Grid` is placing this tile, which then fills the frame it was given. */
export function useIsInTileGrid(): boolean {
  return useContext(TileGridContext)
}
