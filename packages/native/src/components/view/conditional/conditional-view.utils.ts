import { ConditionalViewAnimation } from './conditional-view.type'

type AnimationValues = {
  opacity: number
  scale: number
  translateX: number
  translateY: number
}

export const FINAL_VALUES: AnimationValues = {
  opacity: 1,
  scale: 1,
  translateX: 0,
  translateY: 0,
}

export const getInitialValues = (
  animation: ConditionalViewAnimation
): AnimationValues => {
  switch (animation) {
    case ConditionalViewAnimation.Scale:
      return { opacity: 1, scale: 0.9, translateX: 0, translateY: 0 }
    case ConditionalViewAnimation.SlideUp:
      return { opacity: 0, scale: 1, translateX: 0, translateY: 12 }
    case ConditionalViewAnimation.SlideDown:
      return { opacity: 0, scale: 1, translateX: 0, translateY: -12 }
    case ConditionalViewAnimation.SlideLeft:
      return { opacity: 0, scale: 1, translateX: 12, translateY: 0 }
    case ConditionalViewAnimation.SlideRight:
      return { opacity: 0, scale: 1, translateX: -12, translateY: 0 }
    case ConditionalViewAnimation.ZoomIn:
      return { opacity: 0, scale: 0.8, translateX: 0, translateY: 0 }
    case ConditionalViewAnimation.ZoomOut:
      return { opacity: 0, scale: 1.1, translateX: 0, translateY: 0 }
    case ConditionalViewAnimation.Fade:
    default:
      return { opacity: 0, scale: 1, translateX: 0, translateY: 0 }
  }
}
