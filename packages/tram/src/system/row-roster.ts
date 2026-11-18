/** A row as the list draws it: its key, what it shows, and whether it is on its way out. */
export type RosterRow<T> = { key: string; node: T; isLeaving: boolean }

/** A row as the caller gives it. */
export type RosterEntry<T> = { key: string; node: T }

/**
 * The rows a list draws once its children change: every row it is given, in the given
 * order, and every row it drew that has gone missing, kept where it was and marked as
 * leaving — so it can close in place before it is let go. A leaving row keeps the last
 * thing it showed; a row that comes back before it is gone stays.
 *
 * A row the caller moved is drawn where it is now. A leaving row follows the row it was
 * drawn after.
 */
export function rosterAfter<T>(
  shown: readonly RosterRow<T>[],
  next: readonly RosterEntry<T>[]
): RosterRow<T>[] {
  const given = new Set(next.map(entry => entry.key))
  const leaving = new Map<string, RosterRow<T>[]>()
  let before: string | null = null

  for (const row of shown) {
    if (given.has(row.key)) {
      before = row.key
      continue
    }

    const after = leaving.get(before ?? HEAD) ?? []
    after.push({ key: row.key, node: row.node, isLeaving: true })
    leaving.set(before ?? HEAD, after)
  }

  const drawn: RosterRow<T>[] = [...(leaving.get(HEAD) ?? [])]

  for (const entry of next) {
    drawn.push({ key: entry.key, node: entry.node, isLeaving: false })
    drawn.push(...(leaving.get(entry.key) ?? []))
  }

  return drawn
}

/** Where a row that led the list goes: before every other one. */
const HEAD = '\u0000head'
