import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { childrenToString } from '../../system/slot'
import type {
  SelectAlign,
  SelectAnchor,
  SelectInsets,
  SelectPlacement,
  SelectWidth,
} from './select.type'

export type Size2D = { width: number; height: number }

export type PlacementInput = {
  anchor: SelectAnchor
  /** What the panel measured at, before it was constrained. */
  content: Size2D
  window: Size2D
  placement: SelectPlacement
  align: SelectAlign
  width: SelectWidth
  offset: number
  alignOffset: number
  avoidCollisions: boolean
  insets: Required<SelectInsets>
}

export type PlacementResult = {
  top: number
  start: number
  width: number
  maxHeight: number
  /** Where it actually went — the input side, or the other one if it did not fit. */
  placement: SelectPlacement
}

/**
 * Where the list lands, as four numbers. Pure on purpose: positioning an overlay is the
 * one part of this component that is arithmetic rather than rendering, and arithmetic
 * that runs once per open is arithmetic worth a test rather than a screenshot.
 *
 * The order matters. Width is resolved first because the horizontal clamp depends on it;
 * the side is chosen next because `maxHeight` is the room on the chosen side; the top
 * follows from both.
 */
export function resolvePlacement(input: PlacementInput): PlacementResult {
  const { anchor, content, window, offset, alignOffset, insets } = input

  const available = window.width - insets.start - insets.end
  const width = Math.min(resolveWidth(input), Math.max(available, 0))

  const placement = choosePlacement(input)
  const maxHeight = Math.max(roomFor(placement, input), 0)
  const height = Math.min(content.height, maxHeight)

  const top =
    placement === 'bottom'
      ? anchor.y + anchor.height + offset
      : anchor.y - offset - height

  const start = clamp(
    alignedStart(input, width) + alignOffset,
    insets.start,
    Math.max(window.width - insets.end - width, insets.start)
  )

  return { top, start, width, maxHeight, placement }
}

function resolveWidth({ width, anchor, content }: PlacementInput): number {
  if (width === 'trigger') return anchor.width
  if (width === 'content-fit') return content.width
  return width
}

/**
 * The requested side wins whenever the panel fits on it — a list that flips because it is
 * two points short reads as a glitch. It flips only when the other side has strictly more
 * room, which also means a panel too tall for either side stays where it was asked to go.
 */
function choosePlacement(input: PlacementInput): SelectPlacement {
  const { placement, avoidCollisions, content } = input
  if (!avoidCollisions) return placement

  if (roomFor(placement, input) >= content.height) return placement

  const other: SelectPlacement = placement === 'bottom' ? 'top' : 'bottom'
  return roomFor(other, input) > roomFor(placement, input) ? other : placement
}

function roomFor(placement: SelectPlacement, input: PlacementInput): number {
  const { anchor, window, offset, insets } = input

  return placement === 'bottom'
    ? window.height - insets.bottom - (anchor.y + anchor.height) - offset
    : anchor.y - insets.top - offset
}

function alignedStart({ align, anchor }: PlacementInput, width: number): number {
  if (align === 'start') return anchor.x
  if (align === 'end') return anchor.x + anchor.width - width
  return anchor.x + (anchor.width - width) / 2
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * The `value` and label of every `Select.Item` in a tree, read from the **elements**
 * rather than from mounted components.
 *
 * The trigger has to name the chosen row before that row has ever rendered: the list
 * lives in a portal that only mounts when it opens, so a select with a `defaultValue`
 * would show its placeholder until the user opened it once and closed it again. React
 * hands `Select.Content` its children as elements whatever it does with them, and a
 * label is a prop or a string child — both readable without mounting anything.
 *
 * A row wrapped in a component of the caller's own is not reachable this way, and that
 * is what `children` on `Select.Value` is for.
 */
export function collectItemLabels(
  children: ReactNode,
  isItem: (type: unknown) => boolean
): ReadonlyArray<readonly [string, string]> {
  const found: Array<readonly [string, string]> = []

  const walk = (node: ReactNode) => {
    Children.forEach(node, child => {
      if (!isValidElement(child)) return

      const props = child.props as {
        value?: string
        label?: string
        children?: ReactNode
      }

      if (isItem(child.type) && typeof props.value === 'string') {
        const label = props.label ?? childrenToString(props.children)
        if (label !== null && label !== undefined) found.push([props.value, label])
        return
      }

      walk(props.children)
    })
  }

  walk(children)

  return found
}
