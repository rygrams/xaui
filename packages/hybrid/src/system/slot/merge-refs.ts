import type { MutableRefObject, RefCallback } from 'react'
import type { PossibleRef } from './slot.type'

export function mergeRefs<Element>(
  ...refs: Array<PossibleRef<Element>>
): RefCallback<Element> {
  return value => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(value)
      else if (ref) (ref as MutableRefObject<Element | null>).current = value
    }
  }
}
