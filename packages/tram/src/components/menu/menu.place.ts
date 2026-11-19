import { recede } from '../../motion/motion-tokens'

/** The side of what opened it the panel unfolds on. */
export type MenuSide = 'top' | 'bottom'

/** A box in the window, in points — `measureInWindow`'s, so `x` is from the left edge. */
export type MenuRect = { x: number; y: number; width: number; height: number }

export type MenuPlaceInput = {
  /** What opened the menu. */
  anchor: MenuRect
  /** The panel's height, measured before it was placed. */
  panel: number
  /** The height of the window the panel is drawn in. */
  screen: number
  /** What the panel keeps clear of at the top and at the bottom of the window. */
  insets: { top: number; bottom: number }
  /** The side asked for: kept when the panel fits there. */
  preferred: MenuSide
}

export type MenuPlace = {
  side: MenuSide
  /** From the top of the window. */
  top: number
  /** The room on that side: a taller panel scrolls inside it. */
  maxHeight: number
}

/**
 * Where the panel goes: against the anchor, on the side asked for when it fits there,
 * on the other when only that one fits, and on the roomier one when neither does — then
 * no taller than the room, and scrolled. Below it hangs from the anchor's bottom edge;
 * above it rests on its top one. It runs the window's width, so there is no across.
 */
export function menuPlace({
  anchor,
  panel,
  screen,
  insets,
  preferred,
}: MenuPlaceInput): MenuPlace {
  const below = Math.max(0, screen - insets.bottom - (anchor.y + anchor.height))
  const above = Math.max(0, anchor.y - insets.top)
  const room = { top: above, bottom: below }
  const other: MenuSide = preferred === 'bottom' ? 'top' : 'bottom'

  let side: MenuSide
  if (panel <= room[preferred]) side = preferred
  else if (panel <= room[other]) side = other
  else side = above > below ? 'top' : 'bottom'

  const maxHeight = room[side]
  const top =
    side === 'bottom'
      ? anchor.y + anchor.height
      : anchor.y - Math.min(panel, maxHeight)

  return { side, top, maxHeight }
}

/**
 * The edge a placed panel turns on: the one against the anchor. Below it, the panel
 * swivels down from its top edge; above it, up from its bottom one.
 */
export function hingeOf(side: MenuSide): MenuSide {
  return side === 'bottom' ? 'top' : 'bottom'
}

/** The offset of the anchor's centre from the page's, in points. */
export type MenuOffset = { x: number; y: number }

export type MenuLift = { translateX: number; translateY: number; scale: number }

/**
 * What keeps the anchor in place, and at its size, while the page around it recedes by
 * `depth`. The page shrinks around its centre to `s`; the anchor, `offset` from that
 * centre, would shrink with it and move toward it by `(1 - s) · offset`. Grown by `1 / s`
 * and moved back out by that much — in the page's scaled points, so divided by `s` — it is
 * where it was.
 */
export function liftFor(depth: number, offset: MenuOffset): MenuLift {
  'worklet'
  const scale = 1 - (1 - recede.scale) * depth
  const back = (1 - scale) / scale

  return {
    translateX: offset.x * back,
    translateY: offset.y * back,
    scale: 1 / scale,
  }
}

/**
 * How far the anchor's centre is from the page's, both measured in the window: what
 * `liftFor` moves the anchor back out by.
 */
export function centreOffset(anchor: MenuRect, page: MenuRect): MenuOffset {
  return {
    x: anchor.x + anchor.width / 2 - (page.x + page.width / 2),
    y: anchor.y + anchor.height / 2 - (page.y + page.height / 2),
  }
}

/** A box laid out inside `outer`, from its layout there, in the window's points. */
export function within(outer: MenuRect, inner: MenuRect): MenuRect {
  return {
    x: outer.x + inner.x,
    y: outer.y + inner.y,
    width: inner.width,
    height: inner.height,
  }
}
