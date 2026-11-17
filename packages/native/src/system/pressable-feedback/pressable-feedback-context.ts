import { createContext, useContext } from 'react'
import { createSlotContext } from '../slot/create-slot-context'
import type { FeedbackContext } from './pressable-feedback.type'

/**
 * Its own file rather than the root's: the two overlays read it and the root publishes
 * it, so keeping it with the root would make them import each other.
 */
export const [FeedbackProvider, useFeedback] =
  createSlotContext<FeedbackContext>('PressableFeedback')

/**
 * Carries `animation="disable-all"` down the tree. Separate from the slot context on
 * purpose: this one crosses component boundaries — a list sets it, and rows that know
 * nothing about that list read it — where the slot context stops at one root.
 */
export const DisableAllContext = createContext(false)

/**
 * Whether an ancestor asked for `animation="disable-all"`.
 *
 * `PressableFeedback` reads the context itself. This is for a root that animates on its
 * own beside it — a press movement the primitive does not own — and has to stand down
 * with everything else: `resolveAnimation(animation, useAnimationDisabled())`.
 */
export function useAnimationDisabled(): boolean {
  return useContext(DisableAllContext)
}
