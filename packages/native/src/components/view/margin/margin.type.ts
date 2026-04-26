import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { EdgeInsets } from '@xaui/core'

export type MarginProps = {
  /** Content to render inside the margin container. */
  children?: ReactNode
  /** Margin applied to all sides — number for uniform, or `{ top, bottom, left, right, horizontal, vertical }`. */
  margin: EdgeInsets
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
}
