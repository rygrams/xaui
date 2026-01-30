import type { ReactNode } from 'react'

export enum ConditionalViewAnimation {
  Fade = 'fade',
  Scale = 'scale',
  SlideUp = 'slide-up',
  SlideDown = 'slide-down',
  SlideLeft = 'slide-left',
  SlideRight = 'slide-right',
  ZoomIn = 'zoom-in',
  ZoomOut = 'zoom-out',
}

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
