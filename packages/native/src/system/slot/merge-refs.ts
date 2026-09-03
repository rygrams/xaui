import type { MutableRefObject, RefCallback } from 'react'
import type { PossibleRef } from './slot.type'

/**
 * One callback that feeds several refs — what lets a root keep its own handle on a node
 * while still honouring the ref its caller passed (R9), and what `asChild` needs to
 * forward a ref into the child it merges into (R12).
 *
 * It returns nothing on purpose. React 19 reads a ref callback's return value as a
 * cleanup function while React 18 ignores it, and this package supports both; letting
 * a merged cleanup through would behave differently on each. React calls every ref with
 * `null` on unmount anyway, which this forwards.
 */
export function mergeRefs<T>(...refs: Array<PossibleRef<T>>): RefCallback<T> {
  return value => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref) (ref as MutableRefObject<T | null>).current = value
    }
  }
}
