import type { CSSProperties, ReactNode } from 'react'

export type SizedBoxProps = {
  /**
   * Width in pixels.
   */
  width?: number
  /**
   * Height in pixels.
   */
  height?: number
  /**
   * Fills all available space — equivalent to Flutter's Expanded (flex: 1, alignSelf: 'stretch').
   * @default false
   */
  expand?: boolean
  /**
   * Collapses to zero size — equivalent to Flutter's SizedBox.shrink().
   * @default false
   */
  shrink?: boolean
  /**
   * Content to render inside the box.
   */
  children?: ReactNode
  style?: CSSProperties
  className?: string
  testID?: string
}
