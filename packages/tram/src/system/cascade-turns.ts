import { cascade } from '../motion/motion-tokens'

/** The order in which what arrives in a cascade is handed its turn. */
export type CascadeTurns = {
  /**
   * The turn of the row named `key`: 0 for the first one asked, one more for each new
   * name after it, and `cascade.most` past that — nobody waits for the bottom of a long
   * list. A name already asked keeps the turn it was given.
   */
  turnOf: (key: string) => number
}

/**
 * Turns in the order they are asked for. What arrives asks as it renders, and React
 * renders a tree from top to bottom, so a group's headers, rows and footers take their
 * turns in the order they are read — through every section, with nothing walked.
 *
 * A name keeps its turn because a render can be run twice for the same row (React's
 * strict mode does): the second run must not push everything after it one turn back.
 */
export function createCascadeTurns(): CascadeTurns {
  const turns = new Map<string, number>()

  return {
    turnOf(key) {
      const known = turns.get(key)
      if (known !== undefined) return known

      const turn = Math.min(turns.size, cascade.most)
      turns.set(key, turn)

      return turn
    },
  }
}
