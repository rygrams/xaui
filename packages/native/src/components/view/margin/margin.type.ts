import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { EdgeInsets } from '@xaui/core'

export type MarginProps = {
  children?: ReactNode
  margin: EdgeInsets
  style?: StyleProp<ViewStyle>
}
