import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type CenterProps = {
  /** Content to center. */
  children?: ReactNode
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
}
