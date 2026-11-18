import { describe, expect, it } from 'vitest'
import { toastSwipe } from '../../motion/motion-tokens'
import { shouldDismiss, swipeAxis, swipeTravel } from '../../system/swipe'

describe('swipeAxis', () => {
  it('is undecided while the finger is within the slop', () => {
    expect(swipeAxis({ x: 0, y: 0 }, 10)).toBeNull()
    expect(swipeAxis({ x: 9, y: -9 }, 10)).toBeNull()
  })

  it('takes the axis of the larger travel, whichever way it goes', () => {
    expect(swipeAxis({ x: 12, y: 3 }, 10)).toBe('x')
    expect(swipeAxis({ x: -12, y: 3 }, 10)).toBe('x')
    expect(swipeAxis({ x: 2, y: -14 }, 10)).toBe('y')
    expect(swipeAxis({ x: 2, y: 14 }, 10)).toBe('y')
  })

  it('reads a diagonal as across', () => {
    expect(swipeAxis({ x: 10, y: 10 }, 10)).toBe('x')
  })
})

describe('swipeTravel', () => {
  it('follows the finger toward the way out', () => {
    expect(swipeTravel(37)).toBe(37)
  })

  it('does not move the other way', () => {
    expect(swipeTravel(-37)).toBe(0)
    expect(swipeTravel(0)).toBe(0)
  })
})

describe('shouldDismiss', () => {
  it('sends away what was pushed far enough, however slowly', () => {
    expect(shouldDismiss({ distance: 51, velocity: 0 }, toastSwipe)).toBe(true)
  })

  it('sends away what was flicked, however short', () => {
    expect(shouldDismiss({ distance: 12, velocity: 501 }, toastSwipe)).toBe(true)
  })

  it('keeps what was let go before either threshold', () => {
    expect(shouldDismiss({ distance: 50, velocity: 500 }, toastSwipe)).toBe(false)
    expect(shouldDismiss({ distance: 20, velocity: 100 }, toastSwipe)).toBe(false)
  })

  it('keeps what went the wrong way, at any speed', () => {
    expect(shouldDismiss({ distance: -80, velocity: 900 }, toastSwipe)).toBe(false)
    expect(shouldDismiss({ distance: 0, velocity: 900 }, toastSwipe)).toBe(false)
  })
})
