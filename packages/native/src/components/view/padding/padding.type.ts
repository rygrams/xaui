import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { EdgeInsets } from '@xaui/core'

export type PaddingProps = {
  children?: ReactNode
  padding: EdgeInsets
  style?: StyleProp<ViewStyle>
}
