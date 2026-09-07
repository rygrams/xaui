import { describe, expect, it } from 'vitest'
import {
  isEveryKeySelected,
  isSomeKeySelected,
  nextSort,
  toggleEveryKey,
  toggleKey,
} from '../../utils/selection'

const ROWS = ['a', 'b', 'c']

describe('toggleKey', () => {
  it('adds and removes on multiple', () => {
    expect(toggleKey([], 'a', 'multiple')).toEqual(['a'])
    expect(toggleKey(['a', 'b'], 'a', 'multiple')).toEqual(['b'])
  })

  it('replaces on single', () => {
    expect(toggleKey(['a'], 'b', 'single')).toEqual(['b'])
  })

  it('clears the chosen row on single, so there is a way back to none', () => {
    expect(toggleKey(['a'], 'a', 'single')).toEqual([])
  })

  it('is inert on none, so a caller need not branch before calling', () => {
    const keys = ['a']
    expect(toggleKey(keys, 'b', 'none')).toBe(keys)
  })

  it('keeps the order rows were chosen in', () => {
    expect(toggleKey(['b'], 'a', 'multiple')).toEqual(['b', 'a'])
  })
})

describe('isEveryKeySelected', () => {
  it('is true when every row is chosen', () => {
    expect(isEveryKeySelected(ROWS, ROWS)).toBe(true)
    expect(isEveryKeySelected(['a', 'b'], ROWS)).toBe(false)
  })

  it('does not count a disabled row', () => {
    // A table with one disabled row would otherwise show a box that can never be filled.
    expect(isEveryKeySelected(['a', 'b'], ROWS, ['c'])).toBe(true)
  })

  it('is false for a table with nothing selectable in it', () => {
    // An empty tick is a lie about a table with no rows.
    expect(isEveryKeySelected([], [])).toBe(false)
    expect(isEveryKeySelected([], ROWS, ROWS)).toBe(false)
  })
})

describe('isSomeKeySelected', () => {
  it('is the third state a header box has to show', () => {
    expect(isSomeKeySelected(['a'], ROWS)).toBe(true)
    expect(isSomeKeySelected([], ROWS)).toBe(false)
    expect(isSomeKeySelected(ROWS, ROWS)).toBe(false)
  })
})

describe('toggleEveryKey', () => {
  it('fills from empty and from half, in the table’s own order', () => {
    // Not "what was already chosen, then the rest": a filled box means every row, and the
    // order the caller reads back should be the order they are on screen.
    expect(toggleEveryKey([], ROWS)).toEqual(ROWS)
    expect(toggleEveryKey(['b'], ROWS)).toEqual(ROWS)
  })

  it('clears from full', () => {
    expect(toggleEveryKey(ROWS, ROWS)).toEqual([])
  })

  it('leaves a disabled row alone', () => {
    expect(toggleEveryKey([], ROWS, ['c'])).toEqual(['a', 'b'])
  })

  it('keeps a choice made outside this table', () => {
    // One page of a filtered list must not clear what was chosen on another.
    expect(toggleEveryKey(['z'], ROWS)).toEqual(['z', 'a', 'b', 'c'])
    expect(toggleEveryKey(['z', ...ROWS], ROWS)).toEqual(['z'])
  })
})

describe('nextSort', () => {
  it('starts a new column ascending', () => {
    expect(nextSort(undefined, 'name')).toEqual({
      column: 'name',
      direction: 'ascending',
    })
    expect(nextSort({ column: 'role', direction: 'descending' }, 'name')).toEqual({
      column: 'name',
      direction: 'ascending',
    })
  })

  it('turns the same column round', () => {
    expect(nextSort({ column: 'name', direction: 'ascending' }, 'name')).toEqual({
      column: 'name',
      direction: 'descending',
    })
  })

  it('clears on the third press, so there is a way back to the table’s own order', () => {
    expect(
      nextSort({ column: 'name', direction: 'descending' }, 'name')
    ).toBeUndefined()
  })
})
