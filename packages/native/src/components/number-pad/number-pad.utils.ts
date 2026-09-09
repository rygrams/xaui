/**
 * The three digit rows, top to bottom, then `0` on the bottom one.
 *
 * Data rather than markup, and that is the whole reason this component renders its own
 * grid instead of asking to be composed: `1` through `9` are not a decision a caller
 * makes, and eleven hand-written cells is a layout that silently disagrees with itself
 * the moment one of them is edited.
 */
export const NUMBER_PAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
] as const

/** The key on the bottom row, between the free cell and the backspace. */
export const NUMBER_PAD_ZERO = '0'

export type AppendOptions = {
  value: string
  /** What the pressed key inserts. A digit, but a decimal separator is a key too. */
  insert: string
  /** Unset means unbounded — a pad in front of an amount rather than a PIN. */
  maxLength?: number
}

/**
 * The value after a key press.
 *
 * It **clamps rather than truncates**: a press past `maxLength` returns the value
 * unchanged, so the caller's `onChangeText` does not fire and a full PIN cannot be
 * completed twice by leaning on a key.
 *
 * The insert is measured whole rather than as one character, because a key may carry more
 * than one — a `00` key on a currency pad is a key, and a pad that let it land halfway
 * over the limit would produce a value one character longer than it promised.
 */
export function appendKey({ value, insert, maxLength }: AppendOptions): string {
  if (maxLength === undefined) return value + insert
  if (value.length + insert.length > maxLength) return value
  return value + insert
}

/** The value after a backspace. Empty stays empty rather than becoming `undefined`. */
export function removeLast(value: string): string {
  return value.slice(0, -1)
}

/** Whether the value has reached the length the pad was given. */
export function isComplete(value: string, maxLength?: number): boolean {
  return maxLength !== undefined && value.length >= maxLength
}
