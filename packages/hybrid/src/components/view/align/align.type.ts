import type { CSSProperties, ReactNode } from 'react'
import type { Alignment } from '@xaui/core'

export type AlignProps = {
  /** Content to align inside the container. */
  children?: ReactNode
  /** Alignment of children — named (`'center'`, `'topLeft'`, …) or coordinate `{ x, y }`. */
  alignment: Alignment
  /** Raw CSS style override. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
  /** Test identifier mapped to `data-testid`. */
  testID?: string
}
