import { describe, expect, it } from 'vitest'
import {
  EMPTY_RANGE,
  isInRange,
  isSameRange,
  nextRange,
  rangePosition,
} from '../../utils/date-range'

const day = (n: number) => new Date(2026, 8, n)
const RANGE = { start: day(10), end: day(14) }

describe('nextRange', () => {
  it('starts a range from nothing', () => {
    const next = nextRange(EMPTY_RANGE, day(10))

    expect(next.start?.getDate()).toBe(10)
    expect(next.end).toBeNull()
  })

  it('closes a half range on a later day', () => {
    const next = nextRange({ start: day(10), end: null }, day(14))

    expect(next.start?.getDate()).toBe(10)
    expect(next.end?.getDate()).toBe(14)
  })

  it('restarts rather than making a backwards range', () => {
    // A backwards range is not a range, and silently swapping the two would move a bound
    // the reader did not touch.
    const next = nextRange({ start: day(14), end: null }, day(10))

    expect(next.start?.getDate()).toBe(10)
    expect(next.end).toBeNull()
  })

  it('starts a new range when both ends are already set', () => {
    // Asking a reader to clear first is asking them to find a control that should not exist.
    const next = nextRange(RANGE, day(20))

    expect(next.start?.getDate()).toBe(20)
    expect(next.end).toBeNull()
  })

  it('allows a one-day range', () => {
    // A one-night stay and a one-day event are real.
    const next = nextRange({ start: day(10), end: null }, day(10))

    expect(next.start?.getDate()).toBe(10)
    expect(next.end?.getDate()).toBe(10)
  })

  it('takes both ends to midnight', () => {
    // A range whose ends carry the moment they were pressed compares unequal to the same
    // two days written by the caller.
    const next = nextRange(EMPTY_RANGE, new Date(2026, 8, 10, 17, 42, 9))

    expect(next.start?.getHours()).toBe(0)
    expect(next.start?.getMinutes()).toBe(0)
  })
})

describe('isInRange', () => {
  it('includes both ends', () => {
    expect(isInRange(day(10), RANGE)).toBe(true)
    expect(isInRange(day(12), RANGE)).toBe(true)
    expect(isInRange(day(14), RANGE)).toBe(true)
  })

  it('excludes what is outside', () => {
    expect(isInRange(day(9), RANGE)).toBe(false)
    expect(isInRange(day(15), RANGE)).toBe(false)
  })

  it('is only the start for a half range', () => {
    const half = { start: day(10), end: null }

    expect(isInRange(day(10), half)).toBe(true)
    expect(isInRange(day(11), half)).toBe(false)
  })

  it('is nothing at all with no start', () => {
    expect(isInRange(day(10), EMPTY_RANGE)).toBe(false)
  })

  it('ignores the time of day', () => {
    expect(isInRange(new Date(2026, 8, 14, 23, 59), RANGE)).toBe(true)
  })
})

describe('rangePosition', () => {
  it('names the two ends and the middle', () => {
    expect(rangePosition(day(10), RANGE)).toBe('start')
    expect(rangePosition(day(12), RANGE)).toBe('middle')
    expect(rangePosition(day(14), RANGE)).toBe('end')
    expect(rangePosition(day(20), RANGE)).toBe('none')
  })

  it('calls a one-day range single, not both ends at once', () => {
    // A cell told it is both would have to decide which half of its own shape to draw.
    expect(rangePosition(day(10), { start: day(10), end: day(10) })).toBe('single')
  })

  it('calls a half range’s start single too, because it has no other end yet', () => {
    expect(rangePosition(day(10), { start: day(10), end: null })).toBe('single')
  })
})

describe('isSameRange', () => {
  it('compares both ends, absent or not', () => {
    expect(isSameRange(RANGE, { start: day(10), end: day(14) })).toBe(true)
    expect(isSameRange(RANGE, { start: day(10), end: null })).toBe(false)
    expect(isSameRange(EMPTY_RANGE, EMPTY_RANGE)).toBe(true)
  })

  it('ignores the time of day', () => {
    expect(
      isSameRange(RANGE, {
        start: new Date(2026, 8, 10, 9),
        end: new Date(2026, 8, 14, 21),
      })
    ).toBe(true)
  })
})
