import type { CSSProperties, ReactNode } from 'react'
import type { EdgeInsets } from '@xaui/core'

export type PaddingProps = {
  /** Content to render inside the padding container. */
  children?: ReactNode
  /** Padding applied to all sides — number for uniform, or `{ top, bottom, left, right, horizontal, vertical }`. */
  padding: EdgeInsets
  /** Raw CSS style override. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
  /** Test identifier mapped to `data-testid`. */
  testID?: string
}
