import type { CSSProperties, ReactNode } from 'react'
import type { Alignment } from '@xaui/core'

export type FractionallySizedBoxProps = {
  widthFactor?: number
  heightFactor?: number
  alignment?: Alignment
  children?: ReactNode
  style?: CSSProperties
  testID?: string
}
