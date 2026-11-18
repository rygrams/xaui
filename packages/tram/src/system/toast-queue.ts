/** What the queue needs of an entry: a name, and whether it is on its way out. */
export type Queued = { id: string; isLeaving: boolean }

/** A new entry at the end of the queue — the newest is last. */
export function enqueue<Entry extends Queued>(
  queue: readonly Entry[],
  entry: Entry
): readonly Entry[] {
  return [...queue, entry]
}

/**
 * Marks one entry as leaving. It stays in the queue while its way out plays. The same
 * queue is handed back when there is nothing to mark, so a second dismissal of the same
 * toast renders nothing.
 */
export function startLeaving<Entry extends Queued>(
  queue: readonly Entry[],
  id: string
): readonly Entry[] {
  if (!queue.some(entry => entry.id === id && !entry.isLeaving)) return queue

  return queue.map(entry =>
    entry.id === id ? { ...entry, isLeaving: true } : entry
  )
}

/** Marks every entry as leaving. */
export function startLeavingAll<Entry extends Queued>(
  queue: readonly Entry[]
): readonly Entry[] {
  if (queue.every(entry => entry.isLeaving)) return queue

  return queue.map(entry =>
    entry.isLeaving ? entry : { ...entry, isLeaving: true }
  )
}

/** Drops an entry whose way out has ended. */
export function remove<Entry extends Queued>(
  queue: readonly Entry[],
  id: string
): readonly Entry[] {
  if (!queue.some(entry => entry.id === id)) return queue

  return queue.filter(entry => entry.id !== id)
}
