import { createContext, useContext } from 'react'

const InsideTextContext = createContext(false)
InsideTextContext.displayName = 'XAUI.Tram.Typography.Inside'

/**
 * Said by a Tram text node to what it holds: a `Typography` inside it is a fragment of
 * its text. Given by `Typography` itself, and by the slots whose text has its own drawing
 * a fragment must not repaint — a `WheelPicker.Item`'s colour mix.
 */
export const InsideTextProvider = InsideTextContext.Provider

/** Whether this `Typography` is written inside another Tram text node. */
export function useIsInsideText(): boolean {
  return useContext(InsideTextContext)
}
