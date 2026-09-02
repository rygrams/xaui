import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { Alignment } from '../../../types'

export type AlignProps = {
  /** Content to align inside the container. */
  children?: ReactNode
  /** Alignment of children — named (`'center'`, `'topLeft'`, …) or coordinate `{ x, y }`. */
  alignment: Alignment
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
}
