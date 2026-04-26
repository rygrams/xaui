import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export type ExpandedProps = {
  /** Content to render inside the expanded container. */
  children?: ReactNode
  /** Flex factor — how much of the available space to take relative to siblings. @default 1 */
  flex?: number
  /** Raw style override applied to the underlying View. */
  style?: StyleProp<ViewStyle>
  /** Test identifier for e2e tests. */
  testID?: string
}
