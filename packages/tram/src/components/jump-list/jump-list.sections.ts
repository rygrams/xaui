import { cascade, duration } from '../../motion/motion-tokens'
import { tramTileColumns } from '../../theme/tram-tokens'

/** One group of the list: its key, what its header says, and its rows. */
export type JumpListSection<ItemT> = {
  key: string
  /** What the header and the key say. @default the key */
  title?: string
  data: readonly ItemT[]
}

/** How the keys are laid out once the list is opened. */
export type JumpListLayout = 'grid' | 'list'

/** The Metro grid of a list sorted by name: `#` for whatever is not a letter, then a–z. */
export const JUMP_LIST_ALPHABET: readonly string[] = [
  '#',
  ...'abcdefghijklmnopqrstuvwxyz',
]

/** The key a row goes under when its initial is none of the others. */
export const OTHER_KEY = '#'

export type GroupOptions = {
  /** The keys, in order — one section each, empty or not. @default JUMP_LIST_ALPHABET */
  keys?: readonly string[]
  /** How names are lower-cased and sorted. @default the device's */
  locale?: string
}

/** The accents a decomposed letter carries after it: `é` is `e` and U+0301. */
const COMBINING_MARKS = /[̀-ͯ]/g

/**
 * A name's initial, the way a reader files it: accents dropped, lower case — `Élodie`
 * under `e`, `İbrahim` under `i`. The first code point, so a letter outside the basic
 * plane is not cut in half.
 */
export function initialOf(name: string, locale?: string): string {
  const folded = name.trim().normalize('NFD').replace(COMBINING_MARKS, '')
  const [first = ''] = Array.from(folded)

  return first.toLocaleLowerCase(locale)
}

/**
 * Rows grouped under the key of their initial, sorted by name within a group: a
 * `JumpList`'s `sections`. A row whose initial is no key goes under `#`, which is added
 * first when the keys do not have it. Every key gets its section, an empty one included:
 * the list draws no header for it, and its key in the grid is grey.
 *
 * ```ts
 * groupByInitial(contacts, contact => contact.name, { locale: 'fr' })
 * // [{ key: '#', data: [4 Saisons] }, { key: 'a', data: [Aïcha, Amélie] }, …]
 * ```
 */
export function groupByInitial<ItemT>(
  items: readonly ItemT[],
  nameOf: (item: ItemT) => string,
  { keys = JUMP_LIST_ALPHABET, locale }: GroupOptions = {}
): JumpListSection<ItemT>[] {
  const order = keys.includes(OTHER_KEY) ? keys : [OTHER_KEY, ...keys]
  const groups = new Map<string, ItemT[]>(order.map(key => [key, []]))
  const keyOfInitial = new Map(order.map(key => [initialOf(key, locale), key]))

  for (const item of items) {
    const key = keyOfInitial.get(initialOf(nameOf(item), locale)) ?? OTHER_KEY
    groups.get(key)?.push(item)
  }

  const byName = (a: ItemT, b: ItemT) => nameOf(a).localeCompare(nameOf(b), locale)

  // `#` is only added for what it holds: keys the caller listed are all kept.
  return order
    .filter(key => key !== OTHER_KEY || keys.includes(key) || hasRows(groups, key))
    .map(key => ({ key, data: (groups.get(key) ?? []).sort(byName) }))
}

function hasRows<ItemT>(groups: Map<string, ItemT[]>, key: string): boolean {
  return (groups.get(key)?.length ?? 0) > 0
}

/**
 * The layout the keys call for: a grid of squares when every key is one character — an
 * alphabet — and a column of bars otherwise — dates, categories.
 */
export function jumpLayoutFor(keys: readonly string[]): JumpListLayout {
  return keys.every(key => Array.from(key).length === 1) ? 'grid' : 'list'
}

/** How many keys across: four squares — the start screen's columns — or one bar. */
export function columnsFor(layout: JumpListLayout): number {
  return layout === 'grid' ? tramTileColumns.phone : 1
}

/**
 * The keys in rows of `columns`, the last one filled out with `null` so its squares are
 * as wide as the others.
 */
export function rowsOf(
  keys: readonly string[],
  columns: number
): Array<Array<string | null>> {
  const across = Math.max(1, Math.floor(columns))
  const rows: Array<Array<string | null>> = []

  for (let start = 0; start < keys.length; start += across) {
    const row: Array<string | null> = keys.slice(start, start + across)
    while (row.length < across) row.push(null)
    rows.push(row)
  }

  return rows
}

/**
 * A key's turn as the grid arrives: its row, top to bottom — a row arrives together —
 * and the rows past `cascade.most` together after them.
 */
export function arrivalRank(index: number, columns: number): number {
  return Math.min(Math.floor(index / Math.max(1, columns)), cascade.most)
}

export type Leaving = {
  columns: number
  /** How many keys there are. */
  count: number
  /** The index of the key that was pressed, or -1 for a grid closed without a choice. */
  picked: number
}

/**
 * A key's turn as the grid leaves: row after row, as it arrived, and the key that was
 * pressed after every other — the last one seen is the one chosen.
 */
export function leavingRank(
  index: number,
  { columns, count, picked }: Leaving
): number {
  const last = arrivalRank(Math.max(0, count - 1), columns)

  return index === picked ? last + 1 : arrivalRank(index, columns)
}

/** Milliseconds from the first key turning away to the last one gone. */
export function leavingTime(leaving: Leaving): number {
  const ranks = Array.from({ length: leaving.count }, (_, index) =>
    leavingRank(index, leaving)
  )
  const last = Math.max(0, ...ranks)

  return last * cascade.stagger + duration.turnstile
}
