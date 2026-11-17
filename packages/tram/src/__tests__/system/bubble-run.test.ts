import { describe, expect, it } from 'vitest'
import { bubbles } from '../../motion/motion-tokens'
import { bubbleAt, bubbleRun, bubblesAtRest } from '../../system/bubble-run'

const WIDTH = 320
const DIAMETER = 6
const run = bubbleRun(WIDTH, DIAMETER, bubbles)
const crossing = run.times[run.times.length - 1]!

describe('bubbleRun', () => {
  it('starts one diameter before the bar and ends at its far end', () => {
    expect(run.marks[0]).toBe(-DIAMETER)
    expect(run.marks[run.marks.length - 1]).toBe(WIDTH)
  })

  it('changes pace at each stop, and has one time per mark', () => {
    expect(run.marks).toHaveLength(bubbles.stops.length + 2)
    expect(run.times).toHaveLength(run.marks.length)
    expect(run.marks[1]).toBe(0.2 * WIDTH)
  })

  it('only ever goes forward', () => {
    for (let index = 1; index < run.times.length; index += 1) {
      expect(run.times[index]!).toBeGreaterThan(run.times[index - 1]!)
      expect(run.marks[index]!).toBeGreaterThan(run.marks[index - 1]!)
    }
  })

  it('covers a diameter and the gap in one stagger, at its slowest', () => {
    const middle = bubbles.pace.indexOf(1)
    const stretch = run.marks[middle + 1]! - run.marks[middle]!
    const duration = run.times[middle + 1]! - run.times[middle]!

    expect((stretch / duration) * bubbles.stagger).toBeCloseTo(
      DIAMETER + bubbles.gap
    )
  })

  it('lasts the crossing of the last bubble, and the rest', () => {
    const lastSetsOff = (bubbles.count - 1) * bubbles.stagger

    expect(run.cycle).toBeCloseTo(crossing + lastSetsOff + bubbles.rest)
  })

  it('goes nowhere on a bar with no length yet', () => {
    const still = bubbleRun(0, DIAMETER, bubbles)

    expect(still.marks[still.marks.length - 1]).toBe(0)
    expect(Number.isFinite(still.cycle)).toBe(true)
    expect(bubbleAt(still, still.cycle / 2, 0)).toBeLessThanOrEqual(0)
  })
})

describe('bubbleAt', () => {
  it('waits before the start until its turn', () => {
    expect(bubbleAt(run, 0, 0)).toBe(-DIAMETER)
    expect(bubbleAt(run, bubbles.stagger, 1)).toBe(-DIAMETER)
    expect(bubbleAt(run, 2 * bubbles.stagger - 1, 2)).toBe(-DIAMETER)
  })

  it("is on a mark at that mark's time", () => {
    run.times.forEach((time, index) => {
      expect(bubbleAt(run, time, 0)).toBeCloseTo(run.marks[index]!)
    })
  })

  it('stays past the end once across', () => {
    expect(bubbleAt(run, crossing, 0)).toBe(WIDTH)
    expect(bubbleAt(run, run.cycle, 0)).toBe(WIDTH)
  })

  it('sets each bubble off one stagger after the one ahead', () => {
    const elapsed = crossing / 2

    expect(bubbleAt(run, elapsed + bubbles.stagger, 1)).toBeCloseTo(
      bubbleAt(run, elapsed, 0)
    )
  })

  it('never lets two bubbles on the bar overlap', () => {
    const pitch = DIAMETER + bubbles.gap

    for (let elapsed = 0; elapsed <= run.cycle; elapsed += 4) {
      for (let index = 1; index < bubbles.count; index += 1) {
        const isRunning =
          elapsed > index * bubbles.stagger &&
          elapsed < crossing + (index - 1) * bubbles.stagger
        if (!isRunning) continue

        const ahead = bubbleAt(run, elapsed, index - 1)
        const behind = bubbleAt(run, elapsed, index)

        expect(ahead - behind).toBeGreaterThanOrEqual(pitch - 1e-6)
      }
    }
  })

  it('closes up to the gap, in the middle', () => {
    const middle = bubbles.pace.indexOf(1)
    const elapsed = run.times[middle]! + bubbles.stagger * 1.5

    expect(bubbleAt(run, elapsed, 0) - bubbleAt(run, elapsed, 1)).toBeCloseTo(
      DIAMETER + bubbles.gap
    )
  })
})

describe('bubblesAtRest', () => {
  const places = bubblesAtRest(WIDTH, DIAMETER, bubbles)

  it('gives one place per bubble', () => {
    expect(places).toHaveLength(bubbles.count)
  })

  it('stands them in a row, the gap between them', () => {
    expect(places[1]! - places[0]!).toBe(DIAMETER + bubbles.gap)
    expect(places[4]! - places[3]!).toBe(DIAMETER + bubbles.gap)
  })

  it('centres the row on the bar', () => {
    const afterLast = WIDTH - (places[places.length - 1]! + DIAMETER)

    expect(places[0]).toBeCloseTo(afterLast)
  })
})
