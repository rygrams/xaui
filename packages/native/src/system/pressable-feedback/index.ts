import { PressableFeedback as Root } from './pressable-feedback'
import { PressableFeedbackHighlight } from './pressable-feedback-highlight'
import { PressableFeedbackRipple } from './pressable-feedback-ripple'

export const PressableFeedback = Object.assign(Root, {
  Highlight: PressableFeedbackHighlight,
  Ripple: PressableFeedbackRipple,
})

export { useFeedback } from './pressable-feedback-context'
export {
  HIGHLIGHT_DURATION,
  HIGHLIGHT_OPACITY,
  PRESS_DURATION,
  PRESS_SCALE,
  RIPPLE_CONFIRM_DURATION,
  RIPPLE_EXPAND_DURATION,
  RIPPLE_FADE_IN,
  RIPPLE_FADE_OUT,
  RIPPLE_FADE_OUT_DELAY,
  RIPPLE_OPACITY,
  RIPPLE_START_SCALE,
  SCALE_REFERENCE_WIDTH,
  pressScaleFor,
  resolveAnimation,
  resolveSlotAnimation,
  rippleRadiusFor,
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
