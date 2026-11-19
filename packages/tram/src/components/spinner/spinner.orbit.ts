import type { BubbleRun } from '../../system/bubble-run'

/** How the dots run round the ring: `motion-tokens`' `orbit`. */
export type OrbitPace = {
  count: number
  /** Milliseconds between two dots setting off. */
  stagger: number
  /** Milliseconds the five spend piled on one another before the first sets off again. */
  rest: number
  /**
   * Degrees from the top, clockwise, where the pace changes. The first and the last are
   * one turn apart: a dot ends its run where the next one begins.
   */
  marks: readonly number[]
  /** Milliseconds per stretch between two marks: one fewer than `marks`. */
  stretches: readonly number[]
}

/**
 * One dot's run, measured — the same shape as a progress bar's bubble, counted in degrees
 * rather than points, so `bubbleAt` reads where a dot is. Before its turn a dot waits on
 * the first mark and after its run it stays on the last: a turn apart, the same place, so
 * the five pile up there and the loop has no seam.
 */
export function orbitRun(pace: OrbitPace): BubbleRun {
  const times = [0]
  for (const stretch of pace.stretches) {
    times.push(times[times.length - 1]! + stretch)
  }

  const last = times[times.length - 1]!

  return {
    marks: [...pace.marks],
    times,
    cycle: last + pace.rest + (pace.count - 1) * pace.stagger,
    stagger: pace.stagger,
  }
}

/** Where the dots stand when the ring does not run: evenly round it, the first at the top. */
export function orbitAtRest(count: number): number[] {
  return Array.from({ length: count }, (_, index) => (index * 360) / count)
}
