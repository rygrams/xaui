import { describe, expect, it } from 'vitest'
import { swipeOffset, swipeRest } from '../../../components/list/list.swipe'
import { rowSwipe } from '../../../motion/motion-tokens'

const SPAN = 144

describe('swipeOffset', () => {
  it('follows the finger toward the start, left to right', () => {
    expect(swipeOffset(0, -60, SPAN, -1)).toBe(-60)
  })

  it('never goes past closed the other way', () => {
    expect(swipeOffset(0, 40, SPAN, -1)).toBe(0)
    expect(swipeOffset(-SPAN, SPAN + 30, SPAN, -1)).toBe(0)
  })

  it('goes on from where an open row was picked up', () => {
    expect(swipeOffset(-SPAN, 50, SPAN, -1)).toBe(-(SPAN - 50))
  })

  it('follows a third as fast past the whole of its actions', () => {
    expect(swipeOffset(0, -(SPAN + 30), SPAN, -1)).toBe(
      -(SPAN + 30 / rowSwipe.rubber)
    )
  })

  it('is mirrored in RTL', () => {
    expect(swipeOffset(0, 60, SPAN, 1)).toBe(60)
    expect(swipeOffset(0, -60, SPAN, 1)).toBe(0)
  })
})

describe('swipeRest', () => {
  it('opens past half of the actions, and closes short of it', () => {
    expect(swipeRest(-80, 0, SPAN, -1)).toBe(-SPAN)
    expect(swipeRest(-60, 0, SPAN, -1)).toBe(0)
  })

  it('lets a fling decide, either way', () => {
    expect(swipeRest(-20, -(rowSwipe.velocity + 1), SPAN, -1)).toBe(-SPAN)
    expect(swipeRest(-130, rowSwipe.velocity + 1, SPAN, -1)).toBe(0)
  })

  it('stays closed while the actions are not measured', () => {
    expect(swipeRest(-80, -2000, 0, -1)).toBe(0)
  })

  it('is mirrored in RTL', () => {
    expect(swipeRest(80, 0, SPAN, 1)).toBe(SPAN)
    expect(swipeRest(20, 600, SPAN, 1)).toBe(SPAN)
  })
})
