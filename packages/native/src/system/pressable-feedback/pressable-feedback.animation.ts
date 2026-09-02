import type { AnimationProp, ResolvedAnimation } from './pressable-feedback.type'

/**
 * The values the v0 tree shipped with (`Animated.spring` to `0.975`, `bounciness: 0`,
 * over roughly 100ms). Kept identical on purpose: the touch feedback is the part of a
 * library users feel rather than read, and changing its timing in a rewrite would be a
 * regression nobody asked for. `bounciness: 0` is why a duration replaces the spring —
 * a spring with no bounce is a curve.
 */
export const PRESS_SCALE = 0.975
export const PRESS_DURATION = 100
export const RELEASE_DURATION = 150

/** How far the wash and the ripple go at full press. */
export const HIGHLIGHT_OPACITY = 0.08
export const RIPPLE_OPACITY = 0.12
export const RIPPLE_DURATION = 350

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

/** The radius a ripple needs to reach the furthest corner from where the finger landed. */
export function rippleRadius(
  origin: { x: number; y: number },
  size: { width: number; height: number }
): number {
  'worklet'
  const dx = Math.max(origin.x, size.width - origin.x)
  const dy = Math.max(origin.y, size.height - origin.y)
  return Math.sqrt(dx * dx + dy * dy)
}
