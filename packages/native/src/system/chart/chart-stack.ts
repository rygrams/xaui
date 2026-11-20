/** A row of a chart's data, as the caller wrote it: keys to readings. */
type StackRow = Record<string, unknown>

/** The prefix a stacked series' running total is written under in the copied rows. */
const STACK_PREFIX = 'xauiStack:'

/** The key a stacked series is drawn under — the original, plus the ones below it. */
export function stackKeys(keys: ReadonlyArray<string>): string[] {
  return keys.map(key => `${STACK_PREFIX}${key}`)
}

/**
 * Each row with a running total per series added to it, so the plot's domain reaches the
 * top of the stack: a stack whose top leaves the axis is a stack drawn outside its own
 * chart.
 *
 * A copy, always: the rows are the caller's and are never written to. The prefix is what
 * keeps a totalled column from colliding with one of their own, and a reading that is not
 * a number adds nothing.
 */
export function stackRows(
  data: ReadonlyArray<StackRow>,
  keys: ReadonlyArray<string>
): StackRow[] {
  return data.map(row => {
    const next: StackRow = { ...row }
    let total = 0

    for (const key of keys) {
      const value = Number(row[key])
      total += Number.isFinite(value) ? value : 0
      next[`${STACK_PREFIX}${key}`] = total
    }

    return next
  })
}
