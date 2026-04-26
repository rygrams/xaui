import type {
  CrossAxisAlignment,
  Direction,
  MainAxisAlignment,
  MainAxisSize,
} from './layout-types'
import type { ViewStyle } from 'react-native'

const MAIN_AXIS_JUSTIFY_MAP: Record<MainAxisAlignment, ViewStyle['justifyContent']> =
  {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
    spaceEvenly: 'space-evenly',
  }

const CROSS_AXIS_ALIGN_MAP: Record<CrossAxisAlignment, ViewStyle['alignItems']> = {
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
): ViewStyle => {
  if (size === 'min') return {}
  return direction === 'vertical' ? { flex: 1 } : { width: '100%' }
}
