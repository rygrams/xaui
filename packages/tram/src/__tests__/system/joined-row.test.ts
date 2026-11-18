import { describe, expect, it } from 'vitest'
import { joinWithBars, spansAcross } from '../../system/joined-row'

const bar = (index: number) => `|${index}`

describe('joinWithBars', () => {
  it('lays one bar between every two items', () => {
    expect(joinWithBars(['a', 'b', 'c'], bar)).toEqual(['a', '|0', 'b', '|1', 'c'])
  })

  it('lays none before the first item or after the last', () => {
    expect(joinWithBars(['a', 'b'], bar)).toEqual(['a', '|0', 'b'])
  })

  it('lays none around a single item, and nothing in an empty row', () => {
    expect(joinWithBars(['a'], bar)).toEqual(['a'])
    expect(joinWithBars([], bar)).toEqual([])
  })
})

describe('spansAcross', () => {
  it('is false for a row that says nothing about its width', () => {
    expect(spansAcross(undefined)).toBe(false)
    expect(spansAcross({})).toBe(false)
    expect(spansAcross({ alignSelf: 'flex-start', marginTop: 8 })).toBe(false)
    expect(spansAcross({ flex: 0 })).toBe(false)
  })

  it('is true for a stretched, sized or flexed row', () => {
    expect(spansAcross({ alignSelf: 'stretch' })).toBe(true)
    expect(spansAcross({ width: '100%' })).toBe(true)
    expect(spansAcross({ width: 320 })).toBe(true)
    expect(spansAcross({ minWidth: 200 })).toBe(true)
    expect(spansAcross({ flex: 1 })).toBe(true)
    expect(spansAcross({ flexGrow: 1 })).toBe(true)
  })
})
