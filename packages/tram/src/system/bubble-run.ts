/**
 * The run of the bubbles across an indeterminate bar — where each one is at a given
 * moment, kept apart from the views that draw them. `bubbleAt` is a worklet: it is read
 * on every frame, on the UI thread.
 *
 * A bubble's place is the distance of its **leading edge** from the start of the bar. It
 * waits one diameter before the start and ends at the far end, hidden by the bar's clip
 * both times.
 */

/** How the bubbles run: `motion-tokens`' `bubbles`. */
export type BubblePace = {
  count: number
  /** Milliseconds between two bubbles setting off. */
  stagger: number
  /** Points left between two bubbles at their closest. */
  gap: number
  /** Milliseconds the bar stays empty between two runs. */
  rest: number
  /** Where the pace changes, as fractions of the bar. */
  stops: readonly number[]
  /** The speed of each stretch, as a multiple of the slowest. One more than `stops`. */
  pace: readonly number[]
}

/** One bubble's run, measured: where the pace changes, and when it gets there. */
export type BubbleRun = {
  /** Points from the start of the bar, one per change of pace. */
  marks: number[]
  /** Milliseconds since the bubble set off, one per mark. */
  times: number[]
  /** Milliseconds from one run of the five to the next. */
  cycle: number
  stagger: number
}

/**
 * The run on a bar `width` points long, for bubbles `diameter` across.
 *
 * The slowest stretch is paced so that a bubble covers its diameter and the gap in one
 * stagger: the bubble behind is then exactly that far back, and never nearer, since every
 * other stretch is faster. A bar with no length yet has a run that goes nowhere.
 */
export function bubbleRun(
  width: number,
  diameter: number,
  pace: BubblePace
): BubbleRun {
  const slowest = (diameter + pace.gap) / pace.stagger
  const length = Math.max(width, 0)
  const marks = [-diameter, ...pace.stops.map(stop => stop * length), length]

  const times = [0]
  for (let index = 1; index < marks.length; index += 1) {
    const stretch = marks[index]! - marks[index - 1]!
    times.push(times[index - 1]! + stretch / (pace.pace[index - 1]! * slowest))
  }

  const last = times[times.length - 1]!

  return {
    marks,
    times,
    cycle: last + pace.rest + (pace.count - 1) * pace.stagger,
    stagger: pace.stagger,
  }
}

/**
 * Where the bubble `index` is, `elapsed` milliseconds into the cycle. The first sets off
 * at once and each one after it a stagger later; before its turn a bubble waits before
 * the start, and once across it stays past the end until the cycle starts again.
 */
export function bubbleAt(run: BubbleRun, elapsed: number, index: number): number {
  'worklet'
  const { marks, times } = run
  const since = elapsed - index * run.stagger
  const last = marks.length - 1

  if (since <= 0) return marks[0]!
  if (since >= times[last]!) return marks[last]!

  let stretch = 1
  while (times[stretch]! < since) stretch += 1

  const from = times[stretch - 1]!
  const share = (since - from) / (times[stretch]! - from)

  return marks[stretch - 1]! + share * (marks[stretch]! - marks[stretch - 1]!)
}

/**
 * Where the bubble `index` stands when nothing moves: the five in a row in the middle of
 * the bar, the gap between them — what reduced motion shows in place of the run.
 */
export function bubbleAtRest(
  width: number,
  diameter: number,
  index: number,
  pace: BubblePace
): number {
  const pitch = diameter + pace.gap
  const row = pace.count * pitch - pace.gap

  return (width - row) / 2 + index * pitch
}
