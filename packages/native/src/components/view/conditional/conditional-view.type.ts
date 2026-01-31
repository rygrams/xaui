import type { ReactNode } from 'react'

export type ConditionalViewAnimation = 'fade' | 'scale'

export type ConditionalViewProps = {
  /**
   * Whether the view is visible.
   */
  isVisible: boolean
  /**
   * The content to render when visible.
   */
  children: ReactNode
  /**
   * The animation to use when the view appears.
   * @default 'fade'
   */
  animation?: ConditionalViewAnimation
  /**
   * Disable animations entirely.
   * @default false
   */
  disableAnimation?: boolean
}
