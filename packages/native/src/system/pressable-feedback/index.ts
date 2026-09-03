import { PressableFeedback as Root } from './pressable-feedback'
import { PressableFeedbackHighlight } from './pressable-feedback-highlight'
import { PressableFeedbackRipple } from './pressable-feedback-ripple'

export const PressableFeedback = Object.assign(Root, {
  Highlight: PressableFeedbackHighlight,
  Ripple: PressableFeedbackRipple,
})

export { useFeedback } from './pressable-feedback-context'
export {
  HIGHLIGHT_OPACITY,
  PRESS_DURATION,
  PRESS_SCALE,
  RELEASE_DURATION,
  RIPPLE_COVERAGE,
  RIPPLE_DURATION,
  RIPPLE_OPACITY,
  resolveAnimation,
  resolveSlotAnimation,
} from './pressable-feedback.animation'
export type { PressableFeedbackHighlightProps } from './pressable-feedback-highlight'
export type { PressableFeedbackRippleProps } from './pressable-feedback-ripple'
export type {
  AnimationConfig,
  AnimationProp,
  FeedbackContext,
  FeedbackVariant,
  PressableFeedbackProps,
  ResolvedAnimation,
  SlotAnimation,
} from './pressable-feedback.type'
