import type { TileSize } from './tile.type'

/** How many cells a tile takes, across and down. */
export type TileSpan = { columns: number; rows: number }

/** Where a tile sits in the grid, in cells from the top-start corner. */
export type TilePlacement = TileSpan & { column: number; row: number }

export type TileLayout = { placements: TilePlacement[]; rows: number }

/** Points, measured from the grid's top-start corner. */
export type TileFrame = { start: number; top: number; width: number; height: number }

/** The Metro start screen: a small tile is one cell, a medium four, a wide eight. */
export const TILE_SPAN: Record<TileSize, TileSpan> = {
  small: { columns: 1, rows: 1 },
  medium: { columns: 2, rows: 2 },
  wide: { columns: 4, rows: 2 },
}

function wholeColumns(columns: number): number {
  return Number.isFinite(columns) ? Math.max(1, Math.floor(columns)) : 1
}

function isFree(taken: boolean[][], at: TilePlacement): boolean {
  for (let row = at.row; row < at.row + at.rows; row++) {
    for (let column = at.column; column < at.column + at.columns; column++) {
      if (taken[row]?.[column]) return false
    }
  }

  return true
}

function take(taken: boolean[][], at: TilePlacement): void {
  for (let row = at.row; row < at.row + at.rows; row++) {
    taken[row] ??= []
    for (let column = at.column; column < at.column + at.columns; column++) {
      taken[row][column] = true
    }
  }
}

/** The first hole the span fits in, reading the grid row by row from its start. */
function firstFit(
  taken: boolean[][],
  span: TileSpan,
  columns: number
): TilePlacement {
  for (let row = 0; ; row++) {
    for (let column = 0; column + span.columns <= columns; column++) {
      const at = { ...span, column, row }
      if (isFree(taken, at)) return at
    }
  }
}

/**
 * Where each tile of `sizes` goes in a grid `columns` wide, in order, each one in the
 * first hole it fits — so two small tiles stack beside a medium one instead of leaving a
 * gap under the first, as on the start screen.
 *
 * A tile wider than the grid is held to the grid's width rather than hanging out of it.
 */
export function placeTiles(sizes: readonly TileSize[], columns: number): TileLayout {
  const across = wholeColumns(columns)
  const taken: boolean[][] = []

  const placements = sizes.map(size => {
    const { columns: wanted, rows } = TILE_SPAN[size]
    const at = firstFit(taken, { columns: Math.min(wanted, across), rows }, across)
    take(taken, at)

    return at
  })

  return { placements, rows: taken.length }
}

/** The side of one square cell in a grid `width` across. Never negative. */
export function cellSide(width: number, columns: number, gap: number): number {
  const across = wholeColumns(columns)

  return Math.max(0, (width - gap * (across - 1)) / across)
}

/** `count` cells in a line, with the gaps between them. */
function run(count: number, cell: number, gap: number): number {
  return count <= 0 ? 0 : count * cell + (count - 1) * gap
}

/** A placement in points: a tile covers its cells and the gaps between them. */
export function tileFrame(at: TilePlacement, cell: number, gap: number): TileFrame {
  return {
    start: at.column * (cell + gap),
    top: at.row * (cell + gap),
    width: run(at.columns, cell, gap),
    height: run(at.rows, cell, gap),
  }
}

/** The height of a grid `rows` deep. */
export function gridHeight(rows: number, cell: number, gap: number): number {
  return run(rows, cell, gap)
}
