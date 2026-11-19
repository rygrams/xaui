import { describe, expect, it } from 'vitest'
import {
  orbitAngle,
  orbitAtRest,
  orbitRun,
} from '../../../components/spinner/spinner.orbit'
import { orbit } from '../../../motion/motion-tokens'

const RUN = orbitRun(orbit)
const END = RUN.times[RUN.times.length - 1]!
const LAST = orbit.count - 1
const HOUR = 30

/** Where the dot `index` is on the clock face, in degrees from the top. */
const at = (elapsed: number, index: number) => orbitAngle(RUN, elapsed, index) % 360

describe('orbitRun', () => {
  it('reaches each mark at the sum of the stretches before it', () => {
    expect(RUN.times).toEqual([0, 310, 600, 1235, 1525, 1835])
    expect(RUN.marks).toEqual([...orbit.marks])
  })

  it('runs a turn and an hour from one meeting point to the next', () => {
    expect(RUN.travel).toBe(360 + HOUR)
  })

  it('comes back round the clock in twelve laps', () => {
    expect(RUN.laps).toBe(12)
  })

  it('makes room for every dot and the rest in one cycle', () => {
    expect(RUN.cycle).toBe(END + orbit.rest + LAST * orbit.stagger)
  })
})

describe('the five on the ring', () => {
  it('meet an hour further on each lap: six, then seven, then eight', () => {
    for (let lap = 0; lap < 3; lap += 1) {
      for (let index = 0; index < orbit.count; index += 1) {
        expect(at(lap * RUN.cycle, index)).toBe(180 + lap * HOUR)
      }
    }
  })

  it('are back at six once round the clock, so the loop has no seam', () => {
    expect(at(RUN.laps * RUN.cycle, 0)).toBe(180)
  })

  it('never jump: a lap starts where the one before it ended', () => {
    for (let lap = 1; lap < RUN.laps; lap += 1) {
      for (let index = 0; index < orbit.count; index += 1) {
        const before = orbitAngle(RUN, lap * RUN.cycle - 1, index)
        const after = orbitAngle(RUN, lap * RUN.cycle, index)
        expect(after - before).toBeCloseTo(0)
      }
    }
  })

  it('stay piled for the rest, after the last one is home', () => {
    const home = END + LAST * orbit.stagger
    for (let index = 0; index < orbit.count; index += 1) {
      expect(at(home + orbit.rest / 2, index)).toBe(180 + HOUR)
    }
  })

  it('are drawn apart over the top and close in again at the meeting point', () => {
    const spacing = (elapsed: number) =>
      orbitAngle(RUN, elapsed, 0) - orbitAngle(RUN, elapsed, 1)

    const overTheTop = RUN.times[2]! + orbit.stagger
    const intoTheMeeting = END + orbit.stagger / 2

    expect(spacing(overTheTop)).toBeGreaterThan(spacing(intoTheMeeting) * 2)
  })

  it('never let one dot pass the one ahead of it', () => {
    for (let elapsed = 0; elapsed <= 2 * RUN.cycle; elapsed += 10) {
      for (let index = 1; index < orbit.count; index += 1) {
        expect(orbitAngle(RUN, elapsed, index - 1)).toBeGreaterThanOrEqual(
          orbitAngle(RUN, elapsed, index)
        )
      }
    }
  })
})

describe('orbitAtRest', () => {
  it('spreads the dots evenly round the ring, the first at the top', () => {
    expect(orbitAtRest(5)).toEqual([0, 72, 144, 216, 288])
  })
})
