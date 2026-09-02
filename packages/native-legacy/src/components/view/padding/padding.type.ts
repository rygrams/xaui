import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { EdgeInsets } from '@xaui/core'

export type PaddingProps = {
  /** Content to render inside the padding container. */
  children?: ReactNode
  /** Padding applied to all sides — number for uniform, or `{ top, bottom, left, right, horizontal, vertical }`. */
  padding: EdgeInsets
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
}
