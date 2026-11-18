import type { ViewStyle } from 'react-native'

/**
 * Lays a bar between every two items, and nowhere else — not before the first, not
 * after the last. `bar` is called with the bar's own index, 0 for the one after the
 * first item, so that each can be keyed.
 *
 * It is how a `ToggleButton.Group` draws one box: the group holds the frame, and its
 * buttons, which have no line of their own, are parted by the bars it lays here.
 */
export function joinWithBars<T>(
  items: readonly T[],
  bar: (index: number) => T
): T[] {
  return items.flatMap((item, index) =>
    index === 0 ? [item] : [bar(index - 1), item]
  )
}

/**
 * Whether a row's own style makes it wider than what it holds — stretched across its
 * parent, given a width, or flexed — so that its cells share the width in equal parts.
 * A row that says none of these takes the width of its content.
 *
 * Read off the style rather than measured: a cell flexed from nothing inside a row sized
 * by its content would widen the row to everything it is allowed.
 */
export function spansAcross(style: ViewStyle | undefined): boolean {
  if (!style) return false

  return (
    style.alignSelf === 'stretch' ||
    style.width !== undefined ||
    style.minWidth !== undefined ||
    (style.flex ?? 0) > 0 ||
    (style.flexGrow ?? 0) > 0
  )
}
