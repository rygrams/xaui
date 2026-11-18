import { describe, expect, it } from 'vitest'
import { rosterAfter } from '../../system/row-roster'
import type { RosterRow } from '../../system/row-roster'

function given(...keys: string[]) {
  return keys.map(key => ({ key, node: `${key}-now` }))
}

function staying(...keys: string[]): RosterRow<string>[] {
  return keys.map(key => ({ key, node: `${key}-now`, isLeaving: false }))
}

function shape(rows: RosterRow<string>[]) {
  return rows.map(row => (row.isLeaving ? `-${row.key}` : row.key))
}

describe('rosterAfter', () => {
  it('draws what it is given on a first render', () => {
    expect(rosterAfter([], given('a', 'b'))).toEqual(staying('a', 'b'))
  })

  it('takes the new node of a row that stays', () => {
    const shown = [{ key: 'a', node: 'a-before', isLeaving: false }]

    expect(rosterAfter(shown, given('a'))).toEqual(staying('a'))
  })

  it('keeps a missing row where it was, leaving, with what it showed', () => {
    const shown = [
      { key: 'a', node: 'a-before', isLeaving: false },
      { key: 'b', node: 'b-before', isLeaving: false },
      { key: 'c', node: 'c-before', isLeaving: false },
    ]
    const drawn = rosterAfter(shown, given('a', 'c'))

    expect(shape(drawn)).toEqual(['a', '-b', 'c'])
    expect(drawn[1]?.node).toBe('b-before')
  })

  it('keeps a leading row that leaves at the top', () => {
    expect(shape(rosterAfter(staying('a', 'b'), given('b')))).toEqual(['-a', 'b'])
  })

  it('keeps two rows leaving one after the other in their order', () => {
    const drawn = rosterAfter(staying('a', 'b', 'c', 'd'), given('a', 'd'))

    expect(shape(drawn)).toEqual(['a', '-b', '-c', 'd'])
  })

  it('places a new row where it is given', () => {
    expect(shape(rosterAfter(staying('a', 'c'), given('a', 'b', 'c')))).toEqual([
      'a',
      'b',
      'c',
    ])
  })

  it('brings back a leaving row that is given again', () => {
    const shown = rosterAfter(staying('a', 'b'), given('a'))

    expect(rosterAfter(shown, given('a', 'b'))).toEqual(staying('a', 'b'))
  })

  it('lets a row go once the caller has dropped it from what was shown', () => {
    const shown = rosterAfter(staying('a', 'b'), given('a'))
    const gone = shown.filter(row => row.key !== 'b')

    expect(shape(rosterAfter(gone, given('a')))).toEqual(['a'])
  })
})
