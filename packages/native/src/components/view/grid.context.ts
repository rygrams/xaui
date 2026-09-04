import { createContext, useContext } from 'react'

export type GridContextValue = {
  /**
   * The width of one column in points, or `undefined` on the very first render — the grid
   * has not been measured yet. A cell falls back to a percentage for that one frame.
   */
  cellWidth: number | undefined
  columns: number
  gap: number
}

const GridContext = createContext<GridContextValue | null>(null)

export const GridProvider = GridContext.Provider

/**
 * R10 — the resolved geometry a cell needs, published by the root that measured it.
 *
 * Strict, and named: a `Grid.Item` outside a `Grid` has no column width to span, and
 * failing with the component's name beats rendering a cell of arbitrary size.
 */
export function useGrid(): GridContextValue {
  const value = useContext(GridContext)

  if (value === null) {
    throw new Error(
      'XAUI: Grid.Item must be rendered inside a Grid — it spans that grid’s columns, ' +
        'and outside one there is nothing to span.'
    )
  }

  return value
}

/** The width of a cell covering `span` columns, gaps included. */
export function spanWidth(
  { cellWidth, columns, gap }: GridContextValue,
  span: number
): number | `${number}%` {
  const clamped = Math.min(Math.max(Math.floor(span), 1), columns)

  if (cellWidth === undefined) return `${(100 / columns) * clamped}%`

  return cellWidth * clamped + gap * (clamped - 1)
}
