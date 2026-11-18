/** One stop of a row the arrow keys go along — a tab, a button of a group — as they meet it. */
export type RovingStop = { value: string; isDisabled: boolean }

/**
 * The stop an arrow key goes to: the next one that is not disabled, `step` at a time,
 * going round at either end. `current` itself when it is the only one left, and
 * `undefined` when no stop can be reached at all.
 *
 * The `Tabs` go along their row this way, and the buttons of a `ToggleButton.Group`.
 */
export function nextStop(
  stops: readonly RovingStop[],
  current: string | undefined,
  step: 1 | -1
): string | undefined {
  const count = stops.length
  const from = stops.findIndex(stop => stop.value === current)
  // From outside the row, the first step lands on its first stop — or its last, going back.
  const origin = from < 0 && step === 1 ? -1 : from < 0 ? count : from

  for (let turn = 1; turn <= count; turn++) {
    const stop = stops[(((origin + turn * step) % count) + count) % count]
    if (stop && !stop.isDisabled) return stop.value
  }

  return undefined
}
