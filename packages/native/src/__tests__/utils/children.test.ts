import { createElement } from 'react'
import type { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import { containsElementOfType } from '../../utils/children'

function Marker() {
  return null
}

function Other() {
  return null
}

describe('containsElementOfType', () => {
  it('finds a direct child of that type', () => {
    expect(containsElementOfType(createElement(Marker), Marker)).toBe(true)
  })

  it('finds one among several', () => {
    const children: ReactNode = [
      createElement(Other, { key: 'a' }),
      createElement(Marker, { key: 'b' }),
    ]

    expect(containsElementOfType(children, Marker)).toBe(true)
  })

  it('does not find one of a different type', () => {
    expect(containsElementOfType(createElement(Other), Marker)).toBe(false)
  })

  it('looks no deeper than the direct children', () => {
    // A spinner buried inside a wrapper is not the composition the auto-insert is about,
    // and a deep walk would make the answer depend on how many layers deep it sits.
    const wrapped = createElement(Other, null, createElement(Marker))

    expect(containsElementOfType(wrapped, Marker)).toBe(false)
  })

  it('survives text, nothing and a fragment of nothing', () => {
    expect(containsElementOfType('Envoi…', Marker)).toBe(false)
    expect(containsElementOfType(null, Marker)).toBe(false)
    expect(containsElementOfType(undefined, Marker)).toBe(false)
    expect(containsElementOfType([null, false, 'x'], Marker)).toBe(false)
  })
})
