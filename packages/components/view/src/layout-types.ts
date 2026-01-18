import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type MainAxisAlignment =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type CrossAxisAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline'

export type RowProps = {
  children: ReactNode
  mainAxisAlignment?: MainAxisAlignment
  crossAxisAlignment?: CrossAxisAlignment
  spacing?: number
  reverse?: boolean
  style?: ViewStyle
}

export type ColumnProps = RowProps

export type GridProps = {
  children: ReactNode
  columns?: number
  spacing?: number
  rowSpacing?: number
  columnSpacing?: number
  style?: ViewStyle
  itemStyle?: ViewStyle
}
