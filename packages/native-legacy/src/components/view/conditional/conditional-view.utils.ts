import { ConditionalViewAnimation } from './conditional-view.type'

export type AnimationValues = {
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
    case 'fade':
      return { opacity: 0.5, scale: 1, translateX: 0, translateY: 0 }
    case 'scale':
    default:
      return { opacity: 1, scale: 0.5, translateX: 0, translateY: 0 }
  }
}

export const getExitValues = (
  animation: ConditionalViewAnimation
): AnimationValues => {
  switch (animation) {
    case 'fade':
      return { opacity: 0.5, scale: 1, translateX: 0, translateY: 0 }
    case 'scale':
    default:
      return getInitialValues(animation)
  }
}
