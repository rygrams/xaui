import type { CrossAxisAlignment, MainAxisAlignment } from './layout-types'
import type { ViewStyle } from 'react-native'

const MAIN_AXIS_JUSTIFY_MAP: Record<MainAxisAlignment, ViewStyle['justifyContent']> =
  {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
    'space-around': 'space-around',
    'space-evenly': 'space-evenly',
  }

const CROSS_AXIS_ALIGN_MAP: Record<CrossAxisAlignment, ViewStyle['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

export const resolveMainAxisAlignment = (alignment?: MainAxisAlignment) => {
  return MAIN_AXIS_JUSTIFY_MAP[alignment ?? 'start']
}

export const resolveCrossAxisAlignment = (alignment?: CrossAxisAlignment) => {
  return CROSS_AXIS_ALIGN_MAP[alignment ?? 'center']
}
