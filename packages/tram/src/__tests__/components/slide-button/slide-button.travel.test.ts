import { describe, expect, it } from 'vitest'
import {
  DEFAULT_THRESHOLD,
  dragOffset,
  hasReached,
  thresholdOf,
  trailWidth,
  travelOf,
} from '../../../components/slide-button/slide-button.travel'

/** The drawing's `md`: a 48-wide thumb, 4 in from the line. */
const md = { inset: 4, thumbWidth: 48 }

describe('travelOf', () => {
  it('is the inside of the line less the thumb and an inset at each end', () => {
    expect(travelOf(300, md)).toBe(244)
  })

  it('is nothing before the box is laid out', () => {
    expect(travelOf(0, md)).toBe(0)
  })
})

describe('trailWidth', () => {
  it('reaches the middle of a thumb at rest', () => {
    expect(trailWidth(0, md)).toBe(28)
  })

  it('follows the thumb to the middle of it', () => {
    expect(trailWidth(100, md)).toBe(128)
  })

  it('does not follow a spring past home', () => {
    expect(trailWidth(-6, md)).toBe(28)
  })
})

describe('dragOffset', () => {
  it('adds the drag to where the thumb was picked up', () => {
    expect(dragOffset(20, 30, 244)).toBe(50)
  })

  it('holds the thumb between home and the far end', () => {
    expect(dragOffset(20, -80, 244)).toBe(0)
    expect(dragOffset(200, 80, 244)).toBe(244)
  })

  it('goes nowhere on a box with no travel', () => {
    expect(dragOffset(0, 40, 0)).toBe(0)
  })
})

describe('hasReached', () => {
  it('counts from the threshold on', () => {
    expect(hasReached(219.6, 244, 0.9)).toBe(true)
    expect(hasReached(219, 244, 0.9)).toBe(false)
  })

  it('never counts on a box with no travel', () => {
    expect(hasReached(0, 0, 0)).toBe(false)
  })
})

describe('thresholdOf', () => {
  it("is Native's default when none is given", () => {
    expect(thresholdOf(undefined)).toBe(DEFAULT_THRESHOLD)
    expect(thresholdOf(Number.NaN)).toBe(DEFAULT_THRESHOLD)
  })

  it('is held between 0 and 1', () => {
    expect(thresholdOf(1.5)).toBe(1)
    expect(thresholdOf(-1)).toBe(0)
    expect(thresholdOf(0.75)).toBe(0.75)
  })
})
