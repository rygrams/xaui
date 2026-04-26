import type { ReactNode } from 'react'
import type {
  AccessibilityRole,
  AccessibilityState,
  StyleProp,
  ViewStyle,
} from 'react-native'
import type {
  EdgeInsets,
  Alignment,
  ShadowConfig,
  TransformConfig,
  Border,
  BorderRadius,
} from '@xaui/core'

export type ContainerProps = {
  /** Content to render inside the container. */
  children?: ReactNode

  /** Width in logical pixels or percentage string (e.g. `'50%'`). */
  width?: number | `${number}%`
  /** Height in logical pixels or percentage string (e.g. `'50%'`). */
  height?: number | `${number}%`
  /** Minimum width constraint in logical pixels. */
  minWidth?: number
  /** Maximum width constraint in logical pixels. */
  maxWidth?: number
  /** Minimum height constraint in logical pixels. */
  minHeight?: number
  /** Maximum height constraint in logical pixels. */
  maxHeight?: number
  /** Width-to-height aspect ratio (e.g. `16 / 9`). */
  aspectRatio?: number
  /** Flex grow/shrink factor. */
  flex?: number

  /** Inner spacing — number for all sides or `{ top, bottom, left, right, horizontal, vertical }`. */
  padding?: EdgeInsets
  /** Outer spacing — same shape as `padding`. */
  margin?: EdgeInsets

  /** Alignment of children — named (`'center'`, `'topLeft'`, …) or coordinate `{ x, y }`. */
  alignment?: Alignment

  /** Background color. */
  color?: string

  /** Border — uniform `{ width, color, style }` or per-side `{ top, left, … }`. */
  border?: Border
  /** Corner radius — number for all corners or `{ topLeft, topRight, bottomLeft, bottomRight }`. */
  borderRadius?: BorderRadius

  /** Drop shadow config — `{ color, offset: { x, y }, blur, opacity, elevation }`. */
  shadow?: ShadowConfig

  /** Clip children to the container bounds (`overflow: hidden`). */
  clip?: boolean

  /** CSS / RN transforms — `{ rotate, scale, translateX, translateY, … }`. */
  transform?: TransformConfig

  /** Opacity from `0` (transparent) to `1` (opaque). */
  opacity?: number

  /** Tap handler — renders the container as `Pressable` when provided. */
  onPress?: () => void
  /** Long-press handler (fires after 500 ms). */
  onLongPress?: () => void
  /** Fired on touch/pointer down. */
  onPressIn?: () => void
  /** Fired on touch/pointer up. */
  onPressOut?: () => void
  /** Disables all press handlers when `true`. */
  disabled?: boolean

  /** Screen reader label. */
  accessibilityLabel?: string
  /** Accessibility role for assistive technologies. */
  accessibilityRole?: AccessibilityRole
  /** Accessibility state (disabled, selected, …). */
  accessibilityState?: AccessibilityState
  /** Whether the element is accessible to assistive technologies. */
  accessible?: boolean
  /** Test identifier for e2e tests. */
  testID?: string

  /** Raw style override applied to the underlying View / Pressable. */
  style?: StyleProp<ViewStyle>
}
