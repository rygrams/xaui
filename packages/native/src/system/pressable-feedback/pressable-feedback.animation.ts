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
 * The wave opens over `RIPPLE_BASE_DURATION` on a control whose diagonal is
 * `RIPPLE_REFERENCE_DIAGONAL`, and scales with the diagonal from there — a wave crossing
 * a wide card should not travel at the speed of one crossing a chip. Clamped at both ends
 * so neither extreme becomes a flicker or a crawl.
 */
export const RIPPLE_OPACITY = 0.1
export const RIPPLE_BASE_DURATION = 1000
export const RIPPLE_MIN_DURATION = 750
export const RIPPLE_REFERENCE_DIAGONAL = 450

/** The diagonal-adjusted duration of one wave. */
export function rippleDurationFor(width: number, height: number): number {
  'worklet'
  const diagonal = Math.sqrt(width * width + height * height)
  const scaled =
    diagonal > 0
      ? (RIPPLE_BASE_DURATION * diagonal) / RIPPLE_REFERENCE_DIAGONAL
      : RIPPLE_BASE_DURATION
  return Math.min(Math.max(scaled, RIPPLE_MIN_DURATION), RIPPLE_BASE_DURATION * 2)
}

/**
 * The circle's radius as a multiple of the control's diagonal. Above 1 it covers from
 * any point on the control, so where the finger landed never enters the calculation.
 */
export const RIPPLE_COVERAGE = 1.25

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
