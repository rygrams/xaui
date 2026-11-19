import { bubbleAt } from '../../system/bubble-run'
import type { BubbleRun } from '../../system/bubble-run'

/** How the dots run round the ring: `motion-tokens`' `orbit`. */
export type OrbitPace = {
  count: number
  /** Milliseconds between two dots setting off. */
  stagger: number
  /** Milliseconds the five spend piled on one another before the first sets off again. */
  rest: number
  /**
   * Degrees from the top, clockwise, where the pace changes. The first is where the five
   * meet, the last where they meet next: more than a turn on, by the step the meeting
   * point takes each lap.
   */
  marks: readonly number[]
  /** Milliseconds per stretch between two marks: one fewer than `marks`. */
  stretches: readonly number[]
}

/**
 * One dot's run, measured — a progress bar's bubble counted in degrees rather than points,
 * so `bubbleAt` reads where a dot is in a lap — and how the laps follow one another.
 */
export type OrbitRun = BubbleRun & {
  /** Degrees from one meeting point to the next: a turn and the step. */
  travel: number
  /** Laps until the meeting point is back where it started, and the loop can restart. */
  laps: number
}

function greatestDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestDivisor(b, a % b)
}

export function orbitRun(pace: OrbitPace): OrbitRun {
  const times = [0]
  for (const stretch of pace.stretches) {
    times.push(times[times.length - 1]! + stretch)
  }

  const last = times[times.length - 1]!
  const travel = pace.marks[pace.marks.length - 1]! - pace.marks[0]!
  // The step round the clock, in whole degrees; a step of nothing comes back every lap.
  const step = ((travel % 360) + 360) % 360

  return {
    marks: [...pace.marks],
    times,
    cycle: last + pace.rest + (pace.count - 1) * pace.stagger,
    stagger: pace.stagger,
    travel,
    laps: step === 0 ? 1 : 360 / greatestDivisor(360, step),
  }
}

/**
 * Where the dot `index` is, in degrees from the top, `elapsed` milliseconds after the five
 * first set off. Each lap starts where the last one met: before its turn a dot waits on
 * the meeting point, and after its run it stays on the next one.
 */
export function orbitAngle(run: OrbitRun, elapsed: number, index: number): number {
  'worklet'
  const lap = Math.floor(elapsed / run.cycle)

  return bubbleAt(run, elapsed - lap * run.cycle, index) + lap * run.travel
}

/** Where the dots stand when the ring does not run: evenly round it, the first at the top. */
export function orbitAtRest(count: number): number[] {
  return Array.from({ length: count }, (_, index) => (index * 360) / count)
}
