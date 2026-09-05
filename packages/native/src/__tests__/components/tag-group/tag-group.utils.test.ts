import { describe, expect, it } from 'vitest'
import { nextSelection } from '../../../components/tag-group/tag-group.utils'

describe('nextSelection — none', () => {
  it('refuses every press, and says so by returning what it was given', () => {
    // The same reference, which is how the caller's onSelectionChange never fires for a
    // change that did not happen.
    const current = ['a']
    expect(nextSelection(current, 'b', 'none', true)).toBe(current)
  })
})

describe('nextSelection — single', () => {
  it('replaces rather than adding', () => {
    expect(nextSelection(['a'], 'b', 'single', true)).toEqual(['b'])
  })

  it('clears when the selected one is pressed again', () => {
    expect(nextSelection(['a'], 'a', 'single', true)).toEqual([])
  })

  it('refuses to clear when it is not deselectable', () => {
    const current = ['a']
    expect(nextSelection(current, 'a', 'single', false)).toBe(current)
  })

  it('still replaces when it is not deselectable', () => {
    expect(nextSelection(['a'], 'b', 'single', false)).toEqual(['b'])
  })
})

describe('nextSelection — multiple', () => {
  it('adds to the end, so the order is the order they were pressed', () => {
    expect(nextSelection(['a'], 'b', 'multiple', true)).toEqual(['a', 'b'])
  })

  it('removes one and leaves the rest', () => {
    expect(nextSelection(['a', 'b', 'c'], 'b', 'multiple', true)).toEqual(['a', 'c'])
  })

  it('clears the last one when it is deselectable', () => {
    expect(nextSelection(['a'], 'a', 'multiple', true)).toEqual([])
  })

  it('refuses to clear the last one when it is not', () => {
    const current = ['a']
    expect(nextSelection(current, 'a', 'multiple', false)).toBe(current)
  })

  it('still removes one of several when it is not deselectable', () => {
    expect(nextSelection(['a', 'b'], 'a', 'multiple', false)).toEqual(['b'])
  })
})
