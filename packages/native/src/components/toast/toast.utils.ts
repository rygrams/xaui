import type { ToastPlacement } from './toast.type'

/**
 * How far one step back sits toward the edge, and how much it shrinks doing it.
 *
 * Both are HeroUI's, read off their `toast.animation.ts` rather than matched by eye:
 * `translateY: [0, 10]` and `scale: [1, 0.97]`, interpolated over the index. The shoulder
 * a card leaves is `PEEK - SHRINK × height`, so around 7 points on a two-line toast —
 * enough to say "there is another one" and not enough to be read as a second card.
 */
const PEEK = 10
const SHRINK = 0.03

export type ToastStackStyle = {
  translateY: number
  scale: number
  opacity: number
}

/**
 * Where a card sits given how far behind the front it is. Depth 0 is the newest.
 *
 * The stack does not lay cards out one under another — every one is anchored at the same
 * edge, and depth is expressed entirely in the transform. That is what makes a pile of
 * eight cost the height of one.
 *
 * Nothing clamps the depth: HeroUI's interpolation clamps only the front side, so the
 * fourth card is genuinely further back than the third rather than sitting on it. What
 * ends the ladder is `maxVisible`, past which the card is transparent — and being still
 * mounted is the point, because dismissing the front one promotes it into view instead of
 * losing it.
 */
export function toastStackStyle(
  depth: number,
  placement: ToastPlacement,
  maxVisible: number
): ToastStackStyle {
  // A top stack peeks downward and a bottom stack upward — both away from their edge.
  const sign = placement === 'top' ? 1 : -1

  return {
    // `|| 0` normalises the negative zero the front card of a bottom stack produces.
    // It renders the same, but `Object.is(-0, 0)` is false, and a caller comparing two
    // stack styles would see a difference that is not there.
    translateY: PEEK * depth * sign || 0,
    // Clamped, because a deep enough stack would otherwise turn the card inside out. It is
    // invisible long before that, but a negative scale is a mirrored card, not a small one.
    scale: Math.max(1 - SHRINK * depth, 0),
    opacity: depth >= maxVisible ? 0 : 1,
  }
}
