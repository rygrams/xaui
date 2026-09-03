import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { childrenToString } from '../../../system/slot/children-to-string'

const element = createElement('span', null, 'icon')

describe('childrenToString', () => {
  it('stringifies a mixed array, which is the case R3 exists for', () => {
    // `<Button>{count} items</Button>` hands children as `[3, ' items']`. Inspecting the
    // first child would have called this an element and passed it through unwrapped.
    expect(childrenToString([3, ' items'])).toBe('3 items')
  })

  it('takes a plain string or number', () => {
    expect(childrenToString('Save')).toBe('Save')
    expect(childrenToString(0)).toBe('0')
  })

  it('flattens nested arrays', () => {
    expect(childrenToString(['a', ['b', ['c', 1]]])).toBe('abc1')
  })

  it('drops what React renders as nothing', () => {
    expect(childrenToString(['Save', null, undefined, false])).toBe('Save')
  })

  it('returns null as soon as the tree holds an element', () => {
    expect(childrenToString(element)).toBeNull()
    expect(childrenToString(['Save', element])).toBeNull()
    expect(childrenToString([element, 'Save'])).toBeNull()
    expect(childrenToString(['a', ['b', element]])).toBeNull()
  })

  it('returns null for an empty result, so no root wraps an empty text node', () => {
    expect(childrenToString(null)).toBeNull()
    expect(childrenToString(false)).toBeNull()
    expect(childrenToString('')).toBeNull()
    expect(childrenToString([null, undefined])).toBeNull()
  })
})
