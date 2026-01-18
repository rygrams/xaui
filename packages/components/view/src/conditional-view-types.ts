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
  isVisible: boolean
  children: ReactNode
  animation?: ConditionalViewAnimation
  disableAnimation?: boolean
}
