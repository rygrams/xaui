import { PressableFeedback as Root } from './pressable-feedback'
import { PressableFeedbackHighlight } from './pressable-feedback-highlight'
import { PressableFeedbackRipple } from './pressable-feedback-ripple'

/**
 * The root scales; what else happens under the finger is **composed**, not named by a
 * prop. An overlay a caller can reach is an overlay a caller can place, style and switch
 * off — and it is the only shape that survives `asChild`, where the caller's own element
 * is the pressable and there is no sibling for the primitive to inject.
 */
export const PressableFeedback = Object.assign(Root, {
  Highlight: PressableFeedbackHighlight,
  Ripple: PressableFeedbackRipple,
})

export { useFeedback } from './pressable-feedback-context'
export { FEEDBACK_OVERLAY, markOverlay } from './pressable-feedback.overlay'
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
// `inkFor` and `radiusFrom` stay unpublished on purpose: an overlay reads the *resolved*
// `ink` and `corners` off `useFeedback()` and never re-derives them. Their tests import
// them by path, the way `style-cache` and `variant-map` are tested.
export type { PressableFeedbackHighlightProps } from './pressable-feedback-highlight'
export type { PressableFeedbackRippleProps } from './pressable-feedback-ripple'
export type {
  AnimationConfig,
  AnimationProp,
  FeedbackContext,
  PressableFeedbackProps,
  RadiusStyle,
  ResolvedAnimation,
  RippleWave,
  SlotAnimation,
} from './pressable-feedback.type'
