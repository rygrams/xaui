import {
  Easing,
  SlideInDown,
  SlideInUp,
  SlideOutDown,
  SlideOutUp,
} from 'react-native-reanimated'
import type { ToastPlacement } from './toast.type'

const ENTER_MS = 260
const EXIT_MS = 180

/**
 * A toast comes from the edge it will sit against, and leaves the same way.
 *
 * It slides rather than scaling, which is what separates it from every other overlay in
 * this library: a dialog and a popover appear where they are, because they were asked for;
 * a toast arrives, because something happened. Motion across the screen's edge is the
 * difference between the two.
 */
export function toastEntering(placement: ToastPlacement) {
  const slide = placement === 'top' ? SlideInUp : SlideInDown
  return slide.duration(ENTER_MS).easing(Easing.out(Easing.cubic))
}

export function toastExiting(placement: ToastPlacement) {
  const slide = placement === 'top' ? SlideOutUp : SlideOutDown
  return slide.duration(EXIT_MS).easing(Easing.in(Easing.cubic))
}

/**
 * How a card moves when the pile shifts — a dismissal promoting everything forward by one.
 *
 * HeroUI's 300 ms, and a timing rather than a spring: the cards move together, and a
 * spring would have them arrive at slightly different moments and read as a shuffle.
 */
export const STACK_TIMING = { duration: 300 }
