import { useEffect, useRef } from 'react'

/**
 * The value from the render before this one, `undefined` on the first.
 *
 * Written in an effect rather than during render on purpose: reading it mid-render would
 * make "previous" mean something different depending on whether React re-ran the render,
 * which under StrictMode it does.
 */
export function usePrevious<T>(value: T): T | undefined {
  const previous = useRef<T | undefined>(undefined)

  useEffect(() => {
    previous.current = value
  }, [value])

  return previous.current
}
