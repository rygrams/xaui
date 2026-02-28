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
  /**
   * The content to render inside the row.
   */
  children: ReactNode
  /**
   * Main axis alignment for row items.
   * @default 'start'
   */
  mainAxisAlignment?: MainAxisAlignment
  /**
   * Cross axis alignment for row items.
   * @default 'center'
   */
  crossAxisAlignment?: CrossAxisAlignment
  /**
   * Spacing between children.
   */
  spacing?: number
  /**
   * Reverse the row direction.
   * @default false
   */
  reverse?: boolean
  /**
   * Force the container to take the full width.
   * @default false
   */
  fullWidth?: boolean

  /**
   * Custom style for the row container.
   */
  style?: ViewStyle
}

export type ColumnProps = RowProps & {
  /**
   * If true, the container will grow to fill available space.
   * @default false
   */
  noGrowth?: boolean
}
