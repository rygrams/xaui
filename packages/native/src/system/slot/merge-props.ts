import type { PressableStateCallbackType, StyleProp } from 'react-native'
import { mergeRefs } from './merge-refs'
import type { MergeableProps, PossibleRef } from './slot.type'

type Handler = (...args: never[]) => unknown
type Style =
  | StyleProp<unknown>
  | ((state: PressableStateCallbackType) => StyleProp<unknown>)

const EVENT_HANDLER = /^on[A-Z]/

/**
 * Merges a root's own props into the child it renders through `asChild` (R12). Four
 * rules, and the child wins wherever they do not apply — it is the more specific intent:
 *
 * - **Event handlers compose.** Both run, ours first: the component's own behaviour (the
 *   press state that drives its styles) happens before the child's side effect (the
 *   navigation). Replacing one with the other is the bug this exists to prevent.
 * - **Styles stack**, ours under the child's, so the child can override.
 * - **`ref`s merge** through `mergeRefs`. React 19 passes `ref` as an ordinary prop, so
 *   it arrives here rather than beside the props, and dropping it would sever the root's
 *   handle on the node.
 * - **Everything else: the child's value wins**, and ours fills in what it left unset.
 */
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
      merged[key] = mergeStyles(ourValue as Style, theirValue as Style)
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

/**
 * `Pressable` accepts `style` as a function of its press state (R9), so a merge has to
 * survive either side being one — flattening it to an array would silently drop the
 * pressed and focused styles of whichever side was dynamic.
 */
function mergeStyles(ours: Style, theirs: Style): Style {
  if (typeof ours === 'function' || typeof theirs === 'function') {
    return (state: PressableStateCallbackType) => [
      resolveStyle(ours, state),
      resolveStyle(theirs, state),
    ]
  }
  return [ours, theirs]
}

function resolveStyle(style: Style, state: PressableStateCallbackType) {
  return typeof style === 'function' ? style(state) : style
}
