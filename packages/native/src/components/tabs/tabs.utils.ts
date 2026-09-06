import type { TabRect } from './tabs.type'

/**
 * Whether a tab draws the hairline at its own leading edge.
 *
 * The rule between two segments belongs to the one on its trailing side, which is what
 * lets a trigger decide alone: the list has no way to know which of its children is which
 * without reading their props, and reading a child's props is the introspection this
 * library does not do. Every trigger already publishes its rectangle for the indicator to
 * slide to, and an ordering is all this needs.
 *
 * Three cases draw nothing. The **first** tab has no neighbour to be separated from. The
 * **selected** tab is wearing the pill, and a rule running into a raised surface reads as
 * a crack in it. And the tab **after** the selected one is on the pill's other edge, for
 * the same reason — which is the behaviour iOS has had since the segmented control was
 * introduced, and the reason a segmented control does not look like a table.
 *
 * Before the first layout `rects` is empty and nothing is drawn, so the rules arrive with
 * the pill rather than flashing a frame ahead of it.
 */
export function hasLeadingSeparator(
  rects: Readonly<Record<string, TabRect>>,
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
