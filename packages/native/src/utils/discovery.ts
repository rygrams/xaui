import type { Anchor, Size2D } from './placement'

/** Where the parts of a coach mark go, in the coordinates of the host it is drawn in. */
export type DiscoveryGeometry = {
  /** The accent disc, centred on the target. */
  circle: Box
  /** The ring around the target, saying which thing is being talked about. */
  halo: Box
  /** The target's own rectangle, for the copy drawn over the disc. */
  target: Rect
  /**
   * The block of text: which edge it is pinned to, where it starts, how wide it may be,
   * and which way its lines set. It has no height of its own — the text decides that, up
   * to `maxHeight`.
   *
   * **One of `top` and `bottom`, never both.** A block under the target is pinned by its
   * top, because that is the edge nearest the thing it describes; a block above one is
   * pinned by its **bottom**, for the same reason — and that is what lets it grow upwards
   * as the text gets longer instead of running down into the target.
   */
  message: {
    top?: number
    bottom?: number
    start: number
    width: number
    maxHeight: number
    align: 'start' | 'end'
  }
}

type Box = { size: number; top: number; start: number }
type Rect = { top: number; start: number; width: number; height: number }

export type DiscoveryInput = {
  target: Anchor
  window: Size2D
  /** The disc's diameter as a multiple of the window's width. */
  scale: number
  /** How far the halo stands off the target, in points. */
  padding: number
}

/** How far the disc, the halo and the text stay from the screen's edges. */
const INSET = 16
/** The text's own inset inside the disc, so a line never runs to the curve. */
const TEXT_INSET = 24
/** Between the target and the first line of text. */
const TARGET_GAP = 30
/** A block narrower than this stops reading as a paragraph and sets from a side instead. */
const MIN_WIDTH = 280
/** Below this the block would clip its own text rather than scroll it. */
const MIN_HEIGHT = 140
/** Where the screen stops being "the top half" — past centre, because a FAB lives low. */
const TOP_HALF = 0.55
/**
 * How tall the block is assumed to be **when deciding how wide the disc lets it be**.
 *
 * Only the width needs a guess. A block above the target is pinned by its bottom, so where
 * it sits is exact however long the text runs — but the chord that bounds its width is
 * narrowest at its **top**, and the top is not known until the text has been laid out.
 * Four or five lines is what a coach mark holds; guessing high costs a little width and
 * guessing low would let a line run past the curve.
 */
const REFERENCE_HEIGHT = 180

/**
 * A coach mark's geometry: a disc centred on the thing being taught, a ring around it, and
 * a block of text that fits **inside the disc** rather than beside it.
 *
 * That last part is the only interesting arithmetic here. The text is placed at a `y`, and
 * how wide the disc is at that `y` is the chord of a circle — `√(r² − dy²)` — so a block
 * near the disc's centre is nearly its full width and one near the top or bottom is a
 * sliver. Laying the text out at the disc's width instead would run it past the curve at
 * both ends, which is the shape everybody's first coach mark has.
 *
 * When that chord is too narrow to read a paragraph in, the block gives up on the disc and
 * sets from the screen's own edge instead — the side the target is **not** on, so the text
 * runs away from the thing it describes rather than under it.
 *
 * A pure function so the arithmetic can be tested, and because none of it is React's: the
 * caller measures the target and hands the rectangle over.
 */
export function discoveryGeometry({
  target,
  window,
  scale,
  padding,
}: DiscoveryInput): DiscoveryGeometry {
  // Clamped so a target hanging off the edge — mid-transition, or badly placed — still
  // gets a disc on screen rather than one centred past the corner.
  const x = clamp(
    target.x,
    INSET,
    Math.max(INSET, window.width - target.width - INSET)
  )
  const y = clamp(
    target.y,
    INSET,
    Math.max(INSET, window.height - target.height - INSET)
  )

  const centreX = x + target.width / 2
  const centreY = y + target.height / 2

  const diameter = window.width * scale
  const radius = diameter / 2
  const haloSize = Math.max(target.width, target.height) + padding * 2

  // Above the target or below it, and pinned by the edge nearest it either way.
  const isBelow = centreY < window.height * TOP_HALF
  const pinned = isBelow
    ? { top: y + target.height + TARGET_GAP }
    : { bottom: window.height - (y - TARGET_GAP) }

  // Where the block's far edge lands — its top when it grows upwards, its bottom when it
  // grows down. That is the end the curve pinches, so that is where the chord is measured.
  const farY = isBelow
    ? (pinned.top ?? 0) + REFERENCE_HEIGHT
    : y - TARGET_GAP - REFERENCE_HEIGHT

  // The half-chord of the disc at that height, which is how much room the curve actually
  // leaves there. Zero once the text is past the disc entirely.
  const dy = farY - centreY
  const halfChord = Math.abs(dy) < radius ? Math.sqrt(radius ** 2 - dy ** 2) : 0

  const isOnStartSide = centreX < window.width / 2
  const floor = Math.min(MIN_WIDTH, window.width - TEXT_INSET * 2)

  const insideStart = Math.max(TEXT_INSET, centreX - halfChord + TEXT_INSET)
  const insideEnd = Math.max(
    TEXT_INSET,
    window.width - (centreX + halfChord - TEXT_INSET)
  )
  const insideWidth = window.width - insideStart - insideEnd

  const setsFromEdge = insideWidth < floor

  return {
    circle: {
      size: diameter,
      top: centreY - radius,
      start: centreX - radius,
    },
    halo: {
      size: haloSize,
      top: centreY - haloSize / 2,
      start: centreX - haloSize / 2,
    },
    target: { top: y, start: x, width: target.width, height: target.height },
    message: {
      ...pinned,
      start: setsFromEdge
        ? isOnStartSide
          ? TEXT_INSET
          : window.width - TEXT_INSET - floor
        : insideStart,
      width: setsFromEdge ? floor : insideWidth,
      // As far as the block may grow before it leaves the disc — down to the disc's foot
      // for a block that grows down, up to its crown for one that grows up. Past that a
      // long description scrolls rather than running out of the curve.
      maxHeight: Math.max(
        MIN_HEIGHT,
        isBelow
          ? centreY + radius - TEXT_INSET - (pinned.top ?? 0)
          : y - TARGET_GAP - (centreY - radius + TEXT_INSET)
      ),
      // The text hugs the side the target is on, so the two read as one thing.
      align: isOnStartSide ? 'start' : 'end',
    },
  }
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high)
}
