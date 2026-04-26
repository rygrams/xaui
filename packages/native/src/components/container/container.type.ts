import type { ReactNode } from 'react'
import type { AccessibilityRole, AccessibilityState, StyleProp, ViewStyle } from 'react-native'
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

  width?: number | `${number}%`
  height?: number | `${number}%`
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
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

  accessibilityLabel?: string
  accessibilityRole?: AccessibilityRole
  accessibilityState?: AccessibilityState
  accessible?: boolean
  testID?: string

  style?: StyleProp<ViewStyle>
}
