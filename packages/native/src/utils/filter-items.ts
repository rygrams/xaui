import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { readItemLabel } from './item-labels'

/**
 * Diacritics folded and case dropped, so a search for `geneve` finds `Genève`.
 *
 * The combining marks are stripped by their code range rather than by a `\p{Diacritic}`
 * escape: the range is plain ES5 and works on every engine this library runs on, where
 * unicode property escapes are a Hermes version away from not.
 */
function fold(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

/**
 * Whether a row survives what has been typed.
 *
 * `includes` rather than `startsWith`: a long list is searched by whichever word someone
 * remembers as often as by the one that happens to come first, and a prefix match on
 * "New York" refuses "york".
 *
 * An empty query keeps everything, which is what makes the field's resting state the whole
 * list rather than none of it.
 */
export function matchesQuery(label: string, query: string): boolean {
  const needle = fold(query.trim())

  return needle === '' || fold(label).includes(needle)
}

/**
 * The children with the rows that do not survive the query dropped, and a count of the ones
 * that did.
 *
 * **Direct children only.** `collectItemLabels` walks the whole tree because reading a label
 * changes nothing, where dropping a row nested inside a caller's own component would mean
 * rebuilding that component's children for it — and a filter that silently rewrote a
 * caller's tree is worse than one that leaves it alone. A row wrapped in something of your
 * own is a row the search will not hide.
 *
 * The count is what tells the content whether to show its empty state, and it counts **rows**
 * rather than children: a label or a separator surviving is not a result.
 *
 * Shared by the `Autocomplete` and the `Combobox` — the same panel filtered by the same
 * query, typed into two different fields. §2 bis: promotion at the second use, beside
 * `collectItemLabels`, which was promoted for the same pair one component earlier.
 */
export function filterItems(
  children: ReactNode,
  query: string,
  isItem: (type: unknown) => boolean
): { children: ReactNode[]; matched: number } {
  const kept: ReactNode[] = []
  let matched = 0

  Children.forEach(children, child => {
    if (!isValidElement(child) || !isItem(child.type)) {
      kept.push(child)
      return
    }

    const label = readItemLabel(
      child.props as { label?: string; children?: ReactNode }
    )

    // A row with nothing to read by cannot be searched, so it stays: hiding it would make
    // a custom row disappear the moment anyone typed.
    if (label !== undefined && !matchesQuery(label, query)) return

    matched += 1
    kept.push(child)
  })

  return { children: kept, matched }
}
