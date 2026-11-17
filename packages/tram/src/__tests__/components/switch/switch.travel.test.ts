import { describe, expect, it } from 'vitest'
import {
  dragProgress,
  fillWidth,
  isOnAt,
  thumbOffset,
  travelOf,
} from '../../../components/switch/switch.travel'

/** The design's `md`: a 56 track, a 16 thumb, the fill 4 in from the edge. */
const md = { width: 56, inset: 4, thumbWidth: 16 }

describe('travelOf', () => {
  it('is the track less the thumb', () => {
    expect(travelOf(md)).toBe(40)
  })

  it('is never negative when the thumb is wider than the track', () => {
    expect(travelOf({ width: 10, inset: 0, thumbWidth: 16 })).toBe(0)
  })
})

describe('thumbOffset', () => {
  it('runs from the start to the track less the thumb', () => {
    expect(thumbOffset(0, md)).toBe(0)
    expect(thumbOffset(0.5, md)).toBe(20)
    expect(thumbOffset(1, md)).toBe(40)
  })

  it('stops at the ends when the spring overshoots', () => {
    expect(thumbOffset(1.16, md)).toBe(40)
    expect(thumbOffset(-0.16, md)).toBe(0)
  })
})

describe('fillWidth', () => {
  it('ends at the middle of the thumb', () => {
    // On: the thumb is at 40, its middle at 48, and the fill starts at 4.
    expect(fillWidth(1, md)).toBe(44)
    expect(fillWidth(0.5, md)).toBe(24)
  })

  it('is a sliver under the thumb at rest', () => {
    const width = fillWidth(0, md)

    expect(width).toBe(4)
    expect(md.inset + width).toBeLessThanOrEqual(md.thumbWidth)
  })

  it('is never negative', () => {
    expect(fillWidth(0, { width: 40, inset: 12, thumbWidth: 12 })).toBe(0)
  })
})

describe('dragProgress', () => {
  it('follows the finger from where the thumb was picked up', () => {
    expect(dragProgress(0, 10, md)).toBe(0.25)
    expect(dragProgress(1, -30, md)).toBe(0.25)
  })

  it('stops at both ends', () => {
    expect(dragProgress(0, 400, md)).toBe(1)
    expect(dragProgress(1, -400, md)).toBe(0)
  })

  it('stays put on a track with no travel', () => {
    expect(dragProgress(1, 30, { width: 16, inset: 0, thumbWidth: 16 })).toBe(1)
  })
})

describe('isOnAt', () => {
  it('turns on past the half, and only past it', () => {
    expect(isOnAt(0.51)).toBe(true)
    expect(isOnAt(0.5)).toBe(false)
    expect(isOnAt(0.49)).toBe(false)
  })
})
