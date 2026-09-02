import type { CSSProperties, ReactNode } from 'react'

export type BoxConstraints = {
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
}

export type ConstrainedBoxProps = {
  constraints: BoxConstraints
  children?: ReactNode
  style?: CSSProperties
  testID?: string
}
