import { describe, expect, it } from 'vitest'
import { floatPlace, floatTravel } from '../../system/float-place'

describe('floatPlace', () => {
  it('stays in the flow, hugging its content, with no placement', () => {
    expect(floatPlace(undefined, 16)).toEqual({ alignSelf: 'flex-start' })
  })

  it('pins the start and the end with start and end, the offset in from both edges', () => {
    expect(floatPlace('bottom-start', 16)).toEqual({
      position: 'absolute',
      bottom: 16,
      start: 16,
    })
    expect(floatPlace('bottom-end', 24)).toEqual({
      position: 'absolute',
      bottom: 24,
      end: 24,
    })
  })

  it('centres the box itself, the offset in from the bottom only', () => {
    expect(floatPlace('bottom-center', 16)).toEqual({
      position: 'absolute',
      bottom: 16,
      alignSelf: 'center',
    })
  })

  it('never writes left or right', () => {
    for (const placement of ['bottom-start', 'bottom-center', 'bottom-end'] as const) {
      const place = floatPlace(placement, 16)

      expect(place).not.toHaveProperty('left')
      expect(place).not.toHaveProperty('right')
    }
  })
})

describe('floatTravel', () => {
  it('goes past the edge it is pinned from: its height and the offset', () => {
    expect(floatTravel('bottom-end', 16, 56)).toBe(72)
    expect(floatTravel('bottom-center', 0, 64)).toBe(64)
  })

  it('travels its own height in the flow, where there is no edge', () => {
    expect(floatTravel(undefined, 16, 56)).toBe(56)
  })

  it('does not shorten the way for a negative offset', () => {
    expect(floatTravel('bottom-start', -8, 48)).toBe(48)
  })
})
