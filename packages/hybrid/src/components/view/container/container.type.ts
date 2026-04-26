import type { CSSProperties, ReactNode } from 'react'
import type {
  EdgeInsets,
  Alignment,
  ShadowConfig,
  TransformConfig,
  Border,
  BorderRadius,
} from '@xaui/core'

export type ContainerProps = {
  children?: ReactNode

  width?: number | string
  height?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  aspectRatio?: number
  flex?: number

  padding?: EdgeInsets
  margin?: EdgeInsets

  alignment?: Alignment

  color?: string

  border?: Border
  borderRadius?: BorderRadius

  shadow?: ShadowConfig

  clip?: boolean

  transform?: TransformConfig

  opacity?: number

  onPress?: () => void
  onLongPress?: () => void
  onPressIn?: () => void
  onPressOut?: () => void
  disabled?: boolean

  ariaLabel?: string
  role?: string
  tabIndex?: number
  testID?: string

  style?: CSSProperties
  className?: string
}
