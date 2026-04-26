import type { CSSProperties, ReactNode } from 'react'

export type ExpandedProps = {
  /** Content to render inside the expanded container. */
  children?: ReactNode
  /** Flex factor — how much of the available space to take relative to siblings. @default 1 */
  flex?: number
  /** Raw CSS style override. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
  /** Test identifier mapped to `data-testid`. */
  testID?: string
}
