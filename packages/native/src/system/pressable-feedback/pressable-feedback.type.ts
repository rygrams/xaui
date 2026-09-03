import type { ReactNode } from 'react'
import type { PressableProps, StyleProp, ViewStyle } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'

/**
 * What the root does under the finger. `scale-highlight` and `scale-ripple` mount their
 * overlay themselves; `scale` mounts none, which is what a root picks when it renders its
 * own `<PressableFeedback.Highlight>` to style it (R1: no prop reaches into another
 * component's insides).
 */
export type FeedbackVariant = 'scale-highlight' | 'scale-ripple' | 'scale' | 'none'

export type AnimationConfig = {
  scale?: boolean
  highlight?: boolean
  ripple?: boolean
}

/**
 * `false` and `'disabled'` turn this component's animations off. `'disable-all'` turns
 * them off for its descendants too — a long list kills every row's worklets with one
 * prop instead of threading it down. An object switches them off one at a time.
 */
export type AnimationProp = boolean | 'disabled' | 'disable-all' | AnimationConfig

/** `animation` once normalised — what the components actually read. */
export type ResolvedAnimation = {
  scale: boolean
  highlight: boolean
  ripple: boolean
  /** True when every sub-animation is off: the branch that mounts no worklet at all. */
  none: boolean
  /** Propagated to descendants through context. */
  disableAll: boolean
}

export type PressableFeedbackProps = Omit<
  PressableProps,
  'style' | 'children' | 'disabled'
> & {
  /** Controlled: the root owns the state, because its recipe resolves on it (R5). */
  isPressed?: boolean
  /** R8: `disabled` is not part of the public vocabulary, `isX` is. */
  isDisabled?: boolean
  /**
   * Merge into the single child instead of rendering a pressable (R12) — **keeping the
   * feedback**. Swapping this component out for a bare `Slot` would silently drop the
   * touch feedback of every `asChild` control.
   */
  asChild?: boolean
  feedbackVariant?: FeedbackVariant
  animation?: AnimationProp
  style?: StyleProp<ViewStyle>
  /**
   * `Pressable`'s function form is dropped on purpose. It exists to hand the press state
   * to children; here the root above already owns that state and this publishes it
   * through context, so the function form would be a second, quieter source of truth.
   */
  children?: ReactNode
}

/**
 * A slot's own animation, overriding the blanket one on the root. `false` switches that
 * slot off; the object tunes it. Deliberately two knobs rather than a full timing
 * surface — anything past this is a different animation, and that is a component's job,
 * not a prop's.
 */
export type SlotAnimation =
  | boolean
  | {
      /** Milliseconds. Falls back to the shared press timing. */
      duration?: number
      /** How far the overlay goes at full press, 0 to 1. */
      opacity?: number
    }

export type FeedbackContext = {
  isPressed: boolean
  animation: ResolvedAnimation
  /** Absent on the static branch, where nothing animates and no worklet is mounted. */
  progress?: SharedValue<number>
  /** How big the root is — what the scale coefficient is computed from. */
  size?: SharedValue<{ width: number; height: number }>
}
