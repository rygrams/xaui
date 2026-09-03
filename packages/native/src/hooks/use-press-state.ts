import { useCallback, useRef, useState } from 'react'
import type { GestureResponderEvent } from 'react-native'

/**
 * `null` as much as `undefined`: that is how `PressableProps` types its handlers, and a
 * root forwarding what it was given should not have to launder them first.
 */
export type PressHandlers = {
  onPressIn?: PressHandler | null
  onPressOut?: PressHandler | null
}

type PressHandler = (event: GestureResponderEvent) => void

/**
 * The press state a root owns, with the handlers that maintain it.
 *
 * It exists because every pressable component needs the same three things and gets one
 * of them wrong on its own: the state has to be *up here* — the recipe resolves on it
 * (R5) — the caller's handlers must be **composed, never replaced**, and the returned
 * handlers must keep their identity so passing them down does not defeat a memo.
 *
 * ```tsx
 * const [isPressed, pressHandlers] = usePressState(props)
 * const styles = recipe.resolve({ theme, selection, states: { pressed: isPressed } })
 * <PressableFeedback isPressed={isPressed} {...pressHandlers} />
 * ```
 */
export function usePressState(
  handlers: PressHandlers = {}
): [boolean, { onPressIn: PressHandler; onPressOut: PressHandler }] {
  const [isPressed, setIsPressed] = useState(false)

  // Read through a ref so the handlers below never change identity, even when the caller
  // passes a fresh arrow function on every render — which it always does.
  const latest = useRef(handlers)
  latest.current = handlers

  const onPressIn = useCallback((event: GestureResponderEvent) => {
    setIsPressed(true)
    latest.current.onPressIn?.(event)
  }, [])

  const onPressOut = useCallback((event: GestureResponderEvent) => {
    setIsPressed(false)
    latest.current.onPressOut?.(event)
  }, [])

  const press = useRef({ onPressIn, onPressOut }).current

  return [isPressed, press]
}
