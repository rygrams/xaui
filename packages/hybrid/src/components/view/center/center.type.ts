import type { CSSProperties, ReactNode } from 'react'

export type CenterProps = {
  /** Content to center. */
  children?: ReactNode
  /** Raw CSS style override. */
  style?: CSSProperties
  /** Tailwind / CSS class names. */
  className?: string
  /** Test identifier mapped to `data-testid`. */
  testID?: string
}
