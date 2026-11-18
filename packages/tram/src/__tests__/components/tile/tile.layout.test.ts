import { describe, expect, it } from 'vitest'
import {
  cellSide,
  gridHeight,
  placeTiles,
  tileFrame,
} from '../../../components/tile/tile.layout'

describe('placeTiles', () => {
  it('lays tiles out in reading order', () => {
    const { placements, rows } = placeTiles(['small', 'small', 'medium'], 4)

    expect(placements.map(({ column, row }) => [column, row])).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ])
    expect(rows).toBe(2)
  })

  it('stacks small tiles beside a medium one instead of leaving a hole', () => {
    const { placements, rows } = placeTiles(
      ['medium', 'small', 'small', 'small', 'small'],
      4
    )

    expect(placements.map(({ column, row }) => [column, row])).toEqual([
      [0, 0],
      [2, 0],
      [3, 0],
      [2, 1],
      [3, 1],
    ])
    expect(rows).toBe(2)
  })

  it('starts a wide tile on a row of its own', () => {
    const { placements, rows } = placeTiles(['small', 'wide', 'small'], 4)

    expect(placements[1]).toEqual({ column: 0, row: 1, columns: 4, rows: 2 })
    // The small tile after it goes back to the hole beside the first.
    expect(placements[2]).toMatchObject({ column: 1, row: 0 })
    expect(rows).toBe(3)
  })

  it('puts a wide tile beside others on a tablet', () => {
    const { placements } = placeTiles(['wide', 'medium'], 6)

    expect(placements[1]).toMatchObject({ column: 4, row: 0 })
  })

  it('holds a tile wider than the grid to the grid', () => {
    const { placements } = placeTiles(['wide'], 2)

    expect(placements[0]).toEqual({ column: 0, row: 0, columns: 2, rows: 2 })
  })

  it.each([0, -3, Number.NaN])('treats %s columns as one', columns => {
    const { placements, rows } = placeTiles(['small', 'small'], columns)

    expect(placements.map(({ column, row }) => [column, row])).toEqual([
      [0, 0],
      [0, 1],
    ])
    expect(rows).toBe(2)
  })

  it('has no rows when it has no tiles', () => {
    expect(placeTiles([], 4)).toEqual({ placements: [], rows: 0 })
  })
})

describe('cellSide', () => {
  it('shares the width left by the gaps', () => {
    expect(cellSide(296, 4, 8)).toBe(68)
  })

  it('is never negative', () => {
    expect(cellSide(10, 4, 8)).toBe(0)
  })
})

describe('tileFrame', () => {
  it('covers its cells and the gaps between them', () => {
    const at = { column: 2, row: 1, columns: 2, rows: 2 }

    expect(tileFrame(at, 68, 8)).toEqual({
      start: 152,
      top: 76,
      width: 144,
      height: 144,
    })
  })
})

describe('gridHeight', () => {
  it('counts the gaps between rows, not after the last', () => {
    expect(gridHeight(3, 68, 8)).toBe(220)
  })

  it('is nothing for an empty grid', () => {
    expect(gridHeight(0, 68, 8)).toBe(0)
  })
})
