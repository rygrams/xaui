/** Where a block joins the breath, and the leg it runs before breathing on its own. */
export type PulseStart = {
  /** The opacity it is drawn at on mount. */
  from: number
  /** The end of the leg it is on — `1` or `low`. */
  to: number
  /** Milliseconds left in that leg. */
  ms: number
  /** The other end, which the repeat then breathes toward and back from. */
  next: number
}

/**
 * Where on the shared clock a block mounted at `now` picks the breath up, so that every
 * block on the screen — a row mounted later included — goes down and up together. The
 * clock is a cycle of `2 × duration`: down from 1 to `low` in the first half, back up in
 * the second.
 *
 * The opacity it starts at is the leg's straight-line point, not the curve's: the
 * difference lasts one leg and is a few hundredths of an opacity.
 */
export function pulseStart(now: number, duration: number, low: number): PulseStart {
  const cycle = duration * 2
  const at = ((now % cycle) + cycle) % cycle
  const depth = 1 - low

  if (at < duration) {
    return { from: 1 - depth * (at / duration), to: low, ms: duration - at, next: 1 }
  }

  return {
    from: low + depth * ((at - duration) / duration),
    to: 1,
    ms: cycle - at,
    next: low,
  }
}
