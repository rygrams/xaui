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
  /** Content to render inside the container. */
  children?: ReactNode

  /** Width in pixels or CSS string (e.g. `'50%'`, `'100vw'`). */
  width?: number | string
  /** Height in pixels or CSS string (e.g. `'50%'`, `'100vh'`). */
  height?: number | string
  /** Minimum width constraint in pixels or CSS string. */
  minWidth?: number | string
  /** Maximum width constraint in pixels or CSS string. */
  maxWidth?: number | string
  /** Minimum height constraint in pixels or CSS string. */
  minHeight?: number | string
  /** Maximum height constraint in pixels or CSS string. */
  maxHeight?: number | string
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

  /** Drop shadow config — `{ color, offset: { x, y }, blur, opacity }`. */
  shadow?: ShadowConfig

  /** Clip children to the container bounds (`overflow: hidden`). */
  clip?: boolean

  /** CSS transforms — `{ rotate, scale, translateX, translateY, … }`. */
  transform?: TransformConfig

  /** Opacity from `0` (transparent) to `1` (opaque). */
  opacity?: number

  /** Tap handler — renders the container as an interactive `div` when provided. */
  onPress?: () => void
  /** Long-press handler (fires after 500 ms). */
  onLongPress?: () => void
  /** Fired on pointer down. */
  onPressIn?: () => void
  /** Fired on pointer up. */
  onPressOut?: () => void
  /** Disables all press handlers when `true`. */
  disabled?: boolean

  /** ARIA label for screen readers. */
  ariaLabel?: string
  /** ARIA role (e.g. `'button'`, `'link'`). */
  role?: string
  /** Tab order for keyboard navigation. */
  tabIndex?: number
  /** Test identifier mapped to `data-testid`. */
  testID?: string

  /** Raw CSS style override applied to the underlying `div`. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
}
