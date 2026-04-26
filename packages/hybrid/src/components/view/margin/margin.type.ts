import type { CSSProperties, ReactNode } from 'react'
import type { EdgeInsets } from '@xaui/core'

export type MarginProps = {
  /** Content to render inside the margin container. */
  children?: ReactNode
  /** Margin applied to all sides — number for uniform, or `{ top, bottom, left, right, horizontal, vertical }`. */
  margin: EdgeInsets
  /** Raw CSS style override. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
  /** Test identifier mapped to `data-testid`. */
  testID?: string
}
