import { describe, expect, it } from 'vitest'
import { orbitAtRest, orbitRun } from '../../../components/spinner/spinner.orbit'
import { orbit } from '../../../motion/motion-tokens'
import { bubbleAt } from '../../../system/bubble-run'

const RUN = orbitRun(orbit)
const END = RUN.times[RUN.times.length - 1]!
const LAST = orbit.count - 1

/** Where the dot `index` is on the clock face, in degrees from the top. */
const at = (elapsed: number, index: number) => bubbleAt(RUN, elapsed, index) % 360

describe('orbitRun', () => {
  it('reaches each mark at the sum of the stretches before it', () => {
    expect(RUN.times).toEqual([0, 310, 600, 1145, 1435, 1745])
    expect(RUN.marks).toEqual([...orbit.marks])
  })

  it('runs a whole turn, from six o’clock back to six o’clock', () => {
    expect(orbit.marks.at(-1)! - orbit.marks[0]!).toBe(360)
    expect(at(0, 0)).toBe(180)
    expect(at(END, 0)).toBe(180)
  })

  it('makes room for every dot and the rest in one cycle', () => {
    expect(RUN.cycle).toBe(END + orbit.rest + LAST * orbit.stagger)
  })
})

describe('the five on the ring', () => {
  it('are piled into one dot at six o’clock when the cycle starts and ends', () => {
    for (let index = 0; index < orbit.count; index += 1) {
      expect(at(0, index)).toBe(180)
      expect(at(RUN.cycle, index)).toBe(180)
    }
  })

  it('stay piled for the rest, after the last one is home', () => {
    const home = END + LAST * orbit.stagger
    for (let index = 0; index < orbit.count; index += 1) {
      expect(at(home + orbit.rest / 2, index)).toBe(180)
    }
  })

  it('are drawn apart over the top and close in again at six', () => {
    const spacing = (elapsed: number) =>
      bubbleAt(RUN, elapsed, 0) - bubbleAt(RUN, elapsed, 1)

    // The leader over the top, then the leader home with the next one braking behind it.
    const overTheTop = RUN.times[2]! + orbit.stagger
    const intoSix = END + orbit.stagger / 2

    expect(spacing(overTheTop)).toBeGreaterThan(spacing(intoSix) * 2)
  })

  it('never let one dot pass the one ahead of it', () => {
    for (let elapsed = 0; elapsed <= RUN.cycle; elapsed += 10) {
      for (let index = 1; index < orbit.count; index += 1) {
        expect(bubbleAt(RUN, elapsed, index - 1)).toBeGreaterThanOrEqual(
          bubbleAt(RUN, elapsed, index)
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
