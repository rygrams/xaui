import type {
  AnimationProp,
  ResolvedAnimation,
  SlotAnimation,
} from './pressable-feedback.type'

/**
 * How far a control shrinks under the finger — **before** the width coefficient below.
 *
 * The v0 tree shrank everything to a flat `0.975`, which is why a wide button read as
 * lurching: a ratio applied to a 360pt row moves nine points, and the same ratio on a
 * 96pt chip moves two. What the eye reads is the displacement, not the ratio.
 */
export const PRESS_SCALE = 0.985
export const PRESS_DURATION = 300

/**
 * The width at which `PRESS_SCALE` is applied as written. Wider controls shrink
 * proportionally less, narrower ones more, so the movement stays roughly constant in
 * points across a 96pt chip and a full-width button.
 */
export const SCALE_REFERENCE_WIDTH = 300

/** The scale a control of `width` should reach when pressed. */
export function pressScaleFor(width: number): number {
  'worklet'
  const coefficient = width > 0 ? SCALE_REFERENCE_WIDTH / width : 1
  return 1 - (1 - PRESS_SCALE) * coefficient
}

/** How far the wash goes at full press, and how long it takes to get there. */
export const HIGHLIGHT_OPACITY = 0.1
export const HIGHLIGHT_DURATION = 200

/**
 * The ripple, taken from Material's reference implementation (`InkRipple`) rather than
 * approximated. Four of its numbers are load-bearing and none of them is obvious:
 *
 * - **The opacity is not tied to the expansion.** It reaches full ink in 75ms and stays
 *   there while the circle keeps growing. Tying the two — the obvious thing to write —
 *   means the ink is faintest exactly when the circle is small enough to be read as a
 *   circle, which is why such a ripple looks like nothing at all.
 * - **The circle starts at 30% of its target**, not at a point. A wave from a dot spends
 *   its visible life too small to see.
 * - **The target radius is half the diagonal**, which is what covers the box. Larger and
 *   the edge leaves the control before the eye catches it, so the effect reads as the
 *   surface tinting rather than as something spreading.
 * - **The centre travels** from the finger to the middle of the control as it opens, which
 *   is what makes it settle into the control instead of flooding out of a corner.
 *
 * The expansion runs a full second while the finger is down, and finishes in 225ms once it
 * lifts — the wave catches up rather than being cut.
 */
export const RIPPLE_OPACITY = 0.1
export const RIPPLE_START_SCALE = 0.3
export const RIPPLE_EXPAND_DURATION = 1000
export const RIPPLE_CONFIRM_DURATION = 225
export const RIPPLE_FADE_IN = 75
export const RIPPLE_FADE_OUT_DELAY = 225
export const RIPPLE_FADE_OUT = 150

/** Half the diagonal covers the box from its centre; the 5 is Material's own overshoot. */
export function rippleRadiusFor(width: number, height: number): number {
  'worklet'
  return Math.sqrt(width * width + height * height) / 2 + 5
}

const ALL_OFF: Omit<ResolvedAnimation, 'disableAll'> = {
  scale: false,
  highlight: false,
  ripple: false,
  none: true,
}

const ALL_ON: Omit<ResolvedAnimation, 'disableAll'> = {
  scale: true,
  highlight: true,
  ripple: true,
  none: false,
}

/**
 * One shape out of four accepted ones, so the components read a record instead of
 * re-deciding what `'disable-all'` meant.
 *
 * `inheritedDisableAll` comes from an ancestor that asked for it, and it wins: a list
 * that switched its rows' animations off cannot be overridden by a row.
 */
export function resolveAnimation(
  animation: AnimationProp | undefined,
  inheritedDisableAll = false
): ResolvedAnimation {
  if (inheritedDisableAll) return { ...ALL_OFF, disableAll: true }

  if (animation === false || animation === 'disabled') {
    return { ...ALL_OFF, disableAll: false }
  }

  if (animation === 'disable-all') return { ...ALL_OFF, disableAll: true }

  if (animation === undefined || animation === true) {
    return { ...ALL_ON, disableAll: false }
  }

  const scale = animation.scale ?? true
  const highlight = animation.highlight ?? true
  const ripple = animation.ripple ?? true

  return {
    scale,
    highlight,
    ripple,
    none: !scale && !highlight && !ripple,
    disableAll: false,
  }
}

export type ResolvedSlotAnimation = {
  enabled: boolean
  duration: number
  opacity: number
}

/**
 * A slot's own `animation` over the root's blanket one, with the root winning when it
 * switched everything off — `animation="disable-all"` on an ancestor cannot be undone by
 * an overlay that asks nicely.
 */
export function resolveSlotAnimation(
  override: SlotAnimation | undefined,
  enabledByRoot: boolean,
  defaultOpacity: number,
  defaultDuration = PRESS_DURATION
): ResolvedSlotAnimation {
  const fallback = {
    enabled: enabledByRoot,
    duration: defaultDuration,
    opacity: defaultOpacity,
  }

  if (override === undefined || override === true) return fallback
  if (override === false) return { ...fallback, enabled: false }

  return {
    enabled: enabledByRoot,
    duration: override.duration ?? defaultDuration,
    opacity: override.opacity ?? defaultOpacity,
  }
}
