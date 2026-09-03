import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { containsElementOfType } from '../../../components/button/button.utils'

function Spinner() {
  return null
}

function Label() {
  return null
}

describe('containsElementOfType', () => {
  it('finds the element among several children', () => {
    const children = [
      createElement(Label, { key: 'l' }),
      createElement(Spinner, { key: 's' }),
    ]

    expect(containsElementOfType(children, Spinner)).toBe(true)
  })

  it('finds it when it is the only child, unwrapped by an array', () => {
    expect(containsElementOfType(createElement(Spinner), Spinner)).toBe(true)
  })

  it('does not confuse one component for another', () => {
    expect(containsElementOfType(createElement(Label), Spinner)).toBe(false)
  })

  it('is false for text children — the auto-wrap case', () => {
    expect(containsElementOfType('Envoi…', Spinner)).toBe(false)
    expect(containsElementOfType([3, ' items'], Spinner)).toBe(false)
  })

  it('is false for nothing at all', () => {
    expect(containsElementOfType(null, Spinner)).toBe(false)
    expect(containsElementOfType(undefined, Spinner)).toBe(false)
    expect(containsElementOfType([], Spinner)).toBe(false)
  })

  /**
   * The stated boundary, not an accident: a spinner the caller buried inside a wrapper is
   * not the composition the auto-insert is about, and a deep walk would make "did I
   * compose one?" depend on how many layers deep it sits.
   */
  it('does not look inside a wrapper', () => {
    const wrapped = createElement(Label, null, createElement(Spinner))

    expect(containsElementOfType(wrapped, Spinner)).toBe(false)
  })
})
