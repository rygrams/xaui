import { createContext } from 'react'
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
