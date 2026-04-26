import type { CSSProperties } from 'react'
import type { CrossAxisAlignment, Direction, MainAxisAlignment, MainAxisSize } from './layout-types'

const MAIN_AXIS_JUSTIFY_MAP: Record<MainAxisAlignment, CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  spaceBetween: 'space-between',
  spaceAround: 'space-around',
  spaceEvenly: 'space-evenly',
}

const CROSS_AXIS_ALIGN_MAP: Record<CrossAxisAlignment, CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

export const resolveMainAxisAlignment = (alignment?: MainAxisAlignment) =>
  MAIN_AXIS_JUSTIFY_MAP[alignment ?? 'start']

export const resolveCrossAxisAlignment = (alignment?: CrossAxisAlignment) =>
  CROSS_AXIS_ALIGN_MAP[alignment ?? 'center']

export const resolveMainAxisSize = (
  size: MainAxisSize = 'max',
  direction: Direction
): CSSProperties => {
  if (size === 'min') return {}
  return direction === 'vertical' ? { flex: 1 } : { width: '100%' }
}
