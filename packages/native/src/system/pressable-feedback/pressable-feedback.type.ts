import type { ReactNode } from 'react'
import type { PressableProps, StyleProp, ViewStyle } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'

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
  animation?: AnimationProp
  style?: StyleProp<ViewStyle>
  /**
   * The overlays are children, not a prop — `<PressableFeedback.Highlight />` or
   * `<PressableFeedback.Ripple />`, in any order: the root paints them under everything
   * else wherever they sit. The scale is the root's own and needs nothing rendered.
   *
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

/** One ripple wave. Two of them, so a rapid double tap does not cut the one in flight. */
export type RippleWave = {
  /** `0 → 1` as the circle opens. */
  expand: SharedValue<number>
  /** `0 → 1` as the ink arrives, on its own curve. */
  alpha: SharedValue<number>
  /** Where the finger landed, in the root's coordinates. */
  origin: SharedValue<{ x: number; y: number }>
}

/**
 * The corner keys an overlay copies off the root. The `Left`/`Right` forms are absent
 * rather than forgotten: R13 bans them, because RN mirrors only the logical ones under RTL.
 */
export type RadiusStyle = Pick<
  ViewStyle,
  | 'borderRadius'
  | 'borderStartStartRadius'
  | 'borderStartEndRadius'
  | 'borderEndStartRadius'
  | 'borderEndEndRadius'
>

export type FeedbackContext = {
  /**
   * The overlay's ink, resolved by the root from its own background.
   *
   * A wash or a wave has to contrast with what it sits on, and only the root knows that —
   * it flattens its own `style` and reads `backgroundColor`, then takes the contrasting
   * side the same way a tint does. Black ink at 10% on a saturated fill is close to
   * invisible, which is the one thing a press indicator cannot be.
   */
  ink: string

  /**
   * The root's own corners, so an overlay rounds itself to match. `corners` and not
   * `radius`: the ripple already has a radius, and it is a length in points rather than a
   * shape.
   *
   * An absolute fill has square corners and every control here is rounded, so without this
   * both the wash and the wave paint outside the surface at each corner. The overlay
   * carries the clip rather than the root: clipping the root would also cut a child that
   * legitimately overflows — a badge on a button's corner — and that child has nothing to
   * do with the press.
   */
  corners: RadiusStyle

  isPressed: boolean
  animation: ResolvedAnimation
  /** Absent on the static branch, where nothing animates and no worklet is mounted. */
  progress?: SharedValue<number>
  /** How big the root is — what the scale coefficient is computed from. */
  size?: SharedValue<{ width: number; height: number }>
  /**
   * The two ripple waves, driven by the **root**.
   *
   * They belong to the root because the root is the touch surface. An overlay carrying its
   * own handlers only hears touches that land on *it* — and it is a sibling of the label,
   * not its parent, so pressing the text of a button would do nothing. Touches bubble to
   * the `Pressable`, which is why the handlers live there and the waves are published down.
   */
  waves?: readonly [RippleWave, RippleWave]
}
