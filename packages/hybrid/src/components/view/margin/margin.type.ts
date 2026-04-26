import type { CSSProperties, ReactNode } from 'react'
import type { EdgeInsets } from '@xaui/core'

export type MarginProps = {
  children?: ReactNode
  margin: EdgeInsets
  style?: CSSProperties
  className?: string
  testID?: string
}
