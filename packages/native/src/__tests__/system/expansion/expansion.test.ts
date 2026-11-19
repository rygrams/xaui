import { describe, expect, it } from 'vitest'
import { isExpandedIn, nextExpansion } from '../../../system/expansion'

describe('nextExpansion — single', () => {
  it('opens the pressed row', () => {
    expect(nextExpansion('', 'a', 'single', true)).toBe('a')
  })

  it('closes the open row when it is pressed again', () => {
    expect(nextExpansion('a', 'a', 'single', true)).toBe('')
  })

  it('swaps rather than adding — one row at a time', () => {
    expect(nextExpansion('a', 'b', 'single', true)).toBe('b')
  })

  it('refuses to close the only open row when it is not collapsible', () => {
    // Returned unchanged, which is how the caller's onValueChange is not fired for a
    // change that did not happen.
    expect(nextExpansion('a', 'a', 'single', false)).toBe('a')
  })

  it('still swaps when it is not collapsible', () => {
    expect(nextExpansion('a', 'b', 'single', false)).toBe('b')
  })
})

describe('nextExpansion — multiple', () => {
  it('adds to the end, so the order is the order they were opened', () => {
    expect(nextExpansion(['a'], 'b', 'multiple', true)).toEqual(['a', 'b'])
  })

  it('removes one and leaves the rest', () => {
    expect(nextExpansion(['a', 'b', 'c'], 'b', 'multiple', true)).toEqual(['a', 'c'])
  })

  it('opens the first one from empty', () => {
    expect(nextExpansion([], 'a', 'multiple', true)).toEqual(['a'])
  })

  it('closes the last open row when it is collapsible', () => {
    expect(nextExpansion(['a'], 'a', 'multiple', true)).toEqual([])
  })

  it('refuses to close the last open row when it is not', () => {
    const current = ['a']
    expect(nextExpansion(current, 'a', 'multiple', false)).toBe(current)
  })

  it('still closes one of several when it is not collapsible', () => {
    expect(nextExpansion(['a', 'b'], 'a', 'multiple', false)).toEqual(['b'])
  })

  it('takes a string as the one open row — a mode changed at runtime', () => {
    expect(nextExpansion('a', 'b', 'multiple', true)).toEqual(['a', 'b'])
  })

  it('reads an empty string as nothing open, not as a row named ""', () => {
    expect(nextExpansion('', 'a', 'multiple', true)).toEqual(['a'])
  })
})

describe('isExpandedIn', () => {
  it('reads both shapes', () => {
    expect(isExpandedIn('a', 'a')).toBe(true)
    expect(isExpandedIn('a', 'b')).toBe(false)
    expect(isExpandedIn(['a', 'b'], 'b')).toBe(true)
    expect(isExpandedIn([], 'b')).toBe(false)
  })
})
