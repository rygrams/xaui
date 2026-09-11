import { mergeRefs } from './merge-refs'
import type { MergeableProps, PossibleRef } from './slot.type'

type Handler = (...args: never[]) => unknown
const EVENT_HANDLER = /^on[A-Z]/

export function mergeProps(
  ours: MergeableProps,
  theirs: MergeableProps
): MergeableProps {
  const merged: MergeableProps = { ...ours }

  for (const key of Object.keys(theirs)) {
    const ourValue = ours[key]
    const theirValue = theirs[key]

    if (EVENT_HANDLER.test(key)) {
      merged[key] = composeHandlers(ourValue, theirValue)
    } else if (key === 'style') {
      merged[key] = [ourValue, theirValue]
    } else if (key === 'className') {
      merged[key] = [ourValue, theirValue].filter(Boolean).join(' ')
    } else if (key === 'ref') {
      merged[key] = mergeRefs(
        ourValue as PossibleRef<unknown>,
        theirValue as PossibleRef<unknown>
      )
    } else {
      merged[key] = theirValue
    }
  }

  return merged
}

function composeHandlers(ours: unknown, theirs: unknown): unknown {
  if (typeof ours !== 'function') return theirs
  if (typeof theirs !== 'function') return ours

  return (...args: never[]) => {
    ;(ours as Handler)(...args)
    return (theirs as Handler)(...args)
  }
}
