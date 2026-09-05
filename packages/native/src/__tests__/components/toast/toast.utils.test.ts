import { describe, expect, it } from 'vitest'
import { toastStackStyle } from '../../../components/toast/toast.utils'

describe('toastStackStyle', () => {
  it('leaves the front card untouched', () => {
    expect(toastStackStyle(0, 'bottom', 3)).toEqual({
      translateY: 0,
      scale: 1,
      opacity: 1,
    })
  })

  it('peeks 10 points and shrinks 3% per step, HeroUI’s values', () => {
    expect(toastStackStyle(1, 'top', 3)).toMatchObject({
      translateY: 10,
      scale: 0.97,
    })
    expect(toastStackStyle(2, 'top', 3)).toMatchObject({
      translateY: 20,
      scale: 0.94,
    })
  })

  it('peeks away from its edge, so a bottom stack goes up', () => {
    expect(toastStackStyle(1, 'bottom', 3).translateY).toBe(-10)
    expect(toastStackStyle(1, 'top', 3).translateY).toBe(10)
  })

  it('keeps going past the last visible card rather than piling on it', () => {
    // HeroUI clamps only the front side of the interpolation. Two cards at the same depth
    // would read as one, which is the bug this asserts against.
    expect(toastStackStyle(4, 'top', 3).translateY).toBe(40)
    expect(toastStackStyle(3, 'top', 3).translateY).not.toBe(
      toastStackStyle(4, 'top', 3).translateY
    )
  })

  it('hides a card once it is maxVisible deep, and not before', () => {
    expect(toastStackStyle(2, 'top', 3).opacity).toBe(1)
    expect(toastStackStyle(3, 'top', 3).opacity).toBe(0)
    expect(toastStackStyle(1, 'top', 1).opacity).toBe(0)
  })

  it('never mirrors a card, however deep the stack', () => {
    expect(toastStackStyle(100, 'top', 3).scale).toBe(0)
  })
})
