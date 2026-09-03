import { useMemo } from 'react'
import type { RefCallback } from 'react'
import { mergeRefs } from '../system/slot/merge-refs'
import type { PossibleRef } from '../system/slot/slot.type'

/**
 * `mergeRefs` for a component that renders: memoized on the refs it was given, so React
 * does not detach and reattach every one of them on each render — which it does whenever
 * a ref callback changes identity, and which costs a node measurement every time.
 */
export function useMergedRef<T>(...refs: Array<PossibleRef<T>>): RefCallback<T> {
  return useMemo(() => mergeRefs(...refs), refs)
}
