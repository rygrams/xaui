import { useCallback, useMemo, useRef, useState } from 'react'

type ControlledState<T> = {
  value: T | undefined
  defaultValue: T | undefined
  onChange: ((value: T) => void) | undefined
}

/**
 * One value, owned by the caller or by us. The caller decides by passing `value` at all —
 * checked once on the first render and then held, because a component that silently
 * changes hands mid-life produces a bug nobody can read from the call site.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControlledState<T>): [T | undefined, (next: T) => void] {
  const isControlled = useRef(value !== undefined).current
  const [uncontrolled, setUncontrolled] = useState(defaultValue)

  const set = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [isControlled ? value : uncontrolled, set]
}

/**
 * What the trigger shows once a value is chosen, without the caller repeating it.
 *
 * Items register their label as they mount, so `Select.Value` can name a selection made
 * before the list was ever opened. The store is a ref rather than state: a registration
 * that re-rendered the list would re-render it once per row on the first open.
 */
export function useLabelRegistry() {
  const labels = useRef(new Map<string, string>())
  const [, force] = useState(0)

  const registerLabel = useCallback((value: string, label: string) => {
    if (labels.current.get(value) === label) return
    labels.current.set(value, label)
    // One render after the batch of registrations, and only when something actually
    // changed — the trigger has to repaint once the label it was missing arrives.
    force(n => n + 1)
  }, [])

  const labelFor = useCallback((value: string) => labels.current.get(value), [])

  return useMemo(() => ({ labelFor, registerLabel }), [labelFor, registerLabel])
}
