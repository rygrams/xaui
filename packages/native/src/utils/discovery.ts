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
   * The block of text: where it starts, how wide it may be, and which edge its lines set
   * from. It has no height of its own — the text decides that, up to `maxHeight`.
   */
  message: {
    top: number
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
/** How far above the target the text starts when the target is in the bottom half. */
const ABOVE_LIFT = 150
/** A hair of air between the text and the target, on top of `TARGET_GAP`. */
const BREATH = 14

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

  const top = messageTop(centreY, y, target.height, window.height)
  // The half-chord of the disc at the text's own `y`, which is how much room the curve
  // actually leaves there. Zero once the text is past the disc entirely.
  const dy = top - centreY
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
      top,
      start: setsFromEdge
        ? isOnStartSide
          ? TEXT_INSET
          : window.width - TEXT_INSET - floor
        : insideStart,
      width: setsFromEdge ? floor : insideWidth,
      // From the disc's bottom, so a long description scrolls rather than running out of
      // the curve at the foot of it.
      maxHeight: Math.max(MIN_HEIGHT, centreY + radius - TEXT_INSET - top),
      // The text hugs the side the target is on, so the two read as one thing.
      align: isOnStartSide ? 'start' : 'end',
    },
  }
}

/**
 * Above the target or below it, depending on which half of the screen the target is in.
 *
 * A FAB lives in the bottom corner, so the line is past centre rather than at it: the text
 * of an ordinary coach mark goes **above** its target, and only a target genuinely high up
 * gets it underneath.
 */
function messageTop(
  centreY: number,
  targetY: number,
  targetHeight: number,
  windowHeight: number
): number {
  const base =
    centreY < windowHeight * TOP_HALF
      ? Math.min(windowHeight - 200, targetY + targetHeight + TARGET_GAP)
      : Math.max(TEXT_INSET, targetY - ABOVE_LIFT)

  return Math.max(TEXT_INSET, base - BREATH)
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high)
}
