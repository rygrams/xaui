import type { CSSProperties, ReactNode } from 'react'
import type { EdgeInsets } from '@xaui/core'

export type PaddingProps = {
  children?: ReactNode
  padding: EdgeInsets
  style?: CSSProperties
  className?: string
  testID?: string
}
