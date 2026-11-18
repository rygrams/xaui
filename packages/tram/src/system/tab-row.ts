/** A tab's place in its row, in points: where it starts, physically, and how wide it is. */
export type TabSpan = { x: number; width: number }

/** Which way a change of tab goes along the row: toward its end, toward its start, nowhere. */
export type TabTravel = -1 | 0 | 1

/** A tab as the keyboard meets it. */
export type TabStop = { value: string; isDisabled: boolean }

/** The row as it is scrolled: its offset, what it shows, and all there is to show. */
export type RowView = {
  offset: number
  width: number
  content: number
  /** How far from the row's start a tab brought into view comes to rest. */
  margin: number
  /** The row runs from the right, as under RTL. */
  isReversed: boolean
}

/**
 * The way from one tab to another, by their order in the row: 1 toward the end, -1 toward
 * the start. 0 when there is no way to speak of — the same tab, the first choice, or a
 * tab the row does not know.
 */
export function tabTravel(
  order: readonly string[],
  from: string | undefined,
  to: string | undefined
): TabTravel {
  if (from === undefined || to === undefined) return 0

  const start = order.indexOf(from)
  const end = order.indexOf(to)

  if (start < 0 || end < 0 || start === end) return 0

  return end > start ? 1 : -1
}

/**
 * Where to scroll the row so that a tab is in view, its start edge on the margin — or
 * `undefined` for a tab that is already entirely visible, which does not move. The answer
 * stays within what the row can scroll.
 */
export function scrollToTab(span: TabSpan, view: RowView): number | undefined {
  const { offset, width, content, margin, isReversed } = view
  const end = span.x + span.width

  if (span.x >= offset && end <= offset + width) return undefined

  const most = Math.max(0, content - width)
  const wanted = isReversed ? end + margin - width : span.x - margin

  return Math.min(Math.max(wanted, 0), most)
}

/**
 * The tab an arrow key goes to: the next one that is not disabled, `step` at a time, going
 * round at either end. `current` itself when it is the only one left, and `undefined`
 * when no tab can be chosen at all.
 */
export function nextTab(
  stops: readonly TabStop[],
  current: string | undefined,
  step: 1 | -1
): string | undefined {
  const count = stops.length
  const from = stops.findIndex(stop => stop.value === current)
  // From outside the row, the first step lands on its first tab — or its last, going back.
  const origin = from < 0 && step === 1 ? -1 : from < 0 ? count : from

  for (let turn = 1; turn <= count; turn++) {
    const stop = stops[(((origin + turn * step) % count) + count) % count]
    if (stop && !stop.isDisabled) return stop.value
  }

  return undefined
}

/**
 * Whether the row runs from the right: its first tab lies past its last. A row of one tab
 * says nothing, and `fallback` — the system's direction — answers for it.
 */
export function isRowReversed(
  spans: readonly TabSpan[],
  fallback: boolean
): boolean {
  const first = spans[0]
  const last = spans[spans.length - 1]

  if (!first || !last || first === last) return fallback

  return first.x > last.x
}

/** How far a span lies from the row's start edge — its far side, in a row that is reversed. */
export function fromStart(span: TabSpan, row: number, isReversed: boolean): number {
  return isReversed ? row - (span.x + span.width) : span.x
}
