import type { SegmentRect } from './segment.type'

/**
 * Whether an option draws the hairline at its own leading edge.
 *
 * The rule between two options belongs to the one on its trailing side, which is what lets
 * an option decide alone: the root has no way to know which of its children is which
 * without reading their props, and reading a child's props is introspection this library
 * does not do. Every option already publishes its rectangle for the pill to slide to, and
 * an ordering is all this needs.
 *
 * Three cases draw nothing. The **first** option has no neighbour to be separated from. The
 * **chosen** one is wearing the pill, and a rule running into a raised surface reads as a
 * crack in it. And the option **after** the chosen one is on the pill's other edge, for the
 * same reason — the behaviour iOS has had since the segmented control was introduced, and
 * the reason one does not look like a table.
 *
 * Before the first layout `rects` is empty and nothing is drawn, so the rules arrive with
 * the pill rather than flashing a frame ahead of it.
 */
export function hasLeadingSeparator(
  rects: Readonly<Record<string, SegmentRect>>,
  value: string,
  selected: string | undefined
): boolean {
  const self = rects[value]

  if (self === undefined || value === selected) return false

  let previous: string | undefined
  let previousX = -Infinity

  for (const [key, rect] of Object.entries(rects)) {
    if (rect.x < self.x && rect.x > previousX) {
      previous = key
      previousX = rect.x
    }
  }

  return previous !== undefined && previous !== selected
}
