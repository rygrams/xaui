import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import type { SearchFieldVariant } from './search-field.type'

/**
 * The colour of the box's line at rest. An invalid field keeps the `TextField`'s `danger`
 * line in both variants; otherwise `primary` draws it in `muted` and `secondary` in its
 * own fill — there, but not seen, so the focus has a line to move from.
 */
export function restLine({
  variant,
  isInvalid,
  invalidLine,
  muted,
  surface,
}: {
  variant: SearchFieldVariant
  isInvalid: boolean
  invalidLine: string
  muted: string
  surface: string
}): string {
  if (isInvalid) return invalidLine

  return variant === 'secondary' ? surface : muted
}

/** The magnifier inside a square of `side` points: a ring, and a handle off it at 45°. */
export type GlassGeometry = {
  /** The ring's diameter, its line included. */
  lens: number
  /** The handle's length, and where its unrotated bar sits in the square. */
  handle: { length: number; start: number; top: number }
}

const LENS_SHARE = 0.7
const HANDLE_SHARE = 0.4

/**
 * The ring takes the top-start of the square; the handle leaves it at the bottom-end, on
 * the diagonal. A bar is turned about its own centre, so its centre is placed on that
 * diagonal half a length past the ring's edge, and the bar is laid flat around it.
 */
export function glassGeometry(side: number, line: number): GlassGeometry {
  const lens = Math.round(side * LENS_SHARE)
  const length = Math.round(side * HANDLE_SHARE)
  const radius = lens / 2
  const along = radius + length / 2
  const centre = radius + along * Math.SQRT1_2

  return {
    lens,
    handle: {
      length,
      start: Math.round((centre - length / 2) * 10) / 10,
      top: Math.round((centre - line / 2) * 10) / 10,
    },
  }
}

/**
 * The marks given to `SearchField.Field`, sorted by where they go: an element of
 * `startType` before the input, everything else after it, each in the order written.
 */
export function splitByType(
  children: ReactNode,
  startType: unknown
): { start: ReactNode[]; end: ReactNode[] } {
  const start: ReactNode[] = []
  const end: ReactNode[] = []

  // `toArray` drops the empty children and keys the rest, so the two lists render as they are.
  for (const child of Children.toArray(children)) {
    if (isValidElement(child) && child.type === startType) start.push(child)
    else end.push(child)
  }

  return { start, end }
}
