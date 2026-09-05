/**
 * Where a floating panel lands against the thing that opened it, as four numbers.
 *
 * Pure on purpose, and shared: positioning an overlay is the one part of a `Select`, a
 * `Popover` or a `Menu` that is arithmetic rather than rendering, and arithmetic that runs
 * once per open is arithmetic worth a test rather than a screenshot.
 *
 * Everything here is in the coordinate space of whatever the panel is laid out in — the
 * caller subtracts the portal host's own origin before calling, because the trigger
 * reports itself against the window and the panel is not laid out in the window.
 */

/** `start` and `end` rather than `left` and `right` (R13): the sides mirror in RTL. */
export type Placement = 'top' | 'bottom' | 'start' | 'end'

/** Where the panel lines up along the edge it is pinned to. */
export type Align = 'start' | 'center' | 'end'

/** The trigger's rectangle. */
export type Anchor = { x: number; y: number; width: number; height: number }

/** `trigger` matches the anchor exactly; `content-fit` hugs what the panel measured at. */
export type AnchoredWidth = number | 'trigger' | 'content-fit'

/** Screen edges the panel refuses to cross, in points. */
export type Insets = { top?: number; bottom?: number; start?: number; end?: number }

export type Size2D = { width: number; height: number }

export type PlacementInput = {
  anchor: Anchor
  /** What the panel measured at, before it was constrained. */
  content: Size2D
  window: Size2D
  placement: Placement
  align: Align
  width: AnchoredWidth
  offset: number
  alignOffset: number
  avoidCollisions: boolean
  insets: Required<Insets>
}

export type PlacementResult = {
  top: number
  start: number
  width: number
  maxHeight: number
  /** Where it actually went — the side asked for, or its opposite if that did not fit. */
  placement: Placement
}

const OPPOSITE: Record<Placement, Placement> = {
  top: 'bottom',
  bottom: 'top',
  start: 'end',
  end: 'start',
}

/** Which of the two axes a side pins the panel to. */
function axisOf(placement: Placement): 'vertical' | 'horizontal' {
  return placement === 'top' || placement === 'bottom' ? 'vertical' : 'horizontal'
}

/**
 * The order matters. Width is resolved first because the horizontal clamp depends on it;
 * the side is chosen next because the room to work with is the room on the chosen side;
 * the two coordinates follow from both.
 */
export function resolvePlacement(input: PlacementInput): PlacementResult {
  const { anchor, content, window, offset, alignOffset, insets } = input

  const available = window.width - insets.start - insets.end
  const width = Math.min(resolveWidth(input), Math.max(available, 0))

  const placement = choosePlacement(input)
  const room = Math.max(roomFor(placement, input), 0)
  const vertical = axisOf(placement) === 'vertical'

  // On a vertical side the room is the ceiling on the panel's height. On a horizontal one
  // the room bounds its *width*, and the height is bounded by the screen instead — a
  // panel beside its trigger can be as tall as the window allows.
  const maxHeight = vertical
    ? room
    : Math.max(window.height - insets.top - insets.bottom, 0)

  const height = Math.min(content.height, maxHeight)

  const top = vertical
    ? placement === 'bottom'
      ? anchor.y + anchor.height + offset
      : anchor.y - offset - height
    : clamp(
        alignedCross(input, height) + alignOffset,
        insets.top,
        Math.max(window.height - insets.bottom - height, insets.top)
      )

  const start = vertical
    ? clamp(
        alignedCross(input, width) + alignOffset,
        insets.start,
        Math.max(window.width - insets.end - width, insets.start)
      )
    : placement === 'end'
      ? anchor.x + anchor.width + offset
      : anchor.x - offset - width

  return { top, start, width, maxHeight, placement }
}

function resolveWidth({
  width,
  anchor,
  content,
  placement,
}: PlacementInput): number {
  // `trigger` on a horizontal side would make the panel as wide as the control it sits
  // beside, which says nothing about the space it has. It hugs its content instead.
  if (width === 'trigger') {
    return axisOf(placement) === 'vertical' ? anchor.width : content.width
  }
  if (width === 'content-fit') return content.width
  return width
}

/**
 * The requested side wins whenever the panel fits on it — a panel that flips because it is
 * two points short reads as a glitch. It flips only when the opposite side has strictly
 * more room, which also means a panel too big for either side stays where it was asked.
 */
function choosePlacement(input: PlacementInput): Placement {
  const { placement, avoidCollisions, content } = input
  if (!avoidCollisions) return placement

  const wanted = axisOf(placement) === 'vertical' ? content.height : content.width
  if (roomFor(placement, input) >= wanted) return placement

  const other = OPPOSITE[placement]
  return roomFor(other, input) > roomFor(placement, input) ? other : placement
}

/** How much space a side has, along the axis that side pins the panel to. */
function roomFor(placement: Placement, input: PlacementInput): number {
  const { anchor, window, offset, insets } = input

  switch (placement) {
    case 'bottom':
      return window.height - insets.bottom - (anchor.y + anchor.height) - offset
    case 'top':
      return anchor.y - insets.top - offset
    case 'end':
      return window.width - insets.end - (anchor.x + anchor.width) - offset
    case 'start':
      return anchor.x - insets.start - offset
  }
}

/**
 * The coordinate along the axis the side does **not** pin — horizontal for a panel above
 * or below, vertical for one beside. `size` is the panel's extent on that axis.
 */
function alignedCross(
  { align, anchor, placement }: PlacementInput,
  size: number
): number {
  const vertical = axisOf(placement) === 'vertical'
  const origin = vertical ? anchor.x : anchor.y
  const extent = vertical ? anchor.width : anchor.height

  if (align === 'start') return origin
  if (align === 'end') return origin + extent - size
  return origin + (extent - size) / 2
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
