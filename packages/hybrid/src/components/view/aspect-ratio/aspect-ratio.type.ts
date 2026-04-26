import type { CSSProperties, ReactNode } from 'react'
import type { Alignment } from '@xaui/core'

export type AspectRatioProps = {
  children?: ReactNode
  ratio: number
  alignment?: Alignment
  clip?: boolean
  style?: CSSProperties
  testID?: string
}
