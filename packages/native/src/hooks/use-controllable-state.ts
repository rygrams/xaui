import { useCallback, useRef, useState } from 'react'
import { warnDev } from '../utils/warn-dev'

export type ControllableStateOptions<T> = {
  /** Present means controlled: the caller owns the value and this never stores one. */
  value?: T
  /** The starting value when uncontrolled. */
  defaultValue: T
  /** Called with every new value, controlled or not. */
  onChange?: (value: T) => void
}

/**
 * One state that works both ways, so a component never has two code paths for "the
 * caller drives this" and "we do".
 *
 * The setter is stable across renders and reads the current value from a ref, so a
 * handler built on it can be passed to a memoized child without rebuilding it on every
 * render — which is the whole reason components reach for this rather than a local
 * `useState` plus an `if`.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): [T, (next: T | ((current: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)

  const isControlled = value !== undefined
  const current = isControlled ? (value as T) : uncontrolled

  useControlWarning(isControlled)

  // The setter must not change identity, so it cannot close over `current`.
  const latest = useRef(current)
  latest.current = current

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const controlled = useRef(isControlled)
  controlled.current = isControlled

  const set = useCallback((next: T | ((currentValue: T) => T)) => {
    const resolved =
      typeof next === 'function' ? (next as (c: T) => T)(latest.current) : next

    if (resolved === latest.current) return

    // Only the uncontrolled half stores anything; a controlled component is told, and
    // decides for itself whether the value actually moves.
    if (!controlled.current) setUncontrolled(resolved)
    onChangeRef.current?.(resolved)
  }, [])

  return [current, set]
}

/**
 * Switching between the two modes mid-life is always a bug — the value silently stops
 * being whatever the component was doing before — and it is invisible without this.
 */
function useControlWarning(isControlled: boolean): void {
  const wasControlled = useRef(isControlled)

  if (wasControlled.current !== isControlled) {
    warnDev(
      `a component switched from ${wasControlled.current ? 'controlled' : 'uncontrolled'} ` +
        `to ${isControlled ? 'controlled' : 'uncontrolled'}. Decide for the life of the ` +
        'component: pass `value` always, or never. Passing `undefined` for a value you ' +
        'do control reads as "uncontrolled" here.'
    )
    wasControlled.current = isControlled
  }
}
