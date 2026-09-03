import { createContext, useContext } from 'react'
import type { Provider } from 'react'

type CaptureStackTrace = {
  captureStackTrace?: (
    target: object,
    constructor?: (...args: never[]) => unknown
  ) => void
}

/**
 * A context a slot cannot read by accident. Every compound gets one, and it carries
 * **resolved** values — style references the root already computed, not tokens for the
 * slot to resolve again (R5).
 *
 * ```ts
 * const [ButtonProvider, useButton] = createSlotContext<ButtonContext>('Button')
 * ```
 *
 * The tuple is what lets each compound name its own hook, which R10 requires it to
 * export. `name` gives both halves of the error, so there is one place to spell it.
 */
export function createSlotContext<T>(
  name: string
): readonly [Provider<T | null>, () => T] {
  const Context = createContext<T | null>(null)
  Context.displayName = `XAUI.${name}.Context`

  function useSlotContext(): T {
    const value = useContext(Context)

    if (value === null) {
      const error = new Error(
        `XAUI: use${name} must be called inside <${name}>. A slot reads the values its ` +
          'root resolved, so it can only be rendered as a child of one.'
      )
      // Points the trace at the offending call site instead of at this file — the
      // reader needs to know which component was misplaced, not how the hook works.
      ;(Error as unknown as CaptureStackTrace).captureStackTrace?.(
        error,
        useSlotContext
      )
      throw error
    }

    return value
  }

  return [Context.Provider, useSlotContext] as const
}
