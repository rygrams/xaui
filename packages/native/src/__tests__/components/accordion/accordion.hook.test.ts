import { describe, expect, it } from 'vitest'
import { nextValue } from '../../../components/accordion/accordion.hook'

describe('nextValue — single', () => {
  it('opens the pressed row', () => {
    expect(nextValue('', 'a', 'single', true)).toBe('a')
  })

  it('closes the open row when it is pressed again', () => {
    expect(nextValue('a', 'a', 'single', true)).toBe('')
  })

  it('swaps rather than adding — one row at a time', () => {
    expect(nextValue('a', 'b', 'single', true)).toBe('b')
  })

  it('refuses to close the only open row when it is not collapsible', () => {
    // Returned unchanged, which is how the caller's onValueChange is not fired for a
    // change that did not happen.
    expect(nextValue('a', 'a', 'single', false)).toBe('a')
  })

  it('still swaps when it is not collapsible', () => {
    expect(nextValue('a', 'b', 'single', false)).toBe('b')
  })
})

describe('nextValue — multiple', () => {
  it('adds to the end, so the order is the order they were opened', () => {
    expect(nextValue(['a'], 'b', 'multiple', true)).toEqual(['a', 'b'])
  })

  it('removes one and leaves the rest', () => {
    expect(nextValue(['a', 'b', 'c'], 'b', 'multiple', true)).toEqual(['a', 'c'])
  })

  it('opens the first one from empty', () => {
    expect(nextValue([], 'a', 'multiple', true)).toEqual(['a'])
  })

  it('closes the last open row when it is collapsible', () => {
    expect(nextValue(['a'], 'a', 'multiple', true)).toEqual([])
  })

  it('refuses to close the last open row when it is not', () => {
    const current = ['a']
    expect(nextValue(current, 'a', 'multiple', false)).toBe(current)
  })

  it('still closes one of several when it is not collapsible', () => {
    expect(nextValue(['a', 'b'], 'a', 'multiple', false)).toEqual(['b'])
  })

  it('takes a string as the one open row — a mode changed at runtime', () => {
    expect(nextValue('a', 'b', 'multiple', true)).toEqual(['a', 'b'])
  })

  it('reads an empty string as nothing open, not as a row named ""', () => {
    expect(nextValue('', 'a', 'multiple', true)).toEqual(['a'])
  })
})
