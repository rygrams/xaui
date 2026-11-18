/** One toast as the pile sees it, oldest first. */
export type StackItem = {
  /** Its measured height, in points. */
  height: number
  /** On its way out: it no longer holds a rank, and the ones under it close up. */
  isLeaving: boolean
}

/** Where the pile puts one toast. */
export type StackPlace = {
  /** 0 is the newest, against the edge. */
  rank: number
  /** How far from the edge its near side sits, in points. */
  offset: number
}

/**
 * The place of every toast in the pile: the newest against the edge, each earlier one
 * past it by the heights of those in front and `gap` between two.
 *
 * `items` and the result are in arrival order — oldest first — like the queue. A toast
 * that is leaving takes no room, so the ones behind it close up at once; it keeps the
 * place it had with everyone still there, so nothing moves it while it goes — and one
 * that was out of sight stays so.
 */
export function stackPlaces(items: readonly StackItem[], gap: number): StackPlace[] {
  const places: StackPlace[] = new Array(items.length)
  // Where the next one goes: counting only those that stay, and counting everyone.
  const closedUp = { rank: 0, offset: 0 }
  const asItWas = { rank: 0, offset: 0 }

  for (let index = items.length - 1; index >= 0; index -= 1) {
    const { height, isLeaving } = items[index]
    places[index] = isLeaving ? { ...asItWas } : { ...closedUp }

    asItWas.rank += 1
    asItWas.offset += height + gap

    if (!isLeaving) {
      closedUp.rank += 1
      closedUp.offset += height + gap
    }
  }

  return places
}

/** Past `maxVisible` a toast is still in the pile and no longer seen. */
export function isPastVisible(rank: number, maxVisible: number): boolean {
  return rank >= maxVisible
}
